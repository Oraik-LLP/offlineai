import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata = {
  title: "Resurrect X | Private legal AI workspace",
  description: "A controlled, source-cited AI workspace for legal teams."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
