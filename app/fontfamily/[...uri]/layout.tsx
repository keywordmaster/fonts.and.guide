export default async function FontLayout({ children }) {
  return (
    <div className="grid flex-1 gap-4 overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
