const LoginWithGoogle = () => {
  return (
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
  );
};

export default LoginWithGoogle;
