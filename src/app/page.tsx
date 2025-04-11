"user-server";
import { getLocale } from "@/utils/host";
import dynamic from "next/dynamic";
import { headers } from "next/headers";

export default async function Home() {
  const header = (await headers()).get("host");
  const locale = getLocale(header as string);

  const LoginForm = dynamic(
    () => import(`../modules/${locale}/auth/loginform`),
    {
      ssr: true,
    }
  );

  return (
    <>
      <LoginForm />
    </>
  );
}
