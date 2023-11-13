import { items } from './global.js';

export const add_item = (item) => {
    // check for required fields
    const required_fields = ["user_id", "keywords", "description", "image", "lat", "lon"];
    for (const field of required_fields) {
        if (!item.hasOwnProperty(field)) {
            console.log("Field not found: " + field);
            return false;
        }
    }

    const new_item = {
        id: items.length,
        date_from: new Date().toISOString(),
        user_id: "",
        keywords: [],
        description: "",
        image: "",
        lat: 0.0,
        lon: 0.0
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

    items.push(new_item); // Push the new_item object to the items array
    return new_item.id;
};

export const get_item = (id) => {
    if (items[id] !== undefined) {
        return items[id];
    }
    return false;
};

export const get_all_items = () => {
    return items;
};

export const delete_item = (id) => {
    const index = items.findIndex(item => item.id === id);
    if (index > -1) {
      items.splice(index, 1);
      return true; // Successfully deleted
    } else {
      return false; // Item not found
    }
  };