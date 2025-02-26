export interface Translation {
  metadata: {
    title: string;
    aboutUs: string;
  };
  navigation: {
    home: string;
    about: string;
    resume: string;
    certifications: string;
    skills: string;
    education: string;
    blog: string;
  };
  hero: {
    title: string;
    greeting: string;
    subtitle: string;
  };
  about: {
    title: string;
    content: string[];
  };
  resume: {
    title: string;
    experience: {
      title: string;
      company: string;
      period: string;
      description: string;
      location: string;
    }[];
  };
  education: {
    title: string;
    items: {
      title: string;
    }[];
  };
  certifications: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      issueDate: string;
      description: string;
      linkUrl: string;
      image: {
        src: string;
        alt: string;
        loading: string;
      };
    }[];
  };
  skills: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  blog: {
    title: string;
    information: string;
  };
}

export const supportedLanguages = ['en', 'nl', 'de', 'fr'] as const;

export function getTranslation(lang: string): Translation {
  return translations[lang] || translations['en'];
}

export const translations: Record<string, Translation> = {
  en: {
    metadata: {
      title: 'About me',
      aboutUs: 'About us',
    },
    navigation: {
      home: 'Home',
      about: 'About',
      resume: 'Resume',
      certifications: 'Certifications',
      skills: 'Skills',
      education: 'Education',
      blog: 'Blog',
    },
    hero: {
      title: 'Simplifying Systems, Amplifying Results',
      greeting: 'Hi! I am Richard Bergsma.',
      subtitle: 'I automate workflows with Power Automate, build smart chatbots in Copilot Studio, and connect systems through seamless API integrations. From optimizing IT infrastructure and managing global environments to enhancing collaboration with SharePoint and Azure, I streamline processes to make technology work smarter—all while leveling up my Python skills.',
    },
    about: {
      title: 'About me',
      content: [
        'With over 15 years of IT experience, I am a passionate IT Systems and Automation Manager who thrives on delivering optimal solutions for complex cloud and on-premise systems. I focus on driving automation with Power Automate, building intelligent chatbots in Copilot Studio, and integrating APIs to streamline workflows. I also manage the Microsoft 365 environment, support 3rd line requests, and enhance efficiency with tools like Power Apps, Nexthink, and TOPdesk.',
        'Previously, I led Microsoft 365 and SharePoint Online implementations, migrated mail systems, and improved automation with SCCM. Additionally, I founded Bergsma IT, helping small businesses move to the cloud and managing tailored WordPress websites.',
        'I hold certifications in Microsoft Teams Administration, Azure Fundamentals, and Nexthink Administration. My mission is to drive IT excellence by optimizing cloud solutions, automating processes, and providing outstanding technical support.'
      ],
    },
    resume: {
      title: 'Work experience',
      experience: [
        {
          title: 'IT Systems and Automation Manager',
          company: 'COFRA Holding C.V.',
          location: 'Amsterdam',
          period: '02-2025 - Present',
          description: 'As the IT Systems and Automation Manager at COFRA Holding, I focus on driving automation through Power Automate and building advanced chatbots in Copilot Studio to streamline processes and enhance operational efficiency. My work involves integrating APIs to create seamless workflows, automating recurring tasks, and supporting digital transformation initiatives. In addition to my automation responsibilities, I continue to manage our Microsoft 365 environment, support 3rd line requests, develop Power Apps, oversee our Nexthink environment, manage TOPdesk, and contribute to various IT projects as needed.',
        },
        {
          title: 'Office 365 Professional',
          company: 'COFRA Holding C.V.',
          location: 'Amsterdam',
          period: '08-2020 - 01-2025',
          description: 'As the Microsoft 365 expert within COFRA Holding, I ensure that the environment is managed, new features are communicated, and colleagues are supported with 3rd line requests. New requests that come to me range from new Power Automate flows to Power Apps. Additionally, I focus on the setup and management of our Nexthink environment, manage TopDesk, and support other projects as required. Lately, I\'ve been concentrating on leveraging Power Automate to enhance automation across various areas.',
        },
        {
          title: 'Cloud systems and Application Engineer',
          company: 'Hyva',
          location: 'Alphen aan den Rijn',
          period: '09-2018 - 04-2020',
          description: 'Managed global IT infrastructure across 35 countries, driving the implementation and integration of Office 365 and SharePoint Online to enhance collaboration. Led seamless migrations from diverse mail systems to Office 365, improving communication efficiency and reliability. Spearheaded the consolidation of global IT operations by replacing two data centers, setting up and optimizing Azure environments, and managing costs effectively. Implemented SCCM to automate key processes, boosting service desk efficiency. Provided third-line support via TOPdesk, resolving complex IT issues and ensuring high service quality.',
        },
        {
          title: 'IT Consultant',
          company: 'Bergsma.IT',
          location: 'Zoetermeer',
          period: '01-2018 - 07-2019',
          description: 'Founded the company to help small businesses modernize their IT infrastructure through cloud-based solutions, focusing on Microsoft technologies to enhance efficiency, scalability, and collaboration. Successfully executed email and file server migrations to Microsoft cloud platforms, provided ongoing technical support, and designed tailored WordPress websites. Streamlined workflows with Microsoft 365 and delivered customized IT solutions aligned with clients\' business goals.',
        },
        {
          title: 'Technical Application Engineer SharePoint',
          company: 'Allseas',
          location: 'Delft',
          period: '04-2018 - 09-2018',
          description: 'Managed and optimized SharePoint 2013 and SharePoint Online environments to support collaboration and productivity. Created and customized SharePoint sites, implemented workflows, and provided expert support for Cadac Organice. Worked closely with stakeholders to deliver tailored solutions, ensuring secure, up-to-date, and high-performing SharePoint systems.',
        },
        {
          title: 'IT System Administrator',
          company: 'OZ Export',
          location: 'De Kwakel',
          period: '10-2015 - 12-2017',
          description: 'Managed and maintained the organization\'s IT infrastructure to ensure system reliability and seamless operations. Oversaw servers, client PCs, portable scanners, and printers, optimizing performance and minimizing downtime. Configured VoIP systems, managed network switches, and administered Citrix environments for secure remote access. Installed and supported on-premise SharePoint environments to enhance collaboration. Designed and maintained the organization\'s surveillance system and helpdesk platform, streamlining IT support and strengthening security. Provided hands-on troubleshooting for hardware, software, and network issues to support daily operations.',
        }
      ],
    },
    education: {
      title: 'Education',
      items: [
        {
          title: `Bachelor of Applied Science - BASc, Mechatronics, Robotics, and Automation Engineering<br /> <span class="font-normal">De Haagse Hogeschool / The Hague University of Applied Sciences</span> <br /> <span class="text-sm font-normal">2011 - 2013</span>`,
        },
        {
          title: `Bachelor of Applied Science - BASc, Information Technology<br /> <span class="font-normal">De Haagse Hogeschool / The Hague University of Applied Sciences</span> <br /> <span class="text-sm font-normal">2011 - 2011</span>`,
        },
        {
          title: `Associate's degree, Information Technology<br /> <span class="font-normal">ID College</span> <br /> <span class="text-sm font-normal">2007 - 2011</span>`,
        },
      ],
    },
    certifications: {
      title: 'Certifications',
      subtitle: 'Where Knowledge Meets Recognition',
      items: [
        {
          name: 'Certified Nexthink Professional',
          issueDate: 'Date Issued: 01-2025',
          description: 'Earning the Nexthink Certified Application Experience Management certification validates the expertise in optimizing application performance, ensuring seamless user adoption, and driving cost efficiency.',
          linkUrl: 'https://certified.nexthink.com/babd1e3a-c593-4a81-90a2-6a002f43e692#acc.fUOog9dj',
          image: {
            src: '/images/certificates/CertifiedNexthinkProfessionalinApplicationExperienceManagement.webp',
            alt: 'Nexthink Professional in Application Experience Management badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Certified Nexthink Administrator',
          issueDate: 'Date Issued: 11-2024',
          description: 'Earning the Nexthink Platform Administration certification demonstrates proficiency in configuring and customizing the Nexthink Platform to meet organizational needs.',
          linkUrl: 'https://certified.nexthink.com/8bfc61f2-31b8-45d8-82e7-e4a1df2b915d#acc.7eo6pFxb',
          image: {
            src: '/images/certificates/NexthinkAdministrator.webp',
            alt: 'Nexthink Administrator badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Certified Nexthink Associate',
          issueDate: 'Date Issued: 11-2024',
          description: 'Earning the Nexthink Infinity Fundamentals certification validates your understanding of the Nexthink Infinity platform and its role in enhancing digital employee experience.',
          linkUrl: 'https://certified.nexthink.com/cf5e9e43-9d95-4dc6-bb95-0f7e0bada9b3#acc.YWDnxiaU',
          image: {
            src: '/images/certificates/NexthinkAssociate.webp',
            alt: 'Nexthink Associate badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Python Programmer (PCEP)',
          issueDate: 'Date Issued: 11-2023',
          description: 'Earning the PCEP™ certification demonstrates proficiency in fundamental Python programming concepts, including data types, control flow, data collections, functions, and exception handling.',
          linkUrl: 'https://pythoninstitute.org/pcep',
          image: {
            src: '/images/certificates/PCEP.webp',
            alt: 'PCEP™ – Certified Entry-Level Python Programmer badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Desktop Administrator Associate',
          issueDate: 'Date Issued: 06-2023',
          description: 'Earning the Modern Desktop Administrator Associate certification demonstrates proficiency in deploying, configuring, securing, managing, and monitoring devices and client applications within an enterprise environment.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/?practice-assessment-type=certification',
          image: {
            src: '/images/certificates/microsoft-certified-associate-badge.webp',
            alt: 'Microsoft Certified Associate badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Microsoft 365 Fundamentals',
          issueDate: 'Date Issued: 05-2023',
          description: 'Earning the Microsoft 365 Certified: Fundamentals certification demonstrates foundational knowledge of cloud-based solutions, including productivity, collaboration, security, compliance, and Microsoft 365 services.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/microsoft-365-fundamentals/?practice-assessment-type=certification',
          image: {
            src: '/images/certificates/microsoft-certified-fundamentals-badge.webp',
            alt: 'Microsoft 365 Fundamentals badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Teams Administrator Associate',
          issueDate: 'Date Issued: 06-2021',
          description: 'Earning the Teams Administrator Associate certification demonstrates your ability to plan, deploy, configure, and manage Microsoft Teams to facilitate efficient collaboration and communication within a Microsoft 365 environment.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/m365-teams-administrator-associate/?practice-assessment-type=certification',
          image: {
            src: '/src/assets/images/microsoft-certified-associate-badge.webp',
            alt: 'Microsoft Certified Associate badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Azure Fundamentals',
          issueDate: 'Date Issued: 01-2020',
          description: 'Earning the Microsoft Certified: Azure Fundamentals certification demonstrates foundational knowledge of cloud concepts, core Azure services, and Azure management and governance features and tools.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification',
          image: {
            src: '/src/assets/images/microsoft-certified-fundamentals-badge.webp',
            alt: 'Azure Fundamentals badge',
            loading: 'lazy',
          },
        },
      ],
    },
    skills: {
      title: 'Skills',
      subtitle: 'Discover the proficiencies that allow me to bring imagination to life through design.',
      items: [
        {
          title: 'Power Automate',
          description: 'Expertise in designing and implementing advanced automation workflows using Microsoft Power Automate to streamline business processes, reduce manual effort, and enhance operational efficiency.',
        },
        {
          title: 'Copilot Studio',
          description: 'Proficiency in developing intelligent chatbots within Copilot Studio, enabling enhanced user interactions and support through natural language processing and automated responses.',
        },
        {
          title: 'API Integrations',
          description: 'Skilled in creating custom connectors and integrating various applications and services via APIs to facilitate seamless data exchange and process automation across platforms.',
        },
        {
          title: 'Microsoft 365 Administration',
          description: 'Comprehensive experience in managing Microsoft 365 environments, including user management, security configurations, and service optimization to support global collaboration and productivity.',
        },
        {
          title: 'SharePoint Online & On-Premise',
          description: 'Adept at setting up, managing, and optimizing both SharePoint Online and on-premise deployments, ensuring effective document management, collaboration, and information sharing within organizations.',
        },
        {
          title: 'Nexthink Administration',
          description: 'Proficient in administering the Nexthink platform, utilizing its capabilities for IT infrastructure monitoring, executing remote actions, and developing workflows to enhance IT service delivery and user experience.',
        },
        {
          title: 'Microsoft Power Apps',
          description: 'Proficient in utilizing Microsoft Power Apps to design and develop custom business applications with minimal coding. Experienced in creating both canvas and model-driven apps that connect to various data sources.',
        },
        {
          title: 'IT Infrastructure Management',
          description: 'Extensive experience overseeing global IT infrastructures, managing servers, networks, and end-user devices across multiple countries to ensure reliable and efficient IT operations.',
        },
        {
          title: 'ITSM (TOPDesk)',
          description: 'Experienced in managing ITSM processes using TOPdesk. Proficient in core functionalities such as Incident Management and Asset Management, while leveraging API usage for seamless integrations with other systems.',
        },
        {
          title: 'PowerShell',
          description: 'Proficient in utilizing PowerShell for automation, system administration, and configuration management across Microsoft environments. Experienced in creating robust scripts for task automation, system monitoring, and integration with various Microsoft services.',
        },
        {
          title: 'Intune Device Management',
          description: 'Skilled in deploying, configuring, and managing Windows 10/11 devices through Microsoft Intune. Experienced in creating and implementing device policies, application deployment, and security configurations for enterprise environments.',
        },
        {
          title: '3rd Line IT Support',
          description: 'Experienced in providing advanced technical support for complex IT issues that require in-depth knowledge and specialized expertise. Proficient in troubleshooting, diagnosing, and resolving critical system problems across various platforms and applications.',
        },
      ],
    },
    blog: {
      title: 'Explore my insightful articles on my blog',
      information: 'Welcome to my blog, where I share insights, tips, and solutions on Microsoft 365, Nexthink, Power Automate, PowerShell, and other automation tools. Whether you\'re looking to streamline workflows, enhance productivity, or dive into technical problem-solving, you\'ll find practical content to support your journey.',
    },
  },
  nl: {
    metadata: {
      title: 'Over mij',
      aboutUs: 'Over ons',
    },
    navigation: {
      home: 'Home',
      about: 'Over',
      resume: 'CV',
      certifications: 'Certificeringen',
      skills: 'Vaardigheden',
      education: 'Opleiding',
      blog: 'Blog',
    },
    hero: {
      title: 'Systemen vereenvoudigen, Resultaten versterken',
      greeting: 'Hoi! Ik ben Richard Bergsma.',
      subtitle: 'Ik automatiseer werkstromen met Power Automate, bouw slimme chatbots in Copilot Studio en verbind systemen via naadloze API-integraties. Van het optimaliseren van IT-infrastructuur en het beheren van wereldwijde omgevingen tot het verbeteren van samenwerking met SharePoint en Azure, stroomlijn ik processen om technologie slimmer te laten werken – terwijl ik mijn Python-vaardigheden verder ontwikkel.',
    },
    about: {
      title: 'Over mij',
      content: [
        'Met meer dan 15 jaar IT-ervaring ben ik een gepassioneerde IT-systemen- en automatiseringsmanager die uitblinkt in het leveren van optimale oplossingen voor complexe cloud- en on-premise systemen. Ik richt mij op het stimuleren van automatisering met Power Automate, het bouwen van intelligente chatbots in Copilot Studio en het integreren van API\'s om werkstromen te stroomlijnen. Ik beheer ook de Microsoft 365-omgeving, ondersteun derde-lijnsaanvragen en verhoog de efficiëntie met tools zoals Power Apps, Nexthink en TOPdesk.',
        'Vroeger leidde ik de implementaties van Microsoft 365 en SharePoint Online, migreerde ik mailsystemen en verbeterde ik de automatisering met SCCM. Daarnaast richtte ik Bergsma IT op, waarmee ik kleine bedrijven hielp de overstap naar de cloud te maken en beheer ik op maat gemaakte WordPress-websites.',
        'Ik ben gecertificeerd in Microsoft Teams Administration, Azure Fundamentals en Nexthink Administration. Mijn missie is IT-excellentie te bevorderen door het optimaliseren van cloudoplossingen, het automatiseren van processen en het leveren van uitstekende technische ondersteuning.'
      ],
    },
    resume: {
      title: 'Werkervaring',
      experience: [
        {
          title: 'IT-systemen en automatiseringsmanager',
          company: 'COFRA Holding C.V.',
          location: 'Amsterdam',
          period: '02-2025 - Heden',
          description: 'Als IT-systemen en automatiseringsmanager bij COFRA Holding richt ik mij op het stimuleren van automatisering met Power Automate en het bouwen van geavanceerde chatbots in Copilot Studio om processen te stroomlijnen en de operationele efficiëntie te verbeteren. Mijn werk omvat het integreren van API\'s om naadloze werkstromen te creëren, het automatiseren van terugkerende taken en het ondersteunen van digitale transformatie-initiatieven. Naast mijn verantwoordelijkheden op het gebied van automatisering beheer ik onze Microsoft 365-omgeving, ondersteun ik derde-lijnsaanvragen, ontwikkel ik Power Apps, houd ik toezicht op onze Nexthink-omgeving, beheer ik TOPdesk en draag ik bij aan diverse IT-projecten waar nodig.',
        },
        {
          title: 'Office 365 Professional',
          company: 'COFRA Holding C.V.',
          location: 'Amsterdam',
          period: '08-2020 - 01-2025',
          description: 'Als de Microsoft 365-expert binnen COFRA Holding zorg ik ervoor dat de omgeving wordt beheerd, nieuwe functies worden gecommuniceerd en collega\'s worden ondersteund bij derde-lijnsaanvragen. Nieuwe aanvragen variëren van nieuwe Power Automate-stromen tot Power Apps. Daarnaast richt ik mij op de opzet en het beheer van onze Nexthink-omgeving, beheer ik TOPdesk en ondersteun ik andere projecten waar nodig. De laatste tijd concentreer ik mij op het benutten van Power Automate om de automatisering op verschillende gebieden te verbeteren.',
        },
        {
          title: 'Cloudsystemen- en applicatie-ingenieur',
          company: 'Hyva',
          location: 'Alphen aan den Rijn',
          period: '09-2018 - 04-2020',
          description: 'Beheerde de wereldwijde IT-infrastructuur in 35 landen en stimuleerde de implementatie en integratie van Office 365 en SharePoint Online om de samenwerking te verbeteren. Leidde naadloze migraties van diverse mailsystemen naar Office 365, waardoor de communicatie-efficiëntie en betrouwbaarheid werden verbeterd. Stuurde de consolidatie van wereldwijde IT-operaties door vervanging van twee datacenters, het opzetten en optimaliseren van Azure-omgevingen en het effectief beheren van kosten. Implementeerde SCCM om belangrijke processen te automatiseren, wat de efficiëntie van de servicedesk verhoogde. Bood derde-lijnsondersteuning via TOPdesk, loste complexe IT-problemen op en zorgde voor hoge servicekwaliteit.',
        },
        {
          title: 'IT-consultant',
          company: 'Bergsma.IT',
          location: 'Zoetermeer',
          period: '01-2018 - 07-2019',
          description: 'Richtte het bedrijf op om kleine bedrijven te helpen hun IT-infrastructuur te moderniseren via cloudoplossingen, met de focus op Microsoft-technologieën om efficiëntie, schaalbaarheid en samenwerking te verbeteren. Voerde met succes e-mail- en bestandserversmigraties uit naar Microsoft-cloudplatforms, bood doorlopende technische ondersteuning en ontwierp op maat gemaakte WordPress-websites. Stroomlijnde werkstromen met Microsoft 365 en leverde aangepaste IT-oplossingen die aansloten op de bedrijfsdoelen van de klanten.',
        },
        {
          title: 'Technisch applicatie-ingenieur SharePoint',
          company: 'Allseas',
          location: 'Delft',
          period: '04-2018 - 09-2018',
          description: 'Beheerde en optimaliseerde SharePoint 2013- en SharePoint Online-omgevingen om samenwerking en productiviteit te ondersteunen. Creëerde en paste SharePoint-sites aan, implementeerde workflows en bood deskundige ondersteuning voor Cadac Organice. Werkte nauw samen met belanghebbenden om op maat gemaakte oplossingen te leveren, waarmee veilige, actuele en hoogpresterende SharePoint-systemen werden gegarandeerd.',
        },
        {
          title: 'IT-systeembeheerder',
          company: 'OZ Export',
          location: 'De Kwakel',
          period: '10-2015 - 12-2017',
          description: 'Beheerde en onderhield de IT-infrastructuur van de organisatie om de betrouwbaarheid van systemen en naadloze operaties te waarborgen. Toezicht gehouden op servers, client-pc\'s, draagbare scanners en printers, waarbij de prestaties werden geoptimaliseerd en de uitvaltijd werd geminimaliseerd. Configureerde VoIP-systemen, beheerde netwerk switches en administreerde Citrix-omgevingen voor veilige externe toegang. Installeerde en ondersteunde on-premise SharePoint-omgevingen om samenwerking te bevorderen. Ontwierp en onderhield het bewakingssysteem en de helpdesk van de organisatie, waardoor IT-ondersteuning werd gestroomlijnd en de beveiliging werd versterkt. Bood praktische probleemoplossing voor hardware-, software- en netwerkproblemen om de dagelijkse operaties te ondersteunen.',
        }
      ],
    },
    education: {
      title: 'Opleiding',
      items: [
        {
          title: `Bachelor of Applied Science - BASc, Mechatronica, Robotica en Automatiseringstechniek<br /> <span class="font-normal">De Haagse Hogeschool / The Hague University of Applied Sciences</span> <br /> <span class="text-sm font-normal">2011 - 2013</span>`,
        },
        {
          title: `Bachelor of Applied Science - BASc, Informatietechnologie<br /> <span class="font-normal">De Haagse Hogeschool / The Hague University of Applied Sciences</span> <br /> <span class="text-sm font-normal">2011 - 2011</span>`,
        },
        {
          title: `Associate's degree, Informatietechnologie<br /> <span class="font-normal">ID College</span> <br /> <span class="text-sm font-normal">2007 - 2011</span>`,
        },
      ],
    },
    certifications: {
      title: 'Certificeringen',
      subtitle: 'Waar kennis op erkenning stuit',
      items: [
        {
          name: 'Certified Nexthink Professional',
          issueDate: 'Datum van afgifte: 01-2025',
          description: 'Het behalen van de Nexthink Certified Application Experience Management-certificering bevestigt de expertise in het optimaliseren van applicatieprestaties, het zorgen voor een naadloze gebruikersacceptatie en het bevorderen van kostenefficiëntie.',
          linkUrl: 'https://certified.nexthink.com/babd1e3a-c593-4a81-90a2-6a002f43e692#acc.fUOog9dj',
          image: {
            src: '/images/certificates/CertifiedNexthinkProfessionalinApplicationExperienceManagement.webp',
            alt: 'Nexthink Professional in Application Experience Management badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Certified Nexthink Administrator',
          issueDate: 'Datum van afgifte: 11-2024',
          description: 'Het behalen van de Nexthink Platform Administration-certificering toont aan dat men bekwaam is in het configureren en aanpassen van het Nexthink-platform om aan de behoeften van de organisatie te voldoen.',
          linkUrl: 'https://certified.nexthink.com/8bfc61f2-31b8-45d8-82e7-e4a1df2b915d#acc.7eo6pFxb',
          image: {
            src: '/images/certificates/NexthinkAdministrator.webp',
            alt: 'Nexthink Administrator badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Certified Nexthink Associate',
          issueDate: 'Datum van afgifte: 11-2024',
          description: 'Het behalen van de Nexthink Infinity Fundamentals-certificering bevestigt uw begrip van het Nexthink Infinity-platform en de rol ervan bij het verbeteren van de digitale werknemerservaring.',
          linkUrl: 'https://certified.nexthink.com/cf5e9e43-9d95-4dc6-bb95-0f7e0bada9b3#acc.YWDnxiaU',
          image: {
            src: '/images/certificates/NexthinkAssociate.webp',
            alt: 'Nexthink Associate badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Python Programmer (PCEP)',
          issueDate: 'Datum van afgifte: 11-2023',
          description: 'Het behalen van de PCEP™-certificering toont aan dat men bedreven is in de fundamentele concepten van Python-programmering, waaronder datatypes, controleflow, gegevensverzamelingen, functies en foutafhandeling.',
          linkUrl: 'https://pythoninstitute.org/pcep',
          image: {
            src: '/images/certificates/PCEP.webp',
            alt: 'PCEP™ – Badge voor gecertificeerde beginnende Python-programmeur',
            loading: 'lazy',
          },
        },
        {
          name: 'Desktop Administrator Associate',
          issueDate: 'Datum van afgifte: 06-2023',
          description: 'Het behalen van de Modern Desktop Administrator Associate-certificering toont aan dat men bedreven is in het implementeren, configureren, beveiligen, beheren en monitoren van apparaten en clientapplicaties binnen een bedrijfsomgeving.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/?practice-assessment-type=certification',
          image: {
            src: '/images/certificates/microsoft-certified-associate-badge.webp',
            alt: 'Microsoft Certified Associate badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Microsoft 365 Fundamentals',
          issueDate: 'Datum van afgifte: 05-2023',
          description: 'Het behalen van de Microsoft 365 Certified: Fundamentals-certificering toont fundamentele kennis van cloudgebaseerde oplossingen, waaronder productiviteit, samenwerking, beveiliging, compliance en Microsoft 365-diensten.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/microsoft-365-fundamentals/?practice-assessment-type=certification',
          image: {
            src: '/images/certificates/microsoft-certified-fundamentals-badge.webp',
            alt: 'Microsoft 365 Fundamentals badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Teams Administrator Associate',
          issueDate: 'Datum van afgifte: 06-2021',
          description: 'Het behalen van de Teams Administrator Associate-certificering toont aan dat u in staat bent om Microsoft Teams te plannen, implementeren, configureren en beheren om efficiënte samenwerking en communicatie binnen een Microsoft 365-omgeving te faciliteren.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/m365-teams-administrator-associate/?practice-assessment-type=certification',
          image: {
            src: '/src/assets/images/microsoft-certified-associate-badge.webp',
            alt: 'Microsoft Certified Associate badge',
            loading: 'lazy',
          },
        },
        {
          name: 'Azure Fundamentals',
          issueDate: 'Datum van afgifte: 01-2020',
          description: 'Het behalen van de Microsoft Certified: Azure Fundamentals-certificering toont fundamentele kennis van cloudconcepten, kern-Azure-diensten en Azure-beheer- en governancefuncties en -hulpmiddelen.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification',
          image: {
            src: '/src/assets/images/microsoft-certified-fundamentals-badge.webp',
            alt: 'Azure Fundamentals badge',
            loading: 'lazy',
          },
        },
      ],
    },
    skills: {
      title: 'Vaardigheden',
      subtitle: 'Ontdek de vaardigheden die mij in staat stellen om verbeelding tot leven te brengen door middel van ontwerp.',
      items: [
        {
          title: 'Power Automate',
          description: 'Expertise in het ontwerpen en implementeren van geavanceerde automatiseringsworkflows met Microsoft Power Automate om bedrijfsprocessen te stroomlijnen, handmatige inspanning te verminderen en operationele efficiëntie te verbeteren.',
        },
        {
          title: 'Copilot Studio',
          description: 'Vaardigheid in het ontwikkelen van intelligente chatbots binnen Copilot Studio, waardoor verbeterde gebruikersinteracties en ondersteuning mogelijk worden gemaakt via natuurlijke taalverwerking en geautomatiseerde antwoorden.',
        },
        {
          title: 'API-integraties',
          description: 'Bekwaam in het creëren van aangepaste connectoren en het integreren van verschillende applicaties en diensten via API\'s om naadloze gegevensuitwisseling en procesautomatisering tussen platforms mogelijk te maken.',
        },
        {
          title: 'Microsoft 365-beheer',
          description: 'Uitgebreide ervaring in het beheren van Microsoft 365-omgevingen, inclusief gebruikersbeheer, beveiligingsconfiguraties en service-optimalisatie om wereldwijde samenwerking en productiviteit te ondersteunen.',
        },
        {
          title: 'SharePoint Online & On-Premise',
          description: 'Bedreven in het opzetten, beheren en optimaliseren van zowel SharePoint Online als on-premise implementaties, waarbij effectief documentbeheer, samenwerking en informatie-uitwisseling binnen organisaties wordt gewaarborgd.',
        },
        {
          title: 'Nexthink-beheer',
          description: 'Bekwaam in het beheren van het Nexthink-platform, gebruikmakend van de mogelijkheden voor IT-infrastructuurmonitoring, het uitvoeren van externe acties en het ontwikkelen van workflows om IT-serviceverlening en gebruikerservaring te verbeteren.',
        },
        {
          title: 'Microsoft Power Apps',
          description: 'Bekwaam in het gebruik van Microsoft Power Apps voor het ontwerpen en ontwikkelen van aangepaste bedrijfsapplicaties met minimale codering. Ervaren in het maken van zowel canvas- als modelgestuurde apps die verbinding maken met verschillende gegevensbronnen.',
        },
        {
          title: 'IT-infrastructuurbeheer',
          description: 'Uitgebreide ervaring in het toezicht houden op wereldwijde IT-infrastructuren, het beheren van servers, netwerken en eindgebruikersapparaten in meerdere landen om betrouwbare en efficiënte IT-operaties te waarborgen.',
        },
        {
          title: 'ITSM (TOPDesk)',
          description: 'Ervaren in het beheren van ITSM-processen met TOPdesk. Bekwaam in kernfunctionaliteiten zoals Incident Management en Asset Management, waarbij API-gebruik wordt benut voor naadloze integraties met andere systemen.',
        },
        {
          title: 'PowerShell',
          description: 'Bekwaam in het gebruik van PowerShell voor automatisering, systeembeheer en configuratiebeheer in Microsoft-omgevingen. Ervaren in het maken van robuuste scripts voor taakautomatisering, systeemmonitoring en integratie met verschillende Microsoft-diensten.',
        },
        {
          title: 'Intune Apparaatbeheer',
          description: 'Bekwaam in het implementeren, configureren en beheren van Windows 10/11-apparaten via Microsoft Intune. Ervaren in het maken en implementeren van apparaatbeleid, applicatie-implementatie en beveiligingsconfiguraties voor bedrijfsomgevingen.',
        },
        {
          title: '3e Lijns IT-ondersteuning',
          description: 'Ervaren in het bieden van geavanceerde technische ondersteuning voor complexe IT-problemen die diepgaande kennis en gespecialiseerde expertise vereisen. Bekwaam in het oplossen, diagnosticeren en verhelpen van kritieke systeemproblemen op verschillende platforms en applicaties.',
        },
      ],
    },
    blog: {
      title: 'Ontdek mijn inzichtelijke artikelen op mijn blog',
      information: 'Welkom op mijn blog, waar ik inzichten, tips en oplossingen deel over Microsoft 365, Nexthink, Power Automate, PowerShell en andere automatiseringstools. Of je nu werkstromen wilt stroomlijnen, productiviteit wilt verhogen of wilt duiken in technische probleemoplossing, je vindt hier praktische content om je reis te ondersteunen.',
    },
  },
  de: {
    metadata: {
      title: 'Über mich',
      aboutUs: 'Über uns',
    },
    navigation: {
      home: 'Start',
      about: 'Über',
      resume: 'Lebenslauf',
      certifications: 'Zertifizierungen',
      skills: 'Fähigkeiten',
      education: 'Ausbildung',
      blog: 'Blog',
    },
    hero: {
      title: 'Systeme vereinfachen, Ergebnisse verstärken',
      greeting: 'Hallo! Ich bin Richard Bergsma.',
      subtitle: 'Ich automatisiere Arbeitsabläufe mit Power Automate, entwickle intelligente Chatbots in Copilot Studio und verbinde Systeme durch nahtlose API-Integrationen. Von der Optimierung der IT-Infrastruktur und dem Management globaler Umgebungen bis hin zur Verbesserung der Zusammenarbeit mit SharePoint und Azure, optimiere ich Prozesse, um Technologie intelligenter arbeiten zu lassen – während ich meine Python-Fähigkeiten weiterentwickle.',
    },
    about: {
      title: 'Über mich',
      content: [
        'Mit über 15 Jahren IT-Erfahrung bin ich ein leidenschaftlicher IT-System- und Automatisierungsmanager, der sich darauf konzentriert, optimale Lösungen für komplexe Cloud- und On-Premise-Systeme zu liefern. Ich konzentriere mich auf die Förderung der Automatisierung mit Power Automate, die Entwicklung intelligenter Chatbots in Copilot Studio und die Integration von APIs zur Optimierung von Arbeitsabläufen. Außerdem verwalte ich die Microsoft 365-Umgebung, unterstütze 3rd-Line-Anfragen und steigere die Effizienz mit Tools wie Power Apps, Nexthink und TOPdesk.',
        'Zuvor leitete ich Microsoft 365- und SharePoint Online-Implementierungen, migrierte Mailsysteme und verbesserte die Automatisierung mit SCCM. Zusätzlich gründete ich Bergsma IT, half kleinen Unternehmen bei der Migration in die Cloud und verwaltete maßgeschneiderte WordPress-Websites.',
        'Ich besitze Zertifizierungen in Microsoft Teams Administration, Azure Fundamentals und Nexthink Administration. Meine Mission ist es, IT-Exzellenz durch die Optimierung von Cloud-Lösungen, die Automatisierung von Prozessen und die Bereitstellung hervorragender technischer Unterstützung voranzutreiben.'
      ],
    },
    resume: {
      title: 'Berufserfahrung',
      experience: [
        {
          title: 'IT-System- und Automatisierungsmanager',
          company: 'COFRA Holding C.V.',
          location: 'Amsterdam',
          period: '02-2025 - Heute',
          description: 'Als IT-System- und Automatisierungsmanager bei COFRA Holding konzentriere ich mich auf die Förderung der Automatisierung durch Power Automate und die Entwicklung fortgeschrittener Chatbots in Copilot Studio, um Prozesse zu optimieren und die betriebliche Effizienz zu steigern. Meine Arbeit umfasst die Integration von APIs zur Erstellung nahtloser Arbeitsabläufe, die Automatisierung wiederkehrender Aufgaben und die Unterstützung digitaler Transformationsinitiativen. Neben meinen Automatisierungsaufgaben verwalte ich weiterhin unsere Microsoft 365-Umgebung, unterstütze 3rd-Line-Anfragen, entwickle Power Apps, überwache unsere Nexthink-Umgebung, verwalte TOPdesk und trage bei Bedarf zu verschiedenen IT-Projekten bei.',
        },
        {
          title: 'Office 365 Professional',
          company: 'COFRA Holding C.V.',
          location: 'Amsterdam',
          period: '08-2020 - 01-2025',
          description: 'Als Microsoft 365-Experte bei COFRA Holding stelle ich sicher, dass die Umgebung verwaltet, neue Funktionen kommuniziert und Kollegen bei 3rd-Line-Anfragen unterstützt werden. Neue Anfragen reichen von neuen Power Automate-Flows bis hin zu Power Apps. Zusätzlich konzentriere ich mich auf die Einrichtung und Verwaltung unserer Nexthink-Umgebung, verwalte TOPdesk und unterstütze andere Projekte nach Bedarf. In letzter Zeit konzentriere ich mich darauf, Power Automate zu nutzen, um die Automatisierung in verschiedenen Bereichen zu verbessern.',
        },
        {
          title: 'Cloud-System- und Anwendungsingenieur',
          company: 'Hyva',
          location: 'Alphen aan den Rijn',
          period: '09-2018 - 04-2020',
          description: 'Verwaltete die globale IT-Infrastruktur in 35 Ländern und trieb die Implementierung und Integration von Office 365 und SharePoint Online voran, um die Zusammenarbeit zu verbessern. Leitete nahtlose Migrationen von verschiedenen Mailsystemen zu Office 365, verbesserte die Kommunikationseffizienz und Zuverlässigkeit. Führte die Konsolidierung globaler IT-Operationen durch den Ersatz von zwei Rechenzentren, die Einrichtung und Optimierung von Azure-Umgebungen und effektives Kostenmanagement. Implementierte SCCM zur Automatisierung wichtiger Prozesse, steigerte die Servicedesk-Effizienz. Bot Third-Line-Support über TOPdesk, löste komplexe IT-Probleme und gewährleistete hohe Servicequalität.',
        },
        {
          title: 'IT-Berater',
          company: 'Bergsma.IT',
          location: 'Zoetermeer',
          period: '01-2018 - 07-2019',
          description: 'Gründete das Unternehmen, um kleinen Unternehmen bei der Modernisierung ihrer IT-Infrastruktur durch Cloud-basierte Lösungen zu helfen, mit Fokus auf Microsoft-Technologien zur Verbesserung von Effizienz, Skalierbarkeit und Zusammenarbeit. Führte erfolgreich E-Mail- und Dateiservermigrationen zu Microsoft-Cloud-Plattformen durch, bot laufende technische Unterstützung und entwickelte maßgeschneiderte WordPress-Websites. Optimierte Arbeitsabläufe mit Microsoft 365 und lieferte maßgeschneiderte IT-Lösungen, die auf die Geschäftsziele der Kunden abgestimmt waren.',
        },
        {
          title: 'Technischer Anwendungsingenieur SharePoint',
          company: 'Allseas',
          location: 'Delft',
          period: '04-2018 - 09-2018',
          description: 'Verwaltete und optimierte SharePoint 2013- und SharePoint Online-Umgebungen zur Unterstützung von Zusammenarbeit und Produktivität. Erstellte und passte SharePoint-Sites an, implementierte Workflows und bot Expertenunterstützung für Cadac Organice. Arbeitete eng mit Stakeholdern zusammen, um maßgeschneiderte Lösungen zu liefern und sichere, aktuelle und leistungsstarke SharePoint-Systeme zu gewährleisten.',
        },
        {
          title: 'IT-Systemadministrator',
          company: 'OZ Export',
          location: 'De Kwakel',
          period: '10-2015 - 12-2017',
          description: 'Verwaltete und wartete die IT-Infrastruktur der Organisation, um die Systemzuverlässigkeit und nahtlose Abläufe zu gewährleisten. Überwachte Server, Client-PCs, tragbare Scanner und Drucker, optimierte die Leistung und minimierte Ausfallzeiten. Konfigurierte VoIP-Systeme, verwaltete Netzwerk-Switches und administrierte Citrix-Umgebungen für sicheren Remote-Zugriff. Installierte und unterstützte On-Premise SharePoint-Umgebungen zur Verbesserung der Zusammenarbeit. Entwickelte und wartete das Überwachungssystem und die Helpdesk-Plattform der Organisation, optimierte den IT-Support und stärkte die Sicherheit. Bot praktische Fehlerbehebung für Hardware-, Software- und Netzwerkprobleme zur Unterstützung des täglichen Betriebs.',
        }
      ],
    },
    education: {
      title: 'Ausbildung',
      items: [
        {
          title: `Bachelor of Applied Science - BASc, Mechatronik, Robotik und Automatisierungstechnik<br /> <span class="font-normal">De Haagse Hogeschool / The Hague University of Applied Sciences</span> <br /> <span class="text-sm font-normal">2011 - 2013</span>`,
        },
        {
          title: `Bachelor of Applied Science - BASc, Informationstechnologie<br /> <span class="font-normal">De Haagse Hogeschool / The Hague University of Applied Sciences</span> <br /> <span class="text-sm font-normal">2011 - 2011</span>`,
        },
        {
          title: `Associate's degree, Informationstechnologie<br /> <span class="font-normal">ID College</span> <br /> <span class="text-sm font-normal">2007 - 2011</span>`,
        },
      ],
    },
    certifications: {
      title: 'Zertifizierungen',
      subtitle: 'Wo Wissen auf Anerkennung trifft',
      items: [
        {
          name: 'Certified Nexthink Professional',
          issueDate: 'Ausstellungsdatum: 01-2025',
          description: 'Der Erwerb der Nexthink Certified Application Experience Management-Zertifizierung bestätigt die Expertise in der Optimierung der Anwendungsleistung, der Gewährleistung einer nahtlosen Benutzerakzeptanz und der Förderung der Kosteneffizienz.',
          linkUrl: 'https://certified.nexthink.com/babd1e3a-c593-4a81-90a2-6a002f43e692#acc.fUOog9dj',
          image: {
            src: '/images/certificates/CertifiedNexthinkProfessionalinApplicationExperienceManagement.webp',
            alt: 'Nexthink Professional in Application Experience Management Abzeichen',
            loading: 'lazy',
          },
        },
        {
          name: 'Certified Nexthink Administrator',
          issueDate: 'Ausstellungsdatum: 11-2024',
          description: 'Der Erwerb der Nexthink Platform Administration-Zertifizierung zeigt Kompetenz in der Konfiguration und Anpassung der Nexthink-Plattform zur Erfüllung organisatorischer Anforderungen.',
          linkUrl: 'https://certified.nexthink.com/8bfc61f2-31b8-45d8-82e7-e4a1df2b915d#acc.7eo6pFxb',
          image: {
            src: '/images/certificates/NexthinkAdministrator.webp',
            alt: 'Nexthink Administrator Abzeichen',
            loading: 'lazy',
          },
        },
        {
          name: 'Certified Nexthink Associate',
          issueDate: 'Ausstellungsdatum: 11-2024',
          description: 'Der Erwerb der Nexthink Infinity Fundamentals-Zertifizierung bestätigt Ihr Verständnis der Nexthink Infinity-Plattform und ihrer Rolle bei der Verbesserung der digitalen Mitarbeitererfahrung.',
          linkUrl: 'https://certified.nexthink.com/cf5e9e43-9d95-4dc6-bb95-0f7e0bada9b3#acc.YWDnxiaU',
          image: {
            src: '/images/certificates/NexthinkAssociate.webp',
            alt: 'Nexthink Associate Abzeichen',
            loading: 'lazy',
          },
        },
        {
          name: 'Python Programmer (PCEP)',
          issueDate: 'Ausstellungsdatum: 11-2023',
          description: 'Der Erwerb der PCEP™-Zertifizierung zeigt Kompetenz in grundlegenden Python-Programmierkonzepten, einschließlich Datentypen, Kontrollfluss, Datensammlungen, Funktionen und Fehlerbehandlung.',
          linkUrl: 'https://pythoninstitute.org/pcep',
          image: {
            src: '/images/certificates/PCEP.webp',
            alt: 'PCEP™ – Zertifizierter Python-Programmierer (Einstiegsniveau) Abzeichen',
            loading: 'lazy',
          },
        },
        {
          name: 'Desktop Administrator Associate',
          issueDate: 'Ausstellungsdatum: 06-2023',
          description: 'Der Erwerb der Modern Desktop Administrator Associate-Zertifizierung zeigt Kompetenz in der Bereitstellung, Konfiguration, Sicherung, Verwaltung und Überwachung von Geräten und Client-Anwendungen in einer Unternehmensumgebung.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/?practice-assessment-type=certification',
          image: {
            src: '/images/certificates/microsoft-certified-associate-badge.webp',
            alt: 'Microsoft Certified Associate Abzeichen',
            loading: 'lazy',
          },
        },
        {
          name: 'Microsoft 365 Fundamentals',
          issueDate: 'Ausstellungsdatum: 05-2023',
          description: 'Der Erwerb der Microsoft 365 Certified: Fundamentals-Zertifizierung zeigt grundlegendes Wissen über Cloud-basierte Lösungen, einschließlich Produktivität, Zusammenarbeit, Sicherheit, Compliance und Microsoft 365-Dienste.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/microsoft-365-fundamentals/?practice-assessment-type=certification',
          image: {
            src: '/images/certificates/microsoft-certified-fundamentals-badge.webp',
            alt: 'Microsoft 365 Fundamentals Abzeichen',
            loading: 'lazy',
          },
        },
        {
          name: 'Teams Administrator Associate',
          issueDate: 'Ausstellungsdatum: 06-2021',
          description: 'Der Erwerb der Teams Administrator Associate-Zertifizierung zeigt Ihre Fähigkeit, Microsoft Teams zu planen, bereitzustellen, zu konfigurieren und zu verwalten, um effiziente Zusammenarbeit und Kommunikation in einer Microsoft 365-Umgebung zu ermöglichen.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/m365-teams-administrator-associate/?practice-assessment-type=certification',
          image: {
            src: '/src/assets/images/microsoft-certified-associate-badge.webp',
            alt: 'Microsoft Certified Associate Abzeichen',
            loading: 'lazy',
          },
        },
        {
          name: 'Azure Fundamentals',
          issueDate: 'Ausstellungsdatum: 01-2020',
          description: 'Der Erwerb der Microsoft Certified: Azure Fundamentals-Zertifizierung zeigt grundlegendes Wissen über Cloud-Konzepte, zentrale Azure-Dienste und Azure-Verwaltungs- und Governance-Funktionen und -Tools.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification',
          image: {
            src: '/src/assets/images/microsoft-certified-fundamentals-badge.webp',
            alt: 'Azure Fundamentals Abzeichen',
            loading: 'lazy',
          },
        },
      ],
    },
    skills: {
      title: 'Fähigkeiten',
      subtitle: 'Entdecken Sie die Kompetenzen, die es mir ermöglichen, Vorstellungen durch Design zum Leben zu erwecken.',
      items: [
        {
          title: 'Power Automate',
          description: 'Expertise in der Gestaltung und Implementierung fortgeschrittener Automatisierungs-Workflows mit Microsoft Power Automate zur Optimierung von Geschäftsprozessen, Reduzierung manueller Aufwände und Steigerung der betrieblichen Effizienz.',
        },
        {
          title: 'Copilot Studio',
          description: 'Kompetenz in der Entwicklung intelligenter Chatbots innerhalb von Copilot Studio, die verbesserte Benutzerinteraktionen und Unterstützung durch natürliche Sprachverarbeitung und automatisierte Antworten ermöglichen.',
        },
        {
          title: 'API-Integrationen',
          description: 'Erfahren in der Erstellung benutzerdefinierter Konnektoren und der Integration verschiedener Anwendungen und Dienste über APIs zur Ermöglichung nahtlosen Datenaustauschs und Prozessautomatisierung zwischen Plattformen.',
        },
        {
          title: 'Microsoft 365 Administration',
          description: 'Umfassende Erfahrung in der Verwaltung von Microsoft 365-Umgebungen, einschließlich Benutzerverwaltung, Sicherheitskonfigurationen und Service-Optimierung zur Unterstützung globaler Zusammenarbeit und Produktivität.',
        },
        {
          title: 'SharePoint Online & On-Premise',
          description: 'Versiert in der Einrichtung, Verwaltung und Optimierung sowohl von SharePoint Online als auch On-Premise-Implementierungen, zur Gewährleistung effektiven Dokumentenmanagements, Zusammenarbeit und Informationsaustausch innerhalb von Organisationen.',
        },
        {
          title: 'Nexthink Administration',
          description: 'Kompetent in der Verwaltung der Nexthink-Plattform, Nutzung ihrer Fähigkeiten für IT-Infrastrukturüberwachung, Ausführung von Remote-Aktionen und Entwicklung von Workflows zur Verbesserung von IT-Service-Bereitstellung und Benutzererfahrung.',
        },
        {
          title: 'Microsoft Power Apps',
          description: 'Kompetent in der Nutzung von Microsoft Power Apps zur Gestaltung und Entwicklung benutzerdefinierter Geschäftsanwendungen mit minimalem Coding. Erfahren in der Erstellung sowohl von Canvas- als auch modellgesteuerten Apps, die sich mit verschiedenen Datenquellen verbinden.',
        },
        {
          title: 'IT-Infrastrukturmanagement',
          description: 'Umfangreiche Erfahrung in der Überwachung globaler IT-Infrastrukturen, Verwaltung von Servern, Netzwerken und Endbenutzergeräten in mehreren Ländern zur Gewährleistung zuverlässiger und effizienter IT-Operationen.',
        },
        {
          title: 'ITSM (TOPDesk)',
          description: 'Erfahren in der Verwaltung von ITSM-Prozessen mit TOPdesk. Kompetent in Kernfunktionalitäten wie Incident Management und Asset Management, bei gleichzeitiger Nutzung von API-Verwendung für nahtlose Integrationen mit anderen Systemen.',
        },
        {
          title: 'PowerShell',
          description: 'Kompetent in der Nutzung von PowerShell für Automatisierung, Systemadministration und Konfigurationsmanagement in Microsoft-Umgebungen. Erfahren in der Erstellung robuster Skripte für Aufgabenautomatisierung, Systemüberwachung und Integration mit verschiedenen Microsoft-Diensten.',
        },
        {
          title: 'Intune Geräteverwaltung',
          description: 'Erfahren in der Bereitstellung, Konfiguration und Verwaltung von Windows 10/11-Geräten über Microsoft Intune. Kompetent in der Erstellung und Implementierung von Geräterichtlinien, Anwendungsbereitstellung und Sicherheitskonfigurationen für Unternehmensumgebungen.',
        },
        {
          title: '3rd Line IT-Support',
          description: 'Erfahren in der Bereitstellung fortgeschrittener technischer Unterstützung für komplexe IT-Probleme, die tiefgreifendes Wissen und spezialisierte Expertise erfordern. Kompetent in der Fehlersuche, Diagnose und Lösung kritischer Systemprobleme über verschiedene Plattformen und Anwendungen hinweg.',
        },
      ],
    },
    blog: {
      title: 'Entdecken Sie meine aufschlussreichen Artikel in meinem Blog',
      information: 'Willkommen in meinem Blog, wo ich Einblicke, Tipps und Lösungen zu Microsoft 365, Nexthink, Power Automate, PowerShell und anderen Automatisierungstools teile. Ob Sie Arbeitsabläufe optimieren, die Produktivität steigern oder in technische Problemlösungen eintauchen möchten, hier finden Sie praktische Inhalte zur Unterstützung Ihrer Reise.',
    },
  },
  fr: {
    metadata: {
      title: 'À propos de moi',
      aboutUs: 'À propos de nous',
    },
    navigation: {
      home: 'Accueil',
      about: 'À propos',
      resume: 'CV',
      certifications: 'Certifications',
      skills: 'Compétences',
      education: 'Formation',
      blog: 'Blog',
    },
    hero: {
      title: 'Simplifier les Systèmes, Amplifier les Résultats',
      greeting: 'Bonjour ! Je suis Richard Bergsma.',
      subtitle: 'J\'automatise les flux de travail avec Power Automate, développe des chatbots intelligents dans Copilot Studio et connecte les systèmes via des intégrations API transparentes. De l\'optimisation de l\'infrastructure IT et la gestion des environnements globaux à l\'amélioration de la collaboration avec SharePoint et Azure, je rationalise les processus pour rendre la technologie plus intelligente, tout en perfectionnant mes compétences en Python.',
    },
    about: {
      title: 'À propos de moi',
      content: [
        'Avec plus de 15 ans d\'expérience en IT, je suis un gestionnaire passionné des systèmes IT et de l\'automatisation qui excelle dans la fourniture de solutions optimales pour les systèmes cloud et on-premise complexes. Je me concentre sur le développement de l\'automatisation avec Power Automate, la création de chatbots intelligents dans Copilot Studio et l\'intégration d\'APIs pour rationaliser les flux de travail. Je gère également l\'environnement Microsoft 365, supporte les demandes de niveau 3 et améliore l\'efficacité avec des outils comme Power Apps, Nexthink et TOPdesk.',
        'Auparavant, j\'ai dirigé les implémentations de Microsoft 365 et SharePoint Online, migré des systèmes de messagerie et amélioré l\'automatisation avec SCCM. De plus, j\'ai fondé Bergsma IT, aidant les petites entreprises à migrer vers le cloud et gérant des sites WordPress personnalisés.',
        'Je possède des certifications en administration Microsoft Teams, Azure Fundamentals et administration Nexthink. Ma mission est de promouvoir l\'excellence IT en optimisant les solutions cloud, en automatisant les processus et en fournissant un support technique exceptionnel.'
      ],
    },
    resume: {
      title: 'Expérience professionnelle',
      experience: [
        {
          title: 'Responsable des systèmes IT et de l\'automatisation',
          company: 'COFRA Holding C.V.',
          location: 'Amsterdam',
          period: '02-2025 - Présent',
          description: 'En tant que responsable des systèmes IT et de l\'automatisation chez COFRA Holding, je me concentre sur le développement de l\'automatisation via Power Automate et la création de chatbots avancés dans Copilot Studio pour rationaliser les processus et améliorer l\'efficacité opérationnelle. Mon travail implique l\'intégration d\'APIs pour créer des flux de travail transparents, l\'automatisation des tâches récurrentes et le soutien des initiatives de transformation digitale. En plus de mes responsabilités en matière d\'automatisation, je continue à gérer notre environnement Microsoft 365, à supporter les demandes de niveau 3, à développer des Power Apps, à superviser notre environnement Nexthink, à gérer TOPdesk et à contribuer à divers projets IT selon les besoins.',
        },
        {
          title: 'Professionnel Office 365',
          company: 'COFRA Holding C.V.',
          location: 'Amsterdam',
          period: '08-2020 - 01-2025',
          description: 'En tant qu\'expert Microsoft 365 au sein de COFRA Holding, je veille à ce que l\'environnement soit géré, les nouvelles fonctionnalités communiquées et les collègues supportés pour les demandes de niveau 3. Les nouvelles demandes vont des nouveaux flux Power Automate aux Power Apps. De plus, je me concentre sur la configuration et la gestion de notre environnement Nexthink, gère TOPdesk et supporte d\'autres projets selon les besoins. Récemment, je me suis concentré sur l\'utilisation de Power Automate pour améliorer l\'automatisation dans divers domaines.',
        },
        {
          title: 'Ingénieur systèmes cloud et applications',
          company: 'Hyva',
          location: 'Alphen aan den Rijn',
          period: '09-2018 - 04-2020',
          description: 'Géré l\'infrastructure IT mondiale dans 35 pays, dirigé l\'implémentation et l\'intégration d\'Office 365 et SharePoint Online pour améliorer la collaboration. Dirigé des migrations transparentes de divers systèmes de messagerie vers Office 365, améliorant l\'efficacité et la fiabilité de la communication. Piloté la consolidation des opérations IT mondiales en remplaçant deux centres de données, configurant et optimisant les environnements Azure, et gérant efficacement les coûts. Implémenté SCCM pour automatiser les processus clés, augmentant l\'efficacité du service desk. Fourni un support de niveau 3 via TOPdesk, résolvant des problèmes IT complexes et assurant une haute qualité de service.',
        },
        {
          title: 'Consultant IT',
          company: 'Bergsma.IT',
          location: 'Zoetermeer',
          period: '01-2018 - 07-2019',
          description: 'Fondé l\'entreprise pour aider les petites entreprises à moderniser leur infrastructure IT via des solutions cloud, en se concentrant sur les technologies Microsoft pour améliorer l\'efficacité, l\'évolutivité et la collaboration. Exécuté avec succès des migrations de messagerie et de serveurs de fichiers vers les plateformes cloud Microsoft, fourni un support technique continu et conçu des sites WordPress personnalisés. Rationalisé les flux de travail avec Microsoft 365 et livré des solutions IT personnalisées alignées sur les objectifs commerciaux des clients.',
        },
        {
          title: 'Ingénieur d\'application technique SharePoint',
          company: 'Allseas',
          location: 'Delft',
          period: '04-2018 - 09-2018',
          description: 'Géré et optimisé les environnements SharePoint 2013 et SharePoint Online pour soutenir la collaboration et la productivité. Créé et personnalisé des sites SharePoint, implémenté des flux de travail et fourni un support expert pour Cadac Organice. Travaillé en étroite collaboration avec les parties prenantes pour livrer des solutions sur mesure, assurant des systèmes SharePoint sécurisés, à jour et performants.',
        },
        {
          title: 'Administrateur système IT',
          company: 'OZ Export',
          location: 'De Kwakel',
          period: '10-2015 - 12-2017',
          description: 'Géré et maintenu l\'infrastructure IT de l\'organisation pour assurer la fiabilité des systèmes et des opérations fluides. Supervisé les serveurs, PC clients, scanners portables et imprimantes, optimisant les performances et minimisant les temps d\'arrêt. Configuré les systèmes VoIP, géré les commutateurs réseau et administré les environnements Citrix pour un accès distant sécurisé. Installé et supporté les environnements SharePoint on-premise pour améliorer la collaboration. Conçu et maintenu le système de surveillance et la plateforme helpdesk de l\'organisation, rationalisant le support IT et renforçant la sécurité. Fourni un dépannage pratique pour les problèmes de matériel, logiciel et réseau pour soutenir les opérations quotidiennes.',
        }
      ],
    },
    education: {
      title: 'Formation',
      items: [
        {
          title: `Bachelor of Applied Science - BASc, Mécatronique, Robotique et Automatisation<br /> <span class="font-normal">De Haagse Hogeschool / The Hague University of Applied Sciences</span> <br /> <span class="text-sm font-normal">2011 - 2013</span>`,
        },
        {
          title: `Bachelor of Applied Science - BASc, Technologies de l'Information<br /> <span class="font-normal">De Haagse Hogeschool / The Hague University of Applied Sciences</span> <br /> <span class="text-sm font-normal">2011 - 2011</span>`,
        },
        {
          title: `Associate's degree, Technologies de l'Information<br /> <span class="font-normal">ID College</span> <br /> <span class="text-sm font-normal">2007 - 2011</span>`,
        },
      ],
    },
    certifications: {
      title: 'Certifications',
      subtitle: 'Où la connaissance rencontre la reconnaissance',
      items: [
        {
          name: 'Certified Nexthink Professional',
          issueDate: 'Date de délivrance : 01-2025',
          description: 'L\'obtention de la certification Nexthink Certified Application Experience Management valide l\'expertise dans l\'optimisation des performances des applications, assurant une adoption transparente par les utilisateurs et favorisant l\'efficacité des coûts.',
          linkUrl: 'https://certified.nexthink.com/babd1e3a-c593-4a81-90a2-6a002f43e692#acc.fUOog9dj',
          image: {
            src: '/images/certificates/CertifiedNexthinkProfessionalinApplicationExperienceManagement.webp',
            alt: 'Badge Professionnel Nexthink en gestion de l\'expérience applicative',
            loading: 'lazy',
          },
        },
        {
          name: 'Certified Nexthink Administrator',
          issueDate: 'Date de délivrance : 11-2024',
          description: 'L\'obtention de la certification Nexthink Platform Administration démontre la compétence dans la configuration et la personnalisation de la plateforme Nexthink pour répondre aux besoins organisationnels.',
          linkUrl: 'https://certified.nexthink.com/8bfc61f2-31b8-45d8-82e7-e4a1df2b915d#acc.7eo6pFxb',
          image: {
            src: '/images/certificates/NexthinkAdministrator.webp',
            alt: 'Badge Administrateur Nexthink',
            loading: 'lazy',
          },
        },
        {
          name: 'Certified Nexthink Associate',
          issueDate: 'Date de délivrance : 11-2024',
          description: 'L\'obtention de la certification Nexthink Infinity Fundamentals valide votre compréhension de la plateforme Nexthink Infinity et de son rôle dans l\'amélioration de l\'expérience numérique des employés.',
          linkUrl: 'https://certified.nexthink.com/cf5e9e43-9d95-4dc6-bb95-0f7e0bada9b3#acc.YWDnxiaU',
          image: {
            src: '/images/certificates/NexthinkAssociate.webp',
            alt: 'Badge Associate Nexthink',
            loading: 'lazy',
          },
        },
        {
          name: 'Python Programmer (PCEP)',
          issueDate: 'Date de délivrance : 11-2023',
          description: 'L\'obtention de la certification PCEP™ démontre la maîtrise des concepts fondamentaux de la programmation Python, y compris les types de données, le contrôle de flux, les collections de données, les fonctions et la gestion des erreurs.',
          linkUrl: 'https://pythoninstitute.org/pcep',
          image: {
            src: '/images/certificates/PCEP.webp',
            alt: 'Badge PCEP™ – Programmeur Python Certifié Niveau Débutant',
            loading: 'lazy',
          },
        },
        {
          name: 'Desktop Administrator Associate',
          issueDate: 'Date de délivrance : 06-2023',
          description: 'L\'obtention de la certification Modern Desktop Administrator Associate démontre la compétence dans le déploiement, la configuration, la sécurisation, la gestion et la surveillance des appareils et des applications client dans un environnement d\'entreprise.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/?practice-assessment-type=certification',
          image: {
            src: '/images/certificates/microsoft-certified-associate-badge.webp',
            alt: 'Badge Microsoft Certified Associate',
            loading: 'lazy',
          },
        },
        {
          name: 'Microsoft 365 Fundamentals',
          issueDate: 'Date de délivrance : 05-2023',
          description: 'L\'obtention de la certification Microsoft 365 Certified: Fundamentals démontre une connaissance fondamentale des solutions basées sur le cloud, y compris la productivité, la collaboration, la sécurité, la conformité et les services Microsoft 365.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/microsoft-365-fundamentals/?practice-assessment-type=certification',
          image: {
            src: '/images/certificates/microsoft-certified-fundamentals-badge.webp',
            alt: 'Badge Microsoft 365 Fundamentals',
            loading: 'lazy',
          },
        },
        {
          name: 'Teams Administrator Associate',
          issueDate: 'Date de délivrance : 06-2021',
          description: 'L\'obtention de la certification Teams Administrator Associate démontre votre capacité à planifier, déployer, configurer et gérer Microsoft Teams pour faciliter une collaboration et une communication efficaces dans un environnement Microsoft 365.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/m365-teams-administrator-associate/?practice-assessment-type=certification',
          image: {
            src: '/src/assets/images/microsoft-certified-associate-badge.webp',
            alt: 'Badge Microsoft Certified Associate',
            loading: 'lazy',
          },
        },
        {
          name: 'Azure Fundamentals',
          issueDate: 'Date de délivrance : 01-2020',
          description: 'L\'obtention de la certification Microsoft Certified: Azure Fundamentals démontre une connaissance fondamentale des concepts cloud, des services Azure de base et des fonctionnalités et outils de gestion et de gouvernance Azure.',
          linkUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification',
          image: {
            src: '/src/assets/images/microsoft-certified-fundamentals-badge.webp',
            alt: 'Badge Azure Fundamentals',
            loading: 'lazy',
          },
        },
      ],
    },
    skills: {
      title: 'Compétences',
      subtitle: 'Découvrez les compétences qui me permettent de donner vie à l\'imagination par le design.',
      items: [
        {
          title: 'Power Automate',
          description: 'Expertise dans la conception et l\'implémentation de workflows d\'automatisation avancés utilisant Microsoft Power Automate pour rationaliser les processus métier, réduire l\'effort manuel et améliorer l\'efficacité opérationnelle.',
        },
        {
          title: 'Copilot Studio',
          description: 'Compétence dans le développement de chatbots intelligents au sein de Copilot Studio, permettant des interactions utilisateur et un support améliorés grâce au traitement du langage naturel et aux réponses automatisées.',
        },
        {
          title: 'Intégrations API',
          description: 'Compétent dans la création de connecteurs personnalisés et l\'intégration de diverses applications et services via des APIs pour faciliter l\'échange de données transparent et l\'automatisation des processus entre plateformes.',
        },
        {
          title: 'Administration Microsoft 365',
          description: 'Expérience complète dans la gestion des environnements Microsoft 365, y compris la gestion des utilisateurs, les configurations de sécurité et l\'optimisation des services pour soutenir la collaboration et la productivité globales.',
        },
        {
          title: 'SharePoint Online & On-Premise',
          description: 'Compétent dans la configuration, la gestion et l\'optimisation des déploiements SharePoint Online et on-premise, assurant une gestion efficace des documents, la collaboration et le partage d\'informations au sein des organisations.',
        },
        {
          title: 'Administration Nexthink',
          description: 'Compétent dans l\'administration de la plateforme Nexthink, utilisant ses capacités pour la surveillance de l\'infrastructure IT, l\'exécution d\'actions à distance et le développement de workflows pour améliorer la prestation de services IT et l\'expérience utilisateur.',
        },
        {
          title: 'Microsoft Power Apps',
          description: 'Compétent dans l\'utilisation de Microsoft Power Apps pour concevoir et développer des applications métier personnalisées avec un minimum de codage. Expérimenté dans la création d\'applications canvas et basées sur des modèles qui se connectent à diverses sources de données.',
        },
        {
          title: 'Gestion Infrastructure IT',
          description: 'Vaste expérience dans la supervision des infrastructures IT mondiales, la gestion des serveurs, réseaux et appareils utilisateurs finaux dans plusieurs pays pour assurer des opérations IT fiables et efficaces.',
        },
        {
          title: 'ITSM (TOPDesk)',
          description: 'Expérimenté dans la gestion des processus ITSM avec TOPdesk. Compétent dans les fonctionnalités principales telles que la gestion des incidents et la gestion des actifs, tout en exploitant l\'utilisation des APIs pour des intégrations transparentes avec d\'autres systèmes.',
        },
        {
          title: 'PowerShell',
          description: 'Compétent dans l\'utilisation de PowerShell pour l\'automatisation, l\'administration système et la gestion de configuration dans les environnements Microsoft. Expérimenté dans la création de scripts robustes pour l\'automatisation des tâches, la surveillance des systèmes et l\'intégration avec divers services Microsoft.',
        },
        {
          title: 'Gestion des Appareils Intune',
          description: 'Compétent dans le déploiement, la configuration et la gestion des appareils Windows 10/11 via Microsoft Intune. Expérimenté dans la création et l\'implémentation de politiques d\'appareils, le déploiement d\'applications et les configurations de sécurité pour les environnements d\'entreprise.',
        },
        {
          title: 'Support IT de 3ème Niveau',
          description: 'Expérimenté dans la fourniture d\'un support technique avancé pour des problèmes IT complexes nécessitant une connaissance approfondie et une expertise spécialisée. Compétent dans le dépannage, le diagnostic et la résolution de problèmes système critiques sur diverses plateformes et applications.',
        },
      ],
    },
    blog: {
      title: 'Découvrez mes articles pertinents sur mon blog',
      information: 'Bienvenue sur mon blog, où je partage des insights, des conseils et des solutions sur Microsoft 365, Nexthink, Power Automate, PowerShell et d\'autres outils d\'automatisation. Que vous cherchiez à rationaliser les flux de travail, améliorer la productivité ou plonger dans la résolution de problèmes techniques, vous trouverez ici du contenu pratique pour soutenir votre parcours.',
    },
  },
};
