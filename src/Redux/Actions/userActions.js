import {LOGIN, LOGOUT, SIGNUP, GET_SIGNED_IN_PROFILE, UPDATE_PROFILE_PICTURE} from "../actionNames";
import axios from "axios";


export const login = (email, password) => {
    return{
        type: LOGIN,
    payload: axios.post('/login', {"email":email, "password":password}).then(res => res.data)
    }
}


export const signUp = (email, password, name, username, phoneNumber, campus) => {
    return{
        type: SIGNUP,
        payload: axios.post('/signup', {"email":email, "password":password, "name": name, "userName": username, phoneNumber, campus}).then(res => res.data)
    }
}

export const getSignedInProfile = (authToken) => {
    const headers = {
      'Authorization': `Bearer ${!authToken ? 1: authToken.token}`
  };
    return {
      type: GET_SIGNED_IN_PROFILE,
      payload: axios.get(`https://us-central1-textbook-store-2e072.cloudfunctions.net/api/user`, {headers})
        .then((data) => data.data),
    };
  };

export const loginWithOldtAuthToken = (pastAuthToken) => {
    return{
        type: "LOGIN_WITH_OLD_AUTH_TOKEN",
        payload: pastAuthToken
    }
}





export const logout = () => {
    return{
        type: LOGOUT,
    }
}




export const updateProfilePicture = (user, image) => {
    const headers = {
      Authorization: `Bearer ${user.authToken.token}`,
    };
    const formData = new FormData();
    formData.append("file", image);
  
    let imageURL;
  
    return {
      type: UPDATE_PROFILE_PICTURE,
      payload: axios
        .post("/image/User_Profile_Images", formData, { headers })
        .then((res) => {
          imageURL = res.data.url;
          console.log(imageURL)
          axios
            .put("user/profilePicture", {imageURL}, { headers })
            .then((data) =>  data)
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        }),
    };
  };
