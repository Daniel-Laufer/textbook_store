import {
  GET_TEXTBOOKS,
  SEARCH_AND_UPDATE_TEXTBOOKS,
  CREATE_NEW_TEXTBOOK,
  DELETE_ITEM,
  UPDATE_TEXTBOOK
} from "../actionNames.js";
import axios from "axios";

// const temp_data = [
//   {
//     sellerId: "SXbctgcd9EY5dCj05ZO5Vq0TQ763",
//     image:
//       "https://www.canadaeschool.ca/wp-content/uploads/2013/08/12UChemistry-covercropped.jpg",
//     price: "67",
//     description: "Chemistry is fun!",
//     title: "Chemistry I",
//     timePosted: "2020-06-01T21:00:56.660Z",
//     textbookId: "6XWgIHHxvTsdTO8q3HJ4",
//   },
//   {
//     sellerId: "SXbctgcd9EY5dCj05ZO5Vq0TQ763",
//     image:
//       "https://cdn11.bigcommerce.com/s-zzukzwlrsj/images/stencil/1280x1280/products/1878/23837/9780176510374__95237.1516397317.jpg?c=2&imbypass=on",
//     price: "56",
//     description: "Physics is fun!",
//     title: "Physics I",
//     timePosted: "2020-06-01T21:01:38.543Z",
//     textbookId: "9sdGm7JoAYaZ4BuKrX92",
//   },
//   {
//     sellerId: "SXbctgcd9EY5dCj05ZO5Vq0TQ763",
//     image: "https://images-na.ssl-images-amazon.com/images/I/91+JPLo3-qL.jpg",
//     price: "47",
//     description: "Biology is fun!",
//     title: "Biology I",
//     timePosted: "2020-06-01T21:00:56.660Z",
//     textbookId: "i4J4mRkRBLSL49ju1QVi",
//   },
// ];

export const getTextbooks = () => {
  return {
    type: GET_TEXTBOOKS,
    // payload: new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve([]);
    //   }, 500);
    // }),

  //   {
  //     "campus": "UTSG",
  //     "profilePicture": "https://firebasestorage.googleapis.com/v0/b/textbook-store-2e072.appspot.com/o/User_Profile_Images%2Fdefault%2Fdefault-user-icon.jpg?alt=media&token=1ba92de6-b192-4525-a2b0-0cc0f9da2ea0",
  //     "timeCreated": "2020-06-23T20:48:39.050Z",
  //     "userId": "q18lcP6XzsYaD9Von3fY9MMv2os1",
  //     "userName": "CanadianGuy"
  // }
  // [
  //   {
  //     "campus": "UTSG",
  //     "cartCount": 3,
  //     "image": "https://firebasestorage.googleapis.com/v0/b/textbook-store-2e072.appspot.com/o/Textbook_Images%2F325803570647.jpg?alt=media&token=58261f15-6158-4a2b-8069-3ecf991fa644",
  //     "privacySettings": {
  //         "Name": true,
  //         "Email": true,
  //         "Phone Number": false
  //     },
  //     "course": "ECO100",
  //     "price": "53.00",
  //     "seller": {
  //         "sellerId": "vtklzZdwhshks9YQoIy3N4HwoAv1",
  //         "sellerUsername": "DanL9875",
  //         "profilePicture": "https://firebasestorage.googleapis.com/v0/b/textbook-store-2e072.appspot.com/o/User_Profile_Images%2Fmaxresdefault%20(1).jpg?alt=media&token=1bbaf302-beff-4bc3-9dea-2b829f391d3f"
  //     },
  //     "description": "None.",
  //     "textbookQuality": {
  //         "stains": 0,
  //         "pagesMissing": 0,
  //         "handWriting": 0
  //     },
  //     "sellingLocation": "Bahen Center",
  //     "title": "Macroeconomics, Fifteenth Canadian Edition",
  //     "timePosted": "2020-06-23T19:36:50.866Z",
  //     "textbookId": "64RKdsgSZe1U8FnBRPOb"
  // }
  // ]



    payload: axios.get("/textbooks").then(res => res.data)
  };
};


export const searchAndUpdateTextbooks = (searchTerm, filters) => {
  return {
    type: SEARCH_AND_UPDATE_TEXTBOOKS,
    payload: {searchTerm, filters},
  };
};
// if(!image || description === '' || title === '' || price === '')

export const createNewTextbook = (user, image, description, title, price, course, campus, sellingLocation, pagesMissing, handWriting, stains, privacySettings) => {
  const headers = {
    Authorization: `Bearer ${user.authToken.token}`,
  };
  const formData = new FormData();
  formData.append("file", image);

  let imageURL;

  return {
    type: CREATE_NEW_TEXTBOOK,
    payload: axios
      .post("/image/Textbook_Images", formData, { headers })
      .then((res) => {
        imageURL = res.data.url;
        const otherData = { description, title, price, imageURL, course, campus, sellingLocation, textbookQuality: {pagesMissing, handWriting, stains}, privacySettings };
        axios
          .post("/createTextbook", { otherData }, { headers })
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        return null;
      }),
  };
};

export const updateTextbook = (user, image, description, title, price, course, campus, sellingLocation, pagesMissing, handWriting, stains, privacySettings , newImage, oldImageURL, textbookId) => {
  const headers = {
    Authorization: `Bearer ${user.authToken.token}`,
  };
  const formData = new FormData();
  formData.append("file", image);

  let imageURL;
  if(newImage){
    return {
      type: UPDATE_TEXTBOOK,
      payload: axios
        .post("/image/Textbook_Images", formData, { headers })
        .then((res) => {
          imageURL = res.data.url;
          const otherData = { description, title, price, imageURL, course, campus, sellingLocation, textbookQuality: {pagesMissing, handWriting, stains}, privacySettings };
          axios
            .put(`/textbook/${textbookId}`, { otherData }, { headers })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          return null;
        }),
    };
  }
  else{ // DO NOT NEED TO UPLOAD A NEW IMAGE HERE!!
    imageURL = oldImageURL;
    const otherData = { description, title, price, imageURL, course, campus, sellingLocation, textbookQuality: {pagesMissing, handWriting, stains}, privacySettings };
    
    return{
      type: UPDATE_TEXTBOOK,
      payload: axios
      .put(`/textbook/${textbookId}`, { otherData }, { headers })
      .then((data) => console.log(data))
      .catch((err) => console.log(err)),
    }
  }
  
};


export const deleteItem = (authToken, textbookId) => {

  const headers = {
    // 'Authorization': `Bearer ${authToken === null ? 1: authToken.token}`
    'Authorization': `Bearer ${authToken.token}`
  };
  return {
    type: DELETE_ITEM,
    payload: axios.delete(`/textbook/${textbookId}`, {headers})
      .then((data) => data.data)
  };
}
