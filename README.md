## Rodar sistema

Duplique o arquivo .env-example e altere o nome do novo arquivo para `.env`

Abra o arquivo `.env` e altere a variável `PORT` de `0000` para `3000`, conforme exemplo abaixo

```
PORT=3000
...
```

<br>

> OBS: **NUNCA** coloque informação sigilosa no arquivo `.env-example`. Caso tenha dúvidas, de preferência não o altere

> OBS 2: **NUNCA** retire o arquivo `.env` do .gitignore

<br>

Tendo o `Docker` e o `Docker Compose` instalado em sua máquina, execute o comando abaixo para dar o start no sistema

```
docker-compose up -d
```

caso queira fazer o build novamente do container execute com o parâmetro `--build`, conforme abaixo 

```
docker-compose up -d --build
```

Em seguida abra o navegador e acesse `http://localhost:3000`

Para parar o sistema execute o comando abaixo 
```
docker-compose down
```

---

## Commit
Para realizar commit é necessário seguir o padrão de mensagem abaixo. Caso contrário, o commit será recusado.

![git-commit-msg-linter-demo](https://raw.githubusercontent.com/legend80s/commit-msg-linter/master/assets/demo-7-compressed.png)
<p align="center" style="font-style: italic;">`gcam` é apenas um alias para `git commit -a -m`</p>

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Resumo no infinitivo (ex: add, create, delete, etc.). Sem caixa alta. Sem ponto final.
  │       │
  │       └─⫸ Commit Scope: Opcional, pode ser qualquer coisa que especifique o escopo da alteração do commit.
  |                          Por exemplo $location|$browser|$compile|$rootScope|ngHref|ngClick|ngView, etc.
  |                          No desenvolvimento de aplicativos, o escopo pode ser uma página, um módulo ou um componente.
  │
  └─⫸ Tipo de Commit: feat|fix|docs|style|refactor|test|chore|perf|ci|build|temp
```

Os campos `<type>` e `<summary>` são obrigatórios, o campo `(<scope>)` é opcional.

Ruim:

> Correct spelling of CHANGELOG.

Bom:

> docs: correct spelling of CHANGELOG

Bom (commit mensagem com `scope`):

> docs(CHANGELOG): correct spelling

---

## Testes

O comando abaixo executa os testes unitários

> executa somente os testes que tem a extensão .spec.ts

```
npm run test:unit
```

O comando abaixo executa os testes de integração

> executa somente os testes que tem a extensão .test.ts

```
npm run test:integration
```

O comando abaixo executa todos os testes com o `coverage`

```
npm run test:ci
```

O comando abaixo executa todos os testes sem o `coverage` e de maneira verbosa `(verbose)`

```
npm run test:verbose
```

O comando abaixo executa todos os testes sem o `coverage`

```
npm test
```