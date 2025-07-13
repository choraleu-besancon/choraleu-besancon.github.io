#!/bin/bash

# Dossier cible (par défaut le dossier courant)
DIR="assets/images/galleries/60_temps"
# Extensions d’images à traiter (modifiez si besoin)
EXTENSIONS="jpg jpeg png gif bmp webp tiff"

cd "$DIR" || exit 1

# Récupère la liste triée des fichiers images
images=()
for ext in $EXTENSIONS; do
  for f in *.$ext; do
    [ -e "$f" ] && images+=("$f")
  done
done

# Renommage séquentiel
count=0
for img in "${images[@]}"; do
  ext="${img##*.}"
  new="i${count}.${ext}"
  # Évite d’écraser un fichier existant
  if [ "$img" != "$new" ] && [ ! -e "$new" ]; then
    echo "Renomme : $img -> $new"
    mv "$img" "$new"
    ((count++))
  elif [ "$img" != "$new" ]; then
    echo "ATTENTION : $new existe déjà, saut."
  else
    ((count++))
  fi
done

# Trouver le fichier i0.*
for f in i0.*; do
  [ -e "$f" ] || continue
  ext="${f##*.}"
  new="cover.${ext}"
  # Évite d'écraser un éventuel cover déjà existant
  if [ ! -e "$new" ]; then
    echo "Renomme : $f -> $new"
    mv "$f" "$new"
  else
    echo "ATTENTION : $new existe déjà, saut."
  fi
done


echo "Terminé."
