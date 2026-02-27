import React, { CSSProperties } from 'react';

export interface ColorGradeProps {
    style?: CSSProperties;
    intensity?: number; // 0–1 blend strength
}

/** Cinematic teal + orange grade */
export const CinematicGrade: React.FC<{ intensity?: number }> = ({
    intensity = 0.4,
}) => (
    <>
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background:
                    'linear-gradient(to bottom, rgba(0,30,60,0.3) 0%, rgba(60,30,0,0.1) 100%)',
                mixBlendMode: 'color',
                opacity: intensity,
            }}
        />
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                filter: `saturate(${1.2}) contrast(${1.1})`,
                opacity: intensity * 0.5,
            }}
        />
    </>
);

/** Warm golden hour grade */
export const WarmGrade: React.FC<{ intensity?: number }> = ({
    intensity = 0.3,
}) => (
    <div
        style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
                'linear-gradient(to bottom right, rgba(255,180,50,0.2), rgba(220,80,30,0.1))',
            mixBlendMode: 'screen',
            opacity: intensity,
        }}
    />
);

/** Cool blue/teal grade */
export const CoolGrade: React.FC<{ intensity?: number }> = ({
    intensity = 0.3,
}) => (
    <div
        style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'rgba(20,60,120,0.2)',
            mixBlendMode: 'multiply',
            opacity: intensity,
        }}
    />
);

/** Black & White desaturation */
export const BlackAndWhiteGrade: React.FC<{ intensity?: number }> = ({
    intensity = 1,
}) => (
    <div
        style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            filter: `grayscale(${intensity})`,
        }}
    />
);

/** Vintage film grade — lifted blacks, sepia */
export const VintageGrade: React.FC<{ intensity?: number }> = ({
    intensity = 0.5,
}) => (
    <>
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                backgroundColor: 'rgba(180,140,80,0.15)',
                mixBlendMode: 'multiply',
                opacity: intensity,
            }}
        />
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                filter: `sepia(${intensity * 0.4}) contrast(1.1) brightness(0.95)`,
            }}
        />
    </>
);

/** Vignette — darkens corners for cinematic look */
export const Vignette: React.FC<{
    intensity?: number;
    color?: string;
}> = ({ intensity = 0.5, color = '0,0,0' }) => (
    <div
        style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(ellipse at center, transparent 50%, rgba(${color},${intensity}) 100%)`,
        }}
    />
);

/** Letterbox — adds cinematic black bars */
export const Letterbox: React.FC<{
    ratio?: '2.35:1' | '2.39:1' | '1.85:1' | '1.78:1';
}> = ({ ratio = '2.35:1' }) => {
    const barSizes = {
        '2.35:1': 6.25,
        '2.39:1': 5.35,
        '1.85:1': 2.7,
        '1.78:1': 0,
    };
    const size = barSizes[ratio];
    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: `${size}%`,
                    backgroundColor: 'black',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${size}%`,
                    backgroundColor: 'black',
                }}
            />
        </>
    );
};
