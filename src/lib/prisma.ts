import { PrismaClient } from "@prisma/client";

// Prisma Client 싱글톤 패턴
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
}; //전역 객체에 prisma 인스턴스를 저장하기 위한 타입 선언


export const prisma = globalForPrisma.prisma ?? new PrismaClient();
// → Hot Reload해도 기존 인스턴스 재사용
// → 연결 수 제한됨

// 개발 환경에서만 전역 객체에 prisma 인스턴스를 저장
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
