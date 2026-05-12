import React from "react";

const projects = [
  {
    number: "01",
    title: "Sistema de gestión para citas psicológicas",
    category: "Automation / Apps Script / UX Workflow",
    description: "Automatización de agenda, mensajes y trazabilidad operativa."
  },
  {
    number: "02",
    title: "Modelo fotovoltaico para análisis energético",
    category: "PV Design / PVSyst / Technical Reporting",
    description: "Modelado técnico, simulación energética y documentación de resultados."
  },
  {
    number: "03",
    title: "Motion graphics programados",
    category: "Remotion / React / Video Systems",
    description: "Animaciones generativas orientadas a flujos de edición y exportación."
  },
  {
    number: "04",
    title: "Validación de indicadores energéticos",
    category: "Energy Data / Python / Reporting",
    description: "Depuración, control de consistencia y estructuración de indicadores."
  },
  {
    number: "05",
    title: "Automatización de reportes administrativos",
    category: "Python / Excel / PDF Extraction",
    description: "Extracción, limpieza y consolidación de información operativa."
  },
  {
    number: "06",
    title: "Visualización técnica para decisiones",
    category: "Data Visualization / Engineering Communication",
    description: "Diseño de estructuras visuales para comunicar información compleja."
  }
];

const cases = [
  {
    number: "01",
    title: "Automatización administrativa",
    problem: "Procesos manuales, datos dispersos y baja trazabilidad en tareas repetitivas.",
    solution: "Diseño de un flujo estructurado con formularios, hojas de cálculo, lógica de validación y mensajes automatizados.",
    result: "Reducción de errores operativos, mayor control del flujo y menor tiempo dedicado a tareas mecánicas.",
    stack: "Google Sheets / Apps Script / UX Workflow"
  },
  {
    number: "02",
    title: "Análisis energético y validación técnica",
    problem: "Información energética inconsistente entre reportes, bases consolidadas e indicadores de desempeño.",
    solution: "Normalización de variables, revisión cruzada de datos y construcción de criterios para validar consumos, ahorros y emisiones.",
    result: "Información más confiable para reportes técnicos, toma de decisiones y comunicación institucional.",
    stack: "Python / Excel / Energy Data / Technical Reporting"
  },
  {
    number: "03",
    title: "Sistemas visuales programados",
    problem: "Necesidad de piezas visuales consistentes, editables y exportables sin depender de procesos manuales de diseño.",
    solution: "Implementación de componentes visuales programados con React y Remotion para generar animaciones reutilizables.",
    result: "Mayor control sobre estilo, tiempos, variantes visuales y exportación para edición de video.",
    stack: "React / Remotion / Motion Design"
  }
];

function Header() {
  return (
    <header className="header">
      <div className="container grid-12 headerInner">
        <a className="logo" href="#top" aria-label="JDBF Home">
          JDBF
        </a>
        <nav className="nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#cases">Case Studies</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function SectionHeading({ index, title, intro }) {
  return (
    <div className="sectionIntro grid-12">
      <div className="sectionLabel">{index}</div>
      <div className="sectionTitleBlock">
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  );
}

function App() {
  return (
    <main id="top">
      <style>{styles}</style>
      <Header />

      <section className="hero container grid-12" aria-labelledby="hero-title">
        <div className="heroIndex">01</div>
        <div className="heroContent">
          <p className="eyebrow">Engineering / Software / Visual Systems</p>
          <h1 id="hero-title">Diseño sistemas técnicos, automatizo procesos y traduzco datos en decisiones.</h1>
          <p className="heroSubtitle">
            Ingeniero en Energía y Sostenibilidad enfocado en automatización, sistemas fotovoltaicos,
            análisis técnico y herramientas visuales para procesos de alto impacto.
          </p>
          <div className="ctaRow">
            <a className="cta ctaPrimary" href="#work">Ver proyectos</a>
            <a className="cta" href="#contact">Contactar</a>
          </div>
        </div>
        <aside className="heroMeta" aria-label="Profile metadata">
          <span>Santander, Colombia</span>
          <span>Energy Systems</span>
          <span>Automation</span>
          <span>Technical Design</span>
        </aside>
      </section>

      <section id="work" className="section container" aria-labelledby="work-title">
        <SectionHeading
          index="02 / WORK"
          title="Selected Work"
          intro="Una selección de proyectos donde convergen ingeniería, software, automatización y visualización técnica."
        />

        <div className="workGrid" aria-label="Project gallery">
          {projects.map((project) => (
            <article className="workCard" key={project.number}>
              <div className="workMedia" aria-hidden="true">
                <span>{project.number}</span>
              </div>
              <div>
                <p className="workNumber">{project.number}</p>
                <h3>{project.title}</h3>
                <p className="workCategory">{project.category}</p>
                <p className="workDescription">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="cases" className="section container" aria-labelledby="cases-title">
        <SectionHeading
          index="03 / CASE STUDIES"
          title="Technical Case Studies"
          intro="Cada caso se documenta desde el problema, la solución implementada y el resultado obtenido."
        />

        <div className="caseList">
          {cases.map((item) => (
            <article className="caseStudy" key={item.number}>
              <div className="caseTitle">
                <span>{item.number}</span>
                <h3>{item.title}</h3>
              </div>
              <div className="caseBody">
                <div className="caseBlock">
                  <h4>Problema</h4>
                  <p>{item.problem}</p>
                </div>
                <div className="caseBlock">
                  <h4>Solución</h4>
                  <p>{item.solution}</p>
                </div>
                <div className="caseBlock">
                  <h4>Resultado</h4>
                  <p>{item.result}</p>
                </div>
                <div className="caseBlock">
                  <h4>Stack</h4>
                  <p>{item.stack}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section container aboutSection" aria-labelledby="about-title">
        <SectionHeading index="04 / ABOUT" title="About" />
        <div className="aboutGrid grid-12">
          <p className="aboutLead">
            Construyo soluciones para problemas técnicos que requieren orden, criterio y ejecución.
          </p>
          <div className="aboutCopy">
            <p>
              Soy Ingeniero en Energía y Sostenibilidad con experiencia en sistemas fotovoltaicos,
              automatización de procesos, análisis técnico y desarrollo de herramientas digitales.
            </p>
            <p>
              Trabajo en la intersección entre ingeniería, software y visualización. Mi enfoque es
              estructurar información compleja, convertirla en sistemas funcionales y producir resultados verificables.
            </p>
            <p>
              No diseño soluciones para impresionar. Diseño soluciones para que funcionen, reduzcan errores y ahorren tiempo.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="section container contactSection" aria-labelledby="contact-title">
        <SectionHeading
          index="05 / CONTACT"
          title="Hablemos de un sistema que necesita orden."
          intro="Disponible para proyectos de ingeniería aplicada, automatización, análisis técnico y visualización digital."
        />
        <div className="contactGrid grid-12">
          <a className="emailLink" href="mailto:contacto@jdbf.dev">contacto@jdbf.dev</a>
          <form className="contactForm" onSubmit={(event) => event.preventDefault()}>
            <label>
              Nombre
              <input type="text" name="name" placeholder="Tu nombre" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="tu@email.com" />
            </label>
            <label>
              Proyecto
              <textarea name="project" rows="5" placeholder="Describe el problema técnico o sistema que quieres resolver." />
            </label>
            <button type="submit" className="cta ctaPrimary">Enviar mensaje</button>
          </form>
        </div>
      </section>
    </main>
  );
}

const styles = `
:root {
  --white: #ffffff;
  --black: #000000;
  --red: #ff0000;
  --gray-100: #f5f5f5;
  --gray-200: #e5e5e5;
  --gray-500: #737373;
  --gray-700: #404040;
  --container: min(100% - 48px, 1440px);
  --font: Inter, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--white);
  color: var(--black);
  font-family: var(--font);
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
}
::selection { background: var(--red); color: var(--white); }
a { color: inherit; text-decoration: none; }
button, input, textarea { font: inherit; }

.container {
  width: var(--container);
  margin-inline: auto;
}

.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--gray-200);
}

.headerInner { height: 80px; align-items: center; }
.logo {
  grid-column: 1 / span 2;
  font-size: 0.875rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}
.nav {
  grid-column: 7 / span 6;
  display: flex;
  justify-content: flex-end;
  gap: 32px;
}
.nav a {
  position: relative;
  font-size: 0.875rem;
  letter-spacing: -0.02em;
}
.nav a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 0;
  height: 2px;
  background: var(--red);
  transition: width 220ms ease;
}
.nav a:hover::after { width: 100%; }

.hero {
  min-height: calc(100vh - 80px);
  align-items: center;
  padding-block: 96px;
}
.heroIndex {
  grid-column: 1 / span 1;
  align-self: start;
  color: var(--red);
  font-size: 0.875rem;
  font-weight: 800;
}
.heroContent { grid-column: 3 / span 8; }
.eyebrow {
  margin: 0 0 24px;
  color: var(--red);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
h1 {
  margin: 0;
  max-width: 1160px;
  font-size: clamp(3.5rem, 8vw, 8.5rem);
  line-height: 0.92;
  letter-spacing: -0.065em;
}
.heroSubtitle {
  max-width: 680px;
  margin: 40px 0 0;
  font-size: 1.125rem;
  line-height: 1.65;
  color: var(--gray-700);
}
.heroMeta {
  grid-column: 11 / span 2;
  align-self: start;
  display: grid;
  gap: 12px;
  color: var(--gray-700);
  font-size: 0.875rem;
  line-height: 1.4;
}
.ctaRow { display: flex; gap: 28px; margin-top: 56px; flex-wrap: wrap; }
.cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.ctaPrimary { color: var(--red); }
.cta::before {
  content: "";
  width: 32px;
  height: 2px;
  background: currentColor;
  transition: width 220ms ease;
}
.cta:hover::before { width: 56px; }

.section {
  padding-block: 144px;
  border-top: 1px solid var(--gray-200);
}
.sectionIntro { margin-bottom: 64px; }
.sectionLabel {
  grid-column: 1 / span 3;
  color: var(--red);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.sectionTitleBlock { grid-column: 4 / span 8; }
.sectionTitleBlock h2 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.055em;
}
.sectionTitleBlock p {
  max-width: 720px;
  margin: 28px 0 0;
  color: var(--gray-700);
  font-size: 1.125rem;
  line-height: 1.6;
}

.workGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--gray-200);
  border: 1px solid var(--gray-200);
}
.workCard {
  min-height: 460px;
  background: var(--white);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.workMedia {
  min-height: 210px;
  background:
    linear-gradient(90deg, transparent calc(100% - 1px), var(--gray-200) calc(100% - 1px)),
    linear-gradient(180deg, transparent calc(100% - 1px), var(--gray-200) calc(100% - 1px)),
    var(--gray-100);
  background-size: 32px 32px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 16px;
  transition: background-size 240ms ease;
}
.workMedia span {
  color: var(--red);
  font-size: 3rem;
  line-height: 0.85;
  font-weight: 800;
  letter-spacing: -0.06em;
}
.workCard:hover .workMedia { background-size: 24px 24px; }
.workNumber {
  margin: 24px 0 0;
  color: var(--red);
  font-size: 0.75rem;
  font-weight: 800;
}
.workCard h3 {
  margin: 16px 0 12px;
  font-size: 1.5rem;
  line-height: 1.08;
  letter-spacing: -0.035em;
  transition: transform 220ms ease;
}
.workCard:hover h3 { transform: translateX(4px); }
.workCategory,
.workDescription {
  margin: 0;
  color: var(--gray-700);
  font-size: 0.875rem;
  line-height: 1.5;
}
.workDescription { margin-top: 16px; }

.caseList { border-top: 1px solid var(--black); }
.caseStudy {
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  padding-block: 48px;
  border-bottom: 1px solid var(--gray-200);
}
.caseStudy::before {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--red);
  transition: width 260ms ease;
}
.caseStudy:hover::before { width: 100%; }
.caseTitle { grid-column: 1 / span 4; }
.caseTitle span {
  display: block;
  color: var(--red);
  font-size: 0.75rem;
  font-weight: 800;
  margin-bottom: 16px;
}
.caseTitle h3 {
  margin: 0;
  max-width: 360px;
  font-size: 2rem;
  line-height: 1.05;
  letter-spacing: -0.045em;
}
.caseBody {
  grid-column: 5 / span 7;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 36px 48px;
}
.caseBlock h4 {
  margin: 0 0 12px;
  color: var(--red);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.caseBlock p {
  margin: 0;
  color: var(--gray-700);
  line-height: 1.6;
}

.aboutGrid { margin-top: 24px; }
.aboutLead {
  grid-column: 4 / span 4;
  margin: 0;
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 0.98;
  letter-spacing: -0.055em;
}
.aboutCopy {
  grid-column: 8 / span 4;
  display: grid;
  gap: 24px;
}
.aboutCopy p {
  margin: 0;
  color: var(--gray-700);
  font-size: 1.05rem;
  line-height: 1.7;
}
.contactGrid { margin-top: 32px; }
.emailLink {
  grid-column: 4 / span 3;
  color: var(--red);
  font-weight: 800;
  letter-spacing: -0.02em;
}
.contactForm {
  grid-column: 7 / span 5;
  display: grid;
  gap: 24px;
}
.contactForm label {
  display: grid;
  gap: 10px;
  color: var(--black);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.contactForm input,
.contactForm textarea {
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--black);
  border-radius: 0;
  padding: 16px 0;
  background: transparent;
  color: var(--black);
  outline: none;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
}
.contactForm input:focus,
.contactForm textarea:focus { border-bottom-color: var(--red); }

@media (max-width: 1000px) {
  .grid-12 { grid-template-columns: repeat(6, 1fr); column-gap: 16px; }
  .nav { grid-column: 3 / span 4; gap: 20px; }
  .heroIndex { grid-column: 1 / span 1; }
  .heroContent { grid-column: 1 / span 6; margin-top: 32px; }
  .heroMeta { grid-column: 1 / span 6; margin-top: 48px; }
  .sectionLabel, .sectionTitleBlock { grid-column: 1 / span 6; }
  .sectionLabel { margin-bottom: 24px; }
  .workGrid { grid-template-columns: repeat(2, 1fr); }
  .caseTitle { grid-column: 1 / span 6; margin-bottom: 32px; }
  .caseBody { grid-column: 1 / span 6; }
  .aboutLead { grid-column: 1 / span 6; }
  .aboutCopy { grid-column: 1 / span 6; margin-top: 40px; }
  .emailLink { grid-column: 1 / span 6; margin-bottom: 32px; }
  .contactForm { grid-column: 1 / span 6; }
}

@media (max-width: 640px) {
  :root { --container: min(100% - 32px, 100%); }
  .headerInner { height: auto; padding-block: 20px; row-gap: 18px; }
  .logo, .nav { grid-column: 1 / span 6; }
  .nav { justify-content: flex-start; flex-wrap: wrap; }
  .hero { min-height: auto; padding-block: 80px; }
  h1 { font-size: clamp(3rem, 18vw, 5rem); }
  .section { padding-block: 88px; }
  .workGrid { grid-template-columns: 1fr; }
  .caseBody { grid-template-columns: 1fr; }
}
`;

export default App;
