import { decode } from 'html-entities';

/**
 * Embaralha os elementos de um array usando o algoritmo Fisher-Yates.
 * @param {Array} array O array a ser embaralhado.
 * @returns {Array} Um novo array com os elementos embaralhados.
 */
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Decodifica entidades HTML de uma string (ex: &quot; -> ").
 * @param {string} text O texto a ser decodificado.
 * @returns {string} O texto decodificado.
 */
export const decodeText = (text) => {
  return decode(text);
};