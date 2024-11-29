// import Navbar from "@/_components/common/navbar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className={`min-h-[calc(100vh)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300`}
		>
			{/* <Navbar /> */}
			{children}
		</div>
	);
};
export default ProfileLayout;
