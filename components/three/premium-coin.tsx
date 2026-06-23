'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface PremiumCoinProps {
  symbol: string;
  label: string;
  color: string;
  isCrypto?: boolean;
  isGold?: boolean;
  width?: number;
  height?: number;
}

export function PremiumCoin3D({ 
  symbol, 
  label, 
  color, 
  isCrypto = false, 
  isGold = false,
  width = 400,
  height = 400,
}: PremiumCoinProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const w = container.clientWidth || width;
    const h = container.clientHeight || height;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0.5, 4);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2.5;
    controls.target.set(0, 0, 0);

    // Lights
    const ambient = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambient);
    const mainLight = new THREE.DirectionalLight(0xffeedd, 3);
    mainLight.position.set(3, 5, 4);
    scene.add(mainLight);
    const fillLight = new THREE.DirectionalLight(0x4488ff, 0.8);
    fillLight.position.set(-3, 2, -4);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffd700, 0.4);
    rimLight.position.set(0, -2, 5);
    scene.add(rimLight);

    // --- CREATE COIN TEXTURE (realistic like dollar coin) ---
    const createCoinTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      // Base metallic gradient
      const grad = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
      if (isGold) {
        grad.addColorStop(0, '#f5d742');
        grad.addColorStop(0.4, '#e8b830');
        grad.addColorStop(0.7, '#c99220');
        grad.addColorStop(1, '#a07018');
      } else if (isCrypto) {
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, color);
        grad.addColorStop(0.7, color);
        grad.addColorStop(1, '#1a1a2e');
      } else {
        grad.addColorStop(0, '#f5f5f5');
        grad.addColorStop(0.3, '#d4d4d4');
        grad.addColorStop(0.6, '#b0b0b0');
        grad.addColorStop(0.8, '#888888');
        grad.addColorStop(1, '#555555');
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(512, 512, 460, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring
      ctx.strokeStyle = isGold ? '#f5c842' : '#ffffff';
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.arc(512, 512, 445, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(512, 512, 430, 0, Math.PI * 2);
      ctx.stroke();

      // Inner dots ring (like real coin)
      for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * Math.PI * 2;
        const x = 512 + Math.cos(angle) * 400;
        const y = 512 + Math.sin(angle) * 400;
        ctx.fillStyle = isGold ? '#f5c842' : 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // "IN GOD WE TRUST" (top arc)
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isGold ? '#8c6010' : '#333';
      ctx.font = 'bold 36px "Inter", "Times New Roman", serif';
      for (let i = 0; i < 16; i++) {
        const angle = -Math.PI * 0.7 + (i / 15) * Math.PI * 1.4;
        const x = 512 + Math.cos(angle) * 340;
        const y = 512 + Math.sin(angle) * 340;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        const char = 'IN GOD WE TRUST'[i] || '';
        ctx.fillText(char, 0, 0);
        ctx.restore();
      }

      // "PLURIBUS UNUM" (bottom arc)
      ctx.fillStyle = isGold ? '#8c6010' : '#444';
      ctx.font = 'bold 28px "Inter", "Times New Roman", serif';
      for (let i = 0; i < 13; i++) {
        const angle = Math.PI * 0.7 - (i / 12) * Math.PI * 1.4;
        const x = 512 + Math.cos(angle) * 340;
        const y = 512 + Math.sin(angle) * 340;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle - Math.PI / 2);
        const char = 'PLURIBUS UNUM'[i] || '';
        ctx.fillText(char, 0, 0);
        ctx.restore();
      }

      // Center symbol (large)
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      if (isCrypto) {
        ctx.fillStyle = color;
        ctx.font = 'bold 180px "Inter", "Arial", sans-serif';
        ctx.fillText(symbol === 'BTC' ? '₿' : symbol === 'ETH' ? '⟠' : symbol === 'SOL' ? '◎' : symbol === 'XRP' ? '✕' : '◆', 512, 500);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 60px "Inter", "Arial", sans-serif';
        ctx.shadowBlur = 10;
        ctx.fillText(label, 512, 620);
      } else if (isGold) {
        ctx.fillStyle = '#f5c842';
        ctx.font = 'bold 200px "Inter", "Arial", sans-serif';
        ctx.fillText('Au', 512, 480);
        ctx.fillStyle = '#8c6010';
        ctx.font = 'bold 40px "Inter", "Arial", sans-serif';
        ctx.fillText('999.9', 512, 600);
        ctx.fillText('GOLD', 512, 660);
      } else {
        // Forex coin — like dollar
        ctx.fillStyle = isGold ? '#8c6010' : '#222';
        ctx.font = 'bold 160px "Inter", "Arial", sans-serif';
        ctx.fillText(symbol, 512, 490);
        ctx.fillStyle = isGold ? '#a07018' : '#444';
        ctx.font = 'bold 48px "Inter", "Arial", sans-serif';
        ctx.fillText(label, 512, 590);
        ctx.fillStyle = isGold ? '#a07018' : '#555';
        ctx.font = 'bold 32px "Inter", "Arial", sans-serif';
        ctx.fillText('ONE ' + label.toUpperCase(), 512, 650);
      }

      // Year
      ctx.shadowBlur = 0;
      ctx.fillStyle = isGold ? '#a07018' : 'rgba(255,255,255,0.3)';
      ctx.font = 'bold 28px "Inter", "Arial", sans-serif';
      ctx.fillText('2025', 512, 770);

      // Reflection highlight
      const hl = ctx.createRadialGradient(300, 300, 20, 350, 350, 250);
      hl.addColorStop(0, 'rgba(255,255,255,0.25)');
      hl.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = hl;
      ctx.beginPath();
      ctx.arc(350, 350, 250, 0, Math.PI * 2);
      ctx.fill();

      return new THREE.CanvasTexture(canvas);
    };

    const texture = createCoinTexture();
    texture.needsUpdate = true;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Coin body
    const size = 1.2;
    const geo = new THREE.CylinderGeometry(size, size, size * 0.12, 64);
    const mat = new THREE.MeshPhysicalMaterial({
      map: texture,
      metalness: isGold ? 0.95 : 0.8,
      roughness: isGold ? 0.15 : 0.25,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      reflectivity: 1,
      envMapIntensity: 1.8,
      emissive: new THREE.Color(color),
      emissiveIntensity: isGold ? 0.05 : 0.1,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI / 2;
    scene.add(mesh);

    // Outer rim (golden ring)
    const rimGeo = new THREE.TorusGeometry(size * 1.03, size * 0.04, 32, 64);
    const rimMat = new THREE.MeshPhysicalMaterial({
      color: isGold ? 0xf5c842 : 0xffffff,
      metalness: 0.9,
      roughness: 0.15,
      emissive: isGold ? 0xf5c842 : 0x444444,
      emissiveIntensity: 0.1,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    scene.add(rim);

    // Animation
    function animate() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // Resize
    const resize = () => {
      const w2 = container.clientWidth || width;
      const h2 = container.clientHeight || height;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [symbol, label, color, isCrypto, isGold, width, height]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 300 }} />;
}
