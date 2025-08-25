export default function Banner({ 
  src = '/banner.jpg', 
  headline = 'Nueva Temporada', 
  sub = 'Streetwear futurista',
  ctaText = 'Explorar',
  onCta
}) {
  return (
    <section className="kora-banner">
      <div className="kora-banner__img" style={{ backgroundImage: `url(${src})` }} />
      <div className="kora-banner__overlay">
        <h1 className="kora-banner__title">{headline}</h1>
        <p className="kora-banner__sub">{sub}</p>
        <button className="btn btn--primary" onClick={onCta}>{ctaText}</button>
      </div>
    </section>
  )
}
