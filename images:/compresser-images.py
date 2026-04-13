#!/usr/bin/env python3
"""
Compresseur d'images — Maison Barbé
Réduit le poids des photos pour GitHub (limite 25 MB)
Usage : double-cliquez ou lancez  python3 compresser-images.py
"""
from PIL import Image
import os, glob

dossier = "images"
max_largeur = 1400   # pixels
qualite    = 82      # % qualité JPEG

if not os.path.exists(dossier):
    print(f"❌  Dossier '{dossier}' introuvable. Placez ce script à côté du dossier images/")
    input("Appuyez sur Entrée pour quitter...")
    exit()

extensions = ["*.jpg","*.jpeg","*.JPG","*.JPEG","*.png","*.PNG"]
fichiers = []
for ext in extensions:
    fichiers += glob.glob(os.path.join(dossier, ext))

if not fichiers:
    print("❌  Aucune image trouvée dans le dossier images/")
    input("Appuyez sur Entrée pour quitter...")
    exit()

print(f"🔄  {len(fichiers)} image(s) trouvée(s) — compression en cours...\n")

for chemin in fichiers:
    nom = os.path.basename(chemin)
    avant = os.path.getsize(chemin) / 1024 / 1024
    
    img = Image.open(chemin).convert("RGB")
    larg, haut = img.size
    
    if larg > max_largeur:
        ratio = max_largeur / larg
        img = img.resize((max_largeur, int(haut * ratio)), Image.LANCZOS)
    
    img.save(chemin, "JPEG", quality=qualite, optimize=True)
    apres = os.path.getsize(chemin) / 1024 / 1024
    
    print(f"  ✅  {nom:30s}  {avant:.1f} MB  →  {apres:.2f} MB")

print(f"\n✅  Compression terminée ! Vous pouvez maintenant uploader le dossier images/ sur GitHub.")
input("\nAppuyez sur Entrée pour quitter...")
