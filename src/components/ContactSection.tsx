import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import type { ContactFormData, ContactFormErrors, ApiResponse } from '../types/contact.types';
import { getEnvironments } from '../helpers/getEnvironments';

const EMPTY_FORM: ContactFormData = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  message: '',
};

// WhatsApp brand SVG icon
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.108 1.523 5.834L0 24l6.326-1.493C8.006 23.46 9.947 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.848 0-3.582-.495-5.093-1.357l-.365-.216-3.753.886.903-3.655-.237-.378A9.957 9.957 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
  </svg>
);

const API_URL = 'http://localhost:3001/api/contact';

// Read and sanitize WhatsApp number using the getEnvironments helper
const { VITE_WHATSAPP_NUMBER = '' } = getEnvironments();
const RAW_WHATSAPP_NUMBER = (VITE_WHATSAPP_NUMBER as string) || '';
const CLEAN_WHATSAPP_NUMBER = RAW_WHATSAPP_NUMBER.replace(/\D/g, '');
const IS_WHATSAPP_AVAILABLE = CLEAN_WHATSAPP_NUMBER.length > 0;

function validateForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.';
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Ingresa un email válido.';
  }
  if (!data.company.trim() || data.company.trim().length < 2) {
    errors.company = 'El nombre de la empresa es requerido.';
  }
  if (!data.projectType) {
    errors.projectType = 'Selecciona el tipo de proyecto.';
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  }
  return errors;
}

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [apiMessage, setApiMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleWhatsappClick = () => {
    if (!IS_WHATSAPP_AVAILABLE) return;
    const defaultText = 'Hola Biselia! Me contacto desde la página web para realizar una consulta sobre sus servicios.';
    const waUrl = `https://wa.me/${CLEAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus('loading');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data: ApiResponse = await res.json();
      if (data.success) {
        setStatus('success');
        setApiMessage(data.message);
        setForm(EMPTY_FORM);
      } else {
        setStatus('error');
        setApiMessage(data.message ?? 'Error al enviar el mensaje.');
        if (data.errors) {
          const fieldErrors: ContactFormErrors = {};
          data.errors.forEach(({ field, message }) => {
            if (field in EMPTY_FORM) {
              fieldErrors[field as keyof ContactFormErrors] = message;
            }
          });
          setErrors(fieldErrors);
        }
      }
    } catch {
      setStatus('error');
      setApiMessage('No se pudo conectar con el servidor de correo. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* BG orb */}
      <div className="orb orb-primary animate-glow-pulse w-[600px] h-[600px] -bottom-[100px] -right-[150px] [animation-delay:0.5s]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Info */}
          <div>
            <div className="mb-5">
              <span className="section-label">Contacto</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5">
              Cuéntanos sobre{' '}
              <span className="gradient-text-brand">tu proyecto</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-10 text-base">
              Escríbenos directamente por WhatsApp para una respuesta casi inmediata o completa el formulario de correo a continuación.
            </p>

            {/* Trust points */}
            <div className="flex flex-col gap-4">
              {[
                { title: 'Respuesta inmediata por WhatsApp', desc: 'Conéctate directamente con nuestro equipo sin demoras.' },
                { title: 'Evaluación técnica sin cargo', desc: 'Analizamos tu caso y te damos una perspectiva honesta.' },
                { title: 'Propuesta en 5 días hábiles', desc: 'Presupuesto detallado con alcance y timeline.' },
                { title: 'Confidencialidad garantizada', desc: 'Firmamos NDA si el proyecto lo requiere.' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3.5 p-4 sm:p-5 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-white/5"
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--color-brand-glow)] mt-1.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                      {item.title}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Options Container */}
          <div className="flex flex-col gap-7">
            {/* ── 1. OPCIÓN PRINCIPAL: WHATSAPP ── */}
            <div className="bg-[rgba(37,211,102,0.04)] border border-[rgba(37,211,102,0.25)] rounded-2xl p-7 sm:p-8 flex flex-col gap-4 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-full bg-[rgba(37,211,102,0.15)] flex items-center justify-center text-[#25D366] shrink-0">
                  <WhatsAppIcon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] m-0">
                    Contacto Directo por WhatsApp
                  </h3>
                  <span className="text-xs text-[#25D366] font-semibold">
                    Opción recomendada • Respuesta casi inmediata
                  </span>
                </div>
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed m-0">
                Inicia un chat directamente con nuestro equipo sin necesidad de completar formularios.
              </p>

              {!IS_WHATSAPP_AVAILABLE && (
                <div className="flex gap-2 items-center bg-yellow-500/10 border border-yellow-500/25 rounded-lg p-3 text-yellow-500 text-xs">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>WhatsApp no disponible temporalmente (variable de entorno no configurada).</span>
                </div>
              )}

              <button
                id="contact-whatsapp-direct"
                type="button"
                onClick={handleWhatsappClick}
                disabled={!IS_WHATSAPP_AVAILABLE}
                className="btn-whatsapp-primary"
              >
                <WhatsAppIcon size={20} />
                <span>Continuar por WhatsApp</span>
              </button>
            </div>

            {/* ── SEPARADOR VISUAL ── */}
            <div className="flex items-center gap-4 my-1">
              <div className="flex-1 h-[1px] bg-[var(--color-border-custom)]" />
              <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                O envía un correo
              </span>
              <div className="flex-1 h-[1px] bg-[var(--color-border-custom)]" />
            </div>

            {/* ── 2. OPCIÓN SECUNDARIA: FORMULARIO DE MAIL ── */}
            <form
              id="contact-email-form"
              onSubmit={handleEmailSubmit}
              noValidate
              className="bg-[var(--color-surface)] border border-white/10 rounded-2xl p-8 sm:p-9 flex flex-col gap-5"
            >
              <div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1">
                  Formulario de Contacto por Correo
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] m-0">
                  Completa los campos para recibir un presupuesto o propuesta formal por email.
                </p>
              </div>

              {/* Success state */}
              {status === 'success' && (
                <div
                  id="form-success-message"
                  className="flex gap-3 items-start bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-4 text-emerald-400 text-sm leading-relaxed"
                >
                  <CheckCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{apiMessage}</span>
                </div>
              )}

              {/* Error state */}
              {status === 'error' && !Object.keys(errors).length && (
                <div
                  id="form-error-message"
                  className="flex gap-3 items-start bg-rose-500/10 border border-rose-500/25 rounded-xl p-4 text-rose-400 text-sm leading-relaxed"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{apiMessage}</span>
                </div>
              )}

              {/* Row: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="input-label">Nombre *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Juan García"
                    className={`input-field${errors.name ? ' error' : ''}`}
                    disabled={status === 'loading'}
                    autoComplete="given-name"
                  />
                  {errors.name && (
                    <span className="text-xs text-[var(--color-error)] mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="input-label">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="juan@empresa.com"
                    className={`input-field${errors.email ? ' error' : ''}`}
                    disabled={status === 'loading'}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="text-xs text-[var(--color-error)] mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Row: Company + Project type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-company" className="input-label">Empresa *</label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Mi Empresa S.A."
                    className={`input-field${errors.company ? ' error' : ''}`}
                    disabled={status === 'loading'}
                    autoComplete="organization"
                  />
                  {errors.company && (
                    <span className="text-xs text-[var(--color-error)] mt-1 block">
                      {errors.company}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-projectType" className="input-label">Tipo de Proyecto *</label>
                  <select
                    id="contact-projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className={`input-field cursor-pointer${errors.projectType ? ' error' : ''}`}
                    disabled={status === 'loading'}
                  >
                    <option value="" disabled>Seleccionar...</option>
                    <option value="SaaS">Plataforma SaaS</option>
                    <option value="Sistema de Gestión">Sistema de Gestión / ERP</option>
                    <option value="Software a Medida">Software a Medida</option>
                  </select>
                  {errors.projectType && (
                    <span className="text-xs text-[var(--color-error)] mt-1 block">
                      {errors.projectType}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="input-label">
                  Mensaje *
                  <span className="text-[var(--color-text-muted)] font-normal ml-1.5">
                    ({form.message.length}/2000)
                  </span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos brevemente el desafío o proyecto que tienes en mente..."
                  rows={4}
                  maxLength={2000}
                  className={`input-field resize-y min-h-[100px]${errors.message ? ' error' : ''}`}
                  disabled={status === 'loading'}
                />
                {errors.message && (
                  <span className="text-xs text-[var(--color-error)] mt-1 block">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Email Button */}
              <button
                id="contact-submit-email"
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="btn-secondary justify-center w-full !transform-none opacity-100 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Enviando Correo...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={18} />
                    Correo Enviado con Éxito
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    Enviar por Correo
                  </>
                )}
              </button>

              <p className="text-xs text-[var(--color-text-muted)] text-center leading-relaxed m-0">
                Tu información es confidencial y no será compartida con terceros.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
