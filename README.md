# Projeto para a vaga Web Developer do CETT!

Tecnologias utilizadas no projeto: JavaScript, HTML, CSS, React, Node, Express, TypeScript, PostgresSQL.

Para rodar o front-end

```terminal
cd frontend
npm install
npm run dev
```

Para rodar o back-end

```terminal
cd server
npm install
npm start
```

Para criar as tabelas no pg

- Utilize o arquivo de backup chamado desafio na pasta server
- No psql use os seguintes comandos:

```SQL
psql -U seu_usuario -d mydatabase
\i desafio.sql
```

- Ou crie as tabelas
- Tabela 'usuarios'

```SQL
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  data_nascimento DATE,
  imagem VARCHAR(255)
);
```

- Tabela 'posts'

```SQL
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  imagem VARCHAR(255),
  texto TEXT,
  id_usuario INTEGER REFERENCES usuarios(id),
  curtidas INTEGER DEFAULT 0,
  comentarios INTEGER DEFAULT 0
  hora_criacao TIMESTAMP DEFAULT NOW();
);
```

- Tabela 'comentários'

```SQL
CREATE TABLE posts (
 CREATE TABLE comentarios (
  id SERIAL PRIMARY KEY,
  conteudo TEXT,
  id_post INTEGER REFERENCES posts(id),
  id_usuario INTEGER REFERENCES usuarios(id),
  curtidas INTEGER DEFAULT 0
  hora_criacao TIMESTAMP DEFAULT NOW();
);

);
```

- Tabela 'curtidas'

```SQL
 CREATE TABLE curtidas (
  id_usuario INTEGER REFERENCES usuarios(id),
  id_post INTEGER REFERENCES posts(id),
  PRIMARY KEY (id_usuario, id_post)
);
```
