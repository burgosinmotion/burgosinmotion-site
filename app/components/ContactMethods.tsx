"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

import { contactEmail } from "../lib/contact";
export { contactEmail } from "../lib/contact";
type ContactDraft = { subject?: string; body?: string };
const ContactContext = createContext<(draft?: ContactDraft) => void>(() => {});
const optionStyles = "flex min-h-12 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:border-cyan-300/60 hover:bg-cyan-400/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200";

export function ContactMethodsProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [draft, setDraft] = useState<ContactDraft>({});
  const [feedback, setFeedback] = useState("");
  const gmailParams = new URLSearchParams({ view: "cm", fs: "1", to: contactEmail });
  const mailParams = new URLSearchParams();
  if (draft.subject) {
    gmailParams.set("su", draft.subject);
    mailParams.set("subject", draft.subject);
  }
  if (draft.body) {
    gmailParams.set("body", draft.body);
    mailParams.set("body", draft.body);
  }
  const mailQuery = mailParams.toString().replace(/\+/g, "%20");

  useEffect(() => () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
  }, []);

  function openContact(nextDraft: ContactDraft = {}) {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    setDraft(nextDraft);
    setFeedback("");
    dialogRef.current?.showModal();
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setFeedback("Correo copiado");
    } catch {
      setFeedback("No se pudo copiar. Selecciona el correo y cópialo manualmente.");
    }
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(""), 4000);
  }

  return (
    <ContactContext.Provider value={openContact}>
      {children}
      <dialog
        ref={dialogRef}
        id="contact-methods"
        aria-labelledby="contact-methods-title"
        aria-describedby="contact-methods-description"
        onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-2xl border border-cyan-300/20 bg-[#121719] p-0 text-zinc-100 shadow-2xl backdrop:bg-black/65 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h2 id="contact-methods-title" className="text-2xl font-bold tracking-tight">Utilizar mi correo</h2>
            <button type="button" aria-label="Cerrar opciones de contacto" onClick={() => dialogRef.current?.close()} className="-mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl text-zinc-400 hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-200">×</button>
          </div>
          <p id="contact-methods-description" className="mt-3 text-sm leading-6 text-zinc-400">Elige cómo prefieres escribir a Diego.</p>
          <p className="mt-2 select-text break-all text-sm font-semibold text-cyan-200">{contactEmail}</p>
          <div className="mt-6 grid gap-3">
            <a href={`https://mail.google.com/mail/?${gmailParams}`} target="_blank" rel="noopener noreferrer" className={optionStyles}>Abrir Gmail <span className="sr-only">(nueva pestaña)</span><span aria-hidden="true" className="ml-2">↗</span></a>
            <a href={`mailto:${contactEmail}${mailQuery ? `?${mailQuery}` : ""}`} className={optionStyles}>Usar mi aplicación de correo</a>
            <button type="button" onClick={copyEmail} className={optionStyles}>Copiar correo</button>
          </div>
          <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-cyan-200">{feedback}</p>
        </div>
      </dialog>
    </ContactContext.Provider>
  );
}

export function useContactMethods() {
  return useContext(ContactContext);
}

export default function ContactButton({ children, className, subject, body }: ContactDraft & { children: ReactNode; className?: string }) {
  const openContact = useContactMethods();
  return <button type="button" aria-haspopup="dialog" aria-controls="contact-methods" onClick={() => openContact({ subject, body })} className={className}>{children}</button>;
}
