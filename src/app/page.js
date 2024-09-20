import LoginPage from "@/app/login/page";
import AdminPanel from "@/app/admin/page";

export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <LoginPage />
      <AdminPanel />
    </main>
  );
}
