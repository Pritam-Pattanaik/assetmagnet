import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [node, setNode] = useState<Element | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const isEqual = observer.current?.root === root &&
      observer.current?.rootMargin === rootMargin &&
      observer.current?.thresholds[0] === threshold;

    if (observer.current && isEqual) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new window.IntersectionObserver(updateEntry, observerParams);
    observer.current.observe(node);

    return () => observer.current?.disconnect();
  }, [node, threshold, root, rootMargin, frozen]);

  const ref = (element: Element | null) => {
    setNode(element);
  };

  return { ref, entry, isIntersecting: !!entry?.isIntersecting };
}
