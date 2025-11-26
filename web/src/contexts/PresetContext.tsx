import { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";
import type { PresetCreate, PresetDetails } from "../schema";
import {
  PresetCreateSchema,
  PresetDetailsSchema,
  PresetsResponseSchema,
} from "../schema";
import { ZodError } from "zod";

interface PresetsState {
  presets: PresetDetails[];
  isLoading: boolean;
  currentPreset: PresetDetails | null;
  error: string;
}

interface PresetContextType {
  presets: PresetDetails[];
  isLoading: boolean;
  currentPreset: PresetDetails | null;
  error: string;
  createPreset: (newPreset: PresetCreate) => Promise<void>;
}

interface PresetsProviderProps {
  children: ReactNode;
}

type PresetsAction =
  | { type: "loading" }
  | { type: "presets/loaded"; payload: PresetDetails[] }
  | { type: "preset/created"; payload: PresetDetails }
  | { type: "rejected"; payload: string };

const BASE_URL = import.meta.env.VITE_API_URL as string;
const PresetsContext = createContext<PresetContextType | null>(null);

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

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function PresetsProvider({ children }: PresetsProviderProps) {
  const [{ presets, isLoading, currentPreset, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Fetch all presets on mount
  useEffect(function () {
    const abortController = new AbortController();

    async function fetchPresets() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/presets`);
        if (!res.ok) throw new Error(`Failed to load presets ${res.status}`);
        const json = (await res.json()) as unknown;
        // "zod" validation of response data, in the runtime
        const parsed = PresetsResponseSchema.parse(json);
        dispatch({ type: "presets/loaded", payload: parsed.data });
      } catch (err) {
        const errors: string[] = [];
        if (err instanceof ZodError) {
          const messages = err.issues.map(
            (issue) => `${String(issue?.path?.at(-1))}: ${issue.message}`
          );
          errors.push(...messages);
        } else if (err instanceof Error) {
          errors.push(err.message);
        } else {
          errors.push("An unknown error occurred");
        }
        dispatch({ type: "rejected", payload: errors.join(", ") });
      }
    }

    void fetchPresets();
    return () => abortController.abort();
  }, []);

  async function createPreset(newPreset: PresetCreate): Promise<void> {
    dispatch({ type: "loading" });
    try {
      // preset data validation before api request
      const validPresetInput = PresetCreateSchema.parse(newPreset);
      const res = await fetch(`${BASE_URL}/presets`, {
        method: "POST",
        body: JSON.stringify(validPresetInput),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(`Failed to create preset ${res.status}`);
      const json = (await res.json()) as unknown as { data: PresetDetails };
      const payload = PresetDetailsSchema.parse(json.data);
      dispatch({ type: "preset/created", payload: payload });
      toast.success("Preset saved successfully");
    } catch (err) {
      const errors: string[] = [];
      if (err instanceof ZodError) {
        const messages = err.issues.map(
          (issue) => `${String(issue?.path?.at(-1))}: ${issue.message}`
        );
        errors.push(...messages);
      } else if (err instanceof Error) {
        errors.push(err.message);
      } else {
        errors.push("Preset couldn't be saved");
      }

      dispatch({ type: "rejected", payload: errors.join(", ") });
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
      }}
    >
      {children}
    </PresetsContext.Provider>
  );
}

function usePresets(): PresetContextType {
  const context = useContext(PresetsContext);
  if (context === null)
    throw new Error("usePresets must be used within a PresetsProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { PresetsProvider, usePresets };
