import SideNav from "../ui/dashboard/sidenav";

export const experimental_ppr = true;

// Defines a layout that will nest all pages in the app/dashboard
export default function Layout({children} : {children: React.ReactNode}) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                {/* That means all pages in the app/dashboard will have a sidebar nav */}
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}