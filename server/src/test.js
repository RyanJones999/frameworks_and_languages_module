function sanitizeJSONString(jsonString) {
    // Remove line continuation backslashes (\) followed by a newline character
    jsonString = jsonString.replace(/\\\n/g, '');
  
    // Replace single quotes with double quotes
    jsonString = jsonString.replace(/'([^']*)'/g, '"$1"');
  
    // Remove trailing commas from arrays and objects
    jsonString = jsonString.replace(/,\s*([\]}])/g, '$1');
  
    return jsonString;
  }

  function isValidJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  // Example usage:
  const incorrectJSON = `{
    'user_id': 'user1234',
    "keywords": [
      "hammer", "nails", "tools#^&*",
    ],
    "description": 'A hammer and nails set',
    "image": "https://placekitten.com/200/300",
    "lat": 51.2798438,
    "lon": 1.0830275,
  }`;
  
  const sanitizedJSON = sanitizeJSONString(incorrectJSON);
  console.log(sanitizedJSON);

  console.log(typeof(sanitizedJSON))

  try {
    const jsonObject = JSON.parse(sanitizedJSON);
    console.log("Parsed JSON Object:", jsonObject);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  if (isValidJSON(sanitizedJSON)) {
    console.log("The sanitized string is valid JSON.");
    try {
      const jsonObject = JSON.parse(sanitizedJSON);
      console.log("Parsed JSON Object:", jsonObject);
    } catch (error) {
      console.error("Unexpected error parsing JSON:", error);
    }
  } else {
    console.error("The sanitized string is not valid JSON.");
  }