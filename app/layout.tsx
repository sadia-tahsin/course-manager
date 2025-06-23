// app/layout.tsx
export const metadata = {
  title: 'Course Manager',
  description: 'A simple course platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
