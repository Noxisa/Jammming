import { useState, useRef, useEffect } from "react";
import { SpotifyTrack } from "@/lib/spotify";
import { TrackList } from "./TrackList";
import { Button } from "@/components/ui/button";
import { Loader2, Edit3, Music } from "lucide-react";

interface PlaylistProps {
  playlistName: string;
  onNameChange: (name: string) => void;
  playlistTracks: SpotifyTrack[];
  onRemove: (track: SpotifyTrack) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function Playlist({
  playlistName,
  onNameChange,
  playlistTracks,
  onRemove,
  onSave,
  isSaving,
}: PlaylistProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (!playlistName.trim()) {
      onNameChange("New Playlist");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

      <div className="relative mb-6 group flex items-center gap-3">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={playlistName}
            onChange={(e) => onNameChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="text-4xl font-extrabold bg-transparent border-b-2 border-primary outline-none px-0 py-1 w-full text-white placeholder:text-white/30"
            placeholder="Name your playlist"
          />
        ) : (
          <h2
            className="text-4xl font-extrabold cursor-pointer hover:text-primary transition-colors truncate"
            onClick={() => setIsEditing(true)}
            title="Click to rename"
          >
            {playlistName}
          </h2>
        )}
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-muted-foreground hover:text-white rounded-full hover:bg-white/10"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
        {playlistTracks.length > 0 ? (
          <TrackList
            tracks={playlistTracks}
            onRemove={onRemove}
            isRemoval={true}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm flex-col gap-4 opacity-50">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <Music className="w-8 h-8" />
            </div>
            <p>Your playlist is empty</p>
          </div>
        )}
      </div>

      <div className="pt-6 mt-2 border-t border-white/10 relative z-10">
        <Button
          onClick={onSave}
          disabled={playlistTracks.length === 0 || isSaving}
          className="w-full h-14 rounded-full text-base font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(32,111,60,0.4)] hover:shadow-[0_0_30px_rgba(32,111,60,0.6)] transition-all disabled:shadow-none"
          size="lg"
        >
          {isSaving ? (
            <><Loader2 className="animate-spin mr-2 h-5 w-5" /> SAVING...</>
          ) : (
            "SAVE TO SPOTIFY"
          )}
        </Button>
      </div>
    </div>
  );
}
