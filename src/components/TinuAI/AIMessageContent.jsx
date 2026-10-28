import React from 'react';

/**
 * Lightweight, safe formatter for assistant responses:
 * Handles headers (###), bold (**text**), italics (*text*), bullet points (• or -), and links ([text](url)).
 */
export const AIMessageContent = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');

  const renderInlineFormatted = (text) => {
    // Process markdown links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];
      parts.push(
        <a
          key={match.index}
          href={url}
          target={url.startsWith('mailto:') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="text-cyan-400 underline hover:text-cyan-300 font-mono transition-colors"
        >
          {label}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    // Now format bold and italics in parts
    return parts.map((part, pIdx) => {
      if (typeof part !== 'string') return part;

      // Handle bold **text**
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**')) {
          const inner = bPart.slice(2, -2);
          return (
            <strong key={`${pIdx}-${bIdx}`} className="text-white font-semibold">
              {inner}
            </strong>
          );
        }

        // Handle italics *text*
        const italicParts = bPart.split(/(\*[^*]+\*)/g);
        return italicParts.map((iPart, iIdx) => {
          if (iPart.startsWith('*') && iPart.endsWith('*')) {
            return (
              <em key={`${pIdx}-${bIdx}-${iIdx}`} className="text-cyan-200/90 italic">
                {iPart.slice(1, -1)}
              </em>
            );
          }
          return iPart;
        });
      });
    });
  };

  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-200">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Headers: ### Title
        if (trimmed.startsWith('### ')) {
          return (
            <h4
              key={idx}
              className="font-heading text-sm sm:text-base font-bold text-cyan-400 tracking-wide pt-1 pb-0.5 border-b border-cyan-500/20"
            >
              {trimmed.slice(4)}
            </h4>
          );
        }

        // Bullet points: • or -
        if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
          const bulletContent = trimmed.slice(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-cyan-400 select-none text-xs mt-1">▸</span>
              <div className="flex-1">{renderInlineFormatted(bulletContent)}</div>
            </div>
          );
        }

        return <p key={idx}>{renderInlineFormatted(trimmed)}</p>;
      })}
    </div>
  );
};
