import {
  GET_TEXTBOOKS,
  SEARCH_AND_UPDATE_TEXTBOOKS,
  CREATE_NEW_TEXTBOOK,
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
        console.log(otherData)
        axios
          .post("/createTextbook", { otherData }, { headers })
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        // console.log(err);
        return null;
      }),
  };
};
