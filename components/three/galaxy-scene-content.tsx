'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// @ts-ignore
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

interface Asset {
  label: string;
  color: string;
  position: [number, number, number];
  type: 'forex' | 'crypto' | 'gold';
  symbol: string;
  currencySymbol?: string;
}

const forexAssets: Asset[] = [
  { label: 'USD', color: '#f5c842', position: [-2.8, 0.6, -1.2], type: 'forex', symbol: 'usd', currencySymbol: '$' },
  { label: 'EUR', color: '#4a8fe7', position: [-1.6, -0.4, -2.6], type: 'forex', symbol: 'eur', currencySymbol: '€' },
  { label: 'GBP', color: '#2d8b7a', position: [1.6, 0.8, -2.4], type: 'forex', symbol: 'gbp', currencySymbol: '£' },
  { label: 'JPY', color: '#d43f3f', position: [2.8, -0.2, -1.0], type: 'forex', symbol: 'jpy', currencySymbol: '¥' },
  { label: 'IDR', color: '#8b6b4d', position: [0.0, 1.0, -2.2], type: 'forex', symbol: 'idr', currencySymbol: 'Rp' },
  { label: 'AUD', color: '#cc7a3a', position: [-0.8, -0.8, -3.0], type: 'forex', symbol: 'aud', currencySymbol: 'A$' },
  { label: 'CHF', color: '#bf1e1e', position: [0.8, 0.2, -3.4], type: 'forex', symbol: 'chf', currencySymbol: 'CHF' },
  { label: 'CNY', color: '#c41e3a', position: [-2.2, -0.6, -1.8], type: 'forex', symbol: 'cny', currencySymbol: '¥' },
];

const cryptoAssets: Asset[] = [
  { label: 'BTC', color: '#f7931a', position: [-1.8, 1.2, 1.8], type: 'crypto', symbol: 'btc', currencySymbol: '₿' },
  { label: 'ETH', color: '#627eea', position: [0.0, 1.4, 2.4], type: 'crypto', symbol: 'eth', currencySymbol: '⟠' },
  { label: 'SOL', color: '#9945ff', position: [1.8, 1.0, 2.0], type: 'crypto', symbol: 'sol', currencySymbol: '◎' },
  { label: 'XRP', color: '#00aae4', position: [-1.0, 0.2, 3.2], type: 'crypto', symbol: 'xrp', currencySymbol: '✕' },
  { label: 'BNB', color: '#f3ba2f', position: [1.0, 0.6, 3.4], type: 'crypto', symbol: 'bnb', currencySymbol: '◆' },
];

interface GalaxySceneContentProps {
  onAssetClick?: (symbol: string, type: 'forex' | 'crypto' | 'gold') => void;
}

export default function GalaxySceneContent({ onAssetClick }: GalaxySceneContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk membuat tekstur koin premium
  const createCoinTexture = (asset: Asset): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Radial gradient background
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    const baseColor = new THREE.Color(asset.color);
    const lightColor = baseColor.clone().lerp(new THREE.Color(0xffffff), 0.4);
    const darkColor = baseColor.clone().lerp(new THREE.Color(0x000000), 0.3);
    gradient.addColorStop(0, lightColor.getStyle());
    gradient.addColorStop(0.6, baseColor.getStyle());
    gradient.addColorStop(1, darkColor.getStyle());
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.fill();

    // Outer ring
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(256, 256, 230, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(256, 256, 218, 0, Math.PI * 2);
    ctx.stroke();

    // Inner emboss
    for (let r = 200; r > 50; r -= 10) {
      ctx.strokeStyle = r % 20 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(256, 256, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Currency symbol
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.font = 'bold 140px "Inter", "Arial", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 20;
    ctx.fillText(asset.currencySymbol || asset.label, 256, 230);

    // Currency code
    ctx.shadowBlur = 10;
    ctx.font = 'bold 48px "Inter", "Arial", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.fillText(asset.label, 256, 340);

    // Highlight reflection
    const highlight = ctx.createRadialGradient(160, 160, 10, 180, 180, 150);
    highlight.addColorStop(0, 'rgba(255,255,255,0.4)');
    highlight.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = highlight;
    ctx.beginPath();
    ctx.arc(180, 180, 150, 0, Math.PI * 2);
    ctx.fill();

    // Glow
    const glow = ctx.createRadialGradient(256, 256, 20, 256, 256, 100);
    glow.addColorStop(0, 'rgba(255,255,255,0.15)');
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(256, 256, 100, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070912);
    scene.fog = new THREE.FogExp2(0x070912, 0.022);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(width, height);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.left = '0';
    labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(labelRenderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.minDistance = 5;
    controls.maxDistance = 25;
    controls.target.set(0, 0, 0);

    // Lights
    const ambient = new THREE.AmbientLight(0x223355, 0.6);
    scene.add(ambient);
    const mainLight = new THREE.DirectionalLight(0xffeedd, 3);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    scene.add(mainLight);
    const fillLight = new THREE.DirectionalLight(0x4488ff, 0.8);
    fillLight.position.set(-4, 3, -5);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffd700, 0.5);
    rimLight.position.set(0, -3, 8);
    scene.add(rimLight);

    // Stars
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starsPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starsPos[i] = (Math.random() - 0.5) * 200;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0x8899bb,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(starsGeo, starsMat));

    const coinObjects: THREE.Group[] = [];

    const createPremiumCoin = (asset: Asset) => {
      const group = new THREE.Group();
      const size = 0.8;
      const texture = createCoinTexture(asset);

      const material = new THREE.MeshPhysicalMaterial({
        map: texture,
        metalness: 0.85,
        roughness: 0.25,
        clearcoat: 0.4,
        clearcoatRoughness: 0.2,
        reflectivity: 1,
        envMapIntensity: 1.8,
        emissive: new THREE.Color(asset.color),
        emissiveIntensity: 0.08,
        side: THREE.DoubleSide,
      });

      const bodyGeo = new THREE.CylinderGeometry(size, size, size * 0.15, 64);
      const body = new THREE.Mesh(bodyGeo, material);
      body.castShadow = true;
      body.receiveShadow = true;
      body.rotation.x = Math.PI / 2;
      group.add(body);

      // Outer metallic ring
      const ringGeo = new THREE.TorusGeometry(size * 1.05, size * 0.06, 32, 64);
      const ringMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(asset.color).lerp(new THREE.Color(0xffffff), 0.3),
        metalness: 0.95,
        roughness: 0.15,
        emissive: new THREE.Color(asset.color),
        emissiveIntensity: 0.1,
        envMapIntensity: 2,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      // Glow ring
      const glowRingGeo = new THREE.TorusGeometry(size * 0.95, size * 0.02, 24, 48);
      const glowRingMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(asset.color),
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
      glowRing.rotation.x = Math.PI / 2;
      glowRing.position.z = 0.001;
      group.add(glowRing);

      // Label CSS2D
      const div = document.createElement('div');
      div.textContent = asset.label;
      div.style.color = '#fff';
      div.style.fontSize = '12px';
      div.style.fontWeight = '500';
      div.style.fontFamily = 'Inter, sans-serif';
      div.style.background = 'rgba(0,0,0,0.4)';
      div.style.backdropFilter = 'blur(6px)';
      div.style.padding = '2px 10px';
      div.style.borderRadius = '20px';
      div.style.border = '1px solid rgba(255,255,255,0.1)';
      div.style.pointerEvents = 'none';
      const label = new CSS2DObject(div);
      label.position.set(0, -size * 0.7, 0);
      group.add(label);

      group.position.set(asset.position[0], asset.position[1], asset.position[2]);
      group.userData = {
        asset,
        floatOffset: Math.random() * Math.PI * 2,
        rotSpeed: 0.3 + Math.random() * 0.3,
        floatAmp: 0.08 + Math.random() * 0.06,
        baseY: asset.position[1],
        material,
        ringMat,
        glowRingMat,
      };
      return group;
    };

    // Tambahkan semua koin
    [...forexAssets, ...cryptoAssets].forEach((asset) => {
      const coin = createPremiumCoin(asset);
      scene.add(coin);
      coinObjects.push(coin);
    });

    // Gold Bar
    const goldGroup = new THREE.Group();
    const goldGeo = new THREE.BoxGeometry(1.6, 0.5, 0.9);
    const goldMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5c842,
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      reflectivity: 1,
      envMapIntensity: 1.8,
      emissive: 0xd4a020,
      emissiveIntensity: 0.05,
    });
    const goldMesh = new THREE.Mesh(goldGeo, goldMat);
    goldMesh.castShadow = true;
    goldMesh.receiveShadow = true;
    goldGroup.add(goldMesh);

    const goldDiv = document.createElement('div');
    goldDiv.textContent = 'GOLD 999.9';
    goldDiv.style.color = '#f5c842';
    goldDiv.style.fontSize = '14px';
    goldDiv.style.fontWeight = '700';
    goldDiv.style.fontFamily = 'Inter, sans-serif';
    goldDiv.style.background = 'rgba(0,0,0,0.3)';
    goldDiv.style.backdropFilter = 'blur(4px)';
    goldDiv.style.padding = '2px 12px';
    goldDiv.style.borderRadius = '30px';
    goldDiv.style.border = '1px solid rgba(255,215,0,0.2)';
    goldDiv.style.textShadow = '0 0 20px rgba(255,215,0,0.2)';
    goldDiv.style.pointerEvents = 'none';
    const goldLabel = new CSS2DObject(goldDiv);
    goldLabel.position.set(0, -0.5, 0);
    goldGroup.add(goldLabel);

    goldGroup.position.set(3.2, -0.3, 1.5);
    goldGroup.rotation.y = -0.4;
    goldGroup.userData = {
      asset: { label: 'GOLD', type: 'gold', symbol: 'gold' },
      floatOffset: Math.random() * Math.PI * 2,
      rotSpeed: 0.15,
      floatAmp: 0.06,
      baseY: -0.3,
    };
    scene.add(goldGroup);
    coinObjects.push(goldGroup);

    // Decorative ring
    const ringPoints = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(Math.cos(theta) * 4.2, -0.2, Math.sin(theta) * 4.2));
    }
    const ringGeo2 = new THREE.BufferGeometry().setFromPoints(ringPoints);
    const ringLine = new THREE.Line(ringGeo2, new THREE.LineBasicMaterial({
      color: 0xf5c842,
      transparent: true,
      opacity: 0.08,
    }));
    scene.add(ringLine);

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredCoin: THREE.Group | null = null;

    renderer.domElement.style.pointerEvents = 'auto';

    // Click handler
    renderer.domElement.addEventListener('click', (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes: THREE.Mesh[] = [];
      coinObjects.forEach((group) => {
        group.children.forEach((child) => {
          if (child instanceof THREE.Mesh) meshes.push(child);
        });
      });
      const intersects = raycaster.intersectObjects(meshes);
      if (intersects.length > 0) {
        let parent = intersects[0].object.parent;
        while (parent && !parent.userData?.asset) {
          parent = parent.parent;
        }
        if (parent && parent.userData?.asset) {
          const asset = parent.userData.asset;
          onAssetClick?.(asset.symbol, asset.type);
        }
      }
    });

    // Hover handler (FIXED — with type guard)
    renderer.domElement.addEventListener('mousemove', (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes: THREE.Mesh[] = [];
      coinObjects.forEach((group) => {
        group.children.forEach((child) => {
          if (child instanceof THREE.Mesh) meshes.push(child);
        });
      });
      const intersects = raycaster.intersectObjects(meshes);
      renderer.domElement.style.cursor = intersects.length > 0 ? 'pointer' : 'default';

      // Reset hovered coin
      if (hoveredCoin) {
        const ud = hoveredCoin.userData;
        if (ud?.material) ud.material.emissiveIntensity = 0.08;
        hoveredCoin = null;
      }

      if (intersects.length > 0) {
        let parent = intersects[0].object.parent;
        while (parent && !parent.userData?.asset) {
          parent = parent.parent;
        }
        // ✅ TYPE GUARD — pastikan parent adalah Group
        if (parent && parent.type === 'Group') {
          hoveredCoin = parent as THREE.Group;
          const ud = parent.userData;
          if (ud?.material) ud.material.emissiveIntensity = 0.5;
        }
      }
    });

    // Animasi
    const clock = new THREE.Clock();

    function animate() {
      const t = clock.getElapsedTime();

      coinObjects.forEach((obj) => {
        const ud = obj.userData;
        if (ud?.floatOffset !== undefined) {
          const float = Math.sin(t * 0.8 + ud.floatOffset) * ud.floatAmp;
          obj.position.y = ud.baseY + float;
          obj.rotation.y += ud.rotSpeed * 0.008;
          if (ud.glowRingMat) {
            ud.glowRingMat.opacity = 0.4 + Math.sin(t * 1.5 + ud.floatOffset) * 0.2;
          }
        }
      });

      goldMat.emissiveIntensity = 0.04 + Math.sin(t * 0.6) * 0.02;

      controls.update();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      labelRenderer.setSize(w, h);
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      container.removeChild(renderer.domElement);
      container.removeChild(labelRenderer.domElement);
      renderer.dispose();
    };
  }, [onAssetClick]);

  return <div ref={containerRef} className="w-full h-full" />;
}
