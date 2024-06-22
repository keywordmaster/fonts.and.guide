const ToC = ({ content }: { content: string }) => {
  // TODO: rawHTML을 DOM Content로 변환 후 heading 태그를 추출하는 방법으로 변경 필요
  // 혹은 스트링에서 heading 태그 추출
  const headList = content.split("");
  return <></>;
};
export default ToC;
