# Image Size: 146MB
# Linux + Node + Source + Project dependencies
FROM node:lts-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Linux + Node + Source + Project dependencies + build assets
FROM base as build
WORKDIR /build
COPY --from=base /app ./
RUN npm run build

# We keep some artifacts from build
FROM node:lts-alpine AS production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/dist ./
RUN npm install -g pm2
RUN npm install
ENV PORT=3001
ENV SESSION_SECRET=corgicarbonara
ENV COOKIE_NAME=zid
ENV TYPEORM_HOST=db
ENV TYPEORM_USERNAME=postgres
ENV TYPEORM_PASSWORD=Hawaii3274!

EXPOSE 3001
CMD ["pm2-runtime", "app.js"]