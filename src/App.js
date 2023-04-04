import Map from "./components/map";

function App() {
  let center = {
    lat: 48.8584,
    lng: 2.2945,
  };

  return (
    <div className="App">
      <Map center={center} />
    </div>
  );
}

export default App;
