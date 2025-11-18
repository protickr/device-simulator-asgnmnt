import "./App.css";
import { FaFan, FaLightbulb } from "react-icons/fa";
import Fan from "./components/Fan";
import FanControl from "./components/FanControl";
import ToolTip from "./components/ToolTop";

function App() {
  return (
    <>
      <h1>device simulator</h1>
      <div className="app">
        {/* sidebar starts */}
        <div className="sidebar">
          <h1>Devices</h1>
          <ul className="device-list">
            <li className="list-item">{<FaLightbulb />} Light</li>
            <li className="list-item">
              <FaFan /> Fan
            </li>
          </ul>

          <ToolTip />

          <div className="preset-section">
            <h1 className="heading">Saved Presets</h1>
            <ul className="presets-list">
              <li className="presets-item">Nothing saved yet</li>
            </ul>
          </div>
        </div>
        {/* sidebar ends */}

        <div className="action-area">
          <div className="top-bar">
            <h1 className="sim-heading">Testing Canvas</h1>
            <div className="cta">
              <button className="clear">Clear</button>
              <button className="save-preset"> Save Preset </button>
            </div>
          </div>

          <div className="sim-field">
            <div className="device-area">
              <Fan />
            </div>
            <div className="controls-area">
              <FanControl />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
