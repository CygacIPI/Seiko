import { useEffect, useState, useRef } from "react";
import { BACKGROUND_MUSIC_URLS } from "../config/music";
import { ArrowNote } from "../components/ArrowNote";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showDifficultySelect, setShowDifficultySelect] =
    useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard" | "insane" | "expert"
  >("easy");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [volume, setVolume] = useState(50);
  const [controls, setControls] = useState({
    left: "D",
    up: "F",
    down: "J",
    right: "K",
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    // Iniciar música de fondo
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    // Reproducir música aleatoria al inicio
    if (BACKGROUND_MUSIC_URLS.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * BACKGROUND_MUSIC_URLS.length,
      );
      setCurrentSongIndex(randomIndex);
    }
  }, []);

  const handleSongEnd = () => {
    const nextIndex =
      (currentSongIndex + 1) % BACKGROUND_MUSIC_URLS.length;
    setCurrentSongIndex(nextIndex);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const openTutorial = () => {
    setShowDifficultySelect(true);
  };

  const startTutorial = (
    difficulty:
      | "easy"
      | "medium"
      | "hard"
      | "insane"
      | "expert",
  ) => {
    setSelectedDifficulty(difficulty);
    setShowDifficultySelect(false);
    setShowTutorial(true);
  };

  const closeTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <div className="size-full relative overflow-hidden bg-black">
      {/* Audio de fondo */}
      {BACKGROUND_MUSIC_URLS.length > 0 &&
        BACKGROUND_MUSIC_URLS[currentSongIndex] !==
          "URL_CANCION_1" && (
          <audio
            ref={audioRef}
            src={BACKGROUND_MUSIC_URLS[currentSongIndex]}
            autoPlay
            onEnded={handleSongEnd}
          />
        )}

      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.pinimg.com/736x/15/4d/72/154d721c92fc74311453ef2ef2ade93c.jpg"
          alt="Background"
          className="w-full h-full object-cover"
          style={{
            imageRendering: "-webkit-optimize-contrast",
            filter:
              "contrast(1.2) brightness(0.85) saturate(1.15)",
          }}
        />
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/35"></div>
      </div>

      {/* Auth buttons - Top Right */}
      <div className="absolute top-5 right-5 flex gap-3 z-20 animate-fade-in">
        <button
          onClick={() => setShowLogin(true)}
          className={`px-6 py-2 rounded-lg border-2 border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/50 ${
            isDark
              ? "bg-black/60 text-white"
              : "bg-white/80 text-black"
          } backdrop-blur-md`}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => setShowRegister(true)}
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground border-2 border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/50"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Registrarse
        </button>
      </div>

      {/* Rotating logo */}
      <div className="absolute top-24 right-12 animate-fade-in z-20">
        <div className="relative w-32 h-32">
          {/* Outer rotating circle */}
          <div className="absolute inset-0 rounded-full border-2 border-primary animate-rotate-slow shadow-2xl shadow-primary/50"></div>

          {/* Inner circle with S */}
          <div className="absolute inset-2 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/60">
            <span
              className="text-6xl text-primary-foreground"
              style={{
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              S
            </span>
          </div>

          {/* Decorative dots */}
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-accent/50"></div>
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-secondary rounded-full -translate-x-1/2 translate-y-1/2 shadow-lg shadow-secondary/50"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="size-full flex items-start justify-start px-0 py-12 relative z-20">
        <div className="ml-[10px]">
          {/* Title */}
          <div className="mb-12 animate-fade-in">
            <h1
              className={`text-[clamp(3rem,8vw,6rem)] leading-[0.85] tracking-tight select-none ${
                isDark ? "text-white" : "text-black"
              }`}
              style={{
                fontFamily: "'DM Serif Display', serif",
                textShadow: isDark
                  ? "0 0 40px rgba(75, 180, 117, 0.8), 0 0 80px rgba(75, 180, 117, 0.4), 0 4px 30px rgba(0, 0, 0, 0.9)"
                  : "0 0 40px rgba(75, 180, 117, 0.6), 0 0 80px rgba(75, 180, 117, 0.3), 0 4px 30px rgba(255, 255, 255, 0.5)",
              }}
            >
              SEIKO
            </h1>
            <div className="h-1 w-24 bg-primary mt-6 animate-slide-in shadow-lg"></div>
          </div>

          {/* Menu buttons */}
          <nav className="space-y-3 max-w-md animate-fade-in-delay">
            <MenuButton
              delay="0.05s"
              isDark={isDark}
              onClick={openTutorial}
            >
              Tutorial
            </MenuButton>
            <MenuButton delay="0.1s" isDark={isDark}>
              Historia
            </MenuButton>
            <MenuButton delay="0.2s" isDark={isDark}>
              Libre
            </MenuButton>
            <MenuButton
              delay="0.3s"
              isDark={isDark}
              onClick={openSettings}
            >
              Ajustes
            </MenuButton>
            <MenuButton
              delay="0.4s"
              isDark={isDark}
              href="https://github.com/CygacIPI/Seiko"
            >
              Sobre Nosotros
            </MenuButton>
          </nav>

          {/* Decorative rhythm indicator */}
          <div className="absolute bottom-12 right-12 flex gap-2 animate-fade-in-delay-long">
            <div
              className="w-1 h-12 bg-primary animate-rhythm-bar shadow-lg shadow-primary/50"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-1 h-12 bg-secondary animate-rhythm-bar shadow-lg shadow-secondary/50"
              style={{ animationDelay: "0.15s" }}
            ></div>
            <div
              className="w-1 h-12 bg-accent animate-rhythm-bar shadow-lg shadow-accent/50"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="w-1 h-12 bg-primary animate-rhythm-bar shadow-lg shadow-primary/50"
              style={{ animationDelay: "0.45s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Difficulty Selector */}
      {showDifficultySelect && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-8">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowDifficultySelect(false)}
          ></div>

          <div className="relative bg-black/80 backdrop-blur-xl border-2 border-primary rounded-lg p-8 max-w-lg w-full shadow-2xl shadow-primary/50 animate-fade-in">
            <button
              onClick={() => setShowDifficultySelect(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white hover:text-primary transition-colors duration-300"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h2
              className="text-3xl mb-8 text-white text-center"
              style={{
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              Selecciona Dificultad
            </h2>

            <div className="space-y-3">
              <DifficultyButton
                name="Fácil"
                color="#12FA05"
                onClick={() => startTutorial("easy")}
              />
              <DifficultyButton
                name="Intermedio"
                color="#00FFFF"
                onClick={() => startTutorial("medium")}
              />
              <DifficultyButton
                name="Difícil"
                color="#F9393F"
                onClick={() => startTutorial("hard")}
              />
              <DifficultyButton
                name="Insano"
                color="#C24B99"
                onClick={() => startTutorial("insane")}
              />
              <DifficultyButton
                name="Experto"
                color="#FF6B00"
                onClick={() => startTutorial("expert")}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Mode */}
      {showTutorial && (
        <TutorialMode
          onClose={closeTutorial}
          controls={controls}
          isDark={isDark}
          difficulty={selectedDifficulty}
        />
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-8">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={closeSettings}
          ></div>

          {/* Settings Card */}
          <div className="relative bg-black/80 backdrop-blur-xl border-2 border-primary rounded-lg p-8 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl shadow-primary/50 animate-fade-in">
            {/* Close button */}
            <button
              onClick={closeSettings}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white hover:text-primary transition-colors duration-300"
              aria-label="Close settings"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Title */}
            <h2
              className="text-3xl mb-8 text-white"
              style={{
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              Ajustes
            </h2>

            <div className="space-y-8">
              {/* Theme Toggle */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="text-white text-lg"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    Tema
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="relative w-20 h-10 rounded-full bg-primary/30 border-2 border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 rounded-full bg-primary shadow-lg transition-all duration-300 flex items-center justify-center ${
                        isDark
                          ? "left-[calc(100%-1.75rem)]"
                          : "left-1"
                      }`}
                    >
                      {isDark ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          className="text-primary-foreground"
                        >
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          className="text-primary-foreground"
                        >
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                        </svg>
                      )}
                    </div>
                  </button>
                </div>
                <div
                  className="flex items-center justify-between text-sm text-white/60"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <span>Modo Claro</span>
                  <span>Modo Oscuro</span>
                </div>
              </div>

              {/* Volume Control */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="text-white text-lg"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    Volumen
                  </span>
                  <span
                    className="text-primary text-lg font-semibold"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {volume}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) =>
                    setVolume(Number(e.target.value))
                  }
                  className="w-full h-2 bg-primary/30 rounded-full appearance-none cursor-pointer slider"
                  style={{
                    accentColor: "var(--primary)",
                  }}
                />
              </div>

              {/* Controls Configuration */}
              <div className="space-y-4">
                <h3
                  className="text-white text-lg mb-4"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Controles
                </h3>
                <div className="space-y-3">
                  {Object.entries(controls).map(
                    ([direction, key]) => (
                      <div
                        key={direction}
                        className="flex items-center justify-between"
                      >
                        <span
                          className="text-white capitalize"
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                          }}
                        >
                          {direction === "left"
                            ? "Izquierda"
                            : direction === "up"
                              ? "Arriba"
                              : direction === "down"
                                ? "Abajo"
                                : "Derecha"}
                        </span>
                        <input
                          type="text"
                          value={key}
                          maxLength={1}
                          onChange={(e) =>
                            setControls({
                              ...controls,
                              [direction]:
                                e.target.value.toUpperCase(),
                            })
                          }
                          className="w-12 h-10 text-center bg-black/60 border-2 border-primary text-white rounded uppercase font-semibold"
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                          }}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-8">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowLogin(false)}
          ></div>

          <div className="relative bg-black/80 backdrop-blur-xl border-2 border-primary rounded-lg p-8 max-w-md w-full shadow-2xl shadow-primary/50 animate-fade-in">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white hover:text-primary transition-colors duration-300"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h2
              className="text-3xl mb-8 text-white"
              style={{
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              Iniciar Sesión
            </h2>

            <form
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  className="block text-white mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Usuario o Email
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-black/60 border-2 border-primary/50 text-white rounded focus:border-primary outline-none transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  className="block text-white mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-black/60 border-2 border-primary/50 text-white rounded focus:border-primary outline-none transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-primary/50"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Entrar
              </button>

              <div className="text-center">
                <button
                  onClick={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                  }}
                  className="text-primary hover:underline"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  ¿No tienes cuenta? Regístrate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-8">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowRegister(false)}
          ></div>

          <div className="relative bg-black/80 backdrop-blur-xl border-2 border-primary rounded-lg p-8 max-w-md w-full shadow-2xl shadow-primary/50 animate-fade-in">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white hover:text-primary transition-colors duration-300"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h2
              className="text-3xl mb-8 text-white"
              style={{
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              Registrarse
            </h2>

            <form
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  className="block text-white mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-black/60 border-2 border-primary/50 text-white rounded focus:border-primary outline-none transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  placeholder="Usuario123"
                />
              </div>

              <div>
                <label
                  className="block text-white mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-black/60 border-2 border-primary/50 text-white rounded focus:border-primary outline-none transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  className="block text-white mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-black/60 border-2 border-primary/50 text-white rounded focus:border-primary outline-none transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label
                  className="block text-white mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-black/60 border-2 border-primary/50 text-white rounded focus:border-primary outline-none transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-primary/50"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Crear Cuenta
              </button>

              <div className="text-center">
                <button
                  onClick={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                  }}
                  className="text-primary hover:underline"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in {
          from { width: 0; }
          to { width: 6rem; }
        }

        @keyframes rhythm-bar {
          0%, 100% { transform: scaleY(0.3); opacity: 0.4; }
          50% { transform: scaleY(1); opacity: 1; }
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-long {
          animation: fade-in 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out 0.4s forwards;
          width: 0;
        }

        .animate-rhythm-bar {
          animation: rhythm-bar 1.2s ease-in-out infinite;
          transform-origin: bottom;
        }

        .animate-rotate-slow {
          animation: rotate-slow 12s linear infinite;
        }

        /* Slider styles */
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
          border: 2px solid var(--primary-foreground);
          box-shadow: 0 0 10px rgba(75, 180, 117, 0.5);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
          border: 2px solid var(--primary-foreground);
          box-shadow: 0 0 10px rgba(75, 180, 117, 0.5);
        }

        input[type="range"]::-webkit-slider-runnable-track {
          background: linear-gradient(to right, var(--primary) 0%, var(--primary) var(--value), rgba(75, 180, 117, 0.3) var(--value), rgba(75, 180, 117, 0.3) 100%);
          height: 8px;
          border-radius: 4px;
        }

        input[type="range"]::-moz-range-track {
          background: rgba(75, 180, 117, 0.3);
          height: 8px;
          border-radius: 4px;
        }

        input[type="range"]::-moz-range-progress {
          background: var(--primary);
          height: 8px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

function MenuButton({
  children,
  delay,
  isDark,
  onClick,
  href,
}: {
  children: string;
  delay: string;
  isDark: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const bgClass = isDark ? "bg-black/60" : "bg-white/80";
  const textClass = isDark ? "text-white" : "text-black";
  const borderClass = "border-primary";

  const baseClasses = `group relative w-full text-left px-8 py-5 ${bgClass} backdrop-blur-md border-2 ${borderClass} ${textClass} transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-2xl hover:shadow-primary/60 hover:scale-[1.02] overflow-hidden shadow-xl`;

  const content = (
    <>
      {/* Hover slide effect */}
      <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>

      {/* Text */}
      <span className="relative z-10 tracking-wider uppercase text-sm font-light">
        {children}
      </span>

      {/* Decorative corner */}
      <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        style={{
          fontFamily: "'Outfit', sans-serif",
          animationDelay: delay,
          opacity: 0,
          animation: "fade-in 0.6s ease-out forwards",
          display: "block",
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses}
      style={{
        fontFamily: "'Outfit', sans-serif",
        animationDelay: delay,
        opacity: 0,
        animation: "fade-in 0.6s ease-out forwards",
      }}
    >
      {content}
    </button>
  );
}

function DifficultyButton({
  name,
  speed,
  color,
  onClick,
}: {
  name: string;
  speed: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full px-8 py-4 bg-black/60 backdrop-blur-md border-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-lg flex items-center justify-between group"
      style={{
        fontFamily: "'Outfit', sans-serif",
        borderColor: color,
      }}
    >
      <span className="text-xl font-semibold">{name}</span>
      <span className="text-lg opacity-70" style={{ color }}>
        Velocidad {speed}
      </span>
    </button>
  );
}

interface Arrow {
  id: number;
  direction: "left" | "up" | "down" | "right";
  y: number;
  hit: boolean;
  spawnTime: number;
}

interface PendingArrow {
  id: number;
  direction: "left" | "up" | "down" | "right";
  spawnTime: number;
}

function TutorialMode({
  onClose,
  controls,
  isDark,
  difficulty,
}: {
  onClose: () => void;
  controls: {
    left: string;
    up: string;
    down: string;
    right: string;
  };
  isDark: boolean;
  difficulty: "easy" | "medium" | "hard" | "insane" | "expert";
}) {
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [pendingArrows, setPendingArrows] = useState<
    PendingArrow[]
  >([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lastHitType, setLastHitType] = useState<string>("");
  const arrowIdRef = useRef(0);
  const patternIndexRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  const directions: Array<"left" | "up" | "down" | "right"> = [
    "left",
    "up",
    "down",
    "right",
  ];

  // Velocidades basadas en dificultad
  const speedMultipliers = {
    easy: 3.0,
    medium: 4.0,
    hard: 8.0,
    insane: 10.0,
    expert: 15.0,
  };

  const baseSpeed = 5;
  const speed = baseSpeed * speedMultipliers[difficulty];
  const HIT_ZONE_Y =
    typeof window !== "undefined"
      ? window.innerHeight - 180
      : 600;

  // Funciones aleatorias
  const getRandomSpawnDistance = () => {
    return Math.random() * (1000 - 500) + 500; // Entre 500ms y 1500ms
  };

  const getRandomPatternDelay = () => {
    return Math.random() * (1000 - 500) + 500; // Entre 500ms y 1500ms
  };

  // Patrones más complejos estilo FNF
  const patterns = [
    // Notas simples
    [{ direction: "left" as const, delay: 0 }],
    [{ direction: "down" as const, delay: 0 }],
    [{ direction: "up" as const, delay: 0 }],
    [{ direction: "right" as const, delay: 0 }],

    // Dobles
    [
      { direction: "left" as const, delay: 0 },
      { direction: "right" as const, delay: 0 },
    ],
    [
      { direction: "down" as const, delay: 0 },
      { direction: "up" as const, delay: 0 },
    ],
    [
      { direction: "left" as const, delay: 0 },
      { direction: "up" as const, delay: 0 },
    ],
    [
      { direction: "down" as const, delay: 0 },
      { direction: "right" as const, delay: 0 },
    ],

    // Escaleras ascendentes
    [
      { direction: "left" as const, delay: 0 },
      { direction: "down" as const, delay: 100 },
      { direction: "up" as const, delay: 200 },
      { direction: "right" as const, delay: 300 },
    ],

    // Escaleras descendentes
    [
      { direction: "right" as const, delay: 0 },
      { direction: "up" as const, delay: 100 },
      { direction: "down" as const, delay: 200 },
      { direction: "left" as const, delay: 300 },
    ],

    // Patrón alterno
    [
      { direction: "left" as const, delay: 0 },
      { direction: "right" as const, delay: 150 },
      { direction: "left" as const, delay: 300 },
      { direction: "right" as const, delay: 450 },
    ],

    // Triple nota
    [
      { direction: "left" as const, delay: 0 },
      { direction: "down" as const, delay: 0 },
      { direction: "right" as const, delay: 0 },
    ],
    [
      { direction: "up" as const, delay: 0 },
      { direction: "down" as const, delay: 0 },
      { direction: "right" as const, delay: 0 },
    ],

    // Cuádruple nota
    [
      { direction: "left" as const, delay: 0 },
      { direction: "up" as const, delay: 0 },
      { direction: "down" as const, delay: 0 },
      { direction: "right" as const, delay: 0 },
    ],

    // Patrones en zigzag
    [
      { direction: "left" as const, delay: 0 },
      { direction: "right" as const, delay: 120 },
      { direction: "down" as const, delay: 240 },
      { direction: "up" as const, delay: 360 },
    ],
    [
      { direction: "up" as const, delay: 0 },
      { direction: "down" as const, delay: 120 },
      { direction: "left" as const, delay: 240 },
      { direction: "right" as const, delay: 360 },
    ],
  ];

  const lastPatternTimeRef = useRef(0);

  // Generador continuo de patrones aleatorios
  useEffect(() => {
    startTimeRef.current = Date.now();
    lastPatternTimeRef.current = 1000; // Primer patrón a 1 segundo
  }, []);

  // Sistema de generación continua de patrones aleatorios
  useEffect(() => {
    const generateInterval = setInterval(() => {
      const currentTime = Date.now() - startTimeRef.current;

      // Generar nuevos patrones si es necesario (mantener un buffer de 3 segundos adelante)
      if (lastPatternTimeRef.current - currentTime < 3000) {
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        const randomDelay = getRandomPatternDelay(); // Espacio aleatorio entre patrones

        const newPending: PendingArrow[] = [];
        randomPattern.forEach(({ direction, delay }) => {
          newPending.push({
            id: arrowIdRef.current++,
            direction,
            spawnTime: lastPatternTimeRef.current + delay,
          });
        });

        setPendingArrows((prev) => [...prev, ...newPending]);
        lastPatternTimeRef.current += randomDelay; // Próximo patrón en tiempo aleatorio
      }
    }, 100); // Revisar cada 100ms

    return () => clearInterval(generateInterval);
  }, []);

  // Sistema de spawn optimizado - revisa pendientes y spawna cuando corresponde
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const currentTime = Date.now() - startTimeRef.current;

      setPendingArrows((pending) => {
        const toSpawn: Arrow[] = [];
        const remaining: PendingArrow[] = [];

        pending.forEach((arrow) => {
          // Si la flecha debe aparecer ahora (ha llegado su tiempo de spawn)
          if (currentTime >= arrow.spawnTime) {
            toSpawn.push({
              id: arrow.id,
              direction: arrow.direction,
              y: 0,
              hit: false,
              spawnTime: arrow.spawnTime,
            });
          } else {
            remaining.push(arrow);
          }
        });

        if (toSpawn.length > 0) {
          setArrows((prev) => [...prev, ...toSpawn]);
        }

        return remaining;
      });
    }, 50); // Revisar cada 50ms

    return () => clearInterval(checkInterval);
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      const currentTime = Date.now() - startTimeRef.current;

      setArrows((prev) =>
        prev
          .map((arrow) => ({ ...arrow, y: arrow.y + speed }))
          .filter((arrow) => {
            // Penalizar misses - si pasó la zona de hit y no fue tocada
            if (arrow.y > HIT_ZONE_Y + 150 && !arrow.hit) {
              setCombo(0);
              setLastHitType("Miss");
              setTimeout(() => setLastHitType(""), 500);
            }
            return arrow.y < window.innerHeight + 100;
          }),
      );
    }, 50);

    return () => clearInterval(gameLoop);
  }, [speed]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      let direction: "left" | "up" | "down" | "right" | null =
        null;

      if (key === controls.left) direction = "left";
      else if (key === controls.up) direction = "up";
      else if (key === controls.down) direction = "down";
      else if (key === controls.right) direction = "right";

      if (direction) {
        const currentTime = Date.now() - startTimeRef.current;

        setArrows((prev) => {
          // Buscar la flecha más cercana en la dirección correcta
          const validArrows = prev.filter(
            (arrow) =>
              arrow.direction === direction && !arrow.hit,
          );

          if (validArrows.length === 0) {
            setCombo(0);
            return prev;
          }

          // Encontrar la más cercana al hit zone
          const targetArrow = validArrows.reduce(
            (closest, current) => {
              const closestDist = Math.abs(
                closest.y - HIT_ZONE_Y,
              );
              const currentDist = Math.abs(
                current.y - HIT_ZONE_Y,
              );
              return currentDist < closestDist
                ? current
                : closest;
            },
          );

          // Calcular distancia en píxeles y convertir a tiempo aproximado
          const distancePixels = Math.abs(
            targetArrow.y - HIT_ZONE_Y,
          );
          const errorMs = (distancePixels / speed) * 50; // Aproximación basada en velocidad

          let hitType = "";
          let points = 0;

          // Sistema de hits basado en rangos de error en ms
          if (errorMs <= 22.5) {
            hitType = "Perfect!";
            points = 1000;
            setCombo((c) => c + 1);
          } else if (errorMs <= 45) {
            hitType = "Good";
            points = 500;
            setCombo((c) => c + 1);
          } else if (errorMs <= 90) {
            hitType = "Ok";
            points = 250;
            setCombo((c) => c + 1);
          } else if (errorMs <= 120) {
            hitType = "Bad";
            points = 100;
            setCombo((c) => c + 1);
          } else {
            hitType = "Miss";
            points = 0;
            setCombo(0);
          }

          setLastHitType(hitType);
          setTimeout(() => setLastHitType(""), 500);

          if (points > 0) {
            setScore((s) => s + points * Math.max(1, combo));
          }

          return prev.map((arrow) =>
            arrow.id === targetArrow.id
              ? { ...arrow, hit: true }
              : arrow,
          );
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () =>
      window.removeEventListener("keydown", handleKeyPress);
  }, [controls, combo, speed]);

  const difficultyNames = {
    easy: "Fácil",
    medium: "Intermedio",
    hard: "Difícil",
    insane: "Insano",
    expert: "Experto",
  };

  const difficultyColors = {
    easy: "#12FA05",
    medium: "#00FFFF",
    hard: "#F9393F",
    insane: "#C24B99",
    expert: "#FF6B00",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 left-5 z-50 w-12 h-12 flex items-center justify-center bg-primary/90 rounded-full text-primary-foreground hover:scale-110 transition-transform duration-300 shadow-xl"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Score & Stats */}
      <div className="absolute top-5 right-5 text-right">
        <div
          className="text-white text-sm mb-1 opacity-70"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: difficultyColors[difficulty],
          }}
        >
          {difficultyNames[difficulty]} - x
          {speedMultipliers[difficulty]}
        </div>
        <div
          className="text-white text-3xl font-bold mb-2"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {score.toLocaleString()}
        </div>
        {combo > 0 && (
          <div
            className="text-primary text-xl font-bold"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Combo x{combo}
          </div>
        )}
      </div>

      {/* Hit Type Indicator */}
      {lastHitType && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-fade-in"
          style={{ zIndex: 100 }}
        >
          <div
            className="text-6xl font-bold"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color:
                lastHitType === "Perfect!"
                  ? "#12FA05"
                  : lastHitType === "Good"
                    ? "#00FFFF"
                    : lastHitType === "Ok"
                      ? "#F9393F"
                      : lastHitType === "Bad"
                        ? "#FF6B00"
                        : "#888888",
              textShadow: "0 0 20px currentColor",
            }}
          >
            {lastHitType}
          </div>
        </div>
      )}

      {/* Target arrows at top - Static FNF style */}
      <div
        className="absolute top-[20px] left-1/2 -translate-x-1/2 flex"
        style={{ gap: "5px" }}
      >
        {directions.map((dir) => (
          <div key={dir}>
            <ArrowNote
              direction={dir}
              isStatic
              showKey={controls[dir]}
              size={80}
            />
          </div>
        ))}
      </div>

      {/* Hit zone indicator */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex opacity-20"
        style={{
          top: `${window.innerHeight - 180}px`,
          gap: "5px",
        }}
      >
        {directions.map((dir) => (
          <div
            key={dir}
            className="w-[80px] h-[80px] border-4 border-white rounded"
          ></div>
        ))}
      </div>

      {/* Falling arrows - FNF style */}
      {arrows.map((arrow) => {
        const dirIndex = directions.indexOf(arrow.direction);
        const xPosition =
          typeof window !== "undefined"
            ? window.innerWidth / 2 - 167.5 + dirIndex * 85
            : 0; // 80px arrow + 5px gap

        return (
          <div
            key={arrow.id}
            className={`absolute transition-opacity duration-200 ${
              arrow.hit ? "opacity-0 scale-150" : "opacity-100"
            }`}
            style={{
              left: `${xPosition}px`,
              top: `${arrow.y}px`,
              transition: arrow.hit
                ? "all 0.2s ease-out"
                : "opacity 0.2s",
            }}
          >
            <ArrowNote direction={arrow.direction} size={80} />
          </div>
        );
      })}

      {/* Instructions */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white opacity-70">
        <div
          className="text-sm mb-2"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Presiona las teclas cuando las flechas lleguen a la
          zona de hit
        </div>
        <div className="flex gap-6 justify-center">
          {directions.map((dir) => (
            <div key={dir} className="text-center">
              <div className="text-xs opacity-60 capitalize">
                {dir === "left"
                  ? "Izq"
                  : dir === "up"
                    ? "Arriba"
                    : dir === "down"
                      ? "Abajo"
                      : "Der"}
              </div>
              <div className="text-xl font-bold">
                {controls[dir]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}