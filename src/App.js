import React from "react";
import Wheel from "./components/Wheel";
import Descriptor from "./components/Descriptor";
import { Wrapper } from "./appStyle";
function App() {
  return (
    <Wrapper>
      <Wheel />
      <Descriptor />
      <h4>
        Have a question? <span className="golden">Get help</span>
      </h4>
    </Wrapper>
  );
}

export default App;
