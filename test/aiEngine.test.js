import { generateAIResponse, normalizeText } from '../src/utils/aiEngine.js';

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, message, details = {}) {
  if (condition) {
    passed++;
  } else {
    failed++;
    failures.push({ message, details });
    console.error(`❌ FAIL: ${message}`, details);
  }
}

console.log('====================================================');
console.log('🚀 Running Tinu AI Natural Language Regression Suite');
console.log('====================================================\n');

// 1. Text Normalization Tests
assert(normalizeText('Hello, World!?!') === 'hello world', 'normalizeText strips punctuation');
assert(normalizeText('  What’s   his   techs?  ') === 'what is his technologies', 'normalizeText normalizes contractions and typos');

// 2. Greetings & Variations (5+)
const greetings = [
  'hello',
  'hey there',
  'hi!',
  'good morning',
  'sup'
];
greetings.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'greeting', `Greeting matched for "${query}"`, { intent: res.intent });
});

// 3. Capabilities & Suitability / What Can Tinu Build
const capabilitiesQueries = [
  'What kind of applications can Tinu build?',
  'What can he help my company develop?',
  'I am looking for a developer. What can he do?',
  'What is he capable of building?',
  'Can he build a full stack web app?',
  'Is Tinu good at building web applications?',
  'Can Tinu build a full-stack application?',
  'Is he capable of developing websites?',
  'Would Tinu be suitable for a web development project?',
  'Can he build frontend and backend systems?',
  'Is he good at web development?',
  'Can Tinu build full-stack web applications?',
  'Would he be suitable for our engineering project?',
  'Can Tinu handle frontend and backend?',
  'Is Tinu capable of developing web apps?'
];
capabilitiesQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'capabilities', `Capabilities matched for "${query}"`, { intent: res.intent });
  assert(res.text.includes('MERN Full-Stack Developer'), `Response includes MERN specialty for "${query}"`);
});

// 4. Profile & Bio (5+)
const aboutQueries = [
  'Tell me about Tinu',
  'Who is Tinu Sunny?',
  'Give me an overview of Tinu',
  'Who is this developer?',
  'Introduce yourself'
];
aboutQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'about', `About matched for "${query}"`, { intent: res.intent });
});

// 5. Frontend Skills (5+)
const frontendQueries = [
  'What does he use for frontend?',
  'Tell me about his React skills',
  'Does he know Tailwind CSS?',
  'How are his UI interface engineering capabilities?',
  'Tell me about his frontend engineering'
];
frontendQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'skills_frontend', `Frontend skills matched for "${query}"`, { intent: res.intent });
});

// 6. Backend Skills (5+)
const backendQueries = [
  'What backend technologies does he use?',
  'Does he have experience with Node.js and Express?',
  'Tell me about his REST API design',
  'How does he handle JWT authentication on the backend?',
  'What are his server side development skills?'
];
backendQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'skills_backend', `Backend skills matched for "${query}"`, { intent: res.intent });
});

// 7. Database Skills (5+)
const databaseQueries = [
  'What databases does he work with?',
  'Tell me about his database skills',
  'Does he know MongoDB and Mongoose?',
  'What database does he know?',
  'Tell me about his databases'
];
databaseQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'skills_database', `Database skills matched for "${query}"`, { intent: res.intent });
});

// 8. Development Tools (5+)
const toolQueries = [
  'What development tools does he use?',
  'Does he know Git and GitHub?',
  'What is his tool stack?',
  'Does he use Postman for API testing?',
  'Tell me about his tools and workflow'
];
toolQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'skills_tools', `Tools matched for "${query}"`, { intent: res.intent });
});

// 9. General Projects Overview (5+)
const projectQueries = [
  'Could you tell me about the projects he has worked on?',
  'Explore his projects',
  'Show me his portfolio creations',
  'What applications has he designed?',
  'List his portfolio projects'
];
projectQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'projects_overview', `Projects overview matched for "${query}"`, { intent: res.intent });
});

// 10. Specific Project Matching
const specificProjects = [
  { q: 'Tell me about SnapHunt', id: 'snaphunt' },
  { q: 'What is Smart Salary Tracker?', id: 'smart-salary-tracker' },
  { q: 'Can you show me Guardian Eye?', id: 'guardian-eye' },
  { q: 'Tell me about Skillly Platform', id: 'skillly-platform' },
  { q: 'What is the Salem Mar Thoma Church Portal?', id: 'salem-marthoma-church' }
];
specificProjects.forEach(({ q, id }) => {
  const res = generateAIResponse(q);
  assert(res.intent === 'project_detail', `Project detail matched for "${q}"`, { intent: res.intent });
  assert(res.context.lastMatchedProjectId === id, `Context recorded project ID ${id} for "${q}"`, { contextId: res.context.lastMatchedProjectId });
});

// 11. Work Experience & Internship (5+)
const experienceQueries = [
  'What is his work experience?',
  'Tell me about his internship at Lumina Technology Lab',
  'Where has he worked before?',
  'What is his career history?',
  'Does he have industry experience?'
];
experienceQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'experience', `Experience matched for "${query}"`, { intent: res.intent });
});

// 12. Education & Degree (5+)
const educationQueries = [
  'Where did he study?',
  'What university degree does he hold?',
  'Where did he graduate from college?',
  'Tell me about his BSc degree at University of Kerala',
  'What is his academic background?'
];
educationQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'education', `Education matched for "${query}"`, { intent: res.intent });
});

// 13. Certifications (5+)
const certificationQueries = [
  'What certifications does he hold?',
  'Does he have any credentials or certificates?',
  'Has he completed any Coursera or Meta certifications?',
  'What achievements has he earned?',
  'Tell me about his verified certificates'
];
certificationQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'certifications', `Certifications matched for "${query}"`, { intent: res.intent });
});

// 14. Learning Lab & Goals (5+)
const labQueries = [
  'What is in the learning lab?',
  'What is he learning right now?',
  'Tell me about his active experiments',
  'What are his future research and development goals?',
  'What is his next goal in the lab?'
];
labQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'learning_lab', `Learning lab matched for "${query}"`, { intent: res.intent });
});

// 15. Resume (5+)
const resumeQueries = [
  'Show me his resume',
  'Can I download his CV?',
  'Where can I see his curriculum vitae?',
  'Show resume',
  'How do I view his CV?'
];
resumeQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'resume', `Resume matched for "${query}"`, { intent: res.intent });
});

// 16. Contact & Socials (5+)
const contactQueries = [
  'How can I contact him?',
  'What is his email address?',
  'Where can I find him on GitHub or LinkedIn?',
  'How do I get in touch with Tinu?',
  'Send him a message'
];
contactQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'contact', `Contact matched for "${query}"`, { intent: res.intent });
});

// 17. Availability & Hiring (5+)
const hireQueries = [
  'Is he available for hire?',
  'Is Tinu open to full-time work?',
  'Can I hire him for freelance work?',
  'What is his current availability status?',
  'Are you available for employment?'
];
hireQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'availability', `Availability matched for "${query}"`, { intent: res.intent });
});

// 18. Context & Pronoun Follow-up Chain
console.log('Testing conversational context & pronoun resolution:');
let conversationContext = {};

// Turn 1: Inquire about SnapHunt
const turn1 = generateAIResponse('Tell me about SnapHunt', conversationContext);
assert(turn1.intent === 'project_detail' && turn1.context.lastMatchedProjectId === 'snaphunt', 'Turn 1: Project matched SnapHunt');
conversationContext = turn1.context;

// Turn 2: Follow up with pronoun "its database"
const turn2 = generateAIResponse('And what about its database?', conversationContext);
assert(turn2.intent === 'project_followup', 'Turn 2: Follow-up intent matched project_followup');
assert(turn2.text.includes('SnapHunt') && turn2.text.includes('MongoDB'), 'Turn 2: Follow-up correctly mentioned SnapHunt and MongoDB', { text: turn2.text.slice(0, 100) });
conversationContext = turn2.context;

// Turn 3: Follow up "Who worked on it?"
const turn3 = generateAIResponse('Who worked on it?', conversationContext);
assert(turn3.intent === 'project_followup', 'Turn 3: Follow-up intent matched project_followup');
assert(turn3.text.includes('Tinu') && turn3.text.includes('SnapHunt'), 'Turn 3: Follow-up explained Tinu contributions on SnapHunt');
conversationContext = turn3.context;

// Turn 4: Follow up "Tell me more"
const turn4 = generateAIResponse('Tell me more', conversationContext);
assert(turn4.intent === 'project_followup', 'Turn 4: Follow-up deep dive on SnapHunt');
assert(turn4.text.includes('The Problem') && turn4.text.includes('The Solution'), 'Turn 4: Included problem & solution');
conversationContext = turn4.context;

// Turn 5: "What other projects has he done?"
const turn5 = generateAIResponse('What other projects has he done?', conversationContext);
assert(turn5.text.includes('Other Featured Projects') && turn5.text.includes('Smart Salary Tracker'), 'Turn 5: Listed other projects without repeating current as only one');

// 19. Context Reset Behavior
const resetContext = { lastIntent: null, lastMatchedProjectId: null, lastTopic: null, turnCount: 0 };
const turnAfterReset = generateAIResponse('And what about its database?', resetContext);
assert(turnAfterReset.intent !== 'project_followup', 'Resetting context prevents false pronoun binding to old project');

// 20. Overlapping Keyword False-Positive Guards
const falsePositiveChecks = [
  { q: 'What is his work experience?', expected: 'experience', notExpected: 'projects_overview' },
  { q: 'Tell me about his databases', expected: 'skills_database', notExpected: 'about' },
  { q: 'Can I hire him to build a web application?', expected: ['capabilities', 'availability'], notExpected: 'projects_overview' }
];
falsePositiveChecks.forEach(({ q, expected, notExpected }) => {
  const res = generateAIResponse(q);
  const isMatch = Array.isArray(expected) ? expected.includes(res.intent) : res.intent === expected;
  assert(isMatch, `False-positive guard passed for "${q}" (got ${res.intent})`, { intent: res.intent, notExpected });
});

// 21. Unknown / Off-Topic Queries (Must NOT produce an unrelated answer)
const unknownQueries = [
  'What is the weather on Mars today?',
  'Can you write a poem about chocolate chip cookies?',
  'Who won the 1998 football World Cup final?',
  'Explain the theory of general relativity in detail',
  'Is Paris good in the spring?',
  'Can a turtle build a nest on the beach?',
  'Would you like some ice cream?'
];
unknownQueries.forEach((query) => {
  const res = generateAIResponse(query);
  assert(res.intent === 'unknown', `Off-topic query safely classified as unknown for "${query}"`, { intent: res.intent });
});

// 22. Empty input handling
const emptyRes1 = generateAIResponse('');
assert(emptyRes1.intent === 'empty', 'Empty string returns empty intent');
const emptyRes2 = generateAIResponse('   ');
assert(emptyRes2.intent === 'empty', 'Whitespace string returns empty intent');

console.log('\n====================================================');
console.log(`📊 Test Summary: Total: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
const passRate = ((passed / (passed + failed)) * 100).toFixed(1);
console.log(`🎯 Pass Rate: ${passRate}%`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
}
