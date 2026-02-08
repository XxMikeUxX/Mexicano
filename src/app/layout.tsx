import type { Metadata } from "next";
import "./globals.css";
import { ClientBody } from "./ClientBody";

export const metadata: Metadata = {
  title: "Mexican'o | Restaurant Mexicain Gastronomique",
  description: "Découvrez une cuisine mexicaine raffinée et authentique dans un cadre unique. Mexican'o vous invite à un voyage culinaire au coeur du Mexique.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌮</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
