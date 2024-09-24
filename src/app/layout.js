import "./globals.css";

export const metadata = {
  title: "Admin Panel",
  description: "Manage users in the system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <header className="bg-blue-600 p-4 text-white">
          <h1 className="text-2xl font-bold text-center">
            User Management System
          </h1>
        </header>
        <main className="container mx-auto mt-4">{children}</main>
        <footer className="bg-blue-600 p-4 text-white text-center mt-auto">
          <p>&copy; 2024 User Management System</p>
        </footer>
      </body>
    </html>
  );
}
