import { createContactHandler } from "./handler";
import { sendContactEmail } from "./email";
import { limitContactRequest } from "./rate-limit";

export const runtime = "nodejs";
export const maxDuration = 20;
export const POST = createContactHandler({ limit: limitContactRequest, send: sendContactEmail });
