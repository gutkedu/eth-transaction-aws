import { z } from "zod";

export const envSchema = z.object({
  INFURA_GOERLI_URL: z.string(),
  ETH_API_URL: z.string(),
});

export type envSchemaType = typeof envSchema._output;
