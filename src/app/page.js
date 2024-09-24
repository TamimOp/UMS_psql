"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("/api/auth/verify");

        console.log(response.data);

        if (response.data.valid) {
          router.push("/admin");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Token verification failed:", error.message);
      }
    };
    verifyToken();
  }, [router]);

  return;
}
