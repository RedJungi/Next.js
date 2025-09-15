#!/usr/bin/env bash
set -euo pipefail

APP_NAME="phum"
APP_DIR="/home/hjg/Next.js"
NODE_VERSION="18"
PORT="4000"                           # ← 포트 4000

# --- nvm 로드(비로그인 쉘 대비) ---
if [ -d "$HOME/.nvm" ]; then
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
  nvm use --silent "$NODE_VERSION" || true
fi

cd "$APP_DIR"

# --- 최신 코드 반영 ---
git fetch --all
git checkout -f main
git reset --hard origin/main

# --- 의존성 설치 ---
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

# --- 빌드 ---
npm run build

# --- PM2 반영 ---
if [ -f ecosystem.config.js ]; then
  pm2 start ecosystem.config.js --only "$APP_NAME" || true
  pm2 reload "$APP_NAME" --update-env || pm2 restart "$APP_NAME" --update-env
else
  # package.json에 "start": "next start -p 4000" 필요
  if pm2 list | grep -q "$APP_NAME"; then
    pm2 reload "$APP_NAME" --update-env || pm2 restart "$APP_NAME" --update-env
  else
    pm2 start npm --name "$APP_NAME" -- start -- -p "$PORT"
  fi
fi

pm2 save >/dev/null 2>&1 || true
echo "✅ Deploy done. Check: pm2 status $APP_NAME && pm2 logs $APP_NAME --lines 200"
