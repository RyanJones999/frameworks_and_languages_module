// import { useState } from "preact/hooks"; // Uncomment if useState is needed
import CreateItem from "../islands/CreateItem.jsx";
import GetItems from "../islands/GetItems.jsx";

export default function Home({ url }) {
  const searchParams = new URL(url).searchParams;
  const api = searchParams.get("api");
  if (!api) {
    return <div>Error: Please enter API URL parameter.</div>;
  }

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
    </>
  );
}
