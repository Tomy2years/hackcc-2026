---
name: secure-application-system
description: Security guidelines, Row Level Security (RLS) rules, Role-Based Access Control (RBAC), and AWS S3 bucket privacy rules for hacker and organizer application management in HackCC 2026.
---

# HackCC 2026 Secure Application System Guidelines (Supabase + AWS S3)

When designing, building, or modifying the application system for **hackers** and **organizers**, strictly enforce the following security architecture to ensure complete data privacy, isolation, and access control.

---

## 1. Supabase Security Architecture & Row-Level Security (RLS)

### A. Mandatory Row-Level Security (RLS)
- **Rule**: Every table created in Supabase (`hacker_applications`, `organizer_applications`, `reviews`, `user_roles`, `resumes`, etc.) MUST have Row-Level Security enabled.
  ```sql
  ALTER TABLE public.hacker_applications ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.organizer_applications ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
  ```

### B. Hacker Access Control Policies
- **Read & Write Isolation**: Hackers can only SELECT, INSERT, and UPDATE their OWN application record.
  ```sql
  -- Hackers can read their own application
  CREATE POLICY "Hackers can read own application"
    ON public.hacker_applications FOR SELECT
    USING (auth.uid() = user_id);

  -- Hackers can insert their own application draft
  CREATE POLICY "Hackers can insert own application"
    ON public.hacker_applications FOR INSERT
    WITH CHECK (auth.uid() = user_id);

  -- Hackers can update their own application ONLY while in draft status
  CREATE POLICY "Hackers can update own draft application"
    ON public.hacker_applications FOR UPDATE
    USING (auth.uid() = user_id AND status = 'draft')
    WITH CHECK (auth.uid() = user_id AND status = 'draft');
  ```
- **Application Immutability**: Once an application status changes from `draft` to `submitted`, update capabilities for the hacker MUST be locked via RLS policies or server-side state checks.

### C. Organizer Access Control Policies
- **Role Verification**: Organizer privileges MUST be verified against a secure `user_roles` table or custom JWT claims—NEVER relying on client-supplied flags.
  ```sql
  -- Helper function to check if user is an organizer
  CREATE OR REPLACE FUNCTION is_organizer(user_id uuid)
  RETURNS boolean AS $$
    SELECT EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = $1 AND role IN ('organizer', 'admin')
    );
  $$ LANGUAGE sql SECURITY DEFINER;
  ```
- **Review Isolation**:
  - Organizers can read hacker applications for grading and assignment.
  - Hackers MUST NEVER have read or write access to `organizer_applications`, internal `reviews`, or grading scores.
  - Status updates (`accepted`, `waitlisted`, `rejected`) can only be executed by authenticated admins/organizers.

### D. Supabase Client & Secret Discipline
- **Service Role Key Warning**: `SUPABASE_SERVICE_ROLE_KEY` bypasses ALL RLS rules.
  - **NEVER** expose `SUPABASE_SERVICE_ROLE_KEY` in environment variables with the `NEXT_PUBLIC_` prefix.
  - **NEVER** use the service role key on the client side.
  - Use `@supabase/ssr` with standard anon client (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) for all client and authenticated server interactions. Use service role key ONLY inside protected server-side admin functions when explicitly required.

---

## 2. AWS S3 Bucket Security (Resume & File Uploads)

### A. Private Bucket Enforcment
- **Block Public Access**: S3 buckets hosting sensitive documents (resumes, organizer IDs, tax/reimbursement forms) MUST have **Block All Public Access** enabled in AWS.
- **No Direct Public URLs**: Files in S3 must NOT be publicly accessible via standard `https://bucket.s3.amazonaws.com/...` URLs.

### B. Presigned Upload URLs (PUT)
- Resumes and sensitive uploads MUST use short-lived AWS S3 **Presigned PUT URLs** generated server-side.
- **Upload Guards**:
  - Expiration: Maximum 5 to 15 minutes (`expiresIn: 300` seconds).
  - Enforce `Content-Type` validation (e.g., `application/pdf`).
  - Max file size enforcement (e.g., 5 MB limit).
  - Path isolation: Structure keys by user ID to prevent unauthorized path overwrites:
    `hackers/{userId}/resume_{timestamp}.pdf`
    `organizers/{userId}/document_{timestamp}.pdf`

### C. Presigned Download URLs (GET)
- Storage in Database: Store only the S3 object key (`s3_key`) in Supabase tables—never raw pre-signed URLs.
- Dynamic Generation: When a user or organizer requests to view a document, an API endpoint / Server Action verifies authorization first, then generates a temporary GET presigned URL (`expiresIn: 900` seconds / 15 minutes).
  - **Hacker view**: Allowed only if `auth.uid()` matches file owner.
  - **Organizer view**: Allowed only if caller passes `is_organizer(auth.uid())` check.

### D. AWS Secrets Management
- All AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET_NAME`) MUST be strictly kept in server-side environment variables without `NEXT_PUBLIC_`.

---

## 3. Server-Side Data Validation & Anti-Tampering

- **Zod Schema Validation**: Validate every payload server-side using Zod before database mutation.
- **ID Overrides**: Never accept `user_id` or `status` from client request bodies. Always bind `user_id` to authenticated session context (`auth.uid()`).
- **Rate Limiting**: Apply rate limiting on submission endpoints and presigned URL generation to mitigate spam and URL harvesting.

---

## 4. Environment Variables Checklist

Ensure your `.env.local` contains all necessary variables properly scoped:

```env
# Client-accessible Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Server-ONLY Supabase configuration (NO NEXT_PUBLIC_ prefix!)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Server-ONLY AWS S3 credentials (NO NEXT_PUBLIC_ prefix!)
AWS_REGION=us-west-1
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_S3_BUCKET_NAME=hackcc-private-applications
```

---

## 5. Code Pattern References

### A. Server Action: Secure Presigned S3 PUT URL Generation
```typescript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createClient } from "@/lib/supabase/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function generateResumeUploadUrl(contentType: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (contentType !== "application/pdf") {
    throw new Error("Only PDF files are permitted for resumes.");
  }

  const fileKey = `hackers/${user.id}/resume_${Date.now()}.pdf`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileKey,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

  return { uploadUrl, fileKey };
}
```

### B. Server Action: Secure Presigned S3 GET URL Generation
```typescript
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createClient } from "@/lib/supabase/server";

export async function getResumeDownloadUrl(targetUserId: string, fileKey: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Allow if user is accessing their own resume OR caller is an organizer
  const isSelf = user.id === targetUserId;
  let isOrg = false;

  if (!isSelf) {
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();
    
    isOrg = roleData?.role === "organizer" || roleData?.role === "admin";
  }

  if (!isSelf && !isOrg) {
    throw new Error("Forbidden: Insufficient permissions to view document.");
  }

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileKey,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 900 });
}
```
