import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function ContactForm() {
  const [prepared, setPrepared] = useState(null);

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
    const body = `Hola Jose David,\n\n${project}\n\n${name}\n${email}`;
    setPrepared(`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }

  function invalidateMessage(event) {
    event.target.setCustomValidity?.('');
    setPrepared(null);
  }

  return <form className="contact-form" onSubmit={prepareMessage} onInput={invalidateMessage}>
    <div className="form-row">
      <label>Tu nombre<input required name="name" autoComplete="name" placeholder="¿Cómo te llamas?" maxLength={120} /></label>
      <label>Tu correo<input required type="email" name="email" autoComplete="email" placeholder="tu@correo.com" maxLength={254} /></label>
    </div>
    <label>Cuéntame sobre tu proyecto<textarea required name="project" rows={4} placeholder="El problema, la idea o el sistema que quieres mejorar…" maxLength={3000} /></label>
    <button className="button button-primary" type="submit">Preparar correo <ArrowUpRight size={16} /></button>
    <p className="form-note">El mensaje se envía desde tu aplicación de correo.</p>
    {prepared && <a className="text-link contact-draft" href={prepared} target="_blank" rel="noreferrer">Abrir aplicación de correo <ArrowUpRight size={15} /></a>}
    <p className="contact-status" role="status">{prepared ? 'Mensaje preparado. Abre tu aplicación de correo, revisa el mensaje y envíalo allí.' : ''}</p>
  </form>;
}
