import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { getRecentCommits } from "../github/getRecentCommits";
import Planet from "./Planet";

const Stars = ({ recentCommits }) => {
  const starRef = useRef();

  const randomStars = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 1000; i++) {
      stars.push({
        pos: [
          THREE.MathUtils.randFloatSpread(300),
          THREE.MathUtils.randFloatSpread(300),
          THREE.MathUtils.randFloatSpread(300),
        ],
        size: 0.1,
        color: "white",
      });
    }
    return stars;
  }, []);

  useFrame(() => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={starRef}>
      {randomStars.map((star, i) => (
        <mesh key={i} position={star.pos}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshBasicMaterial color={star.color} />
        </mesh>
      ))}
    </group>
  );
};

const GalaxyMap = () => {
  const [recentCommits, setRecentCommits] = useState([]);
  const [selectedCommits, setSelectedCommits] = useState(null);

  useEffect(() => {
    getRecentCommits("jinyorjin").then(setRecentCommits);
  }, []);

  const hasStreak = recentCommits.every((day) => day.commits > 0);

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 60], fov: 65 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          background: "black",
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.0} color="#a29bfe" />
        <OrbitControls enableZoom={false} />
        <Stars recentCommits={recentCommits} />

        {recentCommits.map((day, i) => {
          const size = 0.6 + day.commits * 0.2;
          const x = Math.sin(i) * 10;
          const y = Math.cos(i) * 10 - 15;
          const z = i * 2;

          return (
            <Planet
              key={i}
              size={size}
              position={[x, y, z]}
              hasRing={true}
              onClick={() =>
                setSelectedCommits({
                  date: day.date,
                  messages: day.messages || [],
                })
              }
            />
          );
        })}
      </Canvas>
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="twinkle-star"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            position: "fixed",
            width: "2px",
            height: "2px",
            backgroundColor: "white",
            borderRadius: "50%",
            animation: "twinkle 3s ease-in-out infinite",
            animationDelay: `${Math.random() * 3}s`,
            zIndex: -2,
          }}
        />
      ))}

      {selectedCommits && (
        <div
          className="commit-log"
          style={{
            position: "fixed",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.85)",
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
            zIndex: 10,
            width: "90%",
            maxWidth: "400px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            fontFamily: "monospace",
            fontSize: "14px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>🪐 Commits on {selectedCommits.date}</h3>
          {selectedCommits.messages.length > 0 ? (
            <ul style={{ paddingLeft: "20px" }}>
              {selectedCommits.messages.map((msg, idx) => (
                <li key={idx}>• {msg}</li>
              ))}
            </ul>
          ) : (
            <p>No commit messages.</p>
          )}

          <button
            onClick={() => setSelectedCommits(null)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "#444",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            ✖
          </button>
        </div>
      )}
    </>
  );
};

export default GalaxyMap;
