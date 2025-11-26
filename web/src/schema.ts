// for runtime data shape/schema definition and validation
import { z } from "zod";

// typescript type definitions
const deviceTypes = ["light", "fan"] as const;
export type DeviceType = (typeof deviceTypes)[number];

// 1. Device Schema for runtime validation and
// this same schema will be used in both for input validation and response validation
// at runtime
export const DeviceCreateSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(deviceTypes),

  allowedSettings: z.object({
    // "property: type" [to create input forms dynamically]
    power: z.object({
      type: z.literal("boolean"),
    }),

    intensity: z.object({
      type: z.literal("range"),
      min: z.number().min(0),
      max: z.number().max(100),
    }),

    color: z
      .object({
        type: z.literal("colors"),
        options: z.array(z.string()),
      })
      .optional(),
  }),
});
export const DeviceDetailsSchema = DeviceCreateSchema.extend({
  id: z.string(),
});

export const PresetCreateSchema = z.object({
  id: z.string().optional(),
  deviceId: z.string(),
  name: z.string().min(1).max(255),
  type: z.enum(deviceTypes),
  configs: z.object({
    power: z.boolean(),
    intensity: z.number().min(0).max(100),
    color: z.string().nullable().optional(),
  }),
});
export const PresetDetailsSchema = PresetCreateSchema.extend({
  device: DeviceDetailsSchema,
});

export const DevicesResponseSchema = z.object({
  data: z.array(DeviceDetailsSchema),
});

export const PresetsResponseSchema = z.object({
  data: z.array(PresetDetailsSchema),
});
// 2. Infer the TypeScript type from the schema
// to use in compile-time checks
export type DeviceCreate = z.infer<typeof DeviceCreateSchema>;
export type DeviceDetails = z.infer<typeof DeviceDetailsSchema>;
export type DevicesResponse = z.infer<typeof DevicesResponseSchema>;

export type PresetCreate = z.infer<typeof PresetCreateSchema>;
export type PresetDetails = z.infer<typeof PresetDetailsSchema>;
export type PresetsResponse = z.infer<typeof PresetsResponseSchema>;
