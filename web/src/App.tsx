import { useState } from "react";
import { FaFan, FaLightbulb } from "react-icons/fa";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Fan from "./components/Fan";
import FanControl from "./components/FanControl";
import ToolTip from "./components/ToolTop";
import DraggableDeviceItem from "./components/DragableDeviceItem";
import DeviceDropZone from "./components/DeviceDropZone";

import Modal from "./components/Modal";
import SavePresetForm from "./components/SavePresetForm";

// 1. Import Context Provider and Hook
import { PresetsProvider, usePresets } from "./contexts/PresetContext";
import type { Preset } from "./contexts/PresetContext";

function AppContent() {
  const [isDropped, setDropped] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [activeDeviceType, setActiveDeviceType] = useState<string | null>(null);
  const [speed, setSpeed] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDeviceId, setActiveDeviceId] = useState<string | null>(null);

  // 2. Use Context
  const { presets, isLoading } = usePresets();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const type = active.id.toString().split("-")[0];

    if (over?.id === "drop-area") {
      setDropped(true);
      setShowTooltip(false);

      // Get the attached preset data, if any
      const presetData = active.data.current?.preset as Preset | undefined;

      if (presetData) {
        // Preset dropped: load its settings
        const {
          type,
          device: { power, speed, brightness, color },
        } = presetData;
        setActiveDeviceType(type as string);
        setActiveDeviceId(active.id);
        setIsOn(power);
        setSpeed(speed as number);

        //todo:  implement brightness and color temp for light-bulb later
      } else {
        // New device dropped: set type and reset state
        setActiveDeviceType(type);
        setIsOn(false);
        setSpeed(0);
      }
    }
  };

  const handleClear = () => {
    setIsOn(false);
    setSpeed(0);
    setDropped(false);
    setShowTooltip(true);
    setActiveDeviceType(null);
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
              <DraggableDeviceItem type="fan" itemCls="list-item">
                {<FaFan />} Fan
              </DraggableDeviceItem>

              <DraggableDeviceItem type="light" itemCls="list-item">
                {<FaLightbulb />} Light
              </DraggableDeviceItem>
            </ul>

            {showTooltip && <ToolTip />}

            <div className="preset-section">
              <h1 className="heading">Saved Presets</h1>

              {/* 4. Render List from Context */}
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <ul className="presets-list">
                  {presets.length === 0 ? (
                    <li className="presets-item">Nothing saved yet</li>
                  ) : (
                    presets.map((preset) => (
                      <DraggableDeviceItem
                        key={preset.id}
                        type={preset.type as string}
                        itemCls="presets-item"
                        data={{ preset: preset }}
                      >
                        {preset.type === "fan" ? <FaFan /> : <FaLightbulb />}
                        {preset.name}
                      </DraggableDeviceItem>
                    ))
                  )}
                </ul>
              )}
            </div>
          </div>
          {/* sidebar ends */}

          <div className="action-area">
            <div className="top-bar">
              <h1 className="sim-heading">Testing Canvas</h1>
              {activeDeviceId && (
                <div className="cta">
                  <button className="clear" onClick={handleClear}>
                    Clear
                  </button>
                  <button
                    className="save-preset"
                    onClick={() => setIsModalOpen(true)}
                    disabled={!isDropped}
                  >
                    Save Preset
                  </button>
                </div>
              )}
            </div>

            <div className="sim-field">
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
                "Not Implemented Yet"
              )}
            </div>
          </div>
        </div>
      </DndContext>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Save Preset"
      >
        <SavePresetForm
          setIsModalOpen={setIsModalOpen}
          // 5. Pass current app state to the form
          currentSettings={{ activeDeviceType, speed, isOn }}
        />
      </Modal>
    </>
  );
}

// 6. Main App Component Wrapper
function App() {
  return (
    <PresetsProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <AppContent />
    </PresetsProvider>
  );
}

export default App;
