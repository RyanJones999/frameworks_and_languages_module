import { items } from './global.js';

let itemCount = 0; // A counter to generate unique IDs

export const add_item = (item) => {
    const required_fields = ["user_id", "keywords", "description", "image", "lat", "lon"];
    for (const field of required_fields) {
        if (!item.hasOwnProperty(field)) {
            console.log("Field not found: " + field);
            return false;
        }
    }

    const new_item = {
        id: itemCount++,
        date_from: new Date().toISOString(),
        ...item // Spread operator to copy fields from item
    };

    items[new_item.id] = new_item; // Add the new_item to the dictionary
    return new_item.id;
};

export const get_item = (id) => {
    return items[id] || false;
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
