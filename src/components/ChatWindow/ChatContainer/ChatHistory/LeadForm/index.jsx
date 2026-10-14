import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle, Phone } from "@phosphor-icons/react";
import { embedderSettings } from "@/main";
import ChatService from "@/models/chatService";
import { LEAD_SUBMITTED_EVENT, leadSentStorageKey } from "@/utils/leadForm";

function currentSessionId() {
  const embedId = embedderSettings.settings.embedId;
  return window.localStorage.getItem(`allm_${embedId}_session_id`) || "";
}

function wasSent(sessionId) {
  try {
    const key = leadSentStorageKey(
      embedderSettings.settings.embedId,
      sessionId
    );
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

const inputClass =
  "allm-w-full allm-rounded-[12px] allm-border allm-border-lex-input-border allm-bg-lex-input allm-text-lex-input-ink allm-px-3 allm-py-2 allm-text-sm allm-outline-none focus:allm-border-lex-accent";

/** Contact form the assistant opens inside the conversation (#67). */
export default function LeadForm() {
  const { t } = useTranslation();
  const sessionId = currentSessionId();
  const [sent, setSent] = useState(() => wasSent(sessionId));
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    business: "",
    bestTime: "morning",
    consent: false,
  });

  const update = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.consent) {
      setError(t("lead.error-required"));
      return;
    }
    if (form.phone.replace(/\D/g, "").length < 9) {
      setError(t("lead.error-phone"));
      return;
    }

    setSending(true);
    setError(null);
    const bestTime = t(`lead.${form.bestTime}`);
    const summary = [
      `${t("lead.summary-prefix")}: ${form.name.trim()}`,
      form.phone.trim(),
      form.business.trim(),
      `${t("lead.best-time-label")}: ${bestTime}`,
    ]
      .filter(Boolean)
      .join(" · ");
    const reply = t("lead.thanks", { name: form.name.trim().split(/\s+/)[0] });

    try {
      await ChatService.submitLead(embedderSettings.settings, sessionId, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        business: form.business.trim(),
        bestTime: form.bestTime,
        consent: form.consent,
        summary,
        reply,
      });
      try {
        window.localStorage.setItem(
          leadSentStorageKey(embedderSettings.settings.embedId, sessionId),
          "1"
        );
      } catch {}
      setSent(true);
      window.dispatchEvent(
        new CustomEvent(LEAD_SUBMITTED_EVENT, { detail: { summary, reply } })
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="allm-ml-[12px] allm-mr-[48px] allm-mt-2 allm-flex allm-items-center allm-gap-x-2 allm-rounded-[16px] allm-border allm-border-lex-line allm-bg-lex-window allm-px-4 allm-py-3 allm-text-sm allm-text-lex-ink">
        <CheckCircle size={18} weight="fill" className="allm-text-lex-accent" />
        {t("lead.sent")}
      </div>
    );
  }

  const privacyUrl = embedderSettings.settings.privacyUrl;
  return (
    <form
      data-lead-form=""
      onSubmit={submit}
      className="allm-ml-[12px] allm-mr-[24px] allm-mt-2 allm-flex allm-flex-col allm-gap-y-2 allm-rounded-[16px] allm-border allm-border-lex-line allm-bg-lex-window allm-p-4 allm-font-sans allm-text-lex-ink"
    >
      <div className="allm-flex allm-items-center allm-gap-x-2">
        <span className="allm-flex allm-h-7 allm-w-7 allm-items-center allm-justify-center allm-rounded-full allm-bg-lex-button allm-text-lex-button-ink">
          <Phone size={14} weight="bold" />
        </span>
        <span className="allm-text-sm allm-font-semibold">
          {t("lead.title")}
        </span>
      </div>
      <p className="allm-text-xs allm-text-lex-ink-muted allm-m-0">
        {t("lead.subtitle")}
      </p>
      <input
        className={inputClass}
        name="name"
        autoComplete="name"
        placeholder={t("lead.name")}
        value={form.name}
        onChange={update("name")}
        maxLength={100}
      />
      <input
        className={inputClass}
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder={t("lead.phone")}
        value={form.phone}
        onChange={update("phone")}
        maxLength={30}
      />
      <input
        className={inputClass}
        name="business"
        placeholder={t("lead.business-placeholder")}
        aria-label={t("lead.business")}
        value={form.business}
        onChange={update("business")}
        maxLength={120}
      />
      <div className="allm-flex allm-items-center allm-gap-x-2 allm-text-xs allm-text-lex-ink-muted">
        <span>{t("lead.best-time")}</span>
        {["morning", "afternoon"].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, bestTime: value }))}
            className={`allm-rounded-full allm-border allm-px-3 allm-py-1 allm-text-xs allm-cursor-pointer ${
              form.bestTime === value
                ? "allm-border-lex-accent allm-bg-lex-button allm-text-lex-button-ink"
                : "allm-border-lex-line allm-bg-transparent allm-text-lex-ink"
            }`}
          >
            {t(`lead.${value}`)}
          </button>
        ))}
      </div>
      <label className="allm-flex allm-items-start allm-gap-x-2 allm-text-xs allm-text-lex-ink-muted allm-cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={update("consent")}
          className="allm-mt-0.5"
        />
        <span>
          {t("lead.consent")}{" "}
          {privacyUrl && (
            <a
              href={privacyUrl}
              target="_blank"
              rel="noreferrer"
              className="allm-text-lex-accent"
            >
              {t("lead.privacy")}
            </a>
          )}
        </span>
      </label>
      {error && (
        <p className="allm-m-0 allm-text-xs allm-text-lex-danger-ink">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="allm-mt-1 allm-rounded-[12px] allm-border-none allm-bg-lex-button allm-text-lex-button-ink allm-py-2 allm-text-sm allm-font-semibold allm-cursor-pointer disabled:allm-opacity-60"
      >
        {sending ? t("lead.sending") : t("lead.submit")}
      </button>
    </form>
  );
}
