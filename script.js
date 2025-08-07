import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.4.1';

const btn = document.getElementById('analyzeBtn');
const input = document.getElementById('textInput');
const output = document.getElementById('output');
const loading = document.getElementById('loading');
const examples = document.querySelectorAll('.example');

let sentiment = null;
let modelLoaded = false;

// Beispiel-Buttons setzen das Eingabefeld
examples.forEach(button => {
  button.addEventListener('click', () => {
    input.value = button.innerText;
    input.focus();
  });
});

btn.addEventListener('click', async () => {
  const text = input.value.trim();
  if (!text) {
    output.innerText = 'Bitte geben Sie einen Satz ein.';
    return;
  }

  output.innerHTML = '';
  loading.style.display = 'block';

  if (!modelLoaded) {
    sentiment = await pipeline('sentiment-analysis');
    modelLoaded = true;
  }

  loading.innerText = '⏳ Analyse läuft…';

  const result = await sentiment(text);
  const label = result[0].label;
  const score = result[0].score;

  loading.style.display = 'none';

  let emoji = '😐';
  let interpretation = 'Klingt neutral oder sachlich.';
  if (label === 'POSITIVE') {
    emoji = '😊';
    interpretation = 'Klingt freundlich und bürgernah.';
  } else if (label === 'NEGATIVE') {
    emoji = '😡';
    interpretation = 'Klingt eher abweisend oder unhöflich.';
  }

  let confidence = '';
  if (score >= 0.9) {
    confidence = 'Die KI ist sich dabei sehr sicher.';
  } else if (score >= 0.7) {
    confidence = 'Die KI ist sich ziemlich sicher.';
  } else {
    confidence = 'Die KI ist sich dabei nicht ganz sicher.';
  }

  output.innerHTML = `${emoji} <strong>${interpretation}</strong><br><small>${confidence}</small>`;
});
