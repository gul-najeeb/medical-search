import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Test1 from "./Test1";
import HealthFactorsForm from "./HealthFactorsForm";
import NearbyPlacesMap from "./NearbyPlacesMap";

function App() {
  const [count, setCount] = useState(0);

  return <div className="container" style={{marginTop: '5.4rem'}}>

  {/* <HealthFactorsForm /> */}
  <NearbyPlacesMap/>  
  </div>
}

// <Test1/>
export default App;
