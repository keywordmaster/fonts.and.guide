export default async function FontLayout({ children }) {
  return (
    <div className="md:grid flex-1 gap-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
      <div className="relative hidden flex-col items-start gap-8 md:flex">
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </div>
      <div className="container h-full min-h-[50vh] rounded-xl bg-muted/90 p-2 lg:col-span-2">
        {children}
      </div>
    </div>
  );
}
