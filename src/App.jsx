import { Canvas } from '@react-three/fiber'
import React from 'react'
import HelloBox from './Components/HelloBox'
import SolarSystem from './Components/SolarSystem'

const App = () => {
  return (
    <div style={{ width: "100%", height: "96vh", margin: "0px", padding: "0px" }}>
      {/* <HelloBox /> */}
      <SolarSystem />
    </div>
  )
}

export default App
