import { z } from "zod";
import type { RenderMediaOnLambdaOutput } from "@remotion/lambda/client";
import {
  ProgressRequest,
  ProgressResponse,
  RenderRequest,
} from "../types/schema";
import { ApiResponse } from "../helpers/api-response";
import { notificationSchema } from "../remotion/Meme/Notification";
import { CompositionProps } from "../types/constants";

const makeRequest = async <Res>(
  endpoint: string,
  body: unknown,
): Promise<Res> => {
  const result = await fetch(endpoint, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
  const json = (await result.json()) as ApiResponse<Res>;
  if (json.type === "error") {
    throw new Error(json.message);
  }

  return json.data;
};

export const renderVideo = async ({
  id,
  inputProps,
}: {
  id: "Notification" | "MyComp";
  inputProps: z.infer<typeof notificationSchema> | z.infer<typeof CompositionProps>;
}) => {
  // Validate input props based on composition type
  let validatedProps;
  if (id === "Notification") {
    const memeProps = notificationSchema.parse(inputProps);
    validatedProps = { type: "Notification" as const, ...memeProps };
  } else {
    const myCompProps = CompositionProps.parse(inputProps);
    validatedProps = { type: "MyComp" as const, ...myCompProps };
  }
  
  const body: z.infer<typeof RenderRequest> = {
    id,
    inputProps: validatedProps,
  };

  return makeRequest<RenderMediaOnLambdaOutput>("/api/lambda/render", body);
};

export const getProgress = async ({
  id,
  bucketName,
}: {
  id: string;
  bucketName: string;
}) => {
  const body: z.infer<typeof ProgressRequest> = {
    id,
    bucketName,
  };

  return makeRequest<z.infer<typeof ProgressResponse>>("/api/lambda/progress", body);
};
