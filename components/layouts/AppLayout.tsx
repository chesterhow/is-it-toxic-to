import { Footer } from "../Footer";

type LayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-auto w-full flex-col items-center gap-20 p-4 sm:p-10 xl:h-screen">
      {children}
      <Footer />
    </div>
  );
}
