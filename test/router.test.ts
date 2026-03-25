import { expect, test, mock } from 'bun:test';
import { NotificationRouter } from '../src/router';
import type { NotificationEvent } from '../src/config';

test('NotificationRouter dispatches events to registered adapters', async () => {
  const router = new NotificationRouter();
  const mockAdapter = {
    send: mock(async () => {}),
  };
  
  router.register('test', mockAdapter);
  
  const event: NotificationEvent = { type: 'test', title: 'Hello', message: 'World' };
  await router.dispatch(event);
  
  expect(mockAdapter.send).toHaveBeenCalledTimes(1);
  expect(mockAdapter.send).toHaveBeenCalledWith(event);
});
