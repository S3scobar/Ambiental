# Ingeniería Ambiental · UNAL Medellín

Sitio web del programa de Ingeniería Ambiental de la Facultad de Minas, Universidad Nacional de Colombia, Sede Medellín. Integra la nueva paleta de colores oficial, la imagen de portada del Parque Nacional Natural Old Providence McBean Lagoon, la malla curricular completa (174 créditos), grupos estudiantiles y de investigación (AMET, POLYGESTA, MINKA, Oceánicos), convenios, rutas intercampus e información general universitaria.

## Módulos (páginas separadas)

| Página | Contenido |
| --- | --- |
| `index.html` | Información del programa (174 créditos, 10 semestres, SNIES 55189, acreditación de calidad), perfil del egresado ambiental, grupos estudiantiles, colectivos y semilleros de investigación |
| `malla.html` | Malla curricular interactiva oficial (prerrequisitos interactivos en colores, créditos y componentes por semestre) y catálogo de asignaturas con filtros por agrupación y paginación |
| `intercampus.html` | Rutas intercampus (Robledo ➔ El Volador, El Volador ➔ Robledo, Río ➔ El Volador), cálculo de próxima salida en tiempo real, guía explicativa y láminas oficiales |
| `info.html` | Información general y guía estudiantil (P.A.P.A., bolsa de créditos SIA 174+87, horas de corresponsabilidad, citas SIA, simulador interactivo y preguntas frecuentes) |
| `convenios.html` | Convenios de la UNAL (Coursera, MATLAB, Microsoft 365) y beneficios para estudiantes (Autodesk, GitHub, JetBrains, Spotify): lista interactiva con pasos de activación |

Cada página carga solo los datos que necesita, y las secciones largas del inicio se cargan cuando la persona se acerca a ellas.

## Arquitectura de datos

Los datos viven en `data/` como JSON, desacoplados de la lógica de presentación:

```
data/
  programa.json          ficha del programa (174 créditos), hitos y acreditación
  perfil.json            perfil del ingeniero ambiental egresado
  grupos.json            grupos estudiantiles y semilleros (AMET, POLYGESTA, MINKA, Oceánicos)
  intercampus.json       rutas, franjas horarias y conexiones intercampus
  convenios/
    indice.json          tipos y ficha corta de cada convenio
    <id>.json            detalle y pasos de activación
  info.json              guía estudiantil, PAPA, bolsa, corresponsabilidad, FAQs y glosario
  malla/
    componentes.json     componentes y agrupaciones oficiales (créditos exigidos)
    plan.json            organización por semestre (códigos de asignaturas y bolsas optativas/libre)
    asignaturas.json     catálogo completo: créditos, agrupación y prerrequisitos
```

Fuente de la malla: *Programa Curricular – Ingeniería Ambiental*, Vicedecanatura Académica, Facultad de Minas, Universidad Nacional de Colombia Sede Medellín.

## Ver el sitio en local

Los datos se piden con `fetch`, así que se recomienda servir la carpeta con un servidor local:

```bash
python -m http.server 8000
# abre http://localhost:8000
```

## Estructura

```
index.html · malla.html · intercampus.html · convenios.html · info.html
css/   base.css (común) · inicio.css · malla.css · intercampus.css · convenios.css · info.css
js/    comun.js (datos, barra y pie) · inicio.js · malla.js · intercampus.js · convenios.js · info.js
img/   parque-old-providence.jpg · logo-sistemas.jpg · textura.svg ...
data/  malla/ · convenios/ · programa.json · perfil.json · grupos.json · info.json · intercampus.json
```
