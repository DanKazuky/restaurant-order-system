import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";

import ClientsList from "~/components/ClientsList";
import { prisma } from "~/utils/prisma.server";

// 📌 GET: Get all customers
export const loader = async () => {
  const clients = await prisma.client.findMany();
  return json(clients);
};

// 📌 POST: Create a new client with validation
export const action = async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("_intent");

    if(request.method === "POST" && intent === "create"){
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const phone = formData.get("phone");
        const address = formData.get("address");

        const client = await prisma.client.create({
            data: {firstName, lastName, phone, address},
        });

        return redirect ("/clients");
    }

    if (request.method === "POST" && intent === "delete") {
        const id = formData.get("id");

        await prisma.client.delete({where: { id: String(id)},
        });

        return redirect("/clients");
    }
};

export default function ClientPage(){
    const clients = useLoaderData<typeof loader>();
    return (
        <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
            <ClientsList clients ={clients}/>
        </main>
    );
}