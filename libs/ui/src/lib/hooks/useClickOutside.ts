import { ReactElement, ReactNode, useEffect, useRef } from 'react';

export const useClickOutside = (callback: () => void) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      event.stopPropagation();
      if (!ref || !ref.current) return;

      if (!ref.current.contains(target)) callback();
    };

    document.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [ref, callback]);

  return ref;
};

export const useClickAway = (
  elements: (HTMLElement | null)[] | HTMLElement,
  callback: () => void
) => {
  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        Array.isArray(elements) &&
        elements.every((elem) => !elem?.contains(target))
      )
        return callback();

      if (!Array.isArray(elements) && elements && !elements.contains(target))
        return callback;
    };

    document.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [callback, elements]);
};
