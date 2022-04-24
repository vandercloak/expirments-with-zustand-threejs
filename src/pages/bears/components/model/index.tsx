import { useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useBears } from "../..";
import "./bear-model.scss";

export default function Model(props: any) {
  const ref = useRef<any>();
  const bears = useBears((state) => state.bears);
  const { nodes, materials } = useGLTF("/scene.glb") as any;

  const bearTypeLookup = {
    brown: {
      material: materials["Material.003"],
      geometry: nodes.Circle_1.geometry,
    },
    white: {
      material: materials["Material.004"],
      geometry: nodes.Circle002_1.geometry,
    },
    koala: {
      material: materials["Material.005"],
      geometry: nodes.Circle003_1.geometry,
    },
  };

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {bears.map((bear, index) => {
          const bearType = bearTypeLookup[bear.type];
          return (
            <group
              position={[0, 0, index * 2.1]}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              scale={1}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={bearType.geometry}
                material={bearType.material}
              >
                <Html scale={1} position={[-1, -0.6, -1.4]}>
                  <div className="bear-card">
                    <div className="bear-card-title">{bear.name}</div>
                  </div>
                </Html>
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

useGLTF.preload("/scene.glb");
