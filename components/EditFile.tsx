'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { VscSave, VscRefresh } from 'react-icons/vsc';

import { useIDE } from '@/components/ide/IDEProvider';
import { PROFILE, SKILLS, EXPERIENCE, EDUCATION, OPEN_SOURCE } from '@/lib/ide/profile';
import styles from '@/styles/EditFile.module.css';

const STORAGE_KEY = 'ide_notes_v1';

function buildDefaultContent(): string {
  const skillLines = Object.entries(SKILLS)
    .map(([cat, items]) => `### ${cat}\n${items.join(' · ')}`)
    .join('\n\n');

  const expLines = EXPERIENCE.map(e =>
    `### ${e.role} · ${e.company}\n_${e.period}_\n\n${e.points.map(p => `- ${p}`).join('\n')}`
  ).join('\n\n');

  const eduLines = EDUCATION.map(
    e => `- **${e.degree}** — ${e.school} _(${e.period})_`
  ).join('\n');

  const osLines = OPEN_SOURCE.map(o => `- ${o}`).join('\n');

  return `# ${PROFILE.name}

> ${PROFILE.tagline}

**Location:** ${PROFILE.location}
**Email:** ${PROFILE.email}
**GitHub:** ${PROFILE.github}
**LinkedIn:** ${PROFILE.linkedin}

---

## Summary

Building intelligent software with data, AI, and open source. Currently
pursuing a BS in Data Science at IIT Madras while gaining hands-on
experience through internships and open-source contributions.

---

## Skills

${skillLines}

---

## Experience

${expLines}

---

## Education

${eduLines}

---

## Open Source

${osLines}

---

## Notes

_Add your personal notes here. This file is saved in your browser._

`;
}

export default function EditFile() {
  const ide = useIDE();
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(true);
  const [cursorLine, setCursorLine] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = stored ?? buildDefaultContent();
    setContent(initial);
    if (!stored) setSaved(false);
  }, []);

  const lineCount = content ? content.split('\n').length : 1;

  const save = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, content);
    setSaved(true);
    ide.notify('notes.md saved', { tone: 'success' });
  }, [content, ide]);

  const reset = useCallback(() => {
    const fresh = buildDefaultContent();
    setContent(fresh);
    setSaved(false);
    ide.notify('Notes reset to default', { tone: 'info' });
  }, [ide]);

  /* Ctrl+S saves from within the textarea */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        const tag = (e.target as Element)?.tagName;
        if (tag === 'TEXTAREA' || tag === 'INPUT') {
          e.preventDefault();
          e.stopPropagation();
          save();
        }
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [save]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSaved(false);
  };

  const syncLineScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const updateCursorLine = (e: React.KeyboardEvent | React.MouseEvent) => {
    const ta = e.currentTarget as HTMLTextAreaElement;
    const before = ta.value.substring(0, ta.selectionStart ?? 0);
    setCursorLine(before.split('\n').length);
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className={styles.editor}>
      {/* Breadcrumb / toolbar */}
      <div className={styles.toolbar}>
        <span className={styles.filename}>notes.md</span>
        {!saved && <span className={styles.dirty} title="Unsaved changes">●</span>}
        <span className={styles.spacer} />
        <button className={styles.toolBtn} onClick={reset} title="Reset to default">
          <VscRefresh size={13} />
        </button>
        <button
          className={`${styles.toolBtn} ${styles.saveBtn} ${saved ? styles.isSaved : ''}`}
          onClick={save}
          title="Save (Ctrl+S)"
        >
          <VscSave size={13} />
          {!saved && <span>Save</span>}
        </button>
      </div>

      {/* Editor body — line numbers + textarea */}
      <div className={styles.body}>
        <div ref={lineNumbersRef} className={styles.lineNumbers} aria-hidden="true">
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i}
              className={`${styles.lineNum} ${cursorLine === i + 1 ? styles.activeLineNum : ''}`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          id="profile-notes-editor"
          name="profileNotes"
          className={styles.textarea}
          value={content}
          onChange={handleChange}
          onScroll={syncLineScroll}
          onKeyUp={updateCursorLine}
          onClick={updateCursorLine as React.MouseEventHandler}
          spellCheck={false}
          autoComplete="off"
          aria-label="Edit notes.md"
        />
      </div>

      {/* Status footer */}
      <div className={styles.footer}>
        <span className={styles.stat}>Ln {cursorLine}, Col 1</span>
        <span className={styles.divider} />
        <span className={styles.stat}>{lineCount} lines</span>
        <span className={styles.divider} />
        <span className={styles.stat}>{wordCount} words</span>
        <span className={styles.spacer} />
        <span className={styles.lang}>Markdown</span>
        <span className={styles.divider} />
        <span className={`${styles.saveStatus} ${saved ? styles.statusSaved : styles.statusUnsaved}`}>
          {saved ? '✓ Saved' : '● Unsaved'}
        </span>
      </div>
    </div>
  );
}
