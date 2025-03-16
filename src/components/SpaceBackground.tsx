import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SpaceBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    camera.position.set(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Star field creation
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 10000;
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = -Math.random() * 2000;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8
    });

    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Animation
    const flightSpeed = 2;

    const animate = () => {
      requestAnimationFrame(animate);

      const positionsArray = starField.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < starsCount; i++) {
        positionsArray[i * 3 + 2] += flightSpeed;
        if (positionsArray[i * 3 + 2] > 0) {
          positionsArray[i * 3 + 2] = -2000;
        }
      }

      starField.geometry.attributes.position.needsUpdate = true;
      starField.rotation.z += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};