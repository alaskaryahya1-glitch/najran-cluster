# Najran Health Cluster Design Guidelines

## Design Approach
**Material Design Foundation** with Government-Healthcare adaptation - prioritizes clarity, accessibility, and institutional credibility while maintaining modern sophistication suitable for Saudi government entity.

## Typography System
**Primary Font:** IBM Plex Sans Arabic (excellent Arabic support, professional)
**Secondary:** Inter (English content)

Hierarchy:
- Hero Headlines: 4xl-6xl (72-96px desktop), bold weight
- Section Headers: 3xl-4xl (48-60px), semibold
- Subsections: 2xl (32px), medium
- Body: lg (18px), regular - larger for accessibility
- Captions/Metadata: sm (14px), medium

RTL Considerations: Mirror all layouts completely - navigation right-aligned, text flows right-to-left, icons flip appropriately.

## Layout & Spacing System
**Tailwind Units:** Standardize on 4, 8, 12, 16, 20, 24 units
- Component padding: p-8 to p-12
- Section spacing: py-16 to py-24
- Element gaps: gap-4, gap-8
- Max container: max-w-7xl

Grid System: 12-column grid, responsive breakpoints standard (sm/md/lg/xl/2xl)

## Core Components

### Navigation
Sticky header with dual-language switcher (Arabic/English toggle prominent top-right), ministry logo left, main navigation center-aligned. Include accessibility menu, search functionality, patient portal login button. Add thin top bar with ministry affiliation, emergency contact.

### Hero Section
**Full-width hero image** (1920x800px) showing modern Najran healthcare facility - bright, professional medical environment with Saudi healthcare professionals. Overlay gradient for text legibility. Centered headline + subheadline + dual CTA buttons (Services / Transformation Journey). Buttons use backdrop-blur-md background treatment.

### Transformation Journey Section
**Before/After Comparison Component:**
Split-screen slider with draggable divider. Left: historical photo (grayscale treatment), Right: modern facility (full color). Include metric overlays showing transformation stats (beds increased, technology adoption, patient satisfaction). Stack 3-4 comparison sets vertically - infrastructure, technology, patient care, workforce development.

Add timeline visualization below comparisons - horizontal roadmap showing 2020-2030 milestones with expandable detail cards.

### Service Cards Grid
3-column layout (desktop), single-column (mobile). Each card: icon header, service name, brief description, arrow link. Categories: Emergency Services, Specialized Care, Preventive Health, Digital Services, Research & Innovation.

### Statistics Dashboard Section
4-column metrics bar: Hospital Count, Medical Staff, Annual Patients, Digital Transformation %. Use large numbers (5xl), labels below. Add animated counter effect on viewport entry.

### Achievements & Accreditations
Masonry grid showcasing certifications, awards, international partnerships. Each item: credential logo, title, date, brief description. Mix card sizes for visual interest.

### News & Updates
2-column layout: Featured article (left, larger card with image) + Recent updates grid (right, 3 compact cards). Include date stamps, category tags, read-time estimates.

### Contact & Locations
Split layout: Interactive map (60% width) + Contact information panel (40%). Include multiple facility locations, department contacts, emergency numbers, feedback form link.

### Footer
Comprehensive 4-column layout: About Cluster, Quick Links, Patient Resources, Connect. Include ministry affiliations, social media, newsletter signup, accessibility statement, privacy policy. Arabic text right-aligned, English left-aligned.

## Images Specification

**Hero Image:** Modern healthcare facility exterior/interior - bright, welcoming, professional Saudi medical staff visible. 1920x800px minimum.

**Transformation Images:** 
- Before: 800x600px historical facilities (apply grayscale filter)
- After: 800x600px current facilities (vibrant, modern)
- Minimum 4 comparison sets required

**Service Section:** Icon-based (Material Icons Healthcare set), no photos needed

**Achievements:** Credential/certificate imagery, logo badges - various sizes

**News Cards:** 400x250px article thumbnails - healthcare activities, events, initiatives

## Interaction Patterns
Before/After slider: Smooth draggable divider with snap feedback
Statistics: Count-up animation on scroll into view
Navigation: Smooth scroll anchoring to sections
Language Toggle: Instant layout flip with 300ms transition
Cards: Subtle lift on hover (transform translateY(-4px))

## Accessibility Requirements
WCAG 2.1 AA compliance mandatory. High contrast ratios, keyboard navigation throughout, screen reader optimization for Arabic content, focus indicators visible, alt text for all images in both languages.

## Bilingual Implementation
Maintain separate stylesheets for RTL/LTR. Arabic as default, English toggle switches entire layout direction. All content mirrored appropriately - logos stay consistent, directional icons flip, navigation reverses.