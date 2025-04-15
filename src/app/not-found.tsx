import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = await headers();
  const domain = headersList.get("host");

  return (
    <div>
      <h2>Plataforma não encontrada.</h2>
      <p>Verifique a disponibilidade em seus pais.</p>
    </div>
  );
}
