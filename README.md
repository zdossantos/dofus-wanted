<img src="https://github.com/zachariedos.png" width="50" align="right" style="border-radius: 50%;" />

# 🎯 Dofus Wanted

Bienvenue sur **Dofus Wanted** !  
Ce projet permet aux joueurs de **Dofus** de partager des informations en temps réel sur l'apparition des **avis de recherche** 🏹🔍.

---

## ✨ Fonctionnalités

✅ Partage et suivi des apparitions des avis de recherche 📜  
✅ Interface moderne et réactive grâce à **ShadCN UI** & **Tailwind CSS** 🎨  
✅ Stockage des données avec **PostgreSQL** et gestion avec **Drizzle ORM** 💾  
✅ État global géré avec **Zustand** 🐻  
✅ Application rapide et optimisée avec **Next.js 15** ⚡  

---

## 🛠️ Technologies utilisées

<table>
  <tr>
    <td><img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" width="50"></td>
    <td><img src="https://avatars.githubusercontent.com/u/67109815?s=200&v=4" width="50"></td>
    <td><img src="https://github.com/shadcn.png" width="50"></td>
    <td><img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" width="50"></td>
    <td><img src="https://repository-images.githubusercontent.com/180328715/fca49300-e7f1-11ea-9f51-cfd949b31560" width="50"></td>
  </tr>
  <tr>
    <td>Next.js 15</td>
    <td>Tailwind CSS</td>
    <td>ShadCN UI</td>
    <td>PostgreSQL</td>
    <td>Zustand</td>
  </tr>
</table>

---

## 🚀 Installation & Déploiement

### Sans Docker (développement local)

```bash
git clone https://github.com/zachariedos/dofus-wanted.git
cd dofus-wanted
pnpm install
pnpm run dev
```

### 🐳 Avec Docker

#### Pré-requis
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- Copier `.env.example` en `.env` et renseigner les variables

```bash
cp .env.example .env
```

Pour le développement local avec Docker, utilise la connexion PostgreSQL locale :
```
POSTGRES_URL=postgresql://dofus:dofus@db:5432/dofus_wanted
```

#### Développement (hot-reload)

```bash
docker compose up dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).  
Les modifications de code sont automatiquement rechargées grâce au volume monté.

#### Production

```bash
docker compose --profile prod up prod --build
```

#### Base de données uniquement

```bash
docker compose up db
```

## 🤝 Contribuer

Les contributions sont les bienvenues ! Ouvre une issue ou fais une pull request.
Pense à suivre les bonnes pratiques de développement et de commit.