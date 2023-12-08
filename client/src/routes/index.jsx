import { useSignal, useEffect } from "preact/hooks";
import CreateItem from "../islands/CreateItem.jsx";
import GetItems from "../islands/GetItems.jsx";
import GetSingleItem from "../islands/GetSingleItem.jsx";
import DeleteItem from "../islands/DeleteItem.jsx";

export default function Home() {
  return(
    <>
      <h1>FreeCycle</h1>
      <div>
        <CreateItem />
      </div>
      <div>
        <GetItems />
      </div>
      <div>
        <GetSingleItem />
      </div>
      <div>
        <DeleteItem />
      </div>
    </>
  );
}
