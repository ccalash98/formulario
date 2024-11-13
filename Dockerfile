# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de tu proyecto
COPY . .

# Expone el puerto que usará el servidor
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
