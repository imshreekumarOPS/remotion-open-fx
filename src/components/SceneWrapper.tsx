import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { interp } from '../utils/interpolate';
import { easeInCubic, easeOutCubic } from '../utils/easing';
import { Letterbox } from '../overlays/colorGrade';

/**
 * SceneWrapper — apply global scene-level controls:
 * fade in/out, letterbox, safe zones, and background color.
 *
 * Wrap your entire scene in this for consistent cinematic framing.
 *
 * @example
 * <SceneWrapper
 *   fadeInDuration={20}
 *   fadeOutDuration={20}
 *   fadeOutStart={280}
 *   letterbox="2.35:1"
 *   backgroundColor="#000"
 * >
 *   <YourContent />
 * </SceneWrapper>
 */
export const SceneWrapper: React.FC<{
    children: React.ReactNode;
    fadeInDuration?: number;
    fadeOutDuration?: number;
    fadeOutStart?: number;
    backgroundColor?: string;
    letterbox?: '2.35:1' | '2.39:1' | '1.85:1' | '1.78:1' | false;
    showSafeZone?: boolean;
}> = ({
    children,
    fadeInDuration = 15,
    fadeOutDuration = 15,
    fadeOutStart,
    backgroundColor = '#000',
    letterbox = false,
    showSafeZone = false,
}) => {
        const frame = useCurrentFrame();
        const { durationInFrames, width, height } = useVideoConfig();

        const fadeOut = fadeOutStart ?? durationInFrames - fadeOutDuration;

        const opacity =
            interp(frame, [0, fadeInDuration], [0, 1], {
                easing: easeOutCubic,
            }) *
            interp(frame, [fadeOut, fadeOut + fadeOutDuration], [1, 0], {
                easing: easeInCubic,
            });

        return (
            <AbsoluteFill style={{ backgroundColor, opacity }}>
                {children}
                {letterbox && <Letterbox ratio={letterbox} />}
                {showSafeZone && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: `${height * 0.05}px ${width * 0.05}px`,
                            border: '1px solid rgba(255,0,0,0.3)',
                            pointerEvents: 'none',
                        }}
                    />
                )}
            </AbsoluteFill>
        );
    };
