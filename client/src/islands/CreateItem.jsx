// islands/CreateItem.jsx
import { useState } from "preact/hooks";

export default function CreateItem() {
  const [formData, setFormData] = useState({
    user_id: '',
    keywords: '',
    description: '',
    lat: '',
    lon: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Transform 'keywords' from string to array and parse 'lat' and 'lon'
    const submitData = {
      ...formData,
      keywords: formData.keywords.split(',').map(kw => kw.trim()),
      lat: parseFloat(formData.lat),
      lon: parseFloat(formData.lon)
    };

    try {
      const response = await fetch('http://localhost:8000/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        console.log('Item created:', await response.json());
        dispatchEvent(new CustomEvent('itemCreated'));
        setFormData({ user_id: '', keywords: '', description: '', lat: '', lon: '' }); // Reset the form
      } else {
        console.error('Failed to create item:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-white p-8 shadow-md rounded-lg">
      <h1>Create New Item</h1>
      <div>
        <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">User ID:</label>
        <input type="text" id="user_id" name="user_id" value={formData.user_id} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">Keywords (comma-separated):</label>
        <input type="text" id="keywords" name="keywords" value={formData.keywords} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label htmlFor="lat" className="block text-sm font-medium text-gray-700">Latitude:</label>
        <input type="number" id="lat" name="lat" value={formData.lat} onChange={handleChange} step="any" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label htmlFor="lon" className="block text-sm font-medium text-gray-700">Longitude:</label>
        <input type="number" id="lon" name="lon" value={formData.lon} onChange={handleChange} step="any" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Item</button>
      </div>
    </form>
  );
}
