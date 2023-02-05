import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";


export default function AuthCheck(props) {
  const { username } = useAuth();

  return username
    ? props.children
    : props.fallback || <Link href="/enter">You must be signed in</Link>;
}


