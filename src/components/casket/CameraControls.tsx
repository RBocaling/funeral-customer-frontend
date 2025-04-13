import { useRef } from "react";
import {  useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useCasketStore } from "@/store/useCasketStore";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const CameraControls = () => {
  const controls = useRef<OrbitControlsImpl | null>(null);
  const isRotating = useCasketStore((state) => state.isRotating);

  useFrame(() => {
    if (controls.current) {
      controls.current.autoRotate = isRotating;
      controls.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controls}
      enableZoom
      enablePan={false}
      enableRotate={!isRotating}
      minDistance={2}
      maxDistance={8}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      target={new THREE.Vector3(0, 0, 0)}
      autoRotateSpeed={1}
    />
  );
};

export default CameraControls;
