import { Building } from '../entities/Building';
import { Room } from '../entities/Room';

/**
 * Congestion metrics for a space
 */
export interface CongestionMetrics {
  roomId: string;
  congestionLevel: number; // 0-100 (or higher for overcrowding)
  residentsCount: number;
  capacity: number;
  speedPenalty: number; // 0.2-1.0, multiplier for movement speed
}

export class CongestionSystem {
  private building: Building;
  private congestionMetrics: Map<string, CongestionMetrics> = new Map();

  // Space capacity definitions (residents per unit width)
  private readonly CAPACITY_PER_UNIT = {
    lobby: 0.5, // Lobbies can hold 0.5 residents per unit width (20 units = ~10 residents comfortable)
    corridor: 0.4,
    stairwell: 0.3,
    default: 0.5,
  };

  constructor(building: Building) {
    this.building = building;
  }

  /**
   * Calculate congestion for all rooms
   * Should be called periodically (e.g., every update or once per game hour)
   */
  calculateCongestion(): void {
    const allRooms = this.building.getAllRooms();

    for (const room of allRooms) {
      const residents = room.getResidents();
      const workers = room.getWorkerCount?.() ?? 0;
      const totalOccupants = residents.length + workers;

      const metrics = this.calculateRoomCongestion(room, totalOccupants);
      this.congestionMetrics.set(room.id, metrics);
    }
  }

  /**
   * Calculate congestion metrics for a specific room
   */
  private calculateRoomCongestion(room: Room, occupants: number): CongestionMetrics {
    const capacity = this.calculateRoomCapacity(room);
    const congestionLevel = capacity > 0 ? (occupants / capacity) * 100 : 0;

    // Speed penalty based on congestion
    // 0-20% congestion: 1.0 speed
    // 20-40% congestion: 0.85 speed
    // 40-60% congestion: 0.7 speed
    // 60-80% congestion: 0.5 speed
    // 80-100% congestion: 0.3 speed
    // 100%+ congestion: 0.2 speed (emergency)
    const speedPenalty = this.calculateSpeedPenalty(congestionLevel);

    return {
      roomId: room.id,
      congestionLevel: Math.min(congestionLevel, 200), // Cap display at 200%
      residentsCount: occupants,
      capacity,
      speedPenalty,
    };
  }

  /**
   * Calculate capacity for a room based on its type and dimensions
   */
  private calculateRoomCapacity(room: Room): number {
    const capacityPerUnit = this.getCapacityPerUnit(room.type);
    return Math.ceil(room.width * capacityPerUnit);
  }

  /**
   * Get capacity per unit for a room type
   */
  private getCapacityPerUnit(roomType: string): number {
    return (this.CAPACITY_PER_UNIT as Record<string, number>)[roomType] ??
           this.CAPACITY_PER_UNIT.default;
  }

  /**
   * Calculate speed penalty (0.2-1.0) based on congestion level
   */
  private calculateSpeedPenalty(congestionLevel: number): number {
    if (congestionLevel <= 20) {
      return 1.0; // No penalty
    } else if (congestionLevel <= 40) {
      return 0.85;
    } else if (congestionLevel <= 60) {
      return 0.7;
    } else if (congestionLevel <= 80) {
      return 0.5;
    } else if (congestionLevel <= 100) {
      return 0.3;
    } else {
      return 0.2; // Emergency overcrowding
    }
  }

  /**
   * Get congestion metrics for a specific room
   */
  getCongestion(roomId: string): CongestionMetrics | undefined {
    return this.congestionMetrics.get(roomId);
  }

  /**
   * Get congestion level (0-100+) for a room
   */
  getCongestionLevel(roomId: string): number {
    return this.getCongestion(roomId)?.congestionLevel ?? 0;
  }

  /**
   * Get speed penalty for movement through a room
   */
  getSpeedPenalty(roomId: string): number {
    return this.getCongestion(roomId)?.speedPenalty ?? 1.0;
  }

  /**
   * Get average congestion across all lobbies
   */
  getAverageLobbysCongestion(): number {
    const lobbies = this.building.getAllRooms().filter(r => r.type === 'lobby');
    if (lobbies.length === 0) return 0;

    let totalCongestion = 0;
    for (const lobby of lobbies) {
      const metrics = this.congestionMetrics.get(lobby.id);
      if (metrics) {
        totalCongestion += metrics.congestionLevel;
      }
    }

    return totalCongestion / lobbies.length;
  }

  /**
   * Get peak congestion time (most congested room)
   */
  getPeakCongestion(): number {
    let maxCongestion = 0;
    for (const metrics of this.congestionMetrics.values()) {
      if (metrics.congestionLevel > maxCongestion) {
        maxCongestion = metrics.congestionLevel;
      }
    }
    return maxCongestion;
  }

  /**
   * Get list of most congested rooms (for debugging/UI)
   */
  getMostCongestedRooms(count: number = 5): CongestionMetrics[] {
    const sorted = Array.from(this.congestionMetrics.values()).sort(
      (a, b) => b.congestionLevel - a.congestionLevel
    );
    return sorted.slice(0, count);
  }

  /**
   * Check if a room is significantly congested (>50%)
   */
  isCongested(roomId: string): boolean {
    const level = this.getCongestionLevel(roomId);
    return level > 50;
  }

  /**
   * Check if a room is overcrowded (>100%)
   */
  isOvercrowded(roomId: string): boolean {
    const level = this.getCongestionLevel(roomId);
    return level > 100;
  }
}
