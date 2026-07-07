# Foyer — Guide de mise en ligne

Ton site est prêt. Il te reste 3 étapes : créer la base de données (Supabase),
connecter le code à Netlify, puis connecter ton domaine Namecheap. Compte environ 20-30 minutes.

---

## Étape 1 — Créer la base de données sur Supabase (gratuit)

1. Va sur https://supabase.com et crée un compte (tu peux te connecter avec GitHub ou Google).
2. Clique sur **"New project"**.
   - Donne-lui un nom, ex: `foyer`
   - Choisis un mot de passe pour la base de données (garde-le de côté, mais tu ne t'en resserviras pas souvent)
   - Choisis une région proche de toi (ex: `West EU` si tu es en Europe)
   - Clique sur **"Create new project"** et attends 1-2 minutes que ça se prépare.

3. Une fois le projet créé, va dans le menu de gauche sur **"SQL Editor"**, clique sur **"New query"**.

4. Ouvre le fichier `supabase-schema.sql` (fourni avec ce projet), copie tout son contenu, colle-le dans l'éditeur, puis clique sur **"Run"**. Ça crée la table qui va stocker toutes les idées publiées.

5. Va ensuite dans **"Authentication" > "Providers"** (menu de gauche), et vérifie que **"Email"** est activé (c'est le cas par défaut).

   💡 Astuce pour tester rapidement sans configurer l'envoi d'emails : va dans **Authentication > Settings**, et désactive temporairement **"Confirm email"**. Comme ça, les gens peuvent créer un compte et l'utiliser immédiatement. Tu pourras réactiver ça plus tard si tu veux plus de sécurité.

6. Récupère tes clés : va dans **"Project Settings" (icône engrenage) > "API"**. Note quelque part :
   - **Project URL** (ressemble à `https://xxxxx.supabase.co`)
   - **anon public key** (une longue chaîne de caractères)

Tu en auras besoin à l'étape 2.

---

## Étape 2 — Mettre le code en ligne sur Netlify

Le plus simple est de passer par GitHub, pour que Netlify puisse redéployer automatiquement à chaque modification.

### 2a. Mettre le code sur GitHub
1. Va sur https://github.com et crée un compte si tu n'en as pas.
2. Crée un nouveau dépôt (bouton **"New repository"**), nomme-le `foyer`, laisse-le public ou privé (peu importe), ne coche aucune case, clique sur **"Create repository"**.
3. Suis les instructions de GitHub pour "push an existing repository" avec les fichiers de ce projet (si tu ne sais pas utiliser Git en ligne de commande, tu peux aussi glisser-déposer les fichiers directement sur la page du dépôt GitHub via **"Add file" > "Upload files"** — mais fais-le dossier par dossier en gardant la même structure).

### 2b. Connecter le dépôt à Netlify
1. Sur Netlify, clique sur **"Add new site" > "Import an existing project"**.
2. Choisis GitHub, et sélectionne ton dépôt `foyer`.
3. Dans les réglages de build :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
4. **Avant de cliquer sur "Deploy"**, clique sur **"Add environment variables"** et ajoute :
   - `VITE_SUPABASE_URL` → colle ton Project URL de Supabase
   - `VITE_SUPABASE_ANON_KEY` → colle ta anon public key de Supabase
5. Clique sur **"Deploy"**. Après une minute ou deux, ton site sera en ligne sur une adresse `xxxx.netlify.app` — et cette fois, il devrait s'afficher correctement (plus de 404 !).

---

## Étape 3 — Connecter ton domaine Namecheap

1. Sur Netlify, va dans **"Domain settings"** de ton site, clique sur **"Add a domain"**, et entre ton nom de domaine.
2. Netlify va te proposer soit :
   - Des **nameservers** à utiliser (le plus simple), ou
   - Un enregistrement **A** à ajouter (ex: pointant vers `75.2.60.5`) + un **CNAME** pour le sous-domaine `www`.
3. Va sur Namecheap → **Domain List** → **Manage** à côté de ton domaine → onglet **Advanced DNS** (ou **Nameservers** si Netlify t'a donné des nameservers).
4. Ajoute les infos données par Netlify.
5. Attends la propagation (souvent 15-60 minutes, parfois jusqu'à 24-48h).

---

## Et après ?

Une fois en ligne, chaque visiteur peut :
- Créer un compte
- Écrire et publier une idée
- Voir toutes les idées publiées par les autres
- Supprimer ses propres idées

**Idées d'améliorations pour la suite**, si tu veux aller plus loin : ajouter des commentaires, un système de "j'aime", la possibilité de modifier une idée déjà publiée, ou un profil pour chaque auteur. Dis-moi si tu veux qu'on ajoute une de ces fonctionnalités.
