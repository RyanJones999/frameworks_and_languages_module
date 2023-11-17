import { items } from './global.js';

//let itemCount = 0; // A counter to generate unique IDs

export const add_item = (item) => {
    const required_fields = ["user_id", "keywords", "description", "image", "lat", "lon"];
    for (const field of required_fields) {
        // deno-lint-ignore no-prototype-builtins
        if (!item.hasOwnProperty(field)) {
            console.log("Field not found: " + field);
            return false;
        }
    }

    // Generate the new ID
const existingIds = Object.keys(items).map(key => parseInt(key, 10));
let nextId = existingIds.length === 0 ? 1 : Math.max(...existingIds) + 1;
console.log(typeof(nextId))
 nextId = nextId.toString()


    const new_item = {
        id: nextId,
        ...item, // Spread operator to copy fields from item
        date_from: new Date().toISOString(),
        date_to: new Date().toISOString(),
    };

    if (typeof item.user_id === "string") {
        new_item.user_id = item.user_id;
    } else {
        return false;
    }

    if (Array.isArray(item.keywords)) {
        new_item.keywords = item.keywords;
    } else {
        return false;
    }

    if (typeof item.description === "string") {
        new_item.description = item.description;
    } else {
        return false;
    }

    if (typeof item.image === "string") {
        new_item.image = item.image;
    } else {
        return false;
    }

    if (typeof item.lat === "number") {
        new_item.lat = item.lat;
    } else {
        return false;
    }

    if (typeof item.lon === "number") {
        new_item.lon = item.lon;
    } else {
        return false;
    }

    items[nextId] = new_item; // Add the new_item to the dictionary
  // items.push(new_item)
    return new_item;
};

export const get_item = (id) => {
    const result = items[id]
    return result || false;
};

export const get_all_items = () => {
    return Object.values(items);
};

export const delete_item = (id) => {
    if (items[id]) {
      delete items[id];
      return true;
    } else {
      return false;
    }
};
