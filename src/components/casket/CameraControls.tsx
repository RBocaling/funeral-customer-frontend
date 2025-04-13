import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useCasketStore } from "@/store/useCasketStore";

const CameraControls = () => {
  const { camera, gl } = useThree();
  const controls = useRef();
  const isRotating = useCasketStore((state) => state.isRotating);

  // Disable rotation controls when auto-rotation is enabled
  useFrame(() => {
    if (controls.current) {
      controls.current.autoRotate = isRotating;
    }
  });

  return (
    <OrbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableZoom={true}
      enablePan={false}
      enableRotate={!isRotating}
      minDistance={2}
      maxDistance={8}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      target={new THREE.Vector3(0, 0, 0)}
      autoRotate={isRotating}
      autoRotateSpeed={1}
    />
  );
};

export default CameraControls;
