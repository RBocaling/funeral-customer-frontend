import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { CasketPart, Material } from "@/lib/constants";
import { useCasketStore } from "@/store/useCasketStore";
const CasketParts = () => {
  const woodTexture = useTexture("/textures/wood.jpg");
  woodTexture.repeat.set(2, 2);
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;

  const { getPartConfig, isCapOpen } = useCasketStore();

  // Get configurations for each part
  const bodyConfig = getPartConfig(CasketPart.BODY);
  const capConfig = getPartConfig(CasketPart.CAP);
  const handleConfig = getPartConfig(CasketPart.HANDLE);
  const endcapConfig = getPartConfig(CasketPart.ENDCAP);
  const pillowConfig = getPartConfig(CasketPart.PILLOW);
  const mouldingConfig = getPartConfig(CasketPart.MOULDING);
  const interiorConfig = getPartConfig(CasketPart.INTERIOR);
  const hardwareConfig = getPartConfig(CasketPart.HARDWARE);

  // Helper to create material based on part config
  const createMaterial = (config: { color: string; material: Material }) => {
    const options: Record<string, any> = {
      color: config.color,
    };

    if (config.material === Material.GLOSSY) {
      options.roughness = 0.1;
      options.metalness = 0.0;
      options.clearcoat = 1.0;
      options.clearcoatRoughness = 0.1;
    } else if (config.material === Material.WOOD) {
      options.map = woodTexture;
      options.roughness = 0.7;
      options.metalness = 0.0;
    } else if (config.material === Material.FABRIC) {
      options.roughness = 0.9;
      options.metalness = 0.0;
    } else if (config.material === Material.METAL) {
      options.roughness = 0.2;
      options.metalness = 0.8;
    } else if (config.material === Material.PLASTIC) {
      options.roughness = 0.5;
      options.metalness = 0.0;
    }

    return new THREE.MeshStandardMaterial(options);
  };

  // Create materials for each part
  const bodyMaterial = createMaterial(bodyConfig);
  const capMaterial = createMaterial(capConfig);
  const handleMaterial = createMaterial(handleConfig);
  const endcapMaterial = createMaterial(endcapConfig);
  const pillowMaterial = createMaterial(pillowConfig);
  const mouldingMaterial = createMaterial(mouldingConfig);
  const interiorMaterial = createMaterial(interiorConfig);
  const hardwareMaterial = createMaterial(hardwareConfig);

  // Calculate cap rotation based on open state
  const capRotation = isCapOpen ? [-0.6, 0, 0] : [0, 0, 0];
  const capPosition = isCapOpen ? [0, 0.15, -0.5] : [0, 0.15, 0];

  return (
    <group>
      {/* Main casket body */}
      <mesh castShadow receiveShadow material={bodyMaterial}>
        <boxGeometry args={[1.8, 0.7, 3]} />
        <mesh position={[0, -0.35, 0]}>
          <boxGeometry args={[1.85, 0.05, 3.05]} />
          <meshStandardMaterial color={bodyConfig.color} />
        </mesh>
      </mesh>

      {/* Body ledge */}
      <mesh
        position={[0, 0.35, 0]}
        castShadow
        receiveShadow
        material={mouldingMaterial}
      >
        <boxGeometry args={[1.9, 0.05, 3.1]} />
      </mesh>

      {/* Cap panel (lid) */}
      <group position={capPosition as any} rotation={capRotation as any}>
        <mesh
          position={[0, 0.11, 0]}
          castShadow
          receiveShadow
          material={capMaterial}
        >
          <boxGeometry args={[1.75, 0.15, 2.9]} />
        </mesh>

        {/* Cap panel trim */}
        <mesh
          position={[0, 0.04, 0]}
          castShadow
          receiveShadow
          material={mouldingMaterial}
        >
          <boxGeometry args={[1.85, 0.02, 3]} />
        </mesh>
      </group>

      {/* Interior */}
      <mesh position={[0, 0.2, 0]} receiveShadow material={interiorMaterial}>
        <boxGeometry args={[1.7, 0.3, 2.9]} />
      </mesh>

      {/* Pillow */}
      <mesh
        position={[0, 0.25, -0.7]}
        castShadow
        receiveShadow
        material={pillowMaterial}
      >
        <boxGeometry args={[1.2, 0.15, 0.8]} />
      </mesh>

      {/* Metal handles (6 of them, 3 on each side) */}
      {[-0.92, 0.92].map((xPos) =>
        [-1, 0, 1].map((zPos) => (
          <group
            key={`handle-${xPos}-${zPos}`}
            position={[xPos, 0, zPos * 0.8]}
          >
            <mesh castShadow material={handleMaterial}>
              <boxGeometry args={[0.05, 0.2, 0.4]} />
            </mesh>
            <mesh
              position={[xPos > 0 ? -0.05 : 0.05, 0, 0]}
              castShadow
              material={handleMaterial}
            >
              <cylinderGeometry
                args={[0.03, 0.03, 0.15, 16]}
                // rotation={[0, 0, Math.PI / 2]}
              />
            </mesh>
          </group>
        ))
      )}

      {/* Metal endcaps (one at each end) */}
      {[-1.45, 1.45].map((zPos) => (
        <mesh
          key={`endcap-${zPos}`}
          position={[0, 0, zPos]}
          castShadow
          receiveShadow
          material={endcapMaterial}
        >
          <boxGeometry args={[1.8, 0.7, 0.1]} />
        </mesh>
      ))}

      {/* Latch pins and receivers */}
      {[-0.5, 0.5].map((zPos) => (
        <group key={`latch-${zPos}`}>
          {/* Latch pin (on lid) */}
          <mesh
            position={[0.7, 0.2, zPos]}
            castShadow
            material={hardwareMaterial}
          >
            <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
          </mesh>

          {/* Latch receiver (on body) */}
          <mesh
            position={[0.7, 0.1, zPos]}
            castShadow
            material={hardwareMaterial}
          >
            <boxGeometry args={[0.1, 0.1, 0.15]} />
          </mesh>
        </group>
      ))}

      {/* Wood columns (decorative vertical elements) */}
      {[
        [-0.8, -1.4],
        [-0.8, 1.4],
        [0.8, -1.4],
        [0.8, 1.4],
      ].map(([x, z], i) => (
        <mesh
          key={`column-${i}`}
          position={[x, 0, z]}
          castShadow
          receiveShadow
          material={mouldingMaterial}
        >
          <boxGeometry args={[0.1, 0.7, 0.1]} />
        </mesh>
      ))}

      {/* Ear panels (decorative side panels) */}
      {[-0.9, 0.9].map((xPos) => (
        <mesh
          key={`ear-panel-${xPos}`}
          position={[xPos, 0.2, 0]}
          castShadow
          receiveShadow
          material={bodyMaterial}
        >
          <boxGeometry args={[0.03, 0.4, 2.9]} />
        </mesh>
      ))}

      {/* Valance (decorative trim) */}
      <mesh
        position={[0, -0.15, 0]}
        castShadow
        receiveShadow
        material={mouldingMaterial}
      >
        <boxGeometry args={[1.9, 0.05, 3.1]} />
      </mesh>
    </group>
  );
};

export default CasketParts;
