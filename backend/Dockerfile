FROM node:22.1-alpine as builder
RUN npm install -g pnpm
RUN pnpm config set enable-pre-post-scripts true
WORKDIR /app
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm i

COPY . .
RUN pnpm build
RUN rm -rf src \
    tsconfig.json

ENV NODE_ENV=production
EXPOSE 5048

CMD [ "pnpm", "start" ]