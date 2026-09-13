import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import type { ContactFormData, ContactFormErrors, ApiResponse } from '../types/contact.types';

const EMPTY_FORM: ContactFormData = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  message: '',
};

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

const API_URL = 'http://localhost:3001/api/contact';

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

  const handleSubmit = async (e: React.FormEvent) => {
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
      setApiMessage('No se pudo conectar con el servidor. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* BG orb */}
      <div
        className="orb orb-primary animate-glow-pulse"
        style={{ width: '600px', height: '600px', bottom: '-100px', right: '-150px', animationDelay: '0.5s' }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left — Info */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="section-label">Contacto</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}
            >
              Cuéntanos sobre{' '}
              <span className="gradient-text-brand">tu proyecto</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: '2.5rem', fontSize: '1rem' }}>
              Respondemos en menos de 24 horas hábiles. Sin compromisos —
              la primera conversación es para entender si podemos ayudarte.
            </p>

            {/* Trust points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { title: 'Evaluación técnica sin cargo', desc: 'Analizamos tu caso y te damos una perspectiva honesta.' },
                { title: 'Propuesta en 5 días hábiles', desc: 'Presupuesto detallado con alcance y timeline.' },
                { title: 'Confidencialidad garantizada', desc: 'Firmamos NDA si el proyecto lo requiere.' },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: 'flex',
                    gap: '0.875rem',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-card)',
                    background: 'var(--color-surface)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--color-brand-glow)',
                      marginTop: '0.35rem',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.2rem' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.8375rem', color: 'var(--color-text-secondary)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              noValidate
              style={{
                background: 'var(--color-surface)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              {/* Success state */}
              {status === 'success' && (
                <div
                  id="form-success-message"
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    background: 'rgba(34, 197, 94, 0.08)',
                    border: '1px solid rgba(34, 197, 94, 0.25)',
                    borderRadius: '0.75rem',
                    padding: '1rem 1.25rem',
                    color: '#4ade80',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}
                >
                  <CheckCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span>{apiMessage}</span>
                </div>
              )}

              {/* Error state */}
              {status === 'error' && !Object.keys(errors).length && (
                <div
                  id="form-error-message"
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    background: 'rgba(248, 113, 113, 0.08)',
                    border: '1px solid rgba(248, 113, 113, 0.25)',
                    borderRadius: '0.75rem',
                    padding: '1rem 1.25rem',
                    color: '#f87171',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span>{apiMessage}</span>
                </div>
              )}

              {/* Row: Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
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
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-error)', marginTop: '0.3rem', display: 'block' }}>
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
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-error)', marginTop: '0.3rem', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Row: Company + Project type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
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
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-error)', marginTop: '0.3rem', display: 'block' }}>
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
                    className={`input-field${errors.projectType ? ' error' : ''}`}
                    disabled={status === 'loading'}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="" disabled>Seleccionar...</option>
                    <option value="SaaS">Plataforma SaaS</option>
                    <option value="Sistema de Gestión">Sistema de Gestión / ERP</option>
                    <option value="Software a Medida">Software a Medida</option>
                  </select>
                  {errors.projectType && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-error)', marginTop: '0.3rem', display: 'block' }}>
                      {errors.projectType}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="input-label">
                  Mensaje *
                  <span style={{ color: 'var(--color-text-muted)', fontWeight: 400, marginLeft: '0.35rem' }}>
                    ({form.message.length}/2000)
                  </span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos brevemente el desafío o proyecto que tienes en mente..."
                  rows={5}
                  maxLength={2000}
                  className={`input-field${errors.message ? ' error' : ''}`}
                  disabled={status === 'loading'}
                  style={{ resize: 'vertical', minHeight: '120px' }}
                />
                {errors.message && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-error)', marginTop: '0.3rem', display: 'block' }}>
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                id="contact-submit"
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="btn-primary"
                style={{
                  justifyContent: 'center',
                  opacity: status === 'loading' || status === 'success' ? 0.7 : 1,
                  cursor: status === 'loading' || status === 'success' ? 'not-allowed' : 'pointer',
                  width: '100%',
                  transform: 'none',
                }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Enviando...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={18} />
                    Enviado con éxito
                  </>
                ) : (
                  <>
                    Enviar consulta
                    <Send size={18} />
                  </>
                )}
              </button>

              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                Tu información es confidencial y no será compartida con terceros.
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
