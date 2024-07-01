import { Timer } from "lucide-react";

const RedaingTime = ({ content }: { content: string }) => {
  // TODO: rawHTML을 DOM Content로 변환 후 이너 텍스트를 추출하는 방법으로 변경 필요
  const words = content.split(" ").length;
  const wordsPerMinute = 300;
  const minutes = Math.ceil(words / wordsPerMinute);
  return (
    <div className="flex gap-2 items-center text-sm">
      <Timer className="size-3" />
      <span className="hidden md:inline">예상 읽기 시간</span> {minutes}분
    </div>
  );
};

export default RedaingTime;
