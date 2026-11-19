'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** A sculpted, scroll-linked NOXES mechanism rendered behind the landing page. */
export default function SignalField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x111315, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    container.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xf4f1e9, 0x111315, 1.1));
    const key = new THREE.DirectionalLight(0xf4f1e9, 3.2);
    key.position.set(-3, 4, 6);
    scene.add(key);
    const accent = new THREE.PointLight(0xe83708, 9, 12, 2);
    accent.position.set(2.8, -1.2, 4);
    scene.add(accent);

    const mechanism = new THREE.Group();
    scene.add(mechanism);

    const paper = new THREE.MeshStandardMaterial({ color: 0xf4f1e9, metalness: 0.18, roughness: 0.55 });
    const graphite = new THREE.MeshStandardMaterial({ color: 0x414548, metalness: 0.62, roughness: 0.34 });
    const carbon = new THREE.MeshStandardMaterial({ color: 0x181a1d, metalness: 0.76, roughness: 0.28 });
    const vermilion = new THREE.MeshStandardMaterial({ color: 0xe83708, emissive: 0x491205, emissiveIntensity: 0.32, metalness: 0.5, roughness: 0.32 });

    // Dense machined core: a real central form, not a decorative particle field.
    const rear = new THREE.Mesh(new THREE.CylinderGeometry(1.58, 1.58, 0.22, 96), carbon);
    rear.rotation.x = Math.PI / 2;
    mechanism.add(rear);

    const face = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.18, 0.16, 96), graphite);
    face.position.z = 0.18;
    face.rotation.x = Math.PI / 2;
    mechanism.add(face);

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.32, 64), vermilion);
    hub.position.z = 0.38;
    hub.rotation.x = Math.PI / 2;
    mechanism.add(hub);

    const hubInset = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.36, 48), paper);
    hubInset.position.z = 0.58;
    hubInset.rotation.x = Math.PI / 2;
    mechanism.add(hubInset);

    const ringSpecs = [
      { radius: 1.76, tube: 0.055, material: vermilion, rotation: [0.18, 0.18, 0.12] },
      { radius: 2.16, tube: 0.028, material: paper, rotation: [0.72, -0.16, 0.28] },
      { radius: 2.55, tube: 0.018, material: graphite, rotation: [-0.42, 0.34, -0.2] },
      { radius: 2.9, tube: 0.012, material: graphite, rotation: [0.06, 0.78, 0.48] },
    ] as const;

    const rings: THREE.Mesh[] = [];
    ringSpecs.forEach((spec) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(spec.radius, spec.tube, 12, 160), spec.material);
      ring.rotation.set(spec.rotation[0], spec.rotation[1], spec.rotation[2]);
      rings.push(ring);
      mechanism.add(ring);
    });

    const louverCount = 18;
    const louvers: THREE.Mesh[] = [];
    for (let index = 0; index < louverCount; index += 1) {
      const angle = (index / louverCount) * Math.PI * 2;
      const louver = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.34, 0.075), index % 6 === 0 ? vermilion : graphite);
      louver.position.set(Math.cos(angle) * 2.34, Math.sin(angle) * 2.34, 0.12);
      louver.rotation.z = angle;
      louvers.push(louver);
      mechanism.add(louver);
    }

    const plateGeometry = new THREE.BoxGeometry(0.95, 0.075, 0.12);
    const plates: THREE.Mesh[] = [];
    [-1, 1].forEach((side) => {
      const plate = new THREE.Mesh(plateGeometry, vermilion);
      plate.position.set(side * 1.72, -0.62, 0.36);
      plate.rotation.z = side * -0.12;
      plates.push(plate);
      mechanism.add(plate);
    });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0 };
    let targetScroll = 0;
    let currentScroll = 0;
    let previousTime = 0;
    let frame = 0;

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
    const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const updateScroll = () => { targetScroll = clamp01(window.scrollY / maxScroll()); };

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (reducedMotion) renderer.render(scene, camera);
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
      mechanism.position.set(window.innerWidth < 1024 ? 0 : 2.15, -0.12, 0);
      mechanism.rotation.set(-0.12, -0.48, 0.08);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('scroll', updateScroll, { passive: true });
      updateScroll();

      const animate = (time: number) => {
        frame = requestAnimationFrame(animate);
        if (document.visibilityState === 'hidden') return;

        const delta = previousTime ? Math.min(time - previousTime, 50) : 16;
        previousTime = time;
        currentScroll += (targetScroll - currentScroll) * (1 - Math.exp(-delta * 0.007));

        const mobile = window.innerWidth < 1024;
        mechanism.position.x = (mobile ? 0.1 : 2.15) + Math.sin(currentScroll * Math.PI * 2) * 0.28;
        mechanism.position.y = 0.05 - currentScroll * 1.5 - pointer.y * 0.05;
        mechanism.position.z = -0.15 + currentScroll * 0.35;
        mechanism.rotation.x = -0.12 + currentScroll * 0.75 - pointer.y * 0.06;
        mechanism.rotation.y = -0.48 + currentScroll * Math.PI * 1.7 + pointer.x * 0.08;
        mechanism.rotation.z = Math.sin(currentScroll * Math.PI * 2) * 0.08;

        hub.rotation.z = time * 0.00018;
        hubInset.rotation.z = -time * 0.00012;
        rings[0].rotation.z += delta * 0.00008;
        rings[1].rotation.z -= delta * 0.000045;
        rings[2].rotation.y += delta * 0.000025;
        louvers.forEach((louver, index) => {
          louver.position.z = 0.12 + Math.sin(time * 0.0011 + index) * 0.035;
        });
        plates.forEach((plate, index) => {
          plate.material = index === 0 ? vermilion : vermilion;
          plate.position.z = 0.36 + Math.sin(time * 0.0015 + index) * 0.04;
        });

        renderer.render(scene, camera);
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
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 opacity-[0.82]" aria-hidden="true" />;
}
