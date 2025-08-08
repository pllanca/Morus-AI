export type Locale = 'en' | 'es'

export interface Translations {
  // Navigation
  nav: {
    home: string
    essays: string
    about: string
  }
  // Homepage
  home: {
    heroTitle: string
    heroSubtitle: string
    featuredEssays: string
    recentEssays: string
    viewAllEssays: string
    stayInLoop: string
    stayInLoopText: string
    aboutAuthor: string
    aboutText: string
    learnMore: string
  }
  // Essays page
  essays: {
    title: string
    description: string
    filterByTopic: string
    allEssays: string
    noEssaysFound: string
    showAllEssays: string
    totalEssays: string
    essaysTaggedWith: string
  }
  // About page
  about: {
    title: string
    subtitle: string
    bio1: string
    bio2: string
    bio3: string
    connectWith: string
    stayConnected: string
    stayConnectedText: string
    philosophy: string
    thoughtful: string
    thoughtfulText: string
    focused: string
    focusedText: string
    growing: string
    growingText: string
  }
  // Newsletter
  newsletter: {
    placeholder: string
    subscribe: string
    subscribing: string
    stayUpdated: string
    stayUpdatedText: string
    noSpam: string
    successMessage: string
    confirmEmail: string
    getNotified: string
    invalidEmail: string
    networkError: string
    genericError: string
  }
  // Essay detail
  essayDetail: {
    by: string
    thanksForReading: string
    thanksText: string
    share: string
  }
  // Footer
  footer: {
    allEssays: string
    about: string
    contact: string
    allRightsReserved: string
  }
  // Common
  common: {
    readingTime: string
    minute: string
    minutes: string
  }
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      home: 'Home',
      essays: 'Essays',
      about: 'About',
    },
    home: {
      heroTitle: 'Exploring Ideas Through Writing',
      heroSubtitle: 'Welcome to my digital space where I share thoughtful essays on technology, philosophy, and the intersection of ideas that shape our world.',
      featuredEssays: 'Featured Essays',
      recentEssays: 'Recent Essays',
      viewAllEssays: 'View all essays →',
      stayInLoop: 'Stay in the Loop',
      stayInLoopText: 'Get notified when I publish new essays. Join a growing community of thoughtful readers.',
      aboutAuthor: 'About Pedro LLanca',
      aboutText: 'I\'m a writer and thinker passionate about exploring complex ideas through clear, accessible prose. My work spans technology, philosophy, and the human experience.',
      learnMore: 'Learn more about me',
    },
    essays: {
      title: 'All Essays',
      description: 'A collection of my thoughts, ideas, and reflections on the world around us. Each piece is crafted with care and intended to spark thoughtful conversation.',
      filterByTopic: 'Filter by topic:',
      allEssays: 'All essays',
      noEssaysFound: 'No essays found with the tag',
      showAllEssays: 'Show all essays',
      totalEssays: 'total essay',
      essaysTaggedWith: 'essay tagged with',
    },
    about: {
      title: 'About Pedro LLanca',
      subtitle: 'Writer, thinker, and explorer of ideas at the intersection of technology and humanity.',
      bio1: 'Hello! I\'m Pedro LLanca, and I\'m passionate about exploring complex ideas through clear, thoughtful writing. My work spans technology, philosophy, and the human experience, always seeking to find clarity in complexity and meaning in the everyday.',
      bio2: 'I believe that writing is thinking made visible. Each essay is an opportunity to wrestle with questions that matter, to challenge assumptions, and to share the insights that emerge from deep reflection. Whether I\'m examining the latest technological trends, philosophical puzzles, or personal experiences, my goal is always the same: to write something worth reading.',
      bio3: 'When I\'m not writing, you can find me reading voraciously, taking long walks to think through ideas, and having conversations with curious people who share my love of learning and discovery.',
      connectWith: 'Connect with me',
      stayConnected: 'Let\'s stay connected',
      stayConnectedText: 'I send occasional essays to a small group of thoughtful readers. No spam, no sales pitches—just ideas worth sharing when they\'re ready.',
      philosophy: 'My Writing Philosophy',
      thoughtful: 'Thoughtful',
      thoughtfulText: 'Every essay is carefully crafted, with ideas developed through research, reflection, and genuine curiosity.',
      focused: 'Focused',
      focusedText: 'Clear ideas, clearly expressed. I believe in the power of precision and the beauty of well-chosen words.',
      growing: 'Growing',
      growingText: 'Writing is learning in public. I share what I\'m discovering as I discover it, embracing growth and change.',
    },
    newsletter: {
      placeholder: 'your@email.com',
      subscribe: 'Subscribe',
      subscribing: 'Subscribing...',
      stayUpdated: 'Stay Updated',
      stayUpdatedText: 'Get notified when I publish new essays. No spam, ever.',
      noSpam: 'No spam, unsubscribe anytime.',
      successMessage: 'Thanks for subscribing!',
      confirmEmail: 'Check your email to confirm your subscription.',
      getNotified: 'Get notified when I publish new essays:',
      invalidEmail: 'Please enter a valid email address',
      networkError: 'Network error. Please try again.',
      genericError: 'Something went wrong. Please try again.',
    },
    essayDetail: {
      by: 'By',
      thanksForReading: 'Thanks for reading!',
      thanksText: 'I\'m Pedro LLanca, and I write about the intersection of technology, philosophy, and human experience. If you enjoyed this essay, you might like my other work.',
      share: 'Share:',
    },
    footer: {
      allEssays: 'All Essays',
      about: 'About',
      contact: 'Contact',
      allRightsReserved: 'All rights reserved.',
    },
    common: {
      readingTime: 'reading time',
      minute: 'minute',
      minutes: 'minutes',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      essays: 'Ensayos',
      about: 'Acerca de',
    },
    home: {
      heroTitle: 'Explorando Ideas a Través de la Escritura',
      heroSubtitle: 'Bienvenido a mi espacio digital donde comparto ensayos reflexivos sobre tecnología, filosofía, y la intersección de ideas que dan forma a nuestro mundo.',
      featuredEssays: 'Ensayos Destacados',
      recentEssays: 'Ensayos Recientes',
      viewAllEssays: 'Ver todos los ensayos →',
      stayInLoop: 'Mantente al Día',
      stayInLoopText: 'Recibe notificaciones cuando publique nuevos ensayos. Únete a una creciente comunidad de lectores reflexivos.',
      aboutAuthor: 'Acerca de Pedro LLanca',
      aboutText: 'Soy un escritor y pensador apasionado por explorar ideas complejas a través de una prosa clara y accesible. Mi trabajo abarca tecnología, filosofía, y la experiencia humana.',
      learnMore: 'Conoce más sobre mí',
    },
    essays: {
      title: 'Todos los Ensayos',
      description: 'Una colección de mis pensamientos, ideas, y reflexiones sobre el mundo que nos rodea. Cada pieza está elaborada con cuidado e intención de generar conversación reflexiva.',
      filterByTopic: 'Filtrar por tema:',
      allEssays: 'Todos los ensayos',
      noEssaysFound: 'No se encontraron ensayos con la etiqueta',
      showAllEssays: 'Mostrar todos los ensayos',
      totalEssays: 'ensayo total',
      essaysTaggedWith: 'ensayo etiquetado con',
    },
    about: {
      title: 'Acerca de Pedro LLanca',
      subtitle: 'Escritor, pensador, y explorador de ideas en la intersección de la tecnología y la humanidad.',
      bio1: '¡Hola! Soy Pedro LLanca, y me apasiona explorar ideas complejas a través de la escritura clara y reflexiva. Mi trabajo abarca tecnología, filosofía, y la experiencia humana, siempre buscando encontrar claridad en la complejidad y significado en lo cotidiano.',
      bio2: 'Creo que escribir es hacer visible el pensamiento. Cada ensayo es una oportunidad para luchar con preguntas que importan, desafiar suposiciones, y compartir las percepciones que emergen de la reflexión profunda. Ya sea examinando las últimas tendencias tecnológicas, acertijos filosóficos, o experiencias personales, mi objetivo es siempre el mismo: escribir algo que valga la pena leer.',
      bio3: 'Cuando no estoy escribiendo, me puedes encontrar leyendo vorazmente, dando largos paseos para pensar ideas, y teniendo conversaciones con personas curiosas que comparten mi amor por el aprendizaje y el descubrimiento.',
      connectWith: 'Conecta conmigo',
      stayConnected: 'Mantengámonos conectados',
      stayConnectedText: 'Envío ensayos ocasionales a un pequeño grupo de lectores reflexivos. Sin spam, sin promociones—solo ideas que vale la pena compartir cuando están listas.',
      philosophy: 'Mi Filosofía de Escritura',
      thoughtful: 'Reflexivo',
      thoughtfulText: 'Cada ensayo está cuidadosamente elaborado, con ideas desarrolladas a través de investigación, reflexión, y curiosidad genuina.',
      focused: 'Enfocado',
      focusedText: 'Ideas claras, expresadas claramente. Creo en el poder de la precisión y la belleza de las palabras bien elegidas.',
      growing: 'En Crecimiento',
      growingText: 'Escribir es aprender en público. Comparto lo que estoy descubriendo mientras lo descubro, abrazando el crecimiento y el cambio.',
    },
    newsletter: {
      placeholder: 'tu@email.com',
      subscribe: 'Suscribirse',
      subscribing: 'Suscribiendo...',
      stayUpdated: 'Mantente Actualizado',
      stayUpdatedText: 'Recibe notificaciones cuando publique nuevos ensayos. Sin spam, nunca.',
      noSpam: 'Sin spam, cancela cuando quieras.',
      successMessage: '¡Gracias por suscribirte!',
      confirmEmail: 'Revisa tu email para confirmar tu suscripción.',
      getNotified: 'Recibe notificaciones cuando publique nuevos ensayos:',
      invalidEmail: 'Por favor ingresa una dirección de email válida',
      networkError: 'Error de red. Por favor intenta de nuevo.',
      genericError: 'Algo salió mal. Por favor intenta de nuevo.',
    },
    essayDetail: {
      by: 'Por',
      thanksForReading: '¡Gracias por leer!',
      thanksText: 'Soy Pedro LLanca, y escribo sobre la intersección de la tecnología, filosofía, y la experiencia humana. Si disfrutaste este ensayo, te podría gustar mi otro trabajo.',
      share: 'Compartir:',
    },
    footer: {
      allEssays: 'Todos los Ensayos',
      about: 'Acerca de',
      contact: 'Contacto',
      allRightsReserved: 'Todos los derechos reservados.',
    },
    common: {
      readingTime: 'tiempo de lectura',
      minute: 'minuto',
      minutes: 'minutos',
    },
  },
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations['en']
}

export function useTranslations(locale: Locale) {
  return getTranslations(locale)
}