function CheckMail() {
  var email = document.getElementById("email").value;
  var errorEmail = document.getElementById("errorEmail");
  var regexEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  // /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm
  if (email == "" || email == null) {
    errorEmail.innerHTML = "Invalid email format";
  } else if (!regexEmail.test(email)) {
    errorEmail.innerHTML = "The field is required";
  } else {
    errorEmail.innerHTML = "";
    return email;
  }
}
function CheckPass() {
  var password = document.getElementById("password").value;
  var errorPassword = document.getElementById("errorPassword");

  if (password == "" || password == null) {
    errorPassword.innerHTML = "Invalid password format";
  } else if (password.length < 8) {
    errorPassword.innerHTML = "Password must have minimum of 8 charactors";
  } else {
    errorEmail.innerHTML = "";
    return password;
  }
}
function FormValidate() {
  if (CheckMail() && CheckPass()) {
    alert("Đăng nhập thành công");
  } else {
    alert("Vui lòng kiểm tra lại");
  }
}
function delete_err() {
  errorEmail.innerHTML = "";
  errorPassword.innerHTML = "";
}

 const login = async () => {
  let email = document.getElementById("email").value;
  let passwordUser = document.getElementById("password").value;
  
  let data = {
    username : email,
    password : passwordUser
  }

  var info = await getToken(data);
 
  if(info != null){
    localStorage.setItem("token", info.responseData.access_token);
    localStorage.setItem("allInfor",JSON.stringify(info.responseData) );
    localStorage.setItem("isLogined", true);
    
    window.location.href = "../Home/home.html";
  }

}

const getToken = async (data) => {

  const response = await fetch('https://test.cliquefan.com/api/portal/app/login', {
    method: 'POST',
    mode: "cors",
    redirect:'follow',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
   
  
  .catch(err => {
    console.error(err);
});
 
  return  response.json();
};


