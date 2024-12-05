import AdminSidebar from "./_components/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return <AdminSidebar>{children}</AdminSidebar>;
};
export default AdminLayout;
