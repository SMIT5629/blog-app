import React from 'react';

export const MarkdownRenderer = ({ content = '' }) => {
  if (!content) return null;

  // Simple, safe, resilient markdown parser to avoid heavy external dependencies
  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeBuffer = [];

  lines.forEach((line, index) => {
    // Code block detection
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${index}`}
            className="my-6 p-4 rounded-xl bg-zinc-900 text-zinc-100 dark:bg-zinc-950 font-mono text-xs overflow-x-auto border border-zinc-800"
          >
            <code>{codeBuffer.join('\n')}</code>
          </pre>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    const trimmed = line.trim();

    if (!trimmed) {
      return;
    }

    // Headers
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1
          key={index}
          className="font-serif font-bold text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 mt-10 mb-4 tracking-tight"
        >
          {trimmed.slice(2)}
        </h1>
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h2
          key={index}
          className="font-sans font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 mt-8 mb-3 tracking-tight"
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        <h3
          key={index}
          className="font-sans font-semibold text-xl text-zinc-900 dark:text-zinc-100 mt-6 mb-2"
        >
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote
          key={index}
          className="my-6 border-l-4 border-zinc-900 dark:border-zinc-400 pl-4 py-1 italic font-serif text-lg text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-r-lg"
        >
          {trimmed.slice(2)}
        </blockquote>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      elements.push(
        <li
          key={index}
          className="ml-6 list-disc font-serif text-base sm:text-lg text-zinc-800 dark:text-zinc-200 mb-1 leading-relaxed"
        >
          {trimmed.slice(2)}
        </li>
      );
    } else if (trimmed.startsWith('![')) {
      // Image detection ![alt](url)
      const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        elements.push(
          <div key={index} className="my-8">
            <img
              src={match[2]}
              alt={match[1]}
              className="rounded-xl w-full object-cover max-h-[500px] shadow-sm"
            />
            {match[1] && (
              <p className="text-center text-xs text-zinc-500 mt-2 italic font-sans">
                {match[1]}
              </p>
            )}
          </div>
        );
      }
    } else {
      elements.push(
        <p
          key={index}
          className="font-serif text-lg sm:text-[1.18rem] text-zinc-800 dark:text-zinc-200 leading-[1.85] mb-6 font-normal tracking-[0.01em]"
        >
          {trimmed}
        </p>
      );
    }
  });

  return <div className="article-prose select-text">{elements}</div>;
};
