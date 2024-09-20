import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", {
        name,
        email,
        password,
        position,
      });
      alert("User registered successfully");
      router.push("/admin");
    } catch (err) {
      alert("Error registering user");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      router.push("/admin");
    } catch (err) {
      alert("Error logging in");
    }
  };

  return (
    <form onSubmit={isRegistering ? handleRegister : handleLogin}>
      {/* Registration and login fields */}
    </form>
  );
}
