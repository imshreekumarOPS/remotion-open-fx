import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { seededRandom } from '../utils/math';
import { interp } from '../utils/interpolate';

export interface ParticleSystemProps {
    count?: number;
    startFrame?: number;
    durationFrames?: number;
    colors?: string[];
}

/**
 * Confetti burst particle system.
 * Render as overlay on AbsoluteFill.
 *
 * @example
 * <AbsoluteFill>
 *   <YourScene />
 *   <Confetti count={80} startFrame={30} />
 * </AbsoluteFill>
 */
export const Confetti: React.FC<
    ParticleSystemProps & { gravity?: number }
> = ({
    count = 60,
    startFrame = 0,
    durationFrames = 90,
    colors = [
        '#FF6B6B',
        '#FFE66D',
        '#4ECDC4',
        '#45B7D1',
        '#96CEB4',
        '#FFEAA7',
    ],
    gravity = 1,
}) => {
        const frame = useCurrentFrame();
        const { width, height } = useVideoConfig();

        if (frame < startFrame) return null;

        const localFrame = frame - startFrame;

        const particles = Array.from({ length: count }, (_, i) => {
            const seed = i * 100;
            const x = seededRandom(seed + 1) * width;
            const vx = (seededRandom(seed + 2) - 0.5) * 8;
            const vy = -(seededRandom(seed + 3) * 15 + 5);
            const color =
                colors[Math.floor(seededRandom(seed + 4) * colors.length)];
            const size = seededRandom(seed + 5) * 10 + 5;
            const rot = seededRandom(seed + 6) * 360;
            const rotV = (seededRandom(seed + 7) - 0.5) * 20;

            const t = localFrame;
            const curX = x + vx * t;
            const curY = height * 0.3 + vy * t + 0.5 * gravity * t * t;
            const curRot = rot + rotV * t;
            const opacity = interp(
                t,
                [durationFrames * 0.7, durationFrames],
                [1, 0],
            );

            if (curY > height + 50 || opacity <= 0) return null;

            return (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: curX,
                        top: curY,
                        width: size,
                        height: size * 0.6,
                        backgroundColor: color,
                        borderRadius: 2,
                        transform: `rotate(${curRot}deg)`,
                        opacity,
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
                {particles}
            </div>
        );
    };

/**
 * Dust/floating particle ambient effect.
 * Subtle particles that drift upward — great for cinematic atmosphere.
 */
export const DustParticles: React.FC<
    ParticleSystemProps & { color?: string }
> = ({ count = 30, color = 'rgba(255,255,255,0.6)' }) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const particles = Array.from({ length: count }, (_, i) => {
        const seed = i * 73;
        const x = seededRandom(seed + 1) * width;
        const baseY = seededRandom(seed + 2) * height;
        const speed = seededRandom(seed + 3) * 0.5 + 0.2;
        const size = seededRandom(seed + 4) * 4 + 1;
        const drift =
            Math.sin(frame * 0.02 + seededRandom(seed) * 10) * 15;

        const y =
            (((baseY - frame * speed) % height) + height) % height;

        return (
            <div
                key={i}
                style={{
                    position: 'absolute',
                    left: x + drift,
                    top: y,
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    backgroundColor: color,
                    opacity: seededRandom(seed + 5) * 0.7 + 0.3,
                }}
            />
        );
    });

    return (
        <div
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
            {particles}
        </div>
    );
};

/**
 * Bokeh light particles — out-of-focus circular lights for dreamy backgrounds.
 */
export const Bokeh: React.FC<
    ParticleSystemProps & { blurAmount?: number }
> = ({
    count = 15,
    colors = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#C7B8FF'],
    blurAmount = 20,
}) => {
        const frame = useCurrentFrame();
        const { width, height } = useVideoConfig();

        const particles = Array.from({ length: count }, (_, i) => {
            const seed = i * 41;
            const x = seededRandom(seed + 1) * width;
            const y = seededRandom(seed + 2) * height;
            const size = seededRandom(seed + 3) * 120 + 40;
            const color =
                colors[Math.floor(seededRandom(seed + 4) * colors.length)];
            const driftX =
                Math.sin(frame * 0.01 + seededRandom(seed) * 5) * 30;
            const driftY =
                Math.cos(frame * 0.008 + seededRandom(seed + 1) * 5) * 20;
            const opacity = seededRandom(seed + 5) * 0.3 + 0.1;

            return (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: x + driftX - size / 2,
                        top: y + driftY - size / 2,
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        backgroundColor: color,
                        filter: `blur(${blurAmount}px)`,
                        opacity,
                        mixBlendMode: 'screen',
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
                {particles}
            </div>
        );
    };
