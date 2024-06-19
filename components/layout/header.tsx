import Link from "next/link";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4 justify-between">
      <div className="flex flex-col">
        <Link
          href="/"
          prefetch
          className="text-xl font-semibold"
          dangerouslySetInnerHTML={{ __html: title }}
        ></Link>
      </div>
    </header>
  );
};

export default Header;
