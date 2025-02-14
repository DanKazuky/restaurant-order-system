import { json } from "@remix-run/node";

import { prisma } from "~/utils/prisma.server";

import { clientSchema } from "./api.clients";

// 📌 PUT: Update a client
export const action = async ({ request, params }: { request: Request; params: any }) => {
  if (request.method === "PUT") {
    const data = await request.json();
    const parsedData = clientSchema.safeParse(data);

    if (!parsedData.success) {
      return json({ error: parsedData.error.format() }, { status: 400 });
    }

    const updatedClient = await prisma.client.update({
      where: { id: String(params.id) },
      data: parsedData.data,
    });

    return json(updatedClient);
  }

  if (request.method === "DELETE") {
    await prisma.client.delete({
      where: { id: String(params.id) },
    });

    return json({ message: "Customer successfully removed" });
  }

  return json({ error: "Method not permitted" }, { status: 405 });
};
