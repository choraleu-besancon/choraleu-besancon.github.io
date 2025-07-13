import os
import json
import re

def generate_galleries_json(root_dir, output_file):
    galleries = []
    valid_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff')

    if not os.path.exists(root_dir):
        print(f"Le dossier {root_dir} n'existe pas.")
        return

    for folder in os.listdir(root_dir):
        folder_path = os.path.join(root_dir, folder)
        if os.path.isdir(folder_path):
            files = os.listdir(folder_path)
            # Cherche le fichier cover (peu importe l’extension)
            cover = next((f for f in files if re.match(r'^cover\.(jpg|jpeg|png|gif|bmp|webp|tiff)$', f, re.I)), None)
            # Cherche les images iX.*
            images = sorted([f for f in files if re.match(r'^i\d+\.(jpg|jpeg|png|gif|bmp|webp|tiff)$', f, re.I)])

            if cover and images:
                galleries.append({
                    'id': folder,
                    'title': folder.replace('-', ' '),
                    'coverImage': f'../assets/images/galleries/{folder}/{cover}',
                    'images': [f'../assets/images/galleries/{folder}/{cover}'] +
                              [f'../assets/images/galleries/{folder}/{img}' for img in images]
                })

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(galleries, f, indent=2, ensure_ascii=False)

    print(f'Fichier {output_file} généré avec succès.')

# Exemple d’utilisation
root_directory = '../assets/images/galleries'   # Chemin vers le dossier racine des galeries
output_json = '../assets/galleries.json'        # Chemin du fichier de sortie

generate_galleries_json(root_directory, output_json)
