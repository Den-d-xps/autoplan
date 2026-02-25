import { useEffect, useRef, useState } from "react";
import type { IAnimatedStatusProps } from "./types";
import { AnimatedStatusUI } from "./animated-status-ui";


export const AnimatedStatus = ({
  message,
  animationDuration = 400,
}: IAnimatedStatusProps) => {
  const currentRef = useRef(message);
  const [current, setCurrent] = useState(message);
  const [prev, setPrev] = useState<string | null>(null);


  useEffect(() => {
    if (message !== currentRef.current) {
      setPrev(currentRef.current);
      currentRef.current = message;
      setCurrent(message);
      const timer = setTimeout(() => setPrev(null), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [message, animationDuration]);

  return (
    <AnimatedStatusUI 
      prev_message={prev}
      current_message={current}
      animationDuration={animationDuration}
    />
  )
}