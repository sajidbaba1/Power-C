'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// User images from public/slideshow and uploaded childhood photos
const IMAGES = [
    "/slideshow/1.jpg",
    "/slideshow/2.jpg",
    "/slideshow/3.jpg",
    "/slideshow/4.jpg",
    "/slideshow/5.jpg",
    "/slideshow/6.jpg",
    "/slideshow/7.jpg",
    "/slideshow/8.jpg",
    "https://res.cloudinary.com/dd431rll2/image/upload/v1768751651/power-couple-slideshow/childhood-1.jpg",
    "https://res.cloudinary.com/dd431rll2/image/upload/v1768751652/power-couple-slideshow/childhood-2.jpg",
    "https://res.cloudinary.com/dd431rll2/image/upload/v1768751720/power-couple-slideshow/memory-1.jpg",
    "https://res.cloudinary.com/dd431rll2/image/upload/v1768751722/power-couple-slideshow/memory-2.jpg",
    "https://res.cloudinary.com/dd431rll2/image/upload/v1768751723/power-couple-slideshow/memory-3.jpg",
    "https://res.cloudinary.com/dd431rll2/image/upload/v1768751725/power-couple-slideshow/memory-4.jpg",
    "https://res.cloudinary.com/dd431rll2/image/upload/v1768751819/power-couple-slideshow/memory-5.jpg",
    "https://res.cloudinary.com/dd431rll2/image/upload/v1768751821/power-couple-slideshow/memory-6.jpg",
    "https://res.cloudinary.com/dd431rll2/image/upload/v1768752033/power-couple-slideshow/memory-7.jpg",
    "https://res.cloudinary.com/dd431rll2/image/upload/v1768752034/power-couple-slideshow/memory-8.jpg"
];

export default function SlideshowBackground({ isPlaying }: { isPlaying: boolean }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % IMAGES.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, [isPlaying]);

    if (!isPlaying) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/70 z-10" />

            <AnimatePresence mode="popLayout">
                <motion.img
                    key={index}
                    src={IMAGES[index]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Love Memory"
                    onError={(e) => {
                        // Fallback if local image not found, use a placeholder
                        e.currentTarget.src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1920&auto=format&fit=crop";
                    }}
                />
            </AnimatePresence>
        </div>
    );
}
