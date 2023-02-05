import Link from "next/link";
import { StyledButton } from "@/components/UI/Button";
export default function Custom404() {
  return (
    <main>
      <h1>404 - Page not Found</h1>
      <iframe
        src="https://im2.ezgif.com/tmp/ezgif-2-4ebe7abc86.gif"
        width="480"
        height="362"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Link href="/">
        <StyledButton color="blue">Go home</StyledButton>
      </Link>
    </main>
  );
}
