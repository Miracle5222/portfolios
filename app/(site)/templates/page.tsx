import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Canva Templates" };

export default function TemplatesRedirectPage() {
  redirect("/shop#canva-templates-heading");
}
