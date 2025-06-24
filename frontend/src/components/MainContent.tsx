const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full max-w-4xl mx-auto h-full p-4 sm:p-8">
      {children}
    </section>
  );
};

export default MainContent; 