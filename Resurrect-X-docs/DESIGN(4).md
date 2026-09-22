---
name: Sovereign Legal Bastion
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#ffb95f'
  on-secondary: '#472a00'
  secondary-container: '#ee9800'
  on-secondary-container: '#5b3800'
  tertiary: '#ffb3ad'
  on-tertiary: '#68000a'
  tertiary-container: '#ff7a73'
  on-tertiary-container: '#79000e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-trust, cyber-hardened interface engineered for sovereign legal operations, classified document discovery, and air-gapped LLM orchestration. Operating within Australian jurisdiction constraints and high-compliance enclaves, the visual identity blends institutional legal solemnity with defensive cybersecurity instrumentation.

The aesthetic fuses **Minimalism** with **Tactile Technical Brutalism**:
- Heavy reliance on structural line grids, hairline division boundaries, and monospaced telemetry feeds.
- High visual density counterbalanced by disciplined typographic rhythm, eliminating decorative flourishes in favor of auditability and operational clarity.
- Sensory feedback models hardware enclave states: positive verification glows, deliberate latency transitions, state-locked indicators, and visible cryptographic integrity checks.

## Colors

The palette enforces dual operational security states: **Active Enclave (Read/Write)** and **Hardened Vault (Read-Only)**.

### Core Architecture
- **Obsidian Ground (`#0B0F17`)**: Base viewport, void spaces, and uninstantiated surfaces.
- **Deep Slate Enclave (`#0F172A`)**: Primary container background for work areas, legal briefs, and chat streams.
- **Titanium Boundary (`#1E293B`)**: Structural grid lines, borders, data table partitions, and module shells.
- **Cyber Silver (`#E2E8F0`)**: Primary typography and high-contrast vector assets, dialed down to `#94A3B8` for secondary legal metadata.

### Operational State Tokens
- **Sovereign Emerald (`#10B981`)**: Read/Write operational mode, verified local inference pipelines, intact air-gaps, cryptographic consensus reached.
- **Hardened Amber-Gold (`#F59E0B`)**: Read-Only Vault status, air-gapped quarantine, caution checkpoints, redacted artifact alerts.
- **Crimson Shield (`#EF4444`)**: Unsanitized data ingress, network egress violations, integrity failure, and critical statutory privilege warnings.

### Surface System
- Avoid soft ambient pastel tints. Surfaces must communicate rigid mechanical planes using precise 1px borders in `#1E293B` or semi-opaque state accents (e.g., `#10B981` at 8% opacity for active processing states).

## Typography

The type system is divided strictly by function:
- **Inter** executes statutory analysis, legal drafting, clauses, briefs, and general UI communications. It provides maximum legibility during high-stress analytical workloads, preserving optical balance at all sizes.
- **JetBrains Mono** governs sovereign hardware parameters, cryptohashes, chain of custody logs, statutory citations (e.g., *Corporations Act 2001 (Cth) s 180*), model token throughput, and operational security switches.

All monospaced labels must use uppercase or tabular figures to preserve vertical columnar alignment across high-frequency audit monitors.

## Layout & Spacing

The layout is built on a responsive 12-column fixed-fluid system structured around a permanent BIOS status header and tactical docking bays.

### Screen Adaptations
- **Desktop (1280px and above)**: 12 columns with 24px (`space-lg`) gutters and 32px (`margin-desktop`) outer frame margins. Tri-pane layout comprising Enclave Diagnostics (left, 240px fixed), Evidence & Brief Drafting (center, flexible), and Source Citation Anchor (right, 380px fixed).
- **Tablet (768px - 1279px)**: 8 columns with 16px (`gutter`) gutters and 24px outer margins. Collapses telemetry to top expandable drawers and stacks the citation anchor beneath active draft tabs.
- **Mobile (below 768px)**: 4 columns with 12px gutters and 16px (`margin`) margins. Prioritizes the active workspace panel with tactile modal drawers for telemetry and redaction management.

The 4px base modular unit standardizes vertical metrics. Element gaps within analytical tables and metadata clusters are strictly tied to `space-xs` (4px) and `space-sm` (8px).

## Elevation & Depth

This system intentionally rejects soft, cloud-like drop shadows. Elevation is achieved strictly through **mechanical layering**, **sub-pixel boundary luminescence**, and **tactile structural planes**:

- **Ground Level (Base / 0)**: `#0B0F17` unlit base frame.
- **Level 1 (Dock & Panels)**: `#0F172A` with a crisp 1px continuous border of `#1E293B`.
- **Level 2 (Active Work Surface / Cards)**: `#141E33` surface accompanied by a hairline top border highlight of `rgba(226, 232, 240, 0.08)`.
- **Level 3 (Modal Quarantine & Flyouts)**: Layered over a `#0B0F17` backdrop at 85% opacity with an intense, short-throw proximity outline (`0 0 0 1px #1E293B, 0 8px 16px -4px rgba(0, 0, 0, 0.6)`).
- **Enclave State Aura**: When Read/Write mode is engaged, primary panels project a subtle 1px border illumination of `#10B981` at 25% opacity. In Read-Only Vault mode, this shifts to `#F59E0B` at 30% opacity.

## Shapes

The design system enforces a **Soft Sharpness** visual grammar (`roundedness: 1`). Elements use a default border-radius of 4px (`0.25rem`), reinforcing structural resilience, precision, and tool-grade durability. 

- Large modals, evidentiary canvas wrappers, and card shells maintain `0.25rem` corners to mirror precision avionics instrumentation.
- Badges, status chips, and toggle track containers utilize a hard `2px` or `4px` limit. Pill radii (`9999px`) are strictly forbidden, as roundness degrades technical authority.

## Components

### Dual-Mode Tactical Switcher Badge
- A segmented hardware-style toggler fixed in the utility tier.
- Left segment: `[RW] ACTIVE` in Emerald (`#10B981`). Right segment: `[RO] VAULT` in Amber (`#F59E0B`).
- Selected state renders with a solid high-contrast fill (15% tint), 1px state border, and a pulsing 4px square ledger light.
- Clicking transitions the entire workspace security envelope, switching cursor states and read/write availability in legal documents.

### Air-Gap Hardware Telemetry Indicator
- Monospaced indicator banner anchored inside the BIOS header.
- Displays live metrics: `AIRGAP: ENFORCED | EGRESS: 0.0 KB/s | SOVEREIGN NODE: SYD-01 | ENCLAVE: SECCOMP-ACTIVE`.
- Real-time values render in `JetBrains Mono` at `label-sm`.
- Status dots use solid squares (4x4px) rather than circles: green indicates verified on-premises inference; flashing amber signals batch sanitization queue.

### PII Redaction Shield with Unblur Preview
- Applied to legal briefs, personal affidavits, and Australian Privacy Principle (APP) sensitive entities.
- Redacted state displays as an obsidian block (`#0B0F17`) with a crisp `#1E293B` double cross-hatch pattern and an over-printed monospaced token (e.g., `[REDACTED: TFN-CONFIDENTIAL]`) in `#F59E0B`.
- Hover/Hold triggers an authenticated decimation preview: a translucent emerald highlight revealing the text with a continuous subtle scanline animation and security audit stamp.

### Citation Evidence Cards
- Pinned to the discovery rail to support LLM assertions with authoritative Australian legal precedents (High Court of Australia, Federal Court, Statutory codes).
- Styled with Level 2 surface nesting, a 2px left edge indicator (Emerald for direct statutory match, Amber for contextual dicta), and clear metadata labels for court, year, bench, and pin-point paragraph.
- Includes a direct "Verify Hash" link rendered in `label-sm` displaying SHA-256 slice verification.

### BIOS-Terminal Security Status Header
- Permanent 36px top anchor frame.
- High-density monospaced header featuring the application moniker, Australian jurisdictional identifier (`AU-NSW-LEGAL-ENCLAVE`), current session clearance, and an immediate emergency zeroize/lockout control.
- Delimited via horizontal 1px line in `#1E293B` across the full viewport width.

### Form Inputs & Text Fields
- Dark titanium inset fields (`#0B0F17`) bounded by 1px `#1E293B`.
- Focused state replaces the border with an unblurred 1px `#10B981` (Read/Write) or `#F59E0B` (Read-Only) ring with zero blur expansion.
- Placeholder text utilizes `#94A3B8` at 60% opacity in `body-md`.

### Buttons
- **Primary Sovereign**: Solid Emerald (`#10B981`) background, Jet Black text (`#0B0F17`), weight 600, uppercase letter-spaced font. Hover elevates to `#34D399`.
- **Vault Action**: Amber (`#F59E0B`) solid background, dark text for irrevocable or sealing functions.
- **Enclave Ghost**: Transparent background, 1px `#1E293B` border, Cyber Silver (`#E2E8F0`) text. Hover introduces `#1E293B` fill.