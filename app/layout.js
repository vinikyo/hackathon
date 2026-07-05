import "./globals.css";

export const metadata = {
  title: "StudyMons",
  description: "Hub escolar gamificado com jogos educativos, quizzes e ranking por sala.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
