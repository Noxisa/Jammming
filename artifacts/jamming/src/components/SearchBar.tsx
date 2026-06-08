import { useState, useEffect, useCallback } from "react";
import { Search, Loader2, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export function SearchBar({ onSearch, isSearching }: SearchBarProps) {
  const [term, setTerm] = useState("");

  const handleSearch = useCallback(() => {
    if (term.trim()) {
      onSearch(term);
    }
  }, [term, onSearch]);

  return (
    <div className="flex w-full max-w-lg items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for songs, artists, or albums..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="pl-10 h-12 text-lg bg-white/5 border-white/10 focus-visible:ring-primary placeholder:text-muted-foreground rounded-full"
        />
      </div>
      <Button 
        onClick={handleSearch} 
        disabled={isSearching || !term.trim()}
        className="h-12 px-8 rounded-full font-bold tracking-wide"
      >
        {isSearching ? <Loader2 className="animate-spin h-5 w-5" /> : "SEARCH"}
      </Button>
    </div>
  );
}
