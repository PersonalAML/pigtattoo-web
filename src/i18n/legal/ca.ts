import type { LegalDict } from "./types";

/** Contingut legal en català. Mateixa sintaxi en línia que la versió castellana. */
const ca: LegalDict = {
  notice: {
    description:
      "Avís legal del lloc web del Grup Operatiu PIGTATTOO: dades identificatives del titular, condicions d'ús i propietat intel·lectual.",
    intro: [
      "En compliment de l'article 10 de la Llei 34/2002, d'11 de juliol, de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSICE), es faciliten les dades identificatives següents del titular d'aquest lloc web.",
    ],
    sections: [
      {
        title: "Titular del lloc web",
        blocks: [
          {
            t: "dl",
            items: [
              { label: "Denominació", text: "Clúster Espanyol de Productors de Bestiar Porcí (i+Porc)" },
              { label: "CIF", text: "G99539363" },
              { label: "Domicili", text: "C/ María de Luna, 11 · 50018 Saragossa (Espanya)" },
              { label: "Telèfon", text: "{{tel:+34613722505|+34 613 72 25 05}}" },
              { label: "Contacte", text: "{{contacto|formulari de contacte}}" },
            ],
          },
        ],
      },
      {
        title: "Objecte del lloc",
        blocks: [
          {
            t: "p",
            text: "Aquest lloc web té una finalitat exclusivament informativa i divulgativa de les activitats i resultats del Grup Operatiu Supraautonòmic PIGTATTOO, cofinançat pel FEADER (Unió Europea) i el Ministeri d'Agricultura, Pesca i Alimentació en el marc del Pla Estratègic de la PAC 2023-2027. No s'hi duen a terme activitats de comerç electrònic ni de contractació en línia.",
          },
        ],
      },
      {
        title: "Condicions d'ús",
        blocks: [
          {
            t: "p",
            text: "L'accés al lloc web és lliure i gratuït. La persona usuària es compromet a fer un ús diligent del lloc i dels seus continguts, i s'absté d'utilitzar-los amb finalitats il·lícites o lesives per a tercers. El titular no garanteix la disponibilitat continuada del lloc ni es responsabilitza dels danys derivats d'interrupcions tècniques alienes al seu control, ni del contingut dels llocs de tercers als quals es pugui enllaçar des d'aquestes pàgines.",
          },
        ],
      },
      {
        title: "Propietat intel·lectual i industrial",
        blocks: [
          {
            t: "p",
            text: "Els continguts d'aquest lloc (textos, imatges, disseny, codi i materials descarregables) pertanyen al titular o a les entitats del consorci PIGTATTOO, o s'utilitzen amb la deguda autorització. Se'n permet la reproducció parcial amb finalitats divulgatives o docents sempre que se'n citi la font i no se n'alteri el contingut. Les marques i logotips de les entitats participants són propietat dels seus titulars respectius.",
          },
        ],
      },
      {
        title: "Legislació aplicable",
        blocks: [
          {
            t: "p",
            text: "Aquestes condicions es regeixen per la legislació espanyola. Per a qualsevol controvèrsia seran competents els jutjats i tribunals del domicili del titular, llevat que la normativa de consum disposi un altre fur.",
          },
        ],
      },
      {
        title: "Crèdits fotogràfics",
        blocks: [
          {
            t: "ul",
            items: [
              "Portada: Zoe Richardson (Unsplash)",
              "Actualitat: Marwen Larafa (Unsplash)",
              "Contacte: David Vives (Unsplash)",
              "Projecte, Activitats, Resultats i Materials i imatge de concepte: il·lustracions generades amb intel·ligència artificial per al projecte PIGTATTOO.",
            ],
          },
        ],
      },
    ],
  },

  privacy: {
    description:
      "Política de privadesa de PIGTATTOO: responsable del tractament, finalitat, base jurídica, destinataris i exercici de drets d'acord amb el RGPD i la LOPDGDD.",
    intro: [
      "En compliment del Reglament (UE) 2016/679, General de Protecció de Dades (RGPD), i de la Llei Orgànica 3/2018, de Protecció de Dades Personals i garantia dels drets digitals (LOPDGDD), s'informa del tractament de les dades personals facilitades a través d'aquest lloc web.",
    ],
    sections: [
      {
        title: "Responsable del tractament",
        blocks: [
          {
            t: "dl",
            items: [
              { label: "Entitat", text: "Clúster Espanyol de Productors de Bestiar Porcí (i+Porc)" },
              { label: "CIF", text: "G99539363" },
              { label: "Domicili", text: "C/ María de Luna, 11 · 50018 Saragossa (Espanya)" },
              { label: "Telèfon", text: "{{tel:+34613722505|+34 613 72 25 05}}" },
            ],
          },
          {
            t: "p",
            text: "El Clúster Espanyol de Productors de Bestiar Porcí (i+Porc), com a entitat titular del lloc i representant del Grup Operatiu PIGTATTOO, actua com a responsable del tractament de les dades recollides a través del lloc web.",
          },
        ],
      },
      {
        title: "Finalitat i base jurídica",
        blocks: [
          {
            t: "ul",
            items: [
              "**Consultes del formulari de contacte:** atendre i respondre la sol·licitud tramesa. Base jurídica: consentiment de la persona interessada (art. 6.1.a RGPD), prestat en marcar la casella d'acceptació.",
              "**Analítica web:** obtenir estadístiques agregades d'ús del lloc. Base jurídica: consentiment prestat mitjançant el bàner de galetes. Podeu consultar-ne el detall a la {{cookies|política de galetes}}.",
            ],
          },
          {
            t: "p",
            text: "No es prenen decisions automatitzades ni s'elaboren perfils amb les dades facilitades.",
          },
        ],
      },
      {
        title: "Dades tractades",
        blocks: [
          {
            t: "p",
            text: "A través del formulari de contacte es recullen el nom, l'adreça de correu electrònic, l'assumpte i el contingut del missatge. Es recomana no incloure en el missatge dades de categories especials ni informació que no resulti necessària per atendre la consulta.",
          },
        ],
      },
      {
        title: "Termini de conservació",
        blocks: [
          {
            t: "p",
            text: "Les dades es conservaran durant el temps necessari per atendre la consulta i, posteriorment, mentre es mantinguin obligacions legals o de justificació de l'ajut públic associat al projecte. Un cop transcorreguts aquests terminis, les dades se suprimiran o s'anonimitzaran.",
          },
        ],
      },
      {
        title: "Destinataris i encarregats del tractament",
        blocks: [
          {
            t: "p",
            text: "No es cedeixen dades a tercers llevat d'obligació legal. Per a la prestació del servei es recorre a proveïdors que actuen com a encarregats del tractament, amb els quals se subscriuen els contractes corresponents d'acord amb l'article 28 del RGPD:",
          },
          {
            t: "ul",
            items: [
              "Netlify, Inc. — allotjament del lloc web i gestió dels enviaments del formulari.",
              "Contentful GmbH — gestió dels continguts editorials publicats.",
              "Google Ireland Ltd. — analítica web (Google Analytics 4), únicament si s'accepta l'ús de galetes analítiques.",
            ],
          },
          {
            t: "p",
            text: "La coordinació tècnica del Grup Operatiu (GEEZAR Soluciones S.L.) gestiona aquests serveis per compte del responsable.",
          },
          {
            t: "p",
            text: "Alguns d'aquests proveïdors poden tractar dades fora de l'Espai Econòmic Europeu. En aquest cas, les transferències internacionals s'emparen en les Clàusules Contractuals Tipus aprovades per la Comissió Europea o en decisions d'adequació vigents.",
          },
        ],
      },
      {
        title: "Drets",
        blocks: [
          {
            t: "p",
            text: "Podeu exercir els drets d'accés, rectificació, supressió, oposició, limitació del tractament i portabilitat, així com retirar en qualsevol moment el consentiment prestat, adreçant-vos per escrit al responsable a l'adreça indicada més amunt i acreditant la vostra identitat. Així mateix, podeu presentar una reclamació davant l'Agència Espanyola de Protecció de Dades ({{url:https://www.aepd.es|www.aepd.es}}) si considereu que el tractament no s'ajusta a la normativa vigent.",
          },
        ],
      },
      {
        title: "Seguretat",
        blocks: [
          {
            t: "p",
            text: "El responsable aplica les mesures tècniques i organitzatives apropiades per garantir un nivell de seguretat adequat al risc, inclosa la transmissió xifrada mitjançant HTTPS i el control d'accés a la informació.",
          },
        ],
      },
    ],
  },

  cookies: {
    description:
      "Política de galetes de PIGTATTOO: galetes tècniques necessàries i galetes analítiques de Google Analytics 4 subjectes a consentiment previ, amb possibilitat de revocació.",
    intro: [],
    sections: [
      {
        title: "Què és una galeta?",
        blocks: [
          {
            t: "p",
            text: "Una galeta és un petit arxiu que s'emmagatzema al dispositiu de la persona usuària en visitar un lloc web i que permet recordar informació sobre la seva navegació. També s'equiparen a les galetes altres tecnologies d'emmagatzematge local del navegador.",
          },
        ],
      },
      {
        title: "Galetes utilitzades",
        blocks: [
          {
            t: "table",
            caption: "Relació de galetes i emmagatzematge local utilitzats a pigtattoo.es",
            head: ["Nom", "Tipus", "Finalitat", "Durada"],
            rows: [
              [
                "pigtattoo.consent.v1",
                "Tècnica (emmagatzematge local, pròpia)",
                "Recordar la decisió sobre l'ús de galetes analítiques.",
                "Fins que s'esborri o es restableixi",
              ],
              [
                "_ga, _ga_*",
                "Analítica (tercers: Google Analytics 4)",
                "Distingir usuaris i sessions per obtenir estadístiques agregades d'ús.",
                "Pendent de confirmar",
              ],
            ],
          },
          {
            t: "note",
            text: "**Nota:** la configuració de Google Analytics 4 està pendent de finalitzar. L'identificador de mesurament definitiu i la durada exacta de les galetes analítiques es publicaran en aquesta pàgina abans de la seva activació. Fins llavors, l'analítica no es carrega en cap cas.",
          },
        ],
      },
      {
        title: "Consentiment i revocació",
        blocks: [
          {
            t: "p",
            text: "Les galetes analítiques només s'instal·len després de l'acceptació expressa mitjançant el bàner que es mostra en la primera visita. Podeu rebutjar-les sense que això afecti el funcionament del lloc i modificar la vostra decisió en qualsevol moment des del botó situat a continuació. També podeu eliminar o bloquejar les galetes des de la configuració del vostre navegador.",
          },
          { t: "consent" },
        ],
      },
      {
        title: "Tractament de dades i més informació",
        blocks: [
          {
            t: "p",
            text: "No s'utilitzen galetes publicitàries, de perfilat ni de xarxes socials. Podeu consultar com es tracten les dades personals associades a la {{privacidad|política de privadesa}} i les dades del titular a l'{{aviso|avís legal}}.",
          },
        ],
      },
    ],
  },

  accessibility: {
    description:
      "Declaració d'accessibilitat del lloc web de PIGTATTOO: grau de conformitat amb el RD 1112/2018 i la norma EN 301 549 (WCAG 2.1 AA).",
    intro: [
      "El consorci PIGTATTOO s'ha compromès, amb caràcter voluntari, a fer accessible el seu lloc web prenent com a referència el Reial decret 1112/2018, de 7 de setembre, sobre accessibilitat dels llocs web i aplicacions per a dispositius mòbils del sector públic, que transposa la Directiva (UE) 2016/2102, i la norma EN 301 549 (equivalent a les WCAG 2.1 nivell AA). El lloc pertany a una entitat privada i no està subjecte per si mateix a aquesta norma, però s'adopta com a estàndard de qualitat en tractar-se d'un projecte cofinançat amb fons públics.",
    ],
    sections: [
      {
        title: "Situació de compliment",
        blocks: [
          {
            t: "p",
            text: "Aquest lloc web és **parcialment conforme** amb la norma EN 301 549 i les WCAG 2.1 nivell AA, a causa de les excepcions i de la manca de conformitat dels aspectes que s'indiquen a continuació. El lloc es troba en fase de desenvolupament i d'incorporació de continguts.",
          },
        ],
      },
      {
        title: "Contingut no accessible",
        blocks: [
          {
            t: "ul",
            items: [
              "Alguns documents tècnics descarregables (lliurables i materials de difusió) es podran publicar en format PDF sense etiquetatge complet d'accessibilitat. Es facilitarà una alternativa accessible a petició de l'usuari.",
              "Determinades imatges de capçalera són il·lustratives i provisionals; se substituiran per material propi amb textos alternatius definitius.",
              "Les notícies publicades des del gestor de continguts poden incloure imatges el text alternatiu de les quals depèn de la càrrega editorial.",
            ],
          },
        ],
      },
      {
        title: "Mesures d'accessibilitat aplicades",
        blocks: [
          {
            t: "ul",
            items: [
              "Estructura semàntica amb un únic encapçalament principal per pàgina i regions de navegació, contingut i peu.",
              "Enllaç de salt al contingut principal i focus visible en tots els elements interactius.",
              "Navegació completa mitjançant teclat i textos alternatius a les imatges informatives.",
              "Descripció textual estesa del mapa d'entitats del consorci.",
              "Versions completes del lloc en castellà, català i anglès amb indicació de l'idioma a cada pàgina.",
              "Contrastos de color revisats sobre la paleta corporativa i tipografies servides des del mateix domini.",
            ],
          },
        ],
      },
      {
        title: "Preparació de la declaració",
        blocks: [
          {
            t: "p",
            text: "Declaració elaborada l'1 de setembre de 2026 mitjançant autoavaluació feta per l'equip de desenvolupament, amb eines automàtiques d'anàlisi i revisió manual de navegació per teclat i estructura semàntica. Es revisarà periòdicament a mesura que avanci el projecte.",
          },
        ],
      },
      {
        title: "Observacions i dades de contacte",
        blocks: [
          {
            t: "p",
            text: "Podeu comunicar qualsevol dificultat d'accés al contingut, sol·licitar informació en un format alternatiu o presentar una queixa relativa al compliment dels requisits d'accessibilitat a través del {{contacto|formulari de contacte}} o per telèfon al {{tel:+34613722505|+34 613 72 25 05}}.",
          },
          {
            t: "p",
            text: "Les comunicacions seran ateses directament o derivades a la coordinació tècnica del Grup Operatiu (GEEZAR Soluciones S.L.), que informarà del resultat en un termini màxim de vint dies hàbils.",
          },
          {
            t: "p",
            text: "Si no obteniu resposta o aquesta es considera insatisfactòria, podeu reiterar la vostra sol·licitud adreçant-vos a l'entitat titular del lloc, Clúster Espanyol de Productors de Bestiar Porcí (C/ María de Luna, 11 · 50018 Saragossa).",
          },
        ],
      },
    ],
  },
};

export default ca;
