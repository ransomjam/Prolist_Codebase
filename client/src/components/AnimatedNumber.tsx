import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedNumber({ value, duration = 1000, suffix = "" }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, duration]);

  const formatValue = (n: number) => {
    if (value >= 1000) {
      return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    }
    return n.toString();
  };

  return <span>{formatValue(display)}{suffix}</span>;
}
