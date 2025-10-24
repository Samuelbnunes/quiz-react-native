import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://opentdb.com',
  timeout: 10000, // 10 segundos
});

export const fetchCategories = () => {
  return apiClient.get('/api_category.php');
};

export const fetchQuestions = (amount, category, difficulty) => {
  let url = `/api.php?amount=${amount}`;
  if (category) {
    url += `&category=${category}`;
  }
  if (difficulty) {
    url += `&difficulty=${difficulty}`;
  }
  url += '&type=multiple';

  return apiClient.get(url);
};

export const translateText = async (text, targetLang) => {
  // Obtenha a chave de API do Google Translate do ambiente
  // Para Expo, as variáveis de ambiente precisam ser prefixadas com EXPO_PUBLIC_
  const GOOGLE_TRANSLATE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY;

  if (!GOOGLE_TRANSLATE_API_KEY) {
    console.error('Google Translate API Key is not set in environment variables.');
    return text; // Retorna o texto original se a chave não estiver configurada
  }

  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        q: text,
        target: targetLang,
        source: 'en',
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation API error (Google):', error.response ? error.response.data : error.message);
    return text;
  }
};