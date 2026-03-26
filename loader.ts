import { PluginConfigSchema } from './config';
import type { PluginConfig } from './config';

export async function loadConfig(rawConfig: unknown): Promise<PluginConfig> {
  const result = await PluginConfigSchema.safeParseAsync(rawConfig);
  if (!result.success) {
    throw new Error(`Invalid Configuration: ${result.error.message}`);
  }
  return result.data;
}
