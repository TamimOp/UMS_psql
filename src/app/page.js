// app/page.js

import LoginPage from "@/components/LoginPage";
import AdminPanel from "../components/AdminPanel";

export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <LoginPage />
      <AdminPanel />
    </main>
  );
}
