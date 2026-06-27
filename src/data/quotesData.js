export const categories = [
  'Plomberie', 'Électricité', 'Ménage', 'Coiffure', 'Cours',
  'Santé', 'Déménagement', 'Jardinage', 'Développement', 'Design',
  'Marketing', 'Photographie', 'Réparation', 'Transport', 'Autre'
]

export const quotes = [
  {
    id: 1,
    title: 'Réparation fuite robinet cuisine',
    category: 'plomberie',
    description: "J'ai une fuite d'eau sous mon évier de cuisine. Le robinet fuit quand il est fermé, l'eau coule en continu.",
    city: 'Alger',
    budgetRange: '2000 - 4000 DA',
    urgency: 'urgent',
    date: '2026-06-25',
    responsesCount: 3,
    status: 'answered',
    responses: [
      { providerId: 1, providerName: 'Karim B.', providerAvatar: 'KB', date: '26/06', price: '3500 DA', message: 'Bonjour, je suis disponible demain matin pour réparer ça.' },
      { providerId: 3, providerName: 'Mustapha R.', providerAvatar: 'MR', date: '26/06', price: '3000 DA', message: 'Je peux passer en fin de semaine, prix tout compris.' },
    ]
  },
  {
    id: 2,
    title: 'Cours de maths niveau lycée',
    category: 'cours',
    description: 'Je cherche un professeur pour des cours de maths terminale S, 2 fois par semaine.',
    city: 'Blida',
    budgetRange: '3000 - 5000 DA/mois',
    urgency: 'normal',
    date: '2026-06-24',
    responsesCount: 1,
    status: 'answered',
    responses: [
      { providerId: 6, providerName: 'Fatima Z.', providerAvatar: 'FZ', date: '25/06', price: '4000 DA/mois', message: 'Prof de maths depuis 5 ans, disponible les lundis et mercredis.' },
    ]
  },
  {
    id: 3,
    title: 'Nettoyage appartement 3 pièces',
    category: 'menage',
    description: 'Nettoyage complet de mon appartement (salon, 2 chambres, cuisine, salle de bain). Produits fournis.',
    city: 'Oran',
    budgetRange: '2500 - 4000 DA',
    urgency: 'cette_semaine',
    date: '2026-06-22',
    responsesCount: 0,
    status: 'pending'
  },
  {
    id: 4,
    title: 'Création logo site e-commerce',
    category: 'design',
    description: "J'ai besoin d'un logo moderne pour ma boutique en ligne de vêtements. Je veux quelque chose de minimaliste.",
    city: 'Alger',
    budgetRange: '15000 - 30000 DA',
    urgency: 'ce_mois',
    date: '2026-06-20',
    responsesCount: 5,
    status: 'answered',
    responses: [
      { providerId: 8, providerName: 'Yasmine K.', providerAvatar: 'YK', date: '21/06', price: '22000 DA', message: 'Voici mon portfolio, je peux vous proposer 3 concepts.' },
    ]
  },
  {
    id: 5,
    title: 'Réparation climatisation',
    category: 'electricite',
    description: 'Ma clim ne refroidit plus, elle fait un bruit bizarre. Marque Samsung, installée depuis 2 ans.',
    city: 'Constantine',
    budgetRange: '5000 - 10000 DA',
    urgency: 'urgent',
    date: '2026-06-18',
    responsesCount: 0,
    status: 'expired'
  },
]
