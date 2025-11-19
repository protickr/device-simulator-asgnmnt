import { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_URL; // VITE_ prefix is mandatory 

interface PresetSettings {
  power?: boolean;
  speed?: number;
  brightness?: number;
  color?: string;
}

export interface Preset {
  id: string | number;
  name: string;
  deviceType: string;
  type?: string;
  settings: PresetSettings;
}

interface CreatePresetInput {
  name: string;
  type: string;
  settings: {
    power: boolean;
    speed?: number;
    brightness?: number;
    color?: string;
  };
}

interface PresetsState {
  presets: Preset[];
  isLoading: boolean;
  currentPreset: Preset | null;
  error: string;
}

type PresetsAction =
  | { type: "loading" }
  | { type: "presets/loaded"; payload: Preset[] }
  | { type: "preset/created"; payload: Preset }
  | { type: "preset/deleted"; payload: string | number }
  | { type: "rejected"; payload: string };

interface PresetsContextValue {
  presets: Preset[];
  isLoading: boolean;
  currentPreset: Preset | null;
  error: string;
  createPreset: (newPreset: CreatePresetInput) => Promise<void>;
  deletePreset: (id: string | number) => Promise<void>;
}

const PresetsContext = createContext<PresetsContextValue | null>(null);

const initialState: PresetsState = {
  presets: [],
  isLoading: false,
  currentPreset: null,
  error: "",
};

function reducer(state: PresetsState, action: PresetsAction): PresetsState {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "presets/loaded":
      return { ...state, isLoading: false, presets: action.payload };

    case "preset/created":
      return {
        ...state,
        isLoading: false,
        presets: [...state.presets, action.payload],
        currentPreset: action.payload,
      };

    case "preset/deleted":
      return {
        ...state,
        isLoading: false,
        presets: state.presets.filter((preset) => preset.id !== action.payload),
        currentPreset: null,
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

interface PresetsProviderProps {
  children: ReactNode;
}

function PresetsProvider({ children }: PresetsProviderProps) {
  const [{ presets, isLoading, currentPreset, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Fetch all presets on mount
  useEffect(function () {
    async function fetchPresets() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/presets`);
        const data = (await res.json()) as Preset[];
        dispatch({ type: "presets/loaded", payload: data });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        dispatch({ type: "rejected", payload: errorMessage });
      }
    }

    void fetchPresets();
  }, []);

  async function createPreset(newPreset: CreatePresetInput): Promise<void> {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/presets`, {
        method: "POST",
        body: JSON.stringify(newPreset),
        headers: { "Content-Type": "application/json" },
      });
      const data = (await res.json()) as Preset;
      dispatch({ type: "preset/created", payload: data });
      toast.success("Preset saved successfully");
    } catch (err) {
      toast.error("Preset couldn't be saved");
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      dispatch({ type: "rejected", payload: errorMessage });
    }
  }

  async function deletePreset(id: string | number): Promise<void> {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/presets/${id}`, { method: "DELETE" });
      dispatch({ type: "preset/deleted", payload: id });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      dispatch({ type: "rejected", payload: errorMessage });
    }
  }

  return (
    <PresetsContext.Provider
      value={{
        presets,
        isLoading,
        currentPreset,
        error,
        createPreset,
        deletePreset,
      }}
    >
      {children}
    </PresetsContext.Provider>
  );
}

function usePresets(): PresetsContextValue {
  const context = useContext(PresetsContext);
  if (context === null)
    throw new Error("usePresets must be used within a PresetsProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { PresetsProvider, usePresets };
