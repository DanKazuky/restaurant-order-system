import { json } from "@remix-run/node";

import { prisma } from "~/utils/prisma.server";

export async function loader() {
  const clients = await prisma.client.findMany();
  return json(clients);
}

export async function action({ request }: { request: Request }) {
  const data = await request.json();
  const client = await prisma.client.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
    },
  });

  return json(client);
}