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

    const launchAnimation = () => {
      gsap.to(boxRef.current, {
        y: '-200vh',
        rotation: -45,
        scale: 0,
        duration: 3,
        ease: 'power4.in',
        onComplete: () => {
          gsap.set(boxRef.current, {
            y: 0,
            rotation: 0,
            scale: 1,
          });
          timeline.restart();
        }
      });
    };

    window.addEventListener('timerComplete', launchAnimation);

    return () => {
      window.removeEventListener('timerComplete', launchAnimation);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div
        ref={boxRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-xl transform rotate-3">
          <div
            ref={catRef}
            className="relative w-full h-full overflow-hidden rounded-lg"
          >
            <img
              src="https://raw.githubusercontent.com/rkazula/aiautomationdays/master/assets/kotek.jpg"
              alt="Cat in Space"
              className="absolute inset-0 w-full h-full object-cover transform -rotate-3"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};