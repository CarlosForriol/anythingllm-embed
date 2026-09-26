/**
 * Maps the per-client widget_config colors (delivered as `data-*` attributes
 * on the embed script tag, issue #27) onto the Lexppia design tokens defined
 * in src/theme.css (issue #26). A valid hex here overrides that one token on
 * the themed wrapper; anything absent keeps the palette default.
 */

const TOKEN_VARS = {
  buttonColor: "--lex-button-bg",
  userBgColor: "--lex-bubble-user-bg",
  assistantBgColor: "--lex-bubble-assistant-bg",
  backgroundColor: "--lex-window",
  textColor: "--lex-ink",
  accentColor: "--lex-accent",
  borderColor: "--lex-window-border",
};

const HEX_COLOR = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export function themeTokenOverrides(settings = {}) {
  const style = {};
  for (const [key, variable] of Object.entries(TOKEN_VARS)) {
    const value = settings[key];
    if (typeof value === "string" && HEX_COLOR.test(value.trim()))
      style[variable] = value.trim();
  }
  return style;
}
