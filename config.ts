import { z } from 'zod';

// Base schema for all adapters
const BaseAdapterSchema = z.object({
  enabled: z.boolean().default(false),
});

// SMTP Adapter Schema
const SmtpAdapterSchema = BaseAdapterSchema.extend({
  type: z.literal('smtp'),
  host: z.string(),
  port: z.number().int().positive(),
  user: z.string().optional(),
  pass: z.string().optional(),
  from: z.string().email(),
});

// Webhook Adapter Schema
const WebhookAdapterSchema = BaseAdapterSchema.extend({
  type: z.literal('webhook'),
  url: z.string().url(),
});

// Plugin Configuration Schema
export const PluginConfigSchema = z.object({
  adapters: z.array(z.discriminatedUnion('type', [SmtpAdapterSchema, WebhookAdapterSchema])),
});

export type PluginConfig = z.infer<typeof PluginConfigSchema>;
export type NotificationEvent = {
  type: string;
  title: string;
  message: string;
};
