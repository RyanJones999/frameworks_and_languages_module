import { useEffect, useState } from "preact/hooks";
export default function DeleteItem({ onItemDeleted }) {
    const [itemId, setItemId] = useState('');
  
    const handleDelete = async (event) => {
      event.preventDefault();
  
      if (!itemId) {
        alert("Please enter an item ID.");
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:8000/item/${itemId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          console.log('Item deleted successfully');
          setItemId(''); // Clear the input field
          onItemDeleted(); // Invoke the callback to refresh the item list
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
            type="text"
            id="itemId"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Delete Item
        </button>
      </form>
    );
  }
  