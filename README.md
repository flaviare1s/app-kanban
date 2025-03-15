# Kanban App

Este é um aplicativo de gerenciamento de tarefas estilo Kanban. Ele pode ser facilmente executado em um ambiente Docker.

## Acessando o deploy

https://app-kanban.vercel.app/

## Como rodar o projeto com Docker

### Passo 1: Baixar a imagem do Docker

Primeiro, baixe a imagem do Docker Hub com o seguinte comando:

*docker pull flaviare1s/app-kanban:v1*

### Passo 2: Rodar o contêiner

Após a imagem ser baixada, você pode rodar o contêiner com o comando abaixo. Isso fará o aplicativo ser executado e acessível na porta 8080 da sua máquina:

*docker run -p 8081:80 flaviare1s/app-kanban:v1*

O comando acima irá mapear a porta 80 do contêiner para a porta 8080 da sua máquina, permitindo acessar o app no endereço `http://localhost:8080` no seu navegador.

### Passo 3: Acessar o aplicativo

Após rodar o contêiner, basta acessar o aplicativo através de seu navegador na URL:
http://localhost:8081



## Como rodar o projeto localmente (sem Docker)

### Passo 1: Clonar o repositório

Clone o repositório na sua máquina:

*git clone https://github.com/flaviare1s/app-kanban.git*

### Passo 2: Instalar as dependências

Entre no diretório do projeto e instale as dependências com o npm:

*cd app-kanban*
*npm install*

### Passo 3: Rodar o aplicativo

Agora, execute o projeto:

*npm run dev*

