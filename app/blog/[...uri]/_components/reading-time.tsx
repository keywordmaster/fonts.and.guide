const RedaingTime = ({ content }: { content: string }) => {
  // TODO: rawHTML을 DOM Content로 변환 후 이너 텍스트를 추출하는 방법으로 변경 필요
  const words = content.split(" ").length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);
  return <>{minutes}</>;
};

export default RedaingTime;
