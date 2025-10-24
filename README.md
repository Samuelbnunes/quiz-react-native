# Quiz App - Neobrutalism Style

Este é um aplicativo de quiz desenvolvido em React Native (Expo) como parte de um projeto acadêmico. O design do aplicativo segue o estilo visual Neobrutalismo, e os dados das perguntas são consumidos da API Open Trivia Database.

## Integrantes do Grupo

*   **Nome:** [Samuel Barquel Nunes]
    *   **RA:** [1136923]
*   **Nome:** [Arthur]
    *   **RA:** [1111111]
*   **Nome:** [Dionatha]
    *   **RA:** [2222222]

## Tecnologias Utilizadas

*   React Native (com Expo)
*   JavaScript
*   React Navigation
*   Axios
*   Sistema de tradução customizado

## Como Executar o Projeto

### 1. Pré-requisitos

*   Node.js (versão LTS recomendada)
*   NPM ou Yarn
*   Expo Go (aplicativo para celular) ou um emulador Android/iOS.

### 2. Instalação

Clone o repositório e instale as dependências:

```bash
# Clone este repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse a pasta do projeto
cd seu-repositorio

# Instale as dependências
npm install
```

*Se você usa Yarn, execute `yarn install`.*

### 3. Execução

Para iniciar o servidor de desenvolvimento do Expo, execute o seguinte comando:

```bash
npx expo start
```

Isso abrirá o Metro Bundler no seu navegador. Você pode então escanear o QR code com o aplicativo Expo Go no seu celular para rodar o projeto.

---

## Funcionalidades

*   Tela inicial para inserção de nome e seleção de categoria/dificuldade.
*   Quiz com perguntas de múltipla escolha.
*   Tela de resultado com pontuação.
*   Interface traduzida para Inglês, Português e Espanhol.
*   **Tradução Dinâmica:** As perguntas e respostas são traduzidas dinamicamente para o idioma selecionado (Português ou Espanhol) usando a Google Cloud Translation API.
