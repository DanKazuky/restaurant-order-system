import { json } from "@remix-run/node";

import { prisma } from "~/utils/prisma.server";

import { orderSchema } from "./api.orders";

// 📌 PUT: Update an order
export const action = async ({ request, params }: { request: Request; params: any }) => {
  if (request.method === "PUT") {
    const data = await request.json();
    const parsedData = orderSchema.safeParse(data);

    if (!parsedData.success) {
      return json({ error: parsedData.error.format() }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: String(params.id) },
      data: parsedData.data,
    });

    return json(updatedOrder);
  }

  if (request.method === "DELETE") {
    await prisma.order.delete({
      where: { id: String(params.id) },
    });

    return json({ message: "Order successfully deleted" });
  }

  return json({ error: "Método no permitido" }, { status: 405 });
};