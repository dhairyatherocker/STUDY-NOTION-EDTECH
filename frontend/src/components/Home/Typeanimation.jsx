import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const codeLines = [
  "<!DOCTYPE html>",
  "<html>",
  "<head><title>Example</title></head>",
  '<link rel="stylesheet" href="styles.css">',
  "<body>",
  '<h1><a href="/">Header</a></h1>',
  "<nav>",
  '<a href="one/">One</a> <a href="two/">Two</a>',
  '<a href="three/">Three</a>',
  "</nav>",
  "</body>",
  "</html>",
];

const Typeanimation = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (lineIndex < codeLines.length) {
      if (charIndex < codeLines[lineIndex].length) {
        setTimeout(() => {
          setDisplayedText((prev) => prev + codeLines[lineIndex][charIndex]);
          setCharIndex(charIndex + 1);
        }, 50); // Speed of typing each character
      } else {
        setTimeout(() => {
          setDisplayedText((prev) => prev + "\n"); // Move to new line
          setLineIndex(lineIndex + 1);
          setCharIndex(0);
        }, 300); // Delay between lines
      }
    } else {
      setIsTyping(false); // Typing finished
    }
  }, [charIndex, lineIndex]);

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        color: "#ffcc66",
        fontFamily: "monospace",
        padding: "20px",
        borderRadius: "10px",
        width: "300px",
        minHeight: "300px",
        whiteSpace: "pre-wrap", // Keeps formatting
      }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5,  }}
      >
        {displayedText}
        {isTyping && "|"} {/* Blinking cursor */}
      </motion.span>
    </div>
  );
};

export default Typeanimation;
