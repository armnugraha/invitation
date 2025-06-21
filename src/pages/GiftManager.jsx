import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

export default function GiftManager() {
  const [gifts, setGifts] = useState([]);
  const [form, setForm] = useState({ code: "", url: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    const { data, error } = await supabase.from("gifts").select("*").order("id", { ascending: true });
    if (error) {
      console.error("Fetch error:", error);
    } else {
      setGifts(data);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.code || !form.url || !form.price) return;

    if (editingId) {
      // Update
      const { error } = await supabase
        .from("gifts")
        .update({ code: form.code, url: form.url, price: form.price })
        .eq("id", editingId);

      if (!error) {
        setEditingId(null);
        setForm({ code: "", url: "", price: "" });
        fetchGifts();
      }
    } else {
      // Create
      const { error } = await supabase
        .from("gifts")
        .insert([{ code: form.code, url: form.url, price: form.price }]);

      if (!error) {
        setForm({ code: "", url: "", price: "" });
        fetchGifts();
      }
    }
  };

  const handleEdit = (gift) => {
    setEditingId(gift.id);
    setForm({ code: gift.code, url: gift.url, price: gift.price });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("gifts").delete().eq("id", id);
    if (!error) fetchGifts();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">🎁 Gift Manager</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="code"
            placeholder="Code"
            value={form.code}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            name="url"
            placeholder="URL"
            value={form.url}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ code: "", url: "", price: "" });
              }}
              className="ml-2 px-4 py-2 rounded border"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Code</th>
              <th className="border px-4 py-2">URL</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gifts.map((gift) => (
              <tr key={gift.id} className="text-center">
                <td className="border px-4 py-2">{gift.id}</td>
                <td className="border px-4 py-2">{gift.code}</td>
                <td className="border px-4 py-2 text-blue-500 underline">
                  <a href={gift.url} target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                </td>
                <td className="border px-4 py-2">{gift.price}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(gift)}
                    className="text-sm text-white bg-yellow-500 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(gift.id)}
                    className="text-sm text-white bg-red-600 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {gifts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  Belum ada data hadiah
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
