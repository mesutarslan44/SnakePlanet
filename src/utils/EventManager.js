/**
 * EventManager - Handles special random events during gameplay
 * Events: Gold Rush, Feeding Frenzy, Power Hour
 */

const EVENT_TYPES = {
    GOLD_RUSH: {
        name: 'Altın Fırtınası',
        emoji: '💰',
        duration: 30000, // 30 seconds
        color: '#ffd700',
        effect: 'scoreMultiplier',
        multiplier: 2,
        description: '2x Puan Kazanıyorsun!',
    },
    FEEDING_FRENZY: {
        name: 'Yemek Cümbüşü',
        emoji: '🍖',
        duration: 25000, // 25 seconds
        color: '#ff6b6b',
        effect: 'extraFood',
        description: 'Bol Yemek Var!',
    },
    POWER_HOUR: {
        name: 'Güç Saati',
        emoji: '⚡',
        duration: 20000, // 20 seconds
        color: '#4ecdc4',
        effect: 'morePowerups',
        description: 'Güçler Yağıyor!',
    },
};

class EventManager {
    constructor() {
        this.activeEvent = null;
        this.eventTimeout = null;
        this.lastEventTime = 0;
        this.MIN_TIME_BETWEEN_EVENTS = 60000; // 1 minute minimum between events
    }

    canSpawnEvent() {
        const now = Date.now();
        return (
            !this.activeEvent &&
            now - this.lastEventTime > this.MIN_TIME_BETWEEN_EVENTS &&
            Math.random() < 0.15 // 15% chance per check
        );
    }

    startRandomEvent(onEventStart, onEventEnd) {
        if (!this.canSpawnEvent()) return null;

        const eventKeys = Object.keys(EVENT_TYPES);
        const randomKey = eventKeys[Math.floor(Math.random() * eventKeys.length)];
        const event = EVENT_TYPES[randomKey];

        this.activeEvent = {
            ...event,
            type: randomKey,
            startTime: Date.now(),
        };

        this.lastEventTime = Date.now();

        // Notify game of event start
        if (onEventStart) onEventStart(this.activeEvent);

        // Auto-end event after duration
        this.eventTimeout = setTimeout(() => {
            this.endEvent(onEventEnd);
        }, event.duration);

        return this.activeEvent;
    }

    endEvent(onEventEnd) {
        if (this.eventTimeout) {
            clearTimeout(this.eventTimeout);
            this.eventTimeout = null;
        }

        const endedEvent = this.activeEvent;
        this.activeEvent = null;

        // Notify game of event end
        if (onEventEnd && endedEvent) onEventEnd(endedEvent);
    }

    getActiveEvent() {
        return this.activeEvent;
    }

    getRemainingTime() {
        if (!this.activeEvent) return 0;
        const elapsed = Date.now() - this.activeEvent.startTime;
        return Math.max(0, this.activeEvent.duration - elapsed);
    }

    cleanup() {
        if (this.eventTimeout) {
            clearTimeout(this.eventTimeout);
            this.eventTimeout = null;
        }
        this.activeEvent = null;
    }
}

export default EventManager;
export { EVENT_TYPES };
