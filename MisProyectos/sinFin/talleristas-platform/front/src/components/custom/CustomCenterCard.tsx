
export const CustomCenterCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex min-h-[calc(100vh-80px)] w-full items-start justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {children}
      </div>
    </section>
  );
}; 