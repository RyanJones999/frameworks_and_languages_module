//import { useSignal } from "@preact/signals";
import CreateItem from "../islands/CreateItem.jsx";

export default function Home() {
  return(
    <>
    <h1>FreeCycle</h1>
    <div>
      <h1>Create New Item</h1>
      <CreateItem />
    </div>
    </>
  );
}
