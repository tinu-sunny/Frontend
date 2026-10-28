/**
 * Section waypoints configuration for Tinu AI Robot Exploration.
 * Maps real section IDs to verified safe, non-obstructive perimeter areas.
 * Percentages (xRatio, yRatio) are relative to the section's bounding rectangle.
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
      { xRatio: 0.88, yRatio: 0.84, label: 'Hero Terminal Margin' },
      { xRatio: 0.12, yRatio: 0.84, label: 'Hero Intro Margin' },
      { xRatio: 0.50, yRatio: 0.90, label: 'Hero Sub-Headline Runway' }
    ],
    mobile: [{ xRatio: 0.82, yRatio: 0.88 }]
  },
  about: {
    name: 'About Section',
    desktop: [
      { xRatio: 0.86, yRatio: 0.86, label: 'About Lower Right' },
      { xRatio: 0.14, yRatio: 0.86, label: 'About Lower Left' }
    ],
    mobile: [{ xRatio: 0.82, yRatio: 0.88 }]
  },
  skills: {
    name: 'Skills Matrix',
    desktop: [
      { xRatio: 0.90, yRatio: 0.80, label: 'Skills Right Perimeter' },
      { xRatio: 0.10, yRatio: 0.80, label: 'Skills Left Perimeter' },
      { xRatio: 0.50, yRatio: 0.92, label: 'Skills Lower Runway' }
    ],
    mobile: [{ xRatio: 0.82, yRatio: 0.88 }]
  },
  projects: {
    name: 'Projects Gallery',
    desktop: [
      { xRatio: 0.92, yRatio: 0.78, label: 'Projects Right Gutter' },
      { xRatio: 0.08, yRatio: 0.78, label: 'Projects Left Gutter' },
      { xRatio: 0.86, yRatio: 0.92, label: 'Projects Lower Runway' }
    ],
    mobile: [{ xRatio: 0.82, yRatio: 0.88 }]
  },
  journey: {
    name: 'Career Journey',
    desktop: [
      { xRatio: 0.88, yRatio: 0.72, label: 'Timeline Right Path' },
      { xRatio: 0.12, yRatio: 0.72, label: 'Timeline Left Path' }
    ],
    mobile: [{ xRatio: 0.82, yRatio: 0.88 }]
  },
  lab: {
    name: 'Learning Lab',
    desktop: [
      { xRatio: 0.88, yRatio: 0.82, label: 'Lab R&D Right Perimeter' },
      { xRatio: 0.12, yRatio: 0.82, label: 'Lab R&D Left Perimeter' }
    ],
    mobile: [{ xRatio: 0.82, yRatio: 0.88 }]
  },
  achievements: {
    name: 'Credentials & Achievements',
    desktop: [
      { xRatio: 0.88, yRatio: 0.84, label: 'Credentials Right Area' },
      { xRatio: 0.12, yRatio: 0.84, label: 'Credentials Left Area' }
    ],
    mobile: [{ xRatio: 0.82, yRatio: 0.88 }]
  },
  blog: {
    name: 'Tech Journal',
    desktop: [
      { xRatio: 0.90, yRatio: 0.78, label: 'Journal Margin Right' },
      { xRatio: 0.10, yRatio: 0.78, label: 'Journal Margin Left' }
    ],
    mobile: [{ xRatio: 0.82, yRatio: 0.88 }]
  },
  contact: {
    name: 'Contact Transmissions',
    desktop: [
      { xRatio: 0.94, yRatio: 0.92, label: 'Contact Outer Right Gutter' },
      { xRatio: 0.06, yRatio: 0.88, label: 'Contact Coordinates Margin' },
      { xRatio: 0.06, yRatio: 0.52, label: 'Contact Digital Footprint Margin' }
    ],
    mobile: [{ xRatio: 0.85, yRatio: 0.94 }]
  },
  footer: {
    name: 'Portfolio Base',
    desktop: [
      { xRatio: 0.82, yRatio: 0.52, label: 'Footer Base Right' },
      { xRatio: 0.18, yRatio: 0.52, label: 'Footer Base Left' }
    ],
    mobile: [{ xRatio: 0.82, yRatio: 0.60 }]
  }
};
