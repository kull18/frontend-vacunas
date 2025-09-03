# Etapa 1: Build de la app
FROM node:18-alpine AS build

WORKDIR /app

# Copiar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install --legacy-peer-deps

# Copiar código fuente
COPY . .

# Generar build de producción
RUN npm run build


# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Borrar contenido default de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar build generado
COPY --from=build /app/build /usr/share/nginx/html

# Exponer puerto
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
