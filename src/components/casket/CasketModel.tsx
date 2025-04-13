import { useRef, useEffect, useState, Suspense, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { CasketPart, Material, CasketPartConfig } from "@/lib/constants";
import CasketParts from "./CasketParts";
import { useCasketStore } from "@/store/useCasketStore";
import { useAudio } from "@/store/useAudio";

interface CasketModelProps {
  setIsLoading: (loading: boolean) => void;
  activeComponent: CasketPart;
}

// Preload the model
useGLTF.preload("/models/white_casket.glb");

const CasketModel = ({ setIsLoading, activeComponent }: CasketModelProps) => {
  const casketRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const isRotating = useCasketStore((state) => state.isRotating);
  const rotationSpeed = useCasketStore((state) => state.rotationSpeed);
  const isCapOpen = useCasketStore((state) => state.isCapOpen);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [useRealisticModel, setUseRealisticModel] = useState(true);
  const [prevCapState, setPrevCapState] = useState(false);

  const { camera } = useThree();

  // Add audio for lid open/close sound
  const { playLid } = useAudio();

  // Load the casket model
  const { scene: casketModel } = useGLTF("/models/white_casket.glb") as GLTF & {
    scene: THREE.Group;
  };

  // Position the camera properly when component mounts
  useEffect(() => {
    camera.position.set(0, 1.0, 3.5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Play sound effect when casket lid state changes
  useEffect(() => {
    if (modelLoaded && prevCapState !== isCapOpen) {
      // Only play sound if the state actually changed
      playLid();
      setPrevCapState(isCapOpen);
    }
  }, [isCapOpen, prevCapState, modelLoaded, playLid]);

  // Get configurations from the store
  const partConfigs = useCasketStore((state) => state.partConfigs);

  // Map to help identify which part of the model corresponds to each casket part
  const partNameMapping = {
    [CasketPart.BODY]: ["body", "main", "shell", "base"],
    [CasketPart.CAP]: ["lid", "cap", "top"],
    [CasketPart.HANDLE]: ["handle", "grip", "bar"],
    [CasketPart.ENDCAP]: ["endcap", "corner", "end"],
    [CasketPart.PILLOW]: ["pillow", "cushion"],
    [CasketPart.MOULDING]: ["mould", "trim", "edge", "border"],
    [CasketPart.INTERIOR]: ["interior", "lining", "inside", "inner"],
    [CasketPart.HARDWARE]: [
      "hardware",
      "hinge",
      "latch",
      "screw",
      "nail",
      "pin",
    ],
  };

  // Function to guess which part a mesh belongs to based on its name
  const guessCasketPart = (name: string): CasketPart | null => {
    name = name.toLowerCase();

    for (const [part, keywords] of Object.entries(partNameMapping)) {
      if (keywords.some((keyword) => name.includes(keyword))) {
        return part as CasketPart;
      }
    }

    // If no specific match, default to body for items without clear identifiers
    return null;
  };

  // Create a material based on the part configuration
  const createMaterial = useCallback(
    (partConfig: { color: string; material: Material }): THREE.Material => {
      const { color, material } = partConfig;

      switch (material) {
        case Material.GLOSSY:
          return new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            metalness: 0.2,
            roughness: 0.1,
            envMapIntensity: 1.0,
          });

        case Material.WOOD:
          const woodTexture = new THREE.TextureLoader().load(
            "/textures/wood.jpg"
          );
          woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
          woodTexture.repeat.set(2, 2);
          return new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            map: woodTexture,
            roughness: 0.7,
            metalness: 0.1,
          });

        case Material.FABRIC:
          return new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            roughness: 0.8,
            metalness: 0.0,
          });

        case Material.METAL:
          return new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            metalness: 0.9,
            roughness: 0.15,
            envMapIntensity: 1.2,
          });

        case Material.PLASTIC:
          return new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            metalness: 0.0,
            roughness: 0.4,
          });

        default:
          return new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
          });
      }
    },
    []
  );

  // Update model materials based on part configurations and active component passed as prop
  const updateModelMaterials = useCallback(() => {
    if (!modelRef.current) return;

    // For the currently active component's configuration
    const activeConfig = partConfigs[activeComponent];
    console.log(
      `Active component ${activeComponent} using color ${activeConfig.color}`
    );

    // Since our model is simple (likely one main mesh), we'll apply the material
    // of the currently selected component to the entire casket
    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Apply the material based on the active component
        const material = createMaterial(activeConfig);
        child.material = material;
        console.log(
          `Applied ${activeConfig.color} material to ${child.name} for ${activeComponent} part`
        );
      }
    });
  }, [activeComponent, partConfigs, createMaterial]);

  // Use effect to track the active component from the configuration panel
  useEffect(() => {
    // Initialize the previous config store on first run
    if (!prevPartConfigs.current) {
      prevPartConfigs.current = JSON.parse(JSON.stringify(partConfigs));
    }

    // This will run when any part configuration changes
    // We'll log changes for debugging
    Object.entries(partConfigs).forEach(([part, config]) => {
      const prevConfig = prevPartConfigs.current?.[part as CasketPart];
      if (
        prevConfig &&
        (config.color !== prevConfig.color ||
          config.material !== prevConfig.material)
      ) {
        console.log(
          `Part ${part} changed: color=${config.color}, material=${config.material}`
        );
      }
    });

    // Save current configs for next comparison
    prevPartConfigs.current = JSON.parse(JSON.stringify(partConfigs));
  }, [partConfigs]);

  // Reference to previous part configurations for detecting changes
  const prevPartConfigs = useRef<Record<CasketPart, CasketPartConfig> | null>(
    null
  );

  // Handle model loading
  useEffect(() => {
    if (casketModel) {
      setModelLoaded(true);
      console.log("Casket model loaded successfully");

      // Print model hierarchy for debugging
      console.log("Model hierarchy:");
      const printHierarchy = (obj: THREE.Object3D, indent = "") => {
        console.log(`${indent}${obj.name} (type: ${obj.type})`);
        if (obj instanceof THREE.Mesh) {
          console.log(`${indent}  Material: "${obj.material.type}"`);
        }
        obj.children.forEach((child) => printHierarchy(child, indent + "  "));
      };
      printHierarchy(casketModel);

      // Store mesh names for debugging
      const meshNames: string[] = [];

      // Customize model after loading
      casketModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          meshNames.push(child.name);

          // Make a best attempt to identify the part
          const partName = child.name.toLowerCase();
          const casketPart = guessCasketPart(partName);
          if (casketPart) {
            console.log(`Identified mesh ${child.name} as ${casketPart}`);
          }
        }
      });

      console.log("All mesh names:", meshNames);

      // Since our model is simple, treat the main mesh as the entire casket body
      // and we'll apply different materials to different parts when customizing

      // Initialize materials by applying current configuration
      setTimeout(() => {
        updateModelMaterials();
      }, 100);

      setIsLoading(false);
    }
  }, [casketModel, setIsLoading, updateModelMaterials]);

  // Update the materials whenever part configurations or activeComponent changes
  useEffect(() => {
    if (modelLoaded && modelRef.current) {
      console.log("Updating casket materials to match new configuration");
      updateModelMaterials();
    }
  }, [modelLoaded, updateModelMaterials]);

  // Reference for lid animation
  const lidRef = useRef<THREE.Object3D>();
  const [lidAngle, setLidAngle] = useState(0);
  const targetLidAngle = isCapOpen ? Math.PI * 0.6 : 0; // 60 degrees when open, 0 when closed

  // Handle auto-rotation and lid animation
  useFrame((_, delta) => {
    // Handle auto-rotation
    if (casketRef.current && isRotating) {
      casketRef.current.rotation.y += rotationSpeed;
    }

    // Handle lid animation
    if (modelRef.current && modelLoaded) {
      // Find the lid part in the cloned model each frame if not already found
      if (!lidRef.current) {
        modelRef.current.traverse((child) => {
          if (
            child instanceof THREE.Object3D &&
            (child.name.toLowerCase().includes("lid") ||
              child.name.toLowerCase().includes("cap") ||
              child.name.toLowerCase().includes("top"))
          ) {
            lidRef.current = child;
            console.log("Found lid for animation:", child.name);
          }
        });
      }

      // If we have a lid reference, animate it
      if (lidRef.current) {
        // Smoothly interpolate the current angle towards the target angle
        const lidAnimationSpeed = 2.0; // Speed of animation (adjust as needed)
        const newLidAngle = THREE.MathUtils.lerp(
          lidAngle,
          targetLidAngle,
          delta * lidAnimationSpeed
        );

        // Only update if there's a significant change
        if (Math.abs(newLidAngle - lidAngle) > 0.001) {
          setLidAngle(newLidAngle);

          // Apply rotation around the hinge
          lidRef.current.rotation.x = newLidAngle;
        }
      }
    }
  });

  // Base platform for the casket
  const woodTexture = useTexture("/textures/wood.jpg");
  woodTexture.repeat.set(4, 4);
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;

  return (
    <group ref={casketRef}>
      {/* Base platform */}
      <mesh
        position={[0, -0.55, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial map={woodTexture} color="#5d4037" />
      </mesh>

      {useRealisticModel ? (
        // Realistic casket model
        <group
          ref={modelRef}
          position={[0, 0, 0]}
          scale={[1.5, 1.5, 1.5]}
          rotation={[0, Math.PI, 0]}
        >
          {modelLoaded ? (
            <Suspense fallback={null}>
              <primitive
                object={casketModel.clone()}
                castShadow
                receiveShadow
              />
            </Suspense>
          ) : (
            <mesh castShadow>
              <boxGeometry args={[1.8, 0.7, 3]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
          )}
        </group>
      ) : (
        // Fallback to the simple geometric casket
        <CasketParts />
      )}
    </group>
  );
};

export default CasketModel;
