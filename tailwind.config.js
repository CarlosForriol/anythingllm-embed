/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'false',
  prefix: 'allm-',
  corePlugins: {
    preflight: false,
  },
  content: {
    relative: true,
    files: [
      "./src/components/**/*.{js,jsx}",
      "./src/hooks/**/*.js",
      "./src/models/**/*.js",
      "./src/pages/**/*.{js,jsx}",
      "./src/utils/**/*.js",
      "./src/*.jsx",
      "./index.html",
    ]
  },
  theme: {
    extend: {
      rotate: {
        "270": "270deg",
        "360": "360deg"
      },
      colors: {
        // Lexppia design tokens (issue #26): every one of these resolves to a
        // CSS variable in src/theme.css, switched by [data-theme="light|dark"]
        // and overridable per client at runtime. Components must use these
        // semantic classes instead of hardcoded hex colors.
        "lex-window": "var(--lex-window)",
        "lex-surface-hover": "var(--lex-surface-hover)",
        "lex-header-line": "var(--lex-header-line)",
        "lex-line": "var(--lex-line)",
        "lex-window-border": "var(--lex-window-border)",
        "lex-ink": "var(--lex-ink)",
        "lex-ink-muted": "var(--lex-ink-muted)",
        "lex-ink-faint": "var(--lex-ink-faint)",
        "lex-accent": "var(--lex-accent)",
        "lex-bubble-user": "var(--lex-bubble-user-bg)",
        "lex-bubble-user-ink": "var(--lex-bubble-user-ink)",
        "lex-bubble-assistant": "var(--lex-bubble-assistant-bg)",
        "lex-bubble-assistant-ink": "var(--lex-bubble-assistant-ink)",
        "lex-button": "var(--lex-button-bg)",
        "lex-button-ink": "var(--lex-button-ink)",
        "lex-input-border": "var(--lex-input-border)",
        "lex-input-ink": "var(--lex-input-ink)",
        "lex-danger": "var(--lex-danger-bg)",
        "lex-danger-soft": "var(--lex-danger-soft-bg)",
        "lex-danger-ink": "var(--lex-danger-ink)",
        "lex-overlay": "var(--lex-overlay-bg)",
        "lex-overlay-hover": "var(--lex-overlay-bg-hover)",
        "lex-overlay-border": "var(--lex-overlay-border)",
        "lex-overlay-ink": "var(--lex-overlay-ink)",
        "lex-success": "var(--lex-success)",
        "lex-code": "var(--lex-code-bg)",
        "lex-code-header": "var(--lex-code-header-bg)",
        "lex-code-ink": "var(--lex-code-ink)",
        "lex-code-ink-muted": "var(--lex-code-ink-muted)",
        "lex-code-btn": "var(--lex-code-btn-bg)",
        "lex-code-btn-hover": "var(--lex-code-btn-bg-hover)",
        "lex-code-btn-ink-hover": "var(--lex-code-btn-ink-hover)",
        "black-900": "#141414",
        accent: "#3D4147",
        "sidebar-button": "#31353A",
        sidebar: "#25272C",
        "historical-msg-system": "rgba(255, 255, 255, 0.05);",
        "historical-msg-user": "#2C2F35",
        outline: "#4E5153",
        "primary-button": "#46C8FF",
        secondary: "#2C2F36",
        "dark-input": "#18181B",
        "mobile-onboarding": "#2C2F35",
        "dark-highlight": "#1C1E21",
        "dark-text": "#222628",
        description: "#D2D5DB",
        "x-button": "#9CA3AF"
      },
      backgroundImage: {
        "preference-gradient":
          "linear-gradient(180deg, #5A5C63 0%, rgba(90, 92, 99, 0.28) 100%);",
        "chat-msg-user-gradient":
          "linear-gradient(180deg, #3D4147 0%, #2C2F35 100%);",
        "selected-preference-gradient":
          "linear-gradient(180deg, #313236 0%, rgba(63.40, 64.90, 70.13, 0) 100%);",
        "main-gradient": "linear-gradient(180deg, #3D4147 0%, #2C2F35 100%)",
        "modal-gradient": "linear-gradient(180deg, #3D4147 0%, #2C2F35 100%)",
        "sidebar-gradient": "linear-gradient(90deg, #5B616A 0%, #3F434B 100%)",
        "login-gradient": "linear-gradient(180deg, #3D4147 0%, #2C2F35 100%)",
        "menu-item-gradient":
          "linear-gradient(90deg, #3D4147 0%, #2C2F35 100%)",
        "menu-item-selected-gradient":
          "linear-gradient(90deg, #5B616A 0%, #3F434B 100%)",
        "workspace-item-gradient":
          "linear-gradient(90deg, #3D4147 0%, #2C2F35 100%)",
        "workspace-item-selected-gradient":
          "linear-gradient(90deg, #5B616A 0%, #3F434B 100%)",
        "switch-selected": "linear-gradient(146deg, #5B616A 0%, #3F434B 100%)"
      },
      fontFamily: {
        sans: [
          "plus-jakarta-sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
      },
      animation: {
        sweep: "sweep 0.5s ease-in-out"
      },
      keyframes: {
        sweep: {
          "0%": { transform: "scaleX(0)", transformOrigin: "bottom left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "bottom left" }
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 }
        }
      }
    }
  },
  plugins: []
}
