import ContinueWithGoogle from "@/components/shared/ContinueWithGoogle";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginWithEmailAndPassword } from "@/hooks/authentication.hooks";
import { validatePassword } from "@/lib/appUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().refine(validatePassword, () => {
    return { message: "Invalid password" };
  }),
});

function LoginPage() {
  const navigation = useNavigate();
  const { login, isLoading } = useLoginWithEmailAndPassword(navigation);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values.email, values.password);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      {/* Left Side (Background Image and Text) */}
      <div className="hidden lg:block w-1/2 h-full flex flex-col justify-center items-center bg-foreground">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            className="w-1/2 bg-blend-difference"
            src="https://images.fineartamerica.com/images-medium-large/24-benjamin-franklin-1706-1790-granger.jpg"
            alt="Human Thought"
          />
          <h3 className="w-1/2 font-young-serif text-center text-3xl text-secondary font-bold mt-10">
            For the Human By the Human With Artificial Intelligence
          </h3>
        </div>
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-1/2 h-full p-2 flex flex-col justify-center items-center">
        <div className="mb-4 w-96 shadow-sm border px-10 py-5">
          <h2 className="text-2xl font-semibold mb-2 text-center">Welcome back!</h2>
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
                    <FormMessage
                      errors={form.formState.errors}
                      name="email"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} type="password" />
                    </FormControl>
                    <FormMessage
                      errors={form.formState.errors}
                      name="password"
                    />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading || form.formState.isSubmitting} className="w-full" size={"sm"} variant={"default"} type="submit">
                Login
              </Button>
            </form>
          </Form>
          <ContinueWithGoogle onClick={() => {}} buttonText="Sign in with Google" />
          <div className="mt-10 text-center text-gray-600">
            <p>
              Don't have an account?{" "}
              <Link to="/auth/sign-up" className="text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
