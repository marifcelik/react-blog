FROM node:22.1-alpine
RUN npm install -g pnpm
RUN pnpm config set enable-pre-post-scripts true
WORKDIR /app
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm i

COPY . .
RUN pnpm build
RUN rm -rf src db \
    tsconfig.json

ENV NODE_ENV=production
ARG PORT=3000
ENV PORT=$PORT

EXPOSE $PORT

CMD [ "pnpm", "start" ]