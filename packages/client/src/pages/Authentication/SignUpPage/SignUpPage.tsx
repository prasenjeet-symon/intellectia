import ContinueWithGoogle from "@/components/shared/ContinueWithGoogle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Coverimage from '../../../assets/images/signup_left_cover.jpeg';
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
      {/* Left Side (Background Image and Text) */}
      <div className="hidden lg:block w-1/2 h-full flex flex-col justify-center items-center bg-foreground">
        <div className="h-full flex flex-col justify-center items-center">
          <img className="w-1/2" src={Coverimage} alt="Human Thought" />
          <h3 className="w-1/2 font-young-serif text-center text-3xl text-secondary font-bold mt-10">For the Human By the Human With Artificial Intelligence</h3>
        </div>
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-1/2 h-full p-8 flex flex-col justify-center items-center">
        <div className="mb-4 w-96 shadow-sm border p-10">
          <h2 className="text-2xl font-semibold mb-2 text-center">Create an account</h2>
          <h4 className="text-sm font-semibold mb-10 text-center">Your gateway to the truth begins here.</h4>
          <form className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Input placeholder="Enter your name" type="text" />
              <Input placeholder="Enter your email" type="email" />
              <Input placeholder="Enter your password" type="password" />
              <Input placeholder="Verify your password" type="password" />
            </div>
            <div className="pt-5">
              <Button className="w-full" size={"sm"} type="button" variant={"default"}>
                Sign Up
              </Button>
            </div>
          </form>
          <ContinueWithGoogle onClick={() => {}} buttonText="Sign up with Google" />
          <div className="mt-10 text-center text-gray-600">
            <p>
              Already have an account?{" "}
              <Link to="/auth/sign-in" className="text-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
