# Builds the Starlight site and serves the static output with nginx. Coolify builds this on each push.
# DOCS_SITE_URL and DOCS_BASE come from the build's environment (see astro.config.mjs).
FROM node:22.23.4-alpine AS build
WORKDIR /app
RUN corepack enable
ARG DOCS_SITE_URL
ARG DOCS_BASE=/
ENV DOCS_SITE_URL=$DOCS_SITE_URL DOCS_BASE=$DOCS_BASE
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
