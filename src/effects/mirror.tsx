import React from 'react';

export interface MirrorProps {
    /** Axis to mirror along. */
    axis?: 'horizontal' | 'vertical' | 'both';
    /**
     * Position of the mirror split line (0–1).
     * 0.5 = centered, 0.3 = more original visible.
     */
    position?: number;
    children?: React.ReactNode;
}

/**
 * Mirror — Reflects the video content symmetrically.
 * Creates a very satisfying visual effect by duplicating and flipping content.
 *
 * @example
 * <Mirror axis="horizontal" position={0.5}>
 *   <AbsoluteFill><YourScene /></AbsoluteFill>
 * </Mirror>
 */
export const Mirror: React.FC<MirrorProps> = ({
    axis = 'horizontal',
    position = 0.5,
    children,
}) => {
    const isHorizontal = axis === 'horizontal' || axis === 'both';
    const isVertical = axis === 'vertical' || axis === 'both';

    const mirrorTransform = (() => {
        if (axis === 'both') return 'scaleX(-1) scaleY(-1)';
        if (axis === 'horizontal') return 'scaleX(-1)';
        return 'scaleY(-1)';
    })();

    // Clip regions based on axis and position
    const originalClip = (() => {
        if (isHorizontal && !isVertical) {
            return `inset(0 ${(1 - position) * 100}% 0 0)`;
        }
        if (isVertical && !isHorizontal) {
            return `inset(0 0 ${(1 - position) * 100}% 0)`;
        }
        return `inset(0 ${(1 - position) * 100}% ${(1 - position) * 100}% 0)`;
    })();

    const mirrorClip = (() => {
        if (isHorizontal && !isVertical) {
            return `inset(0 0 0 ${position * 100}%)`;
        }
        if (isVertical && !isHorizontal) {
            return `inset(${position * 100}% 0 0 0)`;
        }
        return `inset(${position * 100}% 0 0 ${position * 100}%)`;
    })();

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            {/* Original half */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    clipPath: originalClip,
                }}
            >
                {children}
            </div>

            {/* Mirrored half */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    transform: mirrorTransform,
                    clipPath: mirrorClip,
                }}
            >
                {children}
            </div>
        </div>
    );
};
