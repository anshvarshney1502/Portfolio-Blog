/*
 * Synthesised UI sounds.
 *
 * These are generated with WebAudio rather than shipped as audio files: the
 * whole set is a few hundred bytes of code instead of a few hundred KB of
 * assets, and there is nothing to load before the first click feels right.
 *
 * Everything here is off unless the visitor turns it on. Sound that plays
 * uninvited on a portfolio is a reason to close the tab, not a delight.
 */

type SoundName = 'click' | 'key' | 'open' | 'close' | 'notify' | 'error';

let ctx: AudioContext | null = null;
let enabled = false;

function context(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  // Browsers start the context suspended until a gesture; every call site here
  // is downstream of one, so resuming lazily is safe.
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

interface Blip {
  freq: number;
  /** Second frequency for a two-tone chirp. */
  to?: number;
  duration: number;
  gain: number;
  type?: OscillatorType;
}

const RECIPES: Record<SoundName, Blip[]> = {
  // Short, dry, high — a keyswitch bottoming out rather than a notification.
  click: [{ freq: 1180, to: 880, duration: 0.035, gain: 0.045 }],
  key: [{ freq: 1650, to: 1400, duration: 0.018, gain: 0.022 }],
  open: [{ freq: 620, to: 980, duration: 0.09, gain: 0.035 }],
  close: [{ freq: 980, to: 560, duration: 0.09, gain: 0.032 }],
  notify: [
    { freq: 880, duration: 0.07, gain: 0.04 },
    { freq: 1320, duration: 0.11, gain: 0.035 },
  ],
  error: [{ freq: 240, to: 170, duration: 0.14, gain: 0.05, type: 'square' }],
};

function blip(ac: AudioContext, spec: Blip, offset: number) {
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  // A lowpass keeps the square/high-frequency content from sounding like a
  // 90s error beep. It reads as a soft mechanical tick instead.
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 2600;

  osc.type = spec.type ?? 'sine';

  const start = ac.currentTime + offset;
  const end = start + spec.duration;

  osc.frequency.setValueAtTime(spec.freq, start);
  if (spec.to) osc.frequency.exponentialRampToValueAtTime(spec.to, end);

  // Tiny attack avoids the click that an instant gain jump produces.
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(spec.gain, start + 0.006);
  amp.gain.exponentialRampToValueAtTime(0.0001, end);

  osc.connect(filter);
  filter.connect(amp);
  amp.connect(ac.destination);
  osc.start(start);
  osc.stop(end + 0.02);
}

export function setSoundEnabled(value: boolean) {
  enabled = value;
}

export function isSoundEnabled() {
  return enabled;
}

export function playSound(name: SoundName) {
  if (!enabled) return;
  const ac = context();
  if (!ac) return;
  let offset = 0;
  for (const spec of RECIPES[name]) {
    blip(ac, spec, offset);
    offset += spec.duration * 0.7;
  }
}
