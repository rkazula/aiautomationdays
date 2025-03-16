import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const SpaceCat = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current || !catRef.current) return;

    const timeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    timeline
      .to(boxRef.current, {
        y: '-=20',
        rotation: -5,
        duration: 2,
        ease: 'power1.inOut',
      })
      .to(catRef.current, {
        y: '-=10',
        rotation: 3,
        duration: 1.5,
        ease: 'power1.inOut',
      }, '-=2');

    // Add launch animation when timer reaches zero
    const launchAnimation = () => {
      gsap.to(boxRef.current, {
        y: '-200vh',
        rotation: -45,
        scale: 0,
        duration: 3,
        ease: 'power4.in',
        onComplete: () => {
          // Reset position after launch
          gsap.set(boxRef.current, {
            y: 0,
            rotation: 0,
            scale: 1,
          });
          timeline.restart();
        }
      });
    };

    // Listen for custom event from Timer component
    window.addEventListener('timerComplete', launchAnimation);

    return () => {
      window.removeEventListener('timerComplete', launchAnimation);
    };
  }, []);

  return (
    <div className="relative w-64 h-64">
      <div 
        ref={boxRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-32 h-32 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-xl transform rotate-3">
          <div 
            ref={catRef}
            className="relative w-full h-full"
          >
            <img 
              src="assets/kotek.jpg"
              alt="Cat in Space"
              className="absolute inset-0 w-full h-full object-cover rounded-lg transform -rotate-3"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}