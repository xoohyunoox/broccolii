// Broccolii palette — "soft greens, warm whites, rounded corners, calm aesthetics —
// visual language of a health-conscious café, not a hospital" (PRD §5.5).
// No red alerts by default. Warning/error reserved for clinical-band display only.
export const colors = {
  primary: '#4F7942',       // soft green — active tab, buttons
  primaryLight: '#7BAF6E',  // lighter green — secondary actions
  primarySurface: '#EFF6ED',// very light green — card backgrounds
  background: '#FAFAF8',    // warm white — screen background
  surface: '#FFFFFF',       // pure white — cards, inputs
  border: '#E8EDE6',        // soft green-grey — dividers
  textPrimary: '#1A2E18',   // dark green-black — main text
  textSecondary: '#6B7E69', // muted green-grey — labels, hints
  textDisabled: '#B0BFB0',  // disabled state
  success: '#4F7942',       // same as primary
  warning: '#C4873A',       // warm amber — borderline values
  error: '#C0392B',         // muted red — elevated values (used sparingly)
  tabBar: {
    active: '#4F7942',
    inactive: '#B0BFB0',
    background: '#FFFFFF',
    border: '#E8EDE6',
  },
} as const;
