"user-server";
import { findAllPokemon } from "@/modules/br/pokemon/actions";
import { IPokemonResponse } from "@/repositories/strategies/br/@types/pokemon";
import { getLocale } from "@/utils/host";
import dynamic from "next/dynamic";

import { headers } from "next/headers";
import { Suspense } from "react";

export default async function Home() {
  const header = (await headers()).get("host");
  const locale = getLocale(header as string);

  const PokemonList = dynamic<{ locale: string; data: IPokemonResponse }>(
    () => import(`@/modules/${locale}/pokemon/pokemonList`),
    {
      ssr: true,
    }
  );

  const { default: PokemonRepository } = await import(
    `@/repositories/strategies/${locale}/pokemon`
  );

  const response = await findAllPokemon(new PokemonRepository(locale));

  return (
    <>
      <PokemonList locale={locale} data={response} />
    </>
  );
}
