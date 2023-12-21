// islands/DeleteItem.jsx
import { useState } from "preact/hooks";

export default function DeleteItem({api}) {
  const [itemId, setItemId] = useState('');

  const handleDelete = async (event) => {
    event.preventDefault();

    if (!itemId) {
      alert("Please enter an item ID to delete.");
      return;
    }

    try {
      const response = await fetch(`${api}/item/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Item deleted successfully');
        setItemId(''); // Clear the input field

        // Dispatch a custom event to signal that an item has been deleted
        dispatchEvent(new CustomEvent('itemDeleted'));
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleDelete} className="space-y-2">
      <div>
        <label htmlFor="itemId" className="block text-sm font-medium text-gray-700">Item ID:</label>
        <input
          type="hidden"
          id="itemId"
          name="itemId"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <button data-action="delete" type="submit" className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
        Delete Item
      </button>
    </form>
  );
}
