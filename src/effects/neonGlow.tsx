import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface NeonGlowProps {
    /** Primary neon color. */
    color?: string;
    /** Glow intensity multiplier (0–1). */
    intensity?: number;
    /** Speed of the pulsating glow (lower = slower). */
    pulseSpeed?: number;
    /** Spread radius of the glow in pixels. */
    spread?: number;
    children?: React.ReactNode;
}

/**
 * Neon Glow — Adds vibrant glowing edges with a pulsating effect.
 * Perfect for night/aesthetic edits.
 *
 * @example
 * <NeonGlow color="#ff00ff" intensity={0.8}>
 *   <AbsoluteFill><YourScene /></AbsoluteFill>
 * </NeonGlow>
 */
export const NeonGlow: React.FC<NeonGlowProps> = ({
    color = '#00ffff',
    intensity = 0.7,
    pulseSpeed = 0.08,
    spread = 20,
    children,
}) => {
    const frame = useCurrentFrame();

    // Pulsating intensity
    const pulse = 0.6 + 0.4 * Math.sin(frame * pulseSpeed);
    const glowStrength = intensity * pulse;
    const s = spread * glowStrength;

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            {/* Original content */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    filter: `
                        drop-shadow(0 0 ${s * 0.3}px ${color})
                        drop-shadow(0 0 ${s * 0.6}px ${color})
                        drop-shadow(0 0 ${s}px ${color})
                        brightness(${1 + glowStrength * 0.2})
                        saturate(${1 + glowStrength * 0.5})
                    `,
                }}
            >
                {children}
            </div>

            {/* Edge glow overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    boxShadow: `
                        inset 0 0 ${s * 2}px ${color}40,
                        inset 0 0 ${s * 4}px ${color}20,
                        0 0 ${s}px ${color}30,
                        0 0 ${s * 2}px ${color}15
                    `,
                    borderRadius: 0,
                    opacity: glowStrength,
                }}
            />
        </div>
    );
};
