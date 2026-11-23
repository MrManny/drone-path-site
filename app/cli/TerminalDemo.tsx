'use client';

import { useEffect, useState } from 'react';
import styles from './TerminalDemo.module.css';

export type TerminalExample = {
  note?: string;
  command: string;
  processing: string;
  result: string;
};

const typingInterval = 24;
const processingTime = 800;
const resultTime = 450;
const replayDelay = 10_000;

export function TerminalDemo({ label, examples }: {
  label: string;
  examples: TerminalExample[];
}) {
  const [elapsed, setElapsed] = useState<number | null>(null);
  let duration = 0;
  const steps = examples.map((example) => {
    const start = duration;
    const submitted = start + example.command.length * typingInterval;
    const completed = submitted + processingTime;
    duration = completed + resultTime;
    return { ...example, start, submitted, completed };
  });
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number;

    function play() {
      const started = performance.now();

      function tick() {
        const time = performance.now() - started;
        if (time >= duration) {
          setElapsed(duration);
          timer = window.setTimeout(play, replayDelay - resultTime);
          return;
        }

        setElapsed(time);
        timer = window.setTimeout(tick, typingInterval);
      }

      tick();
    }

    function updatePlayback() {
      window.clearTimeout(timer);
      if (motion.matches) {
        setElapsed(null);
      } else {
        timer = window.setTimeout(play, 0);
      }
    }

    updatePlayback();
    motion.addEventListener('change', updatePlayback);
    return () => {
      window.clearTimeout(timer);
      motion.removeEventListener('change', updatePlayback);
    };
  }, [duration]);

  const time = elapsed ?? duration;
  return (
    <div className={styles.terminal} role="region" aria-label={label}>
      <div className={styles.toolbar}>Terminal</div>
      <div className={styles.transcript}>
        {steps.map(({ note, command, processing, result, start, submitted, completed }) => {
          const typing = time >= start && time < submitted;
          return (
            <div className={time < start ? styles.hidden : undefined} key={command}>
              {note && <div className={styles.note}>{note}</div>}
              <div className={styles.command}>
                <span className={styles.prompt} aria-hidden="true">$</span>
                <div className={styles.input}>
                  <code className={typing || time < start ? styles.hidden : undefined}>{command}</code>
                  {typing && (
                    <code aria-hidden="true">
                      {command.slice(0, Math.floor((time - start) / typingInterval))}
                      <span className={styles.cursor} />
                    </code>
                  )}
                </div>
              </div>
              <div className={time < submitted ? styles.hidden : styles.processing}>{processing}</div>
              <div className={time < completed ? styles.hidden : styles.result}>{result}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
