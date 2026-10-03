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

const phoneRegex = /^(\+?\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const registrationSchema = z.object({
  // Basic Info
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters"),
  email: z.email("Enter a valid email address").trim().max(254, "Email is too long"),
  phone: z.string().trim().max(30, "Phone number is too long").regex(phoneRegex, "Invalid phone number format (e.g. 555-555-5555)"),
  college: z.enum(COLLEGE_OPTIONS, { message: "Please select a community college" }),
  otherCollege: z.string().trim().max(150, "School name must be under 150 characters").optional(),
  ageCheck: z.boolean().refine(val => val === true, "You must confirm you will be 18+ years old"),

  // Experience
  interests: z
    .array(z.enum(INTEREST_OPTIONS))
    .min(1, "Please select at least one interest")
    .max(INTEREST_OPTIONS.length)
    .refine(list => new Set(list).size === list.length, "Each interest can only be picked once"),
  isFirstTimer: z.boolean(),

  // Logistics
  tshirtSize: z.enum(TSHIRT_SIZES, {
    message: "Please select a T-shirt size"
  }),
  dietaryRestrictions: z.string().trim().max(300, "Dietary restrictions must be under 300 characters").optional(),

  // Consent
  codeOfConduct: z.boolean().refine(val => val === true, "You must agree to the Code of Conduct")
}).refine(data => {
  if (data.college === OTHER_COLLEGE && (!data.otherCollege || data.otherCollege.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "Please write in your college name",
  path: ["otherCollege"]
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
