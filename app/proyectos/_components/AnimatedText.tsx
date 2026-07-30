"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ visibility: "hidden" }}>{char}</span>
      <motion.span style={{ position: "absolute", left: 0, top: 0, opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

/** Character-by-character scroll-reveal paragraph (opacity 0.2 -> 1). */
export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => {
        if (char === " ") {
          return <span key={i}> </span>;
        }
        const start = i / chars.length;
        const end = start + 1 / chars.length;
        return (
          <Char key={i} char={char} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </p>
  );
}
