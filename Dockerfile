# Static build, served by nginx. Docusaurus has no server-side component -
# `docusaurus build` produces plain HTML/CSS/JS - so there is nothing here for
# Node to do at runtime.
FROM node:20-slim AS build
WORKDIR /site

COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . .

# Baked into the build: Docusaurus renders this into canonical URLs, the
# sitemap and Open Graph tags. Get it wrong and search results/social previews
# link back to the wrong site.
ENV SITE_URL=https://docs.starkloupe.co/
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /site/build /usr/share/nginx/html

# Cloud Run injects PORT and expects the container to listen on it; the infra
# repo's Terraform hardcodes 8080 for this service, matching the other two
# frontends, so this is fixed rather than templated from $PORT.
EXPOSE 8080
