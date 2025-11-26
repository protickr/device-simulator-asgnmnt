import React, { useState } from "react";
import styles from "./SavePresetForm.module.css";
import { usePresets } from "../contexts/PresetContext";
import type { DeviceDetails, DeviceType, PresetCreate } from "../schema";

interface SavePresetFormProps {
  setIsModalOpen: (isOpen: boolean) => void;
  setLivePreset?: (
    preset: (PresetCreate & { device: DeviceDetails }) | null
  ) => void;
  currentSettings: {
    deviceId: string;
    type: string | null;
    isOn: boolean;
    currentPresetId: string | null;
    intensity?: number;
    color?: string;
  };
}

function SavePresetForm({
  setIsModalOpen,
  currentSettings,
}: SavePresetFormProps) {
  const [presetName, setPresetName] = useState("");
  const { createPreset, updatePreset, isLoading } = usePresets(); // Use Context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!presetName || !currentSettings.type) return;

    const newPreset: PresetCreate = {
      name: presetName,
      type: currentSettings.type as DeviceType,
      deviceId: currentSettings.deviceId,
      configs: {
        power: currentSettings.isOn,
        intensity: currentSettings.intensity ?? 0,
        ...(currentSettings.type === "light" && {
          color: currentSettings.color,
        }),
      },
    };

    if (currentSettings.currentPresetId) {
      await updatePreset(newPreset, currentSettings.currentPresetId);
    } else {
      await createPreset(newPreset);
    }

    setIsModalOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPresetName("");
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
          {isLoading
            ? "Saving..."
            : `${currentSettings.currentPresetId ? "Update" : "Save"} Preset`}
        </button>
      </div>
    </>
  );
}

export default SavePresetForm;
