# My Registration App

Ce projet est une application de formulaire d'inscription développée dans le cadre d'un projet scolaire. L'application permet aux utilisateurs de s'inscrire et de gérer une liste d'utilisateurs.

## Étudiants du groupe

Ce projet a été réalisé par le groupe suivant :
- John Doe (john.doe@example.com) : Responsable du frontend
- Jane Smith (jane.smith@example.com) : Responsable du backend

## Architecture Docker

L'application est composée de deux parties principales : le frontend et le backend. Chaque partie est containerisée à l'aide de Docker pour une portabilité et une facilité de déploiement.

### Frontend

Le frontend est développé avec React et hébergé sur un serveur Node.js (dans le répertoire `app` de ce projet).

###  Backend
Le backend est développé avec Node.js et Express (dans le répertoire `server` de ce projet). Il est également containerisé à l'aide de Docker. 

### Lancer Node architectures avec docker 
Pour lancer l'architecture Docker avec mongodb / nodejs / react suivez les étapes suivantes :
1. Assurez-vous que Docker est installé sur votre système.
2. Exécutez la commande suivante dans votre terminal :

```bash
docker-compose -f docker-compose-node.yml up -d
```

### Backend (alternative avec Python)
Une alternative pour le backend est développée avec Python (dans le répertoire `server-py` de ce projet). Il est également containerisé à l'aide de Docker. 
Pour lancer l'architecture Docker avec mysql / python / react, suivez ces étapes :

1. Assurez-vous que Docker est installé sur votre système.
2. Exécutez la commande suivante dans votre terminal :

```bash
 docker-compose -f docker-compose.yml up -d
```


0.1.2-8019617560-32-1.0
0.1.2-8019643161-33-1.0
0.1.2-8204233525-34-1.0
0.1.2-8204889848-35-1.0
0.1.2-8205074425-37-1.0
0.1.2-8206333329-38-1.0
