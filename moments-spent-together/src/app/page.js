// src/app/page.js
'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [timer, setTimer] = useState('00:00:00');
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const fetchStartTime = async () => {
      const response = await fetch('/api/start-time');
      const data = await response.json();
      setStartTime(data.startTime);
    };

    fetchStartTime();
  }, []);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMillis = now - startTime;
      const elapsedSeconds = Math.floor(elapsedMillis / 1000);

      let hrs = Math.floor(elapsedSeconds / 3600);
      let mins = Math.floor((elapsedSeconds % 3600) / 60);
      let secs = elapsedSeconds % 60;

      setTimer(
        `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div>
      <h1>Moments Spent Together</h1>
      <div id="timer">{timer}</div>
    </div>
  );
}
