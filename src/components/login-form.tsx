"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const loginSchema = z.object({
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
});
export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);

    const { email, password } = values;

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          toast.success("Connexion reussi!");
      }
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Connexion</CardTitle>
        <CardDescription>
          Entrez vos informations afin de vous connecter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <Button type="submit" className="w-full">
              Connexion
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
