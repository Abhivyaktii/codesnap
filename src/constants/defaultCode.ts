export const defaultCode = `// Welcome to CodeSnap! ✨
function createGradient(colors) {
  return colors
    .map((color, index) => {
      const stop = (index / (colors.length - 1)) * 100;
      return \`\${color} \${stop}%\`;
    })
    .join(', ');
}

// Create a beautiful gradient
const colors = [
  '#3B82F6',  // Blue
  '#8B5CF6',  // Violet
  '#6366F1'   // Indigo
];

const gradient = \`linear-gradient(
  135deg,
  \${createGradient(colors)}
)\`;

// Apply the gradient
element.style.background = gradient;`;