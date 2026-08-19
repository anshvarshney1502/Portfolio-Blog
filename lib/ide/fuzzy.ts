/*
 * Subsequence fuzzy matcher for the command palette.
 *
 * Returns the matched character indices alongside the score so the palette can
 * bold exactly what the query hit — that feedback is most of what makes VS
 * Code's palette feel responsive, more than the ranking itself.
 */

export interface FuzzyMatch {
  score: number;
  indices: number[];
}

const SEPARATORS = new Set([' ', '-', '_', '/', '.', ':']);

export function fuzzyMatch(query: string, target: string): FuzzyMatch | null {
  if (!query) return { score: 0, indices: [] };

  const q = query.toLowerCase();
  const t = target.toLowerCase();

  const indices: number[] = [];
  let score = 0;
  let ti = 0;
  let lastHit = -2;

  for (let qi = 0; qi < q.length; qi++) {
    const ch = q[qi];
    // Spaces in the query are treated as "anything can be here", which lets
    // "go set" find "Go to Settings" without the user matching punctuation.
    if (ch === ' ') continue;

    let found = -1;
    while (ti < t.length) {
      if (t[ti] === ch) {
        found = ti;
        break;
      }
      ti++;
    }
    if (found === -1) return null;

    // Adjacent matches are the strongest signal that the user is typing a real
    // prefix rather than scattering letters.
    if (found === lastHit + 1) score += 8;

    const prev = found > 0 ? target[found - 1] : '';
    if (found === 0) {
      score += 12;
    } else if (SEPARATORS.has(prev)) {
      score += 10;
    } else if (prev === prev.toLowerCase() && target[found] !== target[found].toLowerCase()) {
      // camelCase boundary
      score += 7;
    }

    // Later matches are worth slightly less, so "set" prefers "settings" over
    // "reset the thing".
    score -= Math.min(found, 12) * 0.4;

    indices.push(found);
    lastHit = found;
    ti = found + 1;
  }

  // Matching most of a short string beats matching a little of a long one.
  score += (indices.length / target.length) * 6;

  return { score, indices };
}

export interface Ranked<T> {
  item: T;
  score: number;
  indices: number[];
}

/**
 * Rank items by the best match across several searchable fields. Only the
 * primary field's indices are returned, since that is the only one the palette
 * renders with highlights.
 */
export function fuzzyRank<T>(
  query: string,
  items: T[],
  primary: (item: T) => string,
  secondary?: (item: T) => string[]
): Ranked<T>[] {
  if (!query.trim()) {
    return items.map((item) => ({ item, score: 0, indices: [] }));
  }

  const results: Ranked<T>[] = [];

  for (const item of items) {
    const main = fuzzyMatch(query, primary(item));
    let best = main;
    let indices = main?.indices ?? [];

    if (secondary) {
      for (const field of secondary(item)) {
        const alt = fuzzyMatch(query, field);
        // A secondary-field hit counts, but at a discount so a title match
        // always outranks a description match.
        if (alt && (!best || alt.score * 0.5 > best.score)) {
          best = { score: alt.score * 0.5, indices: [] };
          if (!main) indices = [];
        }
      }
    }

    if (best) results.push({ item, score: best.score, indices });
  }

  return results.sort((a, b) => b.score - a.score);
}

/** Split a string into matched/unmatched runs for rendering. */
export function highlightRuns(
  text: string,
  indices: number[]
): { text: string; match: boolean }[] {
  if (!indices.length) return [{ text, match: false }];

  const set = new Set(indices);
  const runs: { text: string; match: boolean }[] = [];
  let buffer = '';
  let bufferMatch = set.has(0);

  for (let i = 0; i < text.length; i++) {
    const isMatch = set.has(i);
    if (isMatch !== bufferMatch) {
      if (buffer) runs.push({ text: buffer, match: bufferMatch });
      buffer = '';
      bufferMatch = isMatch;
    }
    buffer += text[i];
  }
  if (buffer) runs.push({ text: buffer, match: bufferMatch });

  return runs;
}
