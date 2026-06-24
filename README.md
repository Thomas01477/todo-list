
## 1. Démarrage du Backend 

```bash
cd backend
pip install -r requirements.txt
```

### Base de données

```bash
python manage.py migrate
```

### Démarrer le serveur

```bash
python manage.py runserver
```

Le serveur écoute sur **http://localhost:8000**

---

## 2. Démarrage du Frontend 

```bash
cd frontend
npm install
```

### Démarrer l'application

```bash
npm run dev
```

L'application est accessible sur **http://localhost:5173**

## 3. Endpoints de l'API

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/categories/` | Lister toutes les catégories |
| POST | `/api/categories/` | Créer une catégorie |
| GET | `/api/tasks/` | Lister toutes les tâches |
| GET | `/api/tasks/?category_id=X` | Filtrer les tâches par catégorie |
| POST | `/api/tasks/` | Créer une tâche |
| PATCH | `/api/tasks/<id>/` | Mettre à jour une tâche (is_completed) |
| DELETE | `/api/tasks/<id>/` | Supprimer une tâche |
