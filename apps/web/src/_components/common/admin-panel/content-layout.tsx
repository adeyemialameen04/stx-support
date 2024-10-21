import { Navbar } from "./navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  bg?: string;
}

export function ContentLayout({ title, children, bg }: ContentLayoutProps) {
  return (
    <div className={bg}>
      <Navbar title={title} />
      {/* Here */}
      <div className="px-4 pt-8 pb-8 sm:px-8">{children}</div>
    </div>
  );
}
