import { aiKnowledge } from '../data/aiKnowledge.js';

/**
 * Normalizes user input:
 * - Converts curly apostrophes to straight apostrophes
 * - Expands contractions
 * - Normalizes punctuation and excessive whitespace
 * - Replaces common typos / abbreviations with canonical forms
 */
export function normalizeText(text) {
  if (!text) return '';

  // 1. Unify apostrophes and quotes
  let normalized = text
    .toLowerCase()
    .replace(/[’‘`]/g, "'");

  // 2. Expand common contractions before punctuation stripping
  const contractions = [
    [/\bwhat's\b/g, 'what is'],
    [/\bwho's\b/g, 'who is'],
    [/\bhe's\b/g, 'he is'],
    [/\bhow's\b/g, 'how is'],
    [/\bwhere's\b/g, 'where is'],
    [/\bthat's\b/g, 'that is'],
    [/\bthere's\b/g, 'there is'],
    [/\bcan't\b/g, 'cannot'],
    [/\bi'm\b/g, 'i am'],
    [/\bi've\b/g, 'i have'],
    [/\bi'll\b/g, 'i will'],
    [/\bwe're\b/g, 'we are'],
    [/\bdon't\b/g, 'do not'],
    [/\bdoesn't\b/g, 'does not'],
    [/\bisn't\b/g, 'is not']
  ];
  for (const [pattern, replacement] of contractions) {
    normalized = normalized.replace(pattern, replacement);
  }

  // 3. Strip punctuation
  normalized = normalized
    .replace(/[.,\/#!$%\^&\*;:{}=\-_~()?"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // 4. Normalize common typos and abbreviations
  const spellingFixes = [
    [/\btechs?\b/g, 'technologies'],
    [/\bskils?\b/g, 'skills'],
    [/\bprojcts?\b/g, 'projects'],
    [/\bexprnc\b/g, 'experience'],
    [/\bcertifs?\b/g, 'certifications'],
    [/\bdatabse\b/g, 'database'],
    [/\bfront end\b/g, 'frontend'],
    [/\bback end\b/g, 'backend'],
    [/\bfull stack\b/g, 'fullstack'],
    [/\bui ux\b/g, 'ui']
  ];
  for (const [pattern, replacement] of spellingFixes) {
    normalized = normalized.replace(pattern, replacement);
  }

  return normalized.trim();
}

/**
 * Tests if normalized text contains the word with word boundaries.
 */
function hasWord(text, word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i').test(text);
}

/**
 * Tests if normalized text contains a full multi-word phrase.
 */
function hasPhrase(text, phrase) {
  return text.includes(phrase);
}

/**
 * Matches user query against specific portfolio projects.
 */
function findMatchingProject(normalized) {
  const projects = aiKnowledge.projects;

  for (const project of projects) {
    const titleNorm = normalizeText(project.title);
    const idWords = project.id.split('-');

    // Exact title or full ID match
    if (hasPhrase(normalized, titleNorm) || hasPhrase(normalized, idWords.join(' '))) {
      return project;
    }

    // High-confidence distinctive project aliases
    if (project.id === 'smart-salary-tracker') {
      if (
        hasPhrase(normalized, 'salary tracker') ||
        hasPhrase(normalized, 'smart salary') ||
        hasPhrase(normalized, 'finance tracker') ||
        (hasWord(normalized, 'salary') && (hasWord(normalized, 'app') || hasWord(normalized, 'project') || hasWord(normalized, 'tracker')))
      ) {
        return project;
      }
    }

    if (project.id === 'snaphunt') {
      if (
        hasWord(normalized, 'snaphunt') ||
        hasPhrase(normalized, 'snap hunt') ||
        hasPhrase(normalized, 'photo discovery') ||
        (hasPhrase(normalized, 'face recognition') && (hasWord(normalized, 'app') || hasWord(normalized, 'project') || hasWord(normalized, 'system')))
      ) {
        return project;
      }
    }

    if (project.id === 'guardian-eye') {
      if (
        hasWord(normalized, 'guardian') ||
        hasPhrase(normalized, 'guardian eye') ||
        hasPhrase(normalized, 'surveillance system') ||
        (hasWord(normalized, 'surveillance') && (hasWord(normalized, 'camera') || hasWord(normalized, 'project') || hasWord(normalized, 'anomaly')))
      ) {
        return project;
      }
    }

    if (project.id === 'skillly-platform') {
      if (
        hasWord(normalized, 'skillly') ||
        hasWord(normalized, 'skilly') ||
        hasPhrase(normalized, 'skillly platform') ||
        hasPhrase(normalized, 'learning portal') ||
        hasPhrase(normalized, 'collaborative learning')
      ) {
        return project;
      }
    }

    if (project.id === 'salem-marthoma-church') {
      if (
        hasWord(normalized, 'salem') ||
        hasWord(normalized, 'marthoma') ||
        hasPhrase(normalized, 'salem church') ||
        hasPhrase(normalized, 'church portal') ||
        hasPhrase(normalized, 'church website')
      ) {
        return project;
      }
    }
  }

  return null;
}

/**
 * Checks if query is referencing the contextual project via pronouns or follow-up phrasing.
 */
function isProjectFollowupQuery(normalized) {
  const followupPatterns = [
    /\b(it|its|that|this|the project|the app|that project|that app|this project|this app)\b/i,
    /\b(tell me more|what else|more details|tell more|elaborate)\b/i,
    /\b(other projects?|another project|what else has he built|what else has he done)\b/i
  ];
  return followupPatterns.some((pattern) => pattern.test(normalized));
}

/**
 * Minimum confidence score required to trigger an intent.
 */
const CONFIDENCE_THRESHOLD = 35;

/**
 * Computes confidence scores for each intent candidate.
 */
function scoreIntents(normalized, context) {
  const scores = {};

  const addScore = (intent, points) => {
    scores[intent] = (scores[intent] || 0) + points;
  };

  // 1. GREETING
  if (['hi', 'hello', 'hey', 'greetings', 'welcome', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo', 'hoi', 'namaste'].some(w => normalized === w || normalized.startsWith(w + ' '))) {
    addScore('greeting', 95);
  } else if (hasWord(normalized, 'hello') || hasWord(normalized, 'greetings') || hasWord(normalized, 'welcome')) {
    addScore('greeting', 80);
  }

  // 2. CAPABILITIES & SUITABILITY / WHAT CAN TINU BUILD
  const capabilityPhrases = [
    'what kind of applications can tinu build',
    'what can he build',
    'what can tinu build',
    'what kind of apps can he make',
    'what can he help my company develop',
    'what can he help develop',
    'what can he do',
    'what are his capabilities',
    'what is he capable of building',
    'is tinu good at building web applications',
    'is he good at building web applications',
    'is tinu good at web development',
    'is he good at web development',
    'can tinu build a fullstack application',
    'can tinu build a full stack application',
    'can he build a fullstack application',
    'can he build a full stack application',
    'can tinu build fullstack applications',
    'can tinu build full stack applications',
    'is he capable of developing websites',
    'is tinu capable of developing websites',
    'is he capable of developing web apps',
    'is tinu capable of developing web apps',
    'would tinu be suitable for a web development project',
    'would he be suitable for a web development project',
    'would tinu be suitable for',
    'would he be suitable for',
    'is tinu suitable for a web development project',
    'is he suitable for a web development project',
    'is tinu suitable for',
    'is he suitable for',
    'can he build frontend and backend systems',
    'can tinu build frontend and backend systems',
    'can he build frontend and backend',
    'can tinu build frontend and backend',
    'can he handle frontend and backend',
    'can tinu handle frontend and backend',
    'looking for a developer what can he do',
    'i am looking for a developer what can he do',
    'can he build an ecommerce',
    'can he build e-commerce',
    'can he build website',
    'can he build web app',
    'can he build a fullstack web app',
    'can he build a full stack web app'
  ];
  for (const phrase of capabilityPhrases) {
    if (hasPhrase(normalized, phrase)) addScore('capabilities', 95);
  }

  // Dynamic suitability & capability pattern matches
  if (
    (hasPhrase(normalized, 'is tinu') || hasPhrase(normalized, 'is he') || hasPhrase(normalized, 'would tinu') || hasPhrase(normalized, 'would he')) &&
    (hasPhrase(normalized, 'good at') || hasPhrase(normalized, 'capable of') || hasPhrase(normalized, 'suitable for') || hasPhrase(normalized, 'a good fit')) &&
    (hasWord(normalized, 'web') || hasWord(normalized, 'websites') || hasWord(normalized, 'development') || hasWord(normalized, 'applications') || hasWord(normalized, 'project') || hasWord(normalized, 'software') || hasWord(normalized, 'apps'))
  ) {
    addScore('capabilities', 95);
  }

  if (
    (hasPhrase(normalized, 'can tinu') || hasPhrase(normalized, 'can he')) &&
    (hasWord(normalized, 'build') || hasWord(normalized, 'develop') || hasWord(normalized, 'create') || hasWord(normalized, 'handle')) &&
    (hasWord(normalized, 'fullstack') || hasPhrase(normalized, 'full stack') || hasPhrase(normalized, 'frontend and backend') || hasWord(normalized, 'website') || hasWord(normalized, 'websites') || hasWord(normalized, 'web') || hasWord(normalized, 'applications') || hasWord(normalized, 'systems'))
  ) {
    addScore('capabilities', 95);
  }

  if (hasWord(normalized, 'build') && (hasWord(normalized, 'what') || hasWord(normalized, 'can')) && (hasWord(normalized, 'he') || hasWord(normalized, 'tinu'))) {
    addScore('capabilities', 75);
  }

  // 3. ABOUT / BIO / WHO IS TINU
  // MUST NOT match bare "about" inside other sentences (e.g. "tell me about his databases")
  const aboutExact = [
    'who is tinu',
    'who is tinu sunny',
    'tell me about tinu',
    'tell me about yourself',
    'introduce yourself',
    'who are you',
    'background of tinu',
    'who is this developer',
    'give me an overview of tinu',
    'tell me about his background'
  ];
  if (normalized === 'about' || normalized === 'about me' || normalized === 'about tinu') {
    addScore('about', 95);
  } else {
    for (const phrase of aboutExact) {
      if (hasPhrase(normalized, phrase)) addScore('about', 95);
    }
  }

  // 4. FRONTEND SKILLS
  const frontendKeywords = ['react', 'tailwind', 'framer motion', 'material ui', 'css', 'html', 'frontend', 'ui', 'interface engineering'];
  let frontendMatched = false;
  for (const kw of frontendKeywords) {
    if (hasWord(normalized, kw)) {
      addScore('skills_frontend', 80);
      frontendMatched = true;
    }
  }
  if (hasPhrase(normalized, 'frontend skills') || hasPhrase(normalized, 'frontend engineering') || hasPhrase(normalized, 'react skills')) {
    addScore('skills_frontend', 95);
    frontendMatched = true;
  }

  // 5. BACKEND SKILLS
  const backendKeywords = ['node', 'express', 'rest api', 'jwt', 'authentication', 'backend', 'server', 'endpoints', 'middleware', 'server side'];
  let backendMatched = false;
  for (const kw of backendKeywords) {
    if (hasWord(normalized, kw) || hasPhrase(normalized, kw)) {
      addScore('skills_backend', 85);
      backendMatched = true;
    }
  }
  if (hasPhrase(normalized, 'backend skills') || hasPhrase(normalized, 'backend architecture') || hasPhrase(normalized, 'api design')) {
    addScore('skills_backend', 95);
    backendMatched = true;
  }

  // 6. DATABASE SKILLS
  const dbKeywords = ['database', 'databases', 'mongodb', 'mongoose', 'sql', 'postgresql', 'mysql', 'nosql', 'schemas', 'aggregation'];
  let dbMatched = false;
  for (const kw of dbKeywords) {
    if (hasWord(normalized, kw)) {
      addScore('skills_database', 85);
      dbMatched = true;
    }
  }
  if (hasPhrase(normalized, 'database management') || hasPhrase(normalized, 'database skills') || hasPhrase(normalized, 'what database does he know') || hasPhrase(normalized, 'his databases')) {
    addScore('skills_database', 95);
    dbMatched = true;
  }

  // 7. TOOLS & DEVELOPMENT
  const toolKeywords = ['git', 'github', 'vite', 'postman', 'vscode', 'vs code', 'npm', 'bundler', 'tools', 'workflow'];
  let toolsMatched = false;
  for (const kw of toolKeywords) {
    if (hasWord(normalized, kw)) {
      addScore('skills_tools', 75);
      toolsMatched = true;
    }
  }
  if (hasPhrase(normalized, 'development tools') || hasPhrase(normalized, 'tools he use') || hasPhrase(normalized, 'tool stack') || hasPhrase(normalized, 'tools and workflow')) {
    addScore('skills_tools', 95);
    toolsMatched = true;
  }

  // 8. GENERAL SKILLS / TECH STACK
  // Only score high if no specific sub-domain (frontend, backend, database, tools) was targeted
  const isSpecificSkill = frontendMatched || backendMatched || dbMatched || toolsMatched;
  if (!isSpecificSkill) {
    const stackPhrases = ['technologies', 'tech stack', 'what technologies', 'what stack', 'skills', 'languages', 'mern stack', 'technical skills', 'programming languages'];
    for (const phrase of stackPhrases) {
      if (hasPhrase(normalized, phrase)) addScore('skills_overview', 75);
    }
    if (hasWord(normalized, 'skills')) {
      addScore('skills_overview', 65);
    }
  }

  // 9. GENERAL PROJECTS OVERVIEW
  const projectPhrases = ['projects', 'portfolio work', 'showcase', 'applications', 'what has he built', 'what have you built', 'list projects', 'explore his projects', 'tell me about the projects', 'projects he has worked on'];
  for (const phrase of projectPhrases) {
    if (hasPhrase(normalized, phrase)) addScore('projects_overview', 80);
  }
  if (hasWord(normalized, 'projects') || hasWord(normalized, 'portfolio') || (hasWord(normalized, 'applications') && !hasWord(normalized, 'build'))) {
    addScore('projects_overview', 60);
  }

  // 10. WORK EXPERIENCE & INTERNSHIP
  // Avoid capturing "experience with React/Node" as career experience
  const hasTechExperienceInquiry = hasWord(normalized, 'react') || hasWord(normalized, 'node') || hasWord(normalized, 'express') || hasWord(normalized, 'mongodb');
  if (!hasTechExperienceInquiry) {
    const experiencePhrases = ['work experience', 'internship', 'intern', 'lumina', 'employment', 'career history', 'where has he worked', 'industry experience', 'past roles'];
    for (const phrase of experiencePhrases) {
      if (hasPhrase(normalized, phrase)) addScore('experience', 85);
    }
    if ((hasWord(normalized, 'experience') || hasWord(normalized, 'internship') || hasWord(normalized, 'lumina')) && !hasWord(normalized, 'available')) {
      addScore('experience', 70);
    }
  }

  // 11. EDUCATION & ACADEMICS
  const educationPhrases = ['education', 'degree', 'college', 'university', 'university of kerala', 'bsc', 'graduation', 'academic background', 'where did he study', 'where did he graduate'];
  for (const phrase of educationPhrases) {
    if (hasPhrase(normalized, phrase)) addScore('education', 85);
  }
  if (hasWord(normalized, 'degree') || hasWord(normalized, 'college') || hasWord(normalized, 'university') || hasWord(normalized, 'graduated')) {
    addScore('education', 70);
  }

  // 12. CERTIFICATIONS & ACHIEVEMENTS
  const certPhrases = ['certifications', 'certificates', 'achievements', 'credentials', 'hackathons', 'coursera', 'meta certificate'];
  for (const phrase of certPhrases) {
    if (hasPhrase(normalized, phrase)) addScore('certifications', 85);
  }
  if (hasWord(normalized, 'certifications') || hasWord(normalized, 'certificates') || hasWord(normalized, 'credentials')) {
    addScore('certifications', 70);
  }

  // 13. LEARNING LAB & RESEARCH
  const labPhrases = ['learning lab', 'what is he learning', 'active experiments', 'research and development', 'r&d', 'future goals', 'next goal', 'experiments'];
  for (const phrase of labPhrases) {
    if (hasPhrase(normalized, phrase)) addScore('learning_lab', 85);
  }
  if (hasWord(normalized, 'lab') || hasPhrase(normalized, 'learning lab')) {
    addScore('learning_lab', 75);
  }

  // 14. RESUME / CV
  const resumePhrases = ['resume', 'cv', 'curriculum vitae', 'download resume', 'show resume', 'see resume', 'get cv', 'his cv'];
  for (const phrase of resumePhrases) {
    if (hasPhrase(normalized, phrase)) addScore('resume', 90);
  }
  if (hasWord(normalized, 'resume') || hasWord(normalized, 'cv')) {
    addScore('resume', 75);
  }

  // 15. CONTACT & SOCIALS
  const contactPhrases = ['contact', 'email', 'phone', 'get in touch', 'reach out', 'how to reach', 'socials', 'linkedin', 'github profile', 'send message', 'send him a message', 'send a message'];
  for (const phrase of contactPhrases) {
    if (hasPhrase(normalized, phrase)) addScore('contact', 85);
  }
  if (hasWord(normalized, 'contact') || hasWord(normalized, 'email') || (hasWord(normalized, 'message') && !hasWord(normalized, 'build'))) {
    addScore('contact', 70);
  }

  // 16. AVAILABILITY & HIRING
  const hirePhrases = [
    'hire',
    'hiring',
    'available for work',
    'availability',
    'open to work',
    'can i hire him',
    'freelance work',
    'full time role',
    'full time work',
    'open to full time',
    'available for employment',
    'hire him',
    'available'
  ];
  for (const phrase of hirePhrases) {
    if (hasPhrase(normalized, phrase)) addScore('availability', 85);
  }
  if (hasWord(normalized, 'hire') || hasWord(normalized, 'available') || hasWord(normalized, 'availability')) {
    addScore('availability', 75);
  }

  // 17. HELP & COMMANDS
  if (['help', 'commands', 'what can you do', 'options', 'how to use', 'help me'].some(w => normalized === w || hasPhrase(normalized, w))) {
    addScore('help', 85);
  }

  return scores;
}

/**
 * Handles follow-up questions targeting the context's most recently discussed project.
 */
function handleProjectFollowup(normalized, project) {
  if (!project) return null;

  // Question about the project's database
  if (hasWord(normalized, 'database') || hasWord(normalized, 'db') || hasWord(normalized, 'storage') || hasWord(normalized, 'mongodb')) {
    const dbTechs = project.technologies.filter(t => /mongo|sql|db|store/i.test(t));
    const dbName = dbTechs.length > 0 ? dbTechs.join(', ') : 'MongoDB';
    return {
      text: `### ${project.title} — Database Architecture\n\n**${project.title}** uses **${dbName}**.\n\n${
        project.id === 'smart-salary-tracker'
          ? 'MongoDB was leveraged with optimized aggregation pipelines for categorizing recurring transactions and calculating monthly savings analytics.'
          : project.id === 'snaphunt'
          ? 'MongoDB securely stores indexed facial embeddings, photo metadata, and user access records with high-speed query indexing.'
          : `${project.title} uses ${dbName} for schema validation and scalable persistence.`
      }`,
      actions: [
        { type: 'view_project', label: `Open "${project.title}" Details`, projectId: project.id },
        { type: 'navigate', label: 'View Database Skills', target: 'skills' }
      ],
      followUps: [
        `What other technologies did he use for ${project.title}?`,
        `What was Tinu's contribution on it?`,
        "What other projects has he built?"
      ]
    };
  }

  // Question about technologies or stack of that project
  if (hasWord(normalized, 'technologies') || hasWord(normalized, 'tech') || hasWord(normalized, 'stack') || hasWord(normalized, 'tools')) {
    return {
      text: `### ${project.title} — Technology Stack\n\n**${project.title}** was built with:\n\n${project.technologies.map(t => `• **${t}**`).join('\n')}\n\n**Category:** ${project.category} • **Key Metric:** ${project.metrics}`,
      actions: [
        { type: 'view_project', label: `View "${project.title}" Modal`, projectId: project.id },
        { type: 'navigate', label: 'View All Projects', target: 'projects' }
      ],
      followUps: [
        `What problem does ${project.title} solve?`,
        `Who worked on it?`,
        "Tell me about his other projects"
      ]
    };
  }

  // Question about who worked on it / Tinu's role / contribution
  if (hasWord(normalized, 'who') || hasWord(normalized, 'role') || hasWord(normalized, 'contribution') || hasWord(normalized, 'contribute') || hasWord(normalized, 'worked')) {
    return {
      text: `### Tinu's Contributions to ${project.title}\n\nAs the full-stack developer on **${project.title}**, Tinu's key engineering deliverables included:\n\n${project.contribution.map(c => `• ${c}`).join('\n')}`,
      actions: [
        { type: 'view_project', label: `Open "${project.title}" Specifications`, projectId: project.id }
      ],
      followUps: [
        `What technologies did he use for ${project.title}?`,
        `What database does it use?`,
        "Explore his other projects"
      ]
    };
  }

  // Question about "what else can it do" / "tell me more" / problem & solution
  if (hasPhrase(normalized, 'tell me more') || hasPhrase(normalized, 'what else') || hasWord(normalized, 'problem') || hasWord(normalized, 'solution') || hasWord(normalized, 'metrics')) {
    return {
      text: `### Deep Dive: ${project.title}\n\n**The Problem:**\n${project.problem}\n\n**The Solution:**\n${project.solution}\n\n**Demonstrated Impact:**\n${project.metrics}\n\n**Stack:** ${project.technologies.join(', ')}`,
      actions: [
        { type: 'view_project', label: `Inspect Full "${project.title}" Modal`, projectId: project.id },
        { type: 'navigate', label: 'Scroll to Projects Gallery', target: 'projects' }
      ],
      followUps: [
        `What database does it use?`,
        `What was Tinu's role on it?`,
        "Show me his other projects"
      ]
    };
  }

  // "What other projects has he done" / "other work"
  if (hasWord(normalized, 'other') || hasWord(normalized, 'another') || hasWord(normalized, 'else')) {
    const otherProjects = aiKnowledge.projects.filter(p => p.id !== project.id);
    return {
      text: `### Other Featured Projects by Tinu\n\nIn addition to **${project.title}**, Tinu has developed:\n\n${otherProjects.map(p => `• **${p.title}** (${p.category}) — *${p.tagline}*`).join('\n')}`,
      actions: [
        { type: 'navigate', label: 'View All Projects in Gallery', target: 'projects' }
      ],
      followUps: otherProjects.slice(0, 3).map(p => `Tell me about ${p.title}`)
    };
  }

  return null;
}

/**
 * Main evaluation function:
 * Accepts userQuery string and optional conversation context object.
 * Returns structured assistant response, updated context, and detected intent.
 */
export function generateAIResponse(userQuery, context = {}) {
  const normalized = normalizeText(userQuery);

  // Initialize updated context
  const newContext = {
    lastIntent: context?.lastIntent || null,
    lastMatchedProjectId: context?.lastMatchedProjectId || null,
    lastTopic: context?.lastTopic || null,
    turnCount: (context?.turnCount || 0) + 1
  };

  // Handle empty input
  if (!normalized) {
    return {
      text: "Please enter a question or choose from the suggested prompts below to explore Tinu's portfolio.",
      actions: [],
      followUps: [
        "Tell me about Tinu",
        "Explore his projects",
        "What technologies does he use?",
        "How can I contact him?"
      ],
      context: newContext,
      intent: 'empty',
      confidence: 1.0
    };
  }

  // 1. Direct Project Entity Matching (Highest Priority)
  const matchedProject = findMatchingProject(normalized);
  if (matchedProject) {
    newContext.lastMatchedProjectId = matchedProject.id;
    newContext.lastTopic = 'project';
    newContext.lastIntent = 'project_detail';

    return {
      text: `### ${matchedProject.title} (${matchedProject.category})\n\n**${matchedProject.tagline}**\n\n${matchedProject.overview}\n\n- **Problem:** ${matchedProject.problem}\n- **Solution:** ${matchedProject.solution}\n- **Tech Stack:** ${matchedProject.technologies.join(', ')}\n- **Key Metric:** ${matchedProject.metrics}\n\nWould you like to open the full project modal or inspect the repository?`,
      actions: [
        {
          type: 'view_project',
          label: `Open "${matchedProject.title}" Details`,
          projectId: matchedProject.id
        },
        {
          type: 'navigate',
          label: 'View All Projects Section',
          target: 'projects'
        }
      ],
      followUps: [
        `What database does it use?`,
        `Who worked on ${matchedProject.title}?`,
        "What other projects has he built?"
      ],
      context: newContext,
      intent: 'project_detail',
      confidence: 0.98
    };
  }

  // 2. Contextual Follow-up with Pronouns targeting the last matched project
  if (newContext.lastMatchedProjectId && isProjectFollowupQuery(normalized)) {
    const contextualProject = aiKnowledge.projects.find(p => p.id === newContext.lastMatchedProjectId);
    if (contextualProject) {
      const followupResponse = handleProjectFollowup(normalized, contextualProject);
      if (followupResponse) {
        newContext.lastIntent = 'project_followup';
        return {
          ...followupResponse,
          context: newContext,
          intent: 'project_followup',
          confidence: 0.92
        };
      }
    }
  }

  // 3. Multi-intent Confidence Scoring
  const scores = scoreIntents(normalized, context);
  const sortedIntents = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [topIntent, topScore = 0] = sortedIntents[0] || [];
  const [secondIntent, secondScore = 0] = sortedIntents[1] || [];

  // Check if confidence is below threshold
  if (topScore < CONFIDENCE_THRESHOLD) {
    return {
      text: `I'm not completely certain about that specific inquiry. As Tinu's local portfolio assistant, I can provide verified details on his **MERN engineering skills**, **full-stack projects**, **internship experience**, **education**, or **contact coordinates**.\n\nTry one of the topics below:`,
      actions: [
        { type: 'navigate', label: 'Explore Projects Gallery', target: 'projects' },
        { type: 'navigate', label: 'View Skills Grid', target: 'skills' },
        { type: 'navigate', label: 'Contact Tinu', target: 'contact' }
      ],
      followUps: [
        "Tell me about Tinu",
        "Explore his projects",
        "What technologies does he use?",
        "Tell me about his experience",
        "How can I contact him?"
      ],
      context: newContext,
      intent: 'unknown',
      confidence: topScore / 100
    };
  }

  // Check for ambiguous near-ties between distinct categories (only if top score is moderate < 85)
  if (topScore < 85 && secondScore >= CONFIDENCE_THRESHOLD && Math.abs(topScore - secondScore) <= 5 && topIntent !== secondIntent) {
    newContext.lastIntent = 'ambiguous';
    return {
      text: `It sounds like you might be interested in either Tinu's **technical skills** or his **portfolio projects**.\n\nWhich area would you like to explore first?`,
      actions: [
        { type: 'navigate', label: 'Inspect Skills Section', target: 'skills' },
        { type: 'navigate', label: 'Explore Projects Gallery', target: 'projects' }
      ],
      followUps: [
        "What technologies does he use?",
        "Explore his projects",
        "Tell me about his experience"
      ],
      context: newContext,
      intent: 'ambiguous',
      confidence: topScore / 100
    };
  }

  // Register winning intent
  newContext.lastIntent = topIntent;
  newContext.lastTopic = topIntent.split('_')[0];

  // Dispatch intent handlers

  // GREETING
  if (topIntent === 'greeting') {
    return {
      text: `Hello! 👋 I'm **Tinu AI**, Tinu Sunny's local portfolio assistant.\n\nI can help you explore his **MERN stack projects**, **technical skills**, **work experience**, **certifications**, or **contact info**.\n\nWhat would you like to discover first?`,
      actions: [
        { type: 'navigate', label: 'Explore Projects', target: 'projects' },
        { type: 'navigate', label: 'View Skills', target: 'skills' }
      ],
      followUps: [
        "Tell me about Tinu",
        "Explore his projects",
        "What technologies does he use?",
        "Tell me about his experience",
        "How can I contact him?"
      ],
      context: newContext,
      intent: 'greeting',
      confidence: topScore / 100
    };
  }

  // CAPABILITIES & DEVELOPER SUITABILITY
  if (topIntent === 'capabilities') {
    return {
      text: `### Tinu's Web Development Capabilities & Suitability\n\nYes, Tinu is well-suited for web development projects and full-stack engineering challenges. He is a **MERN Full-Stack Developer** with demonstrated proficiency across both frontend user interfaces and backend server architectures:\n\n• **Full-Stack Application Development:** Proven track record building and deploying end-to-end web applications connecting React.js frontends, Node.js and Express RESTful APIs, and MongoDB database layers.\n• **Frontend Engineering:** Proficient in **React.js**, modern **JavaScript (ES6+)**, **Tailwind CSS**, and **Framer Motion**, delivering responsive, accessible interfaces with smooth micro-interactions.\n• **Backend & System Architecture:** Experienced in architecting secure REST APIs, role-based JWT authentication, route middleware, and error-handling pipelines.\n• **Database Management:** Skilled in **MongoDB** schema design, Mongoose modeling, and aggregation pipelines, as well as foundational SQL database concepts.\n• **Documented Projects:**\n  - *Smart Salary Tracker* — Full-stack personal finance platform with real-time financial analytics and predictive forecasting.\n  - *SnapHunt* — Event photo discovery platform integrating face recognition and high-speed photo retrieval.\n  - *Guardian Eye* — Computer vision security surveillance platform with real-time motion and intrusion alerting.\n  - *Skillly Platform* — Collaborative e-learning portal for computer science students with modular roadmaps and authentication.\n\n*Suitability Note:* Tinu is currently expanding his hands-on experience as a Full-Stack Developer Intern at **Lumina Technology Lab**, focusing on production React components and scalable backend endpoints. He is ready to contribute to engineering teams and new web development initiatives.`,
      actions: [
        { type: 'navigate', label: 'Explore Verified Projects', target: 'projects' },
        { type: 'navigate', label: 'Inspect Technical Skills', target: 'skills' },
        { type: 'navigate', label: 'Transmit Inquiry via Contact Form', target: 'contact' },
        { type: 'open_resume', label: 'View Full Resume (CV)' }
      ],
      followUps: [
        "What technologies does he use?",
        "Tell me about Smart Salary Tracker",
        "Tell me about his work experience",
        "How can I contact him?"
      ],
      context: newContext,
      intent: 'capabilities',
      confidence: topScore / 100
    };
  }

  // ABOUT / BIO
  if (topIntent === 'about') {
    const { name, title, location, bio, subBio, stats } = aiKnowledge.profile;
    const statsText = stats.map(s => `**${s.value}** ${s.label}`).join(' • ');

    return {
      text: `**${name}** is a **${title}** based in ${location}.\n\n"${bio}"\n\n${subBio}\n\n📊 **Key Stats:** ${statsText}`,
      actions: [
        { type: 'navigate', label: 'Read Full About Section', target: 'about' },
        { type: 'open_resume', label: 'View Resume (CV)' },
        { type: 'navigate', label: 'Contact Tinu', target: 'contact' }
      ],
      followUps: [
        "What kind of applications can Tinu build?",
        "What technologies does he use?",
        "Explore his projects",
        "Tell me about his experience"
      ],
      context: newContext,
      intent: 'about',
      confidence: topScore / 100
    };
  }

  // FRONTEND SKILLS
  if (topIntent === 'skills_frontend') {
    const frontendCategory = aiKnowledge.skills.categories.find(c => c.id === 'frontend');
    const skillList = frontendCategory
      ? frontendCategory.skills.map(s => `• **${s.name}** (${s.level})`).join('\n')
      : '';

    return {
      text: `### Frontend Engineering Capabilities\n\nTinu builds responsive, high-performance interfaces with modern component architectures and micro-interactions:\n\n${skillList}\n\nHe focuses on modern design standards, glassmorphic interfaces, fluid animations with Framer Motion, and mobile responsiveness.`,
      actions: [
        { type: 'navigate', label: 'Inspect Skills Section', target: 'skills' },
        { type: 'navigate', label: 'See Frontend Projects', target: 'projects' }
      ],
      followUps: [
        "What backend technologies does he use?",
        "What databases does he work with?",
        "Explore his projects"
      ],
      context: newContext,
      intent: 'skills_frontend',
      confidence: topScore / 100
    };
  }

  // BACKEND SKILLS
  if (topIntent === 'skills_backend') {
    const backendCategory = aiKnowledge.skills.categories.find(c => c.id === 'backend');
    const skillList = backendCategory
      ? backendCategory.skills.map(s => `• **${s.name}** (${s.level})`).join('\n')
      : '';

    return {
      text: `### Backend & API Architecture\n\nTinu designs scalable server-side systems and RESTful APIs with Node.js and Express:\n\n${skillList}\n\nKey areas include JWT authentication, role-based middleware, robust error-handling pipelines, and endpoint testing with Postman.`,
      actions: [
        { type: 'navigate', label: 'Inspect Skills Section', target: 'skills' },
        { type: 'navigate', label: 'View Full Stack Projects', target: 'projects' }
      ],
      followUps: [
        "What databases does he work with?",
        "Tell me about his frontend skills",
        "Explore his projects"
      ],
      context: newContext,
      intent: 'skills_backend',
      confidence: topScore / 100
    };
  }

  // DATABASE SKILLS
  if (topIntent === 'skills_database') {
    const dbCategory = aiKnowledge.skills.categories.find(c => c.id === 'databases');
    const skillList = dbCategory
      ? dbCategory.skills.map(s => `• **${s.name}** (${s.level})`).join('\n')
      : '';

    return {
      text: `### Database Systems\n\nTinu works with document and relational databases:\n\n${skillList}\n\nProficient in Mongoose schema modeling, MongoDB aggregation pipelines, indexing strategies, and transactional queries.`,
      actions: [
        { type: 'navigate', label: 'Inspect Skills Section', target: 'skills' }
      ],
      followUps: [
        "What backend technologies does he use?",
        "Tell me about Smart Salary Tracker",
        "Explore his projects"
      ],
      context: newContext,
      intent: 'skills_database',
      confidence: topScore / 100
    };
  }

  // TOOLS SKILLS
  if (topIntent === 'skills_tools') {
    const toolCategory = aiKnowledge.skills.categories.find(c => c.id === 'tools');
    const skillList = toolCategory
      ? toolCategory.skills.map(s => `• **${s.name}** (${s.level})`).join('\n')
      : '';

    return {
      text: `### Development Tools & Workflow\n\nTinu uses standard modern software tooling to ensure disciplined delivery:\n\n${skillList}\n\nExperienced with Git branching, pull request workflows, Postman API collections, and Vite modern bundler configurations.`,
      actions: [
        { type: 'navigate', label: 'Inspect Skills Section', target: 'skills' }
      ],
      followUps: [
        "What technologies does he use?",
        "Explore his projects",
        "Tell me about his experience"
      ],
      context: newContext,
      intent: 'skills_tools',
      confidence: topScore / 100
    };
  }

  // SKILLS OVERVIEW
  if (topIntent === 'skills_overview') {
    const mernList = aiKnowledge.skills.coreMern.map(m => `**${m.name}** (${m.role})`).join(' • ');
    return {
      text: `### Core Technology Stack\n\nTinu is a full-stack engineer specialized in the **MERN Stack**:\n\n${mernList}\n\n**Categories:**\n- **Frontend:** React.js, JavaScript (ES6+), Tailwind CSS, Material UI, Framer Motion\n- **Backend:** Node.js, Express.js, RESTful APIs, JWT Auth\n- **Databases:** MongoDB, Mongoose, SQL (PostgreSQL / MySQL)\n- **Dev Tools:** Git & GitHub, Vite, Postman, VS Code, npm`,
      actions: [
        { type: 'navigate', label: 'View Interactive Skills Grid', target: 'skills' },
        { type: 'navigate', label: 'Explore Projects Built with MERN', target: 'projects' }
      ],
      followUps: [
        "Tell me about his frontend skills",
        "What backend technologies does he use?",
        "Explore his projects",
        "Tell me about his experience"
      ],
      context: newContext,
      intent: 'skills_overview',
      confidence: topScore / 100
    };
  }

  // PROJECTS OVERVIEW
  if (topIntent === 'projects_overview') {
    const projectHighlights = aiKnowledge.projects
      .map(p => `• **${p.title}** (${p.category}) — *${p.tagline}* [Stack: ${p.technologies.slice(0, 3).join(', ')}]`)
      .join('\n');

    return {
      text: `### Featured Projects\n\nTinu has built production-grade full stack and AI-integrated applications:\n\n${projectHighlights}\n\nYou can ask me about any specific project (e.g., *"Tell me about SnapHunt"* or *"Smart Salary Tracker"*), or click below to inspect them.`,
      actions: [
        { type: 'navigate', label: 'Scroll to Projects Gallery', target: 'projects' },
        {
          type: 'view_project',
          label: 'View "Smart Salary Tracker"',
          projectId: 'smart-salary-tracker'
        }
      ],
      followUps: [
        "Tell me about Smart Salary Tracker",
        "Tell me about SnapHunt",
        "Tell me about Guardian Eye",
        "Tell me about Skillly Platform"
      ],
      context: newContext,
      intent: 'projects_overview',
      confidence: topScore / 100
    };
  }

  // EXPERIENCE
  if (topIntent === 'experience') {
    const current = aiKnowledge.profile.currentRole;
    const journey = aiKnowledge.journey.map(j => `• **${j.year}**: **${j.title}** (${j.subtitle}) — ${j.highlight}`).join('\n');

    return {
      text: `### Career Journey & Experience\n\n💼 **Current Position:**\n**${current.title}** at **${current.company}** (*${current.period}*)\n${current.description}\n\n**Milestones:**\n${journey}`,
      actions: [
        { type: 'navigate', label: 'View Career Timeline', target: 'journey' },
        { type: 'open_resume', label: 'Open Full Resume (CV)' }
      ],
      followUps: [
        "Tell me about his education",
        "What certifications does he hold?",
        "Explore his projects",
        "How can I contact him?"
      ],
      context: newContext,
      intent: 'experience',
      confidence: topScore / 100
    };
  }

  // EDUCATION
  if (topIntent === 'education') {
    const edu = aiKnowledge.profile.education;
    return {
      text: `### Academic Credentials\n\n🎓 **${edu.degree}** (${edu.graduationYear})\n**${edu.institution}**\n\n${edu.description}\n\nCurriculum emphasized software engineering, data structures, algorithm optimization, and database theory.`,
      actions: [
        { type: 'navigate', label: 'View Journey Section', target: 'journey' },
        { type: 'open_resume', label: 'Inspect Resume' }
      ],
      followUps: [
        "Tell me about his experience",
        "What certifications does he hold?",
        "What technologies does he use?"
      ],
      context: newContext,
      intent: 'education',
      confidence: topScore / 100
    };
  }

  // CERTIFICATIONS
  if (topIntent === 'certifications') {
    const certs = aiKnowledge.certifications
      .map(c => `• **${c.title}** (${c.issuer}, ${c.year})`)
      .join('\n');

    return {
      text: `### Verified Certifications & Credentials\n\n${certs}\n\n🏆 **Key Metrics:**\n• 3+ Certifications\n• 2 Hackathon Participations\n• 850+ Code Commits across repositories`,
      actions: [
        { type: 'navigate', label: 'View Credentials Section', target: 'achievements' },
        { type: 'open_resume', label: 'View Resume' }
      ],
      followUps: [
        "What is the Learning Lab?",
        "Tell me about his experience",
        "Explore his projects"
      ],
      context: newContext,
      intent: 'certifications',
      confidence: topScore / 100
    };
  }

  // LEARNING LAB
  if (topIntent === 'learning_lab') {
    const experiments = aiKnowledge.learningLab.activeExperiments
      .map(e => `• **${e.title}** [${e.category}] — *${e.subtitle}* (Status: ${e.status})`)
      .join('\n');
    const nextGoal = aiKnowledge.learningLab.nextGoal;

    return {
      text: `### Learning Lab & Active Research\n\nTinu maintains an active R&D sandbox for emerging technologies:\n\n${experiments}\n\n🚀 **Next Frontier:**\n**${nextGoal.title}**\n${nextGoal.description} (${nextGoal.progress}% progress)`,
      actions: [
        { type: 'navigate', label: 'Open Learning Lab Section', target: 'lab' }
      ],
      followUps: [
        "What technologies does he use?",
        "Explore his projects",
        "Tell me about his experience"
      ],
      context: newContext,
      intent: 'learning_lab',
      confidence: topScore / 100
    };
  }

  // RESUME
  if (topIntent === 'resume') {
    return {
      text: `### Curriculum Vitae\n\nTinu's complete curriculum vitae includes his full technical history, project summaries, education at University of Kerala, and industry internship details.\n\nYou can inspect or download the interactive resume right here on the portfolio.`,
      actions: [
        { type: 'open_resume', label: 'Open Interactive Resume Modal' },
        { type: 'navigate', label: 'Scroll to Contact Section', target: 'contact' }
      ],
      followUps: [
        "Tell me about his experience",
        "What technologies does he use?",
        "How can I contact him?"
      ],
      context: newContext,
      intent: 'resume',
      confidence: topScore / 100
    };
  }

  // CONTACT
  if (topIntent === 'contact') {
    const { email, location, socials } = aiKnowledge.profile;

    return {
      text: `### Direct Communication Coordinates\n\n• **Email:** [${email}](mailto:${email})\n• **Location:** ${location}\n• **GitHub:** [${socials.github}](${socials.github})\n• **LinkedIn:** [${socials.linkedin}](${socials.linkedin})\n• **Twitter/X:** [${socials.twitter}](${socials.twitter})\n\nYou can also transmit a direct message using the interactive contact form on this portfolio!`,
      actions: [
        { type: 'navigate', label: 'Jump to Contact Form', target: 'contact' },
        { type: 'open_resume', label: 'View Resume (CV)' }
      ],
      followUps: [
        "Is he available for hire?",
        "Can I download his resume?",
        "Tell me about his experience"
      ],
      context: newContext,
      intent: 'contact',
      confidence: topScore / 100
    };
  }

  // AVAILABILITY & HIRING
  if (topIntent === 'availability') {
    return {
      text: `### Current Availability Status\n\n🟢 **Status: Available for Work**\n\n${aiKnowledge.profile.availability}\n\nHe is interested in:\n• Full-Stack MERN Engineering positions\n• Frontend / React.js UI engineering\n• Scalable REST API backend development\n• High-impact startup collaborations\n\nIf you want him to build a custom application or join your engineering team, drop a transmission!`,
      actions: [
        { type: 'navigate', label: 'Transmit Inquiry via Contact Form', target: 'contact' },
        { type: 'open_resume', label: 'Open Resume' }
      ],
      followUps: [
        "What kind of applications can Tinu build?",
        "How can I contact him?",
        "Explore his projects"
      ],
      context: newContext,
      intent: 'availability',
      confidence: topScore / 100
    };
  }

  // HELP
  return {
    text: `### Tinu AI Assistant Capabilities\n\nI am a **local, deterministic intelligence engine** running completely inside your browser with zero external API calls.\n\nYou can ask me about:\n1. **Background & Bio** (*"Tell me about Tinu"*)\n2. **What He Can Build** (*"What kind of applications can Tinu build?"*)\n3. **Projects** (*"Tell me about SnapHunt"* or *"What has he built?"*)\n4. **Tech Stack & Skills** (*"What technologies does he use?"* or *"Tell me about his backend skills"*)\n5. **Work Experience** (*"What is his current internship?"*)\n6. **Education & Certifications** (*"Where did he study?"*)\n7. **Contact & Resume** (*"How can I get in touch?"* or *"Show resume"*)\n8. **Availability** (*"Is he open to work?"*)`,
    actions: [
      { type: 'navigate', label: 'Explore Projects', target: 'projects' },
      { type: 'navigate', label: 'View Skills', target: 'skills' }
    ],
    followUps: [
      "Tell me about Tinu",
      "Explore his projects",
      "What technologies does he use?",
      "Tell me about his experience",
      "How can I contact him?"
    ],
    context: newContext,
    intent: 'help',
    confidence: topScore / 100
  };
}
