# 1단계: 빌드 단계
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: 실행 단계
FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=builder /app/build ./build 
COPY --from=builder /app/public ./public 
COPY --from=builder /app/package*.json ./ 
RUN npm install --production

EXPOSE 4000
CMD ["npm", "start"]