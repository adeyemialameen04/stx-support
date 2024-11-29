import AdminPanelLayout from "@/_components/common/admin-panel/admin-panel-layout";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return <AdminPanelLayout>{children}</AdminPanelLayout>;
};
export default AdminLayout;
