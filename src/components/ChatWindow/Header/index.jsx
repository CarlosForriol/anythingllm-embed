import ChatService from "@/models/chatService";
import {
  ArrowCounterClockwise,
  Check,
  Copy,
  DotsThreeOutlineVertical,
  Envelope,
  X,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ChatWindowHeader({
  sessionId,
  settings = {},
  iconUrl = null,
  closeChat,
  setChatHistory,
}) {
  const [showingOptions, setShowOptions] = useState(false);
  const menuRef = useRef();
  const buttonRef = useRef();

  const handleChatReset = async () => {
    await ChatService.resetEmbedChatSession(settings, sessionId);
    setChatHistory([]);
    setShowOptions(false);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const { t } = useTranslation();
  const assistantName = settings.assistantName || "Asistente Lexppia";

  return (
    <div
      className="allm-flex allm-items-center allm-gap-x-3 allm-relative allm-bg-lex-header allm-text-lex-header-ink allm-pl-5 allm-pr-4 allm-py-4"
      id="anything-llm-header"
    >
      <span className="allm-relative allm-flex-shrink-0 allm-w-11 allm-h-11 allm-rounded-full allm-bg-lex-window allm-text-lex-ink allm-flex allm-items-center allm-justify-center allm-font-sans allm-text-[15px] allm-font-extrabold">
        {iconUrl ? (
          <img
            style={{ maxWidth: 32, maxHeight: 32 }}
            src={iconUrl}
            alt="Brand"
          />
        ) : (
          initials(assistantName)
        )}
        <span className="allm-absolute allm-right-0 allm-bottom-0 allm-w-[11px] allm-h-[11px] allm-rounded-full allm-bg-[#3dd68c] allm-shadow-[0_0_0_2px_var(--lex-header-bg)]" />
      </span>
      <span className="allm-flex allm-flex-col allm-flex-grow allm-min-w-0 allm-font-sans">
        <span className="allm-text-[16px] allm-font-bold allm-truncate">
          {assistantName}
        </span>
        <span className="allm-text-[12.5px] allm-font-medium allm-opacity-80">
          {t("chat.online-status", { defaultValue: "Responde al momento" })}
        </span>
      </span>
      <div className="allm-flex allm-gap-x-2 allm-items-center allm-flex-shrink-0">
        {settings.loaded && (
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setShowOptions(!showingOptions)}
            className="allm-w-10 allm-h-10 allm-flex allm-items-center allm-justify-center allm-bg-[rgba(255,255,255,0.14)] hover:allm-bg-[rgba(255,255,255,0.25)] hover:allm-cursor-pointer allm-border-none allm-rounded-full allm-text-lex-header-ink"
            aria-label="Options"
          >
            <DotsThreeOutlineVertical size={18} weight="fill" />
          </button>
        )}
        <button
          type="button"
          onClick={closeChat}
          className="allm-w-10 allm-h-10 allm-flex allm-items-center allm-justify-center allm-bg-[rgba(255,255,255,0.14)] hover:allm-bg-[rgba(255,255,255,0.25)] hover:allm-cursor-pointer allm-border-none allm-rounded-full allm-text-lex-header-ink"
          aria-label={t("chat.close-chat")}
        >
          <X size={18} weight="bold" />
        </button>
      </div>
      <OptionsMenu
        settings={settings}
        showing={showingOptions}
        resetChat={handleChatReset}
        sessionId={sessionId}
        menuRef={menuRef}
      />
    </div>
  );
}

function OptionsMenu({ settings, showing, resetChat, sessionId, menuRef }) {
  if (!showing) return null;
  const { t } = useTranslation();

  return (
    <div
      ref={menuRef}
      className="allm-bg-lex-window allm-absolute allm-z-10 allm-flex allm-flex-col allm-gap-y-1 allm-p-2 allm-rounded-[20px] allm-shadow-[0_16px_40px_-12px_rgba(25,28,31,0.3),0_0_0_1px_rgba(25,28,31,0.05)] allm-top-[68px] allm-right-[16px]"
    >
      <button
        onClick={resetChat}
        className="hover:allm-cursor-pointer allm-bg-lex-window allm-gap-x-[12px] hover:allm-bg-lex-surface-hover allm-rounded-lg allm-border-none allm-flex allm-items-center allm-text-base allm-text-lex-ink-muted allm-font-bold allm-px-4"
      >
        <ArrowCounterClockwise size={24} />
        <p className="allm-text-[14px]">{t("chat.reset-chat")}</p>
      </button>
      <ContactSupport email={settings.supportEmail} />
      <SessionID sessionId={sessionId} />
    </div>
  );
}

function SessionID({ sessionId }) {
  if (!sessionId) return null;
  const { t } = useTranslation();
  const [sessionIdCopied, setSessionIdCopied] = useState(false);

  const copySessionId = () => {
    navigator.clipboard.writeText(sessionId);
    setSessionIdCopied(true);
    setTimeout(() => setSessionIdCopied(false), 1000);
  };

  if (sessionIdCopied) {
    return (
      <div className="hover:allm-cursor-pointer allm-bg-lex-window allm-gap-x-[12px] hover:allm-bg-lex-surface-hover allm-rounded-lg allm-border-none allm-flex allm-items-center allm-text-base allm-text-lex-ink-muted allm-font-bold allm-px-4">
        <Check size={24} />
        <p className="allm-text-[14px] allm-font-sans">
          {t("chat.message-copied")}
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={copySessionId}
      className="hover:allm-cursor-pointer allm-bg-lex-window allm-gap-x-[12px] hover:allm-bg-lex-surface-hover allm-rounded-lg allm-border-none allm-flex allm-items-center allm-text-base allm-text-lex-ink-muted allm-font-bold allm-px-4"
    >
      <Copy size={24} />
      <p className="allm-text-[14px]">{t("chat.session-id")}</p>
    </button>
  );
}

function ContactSupport({ email = null }) {
  if (!email) return null;
  const { t } = useTranslation();
  const subject = `Inquiry from ${window.location.origin}`;
  return (
    <a
      href={`mailto:${email}?Subject=${encodeURIComponent(subject)}`}
      className="allm-no-underline hover:allm-underline hover:allm-cursor-pointer allm-bg-lex-window allm-gap-x-[12px] hover:allm-bg-lex-surface-hover allm-rounded-lg allm-border-none allm-flex allm-items-center allm-text-base allm-text-lex-ink-muted allm-font-bold allm-px-4"
    >
      <Envelope size={24} />
      <p className="allm-text-[14px] allm-font-sans">
        {t("chat.email-support")}
      </p>
    </a>
  );
}

function initials(name = "") {
  return (
    name
      .split(/\s+/)
      // "Asistente de Talleres Ruiz" → "AT": skip lowercase particles.
      .filter((word) => /^\p{Lu}/u.test(word))
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("") || "L"
  );
}
