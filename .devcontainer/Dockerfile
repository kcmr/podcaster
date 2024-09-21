FROM node:20

RUN npm install -g pnpm && \
    pnpm config set store-dir /root/.cache/pnpm

WORKDIR /workspace

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

# 5173 for development (pnpm dev)
# 4173 for preview in production mode (pnpm build && pnpm preview)
EXPOSE 5173 4173
