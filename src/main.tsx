  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  import Lenis from 'lenis';
  import 'lenis/dist/lenis.css';

  // --- KINETIC SMOOTH SCROLL (LENIS) ---
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Expose Lenis for global control (e.g. Scroll Reset on Route Change)
  (window as any).lenis = lenis;

  createRoot(document.getElementById("root")!).render(<App />);
  