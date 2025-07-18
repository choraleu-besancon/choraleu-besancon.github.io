import os
import json
import re

import json

def order_json_by_id(json_data):
    # Convertit les ids en entiers pour le tri, puis les reconvertit en chaîne pour la sortie
    sorted_data = sorted(json_data, key=lambda x: int(x['id']))
    # Écris le JSON trié (avec les identifiants en tant que chaînes)
    return sorted_data

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
                # Extrait le numéro en début de nom de dossier
                match = re.match(r'^(\d+)_', folder)
                num_id = match[0][0] 
                print(num_id)
                # Extrait le titre : tout ce qui suit le numéro et l'underscore
                title = folder[match.end():] if match else folder
                galleries.append({
                    'id': num_id,
                    'title': title,
                    'coverImage': f'../assets/images/galleries/{folder}/{cover}',
                    'images': [f'../assets/images/galleries/{folder}/{cover}'] +
                              [f'../assets/images/galleries/{folder}/{img}' for img in images]
                })

    with open(output_file, 'r', encoding='utf-8') as f:
        galleries_data = json.load(f)

    galleries_ordered = order_json_by_id(galleries_data)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(galleries_ordered, f, indent=2, ensure_ascii=False)

    print(f'Fichier {output_file} généré avec succès.')

# Exemple d’utilisation
root_directory = '../assets/images/galleries'   # Chemin vers le dossier racine des galeries
output_json = '../assets/galleries.json'        # Chemin du fichier de sortie

generate_galleries_json(root_directory, output_json)
