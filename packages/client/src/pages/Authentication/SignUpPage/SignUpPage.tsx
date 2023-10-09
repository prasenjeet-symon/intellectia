import ContinueWithGoogle from "@/components/shared/ContinueWithGoogle";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignUpWithEmailAndPassword } from "@/hooks/authentication.hooks";
import { validateName, validatePassword } from "@/lib/appUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import Coverimage from "../../../assets/images/signup_left_cover.jpeg";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().refine(validatePassword, () => {
    return { message: "Invalid password" };
  }),
  verifyPassword: z.string().refine(validatePassword, () => {
    return { message: "Invalid password" };
  }),
});

function SignUpPage() {
  const navigation = useNavigate();
  const { signup, isLoading } = useSignUpWithEmailAndPassword(navigation);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      verifyPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    signup(values.email, values.password);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      {/* Left Side (Background Image and Text) */}
      <div className="hidden lg:block w-1/2 h-full flex flex-col justify-center items-center bg-foreground">
        <div className="h-full flex flex-col justify-center items-center">
          <img className="w-1/2 bg-blend-difference" src={Coverimage} alt="Human Thought" />
          <h3 className="w-1/2 font-young-serif text-center text-3xl text-secondary font-bold mt-10">For the Human By the Human With Artificial Intelligence</h3>
        </div>
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-1/2 h-full p-2 flex flex-col justify-center items-center">
        <div className="mb-4 w-96 shadow-sm border px-10 py-5">
          <h2 className="text-2xl font-semibold mb-2 text-center">Create an account</h2>
          <h4 className="text-sm font-semibold mb-10 text-center">Your gateway to the truth begins here.</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="verifyPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Verify your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} className="w-full" size={"sm"} variant={"default"} type="submit">
                Submit
              </Button>
            </form>
          </Form>
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

export default SignUpPage;
