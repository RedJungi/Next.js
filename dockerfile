# 1단계: 빌드 단계
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# 2단계: 실행 단계
FROM node:18-alpine AS runner

WORKDIR /app

# 환경 변수 설정
ENV NODE_ENV=production

# 필요한 파일들만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public 
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/node_modules ./node_modules

# 런타임에서도 Prisma 클라이언트 재생성
RUN npx prisma generate

EXPOSE 4000
CMD ["npm", "start"]