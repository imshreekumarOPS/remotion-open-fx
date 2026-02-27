import React from 'react';
import { useCurrentFrame } from 'remotion';
import { interp } from '../utils/interpolate';
import { easeOutCubic, easeOutElastic } from '../utils/easing';

/**
 * Animated circle — great for highlighting or kinetic backgrounds.
 *
 * @example
 * <AnimatedCircle size={200} color="#FF6B6B" startFrame={10} />
 */
export const AnimatedCircle: React.FC<{
    size?: number;
    color?: string;
    startFrame?: number;
    durationFrames?: number;
    filled?: boolean;
    strokeWidth?: number;
    style?: React.CSSProperties;
}> = ({
    size = 100,
    color = '#fff',
    startFrame = 0,
    durationFrames = 30,
    filled = true,
    strokeWidth = 4,
    style,
}) => {
        const frame = useCurrentFrame();
        const p = interp(
            frame,
            [startFrame, startFrame + durationFrames],
            [0, 1],
            { easing: easeOutElastic },
        );

        return (
            <div
                style={{
                    width: size * p,
                    height: size * p,
                    borderRadius: '50%',
                    backgroundColor: filled ? color : 'transparent',
                    border: filled ? 'none' : `${strokeWidth}px solid ${color}`,
                    opacity: Math.min(p * 2, 1),
                    ...style,
                }}
            />
        );
    };

/**
 * Animated line — draws a line across a given length.
 */
export const AnimatedLine: React.FC<{
    length?: number;
    color?: string;
    thickness?: number;
    startFrame?: number;
    durationFrames?: number;
    direction?: 'horizontal' | 'vertical';
    style?: React.CSSProperties;
}> = ({
    length = 200,
    color = '#fff',
    thickness = 2,
    startFrame = 0,
    durationFrames = 20,
    direction = 'horizontal',
    style,
}) => {
        const frame = useCurrentFrame();
        const p = interp(
            frame,
            [startFrame, startFrame + durationFrames],
            [0, 1],
            { easing: easeOutCubic },
        );

        return (
            <div
                style={{
                    width: direction === 'horizontal' ? length * p : thickness,
                    height: direction === 'vertical' ? length * p : thickness,
                    backgroundColor: color,
                    opacity: Math.min(p * 3, 1),
                    ...style,
                }}
            />
        );
    };

/**
 * Kinetic gradient background — animated moving gradient.
 * Great for background plates or title cards.
 */
export const KineticGradient: React.FC<{
    colors?: string[];
    speed?: number;
    style?: React.CSSProperties;
}> = ({ colors = ['#0F0C29', '#302B63', '#24243E'], speed = 0.5 }) => {
    const frame = useCurrentFrame();
    const angle = (frame * speed) % 360;
    const colorStr = colors.join(', ');

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(${angle}deg, ${colorStr})`,
            }}
        />
    );
};

/**
 * Animated progress bar.
 */
export const AnimatedProgressBar: React.FC<{
    progress: number; // 0–1
    color?: string;
    backgroundColor?: string;
    height?: number;
    borderRadius?: number;
    style?: React.CSSProperties;
}> = ({
    progress,
    color = '#4ECDC4',
    backgroundColor = 'rgba(255,255,255,0.2)',
    height = 6,
    borderRadius = 4,
    style,
}) => (
        <div
            style={{
                width: '100%',
                height,
                backgroundColor,
                borderRadius,
                overflow: 'hidden',
                ...style,
            }}
        >
            <div
                style={{
                    height: '100%',
                    width: `${progress * 100}%`,
                    backgroundColor: color,
                    borderRadius,
                    transition: 'none',
                }}
            />
        </div>
    );
