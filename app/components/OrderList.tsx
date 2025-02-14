import { Form } from "@remix-run/react";

export default function OrdersList({ orders }: { orders: any[] }) {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4" >Orders</h1>

      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add Order</h2>
        <Form method="post">
          <input type="text" name="clientId" placeholder="ID Client" required className="border p-2 w-full mb-2" />
          <input type="text" name="restaurantId" placeholder="ID Restaurant" required className="border p-2 w-full mb-2" />
          <textarea name="items" placeholder='[{ "description": "Pizza", "quantity": 1, "unitPrice": 10 }]' required className="border p-2 w-full mb-2"></textarea>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Order
          </button>
        </Form>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[color:#013bc4] text-white">
            <th className="border p-2">ID</th>
            <th className="border p-2">Client's Name</th>
            <th className="border p-2">Restaurant's Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Accions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.client.firstName + " " + order.client.lastName}</td>
              <td className="border p-2">{order.restaurant.name}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                <Form method="delete">
                    <input type="hidden" name="id" value={order.id} />
                    <button type="submit" name="_intent" value="delete" className="bg-red-500 text-white px-4 py-1">
                        Delete
                    </button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}