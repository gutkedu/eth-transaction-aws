FROM public.ecr.aws/bitnami/node:16.20.0
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build && \
  npm install --production && \
  rm -rf node_modules/.cache

CMD ["node", "build/src/server.js"]