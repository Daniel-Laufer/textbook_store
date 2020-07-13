import {
  GET_TEXTBOOKS,
  SEARCH_AND_UPDATE_TEXTBOOKS,
  CREATE_NEW_TEXTBOOK,
  DELETE_ITEM,
  UPDATE_TEXTBOOK
} from "../actionNames.js";
import axios from "axios";
axios.defaults.baseURL="https://us-central1-textbook-store-2e072.cloudfunctions.net/api";



export const getTextbooks = () => {
  return {
    type: GET_TEXTBOOKS,
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
