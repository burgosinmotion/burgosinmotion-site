export const contactEmail = "hola@burgosinmotion.com";
export const contactProjectTypes = ["Proyecto Motion Graphics", "E-Learning Storyline", "Consulta general"] as const;
export type ContactProjectType = (typeof contactProjectTypes)[number];
export const contactLimits = { nameMin: 2, nameMax: 100, emailMax: 254, messageMin: 10, messageMax: 5000, bodyBytes: 32768 } as const;

export type ContactPayload = {
  name: string;
  email: string;
  projectType: ContactProjectType;
  message: string;
  website: string;
  submissionId: string;
};

export function isContactEmail(value: string): boolean {
  if (value.length > contactLimits.emailMax || /[\s<>\x00-\x1f\x7f]/.test(value)) return false;
  const parts = value.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  return local.length > 0 && local.length <= 64 && !local.startsWith(".") && !local.endsWith(".") && !local.includes("..") &&
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local) && domain.includes(".") &&
    domain.split(".").every((label) => /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(label));
}

export function validateContactPayload(value: unknown): ContactPayload | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const keys = ["name", "email", "projectType", "message", "website", "submissionId"];
  if (Object.keys(data).some((key) => !keys.includes(key)) || keys.some((key) => typeof data[key] !== "string")) return null;
  const name = (data.name as string).trim();
  const email = (data.email as string).trim();
  const message = (data.message as string).trim();
  const projectType = data.projectType as ContactProjectType;
  const submissionId = data.submissionId as string;
  if (name.length < contactLimits.nameMin || name.length > contactLimits.nameMax || /[\x00-\x1f\x7f]/.test(name) ||
    !isContactEmail(email) || !contactProjectTypes.includes(projectType) ||
    message.length < contactLimits.messageMin || message.length > contactLimits.messageMax || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(message) ||
    (data.website as string).length > 200 ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) return null;
  return { name, email, projectType, message, website: data.website as string, submissionId };
}
