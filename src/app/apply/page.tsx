import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRegistrationAccess } from "./access";
import { ApplyForm } from "./ApplyForm";
import { RegistrationClosed } from "./RegistrationClosed";

export const metadata: Metadata = {
  title: "Register | HackCC 2026",
  // Not indexed until the team links to it from the main site at launch.
  robots: { index: false, follow: false },
};

export default async function ApplyPage() {
  const access = await getRegistrationAccess();
  if (access === "hidden") notFound();
  if (access === "closed") return <RegistrationClosed />;

  return <ApplyForm />;
}
