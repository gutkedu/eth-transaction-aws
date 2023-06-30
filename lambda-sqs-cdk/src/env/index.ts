import { envSchema, envSchemaType } from "./zod-schema";

const parseEnv = (): envSchemaType => {
  const _env = envSchema.safeParse(process.env);

  if (_env.success === false) {
    console.error(
      "🥶 Erro ao inicializar a aplicação no parse do env",
      _env.error.format()
    );
    throw new Error("Erro ao inicializar a aplicação no parse do env");
  }

  return _env.data;
};

export const env = parseEnv();
