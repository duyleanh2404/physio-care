type DetailItemProps = {
  label: string;
  icon?: React.ReactNode;
  value: React.ReactNode;
};

export function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-start gap-2 py-1.5 border-b last:border-0">
      {icon && <div className="mt-0.5">{icon}</div>}
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-medium text-muted-foreground block mb-0.5">
          {label}
        </span>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );
}
