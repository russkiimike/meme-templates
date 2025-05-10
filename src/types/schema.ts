import { z } from "zod";
import { notificationSchema } from "../remotion/Meme/Notification";
import { CompositionProps } from "./constants";

export const RenderRequest = z.object({
  id: z.string(),
  inputProps: z.union([
    z.object({
      type: z.literal("Notification"),
      ...notificationSchema.shape
    }),
    z.object({
      type: z.literal("MyComp"),
      ...CompositionProps.shape
    })
  ])
});

export const ProgressRequest = z.object({
  id: z.string(),
  bucketName: z.string(),
});

export const ProgressResponse = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("progress"),
    progress: z.number(),
  }),
  z.object({
    type: z.literal("done"),
    url: z.string(),
    size: z.number(),
  }),
  z.object({
    type: z.literal("error"),
    message: z.string(),
  }),
]);
