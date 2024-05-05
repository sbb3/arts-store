import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full space-y-4">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-8xl font-bold text-gray-800">404</h1>
        <Image
          src="/assets/images/gif/404.gif"
          alt="404"
          width={600}
          height={600}
          priority
        />

        <div className="flex flex-col items-center mt-4 space-y-4">
          <p>Oops! The page you are looking for does not exist.</p>

          <Link
            href="/"
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    </section>
  );
}
