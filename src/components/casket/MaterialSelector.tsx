import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Material } from "@/lib/constants";
import { useAudio } from "@/store/useAudio";
interface MaterialSelectorProps {
  materials: Record<Material, { name: string; description: string }>;
  selectedMaterial: Material;
  onChange: (material: Material) => void;
}

const MaterialSelector = ({
  materials,
  selectedMaterial,
  onChange,
}: MaterialSelectorProps) => {
  const { playHit } = useAudio();

  const handleChange = (value: string) => {
    onChange(value as Material);
    playHit();
  };

  return (
    <RadioGroup
      value={selectedMaterial}
      onValueChange={handleChange}
      className="space-y-3"
    >
      {Object.entries(materials).map(([key, { name, description }]) => (
        <div key={key} className="flex items-start space-x-2">
          <RadioGroupItem value={key} id={`material-${key}`} />
          <div className="grid gap-1.5">
            <Label htmlFor={`material-${key}`} className="font-medium">
              {name}
            </Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default MaterialSelector;
