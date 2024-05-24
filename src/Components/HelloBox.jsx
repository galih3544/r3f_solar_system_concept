import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

const HelloBox = () => {
    return (
        <Canvas style={{ background: "#333333" }}>
            <directionalLight position={[2,2,0]}/>
            <Box />
        </Canvas>
    )
}

const Box = () => {
    const boxRef = useRef();

    useFrame((state, delta) => {
        // Pastikan ref sudah tersedia sebelum mengakses properti rotasi
        if (boxRef.current) {
            boxRef.current.rotation.x += delta;
            boxRef.current.rotation.y += delta;
        }
    });

    return (
        <mesh ref={boxRef}>
            <boxGeometry />
            <meshStandardMaterial color={"red"}/>
        </mesh>
    )
}

export default HelloBox