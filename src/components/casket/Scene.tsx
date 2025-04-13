import {
  Environment,
  ContactShadows,
  Lightformer,
} from "@react-three/drei";
import CasketModel from "./CasketModel";
import CameraControls from "./CameraControls";
import { CasketPart } from "@/lib/constants";

interface SceneProps {
  setIsLoading: (loading: boolean) => void;
  activeComponent: CasketPart;
}

const Scene = ({ setIsLoading, activeComponent }: SceneProps) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={0.5}
        intensity={1.0}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
        castShadow={false}
      />

      {/* Enhanced environment and shadows for better realism */}
      <Environment preset="studio">
        <Lightformer
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
          intensity={2}
          color="white"
        />
        <Lightformer
          position={[0, 5, 9]}
          scale={[10, 10, 1]}
          intensity={0.5}
          color="white"
        />
      </Environment>

      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.5}
        scale={15}
        blur={2}
        far={5}
        resolution={1024}
        color="#000000"
      />

      {/* Casket Model */}
      <CasketModel
        setIsLoading={setIsLoading}
        activeComponent={activeComponent}
      />

      {/* Camera Controls */}
      <CameraControls />
    </>
  );
};

export default Scene;
