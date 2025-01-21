import { NavSidebar } from "@/components/nav/nav-sidebar";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col  md:flex-row bg-[#F7F8FA]">
      <NavSidebar />
      <div className="flex-1">
        <main>{children}</main>
      </div>
    </div>
  );
}
