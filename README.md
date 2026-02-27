# 🎬 remotion-open-fx

> A production-grade animation & effects library for [Remotion](https://remotion.dev). 30+ easings, physics springs, cinematic transitions, overlays, and kinetic components — built for human editors and AI agents alike.

## 🚀 Installation

```bash
npm install remotion-open-fx
```

**Peer dependencies:** `react >= 18`, `remotion >= 4`

## 📖 Table of Contents

- [Quick Start](#-quick-start)
- [Core Pattern](#-the-pattern)
- [Animations](#-animations)
- [Transitions](#-transitions)
- [Video Effects (NEW)](#-video-effects)
- [Overlays & Cinematic](#-overlays--cinematic)
- [Hooks & Utils](#-hooks--utils)
- [Components](#-components)

---

## ⚡ Quick Start

```tsx
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { fadeIn, slideInUp, SceneWrapper, VHSRetro } from 'remotion-open-fx';

export const MyScene = () => {
    const frame = useCurrentFrame();
    
    return (
        <SceneWrapper letterbox="2.35:1">
            <VHSRetro intensity={0.5}>
                <div style={fadeIn({ frame, durationFrames: 30 })}>
                    <h1 style={slideInUp({ frame, startFrame: 10 })}>
                        Hello Remotion
                    </h1>
                </div>
            </VHSRetro>
        </SceneWrapper>
    );
};
```

---

## 🛠 The Pattern

Every animation in `remotion-fx` is a **pure function of the frame number**. No internal state, no `useEffect` timers — just deterministic frames.

### 1. Animations return `CSSProperties`
Apply them directly to the `style` prop of any element.
```tsx
const style = fadeIn({ frame, startFrame: 0, durationFrames: 30 });
<div style={style}>Content</div>
```

### 2. Transitions return styles for two elements
Used to animate between two sequences or layers.
```tsx
const { outStyle, inStyle } = wipeLeft({ frame, startFrame: 60, durationFrames: 20 });
<div style={outStyle}>Outgoing</div>
<div style={inStyle}>Incoming</div>
```

---

## ✨ Animations

High-performance CSS-based animations.

### Entrance Effects
`fadeIn`, `slideInLeft`, `slideInRight`, `slideInUp`, `slideInDown`, `scaleIn`, `popIn`, `flipInY`, `flipInX`, `irisIn`, `flyIn`, `glideIn`.

**Usage:**
```tsx
const style = popIn({ 
    frame: useCurrentFrame(), 
    startFrame: 15, 
    durationFrames: 20 
});
```

### Exit Effects
`fadeOut`, `slideOutLeft`, `slideOutRight`, `slideOutUp`, `slideOutDown`, `scaleOut`, `irisOut`, `burstOut`.

### Attention Seekers
`pulse`, `shake`, `bounce`, `wiggle`, `flash`, `swing`, `heartbeat`, `glimmer`.

---

## 🔀 Transitions

Cinematic ways to move between clips.

### Wipes & Zooms
- **Wipes:** `wipeLeft/Right/Up/Down`, `wipeDiagonal`, `barnDoors`, `irisTransition`.
- **Zooms:** `crossDissolve`, `zoomIn/Out`, `pushLeft/Right`, `dollyZoom`, `flashCut`.
- **Creative:** `rgbSplitTransition`, `pixelate`, `vhsRewind`.

**Example: Pixelate Transition**
```tsx
const { inStyle } = pixelate({ frame, startFrame: 45, durationFrames: 15 });
<div style={inStyle}>...</div>
```

---

## 📺 Video Effects

Production-grade filters to elevate your raw footage.

| Effect | Description | Props |
| :--- | :--- | :--- |
| `VHSRetro` | Classic 80s analog look | `intensity`, `scanlineOpacity`, `colorFringing` |
| `NeonGlow` | Pulsating neon outline/glow | `color`, `spread`, `intensity` |
| `RGBSplit` | Chromatic aberration shift | `intensity`, `direction` ("horizontal", "vertical", "diagonal") |
| `ShakeVibrate` | Camera shake/jitter | `intensity`, `speed` |
| `LightLeak` | Organic film light leaks | `intensity`, `color` |
| `Mirror` | Simple symmetry effect | `axis` ("horizontal", "vertical"), `position` |
| `DreamBokeh` | Soft focus with light orbs | `particleCount`, `blurAmount`, `brightness` |
| `OutlineDuotone` | Stylized two-tone mapping | `mode` ("outline", "duotone"), `colorLight`, `colorDark` |
| `SpeedRamp` | Variable playback speed | `segments` (array of `{startFrame, endFrame, speed}`) |
| `CinematicBars` | Animated letterboxing | `ratio` (e.g. "2.35:1"), `animate` |

**Example: Retro Setup**
```tsx
<VHSRetro intensity={0.8} scanlineOpacity={0.2}>
    <Video src={...} />
</VHSRetro>
```

---

## 🎨 Overlays & Cinematic

Static and dynamic layers for atmosphere.

- **Color Grades:** `<CinematicGrade>`, `<WarmGrade>`, `<CoolGrade>`, `<VintageGrade>`.
- **Atmosphere:** `<Vignette>`, `<Letterbox>`, `<FilmGrain>`, `<Scanlines>`.
- **Particles:** `<Confetti>`, `<DustParticles>`, `<Bokeh>`.

---

## 🪝 Hooks & Utils

Programmable logic for custom animations.

- `useAnimatedValue`: Multi-keyframe interpolation.
- `useSpring`: Physics-based movement with presets (`gentle`, `stiff`, `wobbly`).
- `useTimeline`: Declarative event-based timing.
- `useStagger`: Simple per-item delay logic.

**Spring Example:**
```tsx
const x = useSpring(frame, { 
    from: 0, 
    to: 100, 
    config: SpringPresets.wobbly 
});
```

---

## 🧩 Components

Pre-built UI blocks.

- `<AnimatedText>`: Unified component with multiple reveal modes:
    - **Basic:** `chars`, `words`, `typewriter`, `reveal`.
    - **Advanced:** `scramble`, `neon`, `threed`, `morph`, `handwritten`, `outline`, `gradient`.
- `<KineticTitle>`: High-impact animated title cards.
- `<ProgressBar>`: Modern data visualization bars.
- `<SceneWrapper>`: Global wrapper for letterboxing, background gradients, and safe zones.

---

## 📜 License

MIT © remotion-pak

