export const API_KEYS = {
  public: 'pk_live_abc123...',
  secret: 'sk_live_xyz789...',
};

export const PLAN = {
  name: 'Pro Plan',
  price: '$29/month',
  nextBilling: 'January 15, 2024',
  active: true,
};

export const RETENTION_OPTIONS = [
  { label: '30 days', value: '30' },
  { label: '90 days', value: '90' },
  { label: '180 days', value: '180' },
  { label: '1 year', value: '365' },
];

export const SAMPLING_OPTIONS = [
  { label: '25%', value: '25' },
  { label: '50%', value: '50' },
  { label: '75%', value: '75' },
  { label: '100%', value: '100' },
];

export const DEFAULT_DATA_RETENTION = '90';
export const DEFAULT_SAMPLING = '100'; 