import { json } from "@remix-run/node";
import { z } from "zod";

import { prisma } from "~/utils/prisma.server";

// 📌 Define validation scheme with Zod
export const clientSchema = z.object({
  firstName: z.string().min(2, "The name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  phone: z.string().min(10, "The phone must have at least 10 digits"),
  address: z.string().min(5, "The address must be at least 5 characters long"),
});

// 📌 GET: Get all customers
export const loader = async () => {
  const clients = await prisma.client.findMany();
  return json(clients);
};

// 📌 POST: Create a new client with validation
export const action = async ({ request }: { request: Request }) => {
  const data = await request.json();

  const parsedData = clientSchema.safeParse(data);
  if (!parsedData.success) {
    return json({ error: parsedData.error.format() }, { status: 400 });
  }

  const client = await prisma.client.create({
    data: parsedData.data,
  });

  return json(client);
};
