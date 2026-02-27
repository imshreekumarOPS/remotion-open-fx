import React from 'react';
import { useCurrentFrame } from 'remotion';
import { interp } from '../utils/interpolate';
import { easeOutBack } from '../utils/easing';

/**
 * Arrow + text callout overlay for tutorial/explainer videos.
 *
 * @example
 * <VideoCallout
 *   text="Click here"
 *   startFrame={30}
 *   arrowDirection="down"
 *   style={{ position: 'absolute', left: 400, top: 200 }}
 * />
 */
export const VideoCallout: React.FC<{
    text: string;
    subtext?: string;
    startFrame?: number;
    durationFrames?: number;
    color?: string;
    textColor?: string;
    arrowDirection?: 'up' | 'down' | 'left' | 'right';
    style?: React.CSSProperties;
}> = ({
    text,
    subtext,
    startFrame = 0,
    durationFrames = 25,
    color = '#FFE66D',
    textColor = '#111',
    arrowDirection = 'down',
    style,
}) => {
        const frame = useCurrentFrame();
        const p = interp(
            frame,
            [startFrame, startFrame + durationFrames],
            [0, 1],
            { easing: easeOutBack },
        );

        const arrowStyle: Record<string, React.CSSProperties> = {
            down: {
                borderTop: `12px solid ${color}`,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                marginTop: 4,
            },
            up: {
                borderBottom: `12px solid ${color}`,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                marginBottom: 4,
            },
            left: {
                borderRight: `12px solid ${color}`,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                marginRight: 8,
            },
            right: {
                borderLeft: `12px solid ${color}`,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                marginLeft: 8,
            },
        };

        const isVertical =
            arrowDirection === 'up' || arrowDirection === 'down';

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: isVertical
                        ? arrowDirection === 'down'
                            ? 'column'
                            : 'column-reverse'
                        : 'row',
                    alignItems: 'center',
                    transform: `scale(${p})`,
                    opacity: p,
                    transformOrigin: 'center',
                    ...style,
                }}
            >
                <div
                    style={{
                        backgroundColor: color,
                        color: textColor,
                        borderRadius: 8,
                        padding: '8px 16px',
                        textAlign: 'center',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    }}
                >
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{text}</div>
                    {subtext && (
                        <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>
                            {subtext}
                        </div>
                    )}
                </div>
                <div style={arrowStyle[arrowDirection]} />
            </div>
        );
    };
