import WaterTreatmentScheme from "@/components/ui/water-treatment-scheme";

export const metadata = {
  title: "Схеми очищення води",
  description:
    "Інтерактивна схема руху води через систему очищення Ecosoft.",
};

export default function SchemesPage() {
  return (
    <div className="container schemes">
      <WaterTreatmentScheme />
    </div>
  );
}
