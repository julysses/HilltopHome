import { HeaderMinimal } from "@/components/layout/HeaderMinimal";
import { FooterMinimal } from "@/components/layout/FooterMinimal";

export default function GetAnOfferLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderMinimal />
      <main>{children}</main>
      <FooterMinimal />
    </>
  );
}
