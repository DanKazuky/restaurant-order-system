import { json } from "@remix-run/node";

import { prisma } from "~/utils/prisma.server";

// Obtener todos los restaurantes
export async function loader() {
  const restaurants = await prisma.restaurant.findMany();
  return json(restaurants);
}

// Crear un nuevo restaurante
export async function action({ request }: { request: Request }) {
  const data = await request.json();
  const restaurant = await prisma.restaurant.create({
    data: {
      name: data.name,
      phone: data.phone,
      address: data.address,
    },
  });

  return json(restaurant);
}