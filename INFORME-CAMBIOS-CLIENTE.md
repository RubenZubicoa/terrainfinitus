# Informe de cambios — Terra Infinitus

**Proyecto:** Aplicación web Terra Infinitus (Angular)  
**Periodo:** 8 de junio – 21 de junio de 2026  
**Objetivo del documento:** Resumen de las tareas realizadas para justificar las horas dedicadas al cliente.

> Nota: Se incluye un commit representativo por día de trabajo. Cada entrada resume el conjunto de cambios entregados ese día, aunque hubiera varios commits.

---

## Resumen ejecutivo

Durante el periodo indicado se ha evolucionado la web desde la estructura inicial hasta secciones funcionales de habitaciones, tienda boutique (gourmet y merchandising), proyectos y mejoras de contenido multimedia. El trabajo incluye diseño de interfaz, datos de catálogo, internacionalización en 7 idiomas e integración de recursos (imágenes, vídeos y documentos PDF).

**Días con actividad registrada:** 7  
**Commits totales en el periodo:** 28

---

## Detalle por día

### 8 de junio de 2026
**Commit de referencia:** `b1a6df5` — *feat: add inicio*

**Trabajo realizado:**
- Configuración inicial del repositorio y estructura base de la aplicación Angular.
- Página de inicio: reestructuración del layout y ajuste del tamaño del vídeo principal.
- Sección de **habitaciones**: diseño del listado, modelos de datos, rutas y página de **detalle de habitación** con traducciones en 7 idiomas (es, en, fr, de, it, pt, jp).
- Refactorización y limpieza del código de habitaciones.
- Ajustes de navegación (enlace a inicio).

**Áreas afectadas:** Inicio, habitaciones, i18n, rutas, modelos de datos.

---

### 9 de junio de 2026
**Commit de referencia:** `357d2f7` — *feat: cambiar titulo habitaciones*

**Trabajo realizado:**
- Ajustes visuales y de contenido en la página de inicio según feedback.
- Actualización del título y estilos de la sección de habitaciones.

**Áreas afectadas:** Inicio, habitaciones.

---

### 10 de junio de 2026
**Commit de referencia:** `d7cdb9c` — *feat: añadir datos de prueba en habitacione*

**Trabajo realizado:**
- Mejoras de identidad visual: logo sin recuadro, incorporación de imágenes y banner más estrecho.
- Ampliación del catálogo de habitaciones con datos de prueba completos.
- Refinamiento del diseño de la sección de habitaciones.

**Áreas afectadas:** Layout, imágenes, banner, habitaciones.

---

### 12 de junio de 2026
**Commit de referencia:** `6b0f4d8` — *feat: crear la seccion de la idea*

**Trabajo realizado:**
- Creación de la sección **La Idea** dentro de proyectos.
- Extracción del banner a un componente reutilizable compartido.
- Incorporación de imágenes de la sección y simplificación de la página de inicio (contenido movido/reorganizado hacia la nueva sección).

**Áreas afectadas:** Proyectos (La Idea), componente banner, inicio, assets gráficos.

---

### 16 de junio de 2026
**Commit de referencia:** `eb7427e` — *feat: aumentar el tamaño del logo*

**Trabajo realizado:**
- Habitaciones: incorporación de **tipos de habitación** (clasificación y datos ampliados).
- **Tienda boutique:** reestructuración de rutas y navegación.
- Creación de las secciones **Gourmet** y **Merchandising** con componente de listado de productos reutilizable.
- Modelo de producto, datos iniciales de catálogo y traducciones en los 7 idiomas.
- Ajuste del tamaño del logo en el menú lateral.

**Áreas afectadas:** Habitaciones, tienda boutique, navegación, i18n, sidenav.

---

### 18 de junio de 2026
**Commit de referencia:** `43b0fa3` — *feat: agregar productos que faltan*

**Trabajo realizado:**
- Actualización del vídeo de la página de inicio.
- **Tienda gourmet:** integración del catálogo Malvasía (foie gras, productos de pato, regalos gourmet) con imágenes y textos en 7 idiomas.
- **Página de detalle de producto** gourmet (`/tienda-boutique/gourmet/:productId`).
- Formato de precios con decimales y símbolo € a la derecha; configuración de locale español en la aplicación.
- Ampliación del catálogo con los productos restantes del proveedor.

**Áreas afectadas:** Inicio, tienda gourmet, detalle de producto, i18n, imágenes de producto, configuración regional.

---

### 21 de junio de 2026
**Commit de referencia:** `b75403a` — *feat: mejorar video de inicio*

**Trabajo realizado:**
- Alojamiento del vídeo de inicio en **Firebase Storage** para mejor rendimiento y disponibilidad.
- Incorporación del documento PDF del proyecto **Peralejos**.
- Mejora de la reproducción del vídeo de inicio (reproductor nativo con autoplay, controles y compatibilidad móvil).

**Áreas afectadas:** Inicio (vídeo), proyecto Peralejos (PDF), integración con Firebase.

---

## Anexo: commits por día

| Fecha       | Commit    | Mensaje (representativo)              |
|------------|-----------|----------------------------------------|
| 2026-06-08 | `b1a6df5` | feat: add inicio                       |
| 2026-06-09 | `357d2f7` | feat: cambiar titulo habitaciones      |
| 2026-06-10 | `d7cdb9c` | feat: añadir datos de prueba en habitacione |
| 2026-06-12 | `6b0f4d8` | feat: crear la seccion de la idea      |
| 2026-06-16 | `eb7427e` | feat: aumentar el tamaño del logo      |
| 2026-06-18 | `43b0fa3` | feat: agregar productos que faltan     |
| 2026-06-21 | `b75403a` | feat: mejorar video de inicio          |

---

*Documento generado a partir del historial de Git del repositorio Terra Infinitus.*
