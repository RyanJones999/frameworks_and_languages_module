import { useState } from "preact/hooks";

// CreateItem component allows for creating new items and submitting them to the API.
export default function CreateItem({api}) {

  // State for form data to handle user input.
  const [formData, setFormData] = useState({
    user_id: 'user123',
    keywords: '',
    description: '',
    image: "http://placekitten.com/100/100",
    lat: '',
    lon: ''
  });

  // Handles the form submission.
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission action.
    console.log("Form submitted"); // Logs to the console for debugging.

    // Prepares the data for submission, including transforming 'keywords' and parsing 'lat' and 'lon'.
    const submitData = {
      ...formData,
      keywords: formData.keywords.split(',').map(kw => kw.trim()),
      lat: parseFloat(formData.lat),
      lon: parseFloat(formData.lon)
    };

    try {
      // Makes a POST request to the API to create a new item.
      const fetchUrl = `${api}/item/`;
      const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      // Handles the response, dispatching an event and resetting the form on success.
      if (response.ok) {
        console.log('Item created:', await response.json()); // Signals item creation to other components.
        dispatchEvent(new CustomEvent('itemCreated'));
        setFormData({ user_id: '', keywords: '', description: '', lat: '', lon: '' }); // Resets the form data
      } else {
        console.error('Failed to create item:', await response.text()); // Logs error in case of failure.
      }
    } catch (error) {
      console.error('Error:', error); // Logs error if the request fails.
    }
  };

  // Updates formData state when there are changes in the form inputs.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

// Create Item Form
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
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL:</label>
        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
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
        <button data-action="create_item" type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Item</button>
      </div>
    </form>
  );
}
