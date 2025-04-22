"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMediatorStore } from "./useMediator";

function ComponenteA() {
  const { add } = useMediatorStore();
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (value.trim() !== "") {
      add(value);
      setValue("");
    }
  };
  return (
    <div className="flex flex-row gap-5">
      <Input
        className="w-[300px]"
        placeholder="O que você mais gosta no Thyago? (:"
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleAdd}>Inserir</Button>
    </div>
  );
}

export default ComponenteA;
