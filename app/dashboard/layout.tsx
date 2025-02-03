import SideNav from "../ui/dashboard/sidenav";

// Defines a layout that will nest all pages in the app/dashboard
export default function Layout({children} : {children: React.ReactNode}) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                {/* That means all pages in the app/dashboard will have a sidebar nav */}
                <SideNav />
            </div>
        </div>
    );
}