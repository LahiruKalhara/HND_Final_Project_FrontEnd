import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './SeatPreview.css';

const SeatPreview = ({ seatLabel, onClose }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const width = mount.clientWidth;
        const height = mount.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 200);

        const video = document.createElement('video');
        video.src = '/videos/marvel-intro.mp4';
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.muted = false;
        video.play();

        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBFormat;

        const screenGeometry = new THREE.PlaneGeometry(100, 50);
        const screenMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, 10, -50);
        scene.add(screen);

        const loader = new THREE.TextureLoader();
        let bgMesh1, bgMesh2;
        let fadeStartTime = Date.now();
        const fadeDuration = 5; 

        Promise.all([
            loader.loadAsync('/images/cinema-bg2.jpg'),
            loader.loadAsync('/images/cinema-bg3.jpg')
        ]).then(([texture1, texture2]) => {
            texture1.encoding = THREE.sRGBEncoding;
            texture2.encoding = THREE.sRGBEncoding;

            const mat1 = new THREE.MeshBasicMaterial({
                map: texture1,
                transparent: true,
                opacity: 1,
                depthWrite: false,
            });

            const mat2 = new THREE.MeshBasicMaterial({
                map: texture2,
                transparent: true,
                opacity: 0,
                depthWrite: false,
            });

            const bgGeometry = new THREE.PlaneGeometry(300, 100);
            bgMesh1 = new THREE.Mesh(bgGeometry, mat1);
            bgMesh1.position.set(0, 20, -61);

            bgMesh2 = new THREE.Mesh(bgGeometry, mat2);
            bgMesh2.position.set(0, 20, -61);

            scene.add(bgMesh1);
            scene.add(bgMesh2);
        });

        const rowChar = seatLabel.charAt(0);
        const colNum = parseInt(seatLabel.slice(1), 10);
        const row = rowChar.charCodeAt(0) - 65;
        const totalCols = 30;
        const centerCol = totalCols / 2;
        const seatIndex = colNum - 1;

        const seatSpacing = 0.7;
        const rowSpacing = 1.1;
        const x = (seatIndex - centerCol) * seatSpacing;
        const z = row * rowSpacing;
        const y = 3 + row * 0.1;

        camera.position.set(x, y, z + 10);
        camera.lookAt(0, 10, -50);

        const animate = () => {
            requestAnimationFrame(animate);

            if (bgMesh1 && bgMesh2) {
                const elapsed = (Date.now() - fadeStartTime) / 1000;
                const totalCycle = fadeDuration * 2;
                const cycleTime = elapsed % totalCycle;

                if (cycleTime < fadeDuration) {
                    const progress = cycleTime / fadeDuration;
                    bgMesh1.material.opacity = 1 - progress;
                    bgMesh2.material.opacity = progress;
                } else {
                    const progress = (cycleTime - fadeDuration) / fadeDuration;
                    bgMesh1.material.opacity = progress;
                    bgMesh2.material.opacity = 1 - progress;
                }

            }

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            mount.removeChild(renderer.domElement);
            video.pause();
            video.src = '';
        };
    }, [seatLabel]);

    return (
        <div className="preview-3d-wrapper">
            <div className="preview-3d" ref={mountRef} />
            <button onClick={onClose} className="close-preview2">✖ Close Preview</button>
        </div>
    );
};

export default SeatPreview;
