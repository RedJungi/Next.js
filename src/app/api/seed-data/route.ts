import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 테스트용 더미 데이터 생성
    const posts = await prisma.post.createMany({
      data: [
        {
          title: "First Blog Post",
          content: "This is the first blog post content",
          author: "Admin",
        },
        {
          title: "Second Blog Post",
          content: "This is the second blog post content",
          author: "Admin",
        },
        {
          title: "Third Blog Post",
          content: "This is the third blog post content",
          author: "User",
        },
      ],
      skipDuplicates: true,
    });

    return NextResponse.json({ // 성공시 응답 반환
      success: true,
      message: "Test data created successfully",
      created: posts.count,
    }); 
  } catch (error) { // 예외 처리
    console.error("Error creating test data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create test data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
