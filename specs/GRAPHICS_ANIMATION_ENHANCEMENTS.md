# Graphics & Animation Enhancements

**Scope**: Graphical effects and animations for building placement, movement, cascades, and system states.

**Audience**: Graphics Engineer, Animator

**Related Specs**: GRAPHICS.md, UI_VISUAL_FEEDBACK.md, RESIDENT_MOVEMENT.md, MAINTENANCE_SYSTEM.md

**Status**: 🚧 In Progress (Animation polish)

## Overview

Extends GRAPHICS.md with **dynamic animations and effects** that:

- Make building placement feel satisfying (visual feedback)
- Show resident movement smoothly (walking animations)
- Display system status through visual indicators (glow, flicker)
- Visualize cascading failures (darkening, flashing)
- Create congestion effects (resident bunching)
- Show agent activity (optional: visible workers)

## Building Placement Animations

### Placement Success Sequence

When valid building is placed:

**Frame 0 (50ms)**: Building appears
- Scale: 0.95x (slightly small)
- Opacity: 0.8 (semi-transparent)
- Color: Neutral (no glow)

**Frame 1 (200ms)**: Growth and confirmation
- Scale: 1.05x (grows past normal size)
- Opacity: 1.0 (fully opaque)
- Color: Cyan glow (0 0 10px)
- Interior details: Fade in from dark

**Frame 2 (300ms)**: Integration
- Scale: 1.0x (normal size)
- Glow: Fade from cyan (0 0 10px → 0 0 5px)
- Interior lighting: Full brightness

**Frame 3 (200ms)**: Settle
- Glow: Fade to none
- Building appears normal, integrated

**Total duration**: 750ms

**Sound**: Satisfying "confirm" chime (game audio system)

### Placement Failure Sequence

When invalid building attempted:

**Frame 0 (100ms)**: Detection
- Preview turns magenta
- Color: #e044a0
- Opacity: 0.9

**Frame 1 (100ms)**: First shake
- Position: Offset left 3px
- Rotation: -0.5 degrees
- Glow: Magenta (0 0 8px)

**Frame 2 (100ms)**: Shake return
- Position: Offset right 6px (swing other way)
- Rotation: +1 degree

**Frame 3 (100ms)**: Return to center
- Position: Back to center
- Rotation: 0 degrees

**Frame 4-5 (200ms total)**: Pulse twice
- Frame 4a (50ms): Magenta glow (0 0 15px), scale 1.02x
- Frame 4b (50ms): Fade glow (0 0 5px), scale 0.98x
- Frame 5a (50ms): Magenta glow (0 0 15px), scale 1.02x
- Frame 5b (50ms): Fade glow, scale 0.98x

**Frame 6 (200ms)**: Fade out
- Opacity: 1.0 → 0.0 (linear)
- Preview disappears

**Total duration**: 500ms

**Sound**: Harsh "error" buzz (game audio system)

### Placement Cost Animation

When building is selected:
- Cost displays below button
- Number pulses (200ms pulse, repeating every 500ms)
- If unaffordable: Magenta, strike-through, italic

When building placed:
- Credit amount flashes red (100ms)
- Number updates with animated countdown
- Text remains white (normal)

## Resident Movement Animation

### Walking Animation

**Base walk cycle**: 1.5 seconds (can speed up/slow down by game speed)

**Frame breakdown** (6 frames total):

| Frame | Duration | Left Leg | Right Leg | Body | Notes |
|-------|----------|----------|-----------|------|-------|
| 1 | 0.25s | Forward stride | Back stance | Lean left | Leg forward |
| 2 | 0.25s | Mid-stride | Mid-stride | Neutral | Both mid |
| 3 | 0.25s | Back stance | Forward stride | Lean right | Other leg forward |
| 4 | 0.25s | Mid-stance | Mid-stride | Neutral | Both mid |
| 5 | 0.25s | Recovery | Forward stance | Lean left | Complete cycle |
| Repeat | - | - | - | - | - |

**Visual subtlety**:
- Silhouette style (no detailed limbs)
- Subtle bobbing (0.5-1px vertical movement per frame)
- Slight rotation/tilt per frame (±1 degree max)
- Very smooth, not jerky

**Speed variation**:
- Normal speed: Full 6-frame cycle repeats every 1.5s
- Slow (congested): Cycle takes 2.5s (60% speed)
- Very slow (high congestion): Cycle takes 3.5s (40% speed)
- Running (emergency): Cycle takes 0.8s (2x speed)

### Idle Animation

When resident stopped (waiting, eating, etc):
- Subtle standing animation
- Gentle sway (±0.5px horizontal, 0.5-1 second sway cycle)
- Occasional looking around (head/body rotation ±5 degrees, 3-second interval)
- Very subtle breathing (height variation ±0.5px, 2-second cycle)

**Frames**: Smooth interpolation, no visible frames

### Panic Animation (During Crisis)

When disaster occurs (oxygen low, cascading failure, etc):
- Standing still but body shaking
- Shake: ±1px random offset every 10ms
- Occasional jump (↑5px, 100ms up-down, every 0.5-1 second)
- Color shift: Slight desaturation then brightening (pulse every 0.3s)

**Sound effect** (audio): Muffled distress sound plays

## System Health Visual States

### Oxygen System Graphics

**Healthy (100%-50% health)**:
- Scrubber chamber: Bright cyan glow (0 0 15px)
- Interior: Normal lighting
- Indicator light: Steady green
- Animation: Gentle pulse (10% brightness swing, 2-second cycle)

**Degraded (50%-20% health)**:
- Scrubber chamber: Amber glow (0 0 12px)
- Interior: Slightly dimmer (90% brightness)
- Indicator light: Amber, pulsing (1-second cycle)
- Animation: Visible flickering (95% brightness every 0.5s)

**Critical (20%-0% health)**:
- Scrubber chamber: Orange/red glow (0 0 20px intense)
- Interior: Dim (70% brightness)
- Indicator light: Red, fast pulsing (0.5-second cycle)
- Animation: Intense flicker (80% brightness every 0.2s)

**Failed (0% health)**:
- Scrubber chamber: Magenta glow, very intense (0 0 25px)
- Interior: Dark (50% brightness)
- Indicator light: None (off)
- Animation: Chaotic pulsing (40-100% brightness randomly)

### Power System Graphics

**Healthy**:
- Generator core: Blue glow (0 0 15px)
- Power lines: Subtle glow
- Interior: Bright (150% base brightness)

**Degraded**:
- Generator: Dimmer blue glow
- Power lines: Flickering (70% opacity every 0.5s)
- Interior: Slightly dim (120% brightness)
- Slight hum visible (particles?)

**Critical**:
- Generator: Orange glow (0 0 15px)
- Power lines: Visible sparks (particle effect, orange sparks every 0.3s)
- Interior: Very dim (80% brightness)

**Failed (Blackout)**:
- Generator: Dark, no glow
- Power lines: No glow
- Building exterior: Emergency red lighting
- All interior lights cut out except emergency lighting (red/amber glow only)
- Slight shaking (1-2px jitter every frame) gives sense of destabilization

### Water System Graphics

**Healthy**:
- Pipes: Clear blue glow (0 0 10px)
- Water tanks: Visible water level (bright blue interior)

**Degraded**:
- Pipes: Amber glow, diminished
- Water tanks: Visible water level drops (interior brightness reduced)
- Slight leak effect: Small particles falling

**Critical**:
- Pipes: Orange glow, flickering
- Water tanks: Very low water level
- Leak effect: Visible water dripping (particles)

**Failed (Contaminated)**:
- Pipes: Red glow (0 0 15px)
- Water tanks: Red-tinted interior (contamination visible)
- Leak effect: Red particles instead of blue

### Food System Graphics

**Healthy**:
- Farms: Green grow-lights bright (0 0 15px)
- Crops: Visible growth animation (slow sway, green glow)
- Kitchen: Warm white lights bright

**Degraded**:
- Farms: Green lights dimmer, amber tint
- Crops: Less vibrant, slower growth animation
- Kitchen: Dim warm white lights

**Critical**:
- Farms: Dim lights, wilting crops (drooping animation)
- Crops: Orange/brown tint (dying)
- Kitchen: Barely lit, appears inactive

**Failed (Starvation)**:
- Farms: No lights, dark
- Crops: Brown, dead (no animation)
- Kitchen: Dark, inactive
- Emergency rations glow magenta (0 0 10px) if deployed

## Cascade Effect Animations

### Power Failure Cascade

When power system fails (health reaches 0%):

**T=0 (Immediate)**:
- Power generator goes dark instantly
- Building lights flicker (100% → 0% instantly)
- Red emergency lighting fades in (0 → 50% over 200ms)
- Sound: Blackout sound (zap/hum cut)

**T=100ms**:
- Elevators go dark (blue glow fades)
- Elevator doors close (animation)
- Stranding animation: Residents inside shown panicked (shake animation)
- Sound: Elevator alarm (beeping)

**T=200ms**:
- Oxygen backup system shows alert (switches to battery, amber glow)
- Water pump indicator goes dark
- Cascade visual: Red lines appear (UI layer) showing cascade path
- Sound: Chain of alert sounds

**T=300-500ms**:
- Affected systems glow magenta (cascade highlight)
- Pulsing effect on affected systems (0.5s pulse)
- Residents in corridors slow down (movement speed 50%)
- Panic animations begin (residents shaking)

**Recovery** (when power restored):
- Generator lights restore (blue glow fades in over 300ms)
- Building lights restore (0 → 100% brightness over 500ms, smooth)
- Elevator doors open (animation)
- Residents in elevators stop panicking (shake animation fades)
- Cascade visual fades (red lines fade out over 500ms)

### Oxygen Failure Animation

When oxygen reaches 0%:

**T=0**: 
- Oxygen scrubber goes dark
- Ambient color shift: Blue tint fades (blue overlay on entire building fades from 20% → 0% over 1 second)
- Residents' visual change: Slight desaturation, panicked expressions

**T=100-500ms**:
- Residents start moving slower (oxygen depletion affects movement)
- Color shift accelerates: Grayish tint increases (building looks unhealthy)
- Pulsing red overlay (5% red overlay, pulsing 1-second cycle)

**T=500ms+**:
- If no emergency oxygen deployed: Residents show distress (violent shaking, collapse animation)
- Color becomes sickly (yellowish/greenish tint)
- Movement nearly stops (very slow walk)

## Congestion Visual Effects

### Resident Bunching Animation

When congestion increases:

**Normal** (0-40% congestion):
- Residents spaced normally (at least 1 grid unit apart)
- Walking smoothly
- Normal size/opacity

**Moderate** (40-70% congestion):
- Residents closer together (0.5-1 grid unit apart)
- Walking slower (80% base speed)
- Slight color darkening (95% brightness)
- Occasional collision detection (slight nudging animation)

**High** (70-100% congestion):
- Residents very close (0.25 grid units apart)
- Walking very slowly (50% base speed)
- Noticeably dark (85% brightness)
- Frequent collision handling (bumping into each other)
- Color becomes muted/gray (desaturation increase)

**Overflow** (>100% congestion):
- Residents overlapping
- Crawling speed (25% base speed)
- Very dark (70% brightness)
- Heavy desaturation (very gray/pale)
- Visual stress: Frequent bouncing, shaking slightly

### Congestion Indicator Particle Effect

Optional: Small colored particles show congestion flow:
- Cyan particles for normal flow
- Amber particles for slowed flow
- Red particles for severely congested
- Particle size: 2px, spawn every 200ms along corridor
- Lifetime: 1-2 seconds
- Movement: Follows resident movement direction

Effect creates visual sense of "flow" through building.

## Crisis Visual Effects

### Cascading Failure Darkening

As cascade progresses (multiple systems failing simultaneously):

**1 system failed**:
- Ambient light: 100% (normal)
- Affected system: Magenta glow

**2 systems failed**:
- Ambient light: 95% (very slight darkening)
- Affected systems: Magenta glow with pulsing

**3+ systems failed**:
- Ambient light: 80% (noticeable darkening)
- Building appears stressed/unstable
- Affected systems: Intense magenta pulsing (0.5s cycle)
- Red alert overlay: 10% red tint (pulsing)

**Full-building emergency** (3+ major systems):
- Ambient light: 70% (dark, ominous)
- Emergency lighting: Red glow fills corridors (0 0 20px red)
- Building appears to shake (1px jitter every frame)
- Red alert overlay: 20% red tint (fast pulsing, 0.3s cycle)
- Sound: Continuous alarm wail

### Screen Shake (Optional)

When major system fails:
- Shake amount: 1-2px random offset every frame
- Duration: 500ms
- Intensity: Based on criticality (bigger shake = worse)
- Can be disabled in settings

Shake creates visceral sense of emergency.

## Agent Activity Visual Feedback

### Worker Movement Animation (Optional)

When workers redirect to emergency:
- Worker icons appear at current location
- Move along path to emergency location (smooth animation)
- Trail follows (glowing line, cyan/amber color)
- Arrival shows worker entering/engaging at emergency

**Duration**: Varies based on distance

**Sound**: Subtle "whoosh" sound

### Maintenance Visual Effects (Optional)

When system is being maintained:
- Sparks or tool effects appear around system (2-4px particles)
- System indicator pulses while being worked on
- Color: Amber/orange sparks
- Frequency: 2-3 sparks per second while repairing

When repair completes:
- Final bright flash (white, 100ms)
- Success chime sound
- System returns to normal glow

## Animation Performance Optimization

### Low-End Device Mode

Disable expensive animations:
- No particle effects (sparks, water drops)
- No screen shake
- No excess glow effects
- Simplified resident walking (2 frames instead of 6)
- Simpler cascade visualization (no lines)

### High-End Device Mode

Add extra polish:
- Multiple particle layers
- Enhanced glow effects (more blur)
- Screen shake with camera rotation
- Extra animation frames
- Advanced cascade visualization

## Definition of Done

This specification is complete when:
- [ ] Building placement animations specified (success/failure timings)
- [ ] Resident walking animations specified (frame counts, cycles)
- [ ] System health visual states specified (all 4 states for each system)
- [ ] Cascade effect animations specified (timing, visual progression)
- [ ] Congestion visual effects specified (bunching, darkening)
- [ ] Crisis visual effects specified (darkening, shaking, overlays)
- [ ] Color palettes specified for all effects
- [ ] Animation timing and easing specified
- [ ] Particle effects specified (types, frequency, duration)
- [ ] Performance optimization guidelines specified

## Next Steps (Graphics Implementation)

1. Implement building placement animations (satisfying feedback)
2. Create walking animation frames (smooth movement)
3. Implement system glow/lighting effects (health visualization)
4. Add cascade animation sequence (visual progression)
5. Implement congestion visual bunching (space-based, speed-based)
6. Add crisis lighting effects (darkening, emergency lighting)
7. Optional: Add particle effects (sparks, water, workers)
8. Performance testing (ensure smooth at all game speeds)
