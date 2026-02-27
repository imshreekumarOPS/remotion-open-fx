import React from 'react';
import { useCurrentFrame } from 'remotion';
import { interp } from '../utils/interpolate';
import { easeOutCubic, easeOutBack, easeInCubic } from '../utils/easing';

export interface LowerThirdProps {
    name: string;
    title?: string;
    startFrame?: number;
    exitFrame?: number;
    durationFrames?: number;
    accentColor?: string;
    style?: React.CSSProperties;
}

/**
 * Classic broadcast-style lower third.
 * Slides in from the left with a colored accent bar.
 *
 * @example
 * <LowerThird name="John Doe" title="CEO, Acme Corp" startFrame={30} exitFrame={150} />
 */
export const LowerThird: React.FC<LowerThirdProps> = ({
    name,
    title,
    startFrame = 0,
    exitFrame,
    durationFrames = 25,
    accentColor = '#FF6B6B',
    style,
}) => {
    const frame = useCurrentFrame();

    const enterP = interp(
        frame,
        [startFrame, startFrame + durationFrames],
        [0, 1],
        { easing: easeOutCubic },
    );

    const exitP = exitFrame
        ? interp(frame, [exitFrame, exitFrame + durationFrames], [0, 1], {
            easing: easeInCubic,
        })
        : 0;

    const p = Math.max(0, enterP - exitP);

    return (
        <div
            style={{
                transform: `translateX(${(1 - p) * -120}px)`,
                opacity: p,
                display: 'flex',
                alignItems: 'stretch',
                ...style,
            }}
        >
            <div
                style={{
                    width: 4,
                    backgroundColor: accentColor,
                    marginRight: 12,
                    borderRadius: 2,
                }}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <span
                    style={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: 20,
                        lineHeight: 1.2,
                    }}
                >
                    {name}
                </span>
                {title && (
                    <span
                        style={{
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: 13,
                            lineHeight: 1.2,
                        }}
                    >
                        {title}
                    </span>
                )}
            </div>
        </div>
    );
};

/**
 * Kinetic lower third with animated accent line.
 */
export const KineticLowerThird: React.FC<LowerThirdProps> = ({
    name,
    title,
    startFrame = 0,
    exitFrame,
    durationFrames = 30,
    accentColor = '#4ECDC4',
    style,
}) => {
    const frame = useCurrentFrame();
    const lineP = interp(
        frame,
        [startFrame, startFrame + durationFrames * 0.4],
        [0, 1],
        { easing: easeOutCubic },
    );
    const textP = interp(
        frame,
        [startFrame + 8, startFrame + durationFrames],
        [0, 1],
        { easing: easeOutBack },
    );

    return (
        <div style={{ ...style }}>
            <div
                style={{
                    width: `${lineP * 100}%`,
                    height: 2,
                    backgroundColor: accentColor,
                    marginBottom: 8,
                    maxWidth: 240,
                }}
            />
            <div
                style={{
                    opacity: textP,
                    transform: `translateY(${(1 - textP) * 15}px)`,
                }}
            >
                <div
                    style={{ color: 'white', fontWeight: 800, fontSize: 22 }}
                >
                    {name}
                </div>
                {title && (
                    <div
                        style={{
                            color: accentColor,
                            fontSize: 13,
                            marginTop: 2,
                        }}
                    >
                        {title}
                    </div>
                )}
            </div>
        </div>
    );
};
