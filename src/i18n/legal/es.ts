import type { LegalDict } from "./types";

/**
 * Contenido legal en castellano.
 * Sintaxis en línea:
 *  - **texto** → negrita
 *  - {{contacto|texto}}, {{cookies|texto}}, {{privacidad|texto}}, {{aviso|texto}} → enlaces internos
 *  - {{tel:+34613722505|texto}} → enlace telefónico
 *  - {{url:https://...|texto}} → enlace externo (nueva pestaña)
 */
const es: LegalDict = {
  notice: {
    description:
      "Aviso legal del sitio web del Grupo Operativo PIGTATTOO: datos identificativos del titular, condiciones de uso y propiedad intelectual.",
    intro: [
      "En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSICE), se facilitan los siguientes datos identificativos del titular de este sitio web.",
    ],
    sections: [
      {
        title: "Titular del sitio web",
        blocks: [
          {
            t: "dl",
            items: [
              { label: "Denominación", text: "Clúster Español de Productores de Ganado Porcino (i+Porc)" },
              { label: "CIF", text: "G99539363" },
              { label: "Domicilio", text: "C/ María de Luna, 11 · 50018 Zaragoza (España)" },
              { label: "Teléfono", text: "{{tel:+34613722505|+34 613 72 25 05}}" },
              { label: "Contacto", text: "{{contacto|formulario de contacto}}" },
            ],
          },
        ],
      },
      {
        title: "Objeto del sitio",
        blocks: [
          {
            t: "p",
            text: "Este sitio web tiene una finalidad exclusivamente informativa y divulgativa de las actividades y resultados del Grupo Operativo Supraautonómico PIGTATTOO, cofinanciado por el FEADER (Unión Europea) y el Ministerio de Agricultura, Pesca y Alimentación en el marco del Plan Estratégico de la PAC 2023-2027. No se realizan a través de él actividades de comercio electrónico ni de contratación en línea.",
          },
        ],
      },
      {
        title: "Condiciones de uso",
        blocks: [
          {
            t: "p",
            text: "El acceso al sitio web es libre y gratuito. La persona usuaria se compromete a hacer un uso diligente del sitio y de sus contenidos, absteniéndose de utilizarlos con fines ilícitos o lesivos para terceros. El titular no garantiza la disponibilidad continuada del sitio ni se responsabiliza de los daños derivados de interrupciones técnicas ajenas a su control, ni del contenido de los sitios de terceros a los que se pueda enlazar desde estas páginas.",
          },
        ],
      },
      {
        title: "Propiedad intelectual e industrial",
        blocks: [
          {
            t: "p",
            text: "Los contenidos de este sitio (textos, imágenes, diseño, código y materiales descargables) pertenecen al titular o a las entidades del consorcio PIGTATTOO, o se utilizan con la debida autorización. Se permite la reproducción parcial con fines divulgativos o docentes siempre que se cite la fuente y no se altere el contenido. Las marcas y logotipos de las entidades participantes son propiedad de sus respectivos titulares.",
          },
        ],
      },
      {
        title: "Legislación aplicable",
        blocks: [
          {
            t: "p",
            text: "Las presentes condiciones se rigen por la legislación española. Para cualquier controversia serán competentes los juzgados y tribunales del domicilio del titular, salvo que la normativa de consumo disponga otro fuero.",
          },
        ],
      },
      {
        title: "Créditos fotográficos",
        blocks: [
          {
            t: "ul",
            items: [
              "Portada: Zoe Richardson (Unsplash)",
              "Actualidad: Marwen Larafa (Unsplash)",
              "Contacto: David Vives (Unsplash)",
              "Proyecto, Actividades, Resultados y Materiales e imagen de concepto: ilustraciones generadas con inteligencia artificial para el proyecto PIGTATTOO.",
            ],
          },
        ],
      },
    ],
  },

  privacy: {
    description:
      "Política de privacidad de PIGTATTOO: responsable del tratamiento, finalidad, base jurídica, destinatarios y ejercicio de derechos conforme al RGPD y la LOPDGDD.",
    intro: [
      "En cumplimiento del Reglamento (UE) 2016/679, General de Protección de Datos (RGPD), y de la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se informa del tratamiento de los datos personales facilitados a través de este sitio web.",
    ],
    sections: [
      {
        title: "Responsable del tratamiento",
        blocks: [
          {
            t: "dl",
            items: [
              { label: "Entidad", text: "Clúster Español de Productores de Ganado Porcino (i+Porc)" },
              { label: "CIF", text: "G99539363" },
              { label: "Domicilio", text: "C/ María de Luna, 11 · 50018 Zaragoza (España)" },
              { label: "Teléfono", text: "{{tel:+34613722505|+34 613 72 25 05}}" },
            ],
          },
          {
            t: "p",
            text: "El Clúster Español de Productores de Ganado Porcino (i+Porc), como entidad titular del sitio y representante del Grupo Operativo PIGTATTOO, actúa como responsable del tratamiento de los datos recogidos a través del sitio web.",
          },
        ],
      },
      {
        title: "Finalidad y base jurídica",
        blocks: [
          {
            t: "ul",
            items: [
              "**Consultas del formulario de contacto:** atender y responder la solicitud remitida. Base jurídica: consentimiento de la persona interesada (art. 6.1.a RGPD), prestado al marcar la casilla de aceptación.",
              "**Analítica web:** obtener estadísticas agregadas de uso del sitio. Base jurídica: consentimiento prestado a través del banner de cookies. Puede consultarse el detalle en la {{cookies|política de cookies}}.",
            ],
          },
          {
            t: "p",
            text: "No se toman decisiones automatizadas ni se elaboran perfiles con los datos facilitados.",
          },
        ],
      },
      {
        title: "Datos tratados",
        blocks: [
          {
            t: "p",
            text: "A través del formulario de contacto se recogen nombre, dirección de correo electrónico, asunto y el contenido del mensaje. Se recomienda no incluir en el mensaje datos de categorías especiales ni información que no resulte necesaria para atender la consulta.",
          },
        ],
      },
      {
        title: "Plazo de conservación",
        blocks: [
          {
            t: "p",
            text: "Los datos se conservarán durante el tiempo necesario para atender la consulta y, posteriormente, mientras se mantengan obligaciones legales o de justificación de la ayuda pública asociada al proyecto. Transcurridos dichos plazos, los datos serán suprimidos o anonimizados.",
          },
        ],
      },
      {
        title: "Destinatarios y encargados del tratamiento",
        blocks: [
          {
            t: "p",
            text: "No se ceden datos a terceros salvo obligación legal. Para la prestación del servicio se recurre a proveedores que actúan como encargados del tratamiento, con los que se suscriben los correspondientes contratos conforme al artículo 28 del RGPD:",
          },
          {
            t: "ul",
            items: [
              "Netlify, Inc. — alojamiento del sitio web y gestión de los envíos del formulario.",
              "Contentful GmbH — gestión de los contenidos editoriales publicados.",
              "Google Ireland Ltd. — analítica web (Google Analytics 4), únicamente si se acepta el uso de cookies analíticas.",
            ],
          },
          {
            t: "p",
            text: "La coordinación técnica del Grupo Operativo (GEEZAR Soluciones S.L.) gestiona estos servicios por cuenta del responsable.",
          },
          {
            t: "p",
            text: "Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo. En tal caso, las transferencias internacionales se amparan en las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea o en decisiones de adecuación vigentes.",
          },
        ],
      },
      {
        title: "Derechos",
        blocks: [
          {
            t: "p",
            text: "Puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como retirar en cualquier momento el consentimiento prestado, dirigiéndose por escrito al responsable en la dirección indicada más arriba, acreditando su identidad. Asimismo, puede presentar una reclamación ante la Agencia Española de Protección de Datos ({{url:https://www.aepd.es|www.aepd.es}}) si considera que el tratamiento no se ajusta a la normativa vigente.",
          },
        ],
      },
      {
        title: "Seguridad",
        blocks: [
          {
            t: "p",
            text: "El responsable aplica las medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo, incluida la transmisión cifrada mediante HTTPS y el control de acceso a la información.",
          },
        ],
      },
    ],
  },

  cookies: {
    description:
      "Política de cookies de PIGTATTOO: cookies técnicas necesarias y cookies analíticas de Google Analytics 4 sujetas a consentimiento previo, con posibilidad de revocación.",
    intro: [],
    sections: [
      {
        title: "¿Qué es una cookie?",
        blocks: [
          {
            t: "p",
            text: "Una cookie es un pequeño archivo que se almacena en el dispositivo de la persona usuaria al visitar un sitio web y que permite recordar información sobre su navegación. También se equiparan a las cookies otras tecnologías de almacenamiento local del navegador.",
          },
        ],
      },
      {
        title: "Cookies utilizadas",
        blocks: [
          {
            t: "table",
            caption: "Relación de cookies y almacenamiento local utilizados en pigtattoo.es",
            head: ["Nombre", "Tipo", "Finalidad", "Duración"],
            rows: [
              [
                "pigtattoo.consent.v1",
                "Técnica (almacenamiento local, propia)",
                "Recordar la decisión sobre el uso de cookies analíticas.",
                "Hasta que se borre o se restablezca",
              ],
              [
                "_ga, _ga_*",
                "Analítica (terceros: Google Analytics 4)",
                "Distinguir usuarios y sesiones para obtener estadísticas agregadas de uso.",
                "Pendiente de confirmar",
              ],
            ],
          },
          {
            t: "note",
            text: "**Nota:** la configuración de Google Analytics 4 está pendiente de finalizar. El identificador de medición definitivo y la duración exacta de las cookies analíticas se publicarán en esta página antes de su activación. Hasta entonces, la analítica no se carga en ningún caso.",
          },
        ],
      },
      {
        title: "Consentimiento y revocación",
        blocks: [
          {
            t: "p",
            text: "Las cookies analíticas solo se instalan tras la aceptación expresa mediante el banner que se muestra en la primera visita. Puede rechazarlas sin que ello afecte al funcionamiento del sitio y modificar su decisión en cualquier momento desde el botón situado a continuación. También puede eliminar o bloquear las cookies desde la configuración de su navegador.",
          },
          { t: "consent" },
        ],
      },
      {
        title: "Tratamiento de datos y más información",
        blocks: [
          {
            t: "p",
            text: "No se utilizan cookies publicitarias, de perfilado ni de redes sociales. Puede consultar cómo se tratan los datos personales asociados en la {{privacidad|política de privacidad}} y los datos del titular en el {{aviso|aviso legal}}.",
          },
        ],
      },
    ],
  },

  accessibility: {
    description:
      "Declaración de accesibilidad del sitio web de PIGTATTOO: grado de conformidad con el RD 1112/2018 y la norma EN 301 549 (WCAG 2.1 AA).",
    intro: [
      "El consorcio PIGTATTOO se ha comprometido, con carácter voluntario, a hacer accesible su sitio web tomando como referencia el Real Decreto 1112/2018, de 7 de septiembre, sobre accesibilidad de los sitios web y aplicaciones para dispositivos móviles del sector público, que transpone la Directiva (UE) 2016/2102, y la norma EN 301 549 (equivalente a las WCAG 2.1 nivel AA). El sitio pertenece a una entidad privada y no está sujeto por sí mismo a dicha norma, pero se adopta como estándar de calidad al tratarse de un proyecto cofinanciado con fondos públicos.",
    ],
    sections: [
      {
        title: "Situación de cumplimiento",
        blocks: [
          {
            t: "p",
            text: "Este sitio web es **parcialmente conforme** con la norma EN 301 549 y las WCAG 2.1 nivel AA, debido a las excepciones y a la falta de conformidad de los aspectos que se indican a continuación. El sitio se encuentra en fase de desarrollo y de incorporación de contenidos.",
          },
        ],
      },
      {
        title: "Contenido no accesible",
        blocks: [
          {
            t: "ul",
            items: [
              "Algunos documentos técnicos descargables (entregables y materiales de difusión) podrán publicarse en formato PDF sin etiquetado completo de accesibilidad. Se facilitará una alternativa accesible a petición del usuario.",
              "Determinadas imágenes de cabecera son ilustrativas y provisionales; se sustituirán por material propio con textos alternativos definitivos.",
              "Las noticias publicadas desde el gestor de contenidos pueden incluir imágenes cuyo texto alternativo dependa de la carga editorial.",
            ],
          },
        ],
      },
      {
        title: "Medidas de accesibilidad aplicadas",
        blocks: [
          {
            t: "ul",
            items: [
              "Estructura semántica con un único encabezado principal por página y regiones de navegación, contenido y pie.",
              "Enlace de salto al contenido principal y foco visible en todos los elementos interactivos.",
              "Navegación completa mediante teclado y textos alternativos en las imágenes informativas.",
              "Descripción textual extendida del mapa de entidades del consorcio.",
              "Versiones completas del sitio en castellano, catalán e inglés con indicación del idioma en cada página.",
              "Contrastes de color revisados sobre la paleta corporativa y tipografías servidas desde el propio dominio.",
            ],
          },
        ],
      },
      {
        title: "Preparación de la declaración",
        blocks: [
          {
            t: "p",
            text: "Declaración elaborada el 1 de septiembre de 2026 mediante autoevaluación realizada por el equipo de desarrollo, con herramientas automáticas de análisis y revisión manual de navegación por teclado y estructura semántica. Se revisará periódicamente conforme avance el proyecto.",
          },
        ],
      },
      {
        title: "Observaciones y datos de contacto",
        blocks: [
          {
            t: "p",
            text: "Puede comunicar cualquier dificultad de acceso al contenido, solicitar información en un formato alternativo o presentar una queja relativa al cumplimiento de los requisitos de accesibilidad a través del {{contacto|formulario de contacto}} o por teléfono en el {{tel:+34613722505|+34 613 72 25 05}}.",
          },
          {
            t: "p",
            text: "Las comunicaciones serán atendidas directamente o derivadas a la coordinación técnica del Grupo Operativo (GEEZAR Soluciones S.L.), que informará del resultado en un plazo máximo de veinte días hábiles.",
          },
          {
            t: "p",
            text: "Si no obtiene respuesta o esta se considera insatisfactoria, puede reiterar su solicitud dirigiéndose a la entidad titular del sitio, Clúster Español de Productores de Ganado Porcino (C/ María de Luna, 11 · 50018 Zaragoza).",
          },
        ],
      },
    ],
  },
};

export default es;
