import LoginWithGoogle from "@/components/shared/LoginWithGoogle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUpWithEmailAndPassword } from "@/hooks/authentication.hooks";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigation = useNavigate();
  const { signup } = useSignUpWithEmailAndPassword(navigation);

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      {/* Left Side (Background Image and Text) */}
      <div className="hidden lg:block w-1/2 h-full flex flex-col justify-center items-center bg-foreground">
        <div className="h-full flex flex-col justify-center items-center">
          <img className="w-1/2" src="https://images.fineartamerica.com/images-medium-large/24-benjamin-franklin-1706-1790-granger.jpg" alt="Human Thought" />
          <h3 className="w-1/2 font-young-serif text-center text-3xl text-secondary font-bold mt-10">Empowering Human Thoughts in the Age of AI</h3>
        </div>
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-1/2 h-full p-8 flex flex-col justify-center items-center">
        <div className="mb-4 w-96 shadow-sm border p-10">
          <h2 className="text-2xl font-semibold mb-10 text-center">Welcome back!</h2>
          <form className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Input placeholder="Enter your email" type="email" />
              <Input placeholder="Enter your password" type="password" />
            </div>
            <div className="pt-5">
              <Button onClick={()=>{ signup('', '') }} className="w-full" size={"sm"} type="button" variant={"default"}>
                Login
              </Button>
            </div>
          </form>
          <LoginWithGoogle />
          <div className="mt-10 text-center text-gray-600">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="text-primary">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
