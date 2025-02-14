import { json } from "@remix-run/node";

import { prisma } from "~/utils/prisma.server";

// Obtener todas las órdenes
export async function loader() {
  const orders = await prisma.order.findMany({
    include: { client: true, restaurant: true },
  });
  return json(orders);
}

// Crear una nueva orden
export async function action({ request }: { request: Request }) {
  const data = await request.json();
  const order = await prisma.order.create({
    data: {
      clientId: data.clientId,
      restaurantId: data.restaurantId,
      items: data.items, // Debe enviarse en formato JSON
      status: "pending",
      createdAt: new Date(),
    },
  });

  return json(order);
}