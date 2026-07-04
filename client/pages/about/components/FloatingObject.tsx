import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/**
 * FloatingObject - The abstract storytelling element that travels through the page.
 * Represents innovation and creativity.
 * Renders an interactive 3D glowing glass star (Three.js) instead of a static SVG,
 * with scroll-linked and mouse-parallax behaviour, PLUS direct interactivity:
 * hover speeds up the spin, and clicking/tapping (or Enter/Space) triggers a
 * sparkle burst. No circular background/border - fully transparent shell.
 */
export default function FloatingObject() {
  const containerRef = useRef<HTMLDivElement>(null); // outer wrapper - moved/scaled by ScrollTrigger + parallax
  const canvasHostRef = useRef<HTMLDivElement>(null); // hosts the <canvas>

  useEffect(() => {
    const container = containerRef.current;
    const canvasHost = canvasHostRef.current;
    if (!container || !canvasHost) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Three.js setup ----------
    const SIZE = 240; // matches the original viewBox footprint

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(SIZE, SIZE);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    canvasHost.appendChild(renderer.domElement);
    renderer.domElement.style.cursor = 'pointer';

    // A rotating group so mouse parallax and continuous spin can be applied independently
    const spinGroup = new THREE.Group();
    const tiltGroup = new THREE.Group();
    tiltGroup.add(spinGroup);
    scene.add(tiltGroup);

    // ---------- Build a 5-pointed star shape and extrude it into a glassy 3D gem ----------
    function createStarShape(outerRadius: number, innerRadius: number, points: number) {
      const shape = new THREE.Shape();
      const step = Math.PI / points;
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = i * step - Math.PI / 2;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();
      return shape;
    }

    const starShape = createStarShape(1.6, 0.62, 5);
    const geometry = new THREE.ExtrudeGeometry(starShape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.14,
      bevelSize: 0.1,
      bevelSegments: 4,
      curveSegments: 6,
    });
    geometry.center();

    // Paint a warm gold gradient across the facets - brighter/pale near the star's center,
    // deepening to richer amber out toward the points, so the whole star glows like it's lit from within.
    const posAttr = geometry.attributes.position;
    const vertexColors = new Float32Array(posAttr.count * 3);
    const tmpColor = new THREE.Color();
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const dist = Math.min(Math.sqrt(x * x + y * y) / 1.6, 1);
      const hue = 0.13 + dist * 0.02; // narrow warm-yellow/gold band
      const saturation = 0.85;
      const lightness = 0.88 - dist * 0.28;
      tmpColor.setHSL(hue, saturation, lightness);
      vertexColors[i * 3] = tmpColor.r;
      vertexColors[i * 3 + 1] = tmpColor.g;
      vertexColors[i * 3 + 2] = tmpColor.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(vertexColors, 3));

    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      vertexColors: true,
      metalness: 0.05,
      roughness: 0.06,
      transmission: 0.7,
      thickness: 1.4,
      ior: 1.45,
      transparent: true,
      opacity: 0.98,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMapIntensity: 1.6,
      iridescence: 0.4,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [120, 420],
      sheen: 0.85,
      sheenColor: new THREE.Color('#FFD98A'),
    });
    const star = new THREE.Mesh(geometry, material);
    spinGroup.add(star);

    // Glowing pulsing core for extra depth/light-catching, warm gold
    const coreGeometry = new THREE.IcosahedronGeometry(0.55, 0);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FFD24F'),
      transparent: true,
      opacity: 0.55,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    spinGroup.add(core);

    // Warm gold wireframe overlay for a crisp faceted edge highlight
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: '#FFE9B0', transparent: true, opacity: 0.55 });
    const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
    spinGroup.add(edgeLines);

    // Sparkle particles orbiting the star, all in warm yellow/gold tones
    const sparkleCount = 120;
    const sparkleGeometry = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    const sparkleColors = new Float32Array(sparkleCount * 3);
    const palette = [
      new THREE.Color('#FFD24F'), // gold
      new THREE.Color('#FFF3B0'), // pale yellow
      new THREE.Color('#FFB627'), // amber
      new THREE.Color('#FFE066'), // warm yellow
      new THREE.Color('#FFC85C'), // honey
      new THREE.Color('#FFF6D0'), // cream glow
    ];
    for (let i = 0; i < sparkleCount; i++) {
      const radius = 2.0 + Math.random() * 1.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      sparklePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      sparklePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      sparklePositions[i * 3 + 2] = radius * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      sparkleColors[i * 3] = c.r;
      sparkleColors[i * 3 + 1] = c.g;
      sparkleColors[i * 3 + 2] = c.b;
    }
    sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
    sparkleGeometry.setAttribute('color', new THREE.BufferAttribute(sparkleColors, 3));
    const sparkleMaterial = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
    tiltGroup.add(sparkles);

    // ---------- One-shot burst sparkles, fired on click/tap/keyboard activate ----------
    const burstCount = 40;
    const burstDirections: THREE.Vector3[] = [];
    const burstGeometry = new THREE.BufferGeometry();
    const burstPositions = new Float32Array(burstCount * 3);
    const burstColors = new Float32Array(burstCount * 3);
    for (let i = 0; i < burstCount; i++) {
      burstPositions[i * 3] = 0;
      burstPositions[i * 3 + 1] = 0;
      burstPositions[i * 3 + 2] = 0;
      const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        .normalize()
        .multiplyScalar(1.6 + Math.random() * 2.2);
      burstDirections.push(dir);
      const c = palette[Math.floor(Math.random() * palette.length)];
      burstColors[i * 3] = c.r;
      burstColors[i * 3 + 1] = c.g;
      burstColors[i * 3 + 2] = c.b;
    }
    burstGeometry.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3));
    burstGeometry.setAttribute('color', new THREE.BufferAttribute(burstColors, 3));
    const burstMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const burstPoints = new THREE.Points(burstGeometry, burstMaterial);
    tiltGroup.add(burstPoints);

    const burstProgress = { value: 0 };
    const triggerBurst = () => {
      gsap.killTweensOf(burstProgress);
      burstProgress.value = 0;
      burstMaterial.opacity = 1;
      gsap.to(burstProgress, {
        value: 1,
        duration: 0.9,
        ease: 'power2.out',
        onUpdate: () => {
          const attr = burstGeometry.attributes.position as THREE.BufferAttribute;
          for (let i = 0; i < burstCount; i++) {
            const dir = burstDirections[i];
            attr.setXYZ(i, dir.x * burstProgress.value, dir.y * burstProgress.value, dir.z * burstProgress.value);
          }
          attr.needsUpdate = true;
          burstMaterial.opacity = 1 - burstProgress.value;
        },
      });

      if (!prefersReducedMotion) {
        gsap.fromTo(
          spinGroup.scale,
          { x: 1, y: 1, z: 1 },
          { x: 1.18, y: 1.18, z: 1.18, duration: 0.16, ease: 'power2.out', yoyo: true, repeat: 1 }
        );
        gsap.fromTo(
          coreMaterial,
          { opacity: 0.55 },
          { opacity: 1, duration: 0.14, ease: 'power2.out', yoyo: true, repeat: 1 }
        );
        if (spinTween) {
          gsap.fromTo(spinTween, { timeScale: 4.5 }, { timeScale: 1, duration: 1.3, ease: 'power2.out' });
        }
      }
    };

    // ---------- Lighting - warm key/rim/fill/gold lights that orbit for a glowing, sunlit effect ----------
    const ambient = new THREE.AmbientLight('#fff6d8', 0.4);
    scene.add(ambient);

    const keyLight = new THREE.PointLight('#FFD700', 16, 20);
    keyLight.position.set(3, 3, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight('#FFA500', 14, 20);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight('#FFF3B0', 10, 20);
    fillLight.position.set(-2, 3, 2);
    scene.add(fillLight);

    const goldLight = new THREE.PointLight('#FFB300', 8, 18);
    goldLight.position.set(0, -3, 2);
    scene.add(goldLight);

    // ---------- Render loop ----------
    let frameId: number;
    const clock = new THREE.Clock();
    const coreColor = new THREE.Color();
    const renderLoop = () => {
      frameId = window.requestAnimationFrame(renderLoop);
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        core.rotation.x = t * 0.6;
        core.rotation.y = t * 0.4;
        sparkles.rotation.y = t * 0.1;
        sparkles.rotation.x = t * 0.06;

        const pulse = 0.55 + Math.sin(t * 1.6) * 0.2;
        coreColor.setHSL(0.13 + Math.sin(t * 0.5) * 0.015, 0.9, 0.68);
        coreMaterial.color.copy(coreColor);
        coreMaterial.opacity = pulse;

        keyLight.position.set(Math.cos(t * 0.4) * 3.2, Math.sin(t * 0.3) * 2.2, Math.sin(t * 0.4) * 3.2);
        rimLight.position.set(Math.cos(t * 0.35 + 2) * 3, Math.sin(t * 0.45 + 2) * 2.6, Math.cos(t * 0.3 + 2) * -3);
        fillLight.position.set(Math.sin(t * 0.5 + 4) * -2.6, Math.cos(t * 0.4 + 4) * 2.4, Math.sin(t * 0.5 + 4) * 2.2);
        goldLight.position.set(Math.sin(t * 0.45 + 1) * 2.8, Math.cos(t * 0.5 + 1) * -2.8, Math.cos(t * 0.4 + 1) * 2.6);
      }

      renderer.render(scene, camera);
    };
    renderLoop();

    // ---------- Continuous spin + float (GSAP tweens Three.js object props directly) ----------
    // Slower, more subtle animations for a premium feel
    let spinTween: gsap.core.Tween | null = null;
    if (!prefersReducedMotion) {
      spinTween = gsap.to(spinGroup.rotation, {
        y: Math.PI * 2,
        duration: 45, // slower spin
        repeat: -1,
        ease: 'none',
      });
      gsap.to(spinGroup.rotation, {
        x: 0.25, // reduced tilt
        duration: 8, // slower
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(canvasHost, {
        y: -8, // reduced movement
        scale: 1.02, // reduced scale
        duration: 5, // slower
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    // ---------- Hover: speed up the spin while the pointer is over the star ----------
    const handleMouseEnter = () => {
      if (spinTween) gsap.to(spinTween, { timeScale: 2.6, duration: 0.4, ease: 'power2.out' });
      gsap.to(spinGroup.scale, { x: 1.06, y: 1.06, z: 1.06, duration: 0.35, ease: 'power2.out' });
    };
    const handleMouseLeave = () => {
      if (spinTween) gsap.to(spinTween, { timeScale: 1, duration: 0.6, ease: 'power2.out' });
      gsap.to(spinGroup.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'power2.out' });
    };
    const handleClick = () => triggerBurst();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerBurst();
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);
    container.addEventListener('keydown', handleKeyDown);

    // ---------- Scroll-linked appearance changes (same data-attribute contract as before) ----------
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-object-section]'));

    sections.forEach((section) => {
      const isDark = section.hasAttribute('data-dark');
      const scale = parseFloat(section.getAttribute('data-object-scale') || '1');
      const opacity = parseFloat(section.getAttribute('data-object-opacity') || '0.6');
      const x = parseFloat(section.getAttribute('data-object-x') || '0');
      const y = parseFloat(section.getAttribute('data-object-y') || '0');
      const blur = parseFloat(section.getAttribute('data-object-blur') || '0');

      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to(container, {
            scale,
            opacity,
            x,
            y,
            filter: `blur(${blur}px)`,
            duration: 1.2,
            ease: 'power3.out',
          });
          gsap.to(material.color, {
            r: isDark ? 0.9 : 1,
            g: isDark ? 0.72 : 0.95,
            b: isDark ? 0.3 : 0.75,
            duration: 0.9,
            ease: 'power2.out',
          });
          gsap.to(material, {
            opacity: isDark ? 0.9 : 0.96,
            duration: 0.9,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(container, {
            scale: 1,
            opacity: 0.6,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
          });
        },
      });
    });

    // ---------- Mouse parallax + gentle 3D tilt towards the cursor ----------
    const isTouchDevice =
      'ontouchstart' in window ||
      (navigator as unknown as { maxTouchPoints?: number }).maxTouchPoints! > 0;

    let rafId: number | null = null;
    let lastEvent: MouseEvent | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      if (isTouchDevice) return;
      lastEvent = event;
      if (rafId != null) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        if (!lastEvent) return;

        const nx = lastEvent.clientX / window.innerWidth - 0.5;
        const ny = lastEvent.clientY / window.innerHeight - 0.5;

        const xPos = nx * 16;
        const yPos = ny * 16;

        gsap.to(container, {
          x: xPos,
          y: yPos,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        gsap.to(tiltGroup.rotation, {
          y: nx * 0.5,
          x: -ny * 0.4,
          duration: 0.9,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    if (!isTouchDevice) window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ---------- Cleanup ----------
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('keydown', handleKeyDown);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.cancelAnimationFrame(frameId);
      geometry.dispose();
      material.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      edges.dispose();
      edgeMaterial.dispose();
      sparkleGeometry.dispose();
      sparkleMaterial.dispose();
      burstGeometry.dispose();
      burstMaterial.dispose();
      renderer.dispose();
      if (canvasHost.contains(renderer.domElement)) {
        canvasHost.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="floating-object"
      role="button"
      tabIndex={0}
      aria-label="Interactive glowing star - hover to spin faster, tap for a sparkle burst"
      style={{
        background: 'transparent',
        borderRadius: 0,
        boxShadow: 'none',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        display: 'inline-block',
        pointerEvents: 'auto',
      }}
    >
      <div
        className="floating-object-core"
        style={{ background: 'transparent', borderRadius: 0, boxShadow: 'none', border: 'none' }}
      >
        <div
          className="floating-object-shell"
          ref={canvasHostRef}
          style={{
            width: 240,
            height: 240,
            background: 'transparent',
            borderRadius: 0,
            boxShadow: 'none',
            border: 'none',
            pointerEvents: 'auto',
          }}
        />
      </div>
    </div>
  );
}