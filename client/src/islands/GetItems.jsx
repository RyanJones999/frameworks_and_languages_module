// islands/GetItems.jsx
import { useEffect, useState } from "preact/hooks";

const GetItems = ({api}) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    try {
      const fetchUrl = api ? `${api}/items/` : 'http://localhost:8000/items/'; //This is broken
      console.log(fetchUrl)
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formProps = Object.fromEntries(data.entries());
    console.log(formProps);
    const itemId = formProps.itemId; 

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
        //setItemId(''); // Clear the input field

        // Dispatch a custom event to signal that an item has been deleted
        dispatchEvent(new CustomEvent('itemDeleted'));
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error:', error);
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
    <>
    <div>
      <h2>Items List</h2>
      {error && <p className="text-red-600">{error}</p>}
      {items.length > 0 ? (
        <ul className="list-disc space-y-4">
          {items.map(item => (
            <div>
            <li key={item.id} className="bg-gray-100 p-4 rounded-lg">
              <h3 data-field="id" className="text-lg font-semibold">Item ID: {item.id}</h3>
              <p>User ID: {item.user_id}</p>
              <p>Description: {item.description}</p>
              <p>Latitude: {item.lat}</p>
              <p>Longitude: {item.lon}</p>
              <p>Date From: {item.date_from}</p>
              <p>Date To: {item.date_to}</p>
              {item.image && <img src={item.image} alt={`Image for item ${item.description}`} className="max-w-xs mt-2" />}
              <p>Keywords: {item.keywords.join(', ')}</p>
            </li>
            <form onSubmit={handleDelete} className="space-y-2">
      <div>
        <input
          type="hidden"
          id="itemId"
          name="itemId"
          value={item.id} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <button data-action="delete" type = "submit" className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
        Delete Item
      </button>
    </form>
            </div>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No items found.</p>
      )}
    </div>
    </ >
  );
};

export default GetItems;
