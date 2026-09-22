const ACCESS_PASSWORD = 'sarah janjua';

const classes = Array.from({ length: 12 }, (_, index) => `Class ${index + 1}`);
const subjects = ['English', 'Urdu', 'Maths', 'Science', 'Social Studies', 'Computer'];

const chapterMap = {
  English: [
    { title: 'Chapter 1: Reading Skills', desc: 'Reading, vocabulary, and meaning practice.', tag: 'Reading' },
    { title: 'Chapter 2: Grammar Basics', desc: 'Sentence structure and simple rules.', tag: 'Grammar' },
    { title: 'Chapter 3: Exercise Practice', desc: 'Exercise and Q/A support for better confidence.', tag: 'Practice' }
  ],
  Urdu: [
    { title: 'Chapter 1: Urdu Reading', desc: 'Paragraph reading and easy Urdu explanation.', tag: 'Urdu' },
    { title: 'Chapter 2: Meanings', desc: 'Difficult words and their Urdu meanings.', tag: 'Meanings' },
    { title: 'Chapter 3: Revision', desc: 'Short questions and chapter recap.', tag: 'Revision' }
  ],
  Maths: [
    { title: 'Chapter 1: Numbers', desc: 'Basic calculations and concept understanding.', tag: 'Numbers' },
    { title: 'Chapter 2: Fractions', desc: 'Simple examples and practice.', tag: 'Fractions' },
    { title: 'Chapter 3: Exercise', desc: 'Step-by-step solving and revision.', tag: 'Practice' }
  ],
  Science: [
    { title: 'Chapter 1: Basic Concepts', desc: 'Core ideas explained clearly.', tag: 'Concepts' },
    { title: 'Chapter 2: Questions', desc: 'Short answers and easy understanding.', tag: 'Questions' },
    { title: 'Chapter 3: Quiz', desc: 'Quick revision and confidence building.', tag: 'Quiz' }
  ],
  'Social Studies': [
    { title: 'Chapter 1: Pakistan Studies', desc: 'Long and short question preparation.', tag: 'Pakistan' },
    { title: 'Chapter 2: Civics', desc: 'Concepts explained in simple language.', tag: 'Civics' }
  ],
  Computer: [
    { title: 'Chapter 1: Basics', desc: 'Computer basics and digital learning.', tag: 'Basics' },
    { title: 'Chapter 2: Practice', desc: 'Exercises and simple revision.', tag: 'Practice' }
  ]
};

let selectedClass = 'Class 7';
let selectedSubject = 'English';

const authScreen = document.getElementById('auth-screen');
const app = document.getElementById('app');
const passwordInput = document.getElementById('password');
const errorMsg = document.getElementById('error-msg');

function renderClasses() {
  const container = document.getElementById('classList');
  container.innerHTML = '';

  classes.forEach((item) => {
    const button = document.createElement('button');
    button.className = 'chip ' + (selectedClass === item ? 'active' : '');
    button.textContent = item;
    button.addEventListener('click', () => {
      selectedClass = item;
      renderClasses();
      renderChapters();
    });
    container.appendChild(button);
  });
}

function renderSubjects() {
  const container = document.getElementById('subjectList');
  container.innerHTML = '';

  subjects.forEach((item) => {
    const button = document.createElement('button');
    button.className = 'chip ' + (selectedSubject === item ? 'active' : '');
    button.textContent = item;
    button.addEventListener('click', () => {
      selectedSubject = item;
      renderSubjects();
      renderChapters();
    });
    container.appendChild(button);
  });
}

function renderChapters() {
  const container = document.getElementById('chapterList');
  const chapters = chapterMap[selectedSubject] || chapterMap.English;

  container.innerHTML = chapters.map((chapter) => `
    <article class="chapter-card">
      <div>
        <p class="tiny-label">${chapter.tag}</p>
        <h4>${chapter.title}</h4>
        <p>${chapter.desc}</p>
      </div>
      <div class="chapter-meta">
        <span>${selectedClass}</span>
        <button class="chapter-btn" type="button">Open</button>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('.chapter-btn').forEach((button, index) => {
    button.addEventListener('click', () => {
      const choice = chapters[index];
      alert(`${choice.title}\n\nStudy flow:\n- Read chapter\n- Learn difficult words\n- Solve exercise\n- Practice question answers\n- Revision quiz`);
    });
  });
}

function openApp() {
  const typed = passwordInput.value.trim();

  if (typed === ACCESS_PASSWORD) {
    sessionStorage.setItem('arzooUnlocked', 'true');
    authScreen.classList.add('hidden');
    app.classList.remove('hidden');
    errorMsg.textContent = '';
  } else {
    errorMsg.textContent = 'Password sahi nahi hai.';
  }
}

function lockApp() {
  sessionStorage.removeItem('arzooUnlocked');
  app.classList.add('hidden');
  authScreen.classList.remove('hidden');
  passwordInput.value = '';
  errorMsg.textContent = '';
}

document.getElementById('unlock-btn').addEventListener('click', openApp);
document.getElementById('logout-btn').addEventListener('click', lockApp);

document.querySelectorAll('[data-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

if (sessionStorage.getItem('arzooUnlocked') === 'true') {
  authScreen.classList.add('hidden');
  app.classList.remove('hidden');
}

renderClasses();
renderSubjects();
renderChapters();
