import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function LoginPage() {
 
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
              <Button className="w-full" size={"sm"} type="submit" variant={"default"}>
                Login
              </Button>
            </div>
          </form>
          <div className="flex flex-col items-center mt-10 text-center text-gray-600">
            <p>Or</p>
            <button type="button" className="flex items-center mt-5 rounded-full bg-background text-primary px-5 py-2 hover:bg-secondary transition duration-300">
              <img
                alt="Google Logo"
                className="w-6 mr-2"
                src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0"
              />
              Login with Google
            </button>
          </div>
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
