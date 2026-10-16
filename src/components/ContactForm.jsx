import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function ContactForm() {
  const [prepared, setPrepared] = useState(null);
  const [errors, setErrors] = useState({});

  function prepareMessage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = fields.get('name').trim();
    const email = fields.get('email').trim();
    const project = fields.get('project').trim();
    for (const [field, value] of [['name', name], ['project', project]]) {
      if (!value) {
        form.elements.namedItem(field).setCustomValidity('Escribe un texto, no solo espacios.');
        form.reportValidity();
        return;
      }
    }
    const subject = `Proyecto de ${name}`;
    const body = `Hola José David,\n\n${project}\n\n${name}\n${email}`;
    setPrepared(`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }

  function invalidateMessage(event) {
    event.target.setCustomValidity?.('');
    setPrepared(null);
    const field = event.target.name;
    setErrors(previous => {
      if (!previous[field]) return previous;
      const next = { ...previous }; delete next[field]; return next;
    });
  }

  function showError(event) {
    event.preventDefault();
    const field = event.target;
    const missing = { name: 'Escribe tu nombre.', email: 'Escribe tu correo electrónico.', project: 'Describe el proyecto que quieres conversar.' };
    const message = field.validity.valueMissing ? missing[field.name] : field.validity.typeMismatch ? 'Escribe un correo con el formato nombre@dominio.com.' : field.validationMessage;
    setErrors(previous => ({ ...previous, [field.name]: message }));
    event.currentTarget.querySelector(':invalid')?.focus();
  }

  return <form className="contact-form" onSubmit={prepareMessage} onInput={invalidateMessage} onInvalid={showError}>
    <div className="form-row">
      <div className="form-field"><label>Tu nombre<input required name="name" autoComplete="name" placeholder="¿Cómo te llamas?" maxLength={120} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'contact-name-error' : undefined} /></label>{errors.name && <span className="field-error" id="contact-name-error" role="alert">{errors.name}</span>}</div>
      <div className="form-field"><label>Tu correo<input required type="email" name="email" autoComplete="email" inputMode="email" spellCheck={false} placeholder="tu@correo.com" maxLength={254} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'contact-email-error' : undefined} /></label>{errors.email && <span className="field-error" id="contact-email-error" role="alert">{errors.email}</span>}</div>
    </div>
    <div className="form-field"><label>Cuéntame sobre tu proyecto<textarea required name="project" rows={4} placeholder="El problema, la idea o el sistema que quieres mejorar…" maxLength={3000} aria-invalid={errors.project ? true : undefined} aria-describedby={errors.project ? 'contact-project-error' : undefined} /></label>{errors.project && <span className="field-error" id="contact-project-error" role="alert">{errors.project}</span>}</div>
    <button className="button button-primary" type="submit">Preparar correo <ArrowUpRight aria-hidden="true" size={16} /></button>
    <p className="form-note">El mensaje se envía desde tu aplicación de correo.</p>
    {prepared && <a className="text-link contact-draft" href={prepared} target="_blank" rel="noreferrer">Abrir aplicación de correo <ArrowUpRight aria-hidden="true" size={15} /></a>}
    <p className="contact-status" role="status">{prepared ? 'Mensaje preparado. Abre tu aplicación de correo, revisa el mensaje y envíalo allí.' : ''}</p>
  </form>;
}
