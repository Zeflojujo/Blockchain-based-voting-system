const timestamp = Date.now();
const date = new Date(timestamp);
const year = date.getFullYear();
const month = date.getMonth() + 1; // months are zero-indexed, so add 1
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
console.log(formattedDate);
