// Import the 'items' array from the 'global.js' module. This array is used to store item data.
import { items } from './global.js';

// Define and export the add_item function to add a new item to the 'items' array
export const add_item = (item) => {
    // Log entries for debugging purposes
    console.log("entered handlers");
    console.log(item);
    console.log(typeof(item));

    // Define the required fields for an item
    const required_fields = ['user_id', 'keywords', "description", "lat", "lon"];
    
    // Check if the provided item has all required fields
    for (const field of required_fields) {
        console.log("entered for loop");
        // deno-lint-ignore no-prototype-builtins
        if (!item.hasOwnProperty(field)) {
            console.log("is this where the error is?");
            return false;
        }
    }
    // The rest of the code block is omitted for brevity
};

// Define and export the get_item function to retrieve an item by its ID
export const get_item = (id) => {
    console.log(id);
    // Iterate over the items array to find the item with the given ID
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            const foundItem = items[i];
            console.log(i);
            console.log(items[i]);
            console.log(items[i].id);
            return foundItem;
        }
    }
    return false; // Return false if no matching item is found
};

// Define and export the get_all_items function to return all items
export const get_all_items = () => {
    return items;
};

// Define and export the delete_item function to remove an item by its ID
export const delete_item = (id) => {
    for (let i = 0; i < items.length; i++) {
        console.log(`Comparing: ${items[i].id} with ${id}`);
        if (items[i].id === id) {
            console.log(`Deleting item with ID: ${id}`);
            items.splice(i, 1); // Remove the item from the array
            return true; // Indicate successful deletion
        }
    }
    console.log(`Item with ID: ${id} not found`);
    return false; // Return false if the item is not found
};
