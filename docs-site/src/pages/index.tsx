import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const nodes: { x: number, y: number, vx: number, vy: number, radius: number, label: string }[] = [];
    const numNodes = 120;
    const words = ["AI", "Agents", "CLI", "Terminal", "Gemini", "MCP", "Context", "Tools", "Skills", "Extensions", "Memory"];

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 3 + 2,
        label: i % 10 === 0 ? words[Math.floor(Math.random() * words.length)] : ""
      });
    }

    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          node.x -= dx * 0.015;
          node.y -= dy * 0.015;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 191, 255, 0.9)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 191, 255, 0.5)';
        ctx.fill();

        if (node.label) {
          ctx.font = '12px Poppins, sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillText(node.label, node.x + 8, node.y + 4);
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 191, 255, ${1 - dist / 150})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0, 
        background: 'radial-gradient(circle at center, #1a1a2e 0%, #0f0f1a 100%)' 
      }} 
    />
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Gemini CLI Documentation">
      <main style={{ position: 'relative', width: '100vw', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
        <KnowledgeGraph />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          textAlign: 'center',
          color: 'white',
          pointerEvents: 'none',
          fontFamily: 'Poppins, sans-serif'
        }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 700, marginBottom: '1rem', textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>
            Gemini CLI
          </h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '2.5rem', opacity: 0.9, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            {siteConfig.tagline}
          </p>
          <div style={{ pointerEvents: 'auto' }}>
            <Link
              className="button button--primary button--lg"
              to="/docs/"
              style={{ 
                borderRadius: '50px', 
                padding: '16px 40px', 
                fontWeight: 600, 
                fontSize: '1.2rem', 
                boxShadow: '0 6px 20px rgba(0,191,255,0.4)', 
                background: 'linear-gradient(90deg, #007acc, #00bfff)', 
                border: 'none',
                color: '#fff',
                textDecoration: 'none'
              }}>
              Explore Documentation
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
