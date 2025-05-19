

//degişken tanımlamaları
let userInfoForm = document.getElementById("userInfoForm");
let inputElements = document.querySelector("input");

let steps = document.querySelectorAll(".step");
let stepOne = document.querySelector(".stepOne");
let stepTwo = document.querySelector(".stepTwo");

let resultForm = document.getElementById("result");

let nameSave = document.querySelector(".nameText");
let birthdaySave = document.querySelector(".birthdayText");
let ageSave = document.querySelector(".ageText");
let genderSave = document.querySelector(".genderText");

// let nextButton = document.getElementById("nextButton");
let currentStep = 1;
let nextStepButton = document.getElementById("nextStep");
let prevStepButton = document.getElementById("prevStep");
let savedButton = document.getElementById("savedButton");

//baslangıcta display none olarak gelecek olan elementler
resultForm.style.display="none";
savedButton.style.display="none";


let today = new Date();

function updateStep(stepNumber){
    steps.forEach(content => {
        content.classList.remove("active");
        if(parseInt(content.dataset.step) === stepNumber){
            content.classList.add("active");
        }
    })

    prevStepButton.disabled = stepNumber === 1;
    nextStepButton.style.display = stepNumber === 3 ? "none" : "block";
    savedButton.style.display = stepNumber === 3 ? "block" : "none";
}

function prevStep(){
    console.log(currentStep)
    if(currentStep > 1){
        currentStep--;
        updateStep(currentStep);
    }
}
function nextStep(){
    if(currentStep < 3){
        currentStep++;
        updateStep(currentStep);
    }
}

nextStepButton.addEventListener("click", ()=> {
    nextStep();
});
prevStepButton.addEventListener("click", ()=> {
    prevStep();
});

function startRegister() {
    location.reload();
}
// bootstrap form validation
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        let inputElementsValue = inputElements.value;
        
        let getName = event.target["nameSurname"].value;
        let getBirthday = event.target["birthday"].value;
        let getGender = event.target["gender"].value;

        console.log("name : " + getName);

        nameSave.innerHTML = getName;
        console.log("nameSave : " + nameSave.innerText)
        console.log("name 2: " + getName);

        birthdaySave.innerHTML = getBirthday;
        console.log("nameSave : " + birthdaySave.innerText)
        console.log("name 2: " + getBirthday);

        let birth = new Date(getBirthday);

        let age = today.getFullYear() - birth.getFullYear();
        ageSave.innerHTML = age;

        console.log("cinsiyet : " + getGender);
        genderSave.innerHTML = getGender;

        console.log(inputElementsValue)

        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }      
        else if(form.checkValidity()){
            console.log(inputElementsValue)
            console.log("buraya yaz")
            //yaşı 18 ve 18 den buyuk ıse ve cınsıyet kadın ıse
            if(age >= 18 && getGender == "Kadın"){
                resultForm.innerHTML = `<p>Yaşınız : ${age}</p> <p>Cinsiyer : ${getGender}</p><p> kadınlar askerlikten muaftır.</p>`
                userInfoForm.style.display="none";
                resultForm.style.display = "block";
                setTimeout(startRegister, 10000);
            }
            //yaşı 18 ve 18 den buyuk ıse
            else if(age >= 18){
                resultForm.innerHTML = `<p>Yaşınız : ${age}</p><p>Lütfen size en yakın askerlik şubesine gidiniz</p>`
                userInfoForm.style.display="none";
                resultForm.style.display = "block";
            }
            //yaşı 18 den kucuk ıse
            else if(age < 18){
                resultForm.innerHTML = `<p>Yaşınız : ${age}</p><p>henüz askerlik yaşın gelmedi</p>`
                userInfoForm.style.display="none";
                resultForm.style.display = "block";
                setTimeout(startRegister, 5000);
            }
           
            //herhangı bır gonderım action olmadıgında gonderım ıslemını durdurmak ıcın 
            event.preventDefault()
            event.stopPropagation()

        }
        form.classList.add('was-validated')
    }, false)
  })
})()

