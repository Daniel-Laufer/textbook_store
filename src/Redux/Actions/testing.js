

// const axios = require("axios");



// const headers = {
//     'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjRlMjdmNWIwNjllYWQ4ZjliZWYxZDE0Y2M2Mjc5YmRmYWYzNGM1MWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGV4dGJvb2stc3RvcmUtMmUwNzIiLCJhdWQiOiJ0ZXh0Ym9vay1zdG9yZS0yZTA3MiIsImF1dGhfdGltZSI6MTU5MTgxMTkyNSwidXNlcl9pZCI6IkdRT09icUo0OUxQMDNubXJRRHMycEFiczZWMzIiLCJzdWIiOiJHUU9PYnFKNDlMUDAzbm1yUURzMnBBYnM2VjMyIiwiaWF0IjoxNTkxODExOTI1LCJleHAiOjE1OTE4MTU1MjUsImVtYWlsIjoibGF1ZmVya2RhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibGF1ZmVya2RhbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.LqHC-yO2VA_4YkTdG90wbt1GzOqy69YFF3Evo224FT3a2QyyfG8NmltuZN3GOCpNmvYHFS_L6H4t2-050FLwY0PZ_6pcLHu7_ureYIccYSgSqWjWvNLQVvmJSqzYVlbDBfm5KcXkq0T_ZqweOB3CmJtQ8-pJ2GPAySj-B676afDb04STjNpJ7avi2LIdSMoixQ6Z1xYUAyLn5PIsVK1eyUOYLEVI6B9oxeBYP6FLKMWue5_zVPpNxk0JbppbdtQ3mdLpdAgXq-y4gz7ZtoBczhLQcVwbtCw9Qhakl0wZyxZN54j9DY569MemYV9WiGIfHoZ43j2D5uq7awc4WFzEgw'
//   };
//   axios.post('https://us-central1-textbook-store-2e072.cloudfunctions.net/api/cart/6XWgIHHxvTsdTO8q3HJ4', {}, {headers})
//       .then((data) => console.log(data.data)).catch(err => console.log(err))


fetch("/Users/daniellaufer/Desktop/2020 Coding Adventures.nosync/React/textbook_store/src/scraping scripts/courses.txt").then(res => console.log(res.text()))