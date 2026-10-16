import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowUp, Sun, Moon, Search, MapPin, Mail, Copy, Check, Download, Zap, Code2, Layers3, ChartNoAxesCombined, ChevronDown, X } from 'lucide-react';
import { profile, projects, cases, projectGroups, expertise } from './data/portfolio';
import { experience, education, courses, additionalTraining } from './data/career';
import CommandPalette from './components/CommandPalette';
import ProjectVisual from './components/ProjectVisual';
import ContactForm from './components/ContactForm';
import SceneBoundary, { Illustration } from './components/SceneBoundary';
import useTheme from './hooks/useTheme';
import { isBackdropClick } from './utils/dialog';
import './App.css';

const EnergyScene = lazy(() => import('./components/EnergyScene'));
const navigation = [['about', 'Sobre mí'], ['work', 'Proyectos'], ['cases', 'Casos'], ['contact', 'Contacto']];
const icons = { energy: Zap, code: Code2, model: ChartNoAxesCombined, visual: Layers3 };

function SectionTitle({ index, title, count, caption }) {
  return <div className="section-heading"><div><span className="section-index">{index} /</span><h2>{title}{count && <sup>{count}</sup>}</h2></div>{caption && <span className="section-caption">{caption}</span>}</div>;
}

function App() {
  const [theme, toggleTheme] = useTheme();
  const [commandOpen, setCommandOpen] = useState(false);
  const [filter, setFilter] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const projectDialog = useRef(null);
  const copyTimer = useRef(null);

  useEffect(() => {
    const onKey = (event) => {
      if (!event.isComposing && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); setCommandOpen(value => !value);
      }
    };
    window.addEventListener('keydown', onKey);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-15% 0px -65% 0px' });
    navigation.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.reveal').forEach(element => {
      element.classList.add('reveal-ready'); revealObserver.observe(element);
    });
    return () => { window.removeEventListener('keydown', onKey); observer.disconnect(); revealObserver.disconnect(); clearTimeout(copyTimer.current); };
  }, []);

  useEffect(() => {
    if (selectedProject && !projectDialog.current.open) projectDialog.current.showModal();
  }, [selectedProject]);

  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopyStatus('Correo copiado'); }
    catch { setCopyStatus('Puedes copiar el correo directamente: ' + profile.email); }
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyStatus(''), 4500);
  }

  function downloadContact() {
    const card = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${profile.name}`, 'N:Barrios Franco;José David;;;' , `TITLE:${profile.role}`, `EMAIL:${profile.email}`, 'ADR:;;;Piedecuesta;Santander;;Colombia', `URL:${profile.linkedin}`, 'END:VCARD'].join('\r\n');
    const url = URL.createObjectURL(new Blob([card], { type: 'text/vcard;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'Jose-David-Barrios-Franco.vcf'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const visibleProjects = projects.filter(project => filter === 'Todos' || projectGroups[project.number] === filter);
  const selectedCase = selectedProject && cases.find(item => item.number === selectedProject.number);

  return <>
    <a className="skip-link" href="#main">Saltar al contenido</a>
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#top" aria-label="JDBF — Inicio">jd<span className="wordmark-b">b</span>f<span className="wordmark-dot">.</span></a>
        <nav aria-label="Navegación principal">{navigation.map(([id, label]) => <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{label}</a>)}</nav>
        <div className="header-actions"><button className="search-button" onClick={() => setCommandOpen(true)} aria-label="Buscar en el portfolio"><Search aria-hidden="true" size={15} /><span>Buscar</span><kbd>⌘ K</kbd></button><button className="icon-button theme-button" aria-label={theme === 'light' ? 'Activar tema oscuro' : 'Activar tema claro'} onClick={toggleTheme}>{theme === 'light' ? <Moon aria-hidden="true" size={17} /> : <Sun aria-hidden="true" size={17} />}</button></div>
      </div>
    </header>

    <main id="main" tabIndex={-1} className="portfolio-shell">
      <div id="top" className="page-label"><span>PORTFOLIO PERSONAL</span><span>ENERGÍA × TECNOLOGÍA</span></div>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="availability"><span className="status-dot" />Disponible para proyectos</div>
          <h1 id="hero-title">José David<br />Barrios Franco<span className="name-dot">.</span></h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-tagline">Energía. Datos. <span>Sistemas.</span></p>
          <div className="hero-links"><a className="button button-primary" href="#work">Explorar proyectos <ArrowUpRight aria-hidden="true" size={16} /></a><a className="text-link" href="#contact">Hablemos <ArrowRight aria-hidden="true" size={15} /></a></div>
        </div>
        <figure className="hero-art"><div className="figure-top"><span className="mono">FIG. 01</span><span className="scene-label"><span />SISTEMA EN MOVIMIENTO</span></div><SceneBoundary><Suspense fallback={<Illustration />}><EnergyScene theme={theme} /></Suspense></SceneBoundary><figcaption><span>Transformar energía en posibilidades.</span><span className="mono">↗ JDBF</span></figcaption></figure>
      </section>

      <div className="profile-strip"><div><MapPin aria-hidden="true" size={15} /><span>{profile.location}</span></div><div><Zap aria-hidden="true" size={15} /><span>Energy & Sustainability</span></div><button onClick={downloadContact}><Download aria-hidden="true" size={15} /><span>Guardar contacto</span><ArrowUpRight aria-hidden="true" size={13} /></button></div>
      <div className="stripe-divider" aria-hidden="true" />

      <section id="about" tabIndex={-1} className="section reveal" aria-labelledby="about-title">
        <SectionTitle index="01" title={<span id="about-title">Sobre mí</span>} caption="INGENIERÍA CON PROPÓSITO" />
        <div className="about-content"><p className="about-lead">Trabajo en la intersección entre <strong>energía, datos y software aplicado.</strong></p><p className="about-intro">{profile.headline}</p><div className="about-copy"><p>{profile.introduction}</p>{profile.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><div className="signature"><span className="signature-mark">jdbf.</span><span>Soluciones que funcionan.<br />Decisiones que se pueden explicar.</span></div></div>
      </section>

      <div className="stripe-divider" aria-hidden="true" />
      <section id="experience" tabIndex={-1} className="section reveal" aria-labelledby="experience-title">
        <SectionTitle index="02" title={<span id="experience-title">Trayectoria</span>} caption="EXPERIENCIA Y PARTICIPACIÓN ACADÉMICA" />
        <div className="career-list">{experience.map(item => <article className="career-item" key={item.id}>
          <div className="career-period mono">{item.start ? <><time dateTime={item.start}>Julio</time> — <time dateTime={item.end}>noviembre de 2025</time></> : <time dateTime={item.year}>{item.period}</time>}</div>
          <div className="career-copy"><span className="career-type mono">{item.type}</span><h3>{item.role}</h3><p className="career-organization">{item.organization}</p><p className="career-location">{item.location}</p><ul>{item.highlights.map(text => <li key={text}>{text}</li>)}</ul></div>
        </article>)}</div>
      </section>

      <div className="stripe-divider" aria-hidden="true" />
      <section id="stack" tabIndex={-1} className="section reveal" aria-labelledby="stack-title">
        <SectionTitle index="03" title={<span id="stack-title">Mi caja de herramientas</span>} caption="DEL ANÁLISIS A LA IMPLEMENTACIÓN" />
        <div className="expertise-grid">{expertise.map(item => { const Icon = icons[item.icon]; return <article className="expertise-item" key={item.number}><div className="expertise-top"><Icon aria-hidden="true" size={21} strokeWidth={1.5} /><span className="mono">{item.number}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="tags">{item.tools.map(tool => <span key={tool}>{tool}</span>)}</div></article>; })}</div>
      </section>

      <div className="stripe-divider" aria-hidden="true" />
      <section id="work" tabIndex={-1} className="section reveal" aria-labelledby="work-title">
        <SectionTitle index="04" title={<span id="work-title">Proyectos seleccionados</span>} count="06" />
        <div className="work-intro"><p>Ingeniería, software y visualización técnica.<br />Un mismo enfoque: convertir complejidad en claridad.</p><div className="filters" role="group" aria-label="Filtrar proyectos">{['Todos', 'Energía', 'Software', 'Sostenibilidad'].map(label => <button key={label} aria-pressed={filter === label} className={filter === label ? 'selected' : ''} onClick={() => setFilter(label)}>{label}</button>)}</div></div>
        <p className="sr-only" role="status">{visibleProjects.length} proyectos visibles</p>
        <div className="projects-grid">{visibleProjects.map(project => <article className="project-card" key={project.number}><button className="project-open" onClick={() => setSelectedProject(project)} aria-label={`Ver proyecto: ${project.title}`}><div className={`project-media visual-${project.number}`}><ProjectVisual number={project.number} /><span className="project-media-label">{projectGroups[project.number]} / {project.number}</span><span className="project-media-arrow"><ArrowUpRight aria-hidden="true" size={17} /></span></div><div className="project-copy"><div className="project-topline"><span className="mono">PROYECTO {project.number}</span><ArrowUpRight aria-hidden="true" size={17} /></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-stack">{project.category.split(' / ').map(tag => <span key={tag}>{tag}</span>)}</div></div></button></article>)}</div>
      </section>

      <div className="stripe-divider" aria-hidden="true" />
      <section id="cases" tabIndex={-1} className="section reveal" aria-labelledby="cases-title">
        <SectionTitle index="05" title={<span id="cases-title">Detrás de la solución</span>} count="04" caption="CASOS TÉCNICOS" />
        <p className="section-description">El problema, el proceso y lo que cambió. Ingeniería documentada, de principio a fin.</p>
        <div className="cases-list">{cases.map((item, index) => <details className="case-item" key={item.number} open={index === 0}><summary><span className="case-number mono">{item.number}</span><span><span className="case-category">{projectGroups[item.number]}</span><h3>{item.title}</h3></span><ChevronDown aria-hidden="true" size={18} className="case-chevron" /></summary><div className="case-content">{[['Problema', item.problem], ['Solución', item.solution], ['Resultado', item.result]].map(([label, copy]) => <div className={`case-block ${label === 'Resultado' ? 'case-result' : ''}`} key={label}><h4>{label === 'Resultado' && <Check aria-hidden="true" size={14} />}{label}</h4><p>{copy}</p></div>)}<div className="case-tools"><Code2 aria-hidden="true" size={14} /><p>{item.stack}</p></div></div></details>)}</div>
      </section>

      <div className="stripe-divider" aria-hidden="true" />
      <section id="education" tabIndex={-1} className="section reveal" aria-labelledby="education-title">
        <SectionTitle index="06" title={<span id="education-title">Formación</span>} caption="APRENDIZAJE APLICADO" />
        <div className="education-content"><div className="education-degree"><span className="career-type mono">FORMACIÓN UNIVERSITARIA · <time dateTime={education.start}>{education.start}</time> — <time dateTime={education.end}>{education.end}</time></span><h3>{education.degree}</h3><p>{education.institution}</p><p className="career-location">{education.location}</p></div>
        <div className="language-list tags" aria-label="Idiomas">{education.languages.map(language => <span key={language}>{language}</span>)}</div>
        <div className="training-heading"><h3>Formación complementaria</h3><p>Cursos y talleres para ampliar mis herramientas de análisis.</p></div>
        <div className="training-grid">{courses.map((course, index) => <article className="training-item" key={course}><span className="career-type mono">INEL / 0{index + 1}</span><h4>{course}</h4></article>)}</div>
        <details className="additional-training"><summary>Más formación en datos, energía y herramientas digitales <ChevronDown aria-hidden="true" size={18} /></summary><div>{additionalTraining.map(item => <article key={item.title}><h4>{item.title}</h4><p>{item.description}</p></article>)}</div></details></div>
      </section>

      <div className="stripe-divider" aria-hidden="true" />
      <section id="contact" tabIndex={-1} className="section contact-section reveal" aria-labelledby="contact-title">
        <SectionTitle index="07" title={<span id="contact-title">Construyamos algo útil.</span>} caption="LA SIGUIENTE CONVERSACIÓN" />
        <div className="contact-grid"><div className="contact-copy"><span className="availability"><span className="status-dot" />Abierto a colaborar</span><h3>¿Un sistema que<br />necesita orden?</h3><p>Disponible para proyectos de energía, sistemas fotovoltaicos, eficiencia energética, automatización técnica y análisis de datos.</p><div className="email-row"><a href={`mailto:${profile.email}`}><Mail aria-hidden="true" size={17} />{profile.email}</a><button className="icon-button" aria-label="Copiar correo electrónico" onClick={copyEmail}>{copyStatus === 'Correo copiado' ? <Check aria-hidden="true" size={15} /> : <Copy aria-hidden="true" size={15} />}</button></div><a className="text-link professional-link" href={profile.linkedin} target="_blank" rel="noreferrer">Perfil en LinkedIn <ArrowUpRight aria-hidden="true" size={15} /></a><p role="status" className="copy-status">{copyStatus}</p><div className="contact-location"><MapPin aria-hidden="true" size={14} />{profile.location} <span>UTC−5</span></div></div><ContactForm /></div>
      </section>
      <footer className="footer"><a className="wordmark" href="#top" aria-label="Volver al inicio">jdbf<span className="wordmark-dot">.</span></a><p>© {new Date().getFullYear()} {profile.name}<br /><span>Hecho con criterio. Pensado para ser útil.</span></p><a href="https://github.com/Sonrial/jdbf-portfolio" target="_blank" rel="noreferrer" className="footer-source"><Code2 aria-hidden="true" size={15} />Código fuente <ArrowUpRight aria-hidden="true" size={13} /></a><a href="#top" className="back-top" aria-label="Volver arriba"><ArrowUp aria-hidden="true" size={17} /></a></footer>
    </main>

    <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} onProject={setSelectedProject} />
    <dialog ref={projectDialog} className="project-dialog" onClose={() => setSelectedProject(null)} onClick={event => { if (isBackdropClick(event)) projectDialog.current.close(); }} aria-labelledby="project-dialog-title">
      {selectedProject && <><div className="dialog-actions"><button className="icon-button dialog-close" onClick={() => projectDialog.current.close()} aria-label="Cerrar proyecto" autoFocus><X aria-hidden="true" size={18} /></button></div><div className={`dialog-art visual-${selectedProject.number}`}><ProjectVisual number={selectedProject.number} /></div><div className="dialog-copy"><span className="mono section-index">PROYECTO {selectedProject.number} / {projectGroups[selectedProject.number]}</span><h2 id="project-dialog-title">{selectedProject.title}</h2><p>{selectedProject.description}</p>{selectedCase && <div className="dialog-case">{[['Problema', selectedCase.problem], ['Solución', selectedCase.solution], ['Resultado', selectedCase.result]].map(([title, body]) => <div key={title}><h3>{title}</h3><p>{body}</p></div>)}<p className="dialog-case-stack">{selectedCase.stack}</p></div>}<div className="tags">{selectedProject.category.split(' / ').map(tag => <span key={tag}>{tag}</span>)}</div><a className="button button-primary" href="#contact" onClick={() => projectDialog.current.close()}>Hablemos de un proyecto similar <ArrowUpRight aria-hidden="true" size={16} /></a></div></>}
    </dialog>
  </>;
}

export default App;
