/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Confetti: React.FC = () => {
  useEffect(() => {
    // Launch confetti when the component mounts
    const duration = 5 * 1000; // 5 seconds
    const animationEnd = Date.now() + duration;

    const interval: any = setInterval(() => {
      if (Date.now() > animationEnd) {
        return clearInterval(interval);
      }


      confetti({
        particleCount: 200,
        startVelocity: 30,
        spread: 360,
        ticks: 100,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5,
        },
      });
    }, 250); // Burst every 250ms

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default Confetti;
