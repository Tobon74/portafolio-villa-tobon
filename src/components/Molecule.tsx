import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text, Line } from '@react-three/drei';

const Node = ({ position, label, active = false }: { position: [number, number, number], label: string, active?: boolean }) => {
  const handleClick = () => {
  if (active) {
    const routes: { [key: string]: string } = {
      "Neurociencias Investigaciones": "/investigaciones/neuro-investigacion.html",
      "IA Agéntica Clínica": "/investigaciones/ia-agentica.html",
      "Data Clínica": "/investigaciones/data-clinica.html",
      "Hackathones": "/investigaciones/hackathons.html"
    };

    const target = routes[label];
    if (target) {
      window.location.href = target;
    }
  }
};

  return (
    <group position={position}>
      <Float speed={active ? 2 : 1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere 
          args={[active ? 0.2 : 0.06, 32, 32]} 
          onClick={handleClick}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <MeshDistortMaterial 
            color={active ? "#00f2ff" : "#475569"} 
            speed={active ? 3 : 0} 
            distort={active ? 0.4 : 0} 
            emissive={active ? "#00f2ff" : "#000"}
            emissiveIntensity={active ? 1.5 : 0}
            transparent
            opacity={active ? 1 : 0.6}
          />
        </Sphere>
        {active && (
          <Text
            position={[0, 0.45, 0]} // Elevado para no encimarse
            fontSize={0.12}
            color="#e2e8f0"
            anchorX="center"
            maxWidth={1.5}
            textAlign="center"
          >
            {label}
          </Text>
        )}
      </Float>
    </group>
  );
};

export default function Molecule() {
  const nodes = [
    { pos: [0, 1.8, 0.5] as [number, number, number], label: "Neurociencias Investigaciones", active: true },
    { pos: [1.8, 0.5, -0.5] as [number, number, number], label: "IA Agéntica Clínica", active: true },
    { pos: [-1.5, -0.8, 1] as [number, number, number], label: "Data Clínica", active: true },
    { pos: [0.8, -1.8, -1] as [number, number, number], label: "Hackathones", active: true },
    // Nodos estéticos (ruido)
    { pos: [-1.2, 1.2, -1.2] as [number, number, number], label: "", active: false },
    { pos: [2.2, -0.5, 1.5] as [number, number, number], label: "", active: false },
    { pos: [-0.5, 0.8, 2.2] as [number, number, number], label: "", active: false },
  ];

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        {/* Núcleo Central (Ancla de las líneas) */}
        <Sphere args={[0.05, 16, 16]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#00f2ff" transparent opacity={0.2} />
        </Sphere>

        {nodes.map((node, i) => (
          <React.Fragment key={i}>
            {/* Líneas de conexión (Sinapsis) */}
            <Line
              points={[[0, 0, 0], node.pos]} // Del centro al nodo
              color={node.active ? "#00f2ff" : "#334155"}
              lineWidth={0.5}
              transparent
              opacity={node.active ? 0.3 : 0.1}
            />
            <Node position={node.pos} label={node.label} active={node.active} />
          </React.Fragment>
        ))}
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}
