
////////////////featch films and display///////////////////////////////////////
let allData;
let result;
var trendingURL =
  "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
let latestURL =
  "https://api.themoviedb.org/3/movie/latest?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
let popularURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
var topratedURL =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
var upcomingURL =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
var NowURL =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44";

 async function getdata(url=NowURL){
 let responce=await fetch(url)
 if(responce.status!=200){
  alert("no data")
 }
 else{
   allData =await responce.json()
   result=allData.results
  
   console.log(result)
   await setData()
 }
};
  function setData(){
   return new Promise(function(){
     let row=document.getElementById('filmsDAta')
     let cartona=``
     for( let i=0;i<result.length;i++){
       cartona+=`<div class="col-md-4 h-auto">
       <div class="film-content text-center  py-3 h-100">
             <div class="content-base position-relative">
                 <img src="https://image.tmdb.org/t/p//w500${result[i].poster_path}" class="w-100  rounded shadow img-fluid"alt="Michael Broad photo">
                 <div class="content-over  d-flex flex-column justify-content-center ">
                     <h3 id="filmName">${result[i].original_title}</h3>
                     <p id="filmDesc"> ${result[i].overview}</p>
                     <h5 id="filmRate">rate:${result[i].vote_average}</h5>
                     <h6 id="filmDate">${result[i].release_date}</h6>
                 </div>
             </div>
         </div>
 </div>`
     }
     row.innerHTML=cartona;
   })

}

//////////////////////search in films////////////////////////////// 
function searchfilm(term){
  
  cartona=``;
  for(i=0;i<result.length;i++){
      if(result[i].original_title.toLowerCase().includes(term.toLowerCase()) == true){
        console.log('yes')
          cartona+=`<div class="col-md-4 h-auto">
          <div class="film-content text-center  py-3 h-100">
                <div class="content-base position-relative">
                    <img src="https://image.tmdb.org/t/p//w500${result[i].poster_path}" class="w-100  rounded shadow img-fluid"alt="Michael Broad photo">
                    <div class="content-over  d-flex flex-column justify-content-center ">
                        <h3 id="filmName">${result[i].original_title}</h3>
                        <p id="filmDesc"> ${result[i].overview}</p>
                        <h5 id="filmRate">rate:${result[i].vote_average}</h5>
                        <h6 id="filmDate">${result[i].release_date}</h6>
                    </div>
                </div>
            </div>
    </div>`;
      }
  }
  let row=document.getElementById('filmsDAta')
  row.innerHTML=cartona;
}
///////////////////////////////////////////////////serach by word//////////////
 async function searchByWord(term){
    let  searchresponce=await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`)
    if(searchresponce.status!=200){
     alert("no matching data")
    }
    else{
      searchData =await searchresponce.json()
      searchresult=searchData.results
      cartona=``;
  for(i=0;i<searchresult.length;i++){
      if(searchresult[i].original_title.toLowerCase().includes(term.toLowerCase()) == true){
        console.log('yes')
          cartona+=`<div class="col-md-4 h-auto">
          <div class="film-content text-center  py-3 h-100">
                <div class="content-base position-relative">
                    <img src="https://image.tmdb.org/t/p//w500${searchresult[i].poster_path}" class="w-100  rounded shadow img-fluid"alt="Michael Broad photo">
                    <div class="content-over  d-flex flex-column justify-content-center ">
                        <h3 id="filmName">${searchresult[i].original_title}</h3>
                        <p id="filmDesc"> ${searchresult[i].overview}</p>
                        <h5 id="filmRate">rate:${searchresult[i].vote_average}</h5>
                        <h6 id="filmDate">${searchresult[i].release_date}</h6>
                    </div>
                </div>
            </div>
    </div>`;
      }
  }
  let row=document.getElementById('filmsDAta')
  row.innerHTML=cartona;
    
    }
   };
///////////////////////////// side bar apper and not
let innerSectionWidth=$('#innerSection').outerWidth();
$('.toggle-icon ').click(function(){
  if($('#sideBar').css('left')=="0px"){
    $('.nav-catecory').animate({opacity:'0',paddingTop:'500px'},2000)
    $('.toggle-icon i').removeClass(' fas fa-times').addClass('fas fa-align-justify')
    $('#sideBar').animate({left:-`${innerSectionWidth}`},1000)
  }
  else{
    $('#sideBar').animate({left:`0px`},1000,function(){
      $('.nav-catecory').animate({opacity:'1',paddingTop:'25px'},2000)
      $('.toggle-icon i').removeClass('fas fa-align-justify').addClass('fas fa-times')
      
    }) 

  }   

})
///////////////////////////////// document ready and loding screen and side bar
$(document).ready(function(){
  ///hide color box when opening site
  getdata()
  let innerSectionWidth=$('#innerSection').outerWidth();
  $('#sideBar').css('left',-`${innerSectionWidth}`)
  ////loading screen fadeout
  $('.sk-chase').fadeOut(1000,()=>{
    $('#lodeingPage').fadeOut(1000,()=>{
        $('#lodeingPage').remove();
        $('body').css('overflow-y','auto')
    })
})
})
////////////////////////////// window scrool and apper up button
$(window).scroll(function(){
  
  wcsroll=$(window).scrollTop();
  if(wcsroll > 936){
    $('#up-btn').fadeIn(1000)
  }
  else{
    $('#up-btn').fadeOut(1000)
  }
})
$('#up-btn').click(function(){
  $('body,html').animate({scrollTop:0},1000)
})
/////////////////
//////////////////////// event on links nav

var popularr =document.getElementById('popular')
popularr.addEventListener('click',function(){
  getdata(popularURL)
})
var nowplay =document.getElementById('nowplay')
nowplay.addEventListener('click',function(){
  getdata(NowURL)
})


var trend =document.getElementById('trend')
trend.addEventListener('click',function(){
  getdata(trendingURL)
})

var upcom =document.getElementById('upcom')
upcom.addEventListener('click',function(){
  getdata(upcomingURL)
})
var toprate =document.getElementById('toprate')
toprate.addEventListener('click',function(){
  getdata(topratedURL)
})

/////////////////////////////






/////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////contact form///////////////////////////////////////////////
let newName=document.getElementById('name')
let newEmail=document.getElementById('email')
let newPhone=document.getElementById('phone')
let newAge=document.getElementById('age')
let newPassword=document.getElementById('password')
let newRepassword=document.getElementById('repassword')
////
let alertName=document.getElementById('nameAlert')
let alertEmail=document.getElementById('emailAlert')
let alertPhone=document.getElementById('phoneAlert')
let alertAge=document.getElementById('ageAlert')
let alertPassword=document.getElementById('passwordAlert')
let alertRepassword=document.getElementById('repasswordAlert')
////
let submitbtn=document.getElementById('submit')

// //validatename
newName.addEventListener('blur',function(){
  var regex=/^[A-Z][a-z]{2,6}$/
  if(regex.test(newName.value)==true)
  { 
       submitbtn.removeAttribute("disabled");
      newName.classList.add("is-valid");
      newName.classList.remove("is-invalid");
       alertName.classList.add("d-none");
     return true;
  }
  else{
    submitbtn.disabled="true";
      newName.classList.add("is-invalid");
      newName.classList.remove("is-valid");
      alertName.classList.remove("d-none");
      alertName.innerHTML="name must start with capital character and 2-6 characters"
      return false;
  }
})
// //////////// validate mail
newEmail.addEventListener('blur',function(){
  var regex=/^\w+@[a-zA-Z]+.com$/
  if(regex.test(newEmail.value)==true)
  { 
    submitbtn.removeAttribute("disabled");
       newEmail.classList.add("is-valid");
       newEmail.classList.remove("is-invalid");
       alertEmail.classList.add("d-none");
     return true;
  }
  else{
    submitbtn.disabled="true";
      newEmail.classList.add("is-invalid");
      newEmail.classList.remove("is-valid");
      alertEmail.classList.remove("d-none");
      alertEmail.innerHTML="email should be in this method *exaple@exaple.com*"
     
      return false;
  }
})
////////validate phone
newPhone.addEventListener('blur',function(){
  var regex=/^01[1|2|5|0][0-9]{8}$/
  if(regex.test(newPhone.value)==true)
  { 
    submitbtn.removeAttribute("disabled");
    newPhone.classList.add("is-valid");
    newPhone.classList.remove("is-invalid");
    alertPhone.classList.add("d-none");
     return true;
  }
  else{
    submitbtn.disabled="true";
    newPhone.classList.add("is-invalid");
    newPhone.classList.remove("is-valid");
    alertPhone.classList.remove("d-none");
    alertPhone.innerHTML="phone number contains 11numeric values& start with 010,012,015,010 "
     
      return false;
  }
})
/////validate age
newAge.addEventListener('blur',function(){
  var regex=/([1-8][0-9]|90)$/
  if(regex.test(newAge.value)==true)
  { 
    submitbtn.removeAttribute("disabled");
    newAge.classList.add("is-valid");
    newAge.classList.remove("is-invalid");
    alertAge.classList.add("d-none");
     return true;
  }
  else{
    submitbtn.disabled="true";
    newAge.classList.add("is-invalid");
    newAge.classList.remove("is-valid");
    alertAge.classList.remove("d-none");
    alertAge.innerHTML="age should be between 10-90 yearsold "
     
      return false;
  }
})
/////validate password
newPassword.addEventListener('blur',function(){
  var regex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-z])(?=.*\W).{8,15}$/
  if(regex.test(newPassword.value)==true)
  { 
    submitbtn.removeAttribute("disabled");
    newPassword.classList.add("is-valid");
    newPassword.classList.remove("is-invalid");
    alertPassword.classList.add("d-none");
     return true;
  }
  else{
    submitbtn.disabled="true";
    newPassword.classList.add("is-invalid");
    newPassword.classList.remove("is-valid");
    alertPassword.classList.remove("d-none");
    alertPassword.innerHTML="password should conatin numbers,lowerletter,upperletter,specialcaracter "
     
      return false;
  }
})
/////validate password
newRepassword.addEventListener('blur',function(){
  if((newRepassword.value)==(newPassword.value))
  { 
    submitbtn.removeAttribute("disabled");
    newRepassword.classList.add("is-valid");
    newRepassword.classList.remove("is-invalid");
    alertRepassword.classList.add("d-none");
     return true;
  }
  else{
    submitbtn.disabled="true";
    newRepassword.classList.add("is-invalid");
    newRepassword.classList.remove("is-valid");
    alertRepassword.classList.remove("d-none");
    alertRepassword.innerHTML="password not match "
     
      return false;
  }
})
////////// store info in container in local storage
let Clientcontainer;
 if(localStorage.getItem('Clientcontainer')!= null){
  Clientcontainer=JSON.parse(localStorage.getItem('Clientcontainer')); 
  console.log(Clientcontainer)
 }
 else{
  Clientcontainer=[];
 }
 function signup(){
  var newClient={
      Name:newName.value,
      Email:newEmail.value,
      Phone:newPhone.value,
      Age:newAge.value,
      Password:newPassword.value
      
  }
  if(!searchMail()){
      submitbtn.removeAttribute("disabled");
      Clientcontainer.push(newClient);
      localStorage.setItem('Clientcontainer',JSON.stringify(Clientcontainer))
      console.log(Clientcontainer)

      clear();
      alert('sucessfully you have  an account')
      
    
  }
  else{
      alert("try another Email")
      submitbtn.disabled="true";
  }
 
}
//add onclick sign up
submitbtn.addEventListener('click',function(){
  if(newName.value==''|newPassword.value==""| newEmail.value==''|  newAge.value==''|newRepassword.value==''| newPhone.value==''){
    submitbtn.disabled="true";
    alertRepassword.classList.remove("d-none");
    alertRepassword.innerHTML="password not match "
    alertPassword.classList.remove("d-none");
    alertPassword.innerHTML="password should conatin numbers,lowerletter,upperletter,specialcaracter "
    alertAge.classList.remove("d-none");
    alertAge.innerHTML="age should be between 15-90 yearsold "
    alertPhone.classList.remove("d-none");
    alertPhone.innerHTML="phone number contains 11numeric values& start with 010,012,015,010 "
    alertEmail.classList.remove("d-none");
    alertEmail.innerHTML="email should be in this method *exaple@exaple.com*"
    alertName.classList.remove("d-none");
    alertName.innerHTML="name must start with capital character and 2-6 characters"
  }
  else{
    submitbtn.removeAttribute("disabled");
    
    signup()
  }
  
})
//searchmail
function searchMail(){
  for(var i=0; i<Clientcontainer.length;i++){
      if(Clientcontainer[i].Email.toLowerCase()== newEmail.value.toLowerCase())
     {
      return true;
     }
    
  }
  
}
//clear contact form
function clear(){
  newName.value=''
  newPassword.value=''
  newEmail.value=''
  newAge.value=''
  newRepassword.value=''
  newPhone.value=''
  newName.classList.remove('is-valid')
  newName.classList.remove("is-invalid");
  alertName.classList.add("d-none");
  newAge.classList.remove('is-valid')
  newAge.classList.remove("is-invalid");
  alertAge.classList.add("d-none");
  newPhone.classList.remove('is-valid')
  newPhone.classList.remove("is-invalid");
  alertPhone.classList.add("d-none");
  newEmail.classList.remove('is-valid')
  newEmail.classList.remove("is-invalid");
  alertEmail.classList.add("d-none");
  newPassword.classList.remove('is-valid')
  newPassword.classList.remove("is-invalid");
  alertPassword.classList.add("d-none");
  newRepassword.classList.remove('is-valid')
  newRepassword.classList.remove("is-invalid");
  alertRepassword.classList.add("d-none");
}