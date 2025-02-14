import { Form } from "@remix-run/react";

export default function ClientsList({ clients }: { clients: any[] }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>

      <Form method="post" className="mb-6">
        <input type="text" name="firstName" placeholder="First Name" required className="border p-2 mr-2" />
        <input type="text" name="lastName" placeholder="Last Name" required className="border p-2 mr-2" />
        <input type="text" name="phone" placeholder="Phone" required className="border p-2 mr-2" />
        <input type="text" name="address" placeholder="Address" required className="border p-2 mr-2" />
        <button type="submit" name="_intent" value="create" className="bg-blue-500 text-white px-4 py-2">Add</button>
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
          {clients.map((client) => (
            <tr key={client.id} className="border">
              <td className="border p-2">{client.id}</td>
              <td className="border p-2">{client.firstName + " " + client.lastName}</td>
              <td className="border p-2">{client.phone}</td>
              <td className="border p-2">{client.address}</td>
              <td className="border p-2">
                <Form method="post">
                  <input type="hidden" name="id" value={client.id} />
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
