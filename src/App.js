import { useState } from "react";
import "./App.css";
import MapProvider from "./components/MapProvider.tsx";
import NaturalLanguageSearch from "./NaturalLanguageSearch.tsx";
function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div className="App">
      <NaturalLanguageSearch
        setDestination={setDestination}
        setOrigin={setOrigin}
      />
      <MapProvider origin={origin} destination={destination} />
    </div>
  );
}

export default App;
