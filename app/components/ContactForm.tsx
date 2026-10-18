"use client";

import { useRef, useState, type FormEvent } from "react";
import { contactLimits, contactProjectTypes } from "../lib/contact";
import { useContactMethods } from "./ContactMethods";
import { buttonContactStyles } from "./buttonStyles";

const fieldStyles = "rounded-xl border border-white/[0.08] bg-[#121212]/78 px-4 py-3 font-sans text-base font-medium text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-200/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200";
const labelStyles = "grid gap-2 font-mono text-xs font-bold text-zinc-400";

function readFields(form: HTMLFormElement) {
  const value = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | null)?.value.trim() ?? "";
  return { name: value("name"), email: value("email"), projectType: value("projectType"), message: value("message"), website: value("website") };
}

export default function ContactForm() {
  const openContact = useContactMethods();
  const formRef = useRef<HTMLFormElement>(null);
  const inFlight = useRef(false);
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // The ref closes the same-render double-click window before React disables the button.
    if (inFlight.current || status === "success") return;
    inFlight.current = true;
    const fields = readFields(event.currentTarget);
    const fingerprint = JSON.stringify(fields);
    setStatus("sending");
    setNotice("Enviando tu mensaje…");
    try {
      if (attempt.current?.fingerprint !== fingerprint) attempt.current = { fingerprint, id: crypto.randomUUID() };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, submissionId: attempt.current!.id }),
        signal: AbortSignal.timeout(15000),
      });
      const data: unknown = await response.json();
      if (!response.ok || !data || typeof data !== "object" || !("ok" in data) || data.ok !== true) {
        setStatus("error");
        setNotice(response.status === 429
          ? "Has realizado varios intentos. Espera unos minutos o utiliza tu correo."
          : response.status === 400
            ? "Revisa tu nombre, correo, tipo de proyecto y mensaje antes de reintentar."
            : "No pude enviar el mensaje en este momento. Puedes reintentar o utilizar tu correo.");
        return;
      }
      setStatus("success");
      setNotice(`Gracias, ${fields.name}. Recibí tu consulta sobre ${fields.projectType.replace("Proyecto ", "")}. Te responderé a la brevedad.`);
    } catch {
      setStatus("error");
      setNotice("No pude confirmar el envío en este momento. Puedes reintentar o utilizar tu correo.");
    } finally { inFlight.current = false; }
  }

  function openAlternatives() {
    if (!formRef.current) return;
    const fields = readFields(formRef.current);
    openContact({ subject: fields.projectType, body: `Nombre: ${fields.name}\nCorreo: ${fields.email}\n\n${fields.message}` });
  }

  function startNewMessage() {
    formRef.current?.reset();
    attempt.current = null;
    setStatus("idle");
    setNotice("");
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus());
  }

  return (
    <form ref={formRef} onSubmit={submitForm} aria-label="Enviar consulta" aria-busy={status === "sending"} className="rounded-[1.5rem] border border-white/[0.08] bg-[#121212]/78 p-5 backdrop-blur-md md:p-8">
      <fieldset disabled={status === "sending" || status === "success"} className="min-w-0">
        <legend className="sr-only">Datos de tu consulta</legend>
        <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
          <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <label className={labelStyles}>Nombre Completo
            <input name="name" required autoComplete="name" minLength={contactLimits.nameMin} maxLength={contactLimits.nameMax} placeholder="Tu nombre" className={fieldStyles} />
          </label>
          <label className={labelStyles}>Correo Electrónico
            <input name="email" type="email" required autoComplete="email" maxLength={contactLimits.emailMax} placeholder="tu@email.com" className={fieldStyles} />
          </label>
        </div>
        <label className={`${labelStyles} mt-5`}>Tipo de proyecto
          <select name="projectType" required className={fieldStyles}>
            {contactProjectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label className={`${labelStyles} mt-5`}>Mensaje
          <textarea name="message" required minLength={contactLimits.messageMin} maxLength={contactLimits.messageMax} rows={5} placeholder="Cuéntame sobre los detalles de tu proyecto o requerimiento..." className={`${fieldStyles} resize-y`} />
          <span className="font-sans text-xs font-normal text-zinc-500">Entre 10 y 5000 caracteres.</span>
        </label>
        <button type="submit" disabled={status === "sending" || status === "success"} className={`${buttonContactStyles} mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60`}>
          <span aria-hidden="true">✈</span>{status === "sending" ? "Enviando…" : status === "success" ? "Mensaje enviado" : "Enviar Mensaje"}
        </button>
      </fieldset>
      <div role="status" aria-live="polite" aria-atomic="true" className={`mt-4 min-h-16 text-sm leading-6 ${status === "error" ? "text-amber-200" : "text-cyan-200"}`}>{notice}</div>
      {status === "success" ? <button type="button" onClick={startNewMessage} className="mb-5 min-h-11 rounded-sm text-sm font-semibold text-cyan-200 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-cyan-200">Escribir otra consulta</button> : null}
      <div className="border-t border-white/[0.08] pt-5 text-sm text-zinc-400">
        <p>¿Prefieres utilizar tu correo?</p>
        <button type="button" aria-haspopup="dialog" aria-controls="contact-methods" onClick={openAlternatives} className="mt-1 min-h-11 rounded-sm text-left text-cyan-200 underline decoration-cyan-200/40 underline-offset-4 hover:text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200">Gmail, aplicación de correo o copiar dirección</button>
      </div>
    </form>
  );
}
