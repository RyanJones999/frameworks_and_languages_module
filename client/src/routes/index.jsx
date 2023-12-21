import CreateItem from "../islands/CreateItem.jsx";
import GetItems from "../islands/GetItems.jsx";

export default function Home({ url }) {
  // Extracting the query parameters from the URL.
  const searchParams = new URL(url).searchParams;

  // Getting the 'api' parameter from the URL this is the base URL for the API
  const api = searchParams.get("api");
  
  // Display an error message if the 'api' URL parameter is not provided.
  if (!api) {
    return <div>Error: Please enter API URL parameter.</div>;
  }

  console.log(api)

  // Render the main page content.
  return (
    <>
      <h1>FreeCycle</h1>
      <div>
        <CreateItem api={api} />
      </div>
      <div>
        <GetItems api={api}/>
      </div>
    </>
  );
}
