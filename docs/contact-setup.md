# Contacto directo: configuración y revisión

## Estado y arquitectura

El formulario de Home y `/contacto` usa `POST /api/contact` → validación → límite de envíos → SDK oficial Resend. No hay base de datos de contactos, CRM ni logs con datos del visitante. Resend procesa y puede conservar los emails según las condiciones/configuración de la cuenta; la aplicación no guarda los mensajes. Gmail, aplicación de correo y copiar dirección siguen disponibles en `ContactMethods`, también después de un error. El cotizador mantiene su selector actual y no usa este endpoint.

La aplicación no está configurada para entregar correos reales todavía. No se ha creado ninguna cuenta, clave, registro DNS ni servicio externo. No se ha verificado el dominio desde esta tarea.

## Contrato y protecciones

- JSON con `name` (2–100), `email` (máximo 254, formato validado), `projectType` (los tres valores del formulario), `message` (10–5000), `website` (honeypot) y `submissionId` (UUID v4). Se rechazan campos adicionales, controles de cabecera y cuerpos mayores de 32 KiB, incluso sin Content-Length.
- Solo POST, origen igual al de la petición, Content-Type JSON, respuestas sin caché ni errores internos. 400 inválido; 403 origen; 413 tamaño; 415 formato; 429 límite con Retry-After; 503 configuración/protección no disponible; 502 fallo de envío; 200 aceptado por Resend. Un honeypot relleno recibe un 200 aparente sin enviar nada.
- El cliente bloquea el doble envío de inmediato con una ref y deshabilita el formulario mientras espera. Conserva datos en error y el mismo UUID para reintentos idénticos. Cambiar el mensaje/datos genera un nuevo intento. Tras éxito los campos y el botón quedan deshabilitados hasta elegir «Escribir otra consulta».
- Resend recibe `idempotencyKey: contact/<UUID>`. Su deduplicación dura 24 horas; no existe una garantía ilimitada después de recargar la página o expirar ese plazo. No se reintenta automáticamente. Un timeout conserva la misma clave para el siguiente intento sin cambios.
- FROM y TO proceden exclusivamente de configuración del servidor. Reply-To usa solo el email validado. El visitante no controla las cabeceras. La plantilla HTML escapa todos los campos y se acompaña de texto plano.
- Un 200 indica aceptación del proveedor, no una confirmación independiente de llegada a la bandeja de entrada. La entrega y Reply-To deben verificarse con una prueba real.

## Rate limiting antes de producción

En `next dev`, sin Upstash, hay un contador en memoria de **5 intentos por 10 minutos** compartido por el desarrollo local. Es solo una ayuda de desarrollo: no es protección de producción.

En Vercel, Preview y `next start`, el endpoint necesita el adaptador Upstash Redis REST configurado. Si falta o falla, responde 503 y **no envía**. No hay una ruta que permita usar el Map en producción. El contador es atómico mediante EVAL + INCR + EXPIRE y se comparte entre instancias. Cada clave almacena únicamente un HMAC de la IP y un contador con TTL de 10 minutos, sin nombre, email ni mensaje. La IP en Vercel se toma de `x-vercel-forwarded-for`, suministrado por la plataforma; fuera de Vercel no se confía en cabeceras IP arbitrarias.

Para activar el adaptador, el propietario debe configurar manualmente un servicio Upstash Redis y copiar su REST URL y REST TOKEN. No se ha creado una base de datos ni contratado un servicio. Si prefieres no incorporar este servicio, hay que sustituir el adaptador por una protección compartida equivalente antes de producción; no basta con habilitar el Map. El límite básico no sustituye a la protección frente a abuso distribuido de Vercel/WAF.

## CONFIGURACIÓN MANUAL NECESARIA

### PASO A — Resend

1. Crear o acceder a la cuenta en [Resend](https://resend.com).
2. Elegir el equipo que utilizará Burgos in Motion. No es necesario crear una cuenta para los visitantes.

### PASO B — Verificar burgosinmotion.com y DNS

1. En Resend, abrir **Domains → Add Domain**, añadir `burgosinmotion.com` y elegir la región disponible que corresponda.
2. Abrir ese dominio y localizar los registros de verificación/envío indicados por Resend: tipo, nombre/host, valor y prioridad si aparece. Copiar **exactamente** los registros SPF/DKIM/MX de envío que muestre tu cuenta; este documento no inventa valores.
3. Añadirlos en el proveedor DNS autoritativo del dominio. Revisar cuidadosamente el host y si el proveedor añade el dominio automáticamente.
4. Conservar los registros que dan servicio al correo actual. No reemplazar los MX de recepción del dominio por registros de envío ni crear un segundo SPF en el mismo host. Si existe un conflicto, resolverlo con las instrucciones específicas del panel/proveedor antes de guardar.
5. Volver al dominio en Resend, solicitar la verificación y esperar a que esté **Verified** para envío. No habilitar recepción de correo/inbound para esta función.

### PASO C — API key y prueba local/Preview

1. En **API Keys → Create API Key**, crear una clave con permiso **Sending access**, restringida al dominio verificado cuando el panel lo permita.
2. Copiarla manualmente a `RESEND_API_KEY` en `.env.local`. No usar `NEXT_PUBLIC_*`, pegarla en el chat ni guardarla en Git. `.env.example` contiene solo nombres y valores no secretos; nunca copiar una clave real a ese archivo.
3. Para probar sin dominio verificado, usar una clave de envío que permita el remitente de pruebas, `CONTACT_EMAIL_MODE=test` y `CONTACT_TEST_TO_EMAIL=delivered@resend.dev`. El servidor usa `Burgos in Motion <onboarding@resend.dev>`; ese destinatario simula entrega y no es la bandeja de Diego. Para una prueba de bandeja con ese remitente, usar el email autorizado de la cuenta Resend, sujeto a las restricciones de pruebas de Resend.
4. Con `npm run dev -- --webpack` el contador local permite una prueba sin Upstash. En Preview o `next start`, configurar también el adaptador persistente. Reiniciar el servidor después de cambiar variables.

### PASO D — Variables privadas de Vercel y límite compartido

En el proyecto de Vercel, **Settings → Environment Variables**, configurar los valores por entorno:

| Variable | Production | Desarrollo/Preview de pruebas |
| --- | --- | --- |
| `RESEND_API_KEY` | Clave real de envío autorizada | Clave de pruebas autorizada |
| `CONTACT_EMAIL_MODE` | `live` | `test` |
| `CONTACT_FROM_EMAIL` | `web@burgosinmotion.com`, después de verificar el dominio | No se usa en test |
| `CONTACT_TO_EMAIL` | `hola@burgosinmotion.com` | No se usa en test |
| `CONTACT_TEST_TO_EMAIL` | No se usa en live | `delivered@resend.dev` o email autorizado de la cuenta |
| `UPSTASH_REDIS_REST_URL` | REST URL del servicio configurado manualmente | También necesaria en Preview/next start |
| `UPSTASH_REDIS_REST_TOKEN` | REST TOKEN privado | También necesario en Preview/next start |
| `CONTACT_RATE_LIMIT_SALT` | Secreto aleatorio privado de al menos 32 caracteres | Igual requisito si se usa Upstash |

La API key no tiene default. TO tiene como default fijo `hola@burgosinmotion.com`. En modo live, FROM es obligatorio: no se asume que el dominio esté autorizado. El nombre visible siempre es Burgos in Motion. En test, el remitente es el permitido por Resend y el destinatario predeterminado es el simulador. Vercel Production y un servidor production fuera de Vercel rechazan el modo test. Una Preview permite test, pero sigue exigiendo el límite compartido.

### PASO E — Prueba real controlada

1. Ejecutar primero `npm run test:contact` (mocks, cero correo real).
2. Con las variables y el dominio listos, realizar **un** envío deliberado desde local o Preview. Revisar Enviando, confirmación y conservación de datos si hay error.
3. Consultar el estado del email en el panel **Emails** de Resend y confirmar la llegada a `hola@burgosinmotion.com` al probar en modo live. Usar un correo de visitante bajo tu control.
4. En el cliente de Diego, pulsar Responder y verificar que el destinatario sea ese correo de visitante, no `web@burgosinmotion.com`. No es necesario enviar la respuesta para comprobarlo.
5. Revisar plantilla en escritorio/móvil y comprobar el selector alternativo. No enviar múltiples mensajes reales para probar doble click: esa condición se prueba con mocks.

### PASO F — Deploy posterior

Los cambios siguen locales, sin stage, commit, push ni deploy. Después de tu revisión y autorización, desplegar con las variables de Production completas y repetir una única prueba controlada. Las nuevas variables de Vercel se aplican a despliegues posteriores; no activan por sí solas un despliegue existente.

## Referencias oficiales

- [Resend: envío](https://resend.com/docs/api-reference/emails/send-email), [idempotencia (24 h)](https://resend.com/docs/dashboard/emails/idempotency-keys), [dominios](https://resend.com/docs/dashboard/domains/introduction) y [destinatarios simulados](https://resend.com/docs/dashboard/emails/send-test-emails).
- [Vercel: cabeceras IP](https://vercel.com/docs/headers/request-headers).
- [Upstash: Redis REST API](https://upstash.com/docs/redis/features/restapi).
