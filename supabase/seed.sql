-- ============================================
-- Zyvo - Seed Data
-- Run in Supabase SQL editor (bypasses RLS)
-- ============================================

-- === PROVIDERS ===
INSERT INTO public.providers (id, name, service, category, city, description, rating, missions, price, price_value, cover_gradient, badges, response_rate, response_time, likes, gallery, verified_documents)
VALUES
(1, 'Karim B.', 'Plombier Certifié', 'plomberie', 'Alger',
 'Plombier agréé avec 15 ans d''expérience. Installation, réparation, urgence. Interventions rapides dans toute la capitale.',
 4.9, 120, '1 500 DA/h', 1500, 'from-blue-600 via-blue-500 to-cyan-400',
 '["Vérifié","Top"]', '98%', '15 min', 342,
 '["bg-gradient-to-br from-blue-400 to-cyan-300","bg-gradient-to-br from-blue-500 to-indigo-400","bg-gradient-to-br from-cyan-400 to-teal-300"]',
 '["Carte professionnelle","Assurance"]'),

(2, 'Amina K.', 'Aide à domicile', 'menage', 'Alger',
 'Femme de ménage professionnelle, rigoureuse et de confiance. Nettoyage complet et repassage.',
 5.0, 85, '1 200 DA/h', 1200, 'from-purple-600 via-purple-500 to-pink-400',
 '["Vérifié","Recommandé"]', '95%', '30 min', 256,
 '["bg-gradient-to-br from-purple-400 to-pink-300","bg-gradient-to-br from-violet-500 to-purple-400","bg-gradient-to-br from-fuchsia-400 to-pink-400"]',
 '["Carte d''identité","Casier judiciaire"]'),

(3, 'Mohamed L.', 'Électricien', 'electricite', 'Oran',
 'Électricien général tous travaux. Installation, dépannage, mise aux normes. Intervention urgente possible.',
 4.8, 64, '1 800 DA/h', 1800, 'from-amber-600 via-yellow-500 to-orange-400',
 '["Vérifié"]', '92%', '20 min', 189,
 '["bg-gradient-to-br from-amber-400 to-yellow-300","bg-gradient-to-br from-orange-500 to-amber-400","bg-gradient-to-br from-yellow-500 to-orange-400"]',
 '["Attestation","Assurance"]'),

(4, 'Sara B.', 'Coiffeuse à domicile', 'coiffure', 'Alger',
 'Coiffure à domicile pour femmes et enfants. Brushing, coupe, coloration, coiffure événementielle.',
 4.9, 42, '2 000 DA/séance', 2000, 'from-emerald-600 via-emerald-500 to-teal-400',
 '["Vérifié","Top"]', '97%', '10 min', 478,
 '["bg-gradient-to-br from-emerald-400 to-teal-300","bg-gradient-to-br from-green-500 to-emerald-400","bg-gradient-to-br from-teal-500 to-cyan-400"]',
 '["Diplôme coiffure","Carte professionnelle"]'),

(5, 'Yacine M.', 'Développeur Web', 'cours', 'Constantine',
 'Développeur full-stack, cours particuliers en programmation web. HTML, CSS, JavaScript, React.',
 4.7, 38, '3 000 DA/h', 3000, 'from-sky-600 via-blue-500 to-indigo-400',
 '["Vérifié"]', '90%', '1 h', 156,
 '["bg-gradient-to-br from-sky-400 to-blue-300","bg-gradient-to-br from-blue-500 to-indigo-400","bg-gradient-to-br from-cyan-400 to-blue-400"]',
 '["Diplôme informatique","Portfolio"]'),

(6, 'Fatima Z.', 'Cours de Maths', 'cours', 'Blida',
 'Prof de maths pour collège et lycée. Méthode pédagogique confirmée. Préparation BAC.',
 4.9, 56, '1 800 DA/h', 1800, 'from-red-600 via-rose-500 to-pink-400',
 '["Vérifié","Top"]', '96%', '20 min', 423,
 '["bg-gradient-to-br from-red-400 to-rose-300","bg-gradient-to-br from-rose-500 to-pink-400","bg-gradient-to-br from-red-500 to-orange-400"]',
 '["Diplôme enseignement","Casier judiciaire"]'),

(7, 'Rachid A.', 'Jardinier Paysagiste', 'jardinage', 'Oran',
 'Entretien de jardins, tonte pelouse, taille haies, plantation. Passionné par les espaces verts.',
 4.6, 33, '1 500 DA/h', 1500, 'from-lime-600 via-green-500 to-emerald-400',
 '["Vérifié"]', '88%', '45 min', 134,
 '["bg-gradient-to-br from-lime-400 to-green-300","bg-gradient-to-br from-green-500 to-emerald-400","bg-gradient-to-br from-teal-400 to-emerald-400"]',
 '["Carte professionnelle"]'),

(8, 'Nadia T.', 'Esthéticienne à domicile', 'coiffure', 'Tizi Ouzou',
 'Soins esthétiques, épilation, manucure, maquillage professionnel. À votre domicile.',
 4.8, 29, '1 800 DA/séance', 1800, 'from-pink-600 via-fuchsia-500 to-purple-400',
 '["Vérifié","Recommandé"]', '93%', '25 min', 367,
 '["bg-gradient-to-br from-pink-400 to-fuchsia-300","bg-gradient-to-br from-fuchsia-500 to-purple-400","bg-gradient-to-br from-pink-500 to-rose-400"]',
 '["Diplôme esthétique","Carte professionnelle"]'),

(9, 'Hocine B.', 'Chauffagiste', 'plomberie', 'Constantine',
 'Installation et réparation de chaudières, chauffe-eaux et systèmes de chauffage central.',
 4.7, 48, '2 000 DA/h', 2000, 'from-orange-600 via-amber-500 to-yellow-400',
 '["Vérifié"]', '91%', '30 min', 167,
 '["bg-gradient-to-br from-orange-400 to-amber-300","bg-gradient-to-br from-amber-500 to-yellow-400","bg-gradient-to-br from-orange-500 to-red-400"]',
 '["Attestation","Assurance"]'),

(10, 'Lydia H.', 'Cours d''Anglais', 'cours', 'Annaba',
 'Prof d''anglais diplômée. Cours pour tous niveaux. Préparation TOEFL et IELTS.',
 4.9, 72, '2 000 DA/h', 2000, 'from-indigo-600 via-violet-500 to-purple-400',
 '["Vérifié","Top"]', '99%', '5 min', 512,
 '["bg-gradient-to-br from-indigo-400 to-violet-300","bg-gradient-to-br from-violet-500 to-purple-400","bg-gradient-to-br from-indigo-500 to-blue-400"]',
 '["Diplôme anglais","Certification TESOL"]'),

(11, 'Samir D.', 'Déménageur Pro', 'demenagement', 'Alger',
 'Déménagement avec camion et équipe. Devis gratuit. Emballage et transport soignés.',
 4.5, 95, '8 000 DA/mission', 8000, 'from-cyan-600 via-teal-500 to-emerald-400',
 '["Vérifié"]', '89%', '1 h', 198,
 '["bg-gradient-to-br from-cyan-400 to-teal-300","bg-gradient-to-br from-teal-500 to-emerald-400","bg-gradient-to-br from-cyan-500 to-blue-400"]',
 '["Permis transport","Assurance","Carte professionnelle"]'),

(12, 'Meriem F.', 'Infirmière à domicile', 'sante', 'Sétif',
 'Soins infirmiers à domicile. Pansements, injections, prise de tension. Disponible 7j/7.',
 5.0, 67, '2 500 DA/visite', 2500, 'from-rose-600 via-pink-500 to-fuchsia-400',
 '["Vérifié","Recommandé","Top"]', '100%', '5 min', 634,
 '["bg-gradient-to-br from-rose-400 to-pink-300","bg-gradient-to-br from-pink-500 to-fuchsia-400","bg-gradient-to-br from-rose-500 to-red-400"]',
 '["Diplôme infirmier","Carte professionnelle","Assurance"]')
ON CONFLICT (id) DO NOTHING;

-- === REVIEWS ===
INSERT INTO public.reviews (id, provider_id, rating, comment, likes, created_at)
VALUES
(1, 1, 5, 'Intervention rapide et propre. Karim a réparé ma fuite en 30 minutes. Je recommande vivement !', 12, now() - interval '3 days'),
(2, 1, 5, 'Très professionnel, matériel de qualité. Prix correct pour le travail fourni.', 8, now() - interval '7 days'),
(3, 1, 4, 'Bon travail mais un peu en retard. Le résultat est là.', 3, now() - interval '14 days'),
(4, 1, 5, 'Plombier honnête qui ne cherche pas à vous surfacturer. C''est rare !', 15, now() - interval '20 days'),
(5, 2, 5, 'Amina est incroyable ! Ma maison brille comme jamais, elle est douce et minutieuse.', 20, now() - interval '2 days'),
(6, 2, 5, 'Service de nettoyage impeccable. Ponctuelle et très agréable.', 6, now() - interval '10 days'),
(7, 2, 4, 'Très bonne aide ménagère, je la recommande pour les familles.', 4, now() - interval '18 days'),
(8, 3, 5, 'Électricien compétent, a trouvé le problème immédiatement. Installation aux normes.', 9, now() - interval '5 days'),
(9, 3, 4, 'Travail sérieux, devis respecté. Un peu long mais le résultat est parfait.', 5, now() - interval '12 days'),
(10, 4, 5, 'Sara a fait une coupe et un brushing magnifiques pour mon mariage. Merci infiniment !', 25, now() - interval '4 days'),
(11, 4, 5, 'Coiffeuse à domicile ultra pro. Elle est venue avec tout son matériel, résultat top.', 14, now() - interval '9 days'),
(12, 4, 4, 'Très satisfaite de la coloration. Prix raisonnable pour une prestation à domicile.', 7, now() - interval '22 days'),
(13, 5, 5, 'Excellent prof ! J''ai passé de 8 à 16 en maths en 2 mois. Méthode géniale.', 30, now() - interval '6 days'),
(14, 5, 5, 'Cours très clairs, pédagogue et patient. Parfait pour préparer le BAC.', 18, now() - interval '11 days'),
(15, 5, 4, 'Bon professeur, les exercices sont adaptés au niveau de l''élève.', 6, now() - interval '19 days'),
(16, 6, 5, 'Ma fille a gagné 4 points en maths grâce à Fatima. Un grand merci !', 22, now() - interval '8 days'),
(17, 6, 5, 'Fatima est une prof exceptionnelle. Très pédagogique et à l''écoute.', 11, now() - interval '15 days'),
(18, 7, 4, 'Jardin magnifique après son passage. Tonte et taille parfaites.', 8, now() - interval '13 days'),
(19, 7, 5, 'Rachid est un vrai passionné. Il m''a conseillé de superbes plantes pour mon jardin.', 13, now() - interval '25 days'),
(20, 8, 5, 'Meilleure esthéticienne à domicile ! Épilation indolore et manucure parfaite.', 28, now() - interval '1 day'),
(21, 8, 5, 'Nadia est venue pour un maquillage de soirée, résultat professionnel. Je recommande.', 16, now() - interval '16 days'),
(22, 9, 5, 'Chauffagiste au top ! Intervention rapide pour ma chaudière en panne. Prix correct.', 10, now() - interval '6 days'),
(23, 9, 4, 'Professionnel et équipé. Il a installé mon chauffe-eau en une demi-journée.', 5, now() - interval '21 days'),
(24, 10, 5, 'Grâce à Lydia j''ai obtenu 875 au TOEFL. Meilleure prof d''anglais !', 35, now() - interval '4 days'),
(25, 10, 5, 'Cours d''anglais dynamiques et efficaces. Lydia est très professionnelle.', 14, now() - interval '17 days'),
(26, 11, 4, 'Déménagement sans stress. L''équipe est rapide et soigneuse. Je recommande.', 9, now() - interval '9 days'),
(27, 11, 5, 'Déménageurs professionnels, tout est arrivé en parfait état. Service 5 étoiles.', 12, now() - interval '23 days'),
(28, 12, 5, 'Infirmière dévouée et compétente. Soins de qualité pour ma mère âgée. Merci Meriem.', 40, now() - interval '2 days'),
(29, 12, 5, 'Meriem est douce et professionnelle. Mon père est ravi des soins à domicile.', 32, now() - interval '11 days'),
(30, 12, 5, 'Disponible même le week-end. Infirmière exemplaire, que du bonheur.', 27, now() - interval '19 days')
ON CONFLICT (id) DO NOTHING;

-- === QUOTES ===
INSERT INTO public.quotes (id, category, city, description, urgency, budget, status, created_at)
VALUES
(1, 'plomberie', 'Alger', 'J''ai une fuite d''eau sous mon évier de cuisine. Le robinet fuit quand il est fermé, l''eau coule en continu.', 'urgent', '2000 - 4000 DA', 'Répondu', now() - interval '3 days'),
(2, 'cours', 'Blida', 'Je cherche un professeur pour des cours de maths terminale S, 2 fois par semaine.', 'normal', '3000 - 5000 DA/mois', 'Répondu', now() - interval '4 days'),
(3, 'menage', 'Oran', 'Nettoyage complet de mon appartement (salon, 2 chambres, cuisine, salle de bain). Produits fournis.', 'cette_semaine', '2500 - 4000 DA', 'Ouvert', now() - interval '6 days'),
(4, 'design', 'Alger', 'J''ai besoin d''un logo moderne pour ma boutique en ligne de vêtements. Je veux quelque chose de minimaliste.', 'ce_mois', '15000 - 30000 DA', 'Répondu', now() - interval '8 days'),
(5, 'electricite', 'Constantine', 'Ma clim ne refroidit plus, elle fait un bruit bizarre. Marque Samsung, installée depuis 2 ans.', 'urgent', '5000 - 10000 DA', 'Ouvert', now() - interval '10 days')
ON CONFLICT (id) DO NOTHING;

-- === QUOTE RESPONSES ===
INSERT INTO public.quote_responses (quote_id, provider_id, price, message, created_at)
VALUES
(1, 1, '3500 DA', 'Bonjour, je suis disponible demain matin pour réparer ça.', now() - interval '2 days'),
(1, 3, '3000 DA', 'Je peux passer en fin de semaine, prix tout compris.', now() - interval '2 days'),
(2, 6, '4000 DA/mois', 'Prof de maths depuis 5 ans, disponible les lundis et mercredis.', now() - interval '3 days'),
(4, 8, '22000 DA', 'Voici mon portfolio, je peux vous proposer 3 concepts.', now() - interval '6 days')
ON CONFLICT DO NOTHING;

-- Reset sequences
SELECT setval('public.providers_id_seq', COALESCE((SELECT MAX(id) FROM public.providers), 1));
SELECT setval('public.reviews_id_seq', COALESCE((SELECT MAX(id) FROM public.reviews), 1));
SELECT setval('public.quotes_id_seq', COALESCE((SELECT MAX(id) FROM public.quotes), 1));
