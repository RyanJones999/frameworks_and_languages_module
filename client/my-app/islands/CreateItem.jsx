export default function CreateItem() {
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
      let jsonData = Object.fromEntries(formData.entries());
  
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user_id">User ID:</label>
          <input type="text" id="user_id" name="user_id" required />
        </div>
        <div>
          <label htmlFor="keywords">Keywords (comma-separated):</label>
          <input type="text" id="keywords" name="keywords" required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" required />
        </div>
        <div>
          <label htmlFor="lat">Latitude:</label>
          <input type="number" id="lat" name="lat" step="any" required />
        </div>
        <div>
          <label htmlFor="lon">Longitude:</label>
          <input type="number" id="lon" name="lon" step="any" required />
        </div>
        <div>
          <button type="submit">Create Item</button>
        </div>
      </form>
    );
  }
  