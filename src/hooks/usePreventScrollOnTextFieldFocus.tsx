import { useEffect } from "react";

export const usePreventScrollOnTextFieldFocus = () => {
  useEffect(() => {
    const inputFields = document.querySelectorAll<HTMLInputElement>('input, textarea');

    const handleFocus = () => {
      const scrollY = window.scrollY;

      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 0);
    };

    inputFields.forEach(input => {
      input.addEventListener('focus', handleFocus as EventListener);
    });

    return () => {
      inputFields.forEach(input => {
        input.removeEventListener('focus', handleFocus as EventListener);
      });
    };
  }, []);
};