export default function CreateItem() {
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
      const jsonData = Object.fromEntries(formData.entries());
  
      // Transform 'keywords' from string to array
      jsonData.keywords = jsonData.keywords.split(',').map(kw => kw.trim());
  
      // Parse 'lat' and 'lon' as numbers
      jsonData.lat = parseFloat(jsonData.lat);
      jsonData.lon = parseFloat(jsonData.lon);
  
      try {
        const response = await fetch('http://localhost:8000/item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        });
  
        if (response.ok) {
          console.log('Item created:', await response.json());
        } else {
          console.error('Failed to create item');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-white p-8 shadow-md rounded-lg">
          <h1>Create New Item</h1>
        <div>
          <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">User ID:</label>
          <input type="text" id="user_id" name="user_id" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">Keywords (comma-separated):</label>
          <input type="text" id="keywords" name="keywords" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <input type="text" id="description" name="description" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="lat" className="block text-sm font-medium text-gray-700">Latitude:</label>
          <input type="number" id="lat" name="lat" step="any" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="lon" className="block text-sm font-medium text-gray-700">Longitude:</label>
          <input type="number" id="lon" name="lon" step="any" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Item</button>
        </div>
      </form>      
    );
  }
  