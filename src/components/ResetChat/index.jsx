import ChatService from "@/models/chatService";
import { useTranslation } from "react-i18next";

export default function ResetChat({
  setChatHistory,
  settings,
  sessionId,
  closeChat,
}) {
  const { t } = useTranslation();

  const handleChatReset = async () => {
    await ChatService.resetEmbedChatSession(settings, sessionId);
    setChatHistory([]);
  };

  return (
    <div className="allm-w-full allm-flex allm-justify-center allm-gap-x-1 p-0">
      <button
        className="allm-text-lex-ink-muted allm-h-fit allm-px-0 hover:allm-cursor-pointer allm-border-none allm-text-sm allm-bg-transparent hover:allm-opacity-80 hover:allm-underline"
        onClick={() => handleChatReset()}
      >
        {settings.resetChatText || t("chat.reset-chat")}
      </button>
      {settings.noHeader && (
        <>
          <p className="allm-m-0 allm-h-fit allm-text-sm allm-text-lex-ink-muted">
            |
          </p>
          <button
            type="button"
            className="allm-text-lex-ink-muted allm-h-fit allm-px-0 hover:allm-cursor-pointer allm-border-none allm-text-sm allm-bg-transparent hover:allm-opacity-80 hover:allm-underline"
            onClick={closeChat}
          >
            {t("chat.close-chat")}
          </button>
        </>
      )}
    </div>
  );
}
