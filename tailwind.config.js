/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0A0704",
          surface: "#161009",
          raised: "#1F160D",
        },
        ember: {
          DEFAULT: "#C7391A",
          bright: "#F2601E",
          deep: "#5C1808",
          glow: "#FF7A3D",
        },
        gold: {
          DEFAULT: "#C9A227",
          dim: "#8A6E1D",
          bright: "#F0C040",
        },
        text: {
          primary: "#F5EFE0",
          secondary: "#B8A98A",
          muted: "#7A6E58",
        },
      },
      fontFamily: {
        display: ["'Cinzel'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "ember-gradient": "linear-gradient(180deg, #0A0704 0%, #1F160D 50%, #5C1808 100%)",
        "card-gradient": "linear-gradient(135deg, #1F160D 0%, #161009 100%)",
        "gold-gradient": "linear-gradient(135deg, #C9A227 0%, #F0C040 50%, #8A6E1D 100%)",
      },
      boxShadow: {
        "ember": "0 0 20px rgba(199, 57, 26, 0.4), 0 0 40px rgba(199, 57, 26, 0.2)",
        "ember-lg": "0 0 40px rgba(242, 96, 30, 0.5), 0 0 80px rgba(242, 96, 30, 0.25)",
        "gold": "0 0 20px rgba(201, 162, 39, 0.4)",
        "card": "0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,162,39,0.1)",
      },
      animation: {
        "flame": "flame 3s ease-in-out infinite alternate",
        "float": "float 4s ease-in-out infinite",
        "pulse-ember": "pulse-ember 2s ease-in-out infinite",
        "slide-in-left": "slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-out-left": "slideOutLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in": "fadeIn 0.8s ease-in-out",
        "fade-in-up": "fadeInUp 0.8s ease-in-out",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "loading-bar": "loadingBar 2s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        flame: {
          "0%": { transform: "scaleY(1) translateY(0)", opacity: "0.9" },
          "100%": { transform: "scaleY(1.1) translateY(-8px)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-ember": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(199,57,26,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(242,96,30,0.7)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOutLeft: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-100%)", opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        loadingBar: {
          "0%": { width: "0%", opacity: "1" },
          "80%": { width: "100%", opacity: "1" },
          "100%": { width: "100%", opacity: "0" },
        },
        glowPulse: {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(201,162,39,0.6))" },
          "50%": { filter: "drop-shadow(0 0 20px rgba(201,162,39,1))" },
        },
      },
    },
  },
  plugins: [],
}
