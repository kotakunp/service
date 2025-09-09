import { ReactNode } from "react";
import NavBar from "./_components/NavBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-accent/5">
      <NavBar />
      <div className="container py-6 mx-auto">{children}</div>
    </div>
  );
}
