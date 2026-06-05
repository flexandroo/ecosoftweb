import { redirect } from "next/navigation";

// Legacy /terms route — content was split into dedicated pages
// /delivery-payment, /returns-exchange and /privacy. External links
// to /terms now land on the delivery & payment page.
export default function TermsPage() {
  redirect("/delivery-payment");
}
