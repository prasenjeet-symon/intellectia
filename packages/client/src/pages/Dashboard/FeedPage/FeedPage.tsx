import { Button } from "@/components/ui/button";
import "./FeedPage.css";
import AxiosClient from "@/api/apiClient";

export default function FeedPage() {
  const logOut= ()=>{
    AxiosClient.getInstance().removeToken();
  }

  return <section className="">Welcome to Authenticated Feed Page
  <Button onClick={() => {logOut()}}>Logout</Button>
  </section>;
}
