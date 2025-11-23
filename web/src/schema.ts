// for runtime data shape/schema definition and validation
import { z } from "zod";

// typescript type definitions
const deviceTypes = ["light", "fan"] as const;
export type DeviceType = (typeof deviceTypes)[number];

// 1. Device Schema for runtime validation and
// this same schema will be used in both for input validation and response validation
// at runtime
export const DeviceSchema = z.object({
  id: z.string().nullable().optional(), // optional id field
  name: z.string().min(1),
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

export const PresetSchema = z.object({
  id: z.string().nullable().optional(),
  deviceId: z.string(),
  name: z.string().min(1).max(255),
  type: z.enum(deviceTypes), // redundant but useful for quick reference`
  device: DeviceSchema.optional(), // nested device schema for reference
  configs: z.object({
    power: z.boolean(),
    intensity: z.number().min(0).max(100),
    color: z.string().nullable().optional(),
  }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// 2. Infer the TypeScript type from the schema
// to use in compile-time checks
export type Device = z.infer<typeof DeviceSchema>;
export type Preset = z.infer<typeof PresetSchema>;
