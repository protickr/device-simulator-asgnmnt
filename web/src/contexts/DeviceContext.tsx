import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { DevicesResponseSchema, type DeviceDetails } from "../schema";

const BASE_URL = import.meta.env.VITE_API_URL as string;

interface DeviceContextType {
  devices: DeviceDetails[];
  isLoading: boolean;
  error: string | null;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [devices, setDevices] = useState<DeviceDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDevices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/devices`);
        if (!response.ok) throw new Error("Failed to fetch devices");
        const json = (await response.json()) as unknown;
        const parsed = DevicesResponseSchema.parse(json); // zod specific
        setDevices(parsed.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchDevices();
    return () => abortController.abort();
  }, []);

  return (
    <DeviceContext.Provider value={{ devices, isLoading, error }}>
      {children}
    </DeviceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDevices(): DeviceContextType {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevices must be used within DeviceProvider");
  }
  return context;
}
