import Navbar from "@/_components/common/navbar";
import localFont from "next/font/local";

const circularMedium = localFont({
  src: "../fonts/circular-medium.ttf",
  variable: "--font-circular-medium",
  weight: "100 900",
});

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`min-h-[calc(100vh)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 ${circularMedium.variable}`}
    >
      <Navbar />
      {children}
    </div>
  );
};
export default ProfileLayout;
