// import { useState } from "preact/hooks"; // Uncomment if useState is needed
import CreateItem from "../islands/CreateItem.jsx";
import GetItems from "../islands/GetItems.jsx";
import GetSingleItem from "../islands/GetSingleItem.jsx";
import DeleteItem from "../islands/DeleteItem.jsx";

export default function Home({ url }) {
  const searchParams = new URL(url).searchParams;
  const api = searchParams.get("api") || "http://localhost:8000";
  //const api = "http://localhost:8000"; // Hard-coded for testing
  console.log(api)
  return (
    <>
      <h1>FreeCycle</h1>
      <div>
        <CreateItem api={api} />
      </div>
      <div>
        <GetItems api={api}/>
      </div>
      <div>
        {/* Pass the `api` prop to GetSingleItem if it's required by the component */}
        <GetSingleItem api={api} />
      </div>
      <div>
        <DeleteItem api={api}/>
      </div>
    </>
  );
}
