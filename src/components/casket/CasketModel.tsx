import { useRef, useEffect, useState, Suspense, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, useGLTF } from "@react-three/drei";
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

useGLTF.preload("/models/white_casket.glb");

const CasketModel = ({ setIsLoading, activeComponent }: CasketModelProps) => {
  const casketRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const isRotating = useCasketStore((state) => state.isRotating);
  const rotationSpeed = useCasketStore((state) => state.rotationSpeed);
  const isCapOpen = useCasketStore((state) => state.isCapOpen);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [useRealisticModel] = useState(true);
  const [prevCapState, setPrevCapState] = useState(false);

  const { camera } = useThree();

  const { playLid } = useAudio();

  const { scene: casketModel } = useGLTF("/models/white_casket.glb") as GLTF & {
    scene: THREE.Group;
  };

  useEffect(() => {
    camera.position.set(0, 1.0, 3.5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useEffect(() => {
    if (modelLoaded && prevCapState !== isCapOpen) {
      playLid();
      setPrevCapState(isCapOpen);
    }
  }, [isCapOpen, prevCapState, modelLoaded, playLid]);

  const partConfigs = useCasketStore((state) => state.partConfigs);

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

  const guessCasketPart = (name: string): CasketPart | null => {
    name = name.toLowerCase();

    for (const [part, keywords] of Object.entries(partNameMapping)) {
      if (keywords.some((keyword) => name.includes(keyword))) {
        return part as CasketPart;
      }
    }

    return null;
  };

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

  const updateModelMaterials = useCallback(() => {
    if (!modelRef.current) return;

    const activeConfig = partConfigs[activeComponent];
    console.log(
      `Active component ${activeComponent} using color ${activeConfig.color}`
    );

    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = createMaterial(activeConfig);
        child.material = material;
        console.log(
          `Applied ${activeConfig.color} material to ${child.name} for ${activeComponent} part`
        );
      }
    });
  }, [activeComponent, partConfigs, createMaterial]);

  useEffect(() => {
    if (!prevPartConfigs.current) {
      prevPartConfigs.current = JSON.parse(JSON.stringify(partConfigs));
    }

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

    prevPartConfigs.current = JSON.parse(JSON.stringify(partConfigs));
  }, [partConfigs]);

  const prevPartConfigs = useRef<Record<CasketPart, CasketPartConfig> | null>(
    null
  );

  useEffect(() => {
    if (casketModel) {
      setModelLoaded(true);
      console.log("Casket model loaded successfully");

      console.log("Model hierarchy:");
      const printHierarchy = (obj: THREE.Object3D, indent = "") => {
        console.log(`${indent}${obj.name} (type: ${obj.type})`);
        if (obj instanceof THREE.Mesh) {
          console.log(`${indent}  Material: "${obj.material.type}"`);
        }
        obj.children.forEach((child) => printHierarchy(child, indent + "  "));
      };
      printHierarchy(casketModel);

      const meshNames: string[] = [];

      casketModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          meshNames.push(child.name);

          const partName = child.name.toLowerCase();
          const casketPart = guessCasketPart(partName);
          if (casketPart) {
            console.log(`Identified mesh ${child.name} as ${casketPart}`);
          }
        }
      });

      console.log("All mesh names:", meshNames);

      setTimeout(() => {
        updateModelMaterials();
      }, 100);

      setIsLoading(false);
    }
  }, [casketModel, setIsLoading, updateModelMaterials]);

  useEffect(() => {
    if (modelLoaded && modelRef.current) {
      console.log("Updating casket materials to match new configuration");
      updateModelMaterials();
    }
  }, [modelLoaded, updateModelMaterials]);

  const lidRef = useRef<THREE.Object3D | null>(null);
  const [lidAngle, setLidAngle] = useState(0);
  const targetLidAngle = isCapOpen ? Math.PI * 0.6 : 0;

  useFrame((_, delta) => {
    if (casketRef.current && isRotating) {
      casketRef.current.rotation.y += rotationSpeed;
    }

    if (modelRef.current && modelLoaded) {
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

      if (lidRef.current) {
        const lidAnimationSpeed = 2.0;
        const newLidAngle = THREE.MathUtils.lerp(
          lidAngle,
          targetLidAngle,
          delta * lidAnimationSpeed
        );

        if (Math.abs(newLidAngle - lidAngle) > 0.001) {
          setLidAngle(newLidAngle);

          lidRef.current.rotation.x = newLidAngle;
        }
      }
    }
  });

  const woodTexture = useTexture("/textures/wood.jpg");
  woodTexture.repeat.set(4, 4);
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;

  return (
    <group ref={casketRef}>
      <mesh
        position={[0, -0.55, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial map={woodTexture} color="#5d4037" />
      </mesh>

      {useRealisticModel ? (
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
        <CasketParts />
      )}
    </group>
  );
};

export default CasketModel;
