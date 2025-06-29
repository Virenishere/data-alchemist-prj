'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useData } from '@/contexts/data-context';
import { useState } from 'react';

export function Header() {
  const { searchData } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = searchData(searchQuery);
      console.log('Search results:', results);
    }
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search your data with natural language..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            Welcome to Data Alchemist
          </div>
        </div>
      </div>
    </header>
  );
}