import { NotificationRouter } from './router.js';
import { loadConfig } from './loader.js';
import { createAdapter } from './factory.js';
import { promises as fs } from 'fs';

export const NotificationPlugin = async ({ project }: { project: any }) => {
  const configPath = `${project.directory}/notification-plugin.json`;
  let config;
  try {
    const fileContent = await fs.readFile(configPath, 'utf-8');
    config = await loadConfig(JSON.parse(fileContent));
  } catch (err) {
    console.error("[Notification Plugin] Error loading configuration:", err);
    return {};
  }

  const router = new NotificationRouter();
  for (const adapterConfig of config.adapters) {
    if (adapterConfig.enabled) {
      const adapter = await createAdapter(adapterConfig);
      router.register(adapterConfig.type, adapter);
    }
  }

  return {
    event: async ({ event }: { event: any }) => {
      await router.dispatch({
        type: event.type,
        title: `Event: ${event.type}`,
        message: `Observed event ${event.type} in project ${project.name}`,
      });
    },
  };
};
