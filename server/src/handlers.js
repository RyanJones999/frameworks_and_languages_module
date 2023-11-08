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


/*
export const add_item = (item) => {
    // check for required fields
    const required_fields = ["user_id", "keywords", "description", "image", "lat", "lon"];
    for (const field of required_fields) {
        // deno-lint-ignore no-prototype-builtins
        if (!item.hasOwnProperty(field)) {
            // if any of the required fields are missing it will return false
            console.log("field not found " + field)
            return false;
        }
    }
    //var new_item = {}; changed to const

    const new_item = {
        id: items.length+1,
        date_from: new Date().toISOString(),
        user_id: "",
        keywords: [],
        description: "",
        image: "",
        lat: 0.0,
        lon: 0.0
    };

    if (typeof item.user_id == typeof ""){
        new_item.user_id = item.user_id;
    }
    else {
        return false;
    }

    if (typeof item.keywords == typeof []){
        new_item.keywords = item.keywords;
    }
    else {
        return false;
    }

    if (typeof item.description == typeof ""){
        new_item.description = item.description;
    }
    else {
        return false;
    }

    if (typeof item.image == typeof ""){
        new_item.image = item.image;
    }
    else {
        return false;
    }

    if (typeof item.lat == typeof 0.0){
        new_item.lat = item.lat;
    }
    else {
        return false;
    }

    if (typeof item.lon == typeof 0.0){
        new_item.lon = item.lon;
    }
    else {
        return false;
    }
    //items.push(new_item);
    for (const tmp in new_item) {
        items.push(tmp)
    }
    return new_item.id;
}

export const get_item = (id) => {
    if (items[id] !== undefined) {
        return items[id]
      }
    return false;
}

*/