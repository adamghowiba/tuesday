import { ReactElement, ReactNode, useEffect, useRef } from 'react';

export const useClickOutside = (callback: () => void) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (ref.current && !ref.current.contains(target)) callback();
    };

    document.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [ref, callback]);

  return ref;
};
