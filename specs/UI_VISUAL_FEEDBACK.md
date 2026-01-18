# UI Visual Feedback & System Indicators

**Scope**: Visual animations and feedback for building placement, system health, cascades, congestion, and agent activity.

**Audience**: UI/UX Designer, Graphics Engineer

**Related Specs**: RESIDENT_MOVEMENT.md, CONGESTION_MECHANICS.md, MAINTENANCE_SYSTEM.md, FAILURE_CASCADES.md, AGENT_SYSTEM.md

**Status**: 🚧 In Progress (Visual polish for core mechanics)

## Overview

The existing UI_UX.md and GRAPHICS.md define the base UI layout and visual style. This spec adds **dynamic visual feedback** that communicates:

- Building placement result (successful or invalid)
- System health status (healthy → degraded → critical → failed)
- Cascading failures (visual cascade through UI)
- Congestion (residents bunching, slow movement)
- Agent activity (optional: see workers maintaining)
- Crises and emergencies (red alerts, flashing, urgency)

This makes abstract mechanics **visible and understandable**.

## Building Placement Feedback

### Ghost Preview Enhancement

**Current** (from UI_UX.md):
- Semi-transparent room preview during placement
- Cyan (valid) or magenta (invalid) coloring

**Enhanced**:
- Smooth 200ms fade-in when preview appears
- Placement result animation (200-300ms)
- Cost preview shows up/down cost change

### Placement Success Animation

When room is placed:
```
1. Flash white (50ms) - "snap" confirmation
2. Scale briefly up 1.05x (200ms) - growth feeling
3. Glow cyan (300ms) - confirmation glow
4. Fade to normal (200ms) - integration
5. Total: 750ms
```

**Visual**: Room grows and glows, confirming successful placement

### Placement Failure Animation

When placement fails (invalid):
```
1. Preview turns magenta (100ms)
2. Shake left-right (200ms, 3px shake) - "no" signal
3. Pulse magenta twice (400ms total)
4. Fade out (200ms)
5. Total: 500ms
```

**Visual**: Rejection is visceral (shaking, pulsing)

### Cost Feedback

When selecting room to place:
- Cost appears below room button
- If enough money: white text
- If not enough money: magenta warning, italic, strike-through
- Amount needed shows in magenta: "Need 2,000 CR more"

When placing:
- Credits deduct smoothly (500ms animation)
- Number flashes red briefly (100ms) - impact moment
- Return to white (300ms)

## System Health Indicators

### Health Bar Visual Progression

**Normal** (100% - 50% health):
- Bar color: Cyan (#00e0e0)
- Glow: Subtle (0 0 5px)
- Background: Dark with faint grid

**Degraded** (50% - 20% health):
- Bar color: Amber (#e0a040)
- Glow: Moderate (0 0 10px)
- Pulsing: Slow 2-second pulse
- Text: Warning label appears "Degraded"

**Critical** (20% - 5% health):
- Bar color: Orange (#e06020)
- Glow: Strong (0 0 15px)
- Pulsing: Fast 1-second pulse
- Text: "CRITICAL" label flashing
- Icon: Warning triangle appears next to health

**Failed** (0% health):
- Bar color: Magenta (#e044a0)
- Glow: Intense (0 0 20px)
- Pulsing: Very fast (0.5s pulses)
- Text: "FAILED" in red
- Icon: X icon, bold red
- Animation: Slight rotation if building shakes

### System Health in Top Bar

Add real-time system status row above main UI:
```
OXYGEN: ████████░░ 80% | POWER: ██████░░░░ 60% | WATER: █████░░░░░ 50% | FOOD: ███████░░░ 70%
```

**Colors**:
- Green bar: 100%-50%
- Amber bar: 50%-20%
- Red bar: 20%-0%

**Updates**: Real-time (no lag)

**Hover**: Shows full name and health value

## Congestion Feedback

### Visual Bunching

When congestion > 50%:
- Residents in corridors appear **packed closely** (visual density)
- Smaller gaps between residents (normal: 2 units apart, congested: 0.5 units apart)
- Movement visibly **slowed** (animation plays slower)

When congestion > 80%:
- Residents appear **squeezed** (reduced sprite size, crowded effect)
- Movement **very slow** (crawling animation)
- Color **tint darkens** (less light in crowded space)

### Congestion Meter (Optional UI Panel)

Show current congestion in detailed view:
```
LOBBY CONGESTION: ████████░░ 75% (25 residents / 35 capacity)

Movement Speed: 65% (normal)
Status: HIGH - Residents experiencing delays

CORRIDOR NORTH: ██████░░░░ 60%
CORRIDOR SOUTH: ████████░░ 75%  ← Worst bottleneck
STAIRWELL A: ███░░░░░░░ 30%
STAIRWELL B: █░░░░░░░░░ 10%
```

**Updates**: Every 5 game-seconds

**Color coding**:
- Green: <40% (good flow)
- Amber: 40-70% (moderate)
- Red: >70% (congested)

## Cascade Visual Effects

### Cascading Failure Animation

When system fails and cascade begins:

**Secondary System Alert** (cascade visible):
```
Power fails (0%) → Oxygen backup indicator turns red
                 → Power drain icon appears (lightning bolt)
                 → Elevator indicator shows "OFFLINE"
```

**Visual progression** (500ms):
1. Primary system failure (magenta pulse)
2. 200ms delay (telegraphing)
3. Secondary system alert appears (orange flash)
4. UI connections glow (showing cascade path)
5. Rapid cascade through 3-4 secondary systems

### Cascade Path Visualization (Optional)

Draw visual lines showing cascade:
```
POWER (0%) ──[red arrow]──> OXYGEN BACKUP (now offline)
                         ──> WATER PUMPS (now offline)
                         ──> ELEVATORS (now offline)
```

**Lines appear** (200ms animation):
- Red color (critical)
- Glow effect (0 0 10px)
- Pulse along the line (showing cascade flow)

**Duration**: Lines stay visible for 5-10 seconds then fade

### Emergency Alert UI

When cascade detected:
- Top bar turns red (background)
- Flashing alert icon with count
- Sound cue (warning beep)
- Sidebar systems list shows affected systems in red
- Build menu greyed out (actions disabled during emergency)

**Example**:
```
⚠️ CRITICAL ALERT: 3 SYSTEMS OFFLINE
Power ●●● | Oxygen Backup ●●● | Water Pumps ●●●
[EMERGENCY REPAIR] [EMERGENCY SUPPLIES] [CANCEL]
```

## Agent Activity Feedback (Optional)

### Worker Count Display

In system health UI, show worker allocation:

```
OXYGEN SYSTEM
Health: ████░░░░░░ 45%
Workers: ████ 5/30 maintenance assigned

Status: Maintenance in progress (12 min remaining)
```

When emergency:
```
OXYGEN SYSTEM
Health: ░░░░░░░░░░ 0% [FAILED]
Workers: ████████████ 20/30 in emergency repair

Emergency repair started 30 seconds ago
Estimated time remaining: 2 minutes 45 seconds
```

**Updates**: Real-time

**Color**:
- Green text: On schedule
- Amber text: Behind schedule
- Red text: Emergency in progress

### Worker Redirect Animation (Optional)

When workers reassigned to emergency:
- Worker icons move from system A to system B (300ms animation)
- Trail shows path (glowing line, 200ms)
- Sound cue (subtle "whoosh")
- System A worker count decreases (animated countdown)
- System B worker count increases (animated countup)

**Visible in UI panel only** (not in main game view)

## Starvation & Disease Feedback

### Food Level Indicator

**Normal** (>50%):
- Green bar, happy resident icon
- Text: "250 rations (5 days)"

**Low** (20-50%):
- Amber bar, concerned resident icon
- Pulsing (1-second pulse)
- Text: "75 rations (1.5 days)" in amber

**Critical** (0-20%):
- Red bar, desperate resident icon
- Fast pulsing (0.5-second pulse)
- Text: "5 rations (6 hours)" in red
- Flash icon: ⚠️ STARVATION IMMINENT

**Empty** (0%):
- Magenta bar, death icon (skull)
- Very fast pulsing (0.3-second pulse)
- Text: "0 rations" in magenta
- FLASHING warning: ⚠️ RESIDENTS STARVING ⚠️

### Disease Outbreak UI

When disease spreads:
- Health section shows: "🦠 Disease: 5 residents" in orange
- Updates in real-time: "🦠 Disease: 50 residents" (number grows)
- When epidemic (>100 residents): "🦠 EPIDEMIC: 150/200 residents" in red
- Medical button highlights: "MEDICAL CRITICAL"
- Affected residents glow slightly green/sickly in main view

**Sound**: Subtle "distress" sound plays when disease hits milestone (10, 50, 100)

## Crisis Notification System

### Alert Stack (Top-right corner)

Stack alerts as they occur:
```
[X] ⚠️ Food shortage (3 sec ago)
[X] 🔴 Power system failed (now)
[X] ⚠️ Oxygen backup offline (now)
```

**Animation**:
- New alert slides in from right (200ms)
- Auto-remove after 8 seconds or X click
- Old alerts fade out (300ms)

**Severity colors**:
- 🔴 Critical (red): System failed, cascading, or resident death
- ⚠️ Warning (amber): System degraded, low resources
- ℹ️ Info (cyan): Building event, system maintained

### Full-Screen Crisis Alert (Emergency Mode)

When multiple critical failures (>2 cascading):

```
┌─────────────────────────────────────────┐
│  ⚠️ CRITICAL CASCADING FAILURE ⚠️      │
│                                         │
│  POWER SYSTEM: OFFLINE                  │
│  ├─ Oxygen Backup: OFFLINE              │
│  ├─ Water Pumps: OFFLINE                │
│  └─ Elevators: OFFLINE                  │
│                                         │
│  171 residents stranded in elevators    │
│  Oxygen level: 45% and dropping         │
│  Water offline for 8 minutes            │
│                                         │
│  [EMERGENCY POWER] $6,000 [Emergency Oxygen] $5,000
│  [PAUSE] [SKIP REPAIR]                  │
└─────────────────────────────────────────┘
```

**Animations**:
- Fade in (300ms)
- Red border pulses
- Numbers update in real-time
- Buttons glow and pulse
- Slight camera shake (optional, immersive)

## Time Acceleration Visual Feedback

### Game Speed Indicator

Current (from UI_UX.md): ⏸ 1x 2x 4x buttons

**Enhanced**:
- Active button highlighted with cyan glow
- When paused: PAUSED text flashes across screen (subtle)
- Speed label shows: "1x Speed" (or "4x Speed")
- Particle effects speed matches game speed (faster at 4x)
- Time displays "SOL 5 14:30" (current game time)

**Feedback when changing speed**:
- 200ms button click animation
- Speed change applies immediately
- UI text confirms: "Speed: 4x" appears briefly

## Settings & Visual Preferences

### Graphics Options (in Settings menu)

**Visual Feedback Options**:
- [ ] Cascade visualization (show lines)
- [ ] Agent activity display (show worker counts)
- [ ] Congestion meter (show detailed view)
- [ ] Health bar animations (pulse/glow)
- [ ] Particle effects (ash, smoke, heat)
- [x] Scanline overlay (current: enabled)
- [ ] Screen shake during crises
- [ ] Motion blur at high speed

**Performance**:
- Default: All enabled
- Low-end device: Particles, cascades, shake disabled
- High-end: All enabled + extra particle layers

## Animation Style Guide

### Easing Functions

**Standard transitions** (UI elements):
- Duration: 200-300ms
- Easing: `cubic-bezier(0.25, 0.1, 0.25, 1.0)` (smooth)

**Emergencies** (crisis alerts):
- Duration: 100-200ms
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` (snappy, bounce)

**Loading/processing** (animations):
- Duration: 500-1000ms
- Easing: `cubic-bezier(0.4, 0, 0.6, 1)` (ease-in-out)

### Color Transitions

**Health bar changes**:
- Transition duration: 500ms
- Smooth gradient from cyan → amber → orange → magenta
- Glow intensity increases with urgency

**System failures**:
- Change to red/magenta instantly (50ms)
- Pulse animation starts immediately
- Glow increases (200ms)

## Definition of Done

This specification is complete when:
- [ ] Building placement animations specified (success/failure)
- [ ] Health indicator visuals specified (all 4 states)
- [ ] Cascade visualization specified (optional lines + alerts)
- [ ] Congestion feedback specified (visual bunching + meter)
- [ ] Crisis notifications specified (alert stack + full-screen)
- [ ] Agent activity display specified (optional)
- [ ] Food/disease indicators specified
- [ ] Animation easing and timing specified
- [ ] Settings options specified

## Next Steps (UI Implementation)

1. Implement building placement animations (success/failure feedback)
2. Add system health indicators with color progression
3. Implement cascade visualization (alert UI at minimum)
4. Add congestion visual effects (bunching, slower movement)
5. Implement crisis notification system (alert stack)
6. Optional: Add agent activity displays
7. Test all animations at different game speeds (1x, 4x)
8. Performance optimization (disable expensive effects on low-end)
