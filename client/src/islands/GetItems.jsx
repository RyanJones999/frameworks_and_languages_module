// islands/GetItems.jsx
import { useEffect, useState } from "preact/hooks";

const GetItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8000/items');
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const handleItemsUpdated = () => {
      fetchItems();
    };

    addEventListener('itemCreated', handleItemsUpdated);
    addEventListener('itemDeleted', handleItemsUpdated);

    fetchItems(); // Fetch items initially

    return () => {
      removeEventListener('itemCreated', handleItemsUpdated);
      removeEventListener('itemDeleted', handleItemsUpdated);
    };
  }, []);

  return (
    <div>
      <h2>Items List</h2>
      {error && <p className="text-red-600">{error}</p>}
      {items.length > 0 ? (
        <ul className="list-disc space-y-4">
          {items.map(item => (
            <li key={item.id} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Item ID: {item.id}</h3>
              <p>User ID: {item.user_id}</p>
              <p>Description: {item.description}</p>
              <p>Latitude: {item.lat}</p>
              <p>Longitude: {item.lon}</p>
              <p>Date From: {item.date_from}</p>
              <p>Date To: {item.date_to}</p>
              {item.image && <img src={item.image} alt={`Image for item ${item.description}`} className="max-w-xs mt-2" />}
              <p>Keywords: {item.keywords.join(', ')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No items found.</p>
      )}
    </div>
  );
};

export default GetItems;
