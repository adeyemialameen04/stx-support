import AdminPanelLayout from "@/_components/common/admin-panel/admin-panel-layout";
import localFont from "next/font/local";

const circularMedium = localFont({
  src: "../../fonts/circular-medium.ttf",
  variable: "--font-circular-medium",
  weight: "100 900",
});

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminPanelLayout className={circularMedium.className}>
      {children}
    </AdminPanelLayout>
  );
};
export default AdminLayout;
