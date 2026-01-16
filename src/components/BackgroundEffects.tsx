import React from 'react';
import { motion } from 'framer-motion';

export type EffectType = "snow" | "hearts" | "rain" | "none";

interface BackgroundEffectsProps {
    effect: EffectType;
}

export default function BackgroundEffects({ effect }: BackgroundEffectsProps) {
    if (effect === "none") return null;

    const getParticles = () => {
        const count = 30; // Number of particles
        const particles = [];

        for (let i = 0; i < count; i++) {
            const delay = Math.random() * 5;
            const duration = 5 + Math.random() * 5;
            const startLeft = Math.random() * 100;

            if (effect === "snow") {
                particles.push(
                    <motion.div
                        key={`snow-${i}`}
                        initial={{ y: -20, x: `${startLeft}vw`, opacity: 0 }}
                        animate={{
                            y: "110vh",
                            x: [`${startLeft}vw`, `${startLeft + (Math.random() * 10 - 5)}vw`],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
                        className="fixed top-0 text-white pointer-events-none z-0 text-opacity-80"
                        style={{ fontSize: `${10 + Math.random() * 20}px` }}
                    >
                        ❄️
                    </motion.div>
                );
            } else if (effect === "hearts") {
                particles.push(
                    <motion.div
                        key={`heart-${i}`}
                        initial={{ y: -20, x: `${startLeft}vw`, opacity: 0 }}
                        animate={{ y: "110vh", opacity: [0, 0.8, 0] }}
                        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
                        className="fixed top-0 text-red-500 pointer-events-none z-0"
                        style={{ fontSize: `${15 + Math.random() * 25}px` }}
                    >
                        ❤️
                    </motion.div>
                );
            } else if (effect === "rain") {
                particles.push(
                    <motion.div
                        key={`rain-${i}`}
                        initial={{ y: -20, x: `${startLeft}vw`, opacity: 0 }}
                        animate={{ y: "110vh", opacity: [0, 0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay }}
                        className="fixed top-0 w-[2px] h-[20px] bg-blue-300 pointer-events-none z-0 opacity-50"
                        style={{ left: `${startLeft}vw` }}
                    />
                );
            }
        }
        return particles;
    };

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
            {getParticles()}
        </div>
    );
}
