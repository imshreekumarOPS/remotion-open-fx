import { useCurrentFrame } from 'remotion';
import { stagger } from '../utils/interpolate';
import type { EasingFn } from '../utils/easing';
import { easeOutCubic } from '../utils/easing';

/**
 * Hook that returns per-item progress values for staggered list animations.
 *
 * @example
 * const items = ['A', 'B', 'C', 'D'];
 * const progresses = useStagger({ count: items.length, durationFrames: 20, delayPerItem: 5 });
 * return (
 *   <div>
 *     {items.map((item, i) => (
 *       <div style={{ opacity: progresses[i], transform: `translateY(${(1 - progresses[i]) * 30}px)` }}>
 *         {item}
 *       </div>
 *     ))}
 *   </div>
 * );
 */
export const useStagger = ({
    count,
    durationFrames = 20,
    delayPerItem = 5,
    startFrame = 0,
    easing = easeOutCubic,
    direction = 'forward',
}: {
    count: number;
    durationFrames?: number;
    delayPerItem?: number;
    startFrame?: number;
    easing?: EasingFn;
    direction?: 'forward' | 'reverse' | 'center-out' | 'random';
}): number[] => {
    const frame = useCurrentFrame();
    const adjustedFrame = frame - startFrame;

    const indices = Array.from({ length: count }, (_, i) => {
        if (direction === 'reverse') return count - 1 - i;
        if (direction === 'center-out') {
            const center = (count - 1) / 2;
            return Math.round(
                center + (i % 2 === 0 ? -1 : 1) * Math.ceil(i / 2),
            );
        }
        return i;
    });

    return indices.map((idx) =>
        stagger({
            frame: adjustedFrame,
            index: idx,
            count,
            durationFrames,
            delayPerItem,
            easing,
        }),
    );
};
