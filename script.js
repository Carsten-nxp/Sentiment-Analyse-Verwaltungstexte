import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.4.1';

const sentiment = await pipeline('sentiment-analysis');

const btn = document.getElementById('analyzeBtn');
const input = document.getElementById('textInput');
const output = document.getElementById('output');

btn.addEventListener('click', async () => {
  const text = input.value.trim();
  if (!text) {
    output.innerText = 'Bitte geben Sie einen Satz ein.';
    return;
  }

  output.innerText = 'Analyse läuft…';

  const result = await sentiment(text);
  const label = result[0].label;
  const score = (result[0].score * 100).toFixed(1);

  let emoji = '😐';
  if (label === 'POSITIVE') emoji = '😊';
  else if (label === 'NEGATIVE') emoji = '😡';

  output.innerHTML = `${emoji} <strong>${label}</strong> Stimmung<br><small>(${score}% Wahrscheinlichkeit)</small>`;
});
