import { Grid, OrbitControls, Shadow, useHelper } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { DirectionalLightHelper } from 'three';

const SolarSystem = () => {
    const orbitRef = useRef();

    const handleCanvasCreated = (state) => {
        if (orbitRef.current) {
            orbitRef.current.object.position.set(50, 50, 50);
            orbitRef.current.target.set(0, 0, 0);
            orbitRef.current.update();
            state.invalidate(); // Trigger re-render of the canvas
        }
    };

    return (
        <Canvas style={{ background: "#181818" }} onCreated={handleCanvasCreated}>
            <DirectLight position={[0, 4, -4]} intensity={6}/>
            <DirectLight position={[0, -4, 4]} intensity={6}/>
            <DirectLight position={[0, -4, -4]} intensity={6}/>
            <DirectLight position={[0, 4, 4]} intensity={6}/>
            <DirectLight position={[5.5, 0, 0]} intensity={6}/>
            <DirectLight position={[-5.5, 0, 0]} intensity={6}/>
            <ambientLight intensity={0.1}/>
            <pointLight intensity={10} position={[0, 0, 0]}/>
            {/* sun */}
            <Planet position={[0, 0, 0]} name="sun" color="#ffff00" size={[5, 32, 32]}/>
            {/* mercury */}
            <Planet orbitRadius={10} name="mercury" speed="0.5" color="#ff9214" size={[0.8, 20, 20]}/>
            {/* venus */}
            <Planet orbitRadius={20} name="venus" speed="0.6" color="#ff5e00" size={[1, 20, 20]}/>
            {/* earth */}
            <Planet orbitRadius={30} name="earth" speed="0.5" color="#00ff1e" size={[1.2, 20, 20]}/>
            {/* mars */}
            <Planet orbitRadius={35} name="mars" speed="0.4" color="#ff5e00" size={[1.2, 20, 20]}/>
            {/* jupiter */}
            <Planet orbitRadius={50} name="jupiter" speed="0.3" color="#ff5e00" size={[3, 20, 20]}/>
            {/* saturn */}
            <Planet orbitRadius={60} name="saturn" speed="0.2" color="#ff5e00" size={[2.8, 20, 20]}/>
            {/* uranus */}
            <Planet orbitRadius={75} name="uranus" speed="0.35" color="#ff5e00" size={[1.3, 20, 20]}/>
            {/* neptune */}
            <Planet orbitRadius={90} name="neptune" speed="0.2" color="#ff5e00" size={[1.4, 20, 20]}/>
            <OrbitControls ref={orbitRef} />
            <gridHelper args={[200, 200]} />
            <Shadow />
        </Canvas>
    )
}

const Planet = ({ position, color, size, name, orbitRadius, speed }) => {
    const planetRef = useRef();
    const [shouldAnimate, setShouldAnimate] = useState(true);
    const [angle, setAngle] = useState(0);

    useFrame((state, delta) => {
        if (planetRef.current && shouldAnimate) {
            planetRef.current.rotation.x += delta;
            if (name !== "sun") {
                setAngle(prevAngle => prevAngle + delta * speed);
                const x = orbitRadius * Math.cos(angle);
                const z = orbitRadius * Math.sin(angle);
                planetRef.current.position.set(x, 0, z);
            }
        }
    });

    return (
        <mesh position={position} ref={planetRef}>
            <sphereGeometry args={size} />
            <meshStandardMaterial color={color}/>
        </mesh>
    )    
}

const DirectLight = ({ position, intensity }) => {
    const directionalLightRef = useRef();

    // useHelper(directionalLightRef, DirectionalLightHelper);

    return (
        <directionalLight ref={directionalLightRef} intensity={intensity} position={position}/>
    )
}

export default SolarSystem;