import { GET_TEXTBOOKS,SEARCH_AND_UPDATE_TEXTBOOKS } from "../actionNames.js";
// import axios from "axios";


const temp_data = [
  {
      "sellerId": "SXbctgcd9EY5dCj05ZO5Vq0TQ763",
      "image": "https://www.canadaeschool.ca/wp-content/uploads/2013/08/12UChemistry-covercropped.jpg",
      "price": "67",
      "description": "Chemistry is fun!",
      "title": "Chemistry I",
      "timePosted": "2020-06-01T21:00:56.660Z"
  },
  {
      "sellerId": "SXbctgcd9EY5dCj05ZO5Vq0TQ763",
      "image": "https://cdn11.bigcommerce.com/s-zzukzwlrsj/images/stencil/1280x1280/products/1878/23837/9780176510374__95237.1516397317.jpg?c=2&imbypass=on",
      "price": "56",
      "description": "Physics is fun!",
      "title": "Physics I",
      "timePosted": "2020-06-01T21:01:38.543Z"
  },
  {
      "description": "The calc textbook used in MAT136",
      "title": "Calc I",
      "timePosted": "2020-06-01T20:55:01.143Z",
      "sellerId": "SXbctgcd9EY5dCj05ZO5Vq0TQ763",
      "image": "https://images.ezvid.com/image/upload/fl_immutable_cache/e_trim/c_pad,f_auto,h_270,q_auto:eco/jrauvhcq17q66t8nwhcx",
      "price": "99"
  },{
    "sellerId": "SXbctgcd9EY5dCj05ZO5Vq0TQ763",
    "image": "https://images-na.ssl-images-amazon.com/images/I/91+JPLo3-qL.jpg",
    "price": "47",
    "description": "Biology is fun!",
    "title": "Biology I",
    "timePosted": "2020-06-01T21:00:56.660Z"
}
]

export const getTextbooks = () => {
  return {
    type: GET_TEXTBOOKS,
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([...temp_data])
      }, 500)
    })
    // payload: axios.get("/textbooks").then(res => res.data)
  };
};


export const searchAndUpdateTextbooks = (searchTerm) => {
  return{
    type: SEARCH_AND_UPDATE_TEXTBOOKS,
    payload: searchTerm

  }
}




