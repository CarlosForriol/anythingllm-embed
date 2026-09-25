export const CHAT_UI_REOPEN = "___anythingllm-chat-widget-open___";
export function parseStylesSrc(scriptSrc = null) {
  try {
    const _url = new URL(scriptSrc);
    // Lexppia bundle ships as leppi-chat-widget.min.js (+ .min.css beside it);
    // dev builds load leppi-chat-widget.js. Map either to the stylesheet.
    _url.pathname = _url.pathname
      .replace(/\.min\.js$/, ".min.css")
      .replace(/\.js$/, ".min.css");
    return _url.toString();
  } catch {
    return "";
  }
}
