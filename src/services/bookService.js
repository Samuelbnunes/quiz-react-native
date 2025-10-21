import axios from "axios";



// TODO: trocar pela API de livros do perdo.


export async function getBookList() {
  // Usando a API do Google Books para buscar livros sobre "React Native"
  const response = await axios.get("https://www.googleapis.com/books/v1/volumes?q=react+native&maxResults=20");
  
  if (!response.data.items) {
    return [];
  }
  return response.data.items.map((book) => {
    const bookInfo = book.volumeInfo;

    return {
      id: book.id,
      title: bookInfo.title,
      image: bookInfo.imageLinks?.thumbnail || `https://picsum.photos/seed/${book.id}/200/300`,
      url: book.selfLink, 
    };
  });
}

export async function getBookBy(url) {
  const response = await axios.get(url);
  const bookData = response.data.volumeInfo;

  const isbn13 = bookData.industryIdentifiers?.find(i => i.type === 'ISBN_13');

  return {
    id: bookData.id,
    title: bookData.title,
    author: bookData.authors ? bookData.authors.join(', ') : 'Autor desconhecido',
    pages: bookData.pageCount || 'N/A',
    isbn: isbn13 ? isbn13.identifier : 'N/A',
    image: bookData.imageLinks?.thumbnail || `https://picsum.photos/seed/${response.data.id}/200/300`,
  };
}
