import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col text-4xl font-semibold items-center justify-center min-h-screen  bg-green-400">
      <h2>Compra realizada com sucesso!</h2>
      <Link href="/" className=" bg-white bg-opacity-30 px-4 py-2 rounded-2xl">
        Ínicio
      </Link>
    </div>
  )
}
