import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý bệnh nhân",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
