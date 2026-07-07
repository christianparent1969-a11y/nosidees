-- À copier-coller dans Supabase > SQL Editor > New query, puis clique sur "Run"

create table if not exists public.articles (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references auth.users(id) on delete cascade,
  author_name text,
  title text not null,
  content text not null,
  created_at timestamp with time zone default now()
);

-- Active la sécurité au niveau des lignes
alter table public.articles enable row level security;

-- Tout le monde peut lire les idées (même sans compte)
create policy "Lecture publique" on public.articles
  for select using (true);

-- Seuls les utilisateurs connectés peuvent publier, et seulement en leur propre nom
create policy "Publication par son auteur" on public.articles
  for insert with check (auth.uid() = author_id);

-- Un utilisateur ne peut supprimer que ses propres idées
create policy "Suppression par son auteur" on public.articles
  for delete using (auth.uid() = author_id);
