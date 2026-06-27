const now = new Date()
const daysAgo = (n) => {
  const d = new Date(now)
  d.setDate(d.getDate() - n)
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export const reviews = [
  { id: 1, providerId: 1, userName: 'Karim B.', rating: 5, comment: 'Intervention rapide et propre. Karim a réparé ma fuite en 30 minutes. Je recommande vivement !', date: daysAgo(3), likes: 12, userAvatar: 'KB' },
  { id: 2, providerId: 1, userName: 'Sarah M.', rating: 5, comment: 'Très professionnel, matériel de qualité. Prix correct pour le travail fourni.', date: daysAgo(7), likes: 8, userAvatar: 'SM' },
  { id: 3, providerId: 1, userName: 'Amine H.', rating: 4, comment: 'Bon travail mais un peu en retard. Le résultat est là.', date: daysAgo(14), likes: 3, userAvatar: 'AH' },
  { id: 4, providerId: 1, userName: 'Lydia T.', rating: 5, comment: "Plombier honnête qui ne cherche pas à vous surfacturer. C'est rare !", date: daysAgo(20), likes: 15, userAvatar: 'LT' },
  { id: 5, providerId: 2, userName: 'Meryem Z.', rating: 5, comment: 'Amina est incroyable ! Ma maison brille comme jamais, elle est douce et minutieuse.', date: daysAgo(2), likes: 20, userAvatar: 'MZ' },
  { id: 6, providerId: 2, userName: 'Rachid B.', rating: 5, comment: 'Service de nettoyage impeccable. Ponctuelle et très agréable.', date: daysAgo(10), likes: 6, userAvatar: 'RB' },
  { id: 7, providerId: 2, userName: 'Nadia K.', rating: 4, comment: 'Très bonne aide ménagère, je la recommande pour les familles.', date: daysAgo(18), likes: 4, userAvatar: 'NK' },
  { id: 8, providerId: 3, userName: 'Farid D.', rating: 5, comment: "Électricien compétent, a trouvé le problème immédiatement. Installation aux normes.", date: daysAgo(5), likes: 9, userAvatar: 'FD' },
  { id: 9, providerId: 3, userName: 'Sami L.', rating: 4, comment: 'Travail sérieux, devis respecté. Un peu long mais le résultat est parfait.', date: daysAgo(12), likes: 5, userAvatar: 'SL' },
  { id: 10, providerId: 4, userName: 'Inès R.', rating: 5, comment: "Sara a fait une coupe et un brushing magnifiques pour mon mariage. Merci infiniment !", date: daysAgo(4), likes: 25, userAvatar: 'IR' },
  { id: 11, providerId: 4, userName: 'Houda M.', rating: 5, comment: "Coiffeuse à domicile ultra pro. Elle est venue avec tout son matériel, résultat top.", date: daysAgo(9), likes: 14, userAvatar: 'HM' },
  { id: 12, providerId: 4, userName: 'Meriem F.', rating: 4, comment: 'Très satisfaite de la coloration. Prix raisonnable pour une prestation à domicile.', date: daysAgo(22), likes: 7, userAvatar: 'MF' },
  { id: 13, providerId: 5, userName: 'Ali K.', rating: 5, comment: "Excellent prof ! J'ai passé de 8 à 16 en maths en 2 mois. Méthode géniale.", date: daysAgo(6), likes: 30, userAvatar: 'AK' },
  { id: 14, providerId: 5, userName: 'Yasmine B.', rating: 5, comment: 'Cours très clairs, pédagogue et patient. Parfait pour préparer le BAC.', date: daysAgo(11), likes: 18, userAvatar: 'YB' },
  { id: 15, providerId: 5, userName: 'Omar Z.', rating: 4, comment: 'Bon professeur, les exercices sont adaptés au niveau de l\'élève.', date: daysAgo(19), likes: 6, userAvatar: 'OZ' },
  { id: 16, providerId: 6, userName: 'Sofia A.', rating: 5, comment: "Ma fille a gagné 4 points en maths grâce à Fatima. Un grand merci !", date: daysAgo(8), likes: 22, userAvatar: 'SA' },
  { id: 17, providerId: 6, userName: 'Walid T.', rating: 5, comment: "Fatima est une prof exceptionnelle. Très pédagogique et à l'écoute.", date: daysAgo(15), likes: 11, userAvatar: 'WT' },
  { id: 18, providerId: 7, userName: 'Djamila R.', rating: 4, comment: 'Jardin magnifique après son passage. Tonte et taille parfaites.', date: daysAgo(13), likes: 8, userAvatar: 'DR' },
  { id: 19, providerId: 7, userName: 'Mourad H.', rating: 5, comment: "Rachid est un vrai passionné. Il m'a conseillé de superbes plantes pour mon jardin.", date: daysAgo(25), likes: 13, userAvatar: 'MH' },
  { id: 20, providerId: 8, userName: 'Leila D.', rating: 5, comment: "Meilleure esthéticienne à domicile ! Épilation indolore et manucure parfaite.", date: daysAgo(1), likes: 28, userAvatar: 'LD' },
  { id: 21, providerId: 8, userName: 'Assia B.', rating: 5, comment: 'Nadia est venue pour un maquillage de soirée, résultat professionnel. Je recommande.', date: daysAgo(16), likes: 16, userAvatar: 'AB' },
  { id: 22, providerId: 9, userName: 'Tarek M.', rating: 5, comment: "Chauffagiste au top ! Intervention rapide pour ma chaudière en panne. Prix correct.", date: daysAgo(6), likes: 10, userAvatar: 'TM' },
  { id: 23, providerId: 9, userName: 'Salima K.', rating: 4, comment: "Professionnel et équipé. Il a installé mon chauffe-eau en une demi-journée.", date: daysAgo(21), likes: 5, userAvatar: 'SK' },
  { id: 24, providerId: 10, userName: 'Rayan B.', rating: 5, comment: "Grâce à Lydia j'ai obtenu 875 au TOEFL. Meilleure prof d'anglais !", date: daysAgo(4), likes: 35, userAvatar: 'RB' },
  { id: 25, providerId: 10, userName: 'Chaima L.', rating: 5, comment: 'Cours d\'anglais dynamiques et efficaces. Lydia est très professionnelle.', date: daysAgo(17), likes: 14, userAvatar: 'CL' },
  { id: 26, providerId: 11, userName: 'Hicham N.', rating: 4, comment: "Déménagement sans stress. L'équipe est rapide et soigneuse. Je recommande.", date: daysAgo(9), likes: 9, userAvatar: 'HN' },
  { id: 27, providerId: 11, userName: 'Zineb T.', rating: 5, comment: 'Déménageurs professionnels, tout est arrivé en parfait état. Service 5 étoiles.', date: daysAgo(23), likes: 12, userAvatar: 'ZT' },
  { id: 28, providerId: 12, userName: 'Fouad G.', rating: 5, comment: "Infirmière dévouée et compétente. Soins de qualité pour ma mère âgée. Merci Meriem.", date: daysAgo(2), likes: 40, userAvatar: 'FG' },
  { id: 29, providerId: 12, userName: 'Nabila S.', rating: 5, comment: "Meriem est douce et professionnelle. Mon père est ravi des soins à domicile.", date: daysAgo(11), likes: 32, userAvatar: 'NS' },
  { id: 30, providerId: 12, userName: 'Kamel R.', rating: 5, comment: 'Disponible même le week-end. Infirmière exemplaire, que du bonheur.', date: daysAgo(19), likes: 27, userAvatar: 'KR' },
]

export const extendedProviders = [
  { id: 1, name: 'Karim B.', service: 'Plombier Certifié', category: 'plomberie', city: 'Alger', description: 'Plombier agréé avec 15 ans d\'expérience. Installation, réparation, urgence. Interventions rapides dans toute la capitale.', rating: 4.9, missions: 120, badges: ['Vérifié', 'Top'], price: '1 500 DA/h', priceValue: 1500, coverGradient: 'from-blue-600 via-blue-500 to-cyan-400', likes: 342, response_rate: '98%', response_time: '15 min', verified_documents: ['Carte professionnelle', 'Assurance'], gallery: ['bg-gradient-to-br from-blue-400 to-cyan-300', 'bg-gradient-to-br from-blue-500 to-indigo-400', 'bg-gradient-to-br from-cyan-400 to-teal-300'] },
  { id: 2, name: 'Amina K.', service: 'Aide à domicile', category: 'menage', city: 'Alger', description: 'Femme de ménage professionnelle, rigoureuse et de confiance. Nettoyage complet et repassage.', rating: 5.0, missions: 85, badges: ['Vérifié', 'Recommandé'], price: '1 200 DA/h', priceValue: 1200, coverGradient: 'from-purple-600 via-purple-500 to-pink-400', likes: 256, response_rate: '95%', response_time: '30 min', verified_documents: ['Carte d\'identité', 'Casier judiciaire'], gallery: ['bg-gradient-to-br from-purple-400 to-pink-300', 'bg-gradient-to-br from-violet-500 to-purple-400', 'bg-gradient-to-br from-fuchsia-400 to-pink-400'] },
  { id: 3, name: 'Mohamed L.', service: 'Électricien', category: 'electricite', city: 'Oran', description: 'Électricien général tous travaux. Installation, dépannage, mise aux normes. Intervention urgente possible.', rating: 4.8, missions: 64, badges: ['Vérifié'], price: '1 800 DA/h', priceValue: 1800, coverGradient: 'from-amber-600 via-yellow-500 to-orange-400', likes: 189, response_rate: '92%', response_time: '20 min', verified_documents: ['Attestation', ' Assurance'], gallery: ['bg-gradient-to-br from-amber-400 to-yellow-300', 'bg-gradient-to-br from-orange-500 to-amber-400', 'bg-gradient-to-br from-yellow-500 to-orange-400'] },
  { id: 4, name: 'Sara B.', service: 'Coiffeuse à domicile', category: 'coiffure', city: 'Alger', description: 'Coiffure à domicile pour femmes et enfants. Brushing, coupe, coloration, coiffure événementielle.', rating: 4.9, missions: 42, badges: ['Vérifié', 'Top'], price: '2 000 DA/séance', priceValue: 2000, coverGradient: 'from-emerald-600 via-emerald-500 to-teal-400', likes: 478, response_rate: '97%', response_time: '10 min', verified_documents: ['Diplôme coiffure', 'Carte professionnelle'], gallery: ['bg-gradient-to-br from-emerald-400 to-teal-300', 'bg-gradient-to-br from-green-500 to-emerald-400', 'bg-gradient-to-br from-teal-500 to-cyan-400'] },
  { id: 5, name: 'Yacine M.', service: 'Développeur Web', category: 'cours', city: 'Constantine', description: 'Développeur full-stack, cours particuliers en programmation web. HTML, CSS, JavaScript, React.', rating: 4.7, missions: 38, badges: ['Vérifié'], price: '3 000 DA/h', priceValue: 3000, coverGradient: 'from-sky-600 via-blue-500 to-indigo-400', likes: 156, response_rate: '90%', response_time: '1 h', verified_documents: ['Diplôme informatique', 'Portfolio'], gallery: ['bg-gradient-to-br from-sky-400 to-blue-300', 'bg-gradient-to-br from-blue-500 to-indigo-400', 'bg-gradient-to-br from-cyan-400 to-blue-400'] },
  { id: 6, name: 'Fatima Z.', service: 'Cours de Maths', category: 'cours', city: 'Blida', description: 'Prof de maths pour collège et lycée. Méthode pédagogique confirmée. Préparation BAC.', rating: 4.9, missions: 56, badges: ['Vérifié', 'Top'], price: '1 800 DA/h', priceValue: 1800, coverGradient: 'from-red-600 via-rose-500 to-pink-400', likes: 423, response_rate: '96%', response_time: '20 min', verified_documents: ['Diplôme enseignement', ' Casier judiciaire'], gallery: ['bg-gradient-to-br from-red-400 to-rose-300', 'bg-gradient-to-br from-rose-500 to-pink-400', 'bg-gradient-to-br from-red-500 to-orange-400'] },
  { id: 7, name: 'Rachid A.', service: 'Jardinier Paysagiste', category: 'jardinage', city: 'Oran', description: 'Entretien de jardins, tonte pelouse, taille haies, plantation. Passionné par les espaces verts.', rating: 4.6, missions: 33, badges: ['Vérifié'], price: '1 500 DA/h', priceValue: 1500, coverGradient: 'from-lime-600 via-green-500 to-emerald-400', likes: 134, response_rate: '88%', response_time: '45 min', verified_documents: ['Carte professionnelle'], gallery: ['bg-gradient-to-br from-lime-400 to-green-300', 'bg-gradient-to-br from-green-500 to-emerald-400', 'bg-gradient-to-br from-teal-400 to-emerald-400'] },
  { id: 8, name: 'Nadia T.', service: 'Esthéticienne à domicile', category: 'coiffure', city: 'Tizi Ouzou', description: 'Soins esthétiques, épilation, manucure, maquillage professionnel. À votre domicile.', rating: 4.8, missions: 29, badges: ['Vérifié', 'Recommandé'], price: '1 800 DA/séance', priceValue: 1800, coverGradient: 'from-pink-600 via-fuchsia-500 to-purple-400', likes: 367, response_rate: '93%', response_time: '25 min', verified_documents: ['Diplôme esthétique', 'Carte professionnelle'], gallery: ['bg-gradient-to-br from-pink-400 to-fuchsia-300', 'bg-gradient-to-br from-fuchsia-500 to-purple-400', 'bg-gradient-to-br from-pink-500 to-rose-400'] },
  { id: 9, name: 'Hocine B.', service: 'Chauffagiste', category: 'plomberie', city: 'Constantine', description: 'Installation et réparation de chaudières, chauffe-eaux et systèmes de chauffage central.', rating: 4.7, missions: 48, badges: ['Vérifié'], price: '2 000 DA/h', priceValue: 2000, coverGradient: 'from-orange-600 via-amber-500 to-yellow-400', likes: 167, response_rate: '91%', response_time: '30 min', verified_documents: ['Attestation', 'Assurance'], gallery: ['bg-gradient-to-br from-orange-400 to-amber-300', 'bg-gradient-to-br from-amber-500 to-yellow-400', 'bg-gradient-to-br from-orange-500 to-red-400'] },
  { id: 10, name: 'Lydia H.', service: 'Cours d\'Anglais', category: 'cours', city: 'Annaba', description: 'Prof d\'anglais diplômée. Cours pour tous niveaux. Préparation TOEFL et IELTS.', rating: 4.9, missions: 72, badges: ['Vérifié', 'Top'], price: '2 000 DA/h', priceValue: 2000, coverGradient: 'from-indigo-600 via-violet-500 to-purple-400', likes: 512, response_rate: '99%', response_time: '5 min', verified_documents: ['Diplôme anglais', 'Certification TESOL'], gallery: ['bg-gradient-to-br from-indigo-400 to-violet-300', 'bg-gradient-to-br from-violet-500 to-purple-400', 'bg-gradient-to-br from-indigo-500 to-blue-400'] },
  { id: 11, name: 'Samir D.', service: 'Déménageur Pro', category: 'demenagement', city: 'Alger', description: 'Déménagement avec camion et équipe. Devis gratuit. Emballage et transport soignés.', rating: 4.5, missions: 95, badges: ['Vérifié'], price: '8 000 DA/mission', priceValue: 8000, coverGradient: 'from-cyan-600 via-teal-500 to-emerald-400', likes: 198, response_rate: '89%', response_time: '1 h', verified_documents: ['Permis transport', 'Assurance', 'Carte professionnelle'], gallery: ['bg-gradient-to-br from-cyan-400 to-teal-300', 'bg-gradient-to-br from-teal-500 to-emerald-400', 'bg-gradient-to-br from-cyan-500 to-blue-400'] },
  { id: 12, name: 'Meriem F.', service: 'Infirmière à domicile', category: 'sante', city: 'Sétif', description: 'Soins infirmiers à domicile. Pansements, injections, prise de tension. Disponible 7j/7.', rating: 5.0, missions: 67, badges: ['Vérifié', 'Recommandé', 'Top'], price: '2 500 DA/visite', priceValue: 2500, coverGradient: 'from-rose-600 via-pink-500 to-fuchsia-400', likes: 634, response_rate: '100%', response_time: '5 min', verified_documents: ['Diplôme infirmier', 'Carte professionnelle', 'Assurance'], gallery: ['bg-gradient-to-br from-rose-400 to-pink-300', 'bg-gradient-to-br from-pink-500 to-fuchsia-400', 'bg-gradient-to-br from-rose-500 to-red-400'] },
]

export const activityFeed = [
  { id: 1, type: 'reservation', userName: 'Sarah M.', action: 'a réservé', target: 'Karim B. (Plombier)', time: 'Il y a 15 min' },
  { id: 2, type: 'review', userName: 'Amine H.', action: 'a donné 5 étoiles à', target: 'Amina K.', time: 'Il y a 30 min' },
  { id: 3, type: 'like', userName: 'Lydia T.', action: 'a aimé le profil de', target: 'Sara B. (Coiffeuse)', time: 'Il y a 1 h' },
  { id: 4, type: 'reservation', userName: 'Rayan B.', action: 'a réservé', target: 'Lydia H. (Anglais)', time: 'Il y a 2 h' },
  { id: 5, type: 'review', userName: 'Houda M.', action: 'a commenté', target: 'Sara B.: "Coupe magnifique !"', time: 'Il y a 3 h' },
  { id: 6, type: 'inscription', userName: 'Fouad G.', action: 'a rejoint Zyvo', target: '', time: 'Il y a 5 h' },
]

export const userReviews = [
  { id: 101, providerId: 2, providerName: 'Amina K.', service: 'Aide à domicile', rating: 5, comment: 'Amina est une perle ! Ma maison n\'a jamais été aussi propre. Ponctuelle, souriante, efficace.', date: daysAgo(5), likes: 8 },
  { id: 102, providerId: 10, providerName: 'Lydia H.', service: 'Cours d\'Anglais', rating: 5, comment: 'Excellente professeure ! En 3 mois mon niveau a considérablement augmenté. Très pédagogique.', date: daysAgo(12), likes: 15 },
]

export const myBookings = [
  { id: 1, provider: extendedProviders[0], date: '25 juin 2026', time: '14:00', status: 'Confirmée', statusColor: 'text-emerald-400', address: '42 Rue Didouche Mourad, Alger' },
  { id: 2, provider: extendedProviders[1], date: '28 juin 2026', time: '09:00', status: 'En attente', statusColor: 'text-amber-400', address: '15 Rue des Frères Arbaoui, Alger' },
  { id: 3, provider: extendedProviders[9], date: '2 juillet 2026', time: '16:00', status: 'Confirmée', statusColor: 'text-emerald-400', address: 'En ligne (visio)' },
  { id: 4, provider: extendedProviders[3], date: '15 juin 2026', time: '11:00', status: 'Terminée', statusColor: 'text-zyvo-muted', address: '8 Rue Larbi Ben M\'hidi, Alger' },
]

export const chatMessages = [
  { id: 1, providerId: 1, providerName: 'Karim B.', avatar: 'KB', gradient: 'from-blue-500 to-cyan-400', lastMessage: 'D\'accord, je serai là à 14h.', time: '10:32', unread: 0, online: true },
  { id: 2, providerId: 2, providerName: 'Amina K.', avatar: 'AK', gradient: 'from-purple-500 to-pink-400', lastMessage: 'Merci pour votre confiance ! À demain.', time: '09:15', unread: 2, online: true },
  { id: 3, providerId: 9, providerName: 'Lydia H.', avatar: 'LH', gradient: 'from-indigo-500 to-purple-400', lastMessage: 'Parfait, je vous envoie le lien Zoom.', time: 'Hier', unread: 0, online: false },
]

export const recentSearches = [
  'Plombier Alger Centre',
  'Cours maths Blida',
  'Coiffeuse à domicile Alger',
  'Infirmière Sétif',
]

export const cities = ['Alger', 'Oran', 'Constantine', 'Blida', 'Annaba', 'Tizi Ouzou', 'Sétif', 'Batna', 'Djelfa', 'Sidi Bel Abbès']
