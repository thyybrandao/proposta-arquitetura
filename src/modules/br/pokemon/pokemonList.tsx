"use client";

import { Button } from "@/components/ui/button";
import { IPokemonResponse } from "@/repositories/strategies/br/@types/pokemon";
import Image from "next/image";
import React, { useState } from "react";
import PokemonRepository from "@/repositories/strategies/br/pokemon";
import { useMyPokemonStore } from "@/stores/myPokemons";

interface IProps {
  locale: string;
  data: IPokemonResponse;
}

const PokemonList = ({ locale, data }: IProps) => {
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);
  const [pokemonName, setPokemonName] = useState<string>("");
  const { add, pokemons, remove } = useMyPokemonStore();

  function getPokemonIdFromUrl(url: string): string | null {
    const match = url.match(/pokemon\/(\d+)\//);
    return match ? match[1] : null;
  }

  async function handleGetPokemonImage(id: number) {
    const pokemonRepository = new PokemonRepository(locale);
    const pokemon = await pokemonRepository.findOne(id);
    setPokemonImage(pokemon.sprites.front_default);
  }

  return (
    <>
      <h1>Aqui no Brasil gostamos dos pokémons da 1º geração.</h1>
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
            <Button
              onClick={() => add({ image: pokemonImage, name: pokemonName })}
            >
              Capturar
            </Button>
          </div>
        )}
        <div className="flex gap-4">
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
                        await handleGetPokemonImage(id);
                        setPokemonName(pokemon.name);
                      }
                    }}
                  >
                    Ver
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-amber-300 border-2 border-solid w-[200px] h-[700px] rounded-lg p-4 overflow-y-auto">
            {pokemons.map((poke, index) => (
              <div
                className="flex flex-col justify-center items-center gap-4"
                key={`POKE-${index}`}
              >
                <Image
                  alt="Imagem do pokemon"
                  src={poke.image}
                  width={96}
                  height={96}
                />
                <p>{poke.name}</p>
                <Button onClick={() => remove(poke.name)}>Soltar</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonList;
