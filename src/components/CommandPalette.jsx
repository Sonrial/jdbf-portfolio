import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, ArrowUpRight, X, CornerDownLeft, Folder, Hash } from 'lucide-react';
import { isBackdropClick } from '../utils/dialog';
import { projects, projectGroups, expertise } from '../data/portfolio';

const sections = [{ id: 'about', title: 'Sobre mí' }, { id: 'stack', title: 'Mi caja de herramientas', keywords: expertise.flatMap(item => [item.title, ...item.tools]).join(' ') }, { id: 'work', title: 'Proyectos seleccionados' }, { id: 'cases', title: 'Casos técnicos' }, { id: 'contact', title: 'Contacto' }];

export default function CommandPalette({ open, onClose, onProject }) {
  const dialog = useRef(null);
  const input = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const options = [...sections.map(section => ({ ...section, type: 'section' })), ...projects.map(project => ({ ...project, type: 'project', keywords: `${projectGroups[project.number]} ${project.number}` }))].filter(item => {
    const content = normalize(`${item.title} ${item.category || ''} ${item.description || ''} ${item.keywords || ''}`);
    return terms.every(term => content.includes(term));
  });

  useEffect(() => {
    if (open && !dialog.current.open) { dialog.current.showModal(); input.current.focus(); }
    else if (!open && dialog.current.open) dialog.current.close();
  }, [open]);
  useEffect(() => { dialog.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' }); }, [active, query]);

  const choose = useCallback((item) => {
    dialog.current.close();
    if (item.type === 'project') onProject(item);
    else {
      window.location.assign(`#${item.id}`);
      const section = document.getElementById(item.id);
      section?.focus({ preventScroll: true });
      section?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  }, [onProject]);

  return <dialog ref={dialog} className="command-dialog" aria-label="Buscar en el portfolio" onClose={() => { setQuery(''); setActive(0); onClose(); }} onClick={event => { if (isBackdropClick(event)) dialog.current.close(); }} onKeyDown={event => {
    if (event.target !== input.current || event.nativeEvent.isComposing) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setActive(value => options.length ? (value + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length : 0); }
    if (event.key === 'Enter' && options[active]) { event.preventDefault(); choose(options[active]); }
  }}>
    <div className="command-search"><Search aria-hidden="true" size={19} /><input ref={input} placeholder="Busca proyectos, herramientas o secciones…" aria-label="Buscar proyectos y secciones" value={query} onChange={event => { setQuery(event.target.value); setActive(0); }} role="combobox" aria-expanded={open} aria-controls="command-results" aria-activedescendant={options[active] ? `command-${active}` : undefined} aria-autocomplete="list" /><button className="icon-button" aria-label="Cerrar búsqueda" onClick={() => dialog.current.close()}><X aria-hidden="true" size={16} /></button></div>
    <div className="command-results" id="command-results" role="listbox" aria-label="Resultados" onClick={event => { const option = event.target.closest("[data-option-index]"); if (option) choose(options[Number(option.dataset.optionIndex)]); }}>{options.length ? options.map((item, index) => <button type="button" tabIndex={-1} key={item.id || item.number} id={`command-${index}`} role="option" aria-selected={active === index} className={`command-option ${active === index ? 'selected' : ''}`} onMouseEnter={() => setActive(index)} data-option-index={index}>{item.type === 'project' ? <Folder aria-hidden="true" size={17} /> : <Hash aria-hidden="true" size={17} />}<span>{item.title}<small>{item.type === 'project' ? item.category : 'Ir a la sección'}</small></span><ArrowUpRight aria-hidden="true" size={15} /></button>) : <p className="no-results">Sin resultados. Prueba con «energía», «Python» o «contacto».</p>}</div>
    <p className="sr-only" role="status">{options.length} resultados disponibles</p>
    <div className="command-footer"><span><kbd>↑</kbd><kbd>↓</kbd> navegar</span><span><CornerDownLeft aria-hidden="true" size={12} /> abrir</span><span><kbd>esc</kbd> cerrar</span></div>
  </dialog>;
}
