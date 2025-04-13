import { useState, useCallback, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAudio } from "@/store/useAudio";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [currentColor, setCurrentColor] = useState(color || "#ffffff");
  const { playHit } = useAudio();

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  const handleColorChange = useCallback((newColor: string) => {
    setCurrentColor(newColor);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^#[0-9A-F]{0,6}$/i.test(value)) {
      setCurrentColor(value);
    }
  };

  const handleCommit = useCallback(() => {
    if (currentColor !== color) {
      onChange(currentColor);
      playHit();
    }
  }, [currentColor, color, onChange, playHit]);

  // Preset colors for quick selection
  const presets = [
    "#4B371C", // dark brown
    "#7a5230", // medium brown
    "#B27C36", // light brown
    "#513123", // mahogany
    "#BB5C4D", // cherry
    "#EBE6D9", // cream
    "#ffffff", // white
    "#18181D", // black
    "#373B4D", // navy blue
    "#823D47", // burgundy
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <HexColorPicker
          color={currentColor}
          onChange={handleColorChange}
          onMouseUp={handleCommit}
          onTouchEnd={handleCommit}
          className="w-full"
        />

        <div className="flex items-center mt-4 gap-2">
          <Label htmlFor="hex-color" className="w-20">
            Hex Color:
          </Label>
          <Input
            id="hex-color"
            type="text"
            value={currentColor}
            onChange={handleInputChange}
            onBlur={handleCommit}
            maxLength={7}
            className="font-mono"
          />
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Presets:</Label>
        <div className="grid grid-cols-5 gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
              style={{ backgroundColor: preset }}
              onClick={() => {
                setCurrentColor(preset);
                onChange(preset);
                playHit();
              }}
              title={preset}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
