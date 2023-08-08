import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col text-4xl font-semibold items-center justify-center min-h-screen  bg-red-400">
      <h2>Looks like you canceled the order.</h2>
      <Link href="/" className=" bg-white bg-opacity-30 px-4 py-2 rounded-2xl">
        Go to home page
      </Link>
    </div>
  );
}

