import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// For a page.js or layout.js file

export const metadata = {
  // SEO Title: Include keywords like restaurant name, location, and main offerings
  title: "Marynan Bites Restaurant - Authentic Ugandan Food, Pizza & Delivery in Bunamwaya, Kampala",

  // SEO Meta Description: Longer, descriptive, includes location, offerings, and services
  description: "Experience delicious authentic Ugandan local dishes, mouth-watering pizza, crispy chicken, and golden chips at Marynan Bites Restaurant in Bunamwaya, Kampala. We offer dine-in, takeaway, and speedy delivery services to surrounding areas. Order online now!",

  // Keywords (less critical now, but still can be included)
  keywords: "Marynan Bites, Ugandan restaurant, Bunamwaya food, Kampala delivery, local dishes, pizza delivery Kampala, chicken and chips, rolex Uganda, catering Kampala",

  // Open Graph Tags for Social Media Sharing (used by Facebook, LinkedIn, etc.)
  openGraph: {
    title: "Marynan Bites Restaurant - Authentic Ugandan Food & Delivery",
    description: "Savor delicious Ugandan local dishes, pizza, chicken, and chips at Marynan Bites Restaurant in Bunamwaya. Order online for delivery.",
    url: "https://marynanbites.com/", // Replace with your actual website URL
    siteName: "Marynan Bites Restaurant", // Add siteName for clarity
    images: [
      {
        url: "https://marynanbites.com/mummy.webp", // Replace with your actual banner image URL
        width: 1200, // It's good to specify dimensions for images
        height: 630,
        alt: "Delicious Ugandan food spread on a table at Marynan Bites Restaurant", // Alt text for the OG image
      },
    ],
    locale: 'en_UG', // Specify locale for Uganda
    type: 'website',
  },

  // Favicon
  icons: {
    icon: '/favicon.ico',
  },

  // Viewport (typically handled by Next.js automatically, but can be specified if needed)
  // You generally don't need to explicitly set viewport in metadata unless you have custom requirements.
  // viewport: 'width=device-width, initial-scale=1',
};

// You no longer need the <Head> component for these meta tags in your JSX.
// This metadata constant should be exported from your layout.js or page.js file.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
