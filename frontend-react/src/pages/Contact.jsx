export default function Contact() {
  const PROFILE = {
    name: 'Cristian Gutierrez',
    title: 'Frontend Developer ·',
    email: 'Cristianguti.93@gmail.com',
    location: 'Vigo, España',
    availability: 'Disponible / freelance',
    avatar: 'public/me.png',   // pon tu foto en public/me.jpg
    cv: 'public/CV.pdf',       // opcional: coloca tu CV en public/cv.pdf
    socials: {
      github: 'https://github.com/CristianGutierrezc',
      linkedin: 'https://www.linkedin.com/in/cristiangutierrezc/',
      portfolio: 'Proximamente'
    },
    tech: [
      'React', 'Vite', 'Node.js', 'Express', 'MongoDB',
      'Mongoose', 'JS', 'Git', 'CSS', 'HTML'
    ],
    about: `Desarrollador/a orientado/a a crear interfaces limpias y accesibles.
Me apasiona la experiencia de usuario, el rendimiento y las buenas prácticas.
He trabajado en proyectos full-stack con React + Node/Express + MongoDB.`
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      alert('Correo copiado al portapapeles 📋')
    } catch {
      location.href = `mailto:${PROFILE.email}`
    }
  }

  return (
    <section className="contact">
      {/* HERO */}
      <div className="contact-hero panel">
        <div className="contact-hero__avatar">
          <img src={PROFILE.avatar} alt={`Foto de ${PROFILE.name}`} />
        </div>

        <div className="contact-hero__info">
          <h1 className="mt-0">{PROFILE.name}</h1>
          <p className="contact-hero__title">{PROFILE.title}</p>
          <p className="muted">{PROFILE.location} · {PROFILE.availability}</p>

          <div className="link-group">
            <a className="link-btn" href={PROFILE.socials.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="link-btn" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="link-btn" href={PROFILE.socials.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
            <button className="link-btn" onClick={copyEmail}>Email</button>
            {PROFILE.cv && <a className="link-btn" href={PROFILE.cv} target="_blank" rel="noreferrer">Descargar CV</a>}
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="contact-grid">
        {/* Sobre mí */}
        <div className="panel">
          <h2 className="panel__title">Sobre mí</h2>
          <p className="clamp-3" style={{whiteSpace:'pre-line'}}>{PROFILE.about}</p>

          <div className="stat-grid">
            <div className="stat-card">
              <span className="stat-num">10+</span>
              <span className="stat-label">Proyectos</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">3</span>
              <span className="stat-label">Stack principales</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">2025</span>
              <span className="stat-label">Año de foco</span>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="panel">
          <h2 className="panel__title">Tecnologías</h2>
          <div className="tech-badges">
            {PROFILE.tech.map((t) => (
              <span key={t} className="badge badge--tech">{t}</span>
            ))}
          </div>

          <div className="cta-row">
            <a className="btn btn--primary" href={`mailto:${PROFILE.email}`}>Hablemos</a>
            <button className="btn" onClick={copyEmail}>Copiar email</button>
          </div>
        </div>
      </div>
    </section>
  )
}
