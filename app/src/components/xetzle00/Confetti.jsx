import ReactCanvasConfetti from "react-canvas-confetti";
import { useEffect, useRef } from "react";

const Confetti = ({ gameWin }) => {
    const animationInstanceRef = useRef(null);

    const makeShot = (particleRatio, opts) => {
        animationInstanceRef.current &&
            animationInstanceRef.current({
                ...opts,
                origin: { y: 0.7 },
                particleCount: Math.floor(200 * particleRatio),
            });
    };

    const fire = () => {
        makeShot(0.5, {
            spread: 26,
            startVelocity: 55,
        });

        makeShot(0.4, {
            spread: 60,
        });

        makeShot(0.7, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        makeShot(0.2, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        makeShot(0.2, {
            spread: 120,
            startVelocity: 45,
        });
    };

    const setInstance = (instance) => {
        animationInstanceRef.current = instance;
    };

    useEffect(() => {
        if (gameWin) {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    fire();
                }, i * 400);
            }
        }
    }, [gameWin]);

    return <ReactCanvasConfetti refConfetti={setInstance} className="w-full left-0 right-0 pointer-events-none fixed top-0 z-10" />;
};

export default Confetti;
