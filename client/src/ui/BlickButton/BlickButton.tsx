import React, { useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import styles from './BlickButton.module.scss';
import Mic from '../../../public/Mic.svg?react';

export const BlickButton = () => {
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);

  const animateRipple = (e) => {
    const el = btnRef.current;
    const pos = el.getBoundingClientRect();

    setRipples((prevRipples) => [
      ...prevRipples,
      {
        x: e.clientX - pos.left,
        y: e.clientY - pos.top,
        show: true,
      },
    ]);
  };

  const rippleEnd = (index: number) => {
    setRipples((prevRipples) => {
      return prevRipples.map((val, i) => {
        if (i === index) {
          return { ...val, show: false };
        }
        return val;
      });
    });
  };

  return (
    <button type="button" className={styles['ti-btn']} ref={btnRef} onClick={animateRipple}>
      <TransitionGroup>
        {ripples.map((val, index) => (
          <span
            className={styles.ripple}
            key={index}
            style={{ top: `${val.y}px`, left: `${val.x}px` }}
            onAnimationEnd={() => rippleEnd(index)}
          />
        ))}
      </TransitionGroup>
      <Mic />
    </button>
  );
};
