export const Environments = {
  PRODUCTION: 'production' || 'PRODUCTION',
  DEVELOPMENT: 'development' || 'DEVELOPMENT'
} as const;

export type Environments = typeof Environments[keyof typeof Environments];
