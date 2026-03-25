import type { NotificationEvent } from './config';

export interface Adapter {
  send(event: NotificationEvent): Promise<void>;
}

export class NotificationRouter {
  private adapters: Map<string, Adapter> = new Map();

  register(name: string, adapter: Adapter) {
    this.adapters.set(name, adapter);
  }

  async dispatch(event: NotificationEvent) {
    const promises = Array.from(this.adapters.values()).map(adapter => adapter.send(event));
    await Promise.all(promises);
  }
}
