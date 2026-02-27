import { useCurrentFrame } from 'remotion';
import { progress } from '../utils/interpolate';
import type { EasingFn } from '../utils/easing';

export type TimelineEvent<T extends string = string> = {
    id: T;
    startFrame: number;
    durationFrames: number;
    easing?: EasingFn;
};

export type TimelineState<T extends string> = {
    [K in T]: {
        progress: number; // 0→1 during event
        isActive: boolean; // true while event is running
        hasStarted: boolean; // true after event begins
        hasEnded: boolean; // true after event ends
    };
};

/**
 * Declarative timeline — define named events and get their progress.
 * Perfect for orchestrating complex multi-element scenes.
 *
 * @example
 * const tl = useTimeline([
 *   { id: 'titleIn',    startFrame: 0,  durationFrames: 30 },
 *   { id: 'subtitleIn', startFrame: 20, durationFrames: 25, easing: Easing.easeOutBack },
 *   { id: 'fadeAll',    startFrame: 80, durationFrames: 15 },
 * ]);
 *
 * <h1 style={{ opacity: tl.titleIn.progress }} />
 * <p  style={{ opacity: tl.subtitleIn.progress }} />
 */
export const useTimeline = <T extends string>(
    events: TimelineEvent<T>[],
): TimelineState<T> => {
    const frame = useCurrentFrame();

    return events.reduce(
        (acc, event) => {
            const p = progress(
                frame,
                event.startFrame,
                event.durationFrames,
                event.easing,
            );
            const hasStarted = frame >= event.startFrame;
            const hasEnded = frame >= event.startFrame + event.durationFrames;

            acc[event.id as T] = {
                progress: p,
                isActive: hasStarted && !hasEnded,
                hasStarted,
                hasEnded,
            };
            return acc;
        },
        {} as TimelineState<T>,
    );
};
