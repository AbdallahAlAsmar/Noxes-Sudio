'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Persistent, scroll-linked Three.js signal field for the landing page. */
export default function SignalField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const system = new THREE.Group();
    scene.add(system);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.82, 2),
      new THREE.MeshBasicMaterial({ color: 0xe83708, wireframe: true, transparent: true, opacity: 0.72 }),
    );
    const innerCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.42, 1),
      new THREE.MeshBasicMaterial({ color: 0xf4f1e9, wireframe: true, transparent: true, opacity: 0.28 }),
    );
    system.add(core, innerCore);

    const rings = [
      new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.008, 8, 96), new THREE.MeshBasicMaterial({ color: 0xb6b0a4, wireframe: true, transparent: true, opacity: 0.26 })),
      new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.006, 8, 96), new THREE.MeshBasicMaterial({ color: 0x68665f, wireframe: true, transparent: true, opacity: 0.24 })),
      new THREE.Mesh(new THREE.TorusGeometry(2.06, 0.004, 8, 96), new THREE.MeshBasicMaterial({ color: 0x414548, wireframe: true, transparent: true, opacity: 0.34 })),
    ];
    rings[0].rotation.set(0.9, 0.15, 0.2);
    rings[1].rotation.set(0.25, 0.8, -0.4);
    rings[2].rotation.set(-0.4, 0.2, 0.95);
    system.add(...rings);

    // A finite helical trace gives the field a clear object to follow while scrolling.
    const spinePoints: THREE.Vector3[] = [];
    for (let index = 0; index <= 180; index += 1) {
      const t = index / 180;
      const angle = t * Math.PI * 5;
      const radius = 0.95 + Math.sin(t * Math.PI) * 0.35;
      spinePoints.push(new THREE.Vector3(Math.cos(angle) * radius, (t - 0.5) * 5.6, Math.sin(angle) * radius));
    }
    const spine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(spinePoints),
      new THREE.LineBasicMaterial({ color: 0xb6b0a4, transparent: true, opacity: 0.2 }),
    );
    system.add(spine);

    let seed = 7;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const nodeCount = 90;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);
    const nodes = Array.from({ length: nodeCount }, (_, index) => {
      const radius = 1.35 + random() * 1.35;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const point = new THREE.Vector3(radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
      nodePositions.set([point.x, point.y, point.z], index * 3);
      const accent = index % 7 === 0;
      nodeColors.set(accent ? [0.91, 0.22, 0.03] : [0.48, 0.45, 0.42], index * 3);
      return point;
    });
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
    system.add(new THREE.Points(nodeGeometry, new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.88 })));

    const linePositions: number[] = [];
    nodes.forEach((node, index) => nodes.slice(index + 1).forEach((other) => {
      if (node.distanceTo(other) < 0.78) linePositions.push(node.x, node.y, node.z, other.x, other.y, other.z);
    }));
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    system.add(new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: 0x68665f, transparent: true, opacity: 0.18 })));

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0 };
    let targetScroll = 0;
    let currentScroll = 0;
    let previousTime = 0;
    let frame = 0;

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
    const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const updateScroll = () => {
      targetScroll = clamp01(window.scrollY / maxScroll());
    };
    const render = () => renderer.render(scene, camera);
    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (reducedMotion) render();
    };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(container);
    window.addEventListener('resize', resize);
    resize();

    if (reducedMotion) {
      system.rotation.set(0.16, -0.35, 0.06);
      camera.lookAt(0, 0, 0);
      render();
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('scroll', updateScroll, { passive: true });
      updateScroll();

      const animate = (time: number) => {
        frame = requestAnimationFrame(animate);
        if (document.visibilityState === 'hidden') return;

        const delta = previousTime ? Math.min(time - previousTime, 50) : 16;
        previousTime = time;
        currentScroll += (targetScroll - currentScroll) * (1 - Math.exp(-delta * 0.006));

        const drift = time * 0.00018;
        system.rotation.y = -0.35 + currentScroll * Math.PI * 1.15 + pointer.x * 0.06 + drift * 0.45;
        system.rotation.x = 0.12 + currentScroll * 0.42 - pointer.y * 0.05;
        system.rotation.z = Math.sin(currentScroll * Math.PI * 2) * 0.06;
        system.position.y = -currentScroll * 0.75;
        core.rotation.z = drift * 1.4;
        innerCore.rotation.y = -drift * 2.1;
        rings[0].rotation.z += delta * 0.00005;
        rings[1].rotation.x += delta * 0.000035;
        rings[2].rotation.y -= delta * 0.000025;
        camera.position.x = Math.sin(currentScroll * Math.PI * 2) * 0.28;
        camera.position.z = 5.4 + Math.sin(currentScroll * Math.PI) * 0.45;
        camera.lookAt(0, 0, 0);
        render();
      };
      frame = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', updateScroll);
      scene.traverse((object) => {
        if (object instanceof THREE.Line || object instanceof THREE.Points || object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
