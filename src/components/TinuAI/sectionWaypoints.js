/**
 * Section waypoints configuration for Tinu AI Robot Exploration.
 * Maps real section IDs to verified safe, non-obstructive perimeter areas.
 * Percentages (xRatio, yRatio) are relative to the section's bounding rectangle.
 * 
 * Waypoints are positioned strategically in peripheral margins to guarantee
 * that Tinu AI never obstructs buttons, terminal cards, portraits, or text content.
 */

export const SECTION_ORDER = [
  'hero',
  'about',
  'skills',
  'projects',
  'journey',
  'lab',
  'achievements',
  'blog',
  'contact',
  'footer'
];

export const SECTION_WAYPOINTS = {
  hero: {
    name: 'Hero / Introduction',
    desktop: [
      { xRatio: 0.92, yRatio: 0.88, label: 'Hero Bottom-Right Periphery' },
      { xRatio: 0.94, yRatio: 0.50, label: 'Hero Right Column Perimeter' }
    ],
    mobile: [{ xRatio: 0.84, yRatio: 0.90 }]
  },
  about: {
    name: 'About Section',
    desktop: [
      { xRatio: 0.92, yRatio: 0.86, label: 'About Lower Right Gutter' },
      { xRatio: 0.94, yRatio: 0.40, label: 'About Upper Right Perimeter' }
    ],
    mobile: [{ xRatio: 0.84, yRatio: 0.88 }]
  },
  skills: {
    name: 'Skills Matrix',
    desktop: [
      { xRatio: 0.93, yRatio: 0.84, label: 'Skills Right Perimeter' },
      { xRatio: 0.93, yRatio: 0.45, label: 'Skills Upper Right Gutter' }
    ],
    mobile: [{ xRatio: 0.84, yRatio: 0.88 }]
  },
  projects: {
    name: 'Projects Gallery',
    desktop: [
      { xRatio: 0.94, yRatio: 0.82, label: 'Projects Right Perimeter' },
      { xRatio: 0.94, yRatio: 0.48, label: 'Projects Mid Right Gutter' }
    ],
    mobile: [{ xRatio: 0.84, yRatio: 0.88 }]
  },
  journey: {
    name: 'Career Journey',
    desktop: [
      { xRatio: 0.92, yRatio: 0.82, label: 'Journey Lower Right' },
      { xRatio: 0.94, yRatio: 0.42, label: 'Journey Mid Right' }
    ],
    mobile: [{ xRatio: 0.84, yRatio: 0.88 }]
  },
  lab: {
    name: 'Learning Lab',
    desktop: [
      { xRatio: 0.93, yRatio: 0.82, label: 'Lab R&D Right Perimeter' },
      { xRatio: 0.93, yRatio: 0.45, label: 'Lab R&D Upper Gutter' }
    ],
    mobile: [{ xRatio: 0.84, yRatio: 0.88 }]
  },
  achievements: {
    name: 'Credentials & Achievements',
    desktop: [
      { xRatio: 0.93, yRatio: 0.84, label: 'Credentials Right Area' },
      { xRatio: 0.93, yRatio: 0.45, label: 'Credentials Mid Right' }
    ],
    mobile: [{ xRatio: 0.84, yRatio: 0.88 }]
  },
  blog: {
    name: 'Tech Journal',
    desktop: [
      { xRatio: 0.94, yRatio: 0.80, label: 'Journal Margin Right' },
      { xRatio: 0.94, yRatio: 0.45, label: 'Journal Mid Right' }
    ],
    mobile: [{ xRatio: 0.84, yRatio: 0.88 }]
  },
  contact: {
    name: 'Contact Transmissions',
    desktop: [
      { xRatio: 0.95, yRatio: 0.90, label: 'Contact Outer Right Gutter' },
      { xRatio: 0.95, yRatio: 0.50, label: 'Contact Mid Right Perimeter' }
    ],
    mobile: [{ xRatio: 0.84, yRatio: 0.92 }]
  },
  footer: {
    name: 'Portfolio Base',
    desktop: [
      { xRatio: 0.88, yRatio: 0.48, label: 'Footer Base Right' }
    ],
    mobile: [{ xRatio: 0.84, yRatio: 0.50 }]
  }
};
