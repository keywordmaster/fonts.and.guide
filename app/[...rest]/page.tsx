import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">404</h1>

      {/* <Button asChild className="mt-4"> */}
      <Link href="/">
        {/* <Icon.undo className="mr-2 h-4 w-4" /> {t("goto")} */}메인으로
      </Link>
      {/* </Button> */}
    </div>
  );
}
