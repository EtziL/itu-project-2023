/**
 * Particles comming up from the bottom of the screen
 *
 * Author: Etzler Lukáš (xetzle00)
 */
import React from "react";

const Particles = () => {
    const generateParticles = () => {
        let particles = [];
        for (let i = 0; i < 20; i++) {
            particles.push(
                <div
                    key={i}
                    className="absolute w-4 h-4 animate-flyUp top-full bg-white"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random()}s`,
                    }}
                ></div>
            );
        }
        return particles;
    };

    return <div>{generateParticles()}</div>;
};

export default Particles;
