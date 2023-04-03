import logo from "./logo.svg";
import "./App.css";
import Map from "./components/map";
import { useState } from "react";

function App() {
  const [location, SetLocation] = useState(null);
  let center = {
    lat: 35.69981321289795,
    lng: 51.33732529299457,
  };

  return (
    <div className="App">
      <Map center={center} />
    </div>
  );
}

export default App;
