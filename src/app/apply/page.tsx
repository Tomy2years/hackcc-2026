import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isRegistrationOpen } from "@/lib/registrationGate";
import { canAccessRegistration } from "./access";
import { ApplyForm } from "./ApplyForm";

export function generateMetadata(): Metadata {
  return {
    title: "Register | HackCC 2026",
    // Keep search engines out while registration is still hidden.
    robots: isRegistrationOpen() ? undefined : { index: false, follow: false },
  };
}

export default async function ApplyPage() {
  if (!(await canAccessRegistration())) notFound();

  return <ApplyForm />;
}
