import { Header } from "@/components/layout/Header";
import { FooterFull } from "@/components/layout/FooterFull";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <FooterFull />
    </>
  );
}
