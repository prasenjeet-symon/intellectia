// This is sign-up page

function SignUpPage() {
  return (
    <>
      <div className="min-h-screen py-40" id="back">
        <div className="container mx-auto">
          <div className="border-2 flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-background rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" id="backImage">
              <h1 className="text-white text-3xl mb-3">Welcome to Intellectia</h1>
              <div>
                <p className="text-white text-center">
                  Your guardian against misleading AI-Generated content
                  <a href="#" className="text-stone-400 font-semibold">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4">Register</h2>
              <p className="mb-4">Create your account. It’s free and only takes a minute</p>
              <form action="#">
                <div className="grid grid-cols-2 gap-5">
                  <input type="text" placeholder="Firstname" className="border rounded border-gray-400 py-1 px-2" />
                  <input type="text" placeholder="Surname" className="border rounded border-gray-400 py-1 px-2" />
                </div>
                <div className="mt-5">
                  <input type="text" placeholder="Email" className="border rounded border-gray-400 py-1 px-2 w-full" />
                </div>
                <div className="mt-5">
                  <input type="password" placeholder="Password" className="border rounded border-gray-400 py-1 px-2 w-full" />
                </div>
                <div className="mt-5">
                  <input type="password" placeholder="Confirm Password" className="border rounded border-gray-400 py-1 px-2 w-full" />
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
                <div className="mt-5">
                  <button className="w-full rounded bg-stone-900 py-3 text-center text-white hover:bg-stone-800">Register Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUpPage;
