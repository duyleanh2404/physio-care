import { Card, CardContent } from "@/components/ui/card";

type QuickInfoCardProps = {
  label: string;
  icon: React.ReactNode;
  value: React.ReactNode;
};

export function QuickInfoCard({ icon, label, value }: QuickInfoCardProps) {
  return (
    <Card className="shadow-sm border p-3">
      <CardContent className="flex flex-col gap-1 p-0">
        <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
          {icon}
          {label}
        </div>
        <div className="text-sm font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}
