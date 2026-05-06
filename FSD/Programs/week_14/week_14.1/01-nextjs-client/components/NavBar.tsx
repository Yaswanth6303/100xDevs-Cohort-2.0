import Link from "next/link";

export default function NavBar() {
  return (
    <div>
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <Link href="/" className="text-2xl font-bold">
          Home
        </Link>
        <div className="flex gap-4 ">
          <Link href="/signin" className="text-lg font-bold">
            Signin
          </Link>
          <Link href="/signup" className="text-lg font-bold">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
