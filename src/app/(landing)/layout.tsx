import { ReactNode } from "react";
import { NavBar } from "./_components/NavBar";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="selection:bg-pink-200">
        <NavBar />
        {children}
    </div>
  )
}       
