const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnSec.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnThird.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-75%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
submitBtn.addEventListener("click", function(){
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  setTimeout(function(){
    alert("Your Form Successfully Signed up");
    location.reload();
  },800);
});

prevBtnSec.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnThird.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnFourth.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

async function signIn(e){
  e.preventDefault()
  const Username=document.getElementById("Username").value
  const pass=document.getElementById("pass").value
  const email=document.getElementById("Email").value
  const mobile=document.getElementById("Mobile").value
  const add= document.getElementById("Add").value
  const Name= document.getElementById("Name").value
  const DOB= document.getElementById("Date").value
  const Weight= document.getElementById("Weight").value
  const Gender= document.getElementById("Gender").value
  const Verify= document.getElementById("Verify").value
  
  const url="http://127.0.0.1:3000/users"
  const jsonData = { username: Username,
    email: email,
    password:pass,
    mobileNumber:mobile,
    address:add,
    name:Name,
    dob:DOB,
    weight:Weight,
    gender:Gender,
    isHuman: (Verify=="Yes")
    };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Set content type to JSON
    },
    body: JSON.stringify(jsonData) // Convert JSON data to a string and set it as the request body
  };
  const res=await fetch(url,options)
  if(res.status===201){
    alert('Successfully Signup')
    window.location = "/blood_front_end/Multi%20steps%20form/login.html";
  }
  else{
    alert('Please fill each reuirement carefully')
  }
}

async function login(e){
  e.preventDefault()
  const Email=document.getElementById("Email").value
  const Password=document.getElementById("password").value
  const urll="http://127.0.0.1:3000/users/login"
  const jsonData = { 
    email:Email,
    password:Password
    };
    console.log(jsonData)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Set content type to JSON

      },
      body: JSON.stringify(jsonData) // Convert JSON data to a string and set it as the request body
    };
    const res=await fetch(urll,options)
    if(res.status===201){
      //save cookie
      
      const data=await res.json();
      console.log(data.token);
      document.cookie = `token=${data.token};path=/;`;
      //save in coo
      window.location = "/blood_front_end/form.html";
    }
    else{
      alert('Password or Email Not matched')
    }

}

async function donate(e){
  e.preventDefault();
  console.log('av')
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const weight = document.getElementById("weight").value;
  const contact = document.getElementById("contact").value;
  const donatedBefore = document.getElementById("donated").value;
  const surgeries = document.getElementById("surgeries").value;
  const pregnancies = document.getElementById("pregnancies").value;
  const bmi = document.getElementById("bmi").value;
  const bloodPressure = document.getElementById("bp").value;
  const healthCondition = document.getElementById("donorhealthCondition").value;
  const transfusion = document.getElementById("transfusion").value;
  const notDonatedLast3Months = document.getElementById("notDonatedLast3Months").checked;
  // console.log(name)

  const formData = {
      donor:{name: name,
      age: age,
      gender: gender,
      weight: weight,
      contact: contact,
      donatedBefore: donatedBefore,
      surgeries: surgeries,
      pregnancies: pregnancies,
      bmi: bmi,
      bloodPressure: bloodPressure,
      healthCondition: healthCondition,
      transfusion: transfusion,
      notDonatedLast3Months: notDonatedLast3Months
      },
      token:getCookie("token")
  };

  const url = "http://127.0.0.1:3000/donors";
  const token = getCookie("token");
  const jsonData = formData

  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
  };

  try {
      const res = await fetch(url, options);
      if (res.status !== 500) {
          alert('Form submitted successfully!');
          // window.location = "/blood_front_end/Multi%20steps%20form/login.html";
      } else {
          alert('Please fill each requirement carefully.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
  }
}

function getCookie (name) {
	let value = `; ${document.cookie}`;
	let parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}