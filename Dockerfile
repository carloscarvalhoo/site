# ---------- Fase de Build (builder) ----------
FROM node:18-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração dos pacotes do backend e do frontend
COPY backend/package*.json ./server/
COPY frontend/package*.json ./frontend/

# Instala as dependências do backend
RUN cd server && npm install

# Instala as dependências do frontend
RUN cd frontend && npm install

# Copia todo o código do backend e do frontend
COPY backend/ ./server/
COPY frontend/ ./frontend/

# Faz o build do frontend (gera a pasta 'build')
RUN cd frontend && npm run build

# Copia o build do frontend para o backend (agora chamado `server`)
RUN cp -R frontend/build server/build

# ---------- Fase de Execução (runner) ----------
FROM node:18-alpine AS runner

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos do builder (agora em `/server`)
COPY --from=builder /app/server ./server

# Instala somente as dependências de produção
RUN cd server && npm install --production

# Exponha a porta que o servidor usará
EXPOSE 3000

# Inicia o servidor (arquivo principal index.js dentro de /server)
CMD ["node", "server/index.js"]
