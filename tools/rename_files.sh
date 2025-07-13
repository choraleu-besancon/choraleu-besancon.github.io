#!/bin/bash

echo "Format du mot à changer (ex : storage_ ou photo- ou img):"
read motif_source

echo "Format attendu (ex : i ou image ou photo):"
read motif_cible

echo "Extension à cibler (ex : png ou * pour toutes):"
read extension

# Construction du motif de recherche
if [ "$extension" = "*" ]; then
  pattern="${motif_source}*.*"
else
  pattern="${motif_source}*.${extension}"
fi

echo "Renommage des fichiers $pattern en ${motif_cible}X.ext dans le dossier $(pwd)"

for f in $pattern; do
  [ -e "$f" ] || continue

  # Génère le nouveau nom dynamiquement selon les motifs choisis
  n=$(echo "$f" | sed -E "s/${motif_source}([0-9]+)(\..*)/${motif_cible}\1\2/")

  if [ "$f" != "$n" ]; then
    echo "Renomme: $f -> $n"
    mv "$f" "$n"
  fi
done

echo "Terminé."
