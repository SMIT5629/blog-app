import React from 'react';

export const CategoryFilterPills = ({ activeCategory, onSelectCategory, categories = [] }) => {
  const defaultCategories = [
    { id: 'ALL', label: 'All Essays' },
    { id: 'TECH', label: 'Technology' },
    { id: 'LIFESTYLE', label: 'Lifestyle' },
    { id: 'TRAVEL', label: 'Travel' },
    { id: 'FOOD', label: 'Food & Wine' },
    { id: 'OTHER', label: 'Essays & Other' },
  ];

  const list = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1">
      {list.map((cat) => {
        const isActive = (activeCategory || 'ALL').toUpperCase() === cat.id.toUpperCase();
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm scale-105'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
