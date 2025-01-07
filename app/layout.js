import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "./globals.css";
import { AuthProvider } from "./providers/provider";

export const metadata = {
  title: "Library Management System",
  description: "Made by Varun Negi ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthProvider>
          <SidebarProvider>
            <AppSidebar></AppSidebar>
            <SidebarTrigger />
            {children}
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
