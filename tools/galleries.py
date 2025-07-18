import os
import json
import re

def order_json_by_id(json_data):
    # Trie par l’id (entier)
    return sorted(json_data, key=lambda x: int(x['id']))

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
            cover = next((f for f in files if re.match(r'^cover\.(jpg|jpeg|png|gif|bmp|webp|tiff)$', f, re.I)), None)
            images = sorted([f for f in files if re.match(r'^i\d+\.(jpg|jpeg|png|gif|bmp|webp|tiff)$', f, re.I)])
            if cover and images:
                match = re.match(r'^(\d+)_', folder)
                num_id = match.group(1) if match else None
                print(num_id)
                title = folder[match.end():] if match else folder
                galleries.append({
                    'id': num_id,
                    'title': title,
                    'coverImage': f'assets/images/galleries/{folder}/{cover}',
                    'images': [f'assets/images/galleries/{folder}/{cover}'] +
                              [f'assets/images/galleries/{folder}/{img}' for img in images]
                })

    # Pas de lecture d’un fichier possiblement vide ou inexistant.
    galleries_ordered = order_json_by_id(galleries)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(galleries_ordered, f, indent=2, ensure_ascii=False)
    print(f'Fichier {output_file} généré avec succès.')

# Exemple d’utilisation
root_directory = '../assets/images/galleries'
output_json = '../assets/galleries.json'
generate_galleries_json(root_directory, output_json)
