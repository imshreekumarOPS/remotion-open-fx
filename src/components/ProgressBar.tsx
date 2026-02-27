import React from 'react';
import { useCurrentFrame } from 'remotion';
import { interp } from '../utils/interpolate';
import { easeOutCubic } from '../utils/easing';

/**
 * Animated progress bar that fills from 0% to a target value.
 *
 * @example
 * <ProgressBar
 *   targetProgress={0.75}
 *   startFrame={30}
 *   durationFrames={60}
 *   label="Q3 Revenue"
 *   showPercent
 * />
 */
export const ProgressBar: React.FC<{
    targetProgress?: number; // 0–1
    startFrame?: number;
    durationFrames?: number;
    color?: string;
    backgroundColor?: string;
    height?: number;
    borderRadius?: number;
    label?: string;
    showPercent?: boolean;
    style?: React.CSSProperties;
}> = ({
    targetProgress = 1,
    startFrame = 0,
    durationFrames = 60,
    color = '#4ECDC4',
    backgroundColor = 'rgba(255,255,255,0.15)',
    height = 8,
    borderRadius = 4,
    label,
    showPercent = false,
    style,
}) => {
        const frame = useCurrentFrame();
        const p = interp(
            frame,
            [startFrame, startFrame + durationFrames],
            [0, targetProgress],
            { easing: easeOutCubic },
        );

        return (
            <div style={{ width: '100%', ...style }}>
                {(label || showPercent) && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 6,
                            color: 'white',
                            fontSize: 13,
                        }}
                    >
                        {label && <span>{label}</span>}
                        {showPercent && <span>{Math.round(p * 100)}%</span>}
                    </div>
                )}
                <div
                    style={{
                        width: '100%',
                        height,
                        backgroundColor,
                        borderRadius,
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            width: `${p * 100}%`,
                            backgroundColor: color,
                            borderRadius,
                        }}
                    />
                </div>
            </div>
        );
    };
