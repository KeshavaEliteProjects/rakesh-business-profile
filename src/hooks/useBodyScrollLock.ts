import { useEffect } from 'react';

/**
 * Freezes background scrolling while an overlay (mobile menu, modal) is open.
 *
 * iOS Safari ignores `overflow: hidden` on <body>, so the body is pinned with
 * `position: fixed` at its current offset and the scroll position is restored
 * on unlock. Desktop gets padding equal to the scrollbar width so the page
 * doesn't jump sideways when the scrollbar is removed.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement: html } = document;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      body.style.paddingRight = previous.paddingRight;

      // `html` has smooth scrolling; restoring the offset must be instant or
      // the page visibly glides back to where it already was.
      const previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = previousBehavior;
    };
  }, [locked]);
}
