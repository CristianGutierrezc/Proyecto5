export default function Contact() {
  // Datos de perfil 
  const PROFILE = {
    name: 'Cristian Gutierrez',
    title: 'Full-Stack Developer',
    email: 'Cristianguti.93@gmail.com',
    location: 'Vigo, España',
    availability: 'Disponible para proyectos',
    avatar: '/me.png',   
    cv: '/CV.pdf',       
    socials: {
      github: 'https://github.com/CristianGutierrezc',
      linkedin: 'https://www.linkedin.com/in/cristiangutierrezc/',
      portfolio: 'Proximamente' 
    },
    // Tecnologías principales 
    tech: [
      'React', 'Vite', 'Node.js', 'Express', 'MongoDB',
      'JavaScript', 'HTML', 'CSS', 'REST APIs', 'Git'
    ],
    // sección de certificaciones
    certs: [
      {
        name: 'AI-900: Microsoft Azure AI Fundamentals',
        issuer: 'Microsoft',
        verifyUrl: 'https://www.credly.com/badges/af30f9c8-db47-4765-92d2-301a24c91376/public_url' 
      }
    ]
  }

  //  email al portapapeles
  function copyEmail() {
    navigator.clipboard.writeText(PROFILE.email)
      .then(() => alert('Email copiado'))
      .catch(() => alert('No se pudo copiar el email'))
  }

  // Mailto con asunto y cuerpo predefinidos
  const mailto = `mailto:${PROFILE.email}?subject=Contacto%20profesional&body=Hola%20Cristian,%20te%20escribo%20por%20...`

  return (
    <section className="contact">
      {/* Cabecera tipo "hero" */}
      <div className="contact__hero">
        <img
          className="contact__avatar"
          src={PROFILE.avatar}
          alt={`Foto de ${PROFILE.name}`}
          loading="lazy"
        />

        <div className="contact__summary">
          <h1 className="contact__name">{PROFILE.name}</h1>
          <p className="contact__title">{PROFILE.title}</p>

          <ul className="contact__meta">
            <li><strong>Ubicación:</strong> {PROFILE.location}</li>
            <li><strong>Disponibilidad:</strong> {PROFILE.availability}</li>
            <li><strong>Email:</strong> <a href={mailto}>{PROFILE.email}</a></li>
          </ul>

          <div className="contact__cta">
            <a className="btn btn--primary" href={mailto}>Hablemos</a>
            <button className="btn" type="button" onClick={copyEmail}>Copiar email</button>
            <a className="btn" href={PROFILE.cv} target="_blank" rel="noreferrer">Descargar CV</a>
          </div>

          <div className="contact__links">
            <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">GitHub</a>
            <span>·</span>
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <span>·</span>
            <a href={PROFILE.socials.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
          </div>
        </div>
      </div>

      {/* Bloques en grid: Sobre mí, Tech, Certificaciones */}
      <div className="contact__grid">
        {/* Sobre mí */}
        <article className="card">
          <h2 className="card__title">Sobre mí</h2>
          <p className="card__text">
            Desarrollador Full-Stack con foco en construir interfaces claras y APIs fiables. Trabajo con React, Redux Toolkit y JavaScript en el frontend; Node.js, Express y MongoDB en el backend. Me interesa aplicar IA de forma práctica en productos digitales, cuidando las buenas prácticas y un diseño consistente.
          </p>
        </article>

        {/* Tecnologías */}
        <article className="card">
          <h2 className="card__title">Tecnologías</h2>
          <div className="badges">
            {PROFILE.tech.map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        </article>

        {/* Certificaciones (incluye AI-900) */}
        <article className="card">
          <h2 className="card__title">Certificaciones</h2>
          <ul className="certs">
            {PROFILE.certs.map((c) => (
              <li key={c.name} className="certs__item">
                <div className="certs__info">
                  <strong className="certs__name">{c.name}</strong>
                  <span className="certs__issuer"> · {c.issuer}</span>
                </div>
                {c.verifyUrl ? (
                  <a className="btn btn--ghost" href={c.verifyUrl} target="_blank" rel="noreferrer">
                    Verificar
                  </a>
                ) : (
                  <span className="certs__pending">Verificación no disponible</span>
                )}
              </li>
            ))}
          </ul>
          <p className="card__hint">
           
          </p>
        </article>
      </div>
    </section>
  )
}
