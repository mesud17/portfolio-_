import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

interface NodeProps {
  position: [number, number, number];
  label: string;
  size: number;
  color?: string;
  pulseSpeed?: number;
  isActive?: boolean;
}

/**
 * A glowing sphere representing an architectural component node.
 * Features a pulsing outer halo and a crisp, screen-aligned HTML text label.
 */
function SystemNode({ 
  position, 
  label, 
  size, 
  color = "#ff6000", 
  pulseSpeed = 2.0, 
  isActive = false 
}: NodeProps) {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const elapsed = state.clock.getElapsedTime();
      // Outer glow expansion/contraction
      const scaleFactor = 1.0 + Math.abs(Math.sin(elapsed * pulseSpeed)) * 0.3;
      glowRef.current.scale.setScalar(scaleFactor);
      
      const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;
      glowMaterial.opacity = 0.12 - Math.abs(Math.sin(elapsed * pulseSpeed)) * 0.06;
    }
  });

  return (
    <group position={position}>
      {/* Central Core Sphere */}
      <mesh>
        <sphereGeometry args={[size, 24, 24]} />
        <meshBasicMaterial 
          color={isActive ? "#ff6000" : "#d1d5db"} 
          toneMapped={false}
        />
      </mesh>

      {/* Emissive Outer Glow Mesh */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 1.6, 24, 24]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.08} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Screen-Positioned Label */}
      <Html
        distanceFactor={5.5}
        position={[0, size + 0.18, 0]}
        center
        className="pointer-events-none select-none"
      >
        <div className={`px-2 py-0.5 rounded-premium-sm border font-mono text-[9px] font-semibold tracking-wider uppercase backdrop-blur-md transition-all duration-500 whitespace-nowrap ${
          isActive 
            ? 'bg-orange-accent-dim/40 border-orange-accent/40 text-orange-accent shadow-[0_0_12px_rgba(255,96,0,0.18)]' 
            : 'bg-[#0e0e12]/80 border-white/[0.04] text-text-secondary hover:text-text-primary'
        }`}>
          {label}
        </div>
      </Html>
    </group>
  );
}

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  pulseSpeed?: number;
}

/**
 * A line link connecting two architectural nodes.
 * Features automated opacity pulsing to indicate line activity.
 */
function Connection({ 
  start, 
  end, 
  color = "#ff6000", 
  pulseSpeed = 1.8 
}: ConnectionProps) {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, [color]);

  const lineMesh = useMemo(() => {
    return new THREE.Line(lineGeometry, lineMaterial);
  }, [lineGeometry, lineMaterial]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    // Glowing line opacity pulse
    lineMaterial.opacity = 0.08 + Math.abs(Math.sin(elapsed * pulseSpeed)) * 0.22;
  });

  return <primitive object={lineMesh} />;
}

interface DataPacketProps {
  start: [number, number, number];
  end: [number, number, number];
  speed?: number;
  delay?: number;
}

/**
 * A small glowing particle that travels along the network lines.
 * Visualizes structural data flow.
 */
function DataPacket({ 
  start, 
  end, 
  speed = 0.35, 
  delay = 0 
}: DataPacketProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);

  useFrame((state) => {
    if (meshRef.current) {
      const elapsed = state.clock.getElapsedTime();
      // Calculate interpolation value t with speed and offset delay
      const t = ((elapsed * speed) + delay) % 1.0;
      meshRef.current.position.copy(startVec).lerp(endVec, t);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial 
        color="#ff6000" 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * Main Network Nodes Scene.
 * Integrates passive auto-rotation and interactive pointer parallax tilt.
 */
export function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const elapsed = state.clock.getElapsedTime();
    // Subtle auto-rotation around Y axis
    const baseRotationY = elapsed * 0.035;

    // Smooth camera tilt response based on mouse pointer coordinates
    const targetX = state.pointer.x * 0.22;
    const targetY = state.pointer.y * 0.22;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, baseRotationY + targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY * 0.4, 0.05);
  });

  // Balanced 3D node coordinates mapping
  const nodes = useMemo(() => [
    { position: [0, 0, 0] as [number, number, number], label: "Core AI Engine", size: 0.24, isActive: true },
    { position: [-1.8, 1.1, 0.4] as [number, number, number], label: "Frontend UI", size: 0.14 },
    { position: [1.8, 1.0, -0.4] as [number, number, number], label: "Backend Core", size: 0.14 },
    { position: [0.7, -1.3, 0.8] as [number, number, number], label: "API Gateway", size: 0.12 },
    { position: [1.6, -1.0, -0.8] as [number, number, number], label: "Vector DB", size: 0.12 },
    { position: [-1.6, -1.1, -0.6] as [number, number, number], label: "Cloud Infra", size: 0.12 },
  ], []);

  // System link mappings
  const connections = useMemo(() => [
    { start: 0, end: 1 }, // AI <-> Frontend
    { start: 0, end: 2 }, // AI <-> Backend
    { start: 0, end: 3 }, // AI <-> API Gateway
    { start: 0, end: 4 }, // AI <-> Vector DB
    { start: 0, end: 5 }, // AI <-> Cloud Infra
    { start: 1, end: 2 }, // Frontend <-> Backend
    { start: 1, end: 3 }, // Frontend <-> API Gateway
    { start: 2, end: 4 }, // Backend <-> Vector DB
    { start: 3, end: 5 }, // API Gateway <-> Cloud Infra
    { start: 4, end: 5 }, // Vector DB <-> Cloud Infra
  ], []);

  return (
    <group ref={groupRef}>
      {/* Subtle lighting settings to define material depth */}
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 8]} intensity={1.2} color="#ff6000" />
      <pointLight position={[-8, -8, -8]} intensity={0.4} color="#ffffff" />

      {/* Render connection lines and traveling packets */}
      {connections.map((conn, idx) => {
        const startPos = nodes[conn.start].position;
        const endPos = nodes[conn.end].position;
        return (
          <group key={`conn-${idx}`}>
            <Connection start={startPos} end={endPos} />
            <DataPacket 
              start={startPos} 
              end={endPos} 
              speed={0.28 + (idx * 0.03)} 
              delay={idx * 0.15} 
            />
          </group>
        );
      })}

      {/* Render central & peripheral system nodes */}
      {nodes.map((node, idx) => (
        <SystemNode
          key={idx}
          position={node.position}
          label={node.label}
          size={node.size}
          isActive={node.isActive}
        />
      ))}
    </group>
  );
}

export default NetworkNodes;
