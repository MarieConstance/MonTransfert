"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
const transactionSchema = z.object({
    name: z.string({
        message: "champ obligatoire",
      }),
      phone_num: z
    .string({
      message: "champ obligatoire",
    }).max(10,{
        message: "le numéro doit contenir 10 chiffres"
    }),
  amount: z.string().min(3, {
    message: "le montant doit contenir au moins 3 chiffres",
  }),
 
});
export function TransactionForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: "",
      phone_num: "",
      amount: "0",
    },
  });

  function onSubmit(values: z.infer<typeof transactionSchema>) {
    console.log(values);

    const { name, phone_num, amount } = values;

    fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone_num,
        amount:Number(amount)
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
            toast.success("Votre transaction à été effectué avec sucess!!");
        }
        router.refresh();
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  }
  return (
    <>
    <div className="max-w-7xl mx-auto p-15">
      {/* Titre */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-blue-600 drop-shadow-md font-serif">
          BIENVENUE SUR MonTransfert
        </h1>
        <h2 className="text-2xl font-bold text-blue-600 drop-shadow-md font-serif">
          Votre Application de transfert d'argent sécurisé 
        </h2>
      </div>
    </div>
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Transfert</CardTitle>
        <CardDescription>
          Entrer les informations du destinataire
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NomUtilisateur</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="marieGoa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_num"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro du destinataire</FormLabel>
                  <FormControl>
                    <Input  placeholder="010101" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant à envoyer</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="200000" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Envoyer
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    </>
    
  );
}
