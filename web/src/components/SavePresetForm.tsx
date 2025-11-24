import React, { useState } from "react";
import styles from "./SavePresetForm.module.css";
import { usePresets } from "../contexts/PresetContext";
import type { DeviceType, PresetCreate } from "../schema";

interface SavePresetFormProps {
  setIsModalOpen: (isOpen: boolean) => void;
  currentSettings: {
    activeDeviceType: string | null;
    isOn: boolean;
    speed?: number;
    brightness?: number;
    color?: string;
  };
}

function SavePresetForm({
  setIsModalOpen,
  currentSettings,
}: SavePresetFormProps) {
  const [presetName, setPresetName] = useState("");
  const { createPreset, isLoading } = usePresets(); // Use Context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!presetName || !currentSettings.activeDeviceType) return;

    const newPreset: PresetCreate = {
      name: presetName,
      type: currentSettings.activeDeviceType as DeviceType,
      deviceId: "", //todo: set deviceId later
      configs: {
        power: currentSettings.isOn,
        intensity: currentSettings.speed ?? 0, // todo: change input field to intensity for light and fan
        ...(currentSettings.activeDeviceType === "light" && {
          color: currentSettings.color,
        }),
      },
    };

    await createPreset(newPreset);
    setIsModalOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Name it"
          className={styles.input}
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          disabled={isLoading}
        />
        <p className={styles.helperText}>
          By adding this effect as a preset you can reuse this anytime.
        </p>
      </div>

      <div className={styles.footer}>
        <button className={styles.cancelBtn} onClick={handleCancel}>
          Cancel
        </button>
        <button
          className={styles.saveBtn}
          onClick={(e) => {
            void handleSubmit(e);
          }}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Preset"}
        </button>
      </div>
    </>
  );
}

export default SavePresetForm;
