import { items } from './global.js';

/*export const jsonParser = (jsonString) => {
    // Remove line continuation backslashes (\) followed by a newline character
    jsonString = jsonString.replace(/\\\n/g, '');
  
    // Replace single quotes with double quotes
    jsonString = jsonString.replace(/'([^']*)'/g, '"$1"');
  
    // Remove trailing commas from arrays and objects
    jsonString = jsonString.replace(/,\s*([\]}])/g, '$1');
  
    return jsonString;
};

export const isValidJSON = (jsonObject) => {
    try {
        JSON.parse(jsonObject);
        return true;
      } catch (error) {
        console.log(error)
        return false;
      }
};*/

export const add_item = (item) => {
    console.log("entered handlers")
    console.log(item)
    console.log(typeof(item))
    const required_fields = ['user_id', 'keywords', "description", "lat", "lon"];
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
        date_from: new Date().toISOString(),
        date_to: new Date().toISOString(),
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

    //items[myUUID] = new_item; // Add the new_item to the dictionary
    console.log(new_item)
    items.push(new_item)
    return new_item;
        }
    }
};

export const get_item = (id) => {
    console.log(id);
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

export const get_all_items = () => {
    return items;
};

export const delete_item = (id) => {
    console.log(id)
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            console.log(i);
            console.log(items[i]);
            console.log(items[i].id);
            delete items[i]
            return foundItem;
        }
    }
};