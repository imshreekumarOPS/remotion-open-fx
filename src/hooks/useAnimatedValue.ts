import { useCurrentFrame } from 'remotion';
import { interp } from '../utils/interpolate';
import type { EasingFn } from '../utils/easing';

export interface AnimationKeyframe {
    frame: number;
    value: number;
    easing?: EasingFn;
}

/**
 * Animate a value through multiple keyframes.
 * Automatically picks the right segment based on current frame.
 *
 * @example
 * const opacity = useAnimatedValue([
 *   { frame: 0,   value: 0 },
 *   { frame: 20,  value: 1, easing: Easing.easeOutCubic },
 *   { frame: 80,  value: 1 },
 *   { frame: 100, value: 0, easing: Easing.easeInCubic },
 * ]);
 */
export const useAnimatedValue = (keyframes: AnimationKeyframe[]): number => {
    const frame = useCurrentFrame();
    const sorted = [...keyframes].sort((a, b) => a.frame - b.frame);

    if (frame <= sorted[0].frame) return sorted[0].value;
    if (frame >= sorted[sorted.length - 1].frame)
        return sorted[sorted.length - 1].value;

    for (let i = 0; i < sorted.length - 1; i++) {
        const from = sorted[i];
        const to = sorted[i + 1];
        if (frame >= from.frame && frame <= to.frame) {
            return interp(frame, [from.frame, to.frame], [from.value, to.value], {
                easing: to.easing,
            });
        }
    }
    return sorted[sorted.length - 1].value;
};
