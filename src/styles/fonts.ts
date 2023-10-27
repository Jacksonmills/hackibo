import { Inter, Gothic_A1 } from 'next/font/google';

// define your variable fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const logo = Gothic_A1({
  subsets: ["latin"],
  weight: "900"
});

export { inter, logo };