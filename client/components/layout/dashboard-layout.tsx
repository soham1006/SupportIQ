import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface Props {
  children: React.ReactNode;
}

export function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="relative flex flex-1 flex-col overflow-hidden">

        {/* Background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.06),transparent_35%)]" />

        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="relative flex-1 overflow-y-auto">

          <div className="mx-auto w-full max-w-7xl px-6 py-6 lg:px-8 lg:py-8">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}