import { json } from "@remix-run/node";
import { z } from "zod";

import { prisma } from "~/utils/prisma.server";

// 📌 Define validation scheme with Zod
export const clientSchema = z.object({
  name: z.string().min(2, "The name must be at least 2 characters long"),
  phone: z.string().min(10, "The phone must have at least 10 digits"),
  address: z.string().min(5, "The address must be at least 5 characters long"),
});

// 📌 GET: Get all the restaurants
export const loader = async () => {
  const restaurants = await prisma.restaurant.findMany();
  return json(restaurants);
}

// 📌 POST: Create a new restaurant
export const action = async ({ request }: { request: Request }) => {
  const data = await request.json();

  const parsedData = clientSchema.safeParse(data);
    if (!parsedData.success) {
      return json({ error: parsedData.error.format() }, { status: 400 });
    }
  const restaurant = await prisma.restaurant.create({
    data: parsedData.data,
  });

  return json(restaurant);
}
