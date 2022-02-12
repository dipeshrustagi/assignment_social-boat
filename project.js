var fetchObject = {
  data: undefined,
  loading: true
}
var videoList = {
  data: undefined,
  loading: true
}
var currentUser = undefined;
const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
const createProfile = () => {
  //read your data

  const uid = document.getElementById('uid').value;
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const bio = document.getElementById('Bio').value;
  const linkedin = document.getElementById('Linkedin').value;
  const facebook = document.getElementById('fb').value;
  const instagram = document.getElementById('Instagram').value;
  fetch('https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentPost',{
    method:"POST",
    body:JSON.stringify({
      name,age,bio,uid,linkedin,facebook,instagram
    })
  }).then(() => {
    alert('form successfully submited');
    getUserDetails(uid);

  })
  .catch((e)=>{
   alert("ERROR AT SUBMITTING FORM === "+JSON.stringify(e));
  });
}

const getUserDetails = (userId) => {
  // fetch user info
  // Dummy API call : https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentGet?uid=1
  fetch(`https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentGet?uid=${userId}`)
    .then((res) => {
      res = res.json();
      currentUser = res.profile;
      document.getElementById('userDetails').innerHTML = `<li><img src=${currentUser.img}/></li><li>Name : ${currentUser.name}</li><li>${currentUser.bio}</li`;
    })
    .catch(() => {
      alert("oops getuserDetails api failed");
    })
}

//debounce(fetchVideos,400)();
const fetchVideos = (query) => {

  // fetch videos
  fetch(`https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos?q=${query}&numResults=5`)
    .then((resp) => {
      resp = resp.json;
      videoList.data = resp;
      videoList.loading = false;
      let jsString = '';
      for (let i = 0; i < resp.results.length; i++) {
        console.log(resp.results[i]);
        jsString += `<li class="videocss"><div><video width="400" controls><source src=${resp.results[i].video} type="video/mp4">Your browser does not support HTML video</video></div><div class="textvideo">${resp.results[i].text}</div></li>`;
      }
      document.getElementById('videoList').innerHTML = jsString;
    })
    .catch(() => {
      alert("OOPS, Something went wrong !!!!");
      //TODO : Please remove this code 
    })
}
fetchVideos('fit');
