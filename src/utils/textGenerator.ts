import { Difficulty, PracticeMode } from '../types';

const articles = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "Hello world, this is a typing practice application.",
    "Learning to type faster is a useful skill.",
    "Practice makes perfect in typing.",
    "Consistency is key to improvement."
  ],
  medium: [
    "Technology has revolutionized how we communicate and work in the modern world.",
    "Artificial intelligence is reshaping industries and creating new opportunities.",
    "Climate change requires immediate action from governments and individuals worldwide.",
    "Digital transformation is accelerating across all sectors of the economy.",
    "Cybersecurity threats continue to evolve at an alarming rate."
  ],
  hard: [
    "The quintessential paradigm of contemporary epistemology necessitates a comprehensive reevaluation of fundamental methodological frameworks.",
    "Interdisciplinary collaboration facilitates innovative solutions to multifaceted socioeconomic challenges.",
    "The proliferation of misinformation in digital ecosystems demands sophisticated critical evaluation mechanisms.",
    "Cryptocurrency represents a paradigmatic shift in decentralized financial architecture.",
    "Quantum computing promises exponential computational advantages through superposition and entanglement phenomena."
  ]
};

const codeSnippets = {
  easy: [
    "const hello = 'world';",
    "function add(a, b) { return a + b; }",
    "if (true) { console.log('hello'); }",
    "const arr = [1, 2, 3, 4, 5];",
    "let x = 10; x += 5;"
  ],
  medium: [
    "const result = array.map(x => x * 2).filter(x => x > 5);",
    "async function fetchData() { const data = await fetch(url); }",
    "class User { constructor(name) { this.name = name; } }",
    "const obj = { name: 'John', age: 30, ...spread };",
    "try { risky(); } catch(e) { console.error(e); }"
  ],
  hard: [
    "const fibonacci = (n) => n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);",
    "const memoize = (fn) => { const cache = {}; return (...args) => { const key = JSON.stringify(args); return key in cache ? cache[key] : cache[key] = fn(...args); }; };",
    "interface IAsyncIterator<T> { [Symbol.asyncIterator](): AsyncIterableIterator<T>; }",
    "const deepClone = (obj) => JSON.parse(JSON.stringify(obj));",
    "export const promiseAll = (promises) => new Promise((res, rej) => { let count = 0; const results = []; promises.forEach((p, i) => p.then(r => { results[i] = r; count++; count === promises.length && res(results); }).catch(rej)); });"
  ]
};

export const textGenerator = {
  generate: (difficulty: Difficulty, mode: PracticeMode): string => {
    let pool: string[];
    
    if (mode === PracticeMode.CODE) {
      pool = codeSnippets[difficulty];
    } else {
      pool = articles[difficulty];
    }
    
    const text = pool[Math.floor(Math.random() * pool.length)];
    
    if (mode === PracticeMode.WORDS) {
      return text.split(' ').slice(0, 20).join(' ');
    }
    if (mode === PracticeMode.SENTENCES) {
      return text.split('.').slice(0, 2).join('. ');
    }
    
    return text;
  }
};
