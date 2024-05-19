export const frameworks = ['nostr', 'json', 'atom', 'php', 'rss'] as const;

export type Framework = (typeof frameworks)[number];
