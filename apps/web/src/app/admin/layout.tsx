import AdminSidebat from "./_components/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return <AdminSidebat>{children}</AdminSidebat>;
};
export default AdminLayout;
