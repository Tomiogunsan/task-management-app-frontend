import { RefObject, useCallback, useEffect, useState } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Args,
  // eslint-disable-next-line no-unused-vars
  callback?: (entry: IntersectionObserverEntry) => void,
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = useCallback(
    ([entryItem]: IntersectionObserverEntry[]): void => {
      setEntry(entryItem);
      callback?.(entryItem);
    },
    [callback],
  );

  useEffect(() => {
    const node = elementRef?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    let observer: IntersectionObserver | undefined;
    if (!(!hasIOSupport || frozen || !node)) {
      const observerParams = { threshold, root, rootMargin };
      observer = new IntersectionObserver(updateEntry, observerParams);

      observer.observe(node);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [elementRef, threshold, root, rootMargin, frozen, updateEntry]);

  return entry;
}

export default useIntersectionObserver;
