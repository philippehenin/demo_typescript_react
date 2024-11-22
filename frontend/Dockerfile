# Utiliser une image Node.js comme base
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application React
RUN npm run build

# Exposer le port sur lequel l'application sera accessible
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
