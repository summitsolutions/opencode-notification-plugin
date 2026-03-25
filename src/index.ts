import { NotificationRouter } from './router';
import { loadConfig } from './loader';
import { createAdapter } from './factory';

export const NotificationPlugin = async ({ project }) => {
  // 1. Load config (assuming it's available in project or a standard file)
  // For now, we will expect a notification-plugin.json in the project root
  const configPath = `${project.directory}/notification-plugin.json`;
  let config;
  try {
    const file = Bun.file(configPath);
    config = await loadConfig(await file.json());
  } catch (e) {
    console.warn("[Notification Plugin] No configuration found at", configPath);
    return {};
  }

  // 2. Initialize Router and Adapters
  const router = new NotificationRouter();
  for (const adapterConfig of config.adapters) {
    if (adapterConfig.enabled) {
      const adapter = await createAdapter(adapterConfig);
      router.register(adapterConfig.type, adapter);
    }
  }

  // 3. Return event hook
  return {
    event: async ({ event }) => {
      // Standardize event and dispatch
      await router.dispatch({
        type: event.type,
        title: `Event: ${event.type}`,
        message: `Observed event ${event.type} in project ${project.name}`,
      });
    },
  };
};
