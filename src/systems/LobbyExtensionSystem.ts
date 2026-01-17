import { Building } from '../entities/Building';
import { Room } from '../entities/Room';
import { EconomySystem } from './EconomySystem';
import { CongestionSystem } from './CongestionSystem';

/**
 * Lobby extension tracking
 */
export interface LobbyExtensionRecord {
  timestamp: number; // When was this extension applied
  widthBefore: number;
  widthAfter: number;
  cost: number;
  reason?: string;
}

export class LobbyExtensionSystem {
  private building: Building;
  private economySystem: EconomySystem;
  private congestionSystem: CongestionSystem;
  
  private extensionHistory: LobbyExtensionRecord[] = [];
  
  // Lobby extension settings
  private readonly BASE_LOBBY_WIDTH = 20;
  private readonly MAX_LOBBY_WIDTH = 60;
  private readonly MIN_LOBBY_WIDTH = 10;
  private readonly COST_PER_UNIT = 100; // $100 per unit of width added
  
  constructor(
    building: Building,
    economySystem: EconomySystem,
    congestionSystem: CongestionSystem
  ) {
    this.building = building;
    this.economySystem = economySystem;
    this.congestionSystem = congestionSystem;
  }

  /**
   * Get the current lobby room
   */
  getLobby(): Room | null {
    const lobbies = this.building.getAllRooms().filter(r => r.type === 'lobby');
    return lobbies.length > 0 ? lobbies[0] : null;
  }

  /**
   * Get current lobby width in grid units
   */
  getCurrentLobbyWidth(): number {
    const lobby = this.getLobby();
    return lobby?.width ?? this.BASE_LOBBY_WIDTH;
  }

  /**
   * Calculate cost to extend lobby by a certain number of units
   * @param units Number of grid units to extend
   * @returns Cost in credits
   */
  calculateExtensionCost(units: number): number {
    return units * this.COST_PER_UNIT;
  }

  /**
   * Check if extension is affordable
   * @param units Number of units to extend
   * @returns true if player has enough credits
   */
  canAffordExtension(units: number): boolean {
    const cost = this.calculateExtensionCost(units);
    return this.economySystem.canAfford(cost);
  }

  /**
   * Check if extension would exceed maximum width
   * @param units Number of units to extend
   * @returns true if resulting width would be valid
   */
  canExtend(units: number): boolean {
    const currentWidth = this.getCurrentLobbyWidth();
    const newWidth = currentWidth + units;
    
    return newWidth <= this.MAX_LOBBY_WIDTH && newWidth >= this.MIN_LOBBY_WIDTH;
  }

  /**
   * Extend the lobby by a specified number of units
   * @param units Number of units to extend
   * @param reason Optional reason for extension (for logging)
   * @returns true if extension was successful
   */
  extendLobby(units: number, reason?: string): boolean {
    // Validate extension is possible
    if (!this.canExtend(units)) {
      console.warn(`Cannot extend lobby by ${units} units - would exceed limits`);
      return false;
    }

    const cost = this.calculateExtensionCost(units);
    if (!this.canAffordExtension(units)) {
      console.warn(`Cannot afford lobby extension: ${cost} CR (have ${this.economySystem.getMoney()})`);
      return false;
    }

    const lobby = this.getLobby();
    if (!lobby) {
      console.warn('No lobby found - cannot extend');
      return false;
    }

    // Deduct cost
    if (!this.economySystem.spend(cost)) {
      console.warn('Failed to deduct extension cost');
      return false;
    }

    const widthBefore = lobby.width;
    const widthAfter = widthBefore + units;

    // Record extension
    const record: LobbyExtensionRecord = {
      timestamp: Date.now(),
      widthBefore,
      widthAfter,
      cost,
      reason,
    };
    this.extensionHistory.push(record);

    // Update lobby width (hack: directly modify readonly property for now)
    // In a full implementation, we'd have a setWidth() method on Room
    (lobby as any).width = widthAfter;

    // Redraw lobby with new width
    (lobby as any).draw?.();

    // Recalculate congestion immediately
    this.congestionSystem.calculateCongestion();

    console.log(
      `Lobby extended from ${widthBefore}→${widthAfter} units, cost: ${cost} CR`
    );

    return true;
  }

  /**
   * Shrink the lobby (demolish extension)
   * @param units Number of units to shrink
   * @returns Refund amount (50% of extension cost)
   */
  shrinkLobby(units: number): number {
    const lobby = this.getLobby();
    if (!lobby) return 0;

    const currentWidth = lobby.width;
    const minWidth = Math.max(this.MIN_LOBBY_WIDTH, currentWidth - units);
    const actualShrink = currentWidth - minWidth;

    if (actualShrink <= 0) {
      console.warn('Cannot shrink lobby below minimum width');
      return 0;
    }

    // Find the original cost for this extension
    let originalCost = 0;
    for (let i = this.extensionHistory.length - 1; i >= 0; i--) {
      const record = this.extensionHistory[i];
      if (record.widthAfter === currentWidth) {
        originalCost = record.cost;
        break;
      }
    }

    // Calculate refund (50% of original cost)
    const refund = Math.floor((originalCost * actualShrink / (currentWidth - minWidth)) * 0.5);

    // Update lobby width
    (lobby as any).width = minWidth;
    (lobby as any).draw?.();

    // Recalculate congestion
    this.congestionSystem.calculateCongestion();

    // Give refund
    this.economySystem.earn(refund);

    console.log(
      `Lobby shrunk from ${currentWidth}→${minWidth} units, refund: ${refund} CR`
    );

    return refund;
  }

  /**
   * Get extension history
   */
  getExtensionHistory(): LobbyExtensionRecord[] {
    return [...this.extensionHistory];
  }

  /**
   * Get total amount spent on lobby extensions
   */
  getTotalExtensionCost(): number {
    return this.extensionHistory.reduce((sum, record) => sum + record.cost, 0);
  }

  /**
   * Get lobby width statistics for UI
   */
  getLobbyStats(): {
    currentWidth: number;
    minWidth: number;
    maxWidth: number;
    totalExtensions: number;
    totalSpent: number;
  } {
    return {
      currentWidth: this.getCurrentLobbyWidth(),
      minWidth: this.MIN_LOBBY_WIDTH,
      maxWidth: this.MAX_LOBBY_WIDTH,
      totalExtensions: this.extensionHistory.length,
      totalSpent: this.getTotalExtensionCost(),
    };
  }

  /**
   * Estimate congestion improvement from an extension
   * @param units Units to extend
   * @returns Estimated congestion reduction percentage
   */
  estimateCongestionImprovement(units: number): number {
    const currentWidth = this.getCurrentLobbyWidth();
    
    // Congestion is inversely proportional to space
    // If we increase space by X%, congestion decreases by approximately X%
    const improvement = (units / currentWidth) * 100;
    return Math.min(improvement, 50); // Cap at 50% improvement
  }
}
