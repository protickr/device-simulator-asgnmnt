import React, { useState } from "react";
import styles from "./SavePresetForm.module.css";
import { usePresets } from "../contexts/PresetContext";

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

    const newPreset = {
      name: presetName,
      type: currentSettings.activeDeviceType,
      device: {
        power: currentSettings.isOn,
        ...(currentSettings.activeDeviceType === "fan"
          ? {
              speed: currentSettings.speed,
            }
          : {
              brightness: currentSettings.brightness,
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
