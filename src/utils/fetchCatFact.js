import axios from 'axios';

const CAT_FACT_URL = 'https://catfact.ninja/fact';
const TIMEOUT_MS = parseInt(process.env.CATFACT_TIMEOUT_MS || '2000', 10);
const FALLBACK_FACT = process.env.FALLBACK_FACT || 'Cats are mysterious and wonderful creatures.';

export default async function getCatFact() {
  try {
    const resp = await axios.get(CAT_FACT_URL, { timeout: TIMEOUT_MS });
    if (resp && resp.data && typeof resp.data.fact === 'string') {
      return resp.data.fact;
    }
    console.warn('Unexpected cat fact response shape, using fallback.');
    return FALLBACK_FACT;
  } catch (err) {
    console.error('Error fetching cat fact:', err.message || err);
    return FALLBACK_FACT;
  }
}
