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
      // TODO : Remove this code before submitting
      currentUser = {
        "uid": "1",
        "name": "Tanu Grover",
        "fb": "jiuiuhc",
        "img": "https://images.unsplash.com/photo-1643649763798-65b604349991?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "instagram": "dfgfggjuiu",
        "bio": "Education is the best friend. An educated person is respected everywhere. Education beats the beauty and the youth."
      };
      console.log(currentUser);
      document.getElementById('userDetails').innerHTML = `<li><img src=${currentUser.img}/></li><li>Name : ${currentUser.name}</li><li>${currentUser.bio}</li`;

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

      resp = {
        "status": "success",
        "results": [
          {
            "heading": "fit:r2ISFB",
            "text": "desc:unYS3o2NyhI1uY39CgF6I8HjLsTCHeOqphOXQ5sWd2G3bSSSACeDKTN51ucKeClmd6WQuIMpmM43mtI07I554uVNBx3djX46wyLwXqVuWkN5kxNhV0iwYHNk",
            "video": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            "tags": [
              "Cardio",
              "Running",
              "Cardio"
            ]
          },
          {
            "heading": "fit:i5hg2p",
            "text": "desc:1cE5aKvbwKyzS8HE6m3rKmAWfGEwM34Sicdzkx6cpPdPDp6PvmsbOHE0NnyJ5zfiiOlaI3Zi8zXbvfwIWmMNsg3eTW24JRHC7wqlYQQpkgF2GUHqRMgLj9Rq",
            "video": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "tags": [
              "Cycling",
              "HRX",
              "Tabata"
            ]
          },
          {
            "heading": "fit:ury8gy",
            "text": "desc:jx4KlIFmkM3h2AUXUEYQkbM7fItfJkeDbm2xd7tcN0w7UafjnswVMndKm9Mm1YJeyQ3s5A21rTkGjDIsvmRa2rLqsMb5N6DZltab8vxwH7ZA0SrqBtGAdeIz",
            "video": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            "tags": [
              "HRX",
              "Strength training",
              "HIIT"
            ]
          },
          {
            "heading": "fit:GsTRg4",
            "text": "desc:7XqK5MIpQJBVBq9Us2sklaTjQ1XdemltflhbOPFz21h9BCvQpyP8wmbUgELujEhpcja3bTugrFUACuXBJILcivTsoooNYcKeJRXRj8td8jEIQ1HPzku0ZxxO",
            "video": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "tags": [
              "HIIT",
              "Cycling",
              "Strength training"
            ]
          },
          {
            "heading": "fit:OySOC6",
            "text": "desc:k2ooEWjEMThmnv1ceQcUxXzwydjlVG8BPVrm5z3JJs2KwCvDLt2qDIQOqFbw1cI8KhkgoOPCEmMca69XY57OTYUnECINfnZ1jWnRyl1LREuBGk3EsWX35d2u",
            "video": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "tags": [
              "Running",
              "Tabata",
              "Cycling"
            ]
          }
        ]
      }
      videoList.data = resp;
      videoList.loading = false;
      let jsString = '';
      for (let i = 0; i < resp.results.length; i++) {
        jsString += `<li><div class="videocss"><video width="400" controls><source src=${resp.results[i].video} type="video/mp4">Your browser does not support HTML video</video></div><div class="textvideo">${resp.results[i].text}</div></li>`;
      }
      document.getElementById('videoList').innerHTML = jsString;
    })

}
fetchVideos('fit');