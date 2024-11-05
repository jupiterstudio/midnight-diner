import { useRouter } from 'next/router';

export default function VerifyEmailPage() {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Please Verify Your Email</h1>
      <p className="mb-4">
        You need to verify your email address before you can log in. Please check your inbox for a verification email.
      </p>
      <button
        onClick={goToLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Go to Login
      </button>
    </div>
  );
}
