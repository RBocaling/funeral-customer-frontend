import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import ConfigPanel from "./ConfigPanel";
import { toast } from "sonner";
import { useAudio } from "@/store/useAudio";
import { useCasketStore } from "@/store/useCasketStore";
import { CasketPart } from "@/lib/constants";

const CasketConfigurator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState<CasketPart>(
    CasketPart.BODY
  );
  const { toggleMute, isMuted } = useAudio();
  const resetConfig = useCasketStore((state: any) => state.resetConfig);

  const handleReset = () => {
    resetConfig();
    toast.info("Configuration reset to defaults");
  };

  const handleSaveDesign = () => {
    const config = useCasketStore.getState();

    console.log("Saving configuration:", config);
    toast.success("Your casket design has been saved!");
  };

  return (
    <div className="flex flex-col  h-full">
      {/* Main 3D Viewer */}
      <div className="w-full  h-[35vh] relative rounded-t-2xl border">
        <Canvas
          shadows
          camera={{
            position: [0, 1.5, 4],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
          gl={{
            antialias: true,
            powerPreference: "default",
          }}
        >
          <Suspense fallback={null}>
            <Scene
              setIsLoading={setIsLoading}
              activeComponent={activeComponent}
            />
          </Suspense>
        </Canvas>

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={toggleMute}
            className="bg-slate-800/70 hover:bg-slate-800 p-2 rounded-full text-white"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
          <button
            onClick={handleReset}
            className="bg-slate-800/70 hover:bg-slate-800 p-2 rounded-full text-white"
            title="Reset configuration"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-white font-medium">Loading 3D Model...</p>
            </div>
          </div>
        )}
      </div>

      {/* Configuration Panel */}
      <div className="w-full  h-[40vh] md:h-full overflow-y-auto">
        <ConfigPanel
          onSave={handleSaveDesign}
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
      </div>
    </div>
  );
};

export default CasketConfigurator;
