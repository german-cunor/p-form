import json
from collections import defaultdict

# Leer el archivo de texto
with open("questions.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

# Agrupar preguntas por sección
sections = defaultdict(list)
for line in lines:
    parts = line.strip().split("|")  # Separar por "|"
    if len(parts) == 2:
        question, section = parts
        sections[section.strip()].append(question.strip())

# Crear archivos JSON por cada sección
for section, questions in sections.items():
    output_data = {f"q{i+1}": question for i, question in enumerate(questions)}
    filename = f"section{section}.json"
    with open(filename, "w", encoding="utf-8") as outfile:
        json.dump(output_data, outfile, indent=4, ensure_ascii=False)
    print(f"Archivo generado: {filename}")
