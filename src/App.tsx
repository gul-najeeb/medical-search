import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Test1 from "./Test1";
import "bootstrap/dist/css/bootstrap.min.css";

import HealthFactorsForm from "./HealthFactorsForm";
import NearbyPlacesMap from "./NearbyPlacesMap";
import Places from "./Places";

function App() {
  const [count, setCount] = useState(0);
  const userLocation = { lat: 25.396, lng: 68.3578 }; // Set to your desired location

  return (
    <div className="container" style={{ marginTop: "5.4rem" }}>
      {/* <HealthFactorsForm /> */}
      <NearbyPlacesMap/>  
      {/* <Places /> */}
    </div>
  );
}

// <Test1/>
export default App;
