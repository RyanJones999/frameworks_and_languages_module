//import { useSignal } from "@preact/signals";
import CreateItem from "../islands/CreateItem.jsx";
import GetItems from "../islands/GetItems.jsx";
import DeleteItem from "../islands/DeleteItem.jsx";

export default function Home() {
  return(
    <>
    <h1>FreeCycle</h1>
    <div>
      <CreateItem />
    </div>
    <div>
      <DeleteItem />
    </div>
    <div>
      <GetItems />
    </div>
    </>
  );
}
