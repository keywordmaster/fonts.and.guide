import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-5xl font-bold">404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <div className="mt-5">
        <Button asChild>
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  );
}
