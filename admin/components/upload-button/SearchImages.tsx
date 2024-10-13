import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import Input from "../input";
import { Photo } from "pexels";
import imageSearch from "@/api/pexels/search";

const DEBOUNCE_TIME = 500;
const PLACEHOLDER_COUNT = 12;
export default function SearchImages({ onSelect }: {
    onSelect: (image: string) => void;
}) {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<Photo[]>([]);

    const timeout = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = () => {
        if(timeout.current) clearTimeout(timeout.current);
        if(!search) {
            setResults([]);
            return;
        }

        setLoading(true);
        timeout.current = setTimeout(async () => {
            const images = await imageSearch(search);

            setResults(images);
            setLoading(false);
        }, DEBOUNCE_TIME);
    }
    useEffect(handleSearch, [search]);
    
    return(
        <motion.div 
            className="z-20 absolute top-0 left-0 w-full bg-primary border-[1px] border-tertiary shadow-lg rounded-md"
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .95 }}
        >
            <Input 
                placeholder="Search images"
                className="w-full border-none"
                onChange={setSearch}
                autoFocus
            />

            <div className="max-h-[400px] p-3 grid grid-cols-2 gap-2 border-t-[1px] border-t-tertiary overflow-auto">
                {!search && (
                    <div className="py-2 col-span-2 text-center text-sm text-muted">
                        Start typing to search images
                    </div>
                )}
                {loading && (
                    Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
                        <div key={i} className="bg-secondary w-full aspect-video rounded-md animate-pulse"></div>
                    ))
                )}
                {!loading && results.map(photo => (
                    <button 
                        onClick={() => onSelect(photo.src.original)}
                        className="w-full aspect-video rounded-md overflow-hidden"
                        type="button"
                        key={photo.id}
                    >
                        <img 
                            src={photo.src.medium}
                            className="w-full aspect-video object-cover hover:scale-105 transition-transform"
                            alt={photo.alt || photo.photographer}
                        />
                    </button>
                ))}
            </div>
        </motion.div>
    )
}