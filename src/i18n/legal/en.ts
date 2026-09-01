import type { LegalDict } from "./types";

/** Legal content in English. Same inline syntax as the Spanish version. */
const en: LegalDict = {
  notice: {
    description:
      "Legal notice for the PIGTATTOO Operational Group website: owner identification details, terms of use and intellectual property.",
    intro: [
      "In accordance with article 10 of Spanish Act 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSICE), the following identification details of the owner of this website are provided.",
    ],
    sections: [
      {
        title: "Website owner",
        blocks: [
          {
            t: "dl",
            items: [
              { label: "Name", text: "Spanish Cluster of Pig Producers (i+Porc)" },
              { label: "Tax ID", text: "G99539363" },
              { label: "Address", text: "C/ María de Luna, 11 · 50018 Zaragoza (Spain)" },
              { label: "Phone", text: "{{tel:+34613722505|+34 613 72 25 05}}" },
              { label: "Contact", text: "{{contacto|contact form}}" },
            ],
          },
        ],
      },
      {
        title: "Purpose of the website",
        blocks: [
          {
            t: "p",
            text: "This website is intended solely to provide information about the activities and results of the Supra-regional Operational Group PIGTATTOO, co-funded by the EAFRD (European Union) and the Spanish Ministry of Agriculture, Fisheries and Food under the CAP Strategic Plan 2023-2027. No e-commerce or online contracting activities are carried out through it.",
          },
        ],
      },
      {
        title: "Terms of use",
        blocks: [
          {
            t: "p",
            text: "Access to the website is free of charge. Users undertake to make diligent use of the site and its contents and to refrain from using them for unlawful purposes or in ways harmful to third parties. The owner does not guarantee continuous availability of the site and accepts no liability for damage arising from technical interruptions beyond its control, nor for the content of third-party sites linked from these pages.",
          },
        ],
      },
      {
        title: "Intellectual and industrial property",
        blocks: [
          {
            t: "p",
            text: "The contents of this site (texts, images, design, code and downloadable materials) belong to the owner or to the entities of the PIGTATTOO consortium, or are used with due authorisation. Partial reproduction is permitted for dissemination or teaching purposes provided that the source is cited and the content is not altered. The trademarks and logos of the participating entities are the property of their respective owners.",
          },
        ],
      },
      {
        title: "Applicable law",
        blocks: [
          {
            t: "p",
            text: "These terms are governed by Spanish law. Any dispute shall be submitted to the courts of the owner's domicile, unless consumer legislation provides for a different jurisdiction.",
          },
        ],
      },
      {
        title: "Photo credits",
        blocks: [
          {
            t: "ul",
            items: [
              "Home: Zoe Richardson (Unsplash)",
              "News: Marwen Larafa (Unsplash)",
              "Contact: David Vives (Unsplash)",
              "Project, Activities, Results and Materials and concept image: illustrations generated with artificial intelligence for the PIGTATTOO project.",
            ],
          },
        ],
      },
    ],
  },

  privacy: {
    description:
      "PIGTATTOO privacy policy: data controller, purpose, legal basis, recipients and how to exercise your rights under the GDPR and Spanish data protection law.",
    intro: [
      "In accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Act 3/2018 on the Protection of Personal Data and guarantee of digital rights (LOPDGDD), the following information is provided on the processing of personal data submitted through this website.",
    ],
    sections: [
      {
        title: "Data controller",
        blocks: [
          {
            t: "dl",
            items: [
              { label: "Entity", text: "Spanish Cluster of Pig Producers (i+Porc)" },
              { label: "Tax ID", text: "G99539363" },
              { label: "Address", text: "C/ María de Luna, 11 · 50018 Zaragoza (Spain)" },
              { label: "Phone", text: "{{tel:+34613722505|+34 613 72 25 05}}" },
            ],
          },
          {
            t: "p",
            text: "The Spanish Cluster of Pig Producers (i+Porc), as owner of the website and representative of the PIGTATTOO Operational Group, acts as controller of the data collected through this website.",
          },
        ],
      },
      {
        title: "Purpose and legal basis",
        blocks: [
          {
            t: "ul",
            items: [
              "**Contact form enquiries:** to handle and respond to the request submitted. Legal basis: consent of the data subject (art. 6.1.a GDPR), given by ticking the acceptance box.",
              "**Web analytics:** to obtain aggregated statistics on use of the site. Legal basis: consent given through the cookie banner. Details are available in the {{cookies|cookie policy}}.",
            ],
          },
          {
            t: "p",
            text: "No automated decision-making or profiling is carried out with the data provided.",
          },
        ],
      },
      {
        title: "Data processed",
        blocks: [
          {
            t: "p",
            text: "The contact form collects name, email address, subject and the content of the message. Please do not include special categories of data or information that is not necessary to handle the enquiry.",
          },
        ],
      },
      {
        title: "Retention period",
        blocks: [
          {
            t: "p",
            text: "Data will be kept for as long as necessary to handle the enquiry and, thereafter, while legal obligations or obligations to justify the public funding associated with the project remain in force. Once those periods have elapsed, data will be deleted or anonymised.",
          },
        ],
      },
      {
        title: "Recipients and processors",
        blocks: [
          {
            t: "p",
            text: "Data is not disclosed to third parties except where legally required. Service providers acting as data processors are engaged under the corresponding contracts pursuant to article 28 GDPR:",
          },
          {
            t: "ul",
            items: [
              "Netlify, Inc. — website hosting and management of form submissions.",
              "Contentful GmbH — management of published editorial content.",
              "Google Ireland Ltd. — web analytics (Google Analytics 4), only if analytics cookies are accepted.",
            ],
          },
          {
            t: "p",
            text: "The technical coordination of the Operational Group (GEEZAR Soluciones S.L.) manages these services on behalf of the controller.",
          },
          {
            t: "p",
            text: "Some of these providers may process data outside the European Economic Area. In such cases, international transfers are covered by the Standard Contractual Clauses approved by the European Commission or by adequacy decisions in force.",
          },
        ],
      },
      {
        title: "Your rights",
        blocks: [
          {
            t: "p",
            text: "You may exercise your rights of access, rectification, erasure, objection, restriction of processing and portability, and withdraw your consent at any time, by writing to the controller at the address given above and providing proof of identity. You may also lodge a complaint with the Spanish Data Protection Agency ({{url:https://www.aepd.es|www.aepd.es}}) if you consider that the processing does not comply with applicable law.",
          },
        ],
      },
      {
        title: "Security",
        blocks: [
          {
            t: "p",
            text: "The controller applies appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including encrypted transmission over HTTPS and access control to information.",
          },
        ],
      },
    ],
  },

  cookies: {
    description:
      "PIGTATTOO cookie policy: necessary technical cookies and Google Analytics 4 analytics cookies subject to prior consent, which may be withdrawn at any time.",
    intro: [],
    sections: [
      {
        title: "What is a cookie?",
        blocks: [
          {
            t: "p",
            text: "A cookie is a small file stored on the user's device when visiting a website, allowing information about their browsing to be remembered. Other browser local storage technologies are treated in the same way as cookies.",
          },
        ],
      },
      {
        title: "Cookies used",
        blocks: [
          {
            t: "table",
            caption: "Cookies and local storage used on pigtattoo.es",
            head: ["Name", "Type", "Purpose", "Duration"],
            rows: [
              [
                "pigtattoo.consent.v1",
                "Technical (local storage, first party)",
                "Remember the decision on the use of analytics cookies.",
                "Until deleted or reset",
              ],
              [
                "_ga, _ga_*",
                "Analytics (third party: Google Analytics 4)",
                "Distinguish users and sessions to obtain aggregated usage statistics.",
                "To be confirmed",
              ],
            ],
          },
          {
            t: "note",
            text: "**Note:** the Google Analytics 4 setup has not been finalised yet. The final measurement ID and the exact duration of the analytics cookies will be published on this page before activation. Until then, analytics is never loaded.",
          },
        ],
      },
      {
        title: "Consent and withdrawal",
        blocks: [
          {
            t: "p",
            text: "Analytics cookies are only installed after express acceptance through the banner shown on the first visit. You may reject them without affecting the operation of the site and change your decision at any time using the button below. You may also delete or block cookies from your browser settings.",
          },
          { t: "consent" },
        ],
      },
      {
        title: "Data processing and further information",
        blocks: [
          {
            t: "p",
            text: "No advertising, profiling or social media cookies are used. You can find out how the related personal data is processed in the {{privacidad|privacy policy}} and the owner's details in the {{aviso|legal notice}}.",
          },
        ],
      },
    ],
  },

  accessibility: {
    description:
      "Accessibility statement for the PIGTATTOO website: level of conformance with Spanish Royal Decree 1112/2018 and standard EN 301 549 (WCAG 2.1 AA).",
    intro: [
      "The PIGTATTOO consortium has voluntarily committed to making its website accessible, taking as a reference Spanish Royal Decree 1112/2018 of 7 September on the accessibility of public sector websites and mobile applications, which transposes Directive (EU) 2016/2102, and standard EN 301 549 (equivalent to WCAG 2.1 level AA). The site belongs to a private entity and is not itself subject to that legislation, but it is adopted as a quality standard as the project is co-funded with public money.",
    ],
    sections: [
      {
        title: "Compliance status",
        blocks: [
          {
            t: "p",
            text: "This website is **partially compliant** with standard EN 301 549 and WCAG 2.1 level AA, due to the exceptions and lack of conformance listed below. The site is under development and content is still being added.",
          },
        ],
      },
      {
        title: "Non-accessible content",
        blocks: [
          {
            t: "ul",
            items: [
              "Some downloadable technical documents (deliverables and dissemination materials) may be published as PDF files without full accessibility tagging. An accessible alternative will be provided on request.",
              "Certain header images are illustrative and provisional; they will be replaced with the project's own material and final alternative texts.",
              "News items published from the content management system may include images whose alternative text depends on editorial input.",
            ],
          },
        ],
      },
      {
        title: "Accessibility measures applied",
        blocks: [
          {
            t: "ul",
            items: [
              "Semantic structure with a single main heading per page and navigation, content and footer regions.",
              "Skip link to the main content and visible focus on all interactive elements.",
              "Full keyboard navigation and alternative texts on informative images.",
              "Extended text description of the consortium entities map.",
              "Complete versions of the site in Spanish, Catalan and English with the language indicated on every page.",
              "Colour contrast reviewed against the corporate palette, with fonts served from the site's own domain.",
            ],
          },
        ],
      },
      {
        title: "Preparation of this statement",
        blocks: [
          {
            t: "p",
            text: "This statement was prepared on 1 September 2026 through a self-assessment carried out by the development team, using automated analysis tools and manual review of keyboard navigation and semantic structure. It will be reviewed periodically as the project progresses.",
          },
        ],
      },
      {
        title: "Feedback and contact details",
        blocks: [
          {
            t: "p",
            text: "You may report any difficulty in accessing content, request information in an alternative format or submit a complaint regarding compliance with accessibility requirements through the {{contacto|contact form}} or by phone at {{tel:+34613722505|+34 613 72 25 05}}.",
          },
          {
            t: "p",
            text: "Enquiries will be handled directly or forwarded to the technical coordination of the Operational Group (GEEZAR Soluciones S.L.), which will report the outcome within a maximum of twenty working days.",
          },
          {
            t: "p",
            text: "If you receive no reply or consider the reply unsatisfactory, you may resubmit your request to the owner of the website, Spanish Cluster of Pig Producers (C/ María de Luna, 11 · 50018 Zaragoza).",
          },
        ],
      },
    ],
  },
};

export default en;
