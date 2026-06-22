FROM node:20
# baixa imagem do node
WORKDIR /app
# cria pasta dentro do container

COPY package*.json ./
# copia arquivos

RUN npm install
# instala dependencias

COPY . .
CMD ["node", "src/app.js"]
# roda app.js
