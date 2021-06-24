const content = document.querySelector(".masonry .content");
const item = document.getElementById("item");

const loading = document.querySelector(".loading");
var posts;
var count = 0;
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  // console.log({ scrollTop, scrollHeight, clientHeight });

  if (scrollTop >= scrollHeight - clientHeight && count < 2) {
    loading.classList.add("show");
    setTimeout(getPost, 2000);
    count++;
  }
});

async function getPost() {
  var responseData = await getApi();
  // id = 0;
  // while (idList.length < 15) {
  //   id = Math.floor(Math.random() * 1);
  //   // console.log(id);
  //   if (!idList.includes(id)) idList.push(id);
  // }
  let htmls = "";
  responseData.forEach((item) => (htmls += renderPost(item)));
  loading.classList.remove("show");
  item.insertAdjacentHTML("beforeend", htmls);
  delete_img()
  setTimeout( postAction,1000);
}
getPost();
// function delete_img(){
//   let img = Array.from(document.querySelectorAll('.item'));
//   img.forEach(item => {
//     if(item.querySelector('img')){
//       if(item.querySelector('img').src=='undefined'){
//         item.removeChild(item.querySelector('img'))
//       }
//     }
//   })
// }

function renderPost(data) {
  var posts = `    <div class="item"  id = "${data.id}">
          <div class="card">
            <img src="${data.externalImageUrl}" class="card-img-top" alt="..." id="img-card">
            <div class="card-body">
              <h5 class="card-title size-title">${
                data.title
              }<i class="fas fa-check-circle"></i></h5>
              <p class="card-text size-content">${data.description}</p>
              <p class="categories">${data.contentType}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">${Math.trunc(
                (new Date() - new Date(data.lastModifiedDate)) / 86400000
              )} days ago</small>
              <small class="text-muted">
                <i class="fas fa-comment">${data.totalComment}</i>
                <i class="fas fa-heart" >${
                  data.totalEmotion.totalLove
                }</i>
                
              </small>
            </div>
          </div>
          </div>
    `;

  return posts;
  
}

async function filter(env) {
  var responseData = await getApi();
  // console.log(responseData)
  let htmlx = "";
  document.getElementById('item').innerHTML = '';
  responseData.forEach((item) => {
    if (item.contentType === env.innerHTML) {
      htmlx += renderPost(item);
    }
  });
  loading.classList.remove("show");
  item.insertAdjacentHTML("beforeend", htmlx);
}

// function filter(env) {
//   var idList = [];
//   id = 0;
//   while (idList.length < 20) {
//     id = Math.floor(Math.random() * arrayList.length);
//     // console.log(id);
//     if (!idList.includes(id)) idList.push(id);
//   }
//   let htmls = "";
//   loading.classList.remove("show");
//  item.insertAdjacentHTML("beforeend", htmls);
//   idList.forEach((i) => {
//     // console.log(i.type)
//     if (arrayList[i].type == env.innerHTML) {
//       console.log(arrayList[i].type)
//       console.log(env.innerHTML)
//       htmls += renderPost(arrayList[i]);

//     }
//   });

// }

async function getApi() {
  var token = localStorage.getItem("token");
  
  await fetch(
    "https://test.cliquefan.com/api/portal/fan/home?status=1&pageSize=50&pageIndex=0",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      posts = data.responseData.fanFeedResponses || [];
       return posts;
      // console.log(posts)
    })
    .catch((err) => {
      console.log(err);
    });
  return posts;
}
async function unfavorite(id) {
  var token = localStorage.getItem("token");

  await fetch(
    "https://test.cliquefan.com/api/portal/news/unreaction/love/"+id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    return response.json();
  })
  .then(data => {
    if(data.responseData)
    {
      alert("Thành công")
    }
    else if(!data.responseData){
     alert('fail');
    }
    
  })
}
async function favorite(id) {
  var token = localStorage.getItem("token");

  await fetch(
    "https://test.cliquefan.com/api/portal/news/reaction/love/"+id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    return response.json();
  })
  .then(data => {
    // console.log(data.responseData)
    if(data.responseData)
    {
      alert("Thành công")
    }
    else{
     alert('fail');
    }
    
  })
}
function postAction(){
  let iconHeart = [...document.querySelectorAll(".text-muted .fa-heart")];
  let posts = [...document.getElementsByClassName("item")];
  iconHeart.forEach((item,index)=>{
    item.addEventListener("click", () => {
      item.classList.toggle("active");
      let id = posts[index].id;
      let sl = Number(item.innerText);
      if (item.classList.contains("active")) {
        sl++;
      favorite(id);

      } else {
        sl--;
        unfavorite(id);
      }
    item.innerText = sl;
  });
});
}

  // for (let i of iconHeart) { 
  //   console.log("sjgdsj")
  //   i.addEventListener("click", () => {
  //     i.target.classList.toggle("active");
     
  //     let sl = Number(i.target.nextElementSibling.innerText);

  //     if (i.target.classList.contains("active")) {
  //       sl++;
  //       favorite();
  //     } else {
  //       sl--;
  //       unfavorite();
  //     }
  //   i.target.nextElementSibling.innerText = sl;

  //     // console.log(sl)
  //   });
