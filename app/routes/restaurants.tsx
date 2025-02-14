import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";

import { prisma } from "~/utils/prisma.server";

export const loader = async () => {
  const restaurants = await prisma.restaurant.findMany();
  return json(restaurants);
};

export default function RestaurantsPage() {
  const restaurants = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restaurantes</h1>

      <Form method="post" className="mb-6">
        <input type="text" name="name" placeholder="Nombre" required className="border p-2 mr-2" />
        <input type="text" name="phone" placeholder="Teléfono" required className="border p-2 mr-2" />
        <input type="text" name="address" placeholder="Dirección" required className="border p-2 mr-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Agregar</button>
      </Form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Teléfono</th>
            <th className="border p-2">Dirección</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id} className="border">
              <td className="border p-2">{restaurant.id}</td>
              <td className="border p-2">{restaurant.name}</td>
              <td className="border p-2">{restaurant.phone}</td>
              <td className="border p-2">{restaurant.address}</td>
              <td className="border p-2">
                <Form method="delete">
                  <input type="hidden" name="id" value={restaurant.id} />
                  <button type="submit" className="bg-red-500 text-white px-4 py-1">Eliminar</button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
