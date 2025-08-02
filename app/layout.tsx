import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Provider from "./Provider";

const fontPoppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", '200', '300', "400", '500', '600', "700", '800', '900'],
  subsets: ['latin'], // Add this - required for Google Fonts
  display: 'swap', // Add this for better performance
});

export const metadata: Metadata = {
  title: "Draftly - A Live Docs App",
  description: "A better version of google docs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3371FF',
          fontSize: '16px',
        }
      }}
    >
      <html lang="en">
        <body
          className={`${fontPoppins.variable} antialiased`}
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
