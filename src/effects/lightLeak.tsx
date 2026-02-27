import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { seededRandom } from '../utils/math';

export interface LightLeakProps {
    /** Overall opacity/intensity of the light leaks (0–1). */
    intensity?: number;
    /** Base warm color for the leaks. */
    color?: string;
    /** Number of light leak flares. */
    count?: number;
    /** Speed of the drift animation. */
    speed?: number;
    /** Starting position bias: 'left', 'right', 'top', 'random'. */
    position?: 'left' | 'right' | 'top' | 'random';
}

/**
 * Light Leak — Film-style warm light flares bleeding across the frame.
 * Renders as an overlay with screen blend mode.
 *
 * @example
 * <AbsoluteFill>
 *   <YourScene />
 *   <LightLeak intensity={0.5} count={3} />
 * </AbsoluteFill>
 */
export const LightLeak: React.FC<LightLeakProps> = ({
    intensity = 0.4,
    color = '#ff9940',
    count = 3,
    speed = 0.5,
    position = 'random',
}) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const leaks = Array.from({ length: count }, (_, i) => {
        const seed = i * 97;

        // Position bias
        let baseX: number;
        let baseY: number;
        switch (position) {
            case 'left':
                baseX = seededRandom(seed + 1) * width * 0.3;
                baseY = seededRandom(seed + 2) * height;
                break;
            case 'right':
                baseX = width * 0.7 + seededRandom(seed + 1) * width * 0.3;
                baseY = seededRandom(seed + 2) * height;
                break;
            case 'top':
                baseX = seededRandom(seed + 1) * width;
                baseY = seededRandom(seed + 2) * height * 0.3;
                break;
            default:
                baseX = seededRandom(seed + 1) * width;
                baseY = seededRandom(seed + 2) * height;
        }

        // Drift animation
        const driftX =
            Math.sin(frame * speed * 0.02 + seededRandom(seed) * 10) *
            width *
            0.15;
        const driftY =
            Math.cos(frame * speed * 0.015 + seededRandom(seed + 3) * 10) *
            height *
            0.1;

        // Size and opacity variation
        const sizeBase = seededRandom(seed + 4) * 400 + 200;
        const sizeW = sizeBase * (1.5 + seededRandom(seed + 5));
        const sizeH = sizeBase;
        const rotation = seededRandom(seed + 6) * 360;
        const opacityPulse =
            0.6 +
            0.4 * Math.sin(frame * speed * 0.03 + seededRandom(seed + 7) * 6);

        return (
            <div
                key={i}
                style={{
                    position: 'absolute',
                    left: baseX + driftX - sizeW / 2,
                    top: baseY + driftY - sizeH / 2,
                    width: sizeW,
                    height: sizeH,
                    borderRadius: '50%',
                    background: `radial-gradient(ellipse at center, ${color}cc 0%, ${color}66 30%, ${color}22 60%, transparent 80%)`,
                    transform: `rotate(${rotation}deg)`,
                    opacity: intensity * opacityPulse,
                    mixBlendMode: 'screen',
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                }}
            />
        );
    });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            {leaks}
        </div>
    );
};
