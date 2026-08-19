/*
 * A tiny event bus so menus and the command palette can drive the terminal.
 *
 * "Terminal > Clear" and "Run > Simulate Deploy" need to reach into a component
 * that may not even be mounted yet. Threading a ref down through the provider
 * would couple the terminal's internals to everything that wants to poke it;
 * an event the terminal subscribes to when it mounts keeps that boundary clean.
 */

export type TerminalAction =
  | { kind: 'run'; command: string }
  | { kind: 'clear' }
  | { kind: 'new' }
  | { kind: 'split' };

type Handler = (action: TerminalAction) => void;

const handlers = new Set<Handler>();
/** Actions fired while the terminal was closed, replayed when it opens. */
let queued: TerminalAction | null = null;

export function onTerminalAction(handler: Handler): () => void {
  handlers.add(handler);
  if (queued) {
    const pending = queued;
    queued = null;
    // Defer so the subscriber finishes mounting before it receives anything.
    queueMicrotask(() => handler(pending));
  }
  return () => {
    handlers.delete(handler);
  };
}

export function dispatchTerminal(action: TerminalAction) {
  if (handlers.size === 0) {
    queued = action;
    return;
  }
  handlers.forEach((handler) => handler(action));
}
