import { useEffect, useState } from 'react';
import { Locale } from '../../enums';
import { TypewriterEffect } from '../styles/TypewriterComponents';

interface ITypewriter {
  text: string[]; // Array of strings to type
  fontSize: number;
  color: string;
  speed: number;
  locale: Locale;
}

const Typewriter = ({ text, color = "#333333", fontSize = 32, speed = 100, locale }: ITypewriter) => {
  const [displayedText, setDisplayedText] = useState('');
  const [stringIndex, setStringIndex] = useState(0); // Index for the current string
  const [charIndex, setCharIndex] = useState(0); // Index for the current character in the string

  useEffect(() => {
    setDisplayedText('');
    setCharIndex(0);
    setStringIndex(0); // Reset to first string when locale changes
  }, [locale]);

  useEffect(() => {
    if (text.length === 0) return; // Guard clause for empty text array

    if (charIndex < text[stringIndex].length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[stringIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Move to the next string after a delay
      const restartTimer = setTimeout(() => {
        setDisplayedText(''); // Clear the displayed text
        setCharIndex(0); // Reset character index
        setStringIndex(prev => (prev + 1) % text.length); // Move to next string, loop back to start
      }, speed); // Adjust delay before moving to the next string if needed

      return () => clearTimeout(restartTimer);
    }
  }, [charIndex, stringIndex, text, speed]);

  return (
    <TypewriterEffect
      color={color}
      $blinkerColor={color}
      fontSize={String(fontSize)}
    >
      {displayedText}
    </TypewriterEffect>
  );
};

export default Typewriter;
