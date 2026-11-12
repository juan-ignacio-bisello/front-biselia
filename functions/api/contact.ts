/**
 * Cloudflare Pages Function — POST /api/contact
 * Valida el formulario de contacto y envía el email vía Resend (REST API).
 *
 * Variables requeridas en Cloudflare Pages (Settings → Variables and Secrets):
 *   RESEND_API_KEY     (Secret)
 *   RESEND_FROM_EMAIL  (dirección de un dominio verificado en Resend)
 *   CONTACT_TO_EMAIL   (bandeja que recibe las consultas)
 */

interface Env {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
}

type Field = 'name' | 'email' | 'company' | 'projectType' | 'message';

const PROJECT_TYPES = ['SaaS', 'Sistema de Gestión', 'Software a Medida'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function validate(data: Record<Field, string>) {
  const errors: Array<{ field: Field; message: string }> = [];
  const len = (v: string, min: number, max: number) => v.length >= min && v.length <= max;

  if (!len(data.name, 2, 100)) errors.push({ field: 'name', message: 'El nombre debe tener entre 2 y 100 caracteres.' });
  if (data.email.length > 254 || !EMAIL_RE.test(data.email)) errors.push({ field: 'email', message: 'Debes ingresar un email válido.' });
  if (!len(data.company, 2, 150)) errors.push({ field: 'company', message: 'El nombre de la empresa debe tener entre 2 y 150 caracteres.' });
  if (!PROJECT_TYPES.includes(data.projectType)) errors.push({ field: 'projectType', message: 'El tipo de proyecto no es válido.' });
  if (!len(data.message, 10, 2000)) errors.push({ field: 'message', message: 'El mensaje debe tener entre 10 y 2000 caracteres.' });

  return errors;
}

function buildHtml(d: Record<Field, string>): string {
  const s = {
    name: escapeHtml(d.name),
    email: escapeHtml(d.email),
    company: escapeHtml(d.company),
    projectType: escapeHtml(d.projectType),
    message: escapeHtml(d.message).replace(/\n/g, '<br/>'),
  };
  const row = (label: string, value: string, top = false) => `
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; width: 120px; font-weight: 600;${top ? ' vertical-align: top;' : ''}">${label}</td>
          <td style="padding: 8px 0; color: #e2e8f0;">${value}</td>
        </tr>`;

  return `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0A0910; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
      <h2 style="color: #8F79B3; margin-top: 0;">Nueva consulta desde Biselia Web</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${row('Nombre', s.name)}
        ${row('Email', s.email)}
        ${row('Empresa', s.company)}
        ${row('Proyecto', s.projectType)}
        ${row('Mensaje', s.message, true)}
      </table>
      <p style="margin-bottom: 0; font-size: 12px; color: #475569; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px; margin-top: 24px;">
        Enviado desde el formulario de contacto de <strong style="color: #8F79B3;">Biselia</strong>
      </p>
    </div>`;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ success: false, message: 'Solicitud inválida.' }, 400);
  }

  // Honeypot: los bots completan el campo oculto. Respondemos OK sin enviar nada.
  if (str(body.website)) {
    return json({ success: true, message: 'Consulta recibida con éxito.' });
  }

  const data: Record<Field, string> = {
    name: str(body.name),
    email: str(body.email).toLowerCase(),
    company: str(body.company),
    projectType: str(body.projectType),
    message: str(body.message),
  };

  const errors = validate(data);
  if (errors.length) {
    return json({ success: false, message: 'Los datos ingresados no son válidos.', errors }, 422);
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL } = env;
  const from = env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    console.error('[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL');
    return json({ success: false, message: 'El servicio de correo no está configurado.' }, 500);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Biselia Contact <${from}>`,
      to: [CONTACT_TO_EMAIL],
      reply_to: data.email,
      subject: `[Biselia] Nueva consulta de ${data.name} — ${data.company}`,
      html: buildHtml(data),
    }),
  });

  if (!res.ok) {
    console.error(`[contact] Resend error ${res.status}: ${await res.text()}`);
    return json(
      { success: false, message: 'Ocurrió un error al procesar tu consulta. Por favor, inténtalo de nuevo.' },
      502,
    );
  }

  return json({
    success: true,
    message: 'Consulta recibida con éxito. Nos pondremos en contacto a la brevedad.',
  });
};

export const onRequest: PagesFunction<Env> = async () =>
  json({ success: false, message: 'Method Not Allowed' }, 405);
