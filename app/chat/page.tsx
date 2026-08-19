'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  VscAdd,
  VscSettingsGear,
  VscSearch,
  VscFilter,
  VscSplitHorizontal,
  VscRefresh,
  VscSend,
  VscSparkle,
} from 'react-icons/vsc';

import styles from '@/styles/ChatPage.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  "What is Ansh currently working on?",
  "Tell me about his experience at IIT Ropar",
  "What are his top skills?",
  "What projects has he built?",
  "How can I contact Ansh?",
];

function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^### (.+)$/gm, '<strong>$1</strong>')
    .replace(/^## (.+)$/gm, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '• $1')
    .replace(/\n/g, '<br/>');
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const autoResize = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setLoading(true);

    // Placeholder for streaming assistant message
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error('API error');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: accumulated };
          return updated;
        });
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: '__error__',
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerTitle}>Chat</span>
        <div className={styles.headerActions}>
          <button className={styles.headerBtn} title="New Chat" onClick={() => setMessages([])}>
            <VscAdd size={14} />
          </button>
          <button className={styles.headerBtn} title="Settings">
            <VscSettingsGear size={14} />
          </button>
          <button className={styles.headerBtn} title="Split View">
            <VscSplitHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Sessions bar */}
      <div className={styles.sessionsBar}>
        <span className={styles.sessionsLabel}>Sessions</span>
        <div className={styles.sessionsActions}>
          <button className={styles.sessionBtn} title="Refresh" onClick={() => setMessages([])}>
            <VscRefresh size={12} />
          </button>
          <button className={styles.sessionBtn} title="Search">
            <VscSearch size={12} />
          </button>
          <button className={styles.sessionBtn} title="Filter">
            <VscFilter size={12} />
          </button>
        </div>
      </div>

      {/* Messages or welcome */}
      {isEmpty ? (
        <div className={styles.welcome}>
          <div className={styles.welcomeAvatar}>A</div>
          <h2 className={styles.welcomeTitle}>Ask Ansh&apos;s AI</h2>
          <p className={styles.welcomeSub}>
            Ask anything about Ansh — his experience, projects, skills, or how to reach him.
          </p>
          <div className={styles.suggestions}>
            {SUGGESTIONS.map(s => (
              <button key={s} className={styles.suggestion} onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.messages}>
          {messages.map((msg, i) => {
            const isUser = msg.role === 'user';
            const isStreaming = !isUser && loading && i === messages.length - 1;
            const isError = msg.content === '__error__';

            return (
              <div
                key={i}
                className={`${styles.message} ${isUser ? styles.messageUser : styles.messageAssistant}`}
              >
                <span className={styles.messageLabel}>{isUser ? 'You' : 'Ansh AI'}</span>
                {isError ? (
                  <div className={styles.errorBubble}>
                    Couldn&apos;t reach the AI. Please try again.
                  </div>
                ) : (
                  <div
                    className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAssistant}`}
                  >
                    {isUser ? (
                      msg.content
                    ) : (
                      <>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: parseMarkdown(msg.content),
                          }}
                        />
                        {isStreaming && msg.content === '' && (
                          <span className={styles.cursor} />
                        )}
                        {isStreaming && msg.content !== '' && (
                          <span className={styles.cursor} />
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      <div className={styles.inputArea}>
        <div className={styles.inputBox}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            placeholder="Ask anything about Ansh..."
            value={input}
            onChange={e => {
              setInput(e.target.value);
              autoResize();
            }}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={loading}
          />
          <button
            className={styles.sendBtn}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            title="Send (Enter)"
          >
            <VscSend size={14} />
          </button>
        </div>
        <div className={styles.inputToolbar}>
          <span className={styles.toolbarChip}>
            <VscSparkle size={11} />
            Ansh AI
          </span>
          <span className={styles.toolbarSep}>·</span>
          <span className={styles.toolbarChip}>Claude Haiku</span>
          <span className={styles.toolbarHint}>↵ send · ⇧↵ newline</span>
        </div>
      </div>
    </div>
  );
}
