// Import the 'items' array from the 'global.js' module. This array is used to store item data.
import { items } from './global.js';

// Define and export the add_item function to add a new item to the 'items' array
export const add_item = (item) => {
    // Log entries for debugging purposes
    console.log("entered handlers")
    console.log(item)
    console.log(typeof(item))

    // Define the required fields for an item
    const required_fields = ['user_id', 'keywords', "description", "lat", "lon"];

    // Check if the provided item has all required fields
    for (const field of required_fields) {
        console.log("entered for loop")
        // deno-lint-ignore no-prototype-builtins
        if (!item.hasOwnProperty(field)) {
            console.log("is this where the error is?")
            return false;
        }
        else{
                // Generate the new ID
    const myUUID = crypto.randomUUID();

    const new_item = {
        id: myUUID,
        ...item, // Spread operator to copy fields from item
        date_from: new Date().toISOString().replace(/Z$/, ''), //this is an abomination
        date_to: new Date().toISOString().replace(/Z$/, ''),
    };

    if (typeof item.user_id === "string") {
        new_item.user_id = item.user_id;
        console.log("checked user_id")
    } else {
        return false;
    }

    if (Array.isArray(item.keywords)) {
        new_item.keywords = item.keywords;
        console.log("checked keywords")
    } else {
        return false;
    }

    if (typeof item.description === "string") {
        new_item.description = item.description;
        console.log("checked description")
    } else {
        return false;
    }

    if (typeof item.image === "string") {
        new_item.image = item.image;
        console.log("checked image")
    } else {
        new_item.image = "";
    }

    if (typeof item.lat === "number") {
        new_item.lat = item.lat;
        console.log("checked lat")
    } else {
        return false;
    }

    if (typeof item.lon === "number") {
        new_item.lon = item.lon;
        console.log("checked lon")
    } else {
        return false;
    }

    console.log(new_item)
    items.push(new_item)
    return new_item;
        }
    }
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
    return false; // Return false if no matching item is found after the loop
};

// Define and export the get_all_items function to return all items
export const get_all_items = () => {
    return items;
};

// Define and export the delete_item function to remove an item by its ID
export const delete_item = (id) => {
    for (let i = 0; i < items.length; i++) {
        // Log to check what IDs are being compared
        console.log(`Comparing: ${items[i].id} with ${id}`);

        if (items[i].id === id) {
            console.log(`Deleting item with ID: ${id}`);
            items.splice(i, 1); // Remove the item from the array
            return true; // Item found and deleted
        }
    }
    console.log(`Item with ID: ${id} not found`);
    return false; // No item found with the given ID
};