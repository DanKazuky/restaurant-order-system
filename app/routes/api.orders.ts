import { json } from "@remix-run/node";
import { z } from "zod";

import { prisma } from "~/utils/prisma.server";


// 📌 Define validation scheme with Zod
export const orderSchema = z.object({
  clientId: z.string().min(2,"The client must exist"),
  restaurantId: z.string().min(2,"The restaurant must exist"),
  items: z.array(
    z.object({
      quantity: z.number().int().positive("Quantity must be greater than 0"),
      description: z.string().min(3, "Description too short"),
      unitPrice: z.number().positive("The price must be greater than 0"),
    })
  ),
  status: z.enum(["pending", "in_progress", "completed"]),
});

// 📌 GET: Get all the orders
export const loader = async () => {
  const orders = await prisma.order.findMany();
  return json(orders);
};

// 📌 POST: Create a new order with validation
export const action = async ({ request }: { request: Request }) => {
  const data = await request.json();

  const parsedData = orderSchema.safeParse(data);
  if (!parsedData.success) {
    return json({ error: parsedData.error.format() }, { status: 400 });
  }

  const newOrder = await prisma.order.create({
    data: {
      clientId: parsedData.data.clientId,
      restaurantId: parsedData.data.restaurantId,
      items: parsedData.data.items,
      status: parsedData.data.status,
      createdAt: new Date(),
    },
  });

  return json(newOrder);
};