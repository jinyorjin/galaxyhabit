// ❌ VantaBackground import 제거
// import VantaBackground from "./components/VantaBackground";

import React from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div style={{ minHeight: "500vh", margin: 0, background: "black" }}>
      <Home />
    </div>
  );
}

export default App;
