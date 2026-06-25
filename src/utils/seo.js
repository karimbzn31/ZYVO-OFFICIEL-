export const defaultMeta = {
  title: 'Zyvo — Le bon pro, près de chez vous',
  description: 'Trouvez des prestataires vérifiés en Algérie. Plomberie, ménage, cours, coiffure et plus. Réservez en un clic.',
  image: '/og-image.png',
  url: 'https://zyvo.dz',
}

export function buildMeta(overrides = {}) {
  const meta = { ...defaultMeta, ...overrides }
  return {
    title: meta.title,
    meta: [
      { name: 'description', content: meta.description },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:image', content: meta.image },
      { property: 'og:url', content: meta.url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: meta.title },
      { name: 'twitter:description', content: meta.description },
    ],
  }
}
