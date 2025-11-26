import styles from "./FanAnimation.module.css";
import { useEffect, useRef } from "react";

export interface FanAnimationProps {
  power?: boolean;
  speed?: number;
}

function FanAnimation({ power = true, speed = 100 }: FanAnimationProps) {
  const fanRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);

  // 1. Store latest inputs in a ref so the animation loop can read them
  //    without needing to restart the useEffect
  const inputsRef = useRef<{ power: boolean; speed: number }>({ power, speed });

  // 2. Physics State (Mutable, does not trigger re-renders)
  const physicsRef = useRef<{
    currentSpeed: number;
    rotation: number;
  }>({
    currentSpeed: 0, // 0 to 100
    rotation: 0, // 0 to 360
  });

  // Constants
  const ACCELERATION = 0.5;
  const DECELERATION = 0.2;
  const MAX_RPM_FACTOR = 10; // Controls how fast it spins at max speed (100)

  // Update the input ref whenever props change
  useEffect(() => {
    inputsRef.current = { power, speed };
  }, [power, speed]);

  useEffect(() => {
    const animate = () => {
      // Read latest props from ref
      const { power, speed } = inputsRef.current;
      const state = physicsRef.current;

      const targetSpeed = power ? speed : 0;

      // --- PHYSICS LOGIC ---
      if (state.currentSpeed < targetSpeed) {
        // Speed Up
        state.currentSpeed = Math.min(
          state.currentSpeed + ACCELERATION,
          targetSpeed
        );
      } else if (state.currentSpeed > targetSpeed) {
        // Slow Down
        state.currentSpeed = Math.max(state.currentSpeed - DECELERATION, 0);
      }

      // --- ROTATION LOGIC ---
      if (state.currentSpeed > 0) {
        // Calculate rotation step based on speed and factor
        // Example: Speed 50 * Factor 10 = 500 / 60fps = ~8 degrees per frame
        const rotationStep = (state.currentSpeed * MAX_RPM_FACTOR) / 60;
        state.rotation = (state.rotation + rotationStep) % 360;

        // --- DIRECT DOM UPDATE ---
        if (fanRef.current) {
          fanRef.current.style.transform = `rotate(${state.rotation}deg)`;
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    // Start loop
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className={`${styles["fan-container"]}`} ref={fanRef}>
      <div className={`${styles["blade"]} ${styles["blade-1"]}`}></div>
      <div className={`${styles["blade"]} ${styles["blade-2"]}`}></div>
      <div className={`${styles["blade"]} ${styles["blade-3"]}`}></div>
      <div className={`${styles["blade"]} ${styles["blade-4"]}`}></div>
      <div className={styles.motor}></div>
    </div>
  );
}

export default FanAnimation;
