import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ColorPicker from "./ColorPicker";
import MaterialSelector from "./MaterialSelector";
import {
  CasketPart,
  CasketPartConfig,
  Material,
  partConfigs,
  materials,
} from "@/lib/constants";
import { useCasketStore } from "@/store/useCasketStore";

interface ConfigPanelProps {
  onSave: () => void;
  activeComponent: CasketPart;
  setActiveComponent: (part: CasketPart) => void;
}

const ConfigPanel = ({
  onSave,
  activeComponent,
  setActiveComponent,
}: ConfigPanelProps) => {
  const {
    isRotating,
    toggleRotation,
    rotationSpeed,
    setRotationSpeed,
    setPartColor,
    setPartMaterial,
    getPartConfig,
    setCapOpen,
    isCapOpen,
  } = useCasketStore();

  const handleColorChange = (color: string) => {
    setPartColor(activeComponent, color);
  };

  const handleMaterialChange = (material: Material) => {
    setPartMaterial(activeComponent, material);
  };

  const currentPartConfig = getPartConfig(activeComponent);

  return (
    <div className="h-full p-4 flex flex-col bg-slate-100 dark:bg-slate-900">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
        Casket Customization
      </h2>

      <div className="space-y-4 flex-1 overflow-y-auto">
        {/* Viewing Controls */}
        {/* <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-slate-900 dark:text-white">
            Viewing Options
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-rotate" className="font-medium">
                  Auto-Rotate
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Enable 360° rotation
                </p>
              </div>
              <Switch
                id="auto-rotate"
                checked={isRotating}
                onCheckedChange={toggleRotation}
              />
            </div>

            {isRotating && (
              <div className="space-y-2">
                <Label htmlFor="rotation-speed">Rotation Speed</Label>
                <Slider
                  id="rotation-speed"
                  min={0.001}
                  max={0.02}
                  step={0.001}
                  value={[rotationSpeed]}
                  onValueChange={(value) => setRotationSpeed(value[0])}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="open-cap" className="font-medium">
                  Open Casket View
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  View interior and pillow
                </p>
              </div>
              <Switch
                id="open-cap"
                checked={isCapOpen}
                onCheckedChange={setCapOpen}
              />
            </div>
          </div>
        </div> */}

        {/* Part Selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-slate-900 dark:text-white">
            Component Selection
          </h3>
          <Tabs
            value={activeComponent}
            onValueChange={(v) => setActiveComponent(v as CasketPart)}
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value={CasketPart.BODY}>Main Body</TabsTrigger>
              {/* <TabsTrigger value={CasketPart.CAP}>Cap Panel</TabsTrigger> */}
            </TabsList>
            {/* <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value={CasketPart.HANDLE}>Handles</TabsTrigger>
              <TabsTrigger value={CasketPart.ENDCAP}>Endcaps</TabsTrigger>
              <TabsTrigger value={CasketPart.PILLOW}>Pillow</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value={CasketPart.MOULDING}>Moulding</TabsTrigger>
              <TabsTrigger value={CasketPart.INTERIOR}>Interior</TabsTrigger>
              <TabsTrigger value={CasketPart.HARDWARE}>Hardware</TabsTrigger>
            </TabsList> */}

            {/* Component Customization Options */}
            <TabsContent value={activeComponent} className="mt-4 space-y-4">
              <h4 className="text-md font-medium text-slate-900 dark:text-white">
                {partConfigs[activeComponent]?.name} Options
              </h4>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="color">
                  <AccordionTrigger>Color</AccordionTrigger>
                  <AccordionContent>
                    <ColorPicker
                      color={currentPartConfig.color}
                      onChange={handleColorChange}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="material">
                  <AccordionTrigger>Material</AccordionTrigger>
                  <AccordionContent>
                    <MaterialSelector
                      materials={materials}
                      selectedMaterial={currentPartConfig.material}
                      onChange={handleMaterialChange}
                    />
                  </AccordionContent>
                </AccordionItem>

                {activeComponent === CasketPart.BODY && (
                  <AccordionItem value="dimensions">
                    <AccordionTrigger>Dimensions</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Length (cm)</Label>
                          <Slider
                            defaultValue={[210]}
                            max={230}
                            min={190}
                            step={5}
                          />
                          <div className="flex justify-between text-xs">
                            <span>190cm</span>
                            <span>230cm</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Width (cm)</Label>
                          <Slider
                            defaultValue={[70]}
                            max={85}
                            min={60}
                            step={5}
                          />
                          <div className="flex justify-between text-xs">
                            <span>60cm</span>
                            <span>85cm</span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 mt-auto">
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700"
          onClick={onSave}
        >
          Save Design
        </Button>
      </div>
    </div>
  );
};

export default ConfigPanel;
