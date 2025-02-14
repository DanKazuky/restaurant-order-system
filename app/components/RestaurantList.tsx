import { Form } from "@remix-run/react";

export default function RestaurantsPage({ restaurants }: {restaurants: any[] }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>

      <Form method="post" className="mb-6">
        <input type="text" name="name" placeholder="Name" required className="border p-2 mr-2" />
        <input type="text" name="phone" placeholder="Phone" required className="border p-2 mr-2" />
        <input type="text" name="address" placeholder="Address" required className="border p-2 mr-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add</button>
      </Form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Accions</th>
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
                  <button type="submit" className="bg-red-500 text-white px-4 py-1">Delete</button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}