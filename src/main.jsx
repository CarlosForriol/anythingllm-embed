import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { parseStylesSrc } from "./utils/constants.js";
import { initI18n } from "./i18n.js";

const appElement = document.createElement("div");
document.body.appendChild(appElement);

const scriptSettings = Object.assign(
  {},
  document?.currentScript?.dataset || {}
);

export const embedderSettings = {
  settings: scriptSettings,
  stylesSrc: parseStylesSrc(document?.currentScript?.src),
  // Issue #26: bubble colors are Lexppia tokens (src/theme.css) consumed via
  // Tailwind. Client `data-*` colors are mapped onto the same variables in
  // App.jsx, so no hex lives in these style strings anymore.
  USER_STYLES: {
    base: `allm-bg-lex-bubble-user allm-text-lex-bubble-user-ink allm-rounded-t-[18px] allm-rounded-bl-[18px] allm-rounded-br-[4px] allm-mx-[20px]`,
  },
  ASSISTANT_STYLES: {
    base: `allm-bg-lex-bubble-assistant allm-text-lex-bubble-assistant-ink allm-rounded-t-[18px] allm-rounded-br-[18px] allm-rounded-bl-[4px] allm-mr-[37px] allm-ml-[9px]`,
  },
};

// Initialize i18n after settings are available
initI18n(scriptSettings);

const root = ReactDOM.createRoot(appElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
