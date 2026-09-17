"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpStatProps {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}

function parseStatValue(value: string) {
  const match = value.trim().match(/^([^0-9.-]*)(-?[\d,.]+)(.*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, numberPart, suffix] = match;

  const cleanNumber = numberPart.replace(/,/g, "");
  const target = Number(cleanNumber);

  if (Number.isNaN(target)) {
    return null;
  }

  const decimalPlaces = cleanNumber.includes(".")
    ? cleanNumber.split(".")[1].length
    : 0;

  return {
    prefix,
    target,
    suffix,
    decimalPlaces,
  };
}

export default function CountUpStat({
  value,
  duration = 1600,
  delay = 0,
  className = "",
}: CountUpStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const parsed = parseStatValue(value);

    if (!parsed) {
      setDisplayValue(value);
      return;
    }

    const {
      prefix,
      target,
      suffix,
      decimalPlaces,
    } = parsed;

    const formatValue = (number: number) => {
      const formattedNumber = number.toLocaleString("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      });

      return `${prefix}${formattedNumber}${suffix}`;
    };

    setDisplayValue(formatValue(0));

    const element = ref.current;

    if (!element) {
      return;
    }

    // Respect reduced-motion preference.
    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      setDisplayValue(formatValue(target));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) {
          return;
        }

        setStarted(true);
        observer.disconnect();

        window.setTimeout(() => {
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;

            const progress = Math.min(
              elapsed / duration,
              1
            );

            // Smooth ease-out animation.
            const eased =
              1 - Math.pow(1 - progress, 3);

            const currentValue =
              target * eased;

            const roundedValue =
              decimalPlaces > 0
                ? Number(
                    currentValue.toFixed(
                      decimalPlaces
                    )
                  )
                : Math.round(currentValue);

            setDisplayValue(
              formatValue(roundedValue)
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(
                formatValue(target)
              );
            }
          };

          requestAnimationFrame(animate);
        }, delay);
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, duration, delay, started]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={value}
    >
      {displayValue}
    </span>
  );
}