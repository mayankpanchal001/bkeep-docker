FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_API_ENDPOINT
ARG VITE_ENVIRONMENT
ENV VITE_API_ENDPOINT=${VITE_API_ENDPOINT}
ENV VITE_ENVIRONMENT=${VITE_ENVIRONMENT}
RUN npm run build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

