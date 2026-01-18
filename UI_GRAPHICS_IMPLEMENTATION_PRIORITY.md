# UI/Graphics Implementation Priority

**🔴 CRITICAL**: UI/Graphics is NOT a polish phase. It's core to game feel and player understanding.

**Principle**: Implement UI/Graphics **alongside** each mechanic, not after.

---

## Why It's Critical

Without visual feedback:
- ❌ Building placement feels abstract (no "snap" confirmation)
- ❌ System health is invisible (players don't know systems degrading)
- ❌ Cascades are confusing (why did something else fail?)
- ❌ Congestion is invisible (why are residents moving slow?)
- ❌ Crises have no urgency (red overlay + alert is the tension)

With visual feedback:
- ✅ Building placement feels satisfying (glow + grow + settle = 750ms)
- ✅ System health is obvious (cyan → amber → orange → magenta progression)
- ✅ Cascades are visible (red lines show path, affected systems glow)
- ✅ Congestion is clear (residents bunched, moving slow, darker corridor)
- ✅ Crises feel urgent (red overlay, flashing, screen shake, alert)

---

## Implementation Order

### Phase 1A: Core Mechanics (Movement)
**Specs**: RESIDENT_MOVEMENT.md, CONGESTION_MECHANICS.md, LOBBY_EXTENSION.md

**Phase 1B: UI/Graphics for Phase 1**
**Specs**: UI_VISUAL_FEEDBACK.md (building animations, congestion UI), GRAPHICS_ANIMATION_ENHANCEMENTS.md (walking, bunching)

**Deliverable**: Residents walk, congestion visible, building placement feels responsive

---

### Phase 2A: Core Mechanics (Maintenance & Crises)
**Specs**: MAINTENANCE_SYSTEM.md, FAILURE_CASCADES.md, OXYGEN_SYSTEM.md, POWER_SYSTEM.md, etc.

**Phase 2B: UI/Graphics for Phase 2**
**Specs**: UI_VISUAL_FEEDBACK.md (health indicators, cascade alerts), GRAPHICS_ANIMATION_ENHANCEMENTS.md (system glows, cascade effects, emergency lighting)

**Deliverable**: System health visible, failures dramatic, cascades understandable

---

### Phase 3A: Core Mechanics (Agents)
**Specs**: AGENT_SYSTEM.md, AGENT_EMERGENCE.md, INFRASTRUCTURE_AGENTS.md

**Phase 3B: UI/Graphics for Phase 3**
**Specs**: UI_VISUAL_FEEDBACK.md (agent activity displays), GRAPHICS_ANIMATION_ENHANCEMENTS.md (worker animations, particle effects)

**Deliverable**: Agent activity visible, workers feel real

---

### Phase 4-5: Economy, Residents, Stories
Similar pattern: Core mechanics → UI/Graphics polish

---

## Critical UI/Graphics Specs

### UI_VISUAL_FEEDBACK.md
**Read this first for**:
- Building placement animations (success/failure)
- System health indicators with visual progression
- Crisis notification system
- Cascade visualization
- Congestion feedback

**Implementation checklist**:
- [ ] Building placement success animation (750ms)
- [ ] Building placement failure animation (500ms)
- [ ] System health bar 4-state progression
- [ ] Real-time system status bar (top UI)
- [ ] Cascade alert UI (showing affected systems)
- [ ] Crisis notification stack (auto-dismiss)
- [ ] Full-screen emergency modal (multi-system failure)

---

### GRAPHICS_ANIMATION_ENHANCEMENTS.md
**Read this for**:
- Exact animation timings and frame specs
- System-specific visual states (glow colors, brightness)
- Particle effects (sparks, water, emergency lighting)
- Screen shake and darkening effects
- Resident animation frame counts

**Implementation checklist**:
- [ ] Building placement visual sequence (scale/opacity progression)
- [ ] 6-frame resident walking cycle (1.5s full rotation)
- [ ] System glow effects (4 colors: cyan → amber → orange → magenta)
- [ ] Cascade effect sequence (blackout → red emergency lighting)
- [ ] Congestion bunching (resident spacing, speed reduction, darkening)
- [ ] Crisis darkening (ambient light reduction, 70% during emergency)
- [ ] Screen shake (1-2px jitter during major failures)

---

## Linking Mechanics to UI/Graphics

| Mechanic | UI Feedback | Graphics Effect |
|----------|---|---|
| Building placement | Success glow, failure shake | Scale grow, cyan glow |
| System degradation | Color bar progress | Glow intensity increase |
| System failure | Magenta alert, red bar | Magenta intense glow, darkness |
| Cascade | Red lines, affected systems highlight | System-specific glows, emergency red lighting |
| Congestion | Bunching, slowdown, darkening | Closer resident spacing, reduced movement speed |
| Crisis (multi-system) | Full-screen modal, alert stack | Ambient darkening (70%), red overlay, screen shake |
| Agent redirect | Worker count update | Animation of workers moving |

---

## Visual Feedback Creates Understanding

### Without Graphics Spec
```
System fails
→ (nothing visible)
→ Player confused
→ Cascades seem random
→ Game feels broken
```

### With Graphics Spec
```
System degraded (amber glow)
→ Player notices warning
→ System fails (magenta glow, alert)
→ Related systems glow magenta (cascades visible)
→ Player understands cause-and-effect
→ Game feels intelligent
```

---

## File References

**UI Spec**: `/specs/UI_VISUAL_FEEDBACK.md` (L1-400)
**Graphics Spec**: `/specs/GRAPHICS_ANIMATION_ENHANCEMENTS.md` (L1-500)
**Priority Guide**: This file
**Specification Guide**: `PROMPT_spec.md` (updated with UI/Graphics principle)
**Implementation Roadmap**: `JTBD_TO_SPECS_MAPPING.md` (updated with UI/Graphics phases)

---

## Testing UI/Graphics Specs

### For UI_VISUAL_FEEDBACK.md
- [ ] Building placement: 750ms success, 500ms failure
- [ ] Health bar colors match spec (cyan → amber → orange → magenta)
- [ ] Cascade alerts appear with correct system names
- [ ] Crisis modal appears when 3+ systems down
- [ ] Notifications auto-dismiss after 8 seconds
- [ ] All animations tested at 1x, 2x, 4x game speeds

### For GRAPHICS_ANIMATION_ENHANCEMENTS.md
- [ ] Resident walking animation smooth (6 frames, 1.5s cycle)
- [ ] System glows match specified colors and intensity
- [ ] Cascade visual sequence matches timing spec
- [ ] Emergency lighting appears instantly on power failure
- [ ] Congestion bunching is visually apparent (residents closer)
- [ ] Screen shake feels impactful but not distracting

---

## Summary

**UI/Graphics is not polish. It's essential for game communication.**

Implement building animation, health indicators, cascade visuals, and crisis UI **at the same time as mechanics**, not after.

Refer to **UI_VISUAL_FEEDBACK.md** and **GRAPHICS_ANIMATION_ENHANCEMENTS.md** during every mechanic implementation.

Every mechanic needs:
1. **UI feedback** (indicators, alerts, notifications)
2. **Graphics feedback** (colors, glows, animations, effects)
3. **Sound feedback** (chimes, alarms, whooshes)

Together, these create a **responsive, understandable, satisfying game**.
