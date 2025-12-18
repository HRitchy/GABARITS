import './globals.css';

export const metadata = {
  title: 'Quiz fonction de contrôle',
  description: 'Apprentissage ludique des fonctions de contrôle des attaches',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
