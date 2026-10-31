/* =============================================
   MÓDULO INICIO
   Pide solo sus propios datos: programa.json al abrir,
   perfil.json y grupos.json cuando la persona se acerca a esa sección.
   ============================================= */

const ICONOS_PERFIL = {
  ciencia: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/>',
  equipo: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1"/><circle cx="17" cy="9" r="2.6"/><path d="M17 14a4 4 0 0 1 4 4v2"/>',
  gestion: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  empresa: '<path d="M3 21h18M5 21V8l7-4 7 4v13"/><path d="M9 21v-5h6v5M9 11h.01M15 11h.01"/>',
};

const ICONOS_RUTAS = {
  hidrico: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  oceano: '<path d="M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7-1"/><path d="M2 17c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7-1"/><path d="M17.5 6a4.5 4.5 0 1 0-8.9 1A5.5 5.5 0 0 0 2 12h20a4.5 4.5 0 0 0-4.5-6z"/>',
  saneamiento: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  suelos: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.14 15h15.72"/><path d="M2 19h20"/>',
  gestion: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
};

const icono = (nombre) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS_PERFIL[nombre] || ''}</svg>`;
const iconoRuta = (nombre) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS_RUTAS[nombre] || ''}</svg>`;

const ICONO_SELLO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/><path d="m9.5 9 1.8 1.8L15 7.2"/></svg>';


/* ---------- Programa ---------- */

function pintarPrograma(p) {
  $('#portada-cifras').innerHTML = p.cifras
    .map((c) => `<li>${esc(c.valor)}<small>${esc(c.texto)}</small></li>`)
    .join('');

  const acreditacion = p.acreditacion;
  $('#programa-contenido').innerHTML = `
    <div class="seccion-titulo">
      <p class="seccion-titulo__antetitulo">${esc(p.facultad)} · ${esc(p.sede)}</p>
      <h2 id="programa-titulo">Definición del pregrado</h2>
      <p class="seccion-titulo__intro">Ingeniería Ambiental · Formación orientada a la sostenibilidad y armonía entre sociedad y naturaleza</p>
    </div>

    <div class="programa__rejilla">
      <div class="programa__texto">
        <span class="programa__lema">Lema de la Facultad: ${esc(p.lema)}</span>
        <div class="programa__parrafos">
          ${p.descripcion.map((parrafo) => `<p>${esc(parrafo)}</p>`).join('')}
        </div>
      </div>
      <ul class="ficha">
        ${p.ficha.map((f) => `
          <li><span class="ficha__etiqueta">${esc(f.etiqueta)}</span><span class="ficha__valor">${esc(f.valor)}</span></li>`).join('')}
      </ul>
    </div>

    <!-- RUTAS CURRICULARES -->
    <div class="rutas-curriculares" id="rutas-curriculares">
      <div class="seccion-titulo seccion-titulo--rutas">
        <p class="seccion-titulo__antetitulo">Campos de profundización y aplicación</p>
        <h3 class="rutas__titulo">Rutas curriculares</h3>
        <p class="seccion-titulo__intro">El programa articula su formación en cinco áreas estratégicas que responden a los desafíos ecológicos y territoriales:</p>
      </div>

      <div class="rutas__grid">
        ${(p.rutas || []).map((ruta, idx) => `
          <article class="ruta-card" style="--color-ruta: ${ruta.color}">
            <div class="ruta-card__encabezado">
              <span class="ruta-card__numero">0${idx + 1}</span>
              <span class="ruta-card__icono">${iconoRuta(ruta.icono)}</span>
            </div>
            <h4 class="ruta-card__nombre">${esc(ruta.nombre)}</h4>
            <p class="ruta-card__descripcion">${esc(ruta.descripcion)}</p>
            <div class="ruta-card__pie">
              <a href="malla.html" class="ruta-card__enlace" title="Ver materias de ${esc(ruta.nombre)} en la malla">
                <span>Ver en la malla</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </article>`).join('')}
      </div>
    </div>

    <div class="acreditacion">
      <div class="acreditacion__cabecera">
        <span class="acreditacion__sello-icono">${ICONO_SELLO}</span>
        <div>
          <span class="acreditacion__antetitulo">Calidad Académica Certificada</span>
          <h3 class="acreditacion__estado">${esc(acreditacion.estado)}</h3>
        </div>
      </div>
      <div class="acreditacion__rejilla">
        ${acreditacion.hitos.map((h, i) => `
          <div class="acreditacion__tarjeta ${String(h.anio).toLowerCase().includes('renova') ? 'acreditacion__tarjeta--renovacion' : ''}">
            <div class="acreditacion__tarjeta-encabezado">
              <span class="acreditacion__anio-badge">${esc(h.anio)}</span>
              <span class="acreditacion__hito-tipo">${i === 0 ? 'Acreditación Inicial' : 'Renovación de Calidad'}</span>
            </div>
            <p class="acreditacion__texto">${esc(h.texto)}</p>
          </div>`).join('')}
      </div>
      <div class="acreditacion__pie">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="acreditacion__info-icono" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <p class="acreditacion__nota">${esc(acreditacion.nota)}</p>
      </div>
    </div>

    <p class="fuentes">Fuentes:
      ${p.fuentes.map((f) => `<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.titulo)}</a>`).join(' · ')}
    </p>`;
}


/* ---------- Perfil del egresado ---------- */

function pintarPerfil(perfil) {
  $('#perfil-contenido').innerHTML = `
    <div class="seccion-titulo">
      <p class="seccion-titulo__antetitulo">Quién sale de aquí</p>
      <h2 id="perfil-titulo">${esc(perfil.titulo)}</h2>
      <p class="seccion-titulo__intro">${esc(perfil.intro)}</p>
    </div>
    <ul class="perfil__tarjetas">
      ${perfil.rasgos.map((r) => `
        <li class="rasgo">
          <span class="rasgo__icono">${icono(r.icono)}</span>
          <h3>${esc(r.titulo)}</h3>
          <p>${esc(r.texto)}</p>
        </li>`).join('')}
    </ul>
    <p class="perfil__fuente">${esc(perfil.fuente)}</p>`;
}


/* ---------- Grupos estudiantiles y semilleros ---------- */

function pintarGrupos(grupos) {
  const globos = grupos.map((grupo) => {
    const destino = grupo.enlace ? `href="${esc(grupo.enlace)}" target="_blank" rel="noopener noreferrer"` : '';
    const emailBtn = grupo.email ? `
      <a class="grupo__enlace-contacto" href="mailto:${esc(grupo.email)}" title="Correo institucional de ${esc(grupo.nombre)}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        <span>${esc(grupo.email)}</span>
      </a>` : '';

    return `
      <li class="grupo" style="--color: ${esc(grupo.color)};">
        <a class="globo-enlace" ${destino} aria-label="Visitar Instagram de ${esc(grupo.nombre)}" title="Clic para abrir el Instagram de ${esc(grupo.nombre)}">
          <div class="globo-terraqueo" style="--color-globo: ${esc(grupo.color)}">
            <div class="globo-terraqueo__esfera">
              <!-- Grid de meridianos y paralelos (Globo Terráqueo) -->
              <svg class="globo-terraqueo__svg" viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                  <radialGradient id="luz-${grupo.id}" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
                    <stop offset="40%" stop-color="#ffffff" stop-opacity="0.12"/>
                    <stop offset="80%" stop-color="#031d44" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#031d44" stop-opacity="0.85"/>
                  </radialGradient>
                  <clipPath id="clip-${grupo.id}">
                    <circle cx="50" cy="50" r="46"/>
                  </clipPath>
                </defs>

                <!-- Fondo base de la esfera (océano / biósfera) -->
                <circle cx="50" cy="50" r="46" fill="var(--color-globo)"/>

                <!-- Relieve / siluetas de continentes estilizadas -->
                <g clip-path="url(#clip-${grupo.id})" opacity="0.9">
                  <path d="M32 20 Q44 14 54 22 Q64 30 60 42 Q52 48 38 44 Q28 38 32 20 Z" fill="#d0ff01" opacity="0.4"/>
                  <path d="M66 38 Q76 32 86 44 Q90 60 78 68 Q68 66 66 52 Z" fill="#ecffb6" opacity="0.35"/>
                  <path d="M18 44 Q28 42 32 54 Q30 70 20 76 Q10 70 18 44 Z" fill="#2c563e" opacity="0.5"/>
                  <path d="M42 62 Q54 56 66 66 Q72 82 58 90 Q44 88 42 74 Z" fill="#00bcc8" opacity="0.4"/>

                  <!-- Líneas de latitud y longitud del globo terráqueo -->
                  <ellipse cx="50" cy="50" rx="46" ry="46" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="1.2"/>
                  <ellipse cx="50" cy="50" rx="33" ry="46" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="0.9"/>
                  <ellipse cx="50" cy="50" rx="16" ry="46" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="0.9"/>
                  <line x1="50" y1="4" x2="50" y2="96" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
                  <line x1="4" y1="50" x2="96" y2="50" stroke="rgba(255,255,255,0.45)" stroke-width="1.2"/>
                  <ellipse cx="50" cy="30" rx="40" ry="12" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="0.8"/>
                  <ellipse cx="50" cy="70" rx="40" ry="12" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="0.8"/>
                </g>

                <!-- Iluminación y volumen 3D esférico -->
                <circle cx="50" cy="50" r="46" fill="url(#luz-${grupo.id})" clip-path="url(#clip-${grupo.id})"/>
                <!-- Borde atmosférico -->
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.4"/>
              </svg>

              <!-- Logo oficial en el centro de la eco-esfera -->
              <div class="globo-terraqueo__centro">
                <img class="globo-terraqueo__logo" src="${esc(grupo.logoCuadrado || grupo.logo)}" alt="Logo de ${esc(grupo.nombre)}">
              </div>

              <!-- Indicador de Instagram que flota en hover -->
              <div class="globo-terraqueo__ig-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <span>Ver Instagram ↗</span>
              </div>
            </div>
          </div>
        </a>

        <div class="grupo__cuerpo">
          <span class="grupo__tipo">${esc(grupo.tipo)}</span>
          <h3 class="grupo__nombre-texto">${esc(grupo.nombre)}</h3>
          ${grupo.descripcion ? `<p class="grupo__detalle">${esc(grupo.descripcion)}</p>` : ''}
          <div class="grupo__acciones">
            ${emailBtn}
          </div>
        </div>
      </li>`;
  }).join('');

  $('#grupos-contenido').innerHTML = `
    <div class="seccion-titulo">
      <p class="seccion-titulo__antetitulo">Comunidad estudiantil</p>
      <h2 id="grupos-titulo">Grupos y semilleros</h2>
      <p class="seccion-titulo__intro">Haz clic en cualquier globo terráqueo para visitar directamente su perfil de Instagram y conocer sus convocatorias y proyectos.</p>
    </div>
    <ul class="grupos__lista">${globos}</ul>`;
}


/* ---------- Carga por secciones ---------- */

// Cada sección pide su JSON recién cuando está cerca de la pantalla.
const SECCIONES = {
  perfil: () => cargarDatos('perfil').then(pintarPerfil),
  grupos: () => cargarDatos('grupos').then(pintarGrupos),
};

function cargarSeccion(seccion) {
  const cargar = SECCIONES[seccion.dataset.carga];
  cargar().catch((error) => mostrarErrorDeCarga(seccion.querySelector('.contenedor'), error));
}

cargarDatos('programa')
  .then(pintarPrograma)
  .catch((error) => mostrarErrorDeCarga($('#programa-contenido'), error));

const porCargar = $$('[data-carga]');
if ('IntersectionObserver' in window) {
  const vigilante = new IntersectionObserver((entradas) => {
    entradas.filter((e) => e.isIntersecting).forEach((e) => {
      vigilante.unobserve(e.target);
      cargarSeccion(e.target);
    });
  }, { rootMargin: '400px 0px' });
  porCargar.forEach((seccion) => vigilante.observe(seccion));
} else {
  porCargar.forEach(cargarSeccion);
}
