// This is sign-up page
import LoginWithGoogle from "@/components/shared/LoginWithGoogle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./SignUpPage.css";

function SignUpPage() {
  return (
    <>
      <div className="min-h-screen max-h-screen flex justify-center items-center text-gray-800" id="back">
        <div className="border-2 flex flex-col lg:flex-row w-1/2 lg:w-8/12 bg-background rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" id="backImage">
            <h1 className="text-primary text-3xl mb-3">Welcome to Intellectia</h1>
            <div>
              <p className="text-primary text-center">
                Your guardian against misleading AI-Generated content{" "}
                <a href="#" className="text-stone-400 font-semibold">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12 text-primary">
            <h2 className="text-3xl mb-4">Register</h2>
            <p className="mb-4 text-text">Create your account. It’s free and only takes a minute</p>
            <form action="#">
              <div className="flex flex-col space-y-2">
                <div className="grid grid-cols-2 gap-5">
                  <Input type="text" placeholder="Firstname" />
                  <Input type="text" placeholder="Surname" />
                </div>
                <Input placeholder="Enter your email" type="email" />
                <Input placeholder="Enter your password" type="password" />
                <Input placeholder="Re-enter your password" type="password" />
              </div>
              <div className="mt-5 flex gap-3 items-center">
                <input title="I accept" type="checkbox" className="border border-gray-400" />
                <span>
                  I accept the{" "}
                  <a href="#" className="text-stone-500 font-semibold">
                    Terms of Use
                  </a>{" "}
                  &{" "}
                  <a href="#" className="text-stone-500 font-semibold">
                    Privacy Policy
                  </a>
                </span>
              </div>
              <div className="pt-5">
                <Button className="w-full" size={"sm"} type="submit" variant={"default"}>
                  Register Now
                </Button>
              </div>
            </form>
            <LoginWithGoogle />
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUpPage;
