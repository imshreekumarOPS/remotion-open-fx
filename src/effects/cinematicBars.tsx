import React from 'react';
import { useCurrentFrame } from 'remotion';
import { interp } from '../utils/interpolate';
import { easeInOutCubic } from '../utils/easing';
import type { EasingFn } from '../utils/easing';

export interface CinematicBarsProps {
    /** Aspect ratio for the letterbox bars. */
    ratio?: '2.35:1' | '2.39:1' | '1.85:1' | '21:9';
    /** Whether the bars animate in/out. */
    animated?: boolean;
    /** Frame when bars start entering. */
    enterFrame?: number;
    /** Duration (in frames) for the enter animation. */
    enterDuration?: number;
    /** Frame when bars start exiting (null = stay forever). */
    exitFrame?: number | null;
    /** Duration (in frames) for the exit animation. */
    exitDuration?: number;
    /** Easing function for bar animation. */
    easing?: EasingFn;
    /** Bar color. */
    color?: string;
}

const BAR_SIZES: Record<string, number> = {
    '2.35:1': 6.25,
    '2.39:1': 5.35,
    '1.85:1': 2.7,
    '21:9': 7.4,
};

/**
 * Cinematic Bars — Animated letterbox bars that slide in/out for a
 * movie-like cinematic feel.
 *
 * @example
 * <AbsoluteFill>
 *   <YourScene />
 *   <CinematicBars ratio="2.35:1" animated enterFrame={0} enterDuration={30} />
 * </AbsoluteFill>
 */
export const CinematicBars: React.FC<CinematicBarsProps> = ({
    ratio = '2.35:1',
    animated = true,
    enterFrame = 0,
    enterDuration = 25,
    exitFrame = null,
    exitDuration = 25,
    easing = easeInOutCubic,
    color = 'black',
}) => {
    const frame = useCurrentFrame();
    const targetSize = BAR_SIZES[ratio] ?? 6.25;

    let barProgress = 1;

    if (animated) {
        // Enter animation
        const enterP = interp(
            frame,
            [enterFrame, enterFrame + enterDuration],
            [0, 1],
            { easing },
        );
        barProgress = enterP;

        // Exit animation (if configured)
        if (exitFrame !== null) {
            const exitP = interp(
                frame,
                [exitFrame, exitFrame + exitDuration],
                [1, 0],
                { easing },
            );
            barProgress = Math.min(barProgress, exitP);
        }
    }

    const size = targetSize * barProgress;

    return (
        <>
            {/* Top bar */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: `${size}%`,
                    backgroundColor: color,
                    pointerEvents: 'none',
                    zIndex: 100,
                }}
            />
            {/* Bottom bar */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${size}%`,
                    backgroundColor: color,
                    pointerEvents: 'none',
                    zIndex: 100,
                }}
            />
        </>
    );
};
