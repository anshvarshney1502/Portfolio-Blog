'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import { VscAdd, VscClose, VscRefresh, VscSend, VscAccount } from 'react-icons/vsc';

import { getBotResponse, SUGGESTIONS } from '@/lib/ide/chatbot';
import { useIDE } from '@/components/ide/IDEProvider';
import styles from '@/styles/ChatPanel.module.css';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((\/[^\)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br/>');
}

function VscodeIcon({ size = 16 }: { size?: number }) {
  return (
    <Image
      src="/logos/vscode_icon.svg"
      alt="VS Code"
      width={size}
      height={size}
      style={{ display: 'block' }}
    />
  );
}

export default function ChatPanel() {
  const ide = useIDE();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const anchorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollDown = useCallback(() => {
    anchorRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollDown(); }, [messages, scrollDown]);

  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 90) + 'px';
  };

  const restart = useCallback(() => setMessages([]), []);

  const send = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages(prev => [
      ...prev,
      { role: 'user', content: trimmed },
      { role: 'bot', content: getBotResponse(trimmed) },
    ]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <aside className={styles.panel} aria-label="Chat panel">

      {/* ── Header ─────────────────────────────────── */}
      <div className={styles.header}>
        <span className={styles.title}>Chat</span>
        <div className={styles.hBtns}>
          <button className={styles.hBtn} title="New Chat" onClick={restart}>
            <VscAdd size={14} />
          </button>
          <div className={styles.hSep} />
          <button className={styles.hBtn} title="Close Panel" onClick={ide.toggleChat}>
            <VscClose size={14} />
          </button>
        </div>
      </div>

      {/* ── Sessions bar ───────────────────────────── */}
      <div className={styles.sessionsBar}>
        <span className={styles.sessionsLabel}>Sessions</span>
        <button className={styles.sBtn} title="Restart chat" onClick={restart}>
          <VscRefresh size={12} />
        </button>
      </div>

      {/* ── Body ───────────────────────────────────── */}
      <div className={styles.body}>
        {isEmpty ? (
          <div className={styles.emptyBody}>
            <div className={styles.emptyLogo}>
              <VscodeIcon size={36} />
            </div>
            <p className={styles.emptyTitle}>Ask Ansh&apos;s AI</p>
            <p className={styles.emptySub}>
              Ask anything — experience, skills, projects, or how to reach Ansh.
            </p>
            <div className={styles.chips}>
              {SUGGESTIONS.map(s => (
                <button key={s} className={styles.chip} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.turn} ${m.role === 'user' ? styles.turnUser : styles.turnBot}`}>
                <div className={styles.turnHead}>
                  <span className={styles.turnAvatar}>
                    {m.role === 'user'
                      ? <VscAccount size={13} />
                      : <VscodeIcon size={13} />
                    }
                  </span>
                  <span className={styles.turnName}>
                    {m.role === 'user' ? 'You' : "Ansh's AI"}
                  </span>
                </div>
                <div className={styles.turnBody}>
                  {m.role === 'user' ? (
                    <span className={styles.userText}>{m.content}</span>
                  ) : (
                    <span
                      className={styles.botText}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
                    />
                  )}
                </div>
              </div>
            ))}
            <div ref={anchorRef} />
          </div>
        )}
      </div>

      {/* ── Input area ─────────────────────────────── */}
      <div className={styles.bottom}>
        <div className={styles.tip}>
          <strong>Tip:</strong>{' '}
          <button className={styles.tipLink} onClick={() => send('/help')}>/help</button>
          {' '}for all commands · ⇧↵ for newline
        </div>
        <div className={styles.inputWrap}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            placeholder="Ask about Ansh..."
            value={input}
            rows={1}
            onChange={e => { setInput(e.target.value); autoResize(); }}
            onKeyDown={onKeyDown}
          />
          <button
            className={styles.sendBtn}
            onClick={() => send(input)}
            disabled={!input.trim()}
            title="Send (Enter)"
          >
            <VscSend size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}
