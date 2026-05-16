import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function UzBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    let time = 0;

    // Zarrachalar soni
    for (let i = 0; i < 300; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1 + Math.random() * 2, 
        size: Math.random() * 1.5,
        offset: Math.random() * 150, 
        isSplash: Math.random() > 0.85, 
        vy: (Math.random() - 0.5) * 4, 
      });
    }

    const draw = () => {
      // XATONI TO'G'RILASH: Orqa fonni tozalashdan oldin neon soyani o'chiramiz!
      ctx.shadowBlur = 0; 
      
      // Endi fon haqiqiy qora (juda to'q ko'k/qora) bo'lib qoladi
      ctx.fillStyle = 'rgba(2, 5, 12, 0.2)'; 
      ctx.fillRect(0, 0, width, height);

      time += 0.005; 

      particles.forEach((p) => {
        p.x += p.speed;

        let flowY = height / 2 + 
                    Math.sin(p.x * 0.002 + time) * 150 + 
                    Math.cos(p.x * 0.001 - time * 0.5) * 100;

        if (p.isSplash) {
          p.y += p.vy;
          if (p.y < 0 || p.y > height) {
            p.x = 0;
            p.y = flowY;
            p.isSplash = Math.random() > 0.85; 
          }
        } else {
          p.y = flowY + Math.sin(p.x * 0.01) * p.offset;
        }

        if (p.x > width) {
          p.x = 0;
          p.y = flowY;
        }

        // Zarrachani chizishda yana neon soyani yoqamiz
        ctx.shadowBlur = p.isSplash ? 15 : 8;
        ctx.shadowColor = '#00d2ff';
        ctx.fillStyle = p.isSplash ? '#ffffff' : '#00d2ff'; 
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 w-full h-full bg-[#020308]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
      {/* Markazdagi xira, juda nozik yorug'lik */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.05)_0%,rgba(2,3,8,0)_60%)] z-0 pointer-events-none" />
    </motion.div>
  );
}