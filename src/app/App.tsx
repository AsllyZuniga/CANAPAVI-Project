import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Menu, X, Heart, Users, MapPin, Phone, Mail, Calendar,
  BookOpen, Camera, Download, ArrowRight, Star, Check,
  Facebook, Instagram, Twitter, Youtube, ChevronDown,
  Globe, Shield, Music, Lightbulb, FileText, Search,
  Filter, Send, ExternalLink,   Home, ClipboardList, Music2,
  Palette, Sprout, Waves, Globe2, Building2, Network, Landmark,
  Mountain, Building, GraduationCap, PawPrint, Flag, Briefcase,
  Microscope, UserCog, Megaphone, Scale, Handshake, HeartHandshake,
  Target, Sparkles, Award, Lock, ShieldCheck, UserCircle, Leaf,
  HandHeart, HandMetal, TreePine, FolderKanban, Newspaper,
  CalendarDays, Images,
} from "lucide-react";
import logoImg from "@/imports/image.png";
import heroPhoto from "@/assets/img2.jpg";
import donationImg from "@/assets/img1.jpg";

// ─── DATA ────────────────────────────────────────────────────────────────────

type NavSubItem = { id: string; label: string; desc: string; icon: LucideIcon };
type NavLink = { id: string; label: string; submenu?: NavSubItem[] };

const navLinks: NavLink[] = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  {
    id: "programas",
    label: "Programas",
    submenu: [
      { id: "programas", label: "Programas", desc: "Líneas de acción estratégica", icon: Briefcase },
      { id: "proyectos", label: "Proyectos", desc: "Trabajo en territorio", icon: FolderKanban },
    ],
  },
  {
    id: "contenido",
    label: "Contenido",
    submenu: [
      { id: "noticias", label: "Noticias", desc: "Actualidad institucional", icon: Newspaper },
      { id: "eventos", label: "Eventos", desc: "Agenda cultural 2025", icon: CalendarDays },
      { id: "galeria", label: "Galería", desc: "Memorias visuales", icon: Images },
      { id: "biblioteca", label: "Biblioteca", desc: "Recursos digitales", icon: BookOpen },
    ],
  },
  { id: "aliados", label: "Aliados" },
  {
    id: "unete",
    label: "Únete",
    submenu: [
      { id: "voluntariado", label: "Voluntariado", desc: "Aporta tus talentos", icon: HandHeart },
      { id: "donaciones", label: "Donaciones", desc: "Apoya nuestra causa", icon: Heart },
    ],
  },
  { id: "contacto", label: "Contacto" },
];

const stats: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "+20", label: "Años de trabajo", icon: Calendar },
  { value: "+15", label: "Comunidades beneficiadas", icon: Home },
  { value: "+45", label: "Proyectos ejecutados", icon: ClipboardList },
  { value: "+800", label: "Mujeres participantes", icon: Users },
  { value: "+12", label: "Municipios impactados", icon: MapPin },
];

const programs: {
  id: number;
  title: string;
  icon: LucideIcon;
  gradient: string;
  bg: string;
  description: string;
  objectives: string[];
  results: string;
  category: string;
}[] = [
  {
    id: 1,
    title: "Patrimonio Cultural",
    icon: Music2,
    gradient: "from-green-700 to-emerald-500",
    bg: "bg-green-50",
    description:
      "Protegemos y promovemos el patrimonio cultural inmaterial afrocolombiano, incluyendo la música, danzas, rituales y saberes ancestrales del Pacífico colombiano.",
    objectives: ["Documentar tradiciones orales", "Formar guardianes culturales", "Crear archivos digitales comunitarios"],
    results: "+120 tradiciones documentadas",
    category: "Cultura",
  },
  {
    id: 2,
    title: "Derechos Humanos",
    icon: HandMetal,
    gradient: "from-blue-800 to-blue-500",
    bg: "bg-blue-50",
    description:
      "Defendemos los derechos fundamentales de las comunidades afrocolombianas, con énfasis en el derecho al territorio, la consulta previa y la no discriminación.",
    objectives: ["Capacitación en DDHH", "Acompañamiento jurídico", "Documentación de violaciones"],
    results: "+300 personas capacitadas",
    category: "Derechos",
  },
  {
    id: 3,
    title: "Empoderamiento de Mujeres",
    icon: HeartHandshake,
    gradient: "from-orange-600 to-amber-400",
    bg: "bg-orange-50",
    description:
      "Fortalecemos el liderazgo de las mujeres afropacíficas, reconociendo su rol central en la preservación cultural, la defensa territorial y la construcción de paz.",
    objectives: ["Escuelas de liderazgo femenino", "Apoyo a emprendimientos", "Redes de protección"],
    results: "+800 mujeres participantes",
    category: "Género",
  },
  {
    id: 4,
    title: "Etnoeducación",
    icon: BookOpen,
    gradient: "from-teal-700 to-cyan-500",
    bg: "bg-teal-50",
    description:
      "Promovemos una educación propia que incorpora la historia, los valores y los saberes de las comunidades negras en los procesos de aprendizaje.",
    objectives: ["Currículos con enfoque propio", "Formación de docentes", "Material educativo afrocolombiano"],
    results: "+25 escuelas vinculadas",
    category: "Educación",
  },
  {
    id: 5,
    title: "Arte y Artivismo",
    icon: Palette,
    gradient: "from-red-600 to-orange-400",
    bg: "bg-red-50",
    description:
      "El arte como herramienta de transformación social. Usamos la música, el teatro, la danza y las artes visuales para visibilizar realidades y generar cambio.",
    objectives: ["Talleres de arte comunitario", "Festivales culturales", "Murales y arte público"],
    results: "+50 festivales organizados",
    category: "Arte",
  },
  {
    id: 6,
    title: "Tejidos Sonoros",
    icon: Music,
    gradient: "from-purple-700 to-violet-500",
    bg: "bg-purple-50",
    description:
      "Rescatamos, registramos y difundimos la música tradicional del Pacífico: marimba, cununos, bombos, chigualo y los cantos de las cantadoras.",
    objectives: ["Grabaciones etnomusicales", "Talleres de marimba y percusión", "Conciertos itinerantes"],
    results: "+200 canciones rescatadas",
    category: "Música",
  },
  {
    id: 7,
    title: "Liderazgo Comunitario",
    icon: Users,
    gradient: "from-green-800 to-lime-600",
    bg: "bg-lime-50",
    description:
      "Formamos líderes comunitarios con capacidades para la gestión territorial, la gobernanza local y la interlocución con el Estado y organismos internacionales.",
    objectives: ["Escuelas de formación de líderes", "Fortalecimiento de consejos comunitarios", "Incidencia política"],
    results: "+40 líderes certificados",
    category: "Comunidad",
  },
  {
    id: 8,
    title: "Juventud y Territorio",
    icon: Sprout,
    gradient: "from-lime-700 to-green-400",
    bg: "bg-green-50",
    description:
      "Conectamos a los jóvenes con sus raíces culturales y su territorio, fomentando la identidad afrocolombiana y el compromiso con la defensa del Pacífico.",
    objectives: ["Escuelas de formación juvenil", "Intercambios culturales", "Medios de comunicación propios"],
    results: "+500 jóvenes vinculados",
    category: "Juventud",
  },
  {
    id: 9,
    title: "Medio Ambiente",
    icon: Waves,
    gradient: "from-cyan-800 to-teal-400",
    bg: "bg-cyan-50",
    description:
      "Defendemos los ecosistemas del Pacífico sur —manglares, ríos y selvas— como patrimonio colectivo de las comunidades afrocolombianas e indígenas.",
    objectives: ["Guardianes del manglar", "Educación ambiental comunitaria", "Planes de manejo territorial"],
    results: "+1.200 ha protegidas",
    category: "Ambiente",
  },
];

const projects = [
  {
    id: 1,
    title: "Tejidos Sonoros del Pacífico",
    status: "En curso",
    statusColor: "bg-green-100 text-green-800",
    category: "Cultura",
    year: "2023–2025",
    img: "photo-1493225457124-a3eb161ffa5f",
    description:
      "Rescate y digitalización del patrimonio musical intangible del Pacífico colombiano a través de grabaciones etnomusicales participativas.",
    partners: ["ONU Mujeres", "MinCultura"],
    beneficiaries: "+1.500",
  },
  {
    id: 2,
    title: "Mujeres Defensoras del Territorio",
    status: "En curso",
    statusColor: "bg-green-100 text-green-800",
    category: "DDHH",
    year: "2024–2026",
    img: "photo-1573497019940-1c28c88b4f3e",
    description:
      "Fortalecimiento de redes de protección para mujeres defensoras de derechos humanos en el Pacífico nariñense.",
    partners: ["ONU Mujeres", "ACNUR"],
    beneficiaries: "+300",
  },
  {
    id: 3,
    title: "Escuela de Cantadoras",
    status: "Finalizado",
    statusColor: "bg-gray-100 text-gray-700",
    category: "Cultura",
    year: "2021–2023",
    img: "photo-1529156069898-49953e39b3ac",
    description:
      "Formación intergeneracional en el canto tradicional del Pacífico, rescatando los alabaos, chigualos y bundes.",
    partners: ["Gobernación de Nariño", "MinCultura"],
    beneficiaries: "+80",
  },
  {
    id: 4,
    title: "Guardianes del Manglar",
    status: "Próximo",
    statusColor: "bg-amber-100 text-amber-800",
    category: "Ambiente",
    year: "2025–2027",
    img: "photo-1518020382113-a7e8fc38eac9",
    description:
      "Programa de monitoreo y restauración de ecosistemas de manglar con participación comunitaria en la costa nariñense.",
    partners: ["WWF", "IIAP"],
    beneficiaries: "+2.000",
  },
  {
    id: 5,
    title: "Etnoeducación Propia",
    status: "En curso",
    statusColor: "bg-green-100 text-green-800",
    category: "Educación",
    year: "2023–2025",
    img: "photo-1503454537195-1dcabb73ffb9",
    description:
      "Diseño e implementación de currículos con enfoque etnoeducativo en instituciones de Tumaco y municipios vecinos.",
    partners: ["MEN", "Secretaría de Educación"],
    beneficiaries: "+2.000",
  },
  {
    id: 6,
    title: "Artivismo por la Paz",
    status: "Finalizado",
    statusColor: "bg-gray-100 text-gray-700",
    category: "Arte",
    year: "2020–2022",
    img: "photo-1558618666-fcd25c85cd64",
    description:
      "Festival itinerante de arte, cultura y memoria histórica en municipios del Pacífico nariñense afectados por el conflicto.",
    partners: ["PNUD", "Embajada de Alemania"],
    beneficiaries: "+5.000",
  },
];

const news = [
  {
    id: 1,
    title: "CANAPAVI en el Foro Mundial de Mujeres Defensoras",
    date: "15 de junio de 2025",
    category: "Derechos Humanos",
    img: "photo-1573497019940-1c28c88b4f3e",
    excerpt:
      "Nuestra directora representó a las comunidades afropacíficas en el foro internacional organizado por ONU Mujeres en Ginebra.",
  },
  {
    id: 2,
    title: "Nuevo disco de cantadoras del Pacífico sur",
    date: "2 de mayo de 2025",
    category: "Cultura",
    img: "photo-1493225457124-a3eb161ffa5f",
    excerpt:
      "Lanzamos el álbum 'Voces del Manglar', con 18 canciones tradicionales interpretadas por las cantadoras de Tumaco.",
  },
  {
    id: 3,
    title: "Festival Tejidos Sonoros 2025 convoca miles de personas",
    date: "18 de abril de 2025",
    category: "Eventos",
    img: "photo-1529156069898-49953e39b3ac",
    excerpt:
      "La décima edición del festival reunió más de 4.000 personas en el malecón de Tumaco durante tres días de celebración cultural.",
  },
  {
    id: 4,
    title: "Reconocimiento UNESCO al patrimonio musical del Pacífico",
    date: "10 de marzo de 2025",
    category: "Patrimonio",
    img: "photo-1512813195386-6cf811ad3542",
    excerpt:
      "La marimba y los cantos del Pacífico colombiano refuerzan su reconocimiento internacional, impulsando nuestro trabajo de rescate.",
  },
  {
    id: 5,
    title: "Nuevas becas para jóvenes líderes de Tumaco",
    date: "5 de febrero de 2025",
    category: "Educación",
    img: "photo-1503454537195-1dcabb73ffb9",
    excerpt:
      "En alianza con la Universidad de Nariño, abrimos 20 becas para jóvenes líderes afrocolombianos en programas de ciencias sociales.",
  },
  {
    id: 6,
    title: "Mapa de impacto 2024: un año de transformación cultural",
    date: "20 de enero de 2025",
    category: "Informe",
    img: "photo-1518020382113-a7e8fc38eac9",
    excerpt:
      "Publicamos el informe anual con los resultados de todos nuestros proyectos, evidenciando el impacto en 12 municipios del Pacífico sur.",
  },
];

const events = [
  {
    id: 1,
    title: "Festival Tejidos Sonoros 2025",
    date: "12–14 sept 2025",
    location: "Malecón de Tumaco",
    category: "Festival",
    img: "photo-1493225457124-a3eb161ffa5f",
    description: "Tres días de música, danza, teatro y gastronomía del Pacífico. Entrada libre para toda la comunidad.",
    free: true,
  },
  {
    id: 2,
    title: "Taller de Marimba y Cununos",
    date: "22 ago 2025",
    location: "Casa Cultural CANAPAVI",
    category: "Taller",
    img: "photo-1529156069898-49953e39b3ac",
    description: "Formación en instrumentos de percusión tradicional del Pacífico. Cupos limitados a 20 participantes.",
    free: true,
  },
  {
    id: 3,
    title: "Diplomado en Liderazgo Comunitario",
    date: "5 sept – 15 oct 2025",
    location: "Virtual y presencial",
    category: "Formación",
    img: "photo-1573497019940-1c28c88b4f3e",
    description: "Diplomado gratuito para líderes de comunidades negras del Pacífico colombiano. Certificado avalado.",
    free: true,
  },
  {
    id: 4,
    title: "Foro Regional: Mujeres y Territorio",
    date: "10 oct 2025",
    location: "Teatro Municipal de Tumaco",
    category: "Foro",
    img: "photo-1573497019940-1c28c88b4f3e",
    description: "Espacio de intercambio y reflexión sobre el rol de las mujeres en la defensa territorial del Pacífico.",
    free: true,
  },
];

const testimonials = [
  {
    name: "Doña Lucía Angulo",
    role: "Cantadora, comunidad El Morro",
    quote:
      "Gracias a CANAPAVI, nuestra música no se perderá. Ahora mis nietos saben de dónde vienen y cantan con orgullo los alabaos de sus bisabuelas.",
    img: "photo-1573497019940-1c28c88b4f3e",
  },
  {
    name: "Prof. Carlos Quiñones",
    role: "Docente etnoeducador, Tumaco",
    quote:
      "El programa de etnoeducación cambió la manera como enseño. Hoy incluyo la historia y los saberes propios de nuestra comunidad en cada clase.",
    img: "photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Valentina Preciado",
    role: "Lideresa juvenil, 22 años",
    quote:
      "CANAPAVI me enseñó que defender el territorio es también defender mi identidad. Soy mujer, soy joven, soy afrocolombiana y estoy orgullosa.",
    img: "photo-1531746020798-e6953c6e8e04",
  },
];

const allies: { name: string; icon: LucideIcon; type: string }[] = [
  { name: "ONU Mujeres", icon: Globe2, type: "Internacional" },
  { name: "ACNUR", icon: Building2, type: "Internacional" },
  { name: "PNUD Colombia", icon: Network, type: "Internacional" },
  { name: "MinCultura", icon: Landmark, type: "Nacional" },
  { name: "Gobernación de Nariño", icon: Mountain, type: "Territorial" },
  { name: "Alcaldía de Tumaco", icon: Building, type: "Municipal" },
  { name: "Universidad de Nariño", icon: GraduationCap, type: "Académico" },
  { name: "WWF Colombia", icon: PawPrint, type: "Ambiental" },
  { name: "Embajada de Alemania", icon: Flag, type: "Internacional" },
  { name: "Secretaría de Educación", icon: BookOpen, type: "Educativo" },
  { name: "Banco Interamericano", icon: Briefcase, type: "Financiero" },
  { name: "IIAP", icon: Microscope, type: "Investigación" },
];

const teamMembers: { name: string; role: string; icon: LucideIcon; gradient: string }[] = [
  { name: "Rosa Elvira Grueso", role: "Directora Ejecutiva", icon: UserCog, gradient: "from-green-700 to-emerald-500" },
  { name: "Jorge Luis Montaño", role: "Coordinador de Programas", icon: ClipboardList, gradient: "from-blue-800 to-blue-500" },
  { name: "Amalia Torres", role: "Directora de Proyectos", icon: Briefcase, gradient: "from-orange-600 to-amber-400" },
  { name: "Ernesto Valencia", role: "Coordinador de Comunicaciones", icon: Megaphone, gradient: "from-purple-700 to-violet-500" },
  { name: "Milagros Caicedo", role: "Lideresa de Mujeres", icon: HeartHandshake, gradient: "from-red-600 to-orange-400" },
  { name: "Héctor Perlaza", role: "Asesor Jurídico", icon: Scale, gradient: "from-teal-700 to-cyan-500" },
];

const library = [
  {
    id: 1,
    title: "Informe Anual CANAPAVI 2024",
    type: "Informe",
    year: "2024",
    pages: 48,
    icon: <FileText className="w-5 h-5" />,
    color: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    title: "Voces del Manglar — Álbum Digital",
    type: "Publicación",
    year: "2025",
    pages: 24,
    icon: <Music className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 3,
    title: "Cartilla de Etnoeducación Afropacífica",
    type: "Material educativo",
    year: "2023",
    pages: 64,
    icon: <BookOpen className="w-5 h-5" />,
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: 4,
    title: "Guía de Derechos de Comunidades Negras",
    type: "Investigación",
    year: "2022",
    pages: 36,
    icon: <Shield className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 5,
    title: "Mapa del Patrimonio Cultural del Pacífico Sur",
    type: "Investigación",
    year: "2023",
    pages: 80,
    icon: <Globe className="w-5 h-5" />,
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: 6,
    title: "Manual de Liderazgo Comunitario",
    type: "Material educativo",
    year: "2024",
    pages: 52,
    icon: <Lightbulb className="w-5 h-5" />,
    color: "bg-orange-100 text-orange-700",
  },
];

const galleryItems = [
  { id: 1, img: "photo-1493225457124-a3eb161ffa5f", cat: "Música", title: "Festival Tejidos Sonoros" },
  { id: 2, img: "photo-1573497019940-1c28c88b4f3e", cat: "Mujeres", title: "Escuela de Líderes" },
  { id: 3, img: "photo-1529156069898-49953e39b3ac", cat: "Comunidad", title: "Asamblea comunitaria" },
  { id: 4, img: "photo-1518020382113-a7e8fc38eac9", cat: "Naturaleza", title: "Manglares de Tumaco" },
  { id: 5, img: "photo-1503454537195-1dcabb73ffb9", cat: "Educación", title: "Clase de etnoeducación" },
  { id: 6, img: "photo-1558618666-fcd25c85cd64", cat: "Arte", title: "Taller de artesanías" },
  { id: 7, img: "photo-1512813195386-6cf811ad3542", cat: "Música", title: "Marimba del Pacífico" },
  { id: 8, img: "photo-1506794778202-cad84cf45f1d", cat: "Comunidad", title: "Encuentro de líderes" },
  { id: 9, img: "photo-1531746020798-e6953c6e8e04", cat: "Mujeres", title: "Foro de mujeres" },
];

const donationLevels: {
  label: string;
  amount: string;
  period: string;
  icon: LucideIcon;
  color: string;
  btnColor: string;
  perks: string[];
  featured: boolean;
}[] = [
  {
    label: "Semilla",
    amount: "$20.000 COP",
    period: "/ mes",
    icon: Sprout,
    color: "border-green-200 bg-green-50",
    btnColor: "bg-green-700 hover:bg-green-600",
    perks: ["Boletín mensual", "Certificado de donante", "Acceso a biblioteca digital"],
    featured: false,
  },
  {
    label: "Raíz",
    amount: "$50.000 COP",
    period: "/ mes",
    icon: Leaf,
    color: "border-orange-400 bg-orange-50",
    btnColor: "bg-orange-500 hover:bg-orange-400",
    perks: ["Todo lo de Semilla", "Invitación a eventos", "Mención en informes", "Placa de reconocimiento"],
    featured: true,
  },
  {
    label: "Manglar",
    amount: "$150.000 COP",
    period: "/ mes",
    icon: TreePine,
    color: "border-blue-200 bg-blue-50",
    btnColor: "bg-blue-800 hover:bg-blue-700",
    perks: ["Todo lo de Raíz", "Visita a proyectos", "Reunión con el equipo", "Logo en materiales"],
    featured: false,
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function unsplash(id: string, w = 600, h = 400) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[#E64A19] text-xs font-bold uppercase tracking-[0.15em] mb-3">
      {children}
    </div>
  );
}

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className={`font-display text-3xl sm:text-4xl font-bold leading-tight mb-4 ${
        light ? "text-white" : "text-green-950"
      }`}
    >
      {children}
    </h2>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!openDropdown) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-nav-dropdown]")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openDropdown]);

  const go = (id: string) => {
    setPage(id);
    setOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActive = (link: NavLink) => {
    if (page === link.id) return true;
    if (link.submenu) return link.submenu.some((s) => s.id === page);
    return false;
  };

  return (
    <>
      <div className="h-1.5 w-full bg-gradient-to-r from-green-700 via-yellow-400 via-orange-500 to-blue-700" />
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/96 backdrop-blur-md shadow-md shadow-green-900/10" : "bg-white"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => go("inicio")} className="flex items-center gap-3 shrink-0">
              <img src={logoImg} alt="Logo CANAPAVI" className="h-14 w-auto" />
              <div className="hidden sm:block leading-tight">
                <div className="text-sm font-black text-green-900 tracking-wide">CANAPAVI</div>
                <div className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">
                  Cultura · Identidad · Territorio
                </div>
              </div>
            </button>

            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) =>
                link.submenu ? (
                  <div
                    key={link.id}
                    className="relative"
                    data-nav-dropdown
                    onMouseEnter={() => setOpenDropdown(link.id)}
                    onMouseLeave={() => setOpenDropdown((cur) => (cur === link.id ? null : cur))}
                  >
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.id ? null : link.id)
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1 ${
                        isActive(link)
                          ? "bg-green-800 text-white"
                          : "text-gray-600 hover:bg-green-50 hover:text-green-900"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          openDropdown === link.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === link.id && (
                      <div className="absolute top-full left-0 pt-2 z-50">
                        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[280px]">
                          <div className="absolute -top-1.5 left-5 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                          {link.submenu.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => go(item.id)}
                              className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                                page === item.id
                                  ? "bg-green-50"
                                  : "hover:bg-green-50"
                              }`}
                            >
                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                  page === item.id
                                    ? "bg-green-700 text-white"
                                    : "bg-green-50 text-green-700"
                                }`}
                              >
                                <item.icon className="w-4 h-4" strokeWidth={1.8} />
                              </div>
                              <div>
                                <div
                                  className={`text-sm font-semibold ${
                                    page === item.id ? "text-green-900" : "text-gray-800"
                                  }`}
                                >
                                  {item.label}
                                </div>
                                <div className="text-xs text-gray-400 mt-0.5 leading-snug">
                                  {item.desc}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => go(link.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      page === link.id
                        ? "bg-green-800 text-white"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-900"
                    }`}
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => go("donaciones")}
                className="hidden sm:flex items-center gap-1.5 bg-[#E64A19] hover:bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Heart className="w-3.5 h-3.5" /> Donar
              </button>
              <button
                className="xl:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setOpen(!open)}
                aria-label="Menú"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="xl:hidden border-t border-gray-100 bg-white pb-4">
            <div className="max-w-[1400px] mx-auto px-4 pt-3 space-y-1">
              {navLinks.map((link) =>
                link.submenu ? (
                  <details
                    key={link.id}
                    className="group rounded-xl overflow-hidden"
                    open={isActive(link)}
                  >
                    <summary
                      className={`px-3 py-2.5 rounded-xl text-sm font-semibold cursor-pointer flex items-center justify-between transition-colors ${
                        isActive(link)
                          ? "bg-green-50 text-green-900"
                          : "text-gray-700 hover:bg-green-50"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="mt-1 ml-3 pl-3 space-y-1 border-l-2 border-green-100">
                      {link.submenu.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => go(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                            page === item.id
                              ? "bg-green-100 text-green-900 font-semibold"
                              : "text-gray-600 hover:bg-green-50"
                          }`}
                        >
                          <item.icon
                            className={`w-4 h-4 shrink-0 ${
                              page === item.id ? "text-green-700" : "text-gray-400"
                            }`}
                            strokeWidth={1.8}
                          />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </details>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => go(link.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      page === link.id
                        ? "bg-green-800 text-white"
                        : "text-gray-700 hover:bg-green-50"
                    }`}
                  >
                    {link.label}
                  </button>
                )
              )}
              <button
                onClick={() => go("donaciones")}
                className="w-full mt-3 flex items-center justify-center gap-2 bg-[#E64A19] hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors"
              >
                <Heart className="w-4 h-4" /> Donar ahora
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: string) => void }) {
  const go = (id: string) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-green-950 text-white">
      <div className="h-1 bg-gradient-to-r from-green-700 via-amber-400 via-orange-500 to-blue-700" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <img src={logoImg} alt="CANAPAVI" className="h-16 w-auto mb-5 brightness-0 invert opacity-90" />
            <p className="text-green-300 text-sm leading-relaxed mb-5">
              Fundación Cultura Nariñense para el Rescate de los Valores e Identidad. Tumaco, Nariño, Colombia.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-green-800 hover:bg-orange-500 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-green-400 mb-5">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => go(link.id)}
                    className="text-green-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-green-400 mb-5">
              Más páginas
            </h4>
            <ul className="space-y-2.5">
              {navLinks.slice(6).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => go(link.id)}
                    className="text-green-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-green-400 mb-5">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-green-300">
                <MapPin className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                Av. La Playa con Calle Páez 3-42, Tumaco, Nariño
              </li>
              <li className="flex gap-3 text-sm text-green-300">
                <Phone className="w-4 h-4 text-green-500 shrink-0" />
                316 415 7472
              </li>
              <li className="flex gap-3 text-sm text-green-300">
                <Mail className="w-4 h-4 text-green-500 shrink-0" />
                info@canapavi.org.co
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="text-xs text-green-400 font-semibold mb-2">Boletín de noticias</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  className="flex-1 bg-green-900 border border-green-700 rounded-lg px-3 py-2 text-xs text-white placeholder-green-600 focus:outline-none focus:border-green-500"
                />
                <button className="bg-[#E64A19] hover:bg-orange-500 text-white px-3 py-2 rounded-lg transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-green-500 text-xs">
            © 2026 CANAPAVI – Fundación Cultura Nariñense. Todos los derechos reservados.
          </p>
          <p className="text-green-600 text-xs flex items-center justify-center sm:justify-end gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Hecho con amor en Tumaco, Nariño, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: string) => void }) {
  const go = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center bg-green-950 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url("${unsplash("photo-1559827260-dc66d52bef19", 1600, 900)}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/95 via-green-900/80 to-teal-950/90" />

        {/* Decorative orbs inspired by logo */}
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-green-600/20 to-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-20 right-[20%] w-48 h-48 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-400/10 blur-3xl" />
        <div className="absolute top-40 left-[5%] w-40 h-40 rounded-full bg-gradient-to-br from-blue-700/20 to-cyan-500/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-400/25 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-orange-300 text-xs font-semibold tracking-wide">
                Tumaco, Nariño, Colombia
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
              Cultura,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Identidad
              </span>{" "}
              y Territorio para las Nuevas Generaciones
            </h1>
            <p className="text-green-200 text-lg leading-relaxed mb-10 max-w-lg">
              CANAPAVI defiende el patrimonio cultural, los derechos humanos y la identidad
              afrocolombiana del Pacífico sur, con el liderazgo de las mujeres y las comunidades.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => go("nosotros")}
                className="bg-white text-green-900 hover:bg-green-50 px-7 py-3.5 rounded-full font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Conoce más
              </button>
              <button
                onClick={() => go("donaciones")}
                className="bg-[#E64A19] hover:bg-orange-500 text-white px-7 py-3.5 rounded-full font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Heart className="w-4 h-4" /> Apoya nuestra causa
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden h-[460px] bg-green-800 shadow-2xl">
                <img
                  src={heroPhoto}
                  alt="Cantadoras del Pacífico sur — Comunidad CANAPAVI"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/60 via-green-950/10 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-amber-500 rounded-2xl p-5 shadow-xl">
                <div className="text-white font-display font-bold text-3xl">+20</div>
                <div className="text-amber-100 text-xs font-medium">años de trabajo</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-green-700 rounded-2xl p-4 shadow-xl">
                <div className="text-white font-display font-bold text-2xl">+800</div>
                <div className="text-green-200 text-xs font-medium">mujeres participantes</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-green-400 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {stats.map((s, i) => (
              <div
                key={i}
                className="text-center py-8 px-4 rounded-2xl bg-gradient-to-b from-green-50 to-white border border-green-100 hover:border-green-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-green-100 text-green-700 mb-3 shadow-sm">
                  <s.icon className="w-6 h-6" strokeWidth={1.8} />
                </div>
                <div className="font-display text-4xl font-bold text-green-800 leading-none mb-1">
                  {s.value}
                </div>
                <div className="text-xs text-gray-500 mt-2 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>Nuestros Programas</SectionLabel>
            <SectionHeading>Trabajamos por el Pacífico</SectionHeading>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Nueve líneas de acción que articulan cultura, derechos humanos y desarrollo comunitario
              en el Pacífico sur colombiano.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.slice(0, 6).map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${prog.gradient} text-white mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <prog.icon className="w-7 h-7" strokeWidth={1.8} />
                </div>
                <h3 className="font-display font-bold text-green-950 text-xl mb-2">{prog.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{prog.description}</p>
                <div className="inline-block text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 rounded-full px-3 py-1">
                  {prog.results}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => go("programas")}
              className="border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white px-8 py-3.5 rounded-full font-bold transition-all duration-200"
            >
              Ver todos los programas
            </button>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <SectionLabel>Proyectos</SectionLabel>
              <SectionHeading>Nuestros Proyectos</SectionHeading>
            </div>
            <button
              onClick={() => go("proyectos")}
              className="hidden sm:flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold text-sm transition-colors"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div className="h-52 bg-green-100 overflow-hidden">
                  <img
                    src={unsplash(proj.img, 500, 300)}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${proj.statusColor}`}>
                      {proj.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{proj.year}</span>
                    <span className="ml-auto text-xs text-gray-400">{proj.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-green-950 text-lg mb-2">{proj.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{proj.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>{proj.beneficiaries} personas beneficiadas</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-24 bg-green-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                Agenda 2025
              </div>
              <SectionHeading light>Próximos Eventos</SectionHeading>
            </div>
            <button
              onClick={() => go("eventos")}
              className="hidden sm:flex items-center gap-2 text-green-400 hover:text-white font-semibold text-sm transition-colors"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-green-900/60 border border-green-800 rounded-2xl overflow-hidden hover:bg-green-800/70 transition-all duration-200 group"
              >
                <div className="h-40 bg-green-800 overflow-hidden">
                  <img
                    src={unsplash(ev.img, 400, 200)}
                    alt={ev.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="text-amber-400 text-xs font-bold uppercase tracking-wide mb-1">
                    {ev.category}
                  </div>
                  <h3 className="font-bold text-white text-sm mb-3 leading-snug">{ev.title}</h3>
                  <div className="flex items-center gap-1.5 text-green-300 text-xs mb-1.5">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    {ev.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-green-300 text-xs">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {ev.location}
                  </div>
                  {ev.free && (
                    <div className="mt-3 text-xs font-bold text-amber-400 bg-amber-400/10 rounded-full px-2.5 py-1 inline-block">
                      Entrada libre
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-24 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <SectionLabel>Noticias</SectionLabel>
              <SectionHeading>Últimas Noticias</SectionHeading>
            </div>
            <button
              onClick={() => go("noticias")}
              className="hidden sm:flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold text-sm transition-colors"
            >
              Ver todas <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div className="h-44 bg-green-100 overflow-hidden">
                  <img
                    src={unsplash(item.img, 400, 220)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-[#E64A19]">{item.category}</span>
                  <h3 className="font-bold text-green-950 text-sm mt-1.5 mb-2 leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{item.excerpt}</p>
                  <div className="text-xs text-gray-400 mt-4 font-medium">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>Voces de la Comunidad</SectionLabel>
            <SectionHeading>Lo que dice nuestra gente</SectionHeading>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-green-50 border border-green-100 rounded-3xl p-8 hover:shadow-md transition-all duration-200"
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed mb-7 text-[15px]">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-green-200 overflow-hidden shrink-0">
                    <img
                      src={unsplash(t.img, 80, 80)}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-green-950 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Allies strip */}
      <section className="py-16 bg-[#FDFAF4] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionLabel>Aliados Institucionales</SectionLabel>
            <SectionHeading>Trabajamos en Red</SectionHeading>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {allies.slice(0, 12).map((a, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                  <a.icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="text-xs font-bold text-gray-700 text-center leading-tight">{a.name}</div>
                <div className="text-[10px] text-gray-400">{a.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="relative bg-green-950 text-white overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Content - first on mobile, right on desktop */}
          <div className="order-1 lg:order-2 px-6 sm:px-12 lg:pl-16 lg:pr-20 py-16 lg:py-24 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 self-start border border-amber-400/30 rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-amber-300 text-xs font-bold tracking-widest uppercase">
                Sé parte del cambio
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5 leading-[1.1]">
              Tu apoyo <span className="italic text-amber-300 font-normal">transforma vidas</span>{" "}
              en el Pacífico
            </h2>
            <p className="text-green-200 text-lg leading-relaxed mb-9 max-w-xl">
              Con tu donación ayudas a preservar el patrimonio cultural, defender los derechos de las
              comunidades negras y empoderar a las mujeres del Pacífico colombiano.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => go("donaciones")}
                className="bg-amber-500 hover:bg-amber-400 text-green-950 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-amber-500/20 hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Heart className="w-5 h-5 fill-green-950" />
                Donar ahora
              </button>
              <button
                onClick={() => go("voluntariado")}
                className="border-2 border-white/25 text-white hover:bg-white/10 hover:border-white/40 px-8 py-4 rounded-full font-bold text-lg transition-all"
              >
                Ser voluntario
              </button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-green-300 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" strokeWidth={2} />
                <span>Donación segura</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" strokeWidth={2} />
                <span>Deducible de impuestos</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" strokeWidth={2} />
                <span>Informes auditados</span>
              </div>
            </div>
          </div>

          {/* Image - second on mobile, left on desktop */}
          <div className="order-2 lg:order-1 relative h-80 sm:h-[420px] lg:h-auto lg:min-h-[640px] bg-green-800">
            <img
              src={donationImg}
              alt="Comunidad CANAPAVI — Diversidad, liderazgo y resistencias"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 lg:bg-gradient-to-r lg:from-transparent lg:via-green-950/30 lg:to-green-950/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 via-green-950/10 to-transparent lg:hidden" />
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── NOSOTROS ─────────────────────────────────────────────────────────────────

function NosotrosPage() {
  const timeline = [
    { year: "2001", text: "Fundación de CANAPAVI por líderes culturales de Tumaco." },
    { year: "2005", text: "Primer festival de música tradicional del Pacífico sur." },
    { year: "2010", text: "Inicio del programa de Etnoeducación en alianza con el MEN." },
    { year: "2015", text: "Reconocimiento nacional como organización de base comunitaria destacada." },
    { year: "2018", text: "Alianza con ONU Mujeres para el programa de mujeres defensoras." },
    { year: "2021", text: "Proyecto Tejidos Sonoros: digitalización del patrimonio musical afrocolombiano." },
    { year: "2024", text: "Lanzamiento de la Biblioteca Digital Cultural del Pacífico Sur." },
  ];

  const values: { title: string; icon: LucideIcon; desc: string; color: string }[] = [
    { title: "Identidad", icon: Waves, desc: "Reafirmamos con orgullo la herencia y cultura afrocolombiana.", color: "text-cyan-700" },
    { title: "Comunidad", icon: Handshake, desc: "Actuamos desde y para las comunidades del Pacífico.", color: "text-green-700" },
    { title: "Equidad", icon: Scale, desc: "Defendemos los derechos de todas las personas sin distinción.", color: "text-blue-700" },
    { title: "Territorio", icon: Leaf, desc: "El territorio es vida, historia y futuro de nuestros pueblos.", color: "text-emerald-700" },
    { title: "Solidaridad", icon: HeartHandshake, desc: "Construimos juntos tejidos de apoyo y resistencia.", color: "text-red-700" },
    { title: "Innovación", icon: Lightbulb, desc: "Combinamos lo ancestral con lo contemporáneo para generar cambio.", color: "text-amber-600" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-green-950 text-white py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url("${unsplash("photo-1529156069898-49953e39b3ac", 1200, 600)}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 to-teal-950/70" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <SectionLabel>Quiénes somos</SectionLabel>
          <h1 className="font-display text-5xl font-bold mb-6">Nuestra Historia</h1>
          <p className="text-green-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Somos una organización sin ánimo de lucro nacida del corazón de las comunidades negras
            de Tumaco, con más de 20 años defendiendo la cultura, los derechos y el territorio del
            Pacífico sur colombiano.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="bg-green-50 border border-green-100 rounded-3xl p-10">
            <div className="w-14 h-14 rounded-2xl bg-white border border-green-100 text-green-700 flex items-center justify-center mb-4 shadow-sm">
              <Target className="w-7 h-7" strokeWidth={1.8} />
            </div>
            <h2 className="font-display text-2xl font-bold text-green-950 mb-4">Misión</h2>
            <p className="text-gray-600 leading-relaxed">
              Proteger, preservar, fortalecer y promover la identidad cultural, los conocimientos
              ancestrales, el patrimonio inmaterial y la memoria colectiva del Pacífico sur
              colombiano, especialmente de las comunidades afrocolombianas, a través de la educación,
              la cultura, el arte, la defensa territorial, la participación comunitaria y el liderazgo
              de las mujeres.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-10">
            <div className="w-14 h-14 rounded-2xl bg-white border border-blue-100 text-blue-700 flex items-center justify-center mb-4 shadow-sm">
              <Sparkles className="w-7 h-7" strokeWidth={1.8} />
            </div>
            <h2 className="font-display text-2xl font-bold text-green-950 mb-4">Visión</h2>
            <p className="text-gray-600 leading-relaxed">
              Ser un referente nacional e internacional en la preservación del patrimonio cultural
              afropacífico, fortaleciendo comunidades a través de la innovación social, la educación,
              el artivismo, los derechos humanos y el desarrollo territorial sostenible.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>Valores institucionales</SectionLabel>
            <SectionHeading>Lo que nos guía</SectionHeading>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 ${v.color}`}>
                  <v.icon className="w-6 h-6" strokeWidth={1.8} />
                </div>
                <h3 className="font-display font-bold text-green-950 text-xl mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>Historia</SectionLabel>
            <SectionHeading>Nuestra Trayectoria</SectionHeading>
          </div>
          <div className="relative">
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-green-100" />
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`relative flex items-start gap-6 mb-10 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="absolute left-6 sm:left-1/2 w-4 h-4 rounded-full bg-green-700 border-4 border-green-100 -translate-x-1/2 mt-1" />
                <div className={`sm:w-5/12 ${i % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10"} pl-14 sm:pl-0`}>
                  <div className="font-display font-bold text-2xl text-[#E64A19] mb-1">{item.year}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </div>
                <div className="hidden sm:block sm:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>Equipo</SectionLabel>
            <SectionHeading>Nuestro Equipo</SectionHeading>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm text-center hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${m.gradient} text-white mx-auto mb-4 flex items-center justify-center shadow-md`}
                >
                  <m.icon className="w-10 h-10" strokeWidth={1.8} />
                </div>
                <h3 className="font-display font-bold text-green-950 text-lg mb-1">{m.name}</h3>
                <div className="text-sm text-[#E64A19] font-semibold">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PROGRAMAS ───────────────────────────────────────────────────────────────

function ProgramasPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      <section className="bg-green-950 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950 to-teal-950 opacity-90" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <SectionLabel>Líneas de acción</SectionLabel>
          <h1 className="font-display text-5xl font-bold mb-5">Programas</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Nueve programas estratégicos para la defensa cultural, los derechos humanos y el
            desarrollo territorial del Pacífico sur colombiano.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                onClick={() => setSelected(selected === prog.id ? null : prog.id)}
              >
                <div className={`h-3 bg-gradient-to-r ${prog.gradient}`} />
                <div className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${prog.gradient} text-white shadow-md`}
                    >
                      <prog.icon className="w-7 h-7" strokeWidth={1.8} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                      {prog.category}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-green-950 text-xl mb-2">{prog.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{prog.description}</p>

                  {selected === prog.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="font-bold text-green-900 text-xs uppercase tracking-wide mb-3">
                        Objetivos
                      </h4>
                      <ul className="space-y-2 mb-5">
                        {prog.objectives.map((obj, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-[#E64A19] bg-orange-50 border border-orange-100 rounded-full px-3 py-1">
                      {prog.results}
                    </div>
                    <span className="text-xs text-green-700 font-semibold">
                      {selected === prog.id ? "▲ Menos" : "▼ Más info"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PROYECTOS ────────────────────────────────────────────────────────────────

function ProyectosPage() {
  const [filter, setFilter] = useState("Todos");
  const filters = ["Todos", "En curso", "Finalizado", "Próximo"];
  const filtered =
    filter === "Todos" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div>
      <section className="bg-green-950 py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionLabel>Impacto real</SectionLabel>
          <h1 className="font-display text-5xl font-bold mb-5">Proyectos</h1>
          <p className="text-green-200 text-lg max-w-xl mx-auto">
            Conoce los proyectos que hemos ejecutado para transformar realidades en el Pacífico
            colombiano.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === f
                    ? "bg-green-800 text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
                }`}
              >
                {f}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
              <Filter className="w-4 h-4" /> {filtered.length} proyectos
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div className="h-52 bg-green-100 overflow-hidden">
                  <img
                    src={unsplash(proj.img, 500, 300)}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${proj.statusColor}`}>
                      {proj.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{proj.year}</span>
                    <span className="ml-auto text-xs font-bold text-gray-400 uppercase">{proj.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-green-950 text-xl mb-2">{proj.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{proj.description}</p>
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Users className="w-3.5 h-3.5 text-green-600" />
                      <span>
                        <b>{proj.beneficiaries}</b> personas beneficiadas
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.partners.map((p, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold bg-green-50 text-green-700 border border-green-100 rounded-full px-2 py-0.5"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── NOTICIAS ─────────────────────────────────────────────────────────────────

function NoticiasPage() {
  const cats = ["Todas", "Cultura", "Derechos Humanos", "Educación", "Eventos", "Patrimonio", "Informe"];
  const [cat, setCat] = useState("Todas");
  const filtered = cat === "Todas" ? news : news.filter((n) => n.category === cat);

  return (
    <div>
      <section className="bg-green-950 py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionLabel>Actualidad</SectionLabel>
          <h1 className="font-display text-5xl font-bold mb-5">Noticias</h1>
          <p className="text-green-200 text-lg">
            Mantente informado sobre nuestra labor, eventos y publicaciones.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search + Filter */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar noticias..."
                className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    cat === c
                      ? "bg-green-800 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Featured */}
          {cat === "Todas" && (
            <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm mb-12 grid md:grid-cols-2">
              <div className="h-64 md:h-auto bg-green-100 overflow-hidden">
                <img
                  src={unsplash(news[0].img, 600, 400)}
                  alt={news[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <span className="text-xs font-bold text-[#E64A19] mb-2 uppercase tracking-wide">
                  {news[0].category} — Destacada
                </span>
                <h2 className="font-display text-2xl font-bold text-green-950 mb-3">{news[0].title}</h2>
                <p className="text-gray-500 leading-relaxed mb-5">{news[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{news[0].date}</span>
                  <button className="flex items-center gap-1.5 text-sm font-bold text-green-700 hover:text-green-900 transition-colors">
                    Leer más <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div className="h-44 bg-green-100 overflow-hidden">
                  <img
                    src={unsplash(item.img, 400, 220)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-[#E64A19]">{item.category}</span>
                  <h3 className="font-display font-bold text-green-950 text-lg mt-2 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{item.excerpt}</p>
                  <div className="flex items-center justify-between mt-5">
                    <span className="text-xs text-gray-400">{item.date}</span>
                    <button className="text-xs font-bold text-green-700 hover:text-green-900 flex items-center gap-1">
                      Leer más <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-16 bg-green-800 rounded-3xl p-10 text-white text-center">
            <h3 className="font-display text-2xl font-bold mb-2">
              Suscríbete a nuestro boletín
            </h3>
            <p className="text-green-200 mb-6">
              Recibe cada mes noticias, eventos y publicaciones directamente en tu correo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@correo.com"
                className="flex-1 bg-green-900 border border-green-600 rounded-full px-5 py-3 text-sm text-white placeholder-green-500 focus:outline-none focus:border-green-400"
              />
              <button className="bg-[#E64A19] hover:bg-orange-500 text-white px-7 py-3 rounded-full font-bold text-sm transition-colors whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── GALERÍA ──────────────────────────────────────────────────────────────────

function GaleriaPage() {
  const cats = ["Todas", "Música", "Mujeres", "Comunidad", "Naturaleza", "Educación", "Arte"];
  const [cat, setCat] = useState("Todas");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = cat === "Todas" ? galleryItems : galleryItems.filter((g) => g.cat === cat);

  return (
    <div>
      <section className="bg-green-950 py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionLabel>Memorias visuales</SectionLabel>
          <h1 className="font-display text-5xl font-bold mb-5">Galería</h1>
          <p className="text-green-200 text-lg">
            Imágenes que narran la riqueza cultural y el trabajo comunitario de CANAPAVI.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-10">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  cat === c
                    ? "bg-green-800 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-green-100 ${
                  i % 7 === 0 ? "col-span-2 row-span-2" : ""
                }`}
                style={{ aspectRatio: i % 7 === 0 ? "1" : "4/3" }}
                onClick={() => setLightbox(item.id)}
              >
                <img
                  src={unsplash(item.img, i % 7 === 0 ? 600 : 400, i % 7 === 0 ? 600 : 300)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                  <div>
                    <div className="text-amber-400 text-[10px] font-bold uppercase">{item.cat}</div>
                    <div className="text-white text-sm font-bold">{item.title}</div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {galleryItems.filter((g) => g.id === lightbox).map((item) => (
            <div key={item.id} className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={unsplash(item.img, 900, 600)}
                alt={item.title}
                className="w-full rounded-2xl"
              />
              <div className="text-center mt-4">
                <div className="text-amber-400 text-xs font-bold uppercase mb-1">{item.cat}</div>
                <div className="text-white font-bold">{item.title}</div>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-6 right-6 text-white bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── BIBLIOTECA ───────────────────────────────────────────────────────────────

function BibliotecaPage() {
  const types = ["Todos", "Informe", "Publicación", "Material educativo", "Investigación"];
  const [type, setType] = useState("Todos");
  const filtered = type === "Todos" ? library : library.filter((l) => l.type === type);

  return (
    <div>
      <section className="bg-green-950 py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionLabel>Recursos digitales</SectionLabel>
          <h1 className="font-display text-5xl font-bold mb-5">Biblioteca Digital</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Accede gratuitamente a publicaciones, investigaciones, informes y materiales educativos
            sobre la cultura y los derechos del Pacífico afrocolombiano.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#FDFAF4]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-10">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  type === t
                    ? "bg-green-800 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md flex items-center gap-5 transition-all duration-200 group"
              >
                <div className={`w-12 h-12 rounded-xl ${doc.color} flex items-center justify-center shrink-0`}>
                  {doc.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400 uppercase">{doc.type}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-400">{doc.year}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-400">{doc.pages} págs.</span>
                  </div>
                  <h3 className="font-display font-bold text-green-950 text-lg">{doc.title}</h3>
                </div>
                <button className="shrink-0 flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold transition-colors opacity-0 group-hover:opacity-100">
                  <Download className="w-3.5 h-3.5" /> Descargar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── EVENTOS ──────────────────────────────────────────────────────────────────

function EventosPage() {
  return (
    <div>
      <section className="bg-green-950 py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionLabel>Agenda cultural</SectionLabel>
          <h1 className="font-display text-5xl font-bold mb-5">Eventos 2025</h1>
          <p className="text-green-200 text-lg">
            Participa en festivales, talleres, foros y espacios comunitarios organizados por CANAPAVI.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#FDFAF4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-7">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 grid sm:grid-cols-2"
              >
                <div className="h-48 sm:h-auto bg-green-100 overflow-hidden">
                  <img
                    src={unsplash(ev.img, 400, 300)}
                    alt={ev.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-7 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#E64A19] uppercase tracking-wide">
                      {ev.category}
                    </span>
                    <h3 className="font-display font-bold text-green-950 text-xl mt-2 mb-3">
                      {ev.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{ev.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-green-600" />
                        {ev.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-green-600" />
                        {ev.location}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    {ev.free && (
                      <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-100 rounded-full px-3 py-1">
                        Entrada libre
                      </span>
                    )}
                    <button className="ml-auto flex items-center gap-1.5 bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-colors">
                      Inscribirse <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ALIADOS ──────────────────────────────────────────────────────────────────

function AliadosPage() {
  const types = ["Todos", "Internacional", "Nacional", "Territorial", "Académico", "Ambiental"];
  const [type, setType] = useState("Todos");
  const filtered = type === "Todos" ? allies : allies.filter((a) => a.type === type);

  return (
    <div>
      <section className="bg-green-950 py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionLabel>Trabajo en red</SectionLabel>
          <h1 className="font-display text-5xl font-bold mb-5">Aliados Institucionales</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Trabajamos con organizaciones nacionales e internacionales que comparten nuestro
            compromiso con los derechos, la cultura y el territorio.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#FDFAF4]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-12">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  type === t
                    ? "bg-green-800 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md flex items-center gap-5 transition-all duration-200 hover:border-green-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
                  <a.icon className="w-7 h-7" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-bold text-green-950 text-base">{a.name}</h3>
                  <span className="text-xs font-semibold text-[#E64A19] bg-orange-50 rounded-full px-2.5 py-0.5 mt-1 inline-block">
                    {a.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-green-800 rounded-3xl p-10 text-white text-center">
            <h3 className="font-display text-2xl font-bold mb-3">¿Tu organización quiere aliarse?</h3>
            <p className="text-green-200 mb-6 max-w-xl mx-auto">
              Buscamos organizaciones comprometidas con los derechos humanos, la cultura y el
              territorio del Pacífico colombiano.
            </p>
            <button className="bg-[#E64A19] hover:bg-orange-500 text-white px-8 py-3 rounded-full font-bold transition-colors">
              Contáctanos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── VOLUNTARIADO ─────────────────────────────────────────────────────────────

function VoluntariadoPage() {
  const opportunities: {
    title: string;
    icon: LucideIcon;
    area: string;
    commitment: string;
    modality: string;
    desc: string;
    color: string;
  }[] = [
    {
      title: "Voluntariado en comunicaciones",
      icon: Megaphone,
      area: "Comunicaciones",
      commitment: "10 h/semana",
      modality: "Remoto",
      desc: "Apoya la gestión de redes sociales, redacción de contenidos y diseño de materiales de comunicación.",
      color: "text-purple-700 bg-purple-50 border-purple-100",
    },
    {
      title: "Apoyo jurídico y DDHH",
      icon: Scale,
      area: "Derechos Humanos",
      commitment: "8 h/semana",
      modality: "Híbrido",
      desc: "Acompaña procesos de documentación de violaciones, talleres jurídicos y asesoría comunitaria.",
      color: "text-blue-700 bg-blue-50 border-blue-100",
    },
    {
      title: "Docencia en etnoeducación",
      icon: GraduationCap,
      area: "Educación",
      commitment: "12 h/semana",
      modality: "Presencial Tumaco",
      desc: "Apoya el desarrollo de materiales educativos con enfoque afrocolombiano en escuelas comunitarias.",
      color: "text-teal-700 bg-teal-50 border-teal-100",
    },
    {
      title: "Arte y cultura comunitaria",
      icon: Palette,
      area: "Arte",
      commitment: "6 h/semana",
      modality: "Presencial",
      desc: "Facilita talleres de arte, fotografía, música y expresión cultural en comunidades del Pacífico.",
      color: "text-rose-700 bg-rose-50 border-rose-100",
    },
  ];

  return (
    <div>
      <section className="bg-green-950 py-20 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url("${unsplash("photo-1529156069898-49953e39b3ac", 1200, 600)}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 to-teal-950/80" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <SectionLabel>Únete a nosotros</SectionLabel>
          <h1 className="font-display text-5xl font-bold mb-5">Voluntariado</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Aporta tus talentos y habilidades a la defensa de la cultura y los derechos del Pacífico
            afrocolombiano.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>¿Por qué ser voluntario?</SectionLabel>
            <SectionHeading>Beneficios del voluntariado</SectionHeading>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Sparkles, title: "Impacto real", desc: "Tu trabajo transforma comunidades reales.", color: "text-amber-600 bg-amber-50 border-amber-100" },
              { icon: Award, title: "Certificado", desc: "Constancia de voluntariado con descripción de funciones.", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
              { icon: GraduationCap, title: "Aprendizaje", desc: "Formación en cultura afrocolombiana y DDHH.", color: "text-blue-700 bg-blue-50 border-blue-100" },
              { icon: Handshake, title: "Red", desc: "Conéctate con activistas, artistas y líderes del Pacífico.", color: "text-rose-700 bg-rose-50 border-rose-100" },
            ].map((b, i) => (
              <div key={i} className="text-center p-7 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md transition-all duration-200">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto mb-4 ${b.color}`}>
                  <b.icon className="w-7 h-7" strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-green-950 mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <SectionLabel>Convocatorias abiertas</SectionLabel>
            <SectionHeading>Oportunidades de voluntariado</SectionHeading>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {opportunities.map((opp, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md p-7 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${opp.color}`}>
                    <opp.icon className="w-7 h-7" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-xs font-bold text-[#E64A19] bg-orange-50 rounded-full px-2.5 py-0.5">
                        {opp.area}
                      </span>
                      <span className="text-xs text-gray-400">{opp.modality}</span>
                      <span className="text-xs text-gray-400">{opp.commitment}</span>
                    </div>
                    <h3 className="font-display font-bold text-green-950 text-lg mb-2">{opp.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{opp.desc}</p>
                    <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-5 py-2 rounded-full text-xs font-bold transition-colors">
                      Aplicar <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div className="bg-green-50 border border-green-100 rounded-3xl p-10">
            <h3 className="font-display text-2xl font-bold text-green-950 mb-2">
              Formulario de postulación
            </h3>
            <p className="text-gray-500 mb-8">
              Completa este formulario y nos comunicaremos contigo en los próximos 5 días hábiles.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {["Nombre completo", "Correo electrónico", "Ciudad", "Teléfono"].map((placeholder, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={placeholder}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
              ))}
              <select className="sm:col-span-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 focus:outline-none focus:border-green-500">
                <option>Área de interés</option>
                <option>Comunicaciones</option>
                <option>Derechos Humanos</option>
                <option>Educación</option>
                <option>Arte y Cultura</option>
              </select>
              <textarea
                placeholder="Cuéntanos sobre ti y tu motivación para ser voluntario..."
                rows={4}
                className="sm:col-span-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 resize-none transition-colors"
              />
              <button className="sm:col-span-2 bg-green-800 hover:bg-green-700 text-white py-3.5 rounded-full font-bold transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Enviar postulación
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── DONACIONES ───────────────────────────────────────────────────────────────

function DonacionesPage() {
  const [donationType, setDonationType] = useState<"mensual" | "unica">("mensual");
  const [customAmount, setCustomAmount] = useState("");

  return (
    <div>
      <section className="bg-gradient-to-br from-[#E64A19] via-orange-500 to-amber-500 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white fill-white" strokeWidth={1.8} />
          </div>
          <h1 className="font-display text-5xl font-bold mb-5">Apoya a CANAPAVI</h1>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto">
            Tu donación preserva culturas, defiende derechos y empodera a las mujeres y comunidades
            del Pacífico sur colombiano.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#FDFAF4]">
        <div className="max-w-6xl mx-auto px-6">
          {/* Impact */}
          <div className="text-center mb-14">
            <SectionLabel>¿Dónde va tu dinero?</SectionLabel>
            <SectionHeading>Tu donación en acción</SectionHeading>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {[
              { icon: Music2, amount: "$20.000", impact: "Materiales para un taller de marimba", color: "text-green-700 bg-green-50 border-green-100" },
              { icon: BookOpen, amount: "$50.000", impact: "Cartillas de etnoeducación para 10 niños", color: "text-teal-700 bg-teal-50 border-teal-100" },
              { icon: Waves, amount: "$100.000", impact: "Siembra de manglar en 100 m² de costa", color: "text-cyan-700 bg-cyan-50 border-cyan-100" },
              { icon: Music, amount: "$200.000", impact: "Grabación de un canto tradicional ancestral", color: "text-purple-700 bg-purple-50 border-purple-100" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition-all duration-200"
              >
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto mb-4 ${item.color}`}>
                  <item.icon className="w-7 h-7" strokeWidth={1.8} />
                </div>
                <div className="font-display font-bold text-2xl text-green-800 mb-2">{item.amount}</div>
                <p className="text-gray-500 text-sm leading-snug">{item.impact}</p>
              </div>
            ))}
          </div>

          {/* Donation form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-800 to-teal-800 p-8 text-white">
                <h3 className="font-display text-2xl font-bold mb-4">Hacer una donación</h3>
                <div className="flex rounded-full bg-white/20 p-1 w-fit">
                  {(["mensual", "unica"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setDonationType(t)}
                      className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                        donationType === t ? "bg-white text-green-900" : "text-white"
                      }`}
                    >
                      {t === "mensual" ? "Mensual" : "Única vez"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                <p className="text-sm text-gray-500 mb-5 font-semibold">
                  Selecciona un monto (COP):
                </p>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {["$20.000", "$50.000", "$100.000", "$200.000", "$500.000", "Otro"].map((amt, i) => (
                    <button
                      key={i}
                      onClick={() => i === 5 && setCustomAmount("")}
                      className={`py-3 rounded-xl font-bold text-sm border-2 transition-all ${
                        i === 1
                          ? "border-[#E64A19] bg-orange-50 text-[#E64A19]"
                          : "border-gray-200 text-gray-700 hover:border-green-400"
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Otro monto (ej: $75.000)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-5 focus:outline-none focus:border-green-500 transition-colors"
                />
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  {["Nombre completo", "Correo electrónico"].map((ph, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={ph}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                    />
                  ))}
                </div>
                <button className="w-full bg-[#E64A19] hover:bg-orange-500 text-white py-4 rounded-full font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-lg">
                  <Heart className="w-5 h-5" />
                  {donationType === "mensual" ? "Donar mensualmente" : "Donar ahora"}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                  Pago seguro · Tu donación es deducible de impuestos · CANAPAVI NIT: 900.xxx.xxx-x
                </p>
              </div>
            </div>
          </div>

          {/* Donation levels */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <SectionLabel>Planes de donación</SectionLabel>
              <SectionHeading>Elige tu nivel de compromiso</SectionHeading>
            </div>
            <div className="grid md:grid-cols-3 gap-7">
              {donationLevels.map((level, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border-2 p-8 relative ${level.color} ${
                    level.featured ? "shadow-xl scale-105" : ""
                  }`}
                >
                  {level.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E64A19] text-white text-xs font-bold px-4 py-1 rounded-full">
                      Más popular
                    </div>
                  )}
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 text-green-800 flex items-center justify-center mb-4 shadow-sm">
                    <level.icon className="w-7 h-7" strokeWidth={1.8} />
                  </div>
                  <div className="font-display font-bold text-2xl text-green-950 mb-1">{level.label}</div>
                  <div className="font-bold text-3xl text-green-800 mb-1">{level.amount}</div>
                  <div className="text-gray-500 text-sm mb-6">{level.period}</div>
                  <ul className="space-y-2.5 mb-8">
                    {level.perks.map((perk, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-green-600 shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full ${level.btnColor} text-white py-3 rounded-full font-bold transition-all`}
                  >
                    Elegir {level.label}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <SectionLabel>Preguntas frecuentes</SectionLabel>
              <SectionHeading>¿Tienes dudas?</SectionHeading>
            </div>
            <div className="max-w-2xl mx-auto space-y-3">
              {[
                {
                  q: "¿Mi donación es deducible de impuestos?",
                  a: "Sí. CANAPAVI es una entidad sin ánimo de lucro reconocida por la DIAN. Expedimos certificado de donación para declaración de renta.",
                },
                {
                  q: "¿Puedo donar desde el exterior?",
                  a: "Sí. Aceptamos donaciones internacionales a través de transferencia bancaria o PayPal. Contáctanos para más información.",
                },
                {
                  q: "¿Cómo sé que mi dinero se usa correctamente?",
                  a: "Publicamos informes financieros anuales auditados. Todos los donantes reciben reporte semestral de impacto.",
                },
              ].map((item, i) => (
                <details
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
                >
                  <summary className="px-6 py-4 font-bold text-green-950 cursor-pointer hover:bg-green-50 transition-colors">
                    {item.q}
                  </summary>
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACTO ─────────────────────────────────────────────────────────────────

function ContactoPage() {
  return (
    <div>
      <section className="bg-green-950 py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionLabel>Escríbenos</SectionLabel>
          <h1 className="font-display text-5xl font-bold mb-5">Contacto</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Estamos en Tumaco, Nariño. Puedes comunicarte con nosotros por cualquiera de estos medios.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#FDFAF4]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <div className="grid sm:grid-cols-2 gap-5 mb-10">
                {[
                  { icon: <MapPin className="w-5 h-5" />, title: "Dirección", lines: ["Av. La Playa con Calle Páez 3-42", "Tumaco, Nariño, Colombia"] },
                  { icon: <Phone className="w-5 h-5" />, title: "Teléfono", lines: ["316 415 7472", "Lun–Vie 8 am – 5 pm"] },
                  { icon: <Mail className="w-5 h-5" />, title: "Correo", lines: ["info@canapavi.org.co", "voluntariado@canapavi.org.co"] },
                  { icon: <Globe className="w-5 h-5" />, title: "Redes sociales", lines: ["@canapavicolombia", "Facebook · Instagram · YouTube"] },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-3">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-green-950 text-sm mb-2">{item.title}</h3>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-gray-500 text-xs">{line}</p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden h-64 bg-green-100 border border-green-200 relative">
                <img
                  src={unsplash("photo-1518020382113-a7e8fc38eac9", 700, 400)}
                  alt="Ubicación Tumaco"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-2xl p-5 shadow-xl text-center">
                    <MapPin className="w-8 h-8 text-[#E64A19] mx-auto mb-2" />
                    <div className="font-bold text-green-950 text-sm">CANAPAVI</div>
                    <div className="text-xs text-gray-400">Tumaco, Nariño</div>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs text-green-700 font-bold"
                    >
                      Ver en Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10">
              <h3 className="font-display text-2xl font-bold text-green-950 mb-2">
                Envíanos un mensaje
              </h3>
              <p className="text-gray-500 text-sm mb-8">
                Responderemos en un plazo de 2 días hábiles.
              </p>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {["Nombre completo", "Correo electrónico"].map((ph, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={ph}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Asunto"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 focus:outline-none focus:border-green-500">
                  <option>Motivo de contacto</option>
                  <option>Información general</option>
                  <option>Voluntariado</option>
                  <option>Alianzas</option>
                  <option>Donaciones</option>
                  <option>Prensa</option>
                </select>
                <textarea
                  placeholder="Tu mensaje..."
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 resize-none transition-colors"
                />
                <button className="w-full bg-green-800 hover:bg-green-700 text-white py-4 rounded-full font-bold transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Enviar mensaje
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-bold text-xs text-gray-400 uppercase tracking-wide mb-4">
                  Horario de atención
                </h4>
                <div className="space-y-1.5">
                  {[
                    ["Lunes – Viernes", "8:00 am – 5:00 pm"],
                    ["Sábados", "9:00 am – 1:00 pm"],
                    ["Domingos y festivos", "Cerrado"],
                  ].map(([day, hours], i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600">{day}</span>
                      <span className="font-semibold text-green-800">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("inicio");

  const renderPage = () => {
    switch (page) {
      case "inicio":       return <HomePage setPage={setPage} />;
      case "nosotros":     return <NosotrosPage />;
      case "programas":    return <ProgramasPage />;
      case "proyectos":    return <ProyectosPage />;
      case "noticias":     return <NoticiasPage />;
      case "galeria":      return <GaleriaPage />;
      case "biblioteca":   return <BibliotecaPage />;
      case "eventos":      return <EventosPage />;
      case "aliados":      return <AliadosPage />;
      case "voluntariado": return <VoluntariadoPage />;
      case "donaciones":   return <DonacionesPage />;
      case "contacto":     return <ContactoPage />;
      default:             return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar page={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
