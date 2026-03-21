import { StrategicVertical } from '@/types/api';

const categoryImages: Record<string, string> = {
  'critical-minerals': '/minerals.png',
  'industrial-chemicals': '/solvents.png',
  'bulk-raw-materials': '/polymers.png',
  polymers: '/polymers.png',
  solvents: '/solvents.png',
  pigments: '/pigments.png',
  additives: '/additives.png',
  minerals: '/minerals.png',
  specialty: '/specialty.png',
};

const categoryNameImages: Record<string, string> = {
  'critical transition materials': '/minerals.png',
  'critical minerals': '/minerals.png',
  'industrial chemicals': '/solvents.png',
  'bulk raw materials': '/polymers.png',
};

function normalize(value?: string) {
  return (value || '').trim().toLowerCase();
}

export function resolveCategoryImage(category: StrategicVertical): string {
  const byId = categoryImages[category.id];
  if (byId) return byId;

  const nameKey = normalize(category.name);
  const byName = categoryNameImages[nameKey];
  if (byName) return byName;

  if (nameKey.includes('mineral')) return '/minerals.png';
  if (nameKey.includes('industrial') || nameKey.includes('chemical')) return '/solvents.png';
  if (nameKey.includes('bulk') || nameKey.includes('raw')) return '/polymers.png';

  return '/polymers.png';
}
