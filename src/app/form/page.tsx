"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddressSection from "./addressSection";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Nome é obrigatório." })
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  lastname: z.string().nonempty({ message: "Sobrenome é obrigatório." }),
  city: z.string().nonempty({ message: "Cidade é obrigatória." }),
  address: z.string().nonempty({ message: "Endereço é obrigatório." }),
});

export type formModel = z.infer<typeof formSchema>;

function PageForm() {
  const form = useForm<formModel>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      city: "",
      address: "",
    },
  });

  const onSubmit = (data: formModel) => {
    console.log(data);
  };

  useEffect(() => {
    console.log("Monitorando o valor do campo name:", form.watch("name"));
  }, [form.watch("name")]);

  return (
    <Form {...form}>
      <h1>Demonstração Ract-form-hook</h1>
      <br />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <AddressSection form={form} />

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}

export default PageForm;
