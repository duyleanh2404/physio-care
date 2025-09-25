import AuthGuard from "@/components/guards/AuthGuard";

export default function Home() {
  return <AuthGuard>Home</AuthGuard>;
}
