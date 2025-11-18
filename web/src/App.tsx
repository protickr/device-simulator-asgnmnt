import { useState } from "react";
import { FaFan, FaLightbulb } from "react-icons/fa";
import { DndContext } from "@dnd-kit/core";

import "./App.css";
import Fan from "./components/Fan";
import FanControl from "./components/FanControl";
import ToolTip from "./components/ToolTop";
import DraggableDeviceItem from "./components/DragableDeviceItem";
import DeviceDropZone from "./components/DeviceDropZone";

function App() {
  const [isDropped, setDropped] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <>
      <h1>device simulator</h1>
      <DndContext
        onDragStart={() => setShowTooltip(false)}
        onDragEnd={(event) => {
          if (event.over?.id === "drop-area") {
            setDropped(true);
            setShowTooltip(false);
          }
        }}
      >
        <div className="app">
          {/* sidebar starts */}
          <div className="sidebar">
            <h1>Devices</h1>
            <ul className="device-list">
              <DraggableDeviceItem type="light">
                {<FaLightbulb />} Light
              </DraggableDeviceItem>
              <DraggableDeviceItem type="fan">
                {<FaFan />} Fan
              </DraggableDeviceItem>
            </ul>

            {showTooltip && <ToolTip />}

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
                <button
                  className="clear"
                  onClick={() => {
                    setDropped(false);
                    setShowTooltip(true);
                  }}
                >
                  Clear
                </button>
                <button className="save-preset"> Save Preset </button>
              </div>
            </div>

            <div className="sim-field">
              {/* device drop zone here */}
              {!isDropped ? (
                <DeviceDropZone>Drag anything here</DeviceDropZone>
              ) : (
                <>
                  <div className="device-area">
                    <Fan></Fan>
                  </div>
                  <div className="controls-area">
                    <FanControl></FanControl>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DndContext>
    </>
  );
}

export default App;
