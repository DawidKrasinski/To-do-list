import { User } from "@/app/types/userType";

export function ColorInput({
  text,
  customColor,
  name,
  onChange,
}: {
  text: string;
  customColor: string;
  name: string;
  onChange: (value: string, field: string) => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="text-lg">{text}</div>
      <input
        type="color"
        value={customColor}
        className="bg-muted p-4 rounded-lg"
        onChange={(event) => onChange(event.currentTarget.value, name)}
      />
    </div>
  );
}
