import React from 'react';
import { getCategoryBadgeStyle } from '../../utils/helpers';

export const Badge = ({ children, category, className = '' }) => {
  const categoryStyle = category ? getCategoryBadgeStyle(category) : 'bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border uppercase ${categoryStyle} ${className}`}
    >
      {children}
    </span>
  );
};
