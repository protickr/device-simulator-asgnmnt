import { useState } from "react";
import { FaFan, FaLightbulb } from "react-icons/fa";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import "./App.css";
import Fan from "./components/Fan";
import FanControl from "./components/FanControl";
import ToolTip from "./components/ToolTop";
import DraggableDeviceItem from "./components/DragableDeviceItem";
import DeviceDropZone from "./components/DeviceDropZone";

function App() {
  const [isDropped, setDropped] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [activeDeviceType, setActiveDeviceType] = useState<string | null>(null);
  const [speed, setSpeed] = useState(0);
  const [isOn, setIsOn] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const type = event.active.id.toString().split("-")[0];
    if (event?.over?.id === "drop-area") {
      console.log("type", type);
      setDropped(true);
      setShowTooltip(false);
      setActiveDeviceType(type);
    }
  };

  const handleClear = () => {
    setIsOn(false);
    setSpeed(0);
    setDropped(false);
    setShowTooltip(true);
  };

  return (
    <>
      <h1>device simulator</h1>
      <DndContext
        onDragStart={() => setShowTooltip(false)}
        onDragEnd={handleDragEnd}
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
                <button className="clear" onClick={handleClear}>
                  Clear
                </button>
                <button className="save-preset"> Save Preset </button>
              </div>
            </div>

            <div className="sim-field">
              {/* device drop zone here */}
              {!isDropped ? (
                <DeviceDropZone>Drag anything here</DeviceDropZone>
              ) : activeDeviceType === "fan" ? (
                <>
                  <div className="device-area">
                    <Fan power={isOn} speed={speed}></Fan>
                  </div>
                  <div className="controls-area">
                    <FanControl
                      isOn={isOn}
                      setIsOn={setIsOn}
                      speed={speed}
                      setSpeed={setSpeed}
                    ></FanControl>
                  </div>
                </>
              ) : (
                // activeDeviceType === "light" && (
                //   <>
                //     <div className="device-area">
                //       <Light></Light>
                //     </div>
                //     <div className="controls-area">
                //       <LightControl></LightControl>
                //     </div>
                //   </>
                // )
                "Not Implemented Yet"
              )}
            </div>
          </div>
        </div>
      </DndContext>
    </>
  );
}

export default App;
