import { ArrowUp, CircleNotch } from "@phosphor-icons/react";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function PromptInput({
  settings,
  message,
  submit,
  onChange,
  inputDisabled,
  buttonDisabled,
}) {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const textareaRef = useRef(null);
  const [_, setFocused] = useState(false);

  useEffect(() => {
    if (!inputDisabled && textareaRef.current) {
      textareaRef.current.focus();
    }
    resetTextAreaHeight();
  }, [inputDisabled]);

  const handleSubmit = (e) => {
    setFocused(false);
    submit(e);
  };

  const resetTextAreaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const captureEnter = (event) => {
    if (event.keyCode == 13) {
      if (!event.shiftKey) {
        submit(event);
      }
    }
  };

  const adjustTextArea = (event) => {
    const element = event.target;
    element.style.height = "auto";
    element.style.height =
      event.target.value.length !== 0 ? element.scrollHeight + "px" : "auto";
  };

  return (
    <div className="allm-w-full allm-sticky allm-bottom-0 allm-z-10 allm-flex allm-justify-center allm-items-center allm-bg-lex-window">
      <form
        onSubmit={handleSubmit}
        className="allm-flex allm-flex-col allm-gap-y-1 allm-rounded-t-lg allm-w-full allm-items-center allm-justify-center"
      >
        <div className="allm-flex allm-items-center allm-w-full">
          <div className="allm-bg-lex-window allm-flex allm-flex-col allm-px-3 allm-pt-3 allm-overflow-hidden allm-w-full">
            <div className="allm-border allm-border-lex-input-border allm-bg-lex-input allm-flex allm-items-center allm-w-full allm-min-h-[52px] allm-rounded-[26px] allm-pl-2 allm-pr-[6px]">
              <textarea
                ref={textareaRef}
                rows={1}
                onKeyUp={adjustTextArea}
                onKeyDown={captureEnter}
                onChange={onChange}
                required={true}
                disabled={inputDisabled}
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                  setFocused(false);
                  adjustTextArea(e);
                }}
                value={message}
                className="allm-box-border allm-font-sans allm-border-none allm-cursor-text allm-max-h-[100px] allm-text-[14.5px] allm-font-medium allm-leading-5 allm-mx-2 allm-py-[14px] allm-w-full allm-text-lex-input-ink allm-bg-transparent placeholder:allm-text-lex-ink-faint allm-resize-none active:allm-outline-none focus:allm-outline-none allm-flex-grow"
                placeholder={settings.sendMessageText || t("chat.send-message")}
                id="message-input"
              />
              <button
                ref={formRef}
                type="submit"
                disabled={buttonDisabled}
                className="allm-bg-lex-button allm-border-none allm-inline-flex allm-items-center allm-justify-center allm-flex-shrink-0 allm-w-10 allm-h-10 allm-rounded-full allm-cursor-pointer allm-text-lex-button-ink hover:allm-opacity-90 disabled:allm-opacity-50"
                id="send-message-button"
                aria-label="Send message"
              >
                {buttonDisabled ? (
                  <CircleNotch className="allm-w-4 allm-h-4 allm-animate-spin" />
                ) : (
                  <ArrowUp size={18} weight="bold" />
                )}
                <span className="allm-sr-only">Send message</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
