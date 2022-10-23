import { baseUrl } from "./baseUrl";

export async function random() {
  let url = baseUrl+'random';
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}
