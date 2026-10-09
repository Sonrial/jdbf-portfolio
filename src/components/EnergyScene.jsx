import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import * as THREE from 'three';

export default function EnergyScene({ theme }) {
  const host = useRef(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const controls = useRef(null);
  useEffect(() => {
    pausedRef.current = paused;
    controls.current?.();
  }, [paused]);
  useEffect(() => {
    const element = host.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    element.appendChild(renderer.domElement);
    element.dataset.ready = 'true';
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-4.2, 4.2, 3.1, -3.1, 0.1, 100);
    camera.position.set(7, 6.5, 9); camera.lookAt(0, 0, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 2.2));
    const light = new THREE.DirectionalLight(0xffffff, 4); light.position.set(-3, 7, 4); scene.add(light);
    const warm = new THREE.DirectionalLight(0xbccc8d, 2); warm.position.set(4, 2, -5); scene.add(warm);
    const system = new THREE.Group(); scene.add(system);
    const dark = theme === 'dark';
    const slabMaterial = new THREE.MeshStandardMaterial({ color: dark ? 0x475047 : 0xd4d8cf, roughness: 0.55, metalness: 0.35 });
    const frameMaterial = new THREE.MeshStandardMaterial({ color: dark ? 0x8b9488 : 0x727c70, roughness: 0.4, metalness: 0.65 });
    const cellMaterial = new THREE.MeshStandardMaterial({ color: 0x263d33, roughness: 0.25, metalness: 0.6 });
    const accentMaterial = new THREE.MeshStandardMaterial({ color: 0xa8bd71, roughness: 0.25, metalness: 0.5, emissive: 0x617b26, emissiveIntensity: 0.28 });
    const lineMaterial = new THREE.LineBasicMaterial({ color: dark ? 0xabb49f : 0x7f8b73, transparent: true, opacity: 0.38 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.18, 2.75), slabMaterial); base.position.y = -0.95; system.add(base);
    const mid = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.14, 2.6), frameMaterial); mid.position.y = -0.28; system.add(mid);
    const board = new THREE.Group(); board.position.y = 0.56; system.add(board);
    const panel = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.12, 2.6), frameMaterial); board.add(panel);
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 4; column++) {
        const cell = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.025, 0.76), cellMaterial);
        cell.position.set((column - 1.5) * 0.8, 0.077, (row - 1) * 0.8); board.add(cell);
        for (let divider = -1; divider <= 1; divider++) {
          const stripe = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.34, 0.015, divider * 0.18), new THREE.Vector3(0.34, 0.015, divider * 0.18)]), lineMaterial);
          cell.add(stripe);
        }
      }
    }
    for (const x of [-1.45, 1.45]) for (const z of [-1.05, 1.05]) {
      const support = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.6, 8), frameMaterial); support.position.set(x, -0.2, z); system.add(support);
    }
    const orbit = new THREE.Group(); system.add(orbit); orbit.rotation.set(0.35, 0, 0.22);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.012, 6, 160), accentMaterial); ring.rotation.x = Math.PI / 2; orbit.add(ring);
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), accentMaterial); orbit.add(node);
    const secondNode = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), accentMaterial); orbit.add(secondNode);
    const target = { x: 0, y: 0 };
    let visible = true, frame = 0, lastFrame = 0, elapsed = 0, disposed = false, contextAvailable = true;
    const render = () => { if (!disposed && contextAvailable) renderer.render(scene, camera); };
    const animate = (time) => {
      frame = 0;
      if (disposed || !visible || document.hidden || pausedRef.current || reduced.matches || !contextAvailable) return;
      if (time - lastFrame > 32) {
        const delta = Math.min((time - lastFrame) / 1000, 0.06); lastFrame = time; elapsed += delta;
        system.rotation.y += (target.x * 0.22 - system.rotation.y) * 0.07;
        system.rotation.x += (target.y * 0.08 - system.rotation.x) * 0.07;
        board.position.y = 0.56 + Math.sin(elapsed * 0.8) * 0.045;
        node.position.set(Math.cos(elapsed * 0.45) * 2.55, 0, Math.sin(elapsed * 0.45) * 2.55);
        secondNode.position.set(Math.cos(elapsed * 0.45 + Math.PI) * 2.55, 0, Math.sin(elapsed * 0.45 + Math.PI) * 2.55);
        render();
      }
      frame = requestAnimationFrame(animate);
    };
    const resume = () => {
      cancelAnimationFrame(frame); frame = 0;
      if (visible && !document.hidden && !pausedRef.current && !reduced.matches && contextAvailable) { lastFrame = performance.now(); frame = requestAnimationFrame(animate); }
      else render();
    };
    const resize = () => {
      const width = element.clientWidth, height = element.clientHeight;
      renderer.setSize(width, height);
      const aspect = width / height;
      camera.left = -3.2 * aspect; camera.right = 3.2 * aspect; camera.top = 3.2; camera.bottom = -3.2; camera.updateProjectionMatrix(); render();
    };
    const move = event => { if (reduced.matches || pausedRef.current) return; const rect = element.getBoundingClientRect(); target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2; target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2; };
    const leave = () => { target.x = 0; target.y = 0; };
    const contextLost = event => { event.preventDefault(); contextAvailable = false; cancelAnimationFrame(frame); element.dataset.ready = 'false'; };
    const contextRestored = () => { contextAvailable = true; element.dataset.ready = 'true'; resize(); resume(); };
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(element);
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; resume(); }); observer.observe(element);
    document.addEventListener('visibilitychange', resume); reduced.addEventListener('change', resume);
    element.addEventListener('pointermove', move); element.addEventListener('pointerleave', leave);
    renderer.domElement.addEventListener('webglcontextlost', contextLost); renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
    node.position.set(2.55, 0, 0); secondNode.position.set(-2.55, 0, 0); resize(); resume(); controls.current = resume;
    return () => {
      disposed = true; controls.current = null; cancelAnimationFrame(frame); resizeObserver.disconnect(); observer.disconnect();
      document.removeEventListener('visibilitychange', resume); reduced.removeEventListener('change', resume);
      element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', leave);
      const geometries = new Set(), materials = new Set();
      scene.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material) materials.add(object.material); });
      geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose());
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', contextRestored);
      renderer.dispose(); renderer.domElement.remove(); delete element.dataset.ready;
    };
  }, [theme]);

  return <div className="energy-scene-wrap"><div className="energy-scene" ref={host} role="img" aria-label="Ilustración tridimensional de un panel solar en capas, rodeado por una órbita de energía"><svg className="scene-static" viewBox="0 0 400 300" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1"><ellipse cx="200" cy="155" rx="160" ry="80" transform="rotate(-20 200 155)" /><path d="m75 160 125-65 125 65-125 65zM75 135l125-65 125 65-125 65z" /><path fill="currentColor" fillOpacity=".12" d="m75 105 125-65 125 65-125 65z" /><path d="m116 84 125 65m-83-86 125 65m-166 0 125-65m-83 86 125-65" /></g></svg></div><button className="scene-toggle icon-button" aria-label={paused ? 'Reanudar animación 3D' : 'Pausar animación 3D'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={12} /> : <Pause size={12} />}</button></div>;
}
