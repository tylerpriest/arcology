# Phase 4 Specifications Complete: Economy & Expansion

**Date**: January 18, 2026
**Status**: ✅ Phase Complete

## Summary
Phase 4 expands the game from a single tower management sim into a strategic city-builder. It introduces spatial planning (Zoning), physical growth (Map Expansion), and high-stakes economic tools (Bankruptcy, Loans, Investments).

---

## Specifications Created

### 1. ZONING_DISTRICTS.md ✅
**Purpose**: Allows players to designate regions for specific uses, enforcing organization and granting efficiency bonuses.
**Key Concepts**:
- Painting zones (Residential, Commercial, Industrial, Agricultural)
- "Unzoned" flexibility vs. "Zoned" efficiency
- Zone bonuses (10% production boost)
- Non-conforming use penalties
- Visual overlay system

### 2. MAP_EXPANSION.md ✅
**Purpose**: Enables horizontal growth by purchasing adjacent land plots.
**Key Concepts**:
- Progressive expansion (Start small -> Buy left/right)
- Increasing costs for new territory
- Camera and grid dynamic resizing
- Visual distinction of owned vs. unowned land

### 3. BANKRUPTCY_MECHANICS.md ✅
**Purpose**: Creates a fail state that is forgiving but firm.
**Key Concepts**:
- Grace period (7 days) instead of instant game over
- Warning UI when balance < 0
- Construction halted during debt
- Game Over if debt persists past timer

### 4. INVESTMENT_STRATEGY.md ✅
**Purpose**: Provides financial levers for advanced players.
**Key Concepts**:
- Loans: Cash now for interest later (Risk/Reward)
- Marketing: Pay cash to boost resident demand (Growth acceleration)
- Simple "Bank" interface

---

## How This Fits the Vision
Phase 4 transforms the "Ant Farm" into a "Empire Builder". It forces players to think beyond the next module and plan the layout of the entire arcology.
