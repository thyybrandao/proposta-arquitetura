"use client";
import React from "react";
import { useMediatorStore } from "./useMediator";
import { Button } from "@/components/ui/button";

function ComponenteB() {
  const { words, remove } = useMediatorStore();
  return (
    <div className="flex flex-col my-5">
      <h1 className="my-3 font-bold">Lista de palavras bonitas: </h1>
      <ul>
        {words.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <Button onClick={() => remove(item)} variant={"link"}>
              Retirar
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComponenteB;
