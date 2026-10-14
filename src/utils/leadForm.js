// Lexppia lead form (lexppia-anythingllm #67): the workspace prompt tells the
// assistant to end a reply with this marker when the visitor shows buying
// intent; the widget hides it and renders the contact form under the reply.
export const LEAD_FORM_MARKER = "[[formulario]]";
export const LEAD_SUBMITTED_EVENT = "lexppia-embed-lead-submitted";

const MARKER_RE = /\[\[\s*formulario\s*\]\]/gi;
// While streaming, a half-written marker ("[[form") must not flash on screen.
const PARTIAL_MARKER_RE = /\[\[?[a-z]*\]?$/i;

export function splitLeadMarker(text = "") {
  const hasForm = MARKER_RE.test(text);
  MARKER_RE.lastIndex = 0;
  const clean = text.replace(MARKER_RE, "").replace(PARTIAL_MARKER_RE, "");
  return { text: clean.trimEnd(), hasForm };
}

export function leadSentStorageKey(embedId, sessionId) {
  return `allm_${embedId}_${sessionId}_lead_sent`;
}
