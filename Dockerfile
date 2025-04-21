# Etapa 1: construção com Tailwind
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera o CSS final com Tailwind
RUN npx tailwindcss -i ./styles/styles.css -o ./styles/output.css --minify

# Etapa 2: usar nginx para servir os arquivos estáticos
FROM nginx:alpine

# Remove arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos do build
COPY --from=builder /app/ /usr/share/nginx/html

# Expondo a porta padrão
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
