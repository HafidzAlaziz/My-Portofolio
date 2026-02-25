import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // SCENE SETUP
        const scene = new THREE.Scene();

        // CAMERA SETUP
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        // RENDERER SETUP
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // PARTICLES SETUP
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);
        const colorsArray = new Float32Array(particlesCount * 3);

        const colors = [
            new THREE.Color('#22d3ee'), // Cyan
            new THREE.Color('#818cf8'), // Indigo
            new THREE.Color('#c084fc')  // Purple
        ];

        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Position
            posArray[i] = (Math.random() - 0.5) * 100;
            posArray[i + 1] = (Math.random() - 0.5) * 100;
            posArray[i + 2] = (Math.random() - 0.5) * 100;

            // Color
            const color = colors[Math.floor(Math.random() * colors.length)];
            colorsArray[i] = color.r;
            colorsArray[i + 1] = color.g;
            colorsArray[i + 2] = color.b;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

        // Create a circular texture for particles programmatically
        const getTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(16, 16, 14, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        };

        const material = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            map: getTexture(),
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        // MOUSE INTERACTION
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onDocumentMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        };

        document.addEventListener('mousemove', onDocumentMouseMove);

        // RESIZE EVENT
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // ANIMATION LOOP
        let lastTime = performance.now();
        let elapsedTime = 0;

        const animate = () => {
            const currentTime = performance.now();
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;
            elapsedTime += deltaTime;

            requestAnimationFrame(animate);

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            // Rotate entire system slowly over time
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;

            // Parallax effect based on mouse movement
            particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
            particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

            // Floating effect
            particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 1.5;

            renderer.render(scene, camera);
        };

        animate();

        // CLEANUP
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', onDocumentMouseMove);

            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }

            // Dispose materials and geometries
            particlesGeometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div id="canvas-container" ref={mountRef}></div>;
};

export default Background3D;
