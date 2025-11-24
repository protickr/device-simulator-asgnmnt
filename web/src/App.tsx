// libraries
import { FaFan, FaLightbulb } from "react-icons/fa";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

// styles
import "./App.css";

// components
import DeviceDropZone from "./components/DeviceDropZone";
import DraggableDeviceItem from "./components/DragableDeviceItem";
import Fan from "./components/Fan";
import FanControl from "./components/FanControl";
import Modal from "./components/Modal";
import SavePresetForm from "./components/SavePresetForm";
import ToolTip from "./components/ToolTop";

// contexts
import { PresetsProvider, usePresets } from "./contexts/PresetContext";
import { DeviceProvider } from "./contexts/DeviceContext";
import type { PresetDetails } from "./schema";

// actual app entry point
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

  // when dragged from sidebar to the edit field.
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const type = active.id.toString().split("-")[0];

    if (over?.id === "drop-area") {
      setDropped(true);
      setShowTooltip(false);

      // Get the attached preset data, if any
      const presetData = active.data.current?.preset as
        | PresetDetails
        | undefined;

      if (presetData) {
        // Preset dropped: load its settings
        const { type, configs }: PresetDetails = presetData;
        setActiveDeviceType(type);
        setActiveDeviceId(active.id as unknown as string);
        setIsOn(configs?.power ?? false);
        setSpeed(configs?.intensity ?? 0);
        //todo:  implement brightness and color temp for light-bulb later
      } else {
        // New device dropped: set type and reset state
        setActiveDeviceType(type);
        setIsOn(false);
        setSpeed(0);
      }
    }
  };

  // clear all the states after a device-preset is removed from the edit field
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

// main app component wrapper
function App() {
  return (
    <DeviceProvider>
      <PresetsProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <AppContent />
      </PresetsProvider>
    </DeviceProvider>
  );
}

export default App;
