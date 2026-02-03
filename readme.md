# 🧑‍🍳 Exercice — Recettes du Monde (UI → Dynamique)

## 🎯 Objectif pédagogique

**À partir d’une interface utilisateur statique en HTML/CSS**, vous allez devoir **rendre dynamiques les cartes de recettes** à l’aide de JavaScript.  
Cela vous permettra de valider la compétence suivante :

> ✅ **Compétence visée** : _Développer une interface utilisateur web dynamique_

---

## 💻 Étapes à réaliser

1. **Observer la structure HTML/CSS existante** dans `index.html` et `styles.css`.
2. Supprimer ou commenter les sections `<section class="recipe-card">...</section>` dans `index.html`.
3. Utiliser **JavaScript** (dans un fichier `script.js` que vous relierez à votre page) pour :
   - Charger dynamiquement les données depuis un fichier `recettes.json` via **`fetch` + `async/await`**
   - Créer les éléments HTML correspondants en JavaScript
   - Les insérer dans le DOM dans la grille `.recipes-grid`

---

## maquette

![App Screenshot](assets/images/capture_ecran.png)

# Recette-monde

## Authors

- [@bryanParisot](https://github.com/BryanParisot)


## Utilisation

Le projet fonctionne nativement en local, clonez le projet dans un dossier de votre **serveur web**. ou dans un **live server**
Par defaut le projet cherche ses **données** dans ```./assets/data/recette.json```

Dans le cas ou une **autré donnée** doit étre utilisé, il sufit de change le champs **url** de ```getData()```

La routine du script est la suivante:
- ```init()``` fait le rendu du tout, elle est appeller qu'une seul fois
- un **Event listener** est posé sur toutes les cartes, celui si appelle ```fullScreenPreview()``` et affiche les donnée supplementaire de la recette.
- un autre **Event listener** ce charge de rafraichir les cartes en fonction de l'onglet **recherche**
