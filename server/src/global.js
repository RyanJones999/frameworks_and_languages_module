export const items = []; //removed type annotations as i am no longer using typescript

//After doing some research it is recommended to avoid using the type 'any' to maintain safety and ensure code clarity.
//Instead I can declare a set of types including a nested list for keywords, which only needs to contain strings


//export const items: (string | string[] | string | string | number | number | string | string)[] = [] //the last two string will be ISOStrings

/*
items.push("some string")
items.push(["some string", "some other string"])
items.push("some other string")
items.push("another some string")
items.push(45)
items.push(23)
items.push("2023-10-04T16:42:18.355Z")
items.push("2023-10-04T16:42:18.355Z")
*/

/* 

deno run -A globalTest.ts

Output:
[
  "some string",
  [ "some string", "some other string" ],
  "some other string",
  "another some string",
  45,
  23
]

*/
