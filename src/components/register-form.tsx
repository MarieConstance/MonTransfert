"use client";

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
import Link from "next/link";
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
const registerSchema = z.object({
  email: z
    .string({
      message: "champ obligatoire",
    })
    .email({
      message: "email invalide",
    }),
  password: z.string().min(8, {
    message: "mot de passe trop court et doit contenir au moins 8 caractères",
  }),
  name: z.string({
    message: "champ obligatoire",
  }),
});
export function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);

    const { email, password, name } = values;

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          toast.success("Enregistrement effectuer avec succes!!");
        }
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Inscription</CardTitle>
        <CardDescription>
          Enregistrer vos informations personnelles
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
                    <Input placeholder="name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse Email</FormLabel>
                  <FormControl>
                    <Input placeholder="test@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de Passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="1A67hj@" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white"
            >
              S'inscrire
            </Button>
            <p className="mt-4 text-sm text-center">
              Avez-vous déjà un compte ?{" "}
              <Link href="/login" className="text-blue-500 underline">
                Se connecter
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
