import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { clamp } from '../utils/math';

export interface SpeedSegment {
    /** Frame where this speed segment starts. */
    startFrame: number;
    /** Frame where this speed segment ends. */
    endFrame: number;
    /** Speed multiplier: 0.25 = quarter speed, 2 = double speed. */
    speed: number;
}

export interface SpeedRampProps {
    /**
     * Array of speed segments defining speed changes over time.
     * Frames not covered by a segment default to 1x speed.
     */
    segments: SpeedSegment[];
    children: (virtualFrame: number) => React.ReactNode;
}

/**
 * Computes a virtual (remapped) frame number based on speed segments.
 * For frames between segments or outside, speed is 1x.
 */
const computeVirtualFrame = (
    currentFrame: number,
    segments: SpeedSegment[],
): number => {
    // Sort segments by start frame
    const sorted = [...segments].sort((a, b) => a.startFrame - b.startFrame);

    let virtualFrame = 0;
    let lastProcessedFrame = 0;

    for (const seg of sorted) {
        if (currentFrame <= lastProcessedFrame) break;

        // Gap before this segment (speed = 1x)
        if (seg.startFrame > lastProcessedFrame) {
            const gapEnd = Math.min(seg.startFrame, currentFrame);
            virtualFrame += gapEnd - lastProcessedFrame;
            lastProcessedFrame = gapEnd;
        }

        if (currentFrame <= lastProcessedFrame) break;

        // Within this segment
        const segEnd = Math.min(seg.endFrame, currentFrame);
        const segFrames = segEnd - seg.startFrame;
        virtualFrame += segFrames * seg.speed;
        lastProcessedFrame = segEnd;
    }

    // After all segments (speed = 1x)
    if (currentFrame > lastProcessedFrame) {
        virtualFrame += currentFrame - lastProcessedFrame;
    }

    return virtualFrame;
};

/**
 * useSpeedRamp — Hook that returns a virtual frame number remapped
 * through speed segments. Use this to drive animations with speed ramps.
 *
 * @example
 * const virtualFrame = useSpeedRamp([
 *   { startFrame: 30, endFrame: 60, speed: 0.3 },  // slow-mo
 *   { startFrame: 60, endFrame: 75, speed: 2 },     // speed up
 * ]);
 */
export const useSpeedRamp = (segments: SpeedSegment[]): number => {
    const frame = useCurrentFrame();
    return useMemo(
        () => computeVirtualFrame(frame, segments),
        [frame, segments],
    );
};

/**
 * SpeedRamp — Wrapper component for dramatic speed changes.
 * Uses render props to pass the virtual (speed-ramped) frame number.
 *
 * @example
 * <SpeedRamp segments={[
 *   { startFrame: 30, endFrame: 60, speed: 0.25 },  // slow-mo section
 *   { startFrame: 60, endFrame: 70, speed: 3 },     // snap back
 * ]}>
 *   {(virtualFrame) => <YourAnimatedScene frame={virtualFrame} />}
 * </SpeedRamp>
 */
export const SpeedRamp: React.FC<SpeedRampProps> = ({
    segments,
    children,
}) => {
    const virtualFrame = useSpeedRamp(segments);
    return <>{children(virtualFrame)}</>;
};
