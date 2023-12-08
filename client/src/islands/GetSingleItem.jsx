// islands/GetSingleItem.jsx
import { useState } from "preact/hooks";

const GetSingleItem = () => {
  const [itemId, setItemId] = useState('');
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  const fetchItem = async () => {
    setError('');
    try {
      const response = await fetch(`http://localhost:8000/item/${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch the item');
      }
      const data = await response.json();
      setItem(data);
    } catch (err) {
      setItem(null); // Clear the previous item
      setError(err.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchItem();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label htmlFor="itemId" className="block text-sm font-medium text-gray-700">
            Enter Item ID:
          </label>
          <input
            type="text"
            id="itemId"
            name="itemId"
            value={itemId}
            onInput={(e) => setItemId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Get Item
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      {item && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Item Details</h3>
          <p>User ID: {item.user_id}</p>
          <p>Description: {item.description}</p>
          <p>Latitude: {item.lat}</p>
          <p>Longitude: {item.lon}</p>
          <p>Date From: {item.date_from}</p>
          <p>Date To: {item.date_to}</p>
          {item.image && <img src={item.image} alt={`Image for item ${item.description}`} className="max-w-xs mt-2" />}
          <p>Keywords: {item.keywords.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default GetSingleItem;
