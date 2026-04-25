#!/bin/bash

# --- Script de Renderizado Científico ---
# Carlos Villa Tobón - Portafolio Neurociencia & IA

echo "🧬 Iniciando renderizado de investigaciones..."

# 1. Asegurarnos de que existe la carpeta de destino en Astro
mkdir -p public/investigaciones

# 2. Ejecutar Quarto
# Explicación de los flags:
# render investigaciones/ -> Busca todos los .qmd en esa carpeta
# --to html -> Formato de salida
# --output-dir ../public/investigaciones/ -> Los envía a la carpeta pública de Astro
quarto render investigaciones/ --to html --output-dir ../public/investigaciones/

echo "✅ Renderizado completado. Los archivos están listos en public/investigaciones/"
