import React from 'react';
import { useCurrentFrame } from 'remotion';
import { seededRandom, clamp } from '../utils/math';

export interface ShakeVibrateProps {
    /** Shake intensity in pixels. */
    intensity?: number;
    /** Speed multiplier for the shake frequency. */
    speed?: number;
    /** Which axes to shake along. */
    axes?: 'xy' | 'x' | 'y';
    /** Include rotational shake. */
    rotation?: boolean;
    /** Max rotation in degrees. */
    rotationIntensity?: number;
    /**
     * Array of frame numbers where beats occur.
     * Each beat triggers a burst of shake that decays.
     */
    beatFrames?: number[];
    /** How quickly the beat shake decays (higher = faster decay). */
    beatDecay?: number;
    children?: React.ReactNode;
}

/**
 * Shake/Vibrate — Camera shake effect with optional beat-syncing.
 * Wraps children and applies random transform offsets.
 *
 * @example
 * <ShakeVibrate intensity={8} beatFrames={[30, 60, 90]}>
 *   <AbsoluteFill><YourScene /></AbsoluteFill>
 * </ShakeVibrate>
 */
export const ShakeVibrate: React.FC<ShakeVibrateProps> = ({
    intensity = 5,
    speed = 1,
    axes = 'xy',
    rotation = true,
    rotationIntensity = 2,
    beatFrames = [],
    beatDecay = 0.15,
    children,
}) => {
    const frame = useCurrentFrame();

    // Calculate beat influence
    let beatMultiplier = 0;
    for (const beat of beatFrames) {
        const diff = frame - beat;
        if (diff >= 0 && diff < 30) {
            beatMultiplier = Math.max(
                beatMultiplier,
                Math.exp(-diff * beatDecay),
            );
        }
    }

    // If beats are defined, use beat multiplier; otherwise constant shake
    const effectiveIntensity =
        beatFrames.length > 0
            ? intensity * beatMultiplier
            : intensity;

    const t = frame * speed;
    const shakeX =
        axes !== 'y'
            ? (seededRandom(t * 17.3) - 0.5) * 2 * effectiveIntensity
            : 0;
    const shakeY =
        axes !== 'x'
            ? (seededRandom(t * 23.7) - 0.5) * 2 * effectiveIntensity
            : 0;
    const shakeRot = rotation
        ? (seededRandom(t * 31.1) - 0.5) *
        2 *
        rotationIntensity *
        (effectiveIntensity / intensity || 0)
        : 0;

    const safeRot = isNaN(shakeRot) ? 0 : clamp(shakeRot, -rotationIntensity, rotationIntensity);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: -10,
                    transform: `translate(${shakeX}px, ${shakeY}px) rotate(${safeRot}deg)`,
                }}
            >
                {children}
            </div>
        </div>
    );
};
