import * as z from "zod";
import { CALIFORNIA_COMMUNITY_COLLEGES } from "./colleges";

// Shared by the /apply form and the server-side submit action, so the
// server re-checks exactly what the browser checks.

export const INTEREST_OPTIONS = [
  "Software Engineering",
  "AI & Machine Learning",
  "Web Development",
  "Mobile Apps",
  "Game Development",
  "Design & UX/UI",
  "Hardware & IoT",
  "Cybersecurity",
  "Product Management",
] as const;

export const TSHIRT_SIZES = ["S", "M", "L", "XL", "XXL"] as const;

export const OTHER_COLLEGE = "Other / Not Listed";

export const COLLEGE_OPTIONS = [...CALIFORNIA_COMMUNITY_COLLEGES, OTHER_COLLEGE] as const;

// The form formats as you type (see phone.ts), so the server accepts exactly that shape.
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

export const registrationSchema = z.object({
  // Basic Info
  name: z.string().trim().min(2, "Enter your full name").max(100, "Name must be under 100 characters"),
  email: z.email("Enter an email address like name@example.com").trim().max(254, "Email is too long"),
  phone: z.string().trim().max(12, "Phone number is too long").regex(phoneRegex, "Enter a 10-digit phone number, like 714-555-0199"),
  college: z.enum(COLLEGE_OPTIONS, { message: "Choose your college from the list, or choose \"Other / Not Listed\"" }),
  otherCollege: z.string().trim().max(150, "School name must be under 150 characters").optional(),
  ageCheck: z.boolean().refine(val => val === true, "Confirm that you'll be 18 or older by Fall 2026"),

  // Experience
  interests: z
    .array(z.enum(INTEREST_OPTIONS))
    .min(1, "Choose at least one interest")
    .max(INTEREST_OPTIONS.length)
    .refine(list => new Set(list).size === list.length, "Each interest can only be picked once"),
  isFirstTimer: z.boolean(),

  // Logistics
  tshirtSize: z.enum(TSHIRT_SIZES, {
    message: "Choose a T-shirt size"
  }),
  dietaryRestrictions: z.string().trim().max(300, "Dietary restrictions must be under 300 characters").optional(),

  // Consent
  codeOfConduct: z.boolean().refine(val => val === true, "You need to agree to the Code of Conduct to apply")
}).refine(data => {
  if (data.college === OTHER_COLLEGE && (!data.otherCollege || data.otherCollege.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "Enter the name of your college",
  path: ["otherCollege"]
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
