import { Button } from "@/components/ui/button";
import "./FeedPage.css";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/authentication.hooks";

export default function FeedPage() {
  const navigation = useNavigate();
  const { logout } = useLogout(navigation)

  return <section className="">Welcome to Authenticated Feed Page
  <Button onClick={logout}>Logout</Button>
  </section>;
}
