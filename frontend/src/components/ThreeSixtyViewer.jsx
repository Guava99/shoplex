import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Hand, Maximize2, Minimize2, Zap } from 'lucide-react';

const ThreeSixtyViewer = ({ images = [] }) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const containerRef = useRef(null);
    const frameRef = useRef(0);
    const targetFrameRef = useRef(0);
    const velocityRef = useRef(0);
    const lastXRef = useRef(0);
    const rafRef = useRef(null);

    if (!images || images.length === 0) return null;

    const totalFrames = images.length;

    const updateFrame = (newFrame) => {
        const wrappedFrame = (Math.round(newFrame) % totalFrames + totalFrames) % totalFrames;
        if (wrappedFrame !== currentFrame) {
            setCurrentFrame(wrappedFrame);
            frameRef.current = wrappedFrame;
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        const x = e.touches ? e.touches[0].pageX : e.pageX;
        lastXRef.current = x;
        velocityRef.current = 0;

        
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (!isDragging) return;

            const x = e.touches ? e.touches[0].pageX : e.pageX;
            const diff = (lastXRef.current - x) * 0.2; 

            velocityRef.current = diff;
            targetFrameRef.current += diff;

            updateFrame(targetFrameRef.current);
            lastXRef.current = x;
        };

        const handleGlobalMouseUp = () => {
            if (!isDragging) return;
            setIsDragging(false);

            
            const animateInertia = () => {
                if (Math.abs(velocityRef.current) > 0.01) {
                    targetFrameRef.current += velocityRef.current;
                    velocityRef.current *= 0.95; 
                    updateFrame(targetFrameRef.current);
                    rafRef.current = requestAnimationFrame(animateInertia);
                }
            };
            rafRef.current = requestAnimationFrame(animateInertia);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleGlobalMouseMove);
            window.addEventListener('mouseup', handleGlobalMouseUp);
            window.addEventListener('touchmove', handleGlobalMouseMove, { passive: false });
            window.addEventListener('touchend', handleGlobalMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('touchmove', handleGlobalMouseMove);
            window.removeEventListener('touchend', handleGlobalMouseUp);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isDragging, totalFrames]);

   
    useEffect(() => {
     
    }, []);

    return (
        <div className={`flex flex-col items-center gap-6 w-full transition-all duration-500 ${isFullScreen ? 'fixed inset-0 z-[100] bg-white p-10 overflow-hidden' : 'animate-fade-in'}`}>
            <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                className={`relative cursor-grab active:cursor-grabbing modern-card overflow-hidden group w-full flex items-center justify-center bg-white border-2 border-amber-100 transition-all duration-500 ${isFullScreen ? 'h-full aspect-auto' : 'aspect-square md:aspect-[4/3]'}`}
            >
                <img
                    key={currentFrame}
                    src={images[currentFrame]}
                    alt="Product 360 View"
                    className="w-full h-full object-contain select-none pointer-events-none transition-opacity duration-200"
                />

              
                <div className="three-sixty-badge absolute top-4 left-4 flex items-center gap-2 bg-amber-800 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">
                    <Zap size={12} className="text-yellow-400 fill-yellow-400" />
                    Interactive 3D Mode
                </div>

                
                <button
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-xl text-amber-800 hover:bg-amber-800 hover:text-white transition-all shadow-lg z-10"
                >
                    {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>

             
                <div className={`absolute inset-0 bg-black/5 flex items-center justify-center transition-opacity duration-500 ${isDragging ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}>
                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-2 scale-90 group-hover:scale-110 transition-transform">
                        <Hand className="text-amber-800 animate-bounce" size={32} />
                        <p className="text-[10px] font-black text-amber-900 uppercase tracking-tighter">Drag to Rotate</p>
                    </div>
                </div>

                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-amber-100 shadow-2xl">
                    <div className="flex gap-1.5">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 rounded-full transition-all duration-300 ${index === currentFrame ? 'w-6 bg-amber-600' : 'w-1 bg-amber-200'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {!isFullScreen && (
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs text-amber-900 font-black uppercase tracking-[0.2em] opacity-60">
                        High Fidelity 360 Degree Inspection
                    </p>
                    <div className="h-0.5 w-12 bg-orange-200 rounded-full" />
                </div>
            )}
        </div>
    );
};

export default ThreeSixtyViewer;
