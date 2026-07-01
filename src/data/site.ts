const img = (path: string) => `/assets/hymueble/${path}`;
const defaultWhatsapp = "https://wa.me/000000000000?text=Hola%20Hymueble%2C%20quiero%20cotizar%20un%20proyecto%20de%20mobiliario.";
const defaultEmail = "proyectos@hymueble.com";
const configuredWhatsapp = import.meta.env.PUBLIC_HYMUEBLE_WHATSAPP_URL?.trim();
const configuredEmail = import.meta.env.PUBLIC_HYMUEBLE_EMAIL?.trim();

export const brand = {
  name: "Hymueble",
  tagline: "Mobiliario B2B directo de fábrica",
  logo: img("brand/hongye-shengda-logo.webp"),
  whatsapp: configuredWhatsapp || defaultWhatsapp,
  email: configuredEmail || defaultEmail,
  showroom: "/showroom/",
};

export const formConfig = {
  action: import.meta.env.PUBLIC_HYMUEBLE_FORM_ACTION?.trim() || "",
};

export const socialLinks = [
  { platform: "Facebook", href: "https://www.facebook.com/profile.php?id=100078539178733" },
  { platform: "Instagram", href: "https://www.instagram.com/hyfurniture1985/" },
  { platform: "LinkedIn", href: "https://www.linkedin.com/company/hongye-furniture-manufacturing-co-ltd/" },
  { platform: "YouTube", href: "https://www.youtube.com/@HongyeFurnitureSolution" },
  { platform: "TikTok", href: "https://www.tiktok.com/@hongyefurniture_" },
];

export const showrooms = [
  {
    sector: "Hoteles",
    href: "https://my.matterport.com/show/?m=XJAMZN562aG",
    image: img("showroom/matterport-hotel-thumb.webp"),
    description: "Recorrido virtual para revisar lobby, habitaciones, áreas públicas y soluciones hoteleras antes de cotizar.",
  },
  {
    sector: "Oficinas",
    href: "https://my.matterport.com/show/?m=qhkf4QiGoGQ",
    image: img("showroom/matterport-office-thumb.webp"),
    description: "Explora espacios corporativos, puestos de trabajo, recepción, salas y áreas colaborativas.",
  },
  {
    sector: "Salud",
    href: "https://my.matterport.com/show/?m=ErY9m83UR4w",
    image: img("showroom/matterport-healthcare-thumb.webp"),
    description: "Visualiza soluciones para habitaciones, consulta, espera y operación en proyectos de salud.",
  },
  {
    sector: "Educación",
    href: "https://my.matterport.com/show/?m=8HKTwkAB7pS",
    image: img("showroom/matterport-education-thumb.webp"),
    description: "Revisa referencias para aulas, bibliotecas, laboratorios, comedores y espacios educativos.",
  },
];

export const companySites = [
  { sector: "Hoteles", href: "https://www.hyhotelfurniture.com/" },
  { sector: "Oficinas", href: "https://www.hyofficefurniture.com/" },
  { sector: "Salud", href: "https://www.hyhealthcarefurniture.com/" },
  { sector: "Educación", href: "https://hyeducationfurniture.com/" },
  { sector: "Residencial", href: "https://fenmicasa.com/" },
];

export const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Hoteles", href: "/hoteles/", catalog: "/catalogo/hoteles/", projects: "/proyectos/hoteles/" },
  { label: "Oficinas", href: "/oficinas/", catalog: "/catalogo/oficinas/", projects: "/proyectos/oficinas/" },
  { label: "Salud", href: "/salud/", catalog: "/catalogo/salud/", projects: "/proyectos/salud/" },
  { label: "Educación", href: "/educacion/", catalog: "/catalogo/educacion/", projects: "/proyectos/educacion/" },
  { label: "Residencial", href: "/residencial/", catalog: "/catalogo/residencial/", projects: "/proyectos/residencial/" },
  { label: "Fábrica", href: "/fabrica/" },
  { label: "Recursos", href: "/recursos/", children: [
    { label: "Blog", href: "/recursos/blog/" },
    { label: "Videos", href: "/recursos/videos/" },
  ] },
  { label: "Contacto", href: "/contacto/" },
];

export const metrics = [
  { value: "40+", label: "años de experiencia en fabricación" },
  { value: "350.000 m²", label: "de taller de producción" },
  { value: "40.000 m²", label: "de sala de exhibición" },
  { value: "10.000+", label: "proyectos nacionales e internacionales" },
  { value: "2.000+", label: "personas dentro del grupo" },
];

export const categories = [
  {
    title: "Hoteles",
    seoTitle: "Mobiliario hotelero para proyectos B2B",
    seoDescription: "Mobiliario hotelero para proyectos B2B: habitaciones, lobby y áreas públicas, con referencias de catálogo para preparar cotizaciones claras por sector.",
    seoKeywords: ["mobiliario hotelero", "muebles para hoteles", "FF&E hotelero", "mobiliario para proyectos B2B", "fabricación a medida", "proveedor de mobiliario"],
    catalogSeoTitle: "Catálogo de muebles para hoteles",
    catalogSeoDescription: "Catálogo de mobiliario hotelero para revisar habitaciones, baños, restaurantes, bares y áreas públicas antes de cotizar una compra B2B clara por proyecto.",
    catalogSeoKeywords: ["catálogo de mobiliario hotelero", "muebles para hoteles", "habitaciones de hotel", "mobiliario para restaurantes de hotel", "mobiliario para bar hotelero", "compra B2B"],
    projectsSeoTitle: "Proyectos de mobiliario hotelero",
    projectsSeoDescription: "Referencias de mobiliario hotelero para revisar habitaciones, áreas públicas y alcance de proyecto antes de solicitar una cotización B2B clara por sector.",
    projectsSeoKeywords: ["proyectos de mobiliario hotelero", "referencias hoteleras", "FF&E hotelero", "muebles para hoteles", "cotización B2B", "mobiliario para proyectos hoteleros"],
    href: "/hoteles/",
    catalog: "/catalogo/hoteles/",
    projects: "/proyectos/hoteles/",
    image: img("hoteles/主页/酒店-主页-Hero-酒店大堂全景.webp"),
    catalogImage: img("hoteles/目录/酒店-目录-Hero-酒店大堂全景.webp"),
    projectImage: img("hoteles/目录/酒店-目录-卡片-前台大堂区.webp"),
    alt: "mobiliario hotelero para lobby y áreas públicas",
    catalogAlt: "catálogo de mobiliario hotelero para proyectos",
    projectAlt: "referencia de proyecto de mobiliario hotelero",
    description: "Habitaciones, lobby, restaurante, bar, baño, exteriores y áreas de conferencia.",
    featured: true,
  },
  {
    title: "Oficinas",
    seoTitle: "Mobiliario de oficina para proyectos B2B",
    seoDescription: "Mobiliario de oficina para proyectos B2B, con puestos de trabajo, salas, recepción y referencias para compras por volumen y cotización por proyecto clara.",
    seoKeywords: ["mobiliario de oficina", "muebles para oficinas", "mobiliario corporativo", "puestos de trabajo", "mobiliario para proyectos B2B", "compra por volumen"],
    catalogSeoTitle: "Catálogo de mobiliario de oficina",
    catalogSeoDescription: "Catálogo de mobiliario de oficina para revisar puestos, sillas, salas y recepción antes de una compra B2B por proyecto con referencias claras y visuales.",
    catalogSeoKeywords: ["catálogo de mobiliario de oficina", "muebles para oficinas", "puestos de trabajo", "sillas de oficina", "salas de reunión", "compra B2B"],
    projectsSeoTitle: "Proyectos de mobiliario de oficina",
    projectsSeoDescription: "Referencias para evaluar mobiliario de oficina, configuración de espacios y criterios de compra B2B antes de cotizar con referencias claras y visuales.",
    projectsSeoKeywords: ["proyectos de mobiliario de oficina", "mobiliario corporativo", "muebles para oficinas", "configuración de oficinas", "compra B2B", "cotización por proyecto"],
    href: "/oficinas/",
    catalog: "/catalogo/oficinas/",
    projects: "/proyectos/oficinas/",
    image: img("oficinas/主页/办公-主页-Hero-现代办公空间.webp"),
    catalogImage: img("oficinas/目录/办公-目录-Hero-现代办公空间.webp"),
    projectImage: img("oficinas/目录/办公-目录-卡片-前台等候区.webp"),
    alt: "mobiliario de oficina para proyectos corporativos",
    catalogAlt: "catálogo de mobiliario de oficina para compras B2B",
    projectAlt: "referencias de proyectos de mobiliario de oficina",
    description: "Puestos de trabajo, sillas, mesas de reunión, recepción y lounge corporativo.",
    featured: true,
  },
  {
    title: "Salud",
    seoTitle: "Mobiliario para salud y espacios médicos",
    seoDescription: "Mobiliario para salud y espacios médicos, con referencias para hospitales, clínicas, salas de espera, compra B2B y cotización por proyecto con claridad.",
    seoKeywords: ["mobiliario para salud", "muebles para hospitales", "mobiliario para clínicas", "salas de espera", "espacios médicos", "compra B2B"],
    catalogSeoTitle: "Catálogo de mobiliario para salud",
    catalogSeoDescription: "Catálogo de mobiliario para salud, clínicas y hospitales, pensado para revisar espacios médicos antes de una compra B2B con referencias claras y visuales.",
    catalogSeoKeywords: ["catálogo de mobiliario para salud", "muebles para hospitales", "mobiliario para clínicas", "habitaciones hospitalarias", "salas de espera", "compra B2B"],
    projectsSeoTitle: "Proyectos de mobiliario para salud",
    projectsSeoDescription: "Referencias de mobiliario para salud y espacios médicos para evaluar necesidades de compra B2B antes de solicitar cotización y comparar opciones claras.",
    projectsSeoKeywords: ["proyectos de mobiliario para salud", "espacios médicos", "muebles para hospitales", "mobiliario para clínicas", "compra B2B", "cotización por proyecto"],
    href: "/salud/",
    catalog: "/catalogo/salud/",
    projects: "/proyectos/salud/",
    image: img("salud/主页/医疗-主页-Hero-医院病房场景.webp"),
    catalogImage: img("salud/目录/医疗-目录-Hero-医院病房场景_副本.webp"),
    projectImage: img("salud/目录/医疗-目录-卡片-医院病房.webp"),
    alt: "mobiliario para habitaciones y espacios de salud",
    catalogAlt: "catálogo de mobiliario para hospitales y clínicas",
    projectAlt: "referencias de proyectos de mobiliario para salud",
    description: "Consultorios, habitaciones, salas de espera, laboratorios y espacios de personal.",
  },
  {
    title: "Educación",
    seoTitle: "Mobiliario escolar para proyectos educativos",
    seoDescription: "Mobiliario escolar para proyectos educativos, con referencias para aulas, bibliotecas, laboratorios, compras institucionales y compra B2B por proyecto.",
    seoKeywords: ["mobiliario escolar", "mobiliario educativo", "muebles para escuelas", "aulas", "bibliotecas escolares", "compra institucional"],
    catalogSeoTitle: "Catálogo de mobiliario educativo",
    catalogSeoDescription: "Catálogo de mobiliario educativo para escuelas, aulas, bibliotecas y espacios de formación con enfoque B2B, selección clara y cotización por proyecto.",
    catalogSeoKeywords: ["catálogo de mobiliario educativo", "muebles para escuelas", "mobiliario escolar", "aulas", "bibliotecas", "compra B2B"],
    projectsSeoTitle: "Proyectos de mobiliario educativo",
    projectsSeoDescription: "Referencias de mobiliario educativo para revisar espacios escolares, criterios de compra por proyecto y próximos pasos antes de solicitar cotización B2B.",
    projectsSeoKeywords: ["proyectos de mobiliario educativo", "mobiliario escolar", "muebles para escuelas", "espacios educativos", "compra institucional", "cotización B2B"],
    href: "/educacion/",
    catalog: "/catalogo/educacion/",
    projects: "/proyectos/educacion/",
    image: img("educacion/主页/教育-主页-Hero-大学图书馆.webp"),
    catalogImage: img("educacion/目录/教育-目录-Hero-大学图书馆.webp"),
    projectImage: img("educacion/目录/教育-目录-卡片-学校行政办公.webp"),
    alt: "mobiliario educativo para bibliotecas y aulas",
    catalogAlt: "catálogo de mobiliario educativo para proyectos escolares",
    projectAlt: "referencias de proyectos de mobiliario educativo",
    description: "Aulas, bibliotecas, comedores, espacios infantiles, laboratorios y administración.",
  },
  {
    title: "Residencial",
    seoTitle: "Mobiliario residencial para proyectos",
    seoDescription: "Mobiliario residencial para proyectos B2B, con opciones para desarrollos, villas, apartamentos modelo, compras por volumen y cotización por proyecto B2B.",
    seoKeywords: ["mobiliario residencial", "muebles residenciales", "desarrollos residenciales", "apartamentos modelo", "villas", "compra por volumen"],
    catalogSeoTitle: "Catálogo de mobiliario residencial",
    catalogSeoDescription: "Catálogo de mobiliario residencial para desarrollos, villas y apartamentos modelo, con referencias B2B para compra por proyecto y selección visual clara.",
    catalogSeoKeywords: ["catálogo de mobiliario residencial", "muebles residenciales", "desarrollos residenciales", "apartamentos modelo", "villas", "compra B2B"],
    projectsSeoTitle: "Proyectos de mobiliario residencial",
    projectsSeoDescription: "Referencias de mobiliario residencial para evaluar estilos, espacios y compras B2B en desarrollos o apartamentos modelo antes de cotizar con criterios claros.",
    projectsSeoKeywords: ["proyectos de mobiliario residencial", "muebles residenciales", "desarrollos residenciales", "apartamentos modelo", "compra B2B", "cotización por proyecto"],
    href: "/residencial/",
    catalog: "/catalogo/residencial/",
    projects: "/proyectos/residencial/",
    image: img("residencial/主页/住宅-主页-Hero-豪华别墅客厅.webp"),
    catalogImage: img("residencial/目录/住宅-目录-Hero-豪华别墅客厅.webp"),
    projectImage: img("residencial/目录/住宅-目录-卡片-高档沙发.webp"),
    alt: "mobiliario residencial para villas y apartamentos modelo",
    catalogAlt: "catálogo de mobiliario residencial para desarrollos",
    projectAlt: "referencias de proyectos de mobiliario residencial",
    description: "Mobiliario para desarrollos residenciales, villas, apartamentos y showrooms.",
  },
];

export const projectSolutions = [
  {
    kicker: "Hoteles y resorts",
    title: "FF&E hotelero para aperturas, remodelaciones y compras por volumen",
    href: "/hoteles/",
    image: categories[0].projectImage,
    problem: "Coordinar habitaciones, lobby, restaurante, bar y áreas públicas sin perder coherencia visual ni control de tiempos.",
    response: "Alineamos referencias, materiales, muestras, producción, inspección y embalaje en una misma ruta.",
    proof: ["Habitaciones y áreas públicas", "Showroom hotelero 360°", "Casos Hilton, Kempinski y Raffles"],
  },
  {
    kicker: "Oficinas",
    title: "Mobiliario corporativo para sedes, espacios de coworking y edificios de oficinas",
    href: "/oficinas/",
    image: categories[1].projectImage,
    problem: "Equipar puestos de trabajo, salas, recepción y áreas colaborativas con cantidades claras, acabados consistentes y entregas coordinadas.",
    response: "Organizamos categorías, muestras, lotes, calidad y soporte documental para compras corporativas.",
    proof: ["Puestos, sillas y salas", "Showroom de oficinas", "Opciones por volumen"],
  },
  {
    kicker: "Residencial e inmobiliario",
    title: "Paquetes de mobiliario para desarrollos, villas y apartamentos modelo",
    href: "/residencial/",
    image: categories[4].projectImage,
    problem: "Convertir renders, planos o moodboards en piezas fabricables para varias unidades sin romper presupuesto, estilo o plazo.",
    response: "Convertimos referencias en medidas, materiales, acabados, producción y empaque por unidad.",
    proof: ["Salas, dormitorios y terrazas", "Personalización por unidad", "Soporte para desarrolladores"],
  },
  {
    kicker: "Comercial e institucional",
    title: "Soluciones para restaurantes, salud, educación y espacios comerciales",
    href: "/contacto/",
    image: img("hoteles/主页/酒店-主页-卡片-餐厅家具.webp"),
    problem: "Cada espacio combina tráfico, mantenimiento, ergonomía, presupuesto y plazos distintos; una simple lista de productos no alcanza.",
    response: "Definimos selección, producción, revisión y exportación según el uso real de cada espacio.",
    proof: ["Restaurantes y áreas públicas", "Salud y educación", "Consulta por alcance mixto"],
  },
];

export const hotelCatalog = [
  {
    title: "Habitaciones",
    href: "/catalogo/hoteles/habitaciones/",
    image: img("hoteles/主页/酒店-主页-卡片-酒店房间.webp"),
    catalogImage: img("hoteles/目录/酒店-目录-卡片-客房.webp"),
    alt: "mobiliario para habitaciones de hotel",
    catalogAlt: "catálogo de habitaciones para proyectos hoteleros",
    description: "Camas, cabeceras, escritorios, armarios, mesas de noche y piezas a medida.",
  },
  {
    title: "Muebles de baño",
    href: "/catalogo/hoteles/muebles-de-bano/",
    image: img("hoteles/主页/酒店-主页-卡片-浴室盥洗.webp"),
    catalogImage: img("hoteles/目录/酒店-目录-卡片-浴室.webp"),
    alt: "muebles de baño para habitaciones de hotel",
    catalogAlt: "catálogo de muebles de baño para hoteles",
    description: "Muebles de baño, gabinetes, espejos, estantes y acabados resistentes para uso hotelero.",
  },
  {
    title: "Exteriores",
    href: "/catalogo/hoteles/muebles-exteriores/",
    image: img("hoteles/主页/酒店-主页-卡片-户外家具.webp"),
    catalogImage: img("hoteles/目录/酒店-目录-卡片-户外.webp"),
    alt: "mobiliario exterior para hoteles y áreas comerciales",
    catalogAlt: "catálogo de mobiliario exterior para hoteles",
    description: "Sofás, camastros, mesas y soluciones para terrazas, piscinas y áreas abiertas.",
  },
  {
    title: "Muebles para bar",
    href: "/catalogo/hoteles/muebles-para-bar/",
    image: img("hoteles/主页/酒店-主页-卡片-酒吧家具.webp"),
    catalogImage: img("hoteles/catalogo/hotel-bar-counter.webp"),
    alt: "mobiliario para bar hotelero",
    catalogAlt: "catálogo de mobiliario para bar hotelero",
    description: "Barras, bancos altos, cabinas, mesas auxiliares y áreas de servicio.",
  },
  {
    title: "Muebles para restaurante",
    href: "/catalogo/hoteles/muebles-para-restaurante/",
    image: img("hoteles/主页/酒店-主页-卡片-餐厅家具.webp"),
    catalogImage: img("hoteles/目录/酒店-目录-卡片-餐厅.webp"),
    alt: "mobiliario para restaurantes de hotel",
    catalogAlt: "catálogo de mobiliario para restaurantes de hotel",
    description: "Mesas, sillas, bancas corridas, áreas de buffet y mobiliario para operación diaria.",
  },
  {
    title: "Mobiliario para conferencias",
    href: "/catalogo/hoteles/mobiliario-para-conferencias/",
    image: img("hoteles/主页/酒店-主页-卡片-会议家具.webp"),
    catalogImage: img("hoteles/目录/酒店-目录-卡片-会议室.webp"),
    alt: "mobiliario para conferencias y eventos hoteleros",
    catalogAlt: "catálogo de mobiliario para conferencias hoteleras",
    description: "Salones, reuniones, banquetes y espacios flexibles para eventos.",
  },
];

export const sectorCatalogs = {
  hoteles: hotelCatalog,
  oficinas: [
    {
      title: "Puestos de trabajo",
      href: "/catalogo/oficinas/",
      image: img("oficinas/主页/办公-主页-卡片-书桌工作站.webp"),
      alt: "puestos de trabajo para proyectos de oficina",
      description: "Estaciones operativas, escritorios modulares y soluciones para equipos en crecimiento.",
    },
    {
      title: "Sillas ergonómicas",
      href: "/catalogo/oficinas/",
      image: img("oficinas/主页/办公-主页-卡片-人体工学椅.webp"),
      alt: "sillas ergonómicas para mobiliario de oficina",
      description: "Sillas para uso diario, salas de reunión y espacios corporativos de alto tráfico.",
    },
    {
      title: "Mesas de reunión",
      href: "/catalogo/oficinas/",
      image: img("oficinas/主页/办公-主页-卡片-会议桌.webp"),
      alt: "mesas de reunión para oficinas corporativas",
      description: "Mesas para salas de juntas, capacitación, coworking y dirección.",
    },
    {
      title: "Recepción y espera",
      href: "/catalogo/oficinas/",
      image: img("oficinas/主页/办公-主页-卡片-前台等候区.webp"),
      alt: "mobiliario para recepción y espera en oficinas",
      description: "Mostradores, bancas, mesas auxiliares y mobiliario para primera impresión.",
    },
    {
      title: "Oficinas ejecutivas",
      href: "/catalogo/oficinas/",
      image: img("oficinas/主页/办公-主页-卡片-高管办公区.webp"),
      alt: "mobiliario para oficinas ejecutivas",
      description: "Mobiliario para dirección, salas privadas y oficinas de representación.",
    },
    {
      title: "Lounge corporativo",
      href: "/catalogo/oficinas/",
      image: img("oficinas/主页/办公-主页-卡片-联合办公休息区.webp"),
      alt: "mobiliario para lounge corporativo",
      description: "Sofás, mesas y áreas informales para colaboración y descanso.",
    },
  ],
  salud: [
    {
      title: "Habitaciones hospitalarias",
      href: "/catalogo/salud/",
      image: img("salud/主页/医疗-主页-卡片-医院病房.webp"),
      alt: "mobiliario para habitaciones hospitalarias",
      description: "Mobiliario para pacientes, acompañantes y operación diaria en habitaciones.",
    },
    {
      title: "Consultorios",
      href: "/catalogo/salud/",
      image: img("salud/主页/医疗-主页-卡片-医疗诊室.webp"),
      alt: "mobiliario para consultorios y clínicas",
      description: "Soluciones para clínicas, consultorios privados y atención ambulatoria.",
    },
    {
      title: "Salas de espera",
      href: "/catalogo/salud/",
      image: img("salud/主页/医疗-主页-卡片-候诊接待区.webp"),
      alt: "mobiliario para salas de espera en salud",
      description: "Asientos, recepción y mobiliario resistente para flujo constante de usuarios.",
    },
    {
      title: "Laboratorios",
      href: "/catalogo/salud/",
      image: img("salud/主页/医疗-主页-卡片-医疗实验室.webp"),
      alt: "mobiliario para laboratorios médicos",
      description: "Mesas, almacenamiento y superficies para áreas técnicas.",
    },
    {
      title: "Residencias de cuidado",
      href: "/catalogo/salud/",
      image: img("salud/主页/医疗-主页-卡片-养老护理房.webp"),
      alt: "mobiliario para residencias de cuidado",
      description: "Mobiliario cómodo, resistente y fácil de mantener para cuidado prolongado.",
    },
    {
      title: "Áreas de personal",
      href: "/catalogo/salud/",
      image: img("salud/主页/医疗-主页-卡片-医护休息区.webp"),
      alt: "mobiliario para áreas de personal médico",
      description: "Soluciones para descanso, guardia, almacenamiento y soporte interno.",
    },
  ],
  educacion: [
    {
      title: "Aulas",
      href: "/catalogo/educacion/",
      image: img("educacion/主页/教育-主页-卡片-学校教室.webp"),
      alt: "mobiliario para aulas en proyectos educativos",
      description: "Mesas, sillas y almacenamiento para escuelas, colegios y universidades.",
    },
    {
      title: "Bibliotecas",
      href: "/catalogo/educacion/",
      image: img("educacion/主页/教育-主页-卡片-学校图书馆.webp"),
      alt: "mobiliario para bibliotecas educativas",
      description: "Estanterías, mesas de lectura, zonas colaborativas y mobiliario de estudio.",
    },
    {
      title: "Laboratorios",
      href: "/catalogo/educacion/",
      image: img("educacion/主页/教育-主页-卡片-学校实验室.webp"),
      alt: "mobiliario para laboratorios educativos",
      description: "Mesas técnicas, almacenamiento y soluciones para aprendizaje práctico.",
    },
    {
      title: "Comedores",
      href: "/catalogo/educacion/",
      image: img("educacion/主页/教育-主页-卡片-学校食堂.webp"),
      alt: "mobiliario para comedores escolares",
      description: "Mesas, bancas y mobiliario para operación escolar de alto uso.",
    },
    {
      title: "Espacios infantiles",
      href: "/catalogo/educacion/",
      image: img("educacion/主页/教育-主页-卡片-幼儿园教室.webp"),
      alt: "mobiliario para espacios infantiles educativos",
      description: "Muebles para preescolar, lectura, juego y aprendizaje temprano.",
    },
    {
      title: "Administración escolar",
      href: "/catalogo/educacion/",
      image: img("educacion/主页/教育-主页-卡片-学校行政办公.webp"),
      alt: "mobiliario para administración escolar",
      description: "Oficinas, recepción y salas internas para gestión educativa.",
    },
  ],
  residencial: [
    {
      title: "Sala de villa",
      href: "/catalogo/residencial/",
      image: img("residencial/主页/住宅-主页-卡片-别墅客厅.webp"),
      alt: "mobiliario para sala de villa residencial",
      description: "Mobiliario para villas, casas modelo y áreas sociales de desarrollos residenciales.",
    },
    {
      title: "Comedor residencial",
      href: "/catalogo/residencial/",
      image: img("residencial/主页/住宅-主页-卡片-高档餐厅.webp"),
      alt: "mobiliario para comedor residencial",
      description: "Mesas, sillas y soluciones integradas para espacios de comedor.",
    },
    {
      title: "Dormitorio principal",
      href: "/catalogo/residencial/",
      image: img("residencial/主页/住宅-主页-卡片-主卧套房.webp"),
      alt: "mobiliario para dormitorio principal residencial",
      description: "Camas, mesas de noche, cabeceras y piezas a medida para habitaciones.",
    },
    {
      title: "Vestidores",
      href: "/catalogo/residencial/",
      image: img("residencial/主页/住宅-主页-卡片-衣帽间.webp"),
      alt: "mobiliario para vestidores en proyectos residenciales",
      description: "Armarios, closets, almacenamiento y soluciones personalizadas.",
    },
    {
      title: "Terrazas",
      href: "/catalogo/residencial/",
      image: img("residencial/主页/住宅-主页-卡片-户外露台.webp"),
      alt: "mobiliario para terrazas residenciales",
      description: "Mobiliario exterior para terrazas, balcones y amenidades.",
    },
    {
      title: "Sofás y descanso",
      href: "/catalogo/residencial/",
      image: img("residencial/主页/住宅-主页-卡片-高档沙发.webp"),
      alt: "sofás y mobiliario de descanso residencial",
      description: "Sofás, butacas y piezas de confort para proyectos residenciales.",
    },
  ],
};

export const sectorPages = {
  oficinas: {
    eyebrow: "Oficinas B2B",
    title: "Mobiliario de oficina para proyectos B2B",
    lead: "Mobiliario de oficina para proyectos corporativos, edificios y espacios de coworking, con referencias para compras por volumen.",
    seoDescription: "Mobiliario de oficina para proyectos B2B, con puestos de trabajo, salas, recepción y referencias para compras por volumen y cotización por proyecto clara.",
    seoKeywords: ["mobiliario de oficina", "muebles para oficinas", "mobiliario corporativo", "puestos de trabajo", "compra B2B", "cotización por proyecto"],
    image: categories[1].image,
    catalogHref: "/catalogo/oficinas/",
    projectsHref: "/proyectos/oficinas/",
    proof: ["Puestos de trabajo y salas de reunión", "Personalización de acabados y medidas", "Embalaje y soporte para exportación"],
  },
  salud: {
    eyebrow: "Salud",
    title: "Mobiliario para salud y espacios médicos",
    lead: "Mobiliario para salud, clínicas, hospitales y salas de espera, pensado para revisar necesidades de compra por proyecto.",
    seoDescription: "Mobiliario para salud y espacios médicos, con referencias para hospitales, clínicas, salas de espera, compra B2B y cotización por proyecto con claridad.",
    seoKeywords: ["mobiliario para salud", "espacios médicos", "muebles para hospitales", "mobiliario para clínicas", "compra B2B", "cotización por proyecto"],
    image: categories[2].image,
    catalogHref: "/catalogo/salud/",
    projectsHref: "/proyectos/salud/",
    proof: ["Habitaciones y consultorios", "Superficies resistentes y fáciles de mantener", "Producción por lote para proyectos"],
  },
  educacion: {
    eyebrow: "Educación",
    title: "Mobiliario escolar para proyectos educativos",
    lead: "Suministro para aulas, bibliotecas, comedores, laboratorios, espacios infantiles y administración escolar, con capacidad de producción por proyecto.",
    seoDescription: "Mobiliario escolar para proyectos educativos, con referencias para aulas, bibliotecas, laboratorios, compras institucionales y compra B2B por proyecto.",
    seoKeywords: ["mobiliario escolar", "mobiliario educativo", "muebles para escuelas", "aulas", "bibliotecas escolares", "compra B2B"],
    image: categories[3].image,
    catalogHref: "/catalogo/educacion/",
    projectsHref: "/proyectos/educacion/",
    proof: ["Aulas, bibliotecas y comedores", "Muebles para uso intensivo", "Casos educativos como Huntington School Of Lagos"],
  },
  residencial: {
    eyebrow: "Residencial",
    title: "Mobiliario residencial para proyectos",
    lead: "Mobiliario residencial para desarrollos, villas y apartamentos modelo, con opciones de compra por volumen y fabricación a medida.",
    seoDescription: "Mobiliario residencial para proyectos B2B, con opciones para desarrollos, villas, apartamentos modelo, compras por volumen y cotización por proyecto B2B.",
    seoKeywords: ["mobiliario residencial", "muebles residenciales", "desarrollos residenciales", "apartamentos modelo", "compra por volumen", "cotización B2B"],
    image: categories[4].image,
    catalogHref: "/catalogo/residencial/",
    projectsHref: "/proyectos/residencial/",
    proof: ["Salas, dormitorios, vestidores y terrazas", "Paquetes de mobiliario por unidad", "Personalización para estilos de proyecto"],
  },
};

export const projects = [
  {
    name: "Grand Kempinski Hotel",
    seoTitle: "Grand Kempinski Hotel, referencia de mobiliario hotelero",
    seoDescription: "Grand Kempinski Hotel como referencia de mobiliario hotelero para revisar espacios, alcance y criterios antes de una cotización B2B con referencias claras.",
    seoKeywords: ["Grand Kempinski Hotel", "referencia de mobiliario hotelero", "mobiliario hotelero", "FF&E hotelero", "proyecto hotelero", "cotización B2B"],
    sector: "Hotel",
    region: "Referencia hotelera internacional",
    scope: "Habitaciones, restaurante, entretenimiento, bar y áreas públicas documentadas.",
    facts: ["Hotel internacional", "FF&E por múltiples espacios", "PDF de caso interno"],
    alt: "referencia de mobiliario hotelero Grand Kempinski Hotel",
    image: img("casos/kempinski-reception.webp"),
    homeImage: img("casos/kempinski-exterior-case.webp"),
    hotelImage: img("casos/kempinski-reception.webp"),
    hubImage: img("casos/kempinski-lake-exterior-case.webp"),
    listingImage: img("casos/kempinski-guestroom-case.webp"),
    detailImage: img("casos/kempinski-reception.webp"),
    href: "/proyectos/hoteles/grand-kempinski-hotel/",
  },
  {
    name: "The Hilton DoubleTree Hotel",
    seoTitle: "The Hilton DoubleTree Hotel, referencia hotelera",
    seoDescription: "The Hilton DoubleTree Hotel como referencia de mobiliario hotelero para comparar habitaciones, áreas públicas y compra B2B con referencias claras por sector.",
    seoKeywords: ["The Hilton DoubleTree Hotel", "referencia hotelera", "mobiliario hotelero", "muebles para hoteles", "áreas públicas", "compra B2B"],
    sector: "Hotel",
    region: "Referencia hotelera internacional",
    scope: "Habitaciones, lobby, restaurante, reuniones, fitness, piscina y amenidades.",
    facts: ["Hotel de cadena", "Áreas públicas y habitaciones", "PDF + video interno"],
    alt: "referencia de mobiliario hotelero The Hilton DoubleTree Hotel",
    image: img("casos/hilton-suite-room.webp"),
    homeImage: img("casos/hilton-exterior-case.webp"),
    hotelImage: img("casos/hilton-room-view-case.webp"),
    hubImage: img("casos/hilton-project-installation-case.webp"),
    listingImage: img("casos/hilton-suite-room.webp"),
    detailImage: img("casos/hilton-king-room-case.webp"),
    href: "/proyectos/hoteles/hilton-doubletree-hotel/",
  },
  {
    name: "Raffles Hotel",
    seoTitle: "Raffles Hotel, referencia de mobiliario hotelero",
    seoDescription: "Raffles Hotel como referencia de mobiliario hotelero y FF&E para revisar criterios de proyecto antes de solicitar cotización B2B con referencias claras.",
    seoKeywords: ["Raffles Hotel", "referencia de mobiliario hotelero", "mobiliario hotelero", "FF&E hotelero", "proyecto hotelero", "cotización B2B"],
    sector: "Hotel",
    region: "Referencia hotelera",
    scope: "Mobiliario a medida, FF&E, embalaje y evidencia documental de entrega.",
    facts: ["Proyecto hotelero", "Soporte FF&E", "Evidencia de embalaje"],
    alt: "referencia de mobiliario hotelero Raffles Hotel",
    image: img("casos/raffles-dining-room.webp"),
    homeImage: img("casos/raffles-restaurant-warm-case.webp"),
    hotelImage: img("casos/raffles-restaurant-warm-case.webp"),
    hubImage: img("casos/raffles-packaging-proof-case.webp"),
    listingImage: img("casos/raffles-dining-room.webp"),
    detailImage: img("casos/raffles-dining-room.webp"),
    href: "/proyectos/hoteles/raffles-hotel/",
  },
  {
    name: "Huntington School Of Lagos",
    seoTitle: "Huntington School Of Lagos, referencia educativa",
    seoDescription: "Huntington School Of Lagos como referencia de mobiliario educativo para revisar espacios escolares, compra por proyecto y criterios antes de cotizar B2B.",
    seoKeywords: ["Huntington School Of Lagos", "referencia educativa", "mobiliario educativo", "mobiliario escolar", "espacios escolares", "compra B2B"],
    sector: "Educación",
    region: "Lagos, Nigeria",
    scope: "Mobiliario escolar, recepción, aulas, auditorio e instalación documentada.",
    facts: ["Proyecto educativo", "Fotos y videos de instalación", "Soporte en sitio"],
    alt: "referencia de mobiliario educativo Huntington School Of Lagos",
    image: img("casos/huntington-workstations.webp"),
    homeImage: img("casos/huntington-campus-exterior.webp"),
    hubImage: img("casos/huntington-project-model.webp"),
    listingImage: img("casos/huntington-classroom-lab.webp"),
    detailImage: img("casos/huntington-reception-installation.webp"),
    href: "/proyectos/educacion/huntington-school-of-lagos/",
  },
];

export const factoryCapabilities = [
  {
    title: "Corte y seccionado",
    text: "Biesse CNC Electronic Cutting Saw, líneas inteligentes de corte, etiquetado automático, CNC router y sierras de precisión.",
  },
  {
    title: "Canteado",
    text: "Canteadoras rectas y curvas, líneas automáticas y HOMAG S-500 láser para velocidad, precisión y calidad de borde.",
  },
  {
    title: "Pintura y acabado",
    text: "Líneas automáticas de primer, lijado, pulido, acabado y equipos de pintura al agua UV.",
  },
  {
    title: "Carpintería y personalización",
    text: "Centros de mecanizado, taladrado CNC, espigadoras, perforadoras de múltiples ejes y líneas automatizadas BACC.",
  },
  {
    title: "Metal",
    text: "Cizalla hidráulica CNC, plegadora CNC y corte láser de fibra Han's Laser para estructuras y detalles metálicos.",
  },
  {
    title: "Soporte ambiental y almacén",
    text: "Tratamiento de gases, carbón activado, combustión catalítica, extracción de polvo y centro de almacenamiento inteligente.",
  },
];

export const qualificationProofs = [
  {
    title: "Parque industrial y talleres",
    label: "Capacidad de producción",
    image: img("qualification/industrial-park-workshops.webp"),
    alt: "parque industrial y talleres de producción de mobiliario",
    text: "Evidencia visual del parque industrial, talleres y líneas de producción para evaluar escala antes de iniciar una compra B2B.",
  },
  {
    title: "Honores y reconocimientos",
    label: "Respaldo corporativo",
    image: img("qualification/honors-overview.webp"),
    alt: "documentación corporativa para revisión de compradores B2B",
    text: "Material corporativo con reconocimientos, licencias y documentos de soporte usados para revisión comercial.",
  },
  {
    title: "Matriz de certificaciones",
    label: "Documentación disponible",
    image: img("qualification/certificate-matrix.webp"),
    alt: "matriz de certificaciones para revisión documental",
    text: "Vista resumida de certificados de gestión, ambiente, salud ocupacional, estándares y documentación relacionada.",
  },
];

export const certificationHighlights = [
  "ISO 9001",
  "ISO 14001",
  "ISO 45001",
  "GREENGUARD",
  "BIFMA",
  "CFCC",
  "China Environmental Labeling",
  "EPD",
];

export const cooperationPartnerBrands = [
  { name: "Westin", tone: "serif" },
  { name: "Hyatt", tone: "wide" },
  { name: "InterContinental", tone: "serif" },
  { name: "Marriott", tone: "condensed" },
  { name: "Pan Pacific", tone: "serif" },
  { name: "Wyndham", tone: "wide" },
  { name: "Holiday Inn", tone: "soft" },
  { name: "Hilton", tone: "serif" },
  { name: "Radisson", tone: "script" },
  { name: "Ritz-Carlton", tone: "serif" },
  { name: "Waldorf Astoria", tone: "wide" },
  { name: "JW Marriott", tone: "condensed" },
  { name: "Sheraton", tone: "serif" },
  { name: "Sofitel", tone: "wide" },
  { name: "Crowne Plaza", tone: "soft" },
  { name: "Pullman", tone: "wide" },
];

export const trustQualificationImages = [
  {
    title: "Matriz de certificaciones",
    image: img("qualification/certificate-matrix.webp"),
    alt: "matriz de certificaciones para compradores B2B",
    tags: ["ISO 9001", "ISO 14001", "ISO 45001", "SGS"],
  },
  {
    title: "Documentación corporativa",
    image: img("qualification/honors-overview.webp"),
    alt: "documentación corporativa para compras B2B",
    tags: ["Reconocimientos", "Licencias", "Soporte B2B"],
  },
  {
    title: "Capacidad de fábrica",
    image: img("qualification/industrial-park-workshops.webp"),
    alt: "talleres de fábrica para mobiliario de proyectos",
    tags: ["Parque industrial", "Talleres", "Producción"],
  },
];

export const trustCertificateSignals = [
  {
    name: "ISO 9001",
    label: "Gestión de calidad",
    context: "Base documental para control de proceso, producción y revisión comercial.",
  },
  {
    name: "ISO 14001 / ISO 45001",
    label: "Operación responsable",
    context: "Gestión ambiental, salud ocupacional y soporte corporativo para compras B2B.",
  },
  {
    name: "GREENGUARD",
    label: "Materiales interiores",
    context: "Referencia de baja emisión para proyectos comerciales e institucionales.",
  },
  {
    name: "BIFMA",
    label: "Uso intensivo",
    context: "Respaldo técnico relevante para mobiliario de oficina y espacios contract.",
  },
];

export const cooperationSignals = [
  {
    name: "The Hilton DoubleTree Hotel",
    label: "Caso hotelero",
    context: "Habitaciones, restaurante, reuniones y amenidades documentadas en material de proyecto.",
  },
  {
    name: "Grand Kempinski Hotel",
    label: "Referencia hotelera",
    context: "Lobby, habitaciones, restaurante, bar y áreas públicas como evidencia de capacidad FF&E.",
  },
  {
    name: "Raffles Hotel",
    label: "Proyecto hotelero",
    context: "Soporte de mobiliario a medida, documentación de entrega y embalaje para proyecto.",
  },
  {
    name: "Huntington School Of Lagos",
    label: "Caso educativo",
    context: "Instalación internacional con evidencia visual de mobiliario escolar y coordinación de proyecto.",
  },
  {
    name: "ISO 9001",
    label: "Gestión de calidad",
    context: "Sistema de gestión usado como base documental para compradores internacionales.",
  },
  {
    name: "GREENGUARD",
    label: "Materiales",
    context: "Referencia de baja emisión y ambiente interior para evaluación de proyectos comerciales.",
  },
  {
    name: "BIFMA",
    label: "Estándar técnico",
    context: "Respaldo relevante para mobiliario de oficina, uso intensivo y compras institucionales.",
  },
  {
    name: "ISO 14001 / ISO 45001",
    label: "Operación responsable",
    context: "Gestión ambiental, salud ocupacional y soporte corporativo para compras B2B.",
  },
];

export const hotelCooperationSignals = cooperationSignals.filter((item) =>
  ["The Hilton DoubleTree Hotel", "Grand Kempinski Hotel", "Raffles Hotel", "ISO 9001", "GREENGUARD", "ISO 14001 / ISO 45001"].includes(item.name),
);

export const resourceCards = [
  {
    title: "Blog",
    href: "/recursos/blog/",
    image: img("recursos/博客/资源-博客-Hero-工厂CNC.webp"),
    alt: "recursos sobre mobiliario para proyectos B2B",
    description: "Guías para compradores B2B, importadores, contratistas y equipos de proyecto.",
  },
  {
    title: "Videos",
    href: "/recursos/videos/",
    image: img("recursos/视频/资源-视频-Hero-装配线场景.webp"),
    alt: "videos de mobiliario comercial y proyectos B2B",
    description: "Material audiovisual de fábrica, procesos, showroom y proyectos.",
  },
];

export const processSteps = [
  ["Cotización", "Propuesta según alcance, cantidades y requisitos técnicos."],
  ["Medición en sitio", "Revisión de planos, medidas y condiciones de obra."],
  ["Diseño técnico", "Planos y ajustes con arquitectura, diseño o contratistas."],
  ["Acabados", "Confirmación de materiales, colores, texturas y herrajes."],
  ["Muestra o piloto", "Validación de pieza, habitación o espacio antes de producir."],
  ["Producción", "Fabricación según especificaciones y volumen aprobado."],
  ["Control de calidad", "Inspección en proceso para detectar desviaciones."],
  ["Inspección final", "Verificación antes de embalaje, carga y documentos."],
  ["Embalaje", "Protección para transporte internacional y tipo de mueble."],
  ["Logística", "Coordinación documental y soporte de envío."],
  ["Instalación", "Soporte o coordinación local cuando el proyecto lo requiere."],
  ["Postventa", "Seguimiento para incidencias, reposiciones o ajustes."],
];

export const qualityProofs = [
  {
    step: "01",
    title: "Confirmación de materiales",
    text: "Referencias, acabados y medidas revisadas antes de producir.",
    image: img("fabrica/produccion/real-material-finishing.webp"),
    alt: "revisión de materiales y acabados para mobiliario B2B",
  },
  {
    step: "02",
    title: "Muestra o espacio piloto",
    text: "Validación previa para reducir cambios durante producción.",
    image: img("fabrica/produccion/real-mockup-room.webp"),
    alt: "espacio piloto para validar mobiliario de proyecto",
  },
  {
    step: "03",
    title: "Seguimiento de producción",
    text: "Control de avances y comunicación con equipos de compra.",
    image: img("fabrica/produccion/real-production-followup.webp"),
    alt: "seguimiento de producción para mobiliario de proyecto",
  },
  {
    step: "04",
    title: "Inspección y embalaje",
    text: "Revisión final, protección de carga y soporte documental.",
    image: img("fabrica/produccion/real-export-packaging.webp"),
    alt: "inspección y embalaje de mobiliario para exportación",
  },
];

export const qualityCheckpoints = [
  {
    label: "Materiales y acabados",
    text: "Color, textura, uso y requisitos técnicos.",
  },
  {
    label: "Muestra o piloto",
    text: "Validación previa cuando el proyecto lo requiere.",
  },
  {
    label: "Seguimiento de producción",
    text: "Avances, cambios y puntos críticos controlados.",
  },
  {
    label: "Revisión de embalaje",
    text: "Protección según mueble, ruta y manipulación.",
  },
  {
    label: "Inspección final",
    text: "Piezas, cantidades, acabados y documentos.",
  },
  {
    label: "Salida con evidencia",
    text: "Información clara para comprador e importador.",
  },
];

export const factoryHeroImage = img("fabrica/equipos/bacci-five-axis-cnc.webp");
export const factoryPackagingImage = img("fabrica/produccion/export-packaging-proof.webp");
export const contactConsultationImage = img("contacto/produccion/project-consultation-board.webp");

export const factoryImages = [
  img("fabrica/equipos/homag-edge-banding.webp"),
  img("fabrica/equipos/bacci-five-axis-cnc.webp"),
  img("fabrica/equipos/six-axis-drilling.webp"),
  img("fabrica/equipos/homag-spraying-line.webp"),
  factoryHeroImage,
];

export const factoryEvidenceCards = [
  {
    title: "HOMAG para canteado",
    label: "Bordes estables",
    text: "Canteado industrial para piezas de mobiliario hotelero y comercial con control de borde antes de pasar a ensamble.",
    image: img("fabrica/equipos/homag-edge-banding.webp"),
    alt: "equipo HOMAG para canteado industrial en fábrica de mobiliario",
  },
  {
    title: "Bacci CNC de 5 ejes",
    label: "Madera sólida y piezas especiales",
    text: "Mecanizado para componentes curvos, estructuras de madera y piezas a medida que requieren precisión repetible.",
    image: img("fabrica/equipos/bacci-five-axis-cnc.webp"),
    alt: "centro CNC Bacci de cinco ejes para madera sólida",
  },
  {
    title: "Perforación de seis caras",
    label: "Paneles y módulos",
    text: "Taladrado y ranurado de paneles con lectura técnica para módulos, gabinetes y mobiliario de proyecto.",
    image: img("fabrica/equipos/six-axis-drilling.webp"),
    alt: "equipo CNC de perforación de seis caras para paneles de mobiliario",
  },
  {
    title: "Acabado y pintura al agua",
    label: "Superficie controlada",
    text: "Cabinas y líneas de acabado para revisar color, uniformidad y superficie antes de inspección final.",
    image: img("fabrica/equipos/water-based-finishing.webp"),
    alt: "cabina de acabado con pintura al agua para mobiliario comercial",
  },
];

export const factoryProcessEvidence = [
  {
    step: "01",
    title: "Corte y canteado",
    text: "Equipos HOMAG ayudan a estabilizar bordes, dimensiones y preparación de paneles.",
    image: img("fabrica/equipos/homag-edge-banding.webp"),
    alt: "máquina HOMAG de canteado para paneles de mobiliario",
  },
  {
    step: "02",
    title: "CNC de madera sólida",
    text: "Bacci de 5 ejes cubre componentes especiales, piezas curvas y madera sólida.",
    image: img("fabrica/equipos/bacci-five-axis-cnc.webp"),
    alt: "equipo Bacci CNC de cinco ejes en producción de mobiliario",
  },
  {
    step: "03",
    title: "Perforación de seis caras",
    text: "Taladrado y ranurado con lectura técnica para módulos y piezas repetidas.",
    image: img("fabrica/equipos/six-axis-drilling.webp"),
    alt: "máquina CNC de perforación de seis caras para paneles",
  },
  {
    step: "04",
    title: "Procesamiento de paneles",
    text: "El trabajo de panel se apoya en equipos CNC para series, módulos y mobiliario a escala.",
    image: img("fabrica/equipos/cnc-panel-processing.webp"),
    alt: "línea CNC para procesamiento de paneles de mobiliario",
  },
  {
    step: "05",
    title: "Acabado de superficie",
    text: "Lijado, pintura al agua y revisión visual reducen variaciones visibles.",
    image: img("fabrica/equipos/homag-spraying-line.webp"),
    alt: "línea de acabado y preparación de superficies para mobiliario",
  },
  {
    step: "06",
    title: "Control final",
    text: "Revisión de piezas, superficies y tolerancias antes de protección y embarque.",
    image: img("fabrica/equipos/quality-control-equipment.webp"),
    alt: "equipo de control de calidad para mobiliario de proyecto",
  },
];

export const factoryEquipmentHighlights = [
  {
    title: "HOMAG",
    label: "Canteado y acabado de borde",
    text: "Útil para paneles, módulos, gabinetes y piezas que requieren borde estable.",
  },
  {
    title: "Bacci",
    label: "CNC de 5 ejes",
    text: "Apoya piezas de madera sólida, curvas y componentes personalizados.",
  },
  {
    title: "CNC de seis caras",
    label: "Taladrado y ranurado",
    text: "Reduce desviaciones en módulos repetidos y piezas de proyecto.",
  },
  {
    title: "Acabado al agua",
    label: "Superficie y ambiente interior",
    text: "Proceso de pintura y revisión visual para acabados comerciales.",
  },
];

export const faqCategories = [
  {
    label: "Sobre productos y fabricación",
    questions: [
      {
        question: "¿Fabrican a medida o solo tienen productos estándar de catálogo?",
        answer: "Fabricamos tanto productos de catálogo como mobiliario a medida. Para proyectos personalizados revisamos planos, medidas, materiales, acabados y uso previsto. La mayoría de nuestros clientes B2B combinan productos estándar con piezas adaptadas a su proyecto.",
      },
      {
        question: "¿Tienen cantidad mínima de pedido?",
        answer: "No manejamos un mínimo fijo. La viabilidad depende del tipo de mueble, nivel de personalización y volumen del proyecto. Lo evaluamos caso por caso; escríbenos con los detalles de tu proyecto y te lo confirmamos.",
      },
      {
        question: "¿Cuánto tarda la producción?",
        answer: "Depende del producto, volumen y nivel de personalización. No publicamos tiempos genéricos porque varían según cada proyecto, pero normalmente el plazo oscila entre 5 y 8 semanas después de confirmar los planos o especificaciones técnicas. Una vez revisada la solicitud, te enviamos un plazo estimado por escrito antes de confirmar el pedido.",
      },
      {
        question: "¿Pueden fabricar una muestra antes del pedido?",
        answer: "Sí, evaluamos muestras para proyectos con volumen definido o especificaciones técnicas claras. El costo de la muestra se cotiza por separado y generalmente es mayor que el precio unitario de producción, ya que se fabrica de forma individual. El costo exacto se confirma al revisar el producto, los materiales y el destino.",
      },
    ],
  },
  {
    label: "Sobre calidad y confianza",
    questions: [
      {
        question: "¿Cómo sé que lo que recibo es lo que acordamos?",
        answer: "Realizamos inspección y control de calidad en planta antes del embalaje. Para proyectos que lo requieran, podemos coordinar inspección por terceros. También podemos documentar el proceso con fotos, videos del proceso de producción y reportes durante la fabricación.",
      },
      {
        question: "¿Tienen certificados o reportes de calidad?",
        answer: "Sí. Contamos con certificaciones y reportes de pruebas técnicas según el tipo de producto. Los compartimos una vez evaluados los requisitos técnicos de tu proyecto, para asegurar que te proporcionamos la documentación aplicable a tu mercado.",
      },
      {
        question: "¿Han trabajado antes con clientes en mi país o región?",
        answer: "Sí. Tenemos proyectos en México, Centroamérica, el Caribe y Sudamérica, además de experiencia internacional en otras regiones. En nuestra sección de proyectos puedes revisar referencias por sector y tipo de espacio.",
      },
    ],
  },
  {
    label: "Sobre logística e importación",
    questions: [
      {
        question: "¿Cómo manejan el embalaje para exportación?",
        answer: "El embalaje se define según el tipo de mueble, volumen, ruta de envío y requisitos del proyecto. Utilizamos materiales de protección como cajas de madera contrachapada, refuerzos en esquinas y embalaje multicapa para reducir riesgos durante el transporte. También preparamos la documentación de exportación necesaria para el despacho.",
      },
      {
        question: "¿Quién se encarga de la importación en mi país?",
        answer: "La importación corre por cuenta del comprador. Podemos coordinarnos con tu agente aduanal, agente de aduanas o empresa logística local. Si tu empresa no tiene experiencia en importación directa desde China, podemos orientarte sobre el proceso general.",
      },
      {
        question: "¿Los servicios de instalación están incluidos?",
        answer: "No. La instalación y supervisión local no están incluidas de forma estándar; la cotización normalmente cubre fabricación, control de calidad, embalaje y exportación. Para proyectos que requieran soporte local, lo evaluamos por separado según país, ciudad y alcance.",
      },
    ],
  },
  {
    label: "Sobre el proceso de compra y contacto",
    questions: [
      {
        question: "¿Cuáles son las condiciones de pago?",
        answer: "Trabajamos con condiciones estándar para proyectos B2B: un anticipo del 50% para iniciar la producción y el saldo restante del 50% antes del embarque, después de la aprobación del reporte de control de calidad.",
      },
      {
        question: "¿Cuánto tardan en responder una consulta?",
        answer: "Respondemos en menos de 24 horas durante días hábiles. Nuestro equipo opera en horario de China (UTC+8); si escribes fuera de ese horario, te responderemos al inicio del siguiente día hábil.",
      },
      {
        question: "¿Por dónde es mejor contactarlos?",
        answer: "Puedes contactarnos por el formulario del sitio web o por WhatsApp. Para proyectos con requerimientos técnicos, el formulario es más práctico porque puedes adjuntar planos o listas de productos. Para consultas rápidas, WhatsApp es más ágil.",
      },
      {
        question: "¿No encuentras la respuesta que buscas?",
        answer: "Cuéntanos sobre tu proyecto y nuestro equipo técnico revisará tu solicitud de forma personalizada. Puedes escribirnos por WhatsApp o completar el formulario de contacto.",
      },
    ],
  },
];
