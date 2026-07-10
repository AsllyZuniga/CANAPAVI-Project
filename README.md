# CANAPAVI — Cultura, Identidad y Territorio

Sitio web institucional de la **Fundación Cultura Nariñense para el Rescate de los Valores e Identidad (CANAPAVI)**, organización sin ánimo de lucro con sede en Tumaco, Nariño, Colombia, que defiende el patrimonio cultural, los derechos humanos y la identidad afrocolombiana del Pacífico sur.

🌐 **Sitio público:** [https://asllyzuniga.github.io/CANAPAVI-Project/](https://asllyzuniga.github.io/CANAPAVI-Project/)

---

## 📋 Contenido

- [Descripción del proyecto](#-descripción-del-proyecto)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Secciones del sitio](#-secciones-del-sitio)
- [Desarrollo local](#-desarrollo-local)
- [Build de producción](#-build-de-producción)
- [Deploy a GitHub Pages](#-deploy-a-github-pages)
- [Recursos gráficos](#-recursos-gráficos)
- [Licencias y atribuciones](#-licencias-y-atribuciones)

---

## 🌎 Descripción del proyecto

CANAPAVI es una organización con más de 20 años de trabajo continuo con comunidades negras del Pacífico sur colombiano. El sitio web busca visibilizar su labor y servir como punto de encuentro para aliados, donantes, voluntarios y la comunidad en general.

El proyecto fue generado como punto de partida con **Figma Make** y luego personalizado para reflejar la identidad visual y el contenido de la fundación.

---

## 🛠 Stack tecnológico

| Capa | Tecnología |
|------|------------|
| **Framework** | React 18 + TypeScript |
| **Build tool** | Vite 6 |
| **Estilos** | Tailwind CSS 4 + theme tokens CSS |
| **Iconos** | Lucide React |
| **Animaciones** | Motion (Framer Motion) |
| **UI base** | shadcn/ui + Radix UI primitives |
| **Routing** | Estado local (sin react-router) — navegación por `useState` |
| **Despliegue** | GitHub Pages + GitHub Actions |

---

## 📁 Estructura del proyecto

```
CANAPAVI/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD → GitHub Pages
├── src/
│   ├── app/
│   │   ├── App.tsx             # Componente raíz con todas las páginas
│   │   └── components/
│   │       ├── figma/          # Helpers de Figma Make
│   │       └── ui/             # Componentes shadcn/ui
│   ├── assets/                 # Imágenes locales (img1.jpg … img12.jpg)
│   ├── imports/                # Logo y assets importados
│   ├── styles/                 # Tailwind, theme, fuentes
│   └── main.tsx                # Entry point
├── dist/                       # Build de producción (generado)
├── index.html                  # HTML raíz
├── vite.config.ts              # Configuración de Vite (base path)
├── tailwind.config / css       # Estilos globales
├── package.json
└── package-lock.json
```

---

## 🧭 Secciones del sitio

El sitio es una **SPA con navegación por estado** (no usa URL routing). Las páginas son componentes dentro de `App.tsx`:

| Sección | Componente | Contenido |
|---------|-----------|-----------|
| **Inicio** | `HomePage` | Hero, stats, programas, proyectos, eventos, noticias, testimonios, aliados, CTA de donación |
| **Nosotros** | `NosotrosPage` | Historia, misión, visión, valores, línea de tiempo, equipo |
| **Programas** | `ProgramasPage` | 9 programas estratégicos con **flip cards interactivas** (botón "Ver foto") |
| **Proyectos** | `ProyectosPage` | 6 proyectos con filtros por estado |
| **Noticias** | `NoticiasPage` | Noticias con búsqueda, filtros por categoría y newsletter |
| **Galería** | `GaleriaPage` | 12 imágenes con filtros por categoría y lightbox |
| **Biblioteca** | `BibliotecaPage` | Recursos descargables (informes, publicaciones, cartillas) |
| **Eventos** | `EventosPage` | Agenda cultural 2025 |
| **Aliados** | `AliadosPage` | Organizaciones colaboradoras |
| **Voluntariado** | `VoluntariadoPage` | Convocatorias + formulario de postulación |
| **Donaciones** | `DonacionesPage` | Niveles de aporte (Semilla · Raíz · Manglar) |
| **Contacto** | `ContactoPage` | Datos de contacto, mapa y formulario |

### Programas destacados (9 líneas estratégicas)

1. Patrimonio Cultural
2. Derechos Humanos
3. Empoderamiento de Mujeres
4. Etnoeducación
5. Arte y Artivismo
6. Tejidos Sonoros
7. Liderazgo Comunitario
8. Juventud y Territorio
9. Medio Ambiente

---

## 💻 Desarrollo local

### Requisitos

- **Node.js** ≥ 20
- **npm** (incluido con Node)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/AsllyZuniga/CANAPAVI-Project.git
cd CANAPAVI-Project

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio se abrirá en `http://localhost:5173` (o el puerto que Vite asigne).

---

## 📦 Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para producción. El output incluye:

- HTML con `base: '/CANAPAVI-Project/'` aplicado
- JS y CSS minificados con hash
- Assets locales copiados y optimizados

Para previsualizar el build localmente:

```bash
npm run preview
```

---

## 🚀 Deploy a GitHub Pages

El proyecto se despliega automáticamente con **GitHub Actions** en cada push a `main`.

### Flujo de trabajo

1. **Configurar GitHub Pages** (solo la primera vez):
   - Ir a `Settings → Pages`
   - En **Source**, seleccionar **GitHub Actions**

2. **Push a `main`**:

   ```bash
   git push origin main
   ```

3. El workflow `.github/workflows/deploy.yml`:
   - Levanta un runner Ubuntu con Node 24
   - Ejecuta `npm ci` (usa el `package-lock.json`)
   - Construye con `npm run build`
   - Sube `dist/` como artifact
   - Despliega a GitHub Pages

4. **URL pública**: `https://asllyzuniga.github.io/CANAPAVI-Project/`

### Configuración clave en `vite.config.ts`

```ts
export default defineConfig({
  base: '/CANAPAVI-Project/',  // ← requerido para GitHub Pages project page
  // ...
});
```

> Si el repositorio cambia de nombre, actualizar `base` y la URL en este README.

---

## 🖼 Recursos gráficos

Todas las imágenes de productos, programas, proyectos, eventos, noticias y galería son **archivos locales** en `src/assets/`:

| Archivo | Uso principal |
|---------|---------------|
| `img1.jpg` | Donaciones (CTA) |
| `img2.jpg` | Hero / Noticias |
| `img3.jpg` | Programa Patrimonio Cultural |
| `img4.jpg` | Programa Derechos Humanos |
| `img5.jpg` | Programa Mujeres / Proyecto Mujeres Defensoras |
| `img6.jpg` | Programa Etnoeducación / Proyecto Etnoeducación |
| `img7.jpg` | Programa Arte / Proyecto Artivismo |
| `img8.jpg` | Programa Tejidos Sonoros / Proyecto homónimo |
| `img9.jpg` | Programa Liderazgo Comunitario |
| `img10.jpg` | Programa Juventud / Mapa de contacto |
| `img11.jpg` | Programa Medio Ambiente / Guardianes del Manglar |
| `img12.jpg` | Diplomado en Liderazgo / Memoria ancestral |

> El logo se carga desde `src/imports/image.png`.

---

## 📄 Licencias y atribuciones

Este proyecto incluye:

- Componentes de **[shadcn/ui](https://ui.shadcn.com/)** bajo [MIT License](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).
- Íconos de **[Lucide](https://lucide.dev/)** bajo ISC License.
- El proyecto se distribuye bajo los términos de la organización CANAPAVI.

Las fotografías mostradas en la versión inicial provenían de **[Unsplash](https://unsplash.com)** (licencia Unsplash). En la versión actual las imágenes principales son **fotografías locales de la fundación** en `src/assets/`.

---

## 📬 Contacto

**CANAPAVI – Fundación Cultura Nariñense**
Av. La Playa con Calle Páez 3-42, Tumaco, Nariño, Colombia
📞 316 415 7472
✉️ info@canapavi.org.co

---

<sub>Hecho con 💚 desde Tumaco para el Pacífico sur colombiano.</sub>
