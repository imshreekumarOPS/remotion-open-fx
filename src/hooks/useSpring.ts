import { useCurrentFrame, useVideoConfig } from 'remotion';
import { springValue } from '../utils/interpolate';

export interface SpringConfig {
    damping?: number;
    stiffness?: number;
    mass?: number;
}

/**
 * Physics-based spring hook. Returns a value that starts at 0 and
 * springs to 1, or between any two values.
 *
 * Presets:
 *   - Gentle:  { damping: 14, stiffness: 100 }
 *   - Wobbly:  { damping: 8,  stiffness: 180 }
 *   - Stiff:   { damping: 20, stiffness: 250 }
 *   - Slow:    { damping: 20, stiffness: 50  }
 *
 * @example
 * const scale = useSpring({ from: 0.8, to: 1, stiffness: 200, damping: 15 });
 */
export const useSpring = ({
    from = 0,
    to = 1,
    damping = 10,
    stiffness = 100,
    mass = 1,
    startFrame = 0,
}: {
    from?: number;
    to?: number;
    startFrame?: number;
} & SpringConfig): number => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const adjustedFrame = Math.max(0, frame - startFrame);

    return springValue({
        frame: adjustedFrame,
        from,
        to,
        damping,
        stiffness,
        mass,
        fps,
    });
};

// Preset spring configs
export const SpringPresets = {
    gentle: { damping: 14, stiffness: 100 },
    wobbly: { damping: 8, stiffness: 180 },
    stiff: { damping: 20, stiffness: 250 },
    slow: { damping: 20, stiffness: 50 },
    bouncy: { damping: 5, stiffness: 300 },
} as const;
