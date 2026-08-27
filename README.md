<h1 align="center">🎮 GameList</h1>

Aplicativo mobile desenvolvido como Projeto Integrador do SENAI — Escola Ítalo Bologna.

O **GameList** tem como objetivo permitir que o usuário cadastre e organize seus jogos, acompanhando informações como plataforma, gênero, nota e status de progresso.

## 📱 Funcionalidades

* 🎮 Cadastrar jogos
* 📋 Listar jogos cadastrados
* ✏️ Editar informações dos jogos
* ✅ Alterar o status do jogo
* 🗑️ Excluir jogos
* 🔎 Filtrar jogos por status
* 💾 Salvar os dados mesmo após fechar o aplicativo

## 🔄 Status dos jogos

Cada jogo pode possuir um dos seguintes status:

* **Quero jogar**
* **Jogando**
* **Concluído**

## 📝 Informações cadastradas

Cada jogo possui:

* Nome
* Plataforma
* Gênero
* Nota
* Status

## 💾 Persistência de dados

O projeto utiliza **AsyncStorage** para armazenar os jogos no dispositivo.

A escolha foi feita porque os dados utilizados pelo aplicativo são simples e não possuem relacionamentos complexos entre diferentes tabelas. Dessa forma, o AsyncStorage atende às necessidades do projeto de maneira prática e adequada.

## 🛠️ Tecnologias utilizadas

* React Native
* JavaScript
* AsyncStorage
* FlatList
* Git
* GitHub

## 📂 Estrutura do projeto

```text
GameList/
├── src/
│   ├── components/
│   │   └── JogoCard.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   └── CadastroScreen.js
│   └── services/
│       └── storage.js
├── App.js
├── package.json
└── README.md
```

## ▶️ Como executar

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Entrar na pasta

```bash
cd GameList
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar o projeto

```bash
npx expo start
```

Depois, o aplicativo pode ser executado utilizando um dispositivo físico com **Expo Go** ou um emulador Android.

## 👥 Integrantes

* **Pedro Jimenez**
* **Rafael Teixeira**

## 🎓 Projeto Integrador

**SENAI — Escola Ítalo Bologna**

Disciplina: **Programação para Dispositivos Móveis • Persistência de Dados**

Projeto desenvolvido para demonstrar:

* Desenvolvimento de interfaces mobile
* Componentização
* Utilização de `FlatList`
* Operações CRUD
* Persistência de dados
* Trabalho colaborativo utilizando Git e GitHub