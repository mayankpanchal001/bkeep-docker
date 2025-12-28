FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts
COPY --from=builder /app/dist ./dist
COPY public ./public
EXPOSE 8000
CMD ["node","-r","dotenv/config","dist/server.js"]
