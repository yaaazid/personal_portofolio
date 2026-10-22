'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createRng } from '@/lib/random';
import styles from '@/styles/StarfieldBackground.module.css';

gsap.registerPlugin(ScrollTrigger);

function Stars({ count = 2400, spread = 60 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const rand = createRng(2024);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * spread * 2;
      arr[i * 3 + 1] = (rand() - 0.5) * spread * 2;
      arr[i * 3 + 2] = (rand() - 0.5) * spread * 2;
    }
    return arr;
  }, [count, spread]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0003;
      pointsRef.current.rotation.x += 0.00008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f4f1ea"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

// Drives the camera's forward motion through the starfield, tied to page scroll progress
function ScrollCamera() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  useFrame((state) => {
    const targetZ = 6 - scrollProgress.current * 45;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;
  });

  return null;
}

export default function StarfieldBackground() {
  return (
    <div className={styles.canvasWrap}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 10, 55]} />
        <Stars />
        <ScrollCamera />
      </Canvas>
    </div>
  );
}