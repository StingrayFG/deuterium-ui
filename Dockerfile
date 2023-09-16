FROM node:18-alpine AS base


FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./

RUN  npm install --production


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_BACKEND_URL backend
ENV NEXT_PUBLIC_PORT 3000
ENV NEXT_PUBLIC_DOMAIN h2cloud.space

RUN npm run build


FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER node

ENV PORT 3000

EXPOSE ${PORT}

CMD ["npm", "start"]
