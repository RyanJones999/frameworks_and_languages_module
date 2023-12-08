import { useEffect, useState } from "preact/hooks";
import CreateItem from "../islands/CreateItem.jsx";
import DeleteItem from "../islands/DeleteItem.jsx";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    try {
        const response = await fetch('http://localhost:8000/items');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
      }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <CreateItem onItemCreated={fetchItems} />
      {items.map(item => (
        <div key={item.id}>
          {item.name}
          <DeleteItem itemId={item.id} onItemDeleted={fetchItems} />
        </div>
      ))}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
