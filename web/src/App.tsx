// libraries
import { FaFan, FaLightbulb } from "react-icons/fa";
import {
  DndContext,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState, type ReactNode } from "react";

// styles
import "./App.css";

// components
import DeviceDropZone from "./components/DeviceDropZone";
import DraggableDeviceItem from "./components/DragableDeviceItem";
import Fan from "./components/Fan";
import Modal from "./components/Modal";
import SavePresetForm from "./components/SavePresetForm";
import ToolTip from "./components/ToolTop";

// contexts
import { PresetsProvider, usePresets } from "./contexts/PresetContext";
import { DeviceProvider, useDevices } from "./contexts/DeviceContext";
import type { PresetDetails, DeviceDetails } from "./schema";
import EmptyDropArea from "./components/EmptyDropArea";

// actual app entry point
function AppContent() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [livePreset, setLivePreset] = useState<PresetDetails | null>(() => {
    const saved = localStorage.getItem("livePreset");
    return saved ? (JSON.parse(saved) as PresetDetails) : null;
  });

  // ? could refactor into a single state object
  const [isOn, setIsOn] = useState<boolean>(livePreset?.configs.power || false);
  const [intensity, setIntensity] = useState<number>(
    livePreset?.configs.intensity || 0
  );

  // 2. Use Context
  const {
    presets,
    isLoading: presetsLoading,
    error: errLoadingPresets,
  } = usePresets();

  const {
    devices,
    isLoading: devicesLoading,
    error: errLoadingDevices,
  } = useDevices();

  const sensors = useSensors(
    useSensor(MouseSensor),
    // optional: prevents accidental drag on slight touch
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 8, // must move 8px before drag starts
      },
    })
  );

  // Preset dropped: load its configs
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id === "drop-area") {
      // Get the attached preset data
      const presetData = active.data.current as PresetDetails;
      console.log(
        "🚀 ~ handleDragEnd ~ active.data.current:",
        active.data.current
      );

      const { configs } = presetData;

      // update states
      if (presetData.deviceId) {
        setLivePreset(presetData);

        // restore animation states
        setIsOn(configs?.power ?? false);
        setIntensity(configs?.intensity ?? 0);
      } else {
        setShowTooltip(true);
      }

      //todo:  implement brightness and color temp for light-bulb later
    }
  };

  // clear all the states after a device-preset is removed from the edit field
  const handleClear = () => {
    setIsOn(false);
    setIntensity(0);
    setLivePreset(null);
    setShowTooltip(true);
  };

  useEffect(() => {
    if (livePreset) {
      localStorage.setItem(
        "livePreset",
        JSON.stringify({ ...livePreset, configs: { power: isOn, intensity } })
      );
    } else {
      localStorage.removeItem("livePreset");
    }
  }, [livePreset, isOn, intensity]);

  return (
    <>
      <h1>device simulator</h1>
      <DndContext
        onDragStart={() => setShowTooltip(false)}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={pointerWithin}
      >
        <div className="app">
          {/* sidebar starts */}
          <div className="sidebar">
            {/* Device list */}
            <h1>Devices</h1>
            {renderDraggableSidebarItemList({
              listClass: "device-list",
              itemClass: "list-item",
              list: devices,
              isLoading: devicesLoading,
              error: errLoadingDevices || "",
              livePreset: livePreset,
            })}

            {!livePreset && showTooltip && (
              <ToolTip> Drag item from here </ToolTip>
            )}

            {/* Preset list */}
            <div className="preset-section">
              <h1 className="heading">Saved Presets</h1>
              {renderDraggableSidebarItemList({
                listClass: "presets-list",
                itemClass: "presets-item",
                list: presets,
                isLoading: presetsLoading,
                error: errLoadingPresets || "",
                livePreset: livePreset,
              })}
            </div>
          </div>
          {/* sidebar ends */}

          <div className="action-area">
            <div className="top-bar">
              <h1 className="sim-heading">Testing Canvas</h1>
              <div className="cta">
                {livePreset && (
                  <>
                    <button className="clear" onClick={handleClear}>
                      Clear
                    </button>
                    <button
                      className="save-preset"
                      onClick={() => setIsModalOpen(true)}
                      disabled={!livePreset}
                    >
                      {livePreset.id ? "Update" : "Save"} Preset
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="sim-field">
              <DeviceDropZone>
                {livePreset === null && (
                  <EmptyDropArea>
                    <p>Drop anything here</p>
                  </EmptyDropArea>
                )}

                {/* if livePreset is not null; meaning device preset has been dropped
              now or before refresh */}
                {livePreset?.type?.length && livePreset.type === "fan" && (
                  <Fan
                    isOn={isOn}
                    setIsOn={setIsOn}
                    speed={intensity}
                    setSpeed={setIntensity}
                    allowedSettings={livePreset.device.allowedSettings}
                  />
                )}

                {livePreset?.type?.length && livePreset.type === "light" && (
                  <>
                    {/* 
                      todo: move to Light component later
                    <div className="device-area">
                      <Light
                        power={isOn}
                        brightness={intensity}
                        color={color}
                      />
                    </div>
                    <div className="controls-area">
                      <LightControl
                        isOn={isOn}
                        setIsOn={setIsOn}
                        brightness={intensity}
                        setBrightness={setIntensity}
                        allowedSettings={livePreset.device.allowedSettings}
                      />
                    </div> */}

                    <EmptyDropArea>
                      <p>Not implemented yet</p>
                    </EmptyDropArea>
                  </>
                )}
              </DeviceDropZone>
            </div>
          </div>
        </div>
      </DndContext>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${livePreset?.id ? "Update" : "Save"} Preset`}
      >
        <SavePresetForm
          setIsModalOpen={setIsModalOpen}
          // setLivePreset={setLivePreset}
          prevPresetName={livePreset?.name ?? ""}
          currentSettings={{
            type: livePreset?.type as string,
            deviceId: livePreset?.device.id as string,
            isOn,
            currentPresetId: livePreset?.id ?? null,
            intensity,
            color: undefined,
          }}
        />
      </Modal>
    </>
  );
}

//DRY function to render both device and preset lists in the sidebar
function renderDraggableSidebarItemList({
  listClass,
  itemClass,
  list,
  isLoading,
  error,
  livePreset,
}: {
  listClass: string;
  itemClass: string;
  list: (PresetDetails | DeviceDetails)[];
  isLoading: boolean;
  livePreset: PresetDetails | null;
  error?: string;
}) {
  return (
    <>
      <ul className={listClass}>
        {/* still loading */}
        {isLoading && (
          <li className={itemClass}>
            <p>Loading...</p>
          </li>
        )}

        {/* empty list */}
        {list?.length < 1 && (
          <li className={itemClass}>
            <p>There is no item</p>
          </li>
        )}

        {error?.length ? void toast.error(error) : null}

        {/* render list if not undefined */}
        {list?.map((item: DeviceDetails | PresetDetails): ReactNode => {
          /* unifying operational data: create a draft preset from parent device */
          const isPreset = "configs" in item;
          const presetData = isPreset
            ? item
            : {
                id: null,
                name: "",
                configs: {
                  power: false,
                  intensity: 0,
                  color: null,
                },

                deviceId: item.id,
                type: item.type,
                device: item,
              };

          return (
            <DraggableDeviceItem
              key={item.id}
              itemCls={itemClass}
              data={presetData}
              isActive={
                item.id === livePreset?.id || item.id === livePreset?.deviceId
              }
            >
              {item.type === "fan" ? <FaFan /> : <FaLightbulb />} {item.name}
            </DraggableDeviceItem>
          );
        })}
      </ul>
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

/**
 * anything dropped in the edit field is a preset, there is no exception
 * we can either save a new preset => presetId === null => save => presetId generated
 * or load an existing preset => presetId === uuid() => load => save => update preset
 *
 * dragging a device from the sidebar creates a new preset with presetId === null
 * dragging a preset from the sidebar loads an existing preset with presetId === uuid()
 *
 * In both cases, the edit field works with presets only.
 * and we send a "preset" to the "data" property of the draggable item
 *
 * currentPreset => might or might not have an ID or we can generate a temporary one on the client side
 */
