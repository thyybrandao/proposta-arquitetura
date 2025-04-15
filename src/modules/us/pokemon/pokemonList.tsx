"use client";

import { Button } from "@/components/ui/button";
import { IPokemonResponse } from "@/repositories/strategies/br/@types/pokemon";
import Image from "next/image";
import React, { useState } from "react";
import PokemonRepository from "@/repositories/strategies/br/pokemon";

interface IProps {
  locale: string;
  data: IPokemonResponse;
}

const PokemonList = ({ locale, data }: IProps) => {
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);
  const [pokemonName, setPokemonName] = useState<string>("");

  function getPokemonIdFromUrl(url: string): string | null {
    const match = url.match(/pokemon\/(\d+)\//);
    return match ? match[1] : null;
  }

  async function handleGetPokemonImage(id: number, name: string) {
    try {
      const pokemonRepository = new PokemonRepository(locale);
      const pokemon = await pokemonRepository.findOne(id);
      setPokemonImage(pokemon.sprites.front_default);
      setPokemonName(name);
    } catch (error) {
      console.error("Erro ao buscar o Pokémon:", error);
    }
  }

  return (
    <>
      <h1>Here in the United States we like 3rd generation Pokémon.</h1>
      <div className="flex flex-col justify-center items-center gap-4">
        {pokemonImage && pokemonName && (
          <div className="flex flex-col justify-center items-center gap-4">
            <Image
              alt="Imagem do pokemon"
              src={pokemonImage}
              width={96}
              height={96}
            />
            <p>{pokemonName}</p>
          </div>
        )}
        <div className="border-amber-300 border-2 border-solid w-[600px] h-[700px] rounded-lg p-4 overflow-y-auto">
          <ul className="w-full flex flex-col gap-2">
            {data.results.map((pokemon, index) => (
              <li
                className="w-full flex flex-row justify-between px-2"
                key={index}
              >
                <span className="">{pokemon.name}</span>{" "}
                <Button
                  onClick={async () => {
                    const id = Number(getPokemonIdFromUrl(pokemon.url ?? ""));
                    if (id) {
                      await handleGetPokemonImage(id, pokemon.name);
                    }
                  }}
                >
                  Ver
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PokemonList;
