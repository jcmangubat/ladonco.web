import { useState, useEffect, useRef } from 'react';

export const useIsotope = () => {
  const [activeFilter, setActiveFilter] = useState<string>('*');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.item');
      
      // First, mark all items as hidden
      items.forEach(item => {
        item.classList.remove('visible');
        item.classList.add('hidden');
      });
      
      // Then, show the filtered items
      setTimeout(() => {
        items.forEach(item => {
          if (activeFilter === '*' || item.classList.contains(activeFilter.substring(1))) {
            item.classList.remove('hidden');
            item.classList.add('visible');
          }
        });
      }, 10);
    }
  }, [activeFilter]);

  return { containerRef, activeFilter, handleFilterClick };
};