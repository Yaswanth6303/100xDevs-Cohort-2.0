export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xl font-bold text-center py-4">
        Welcome to the Auth Layout
      </div>
      {children}
    </div>
  );
}
