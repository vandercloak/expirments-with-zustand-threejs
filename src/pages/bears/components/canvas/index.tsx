import { Canvas } from "@react-three/fiber";
import { memo, Suspense } from "react";
import Model from "../bear-model";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";

const BearCanvas = () => {
  return (
    <Canvas
      shadows
      dpr={[3, 3]}
      camera={{ position: [0, 0, 20], fov: 50 }}
      className="grabbable"
    >
      <OrbitControls
        minZoom={1}
        maxZoom={1}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 2}
        enableZoom={false}
      />
      <ambientLight intensity={0.8} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        shadow-mapSize={[512, 512]}
        castShadow
      />
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 } as any}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <Model />
      </PresentationControls>
      <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, -1.4, 0]}
        opacity={0.75}
        width={10}
        height={10}
        blur={2.6}
        far={2}
      />
      <Environment preset="forest" />
    </Canvas>
  );
};

export default memo(BearCanvas);
