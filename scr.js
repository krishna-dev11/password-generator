const displaypassword = document.querySelector("[displaypassword]")
const copybtn = document.querySelector("[copybtn]")
const copymsg = document.querySelector("[copymsg]")
const passwordlenghtset = document.querySelector("[passwordlenghtset]")
const inputslider = document.querySelector("[inputslider]")
const uppercase = document.querySelector("[uppercase]")
const lowercase = document.querySelector("[lowercase]")
const numbersss = document.querySelector("[numbersss]")
const symbolsss = document.querySelector("[symbolsss]")
const allcheckboxes = document.querySelectorAll(".allcheckboxes")
const indicatorbtn = document.querySelector("[indicatorbtn]")
const generatebtn = document.querySelector("[generatebtn]")


let password = "";
let passwordlength = 10;
let checkcount = 0;
handleslider();

function handleslider()
{
   inputslider.value = passwordlength;
   passwordlenghtset.textContent = passwordlength;
}

inputslider.addEventListener("input", (event)=>
{
    passwordlength = event.target.value;
    handleslider();
})

function handleallcheckboxes()
{   checkcount = 0;
    allcheckboxes.forEach((checkbox) => {
        if(checkbox.Checked)
            checkcount++;
    });
}

allcheckboxes.forEach((checkbox)=>{
    checkbox.addEventListener("change", handleallcheckboxes)
})

function generaterndinteger(max,min)
{
     return Math.floor(Math.random() * (max-min)) + min;
}

function generateuppercase()
{
   return String.fromCharCode(generaterndinteger(65,90))
}

function generaterndlowercase()
{
    return String.fromCharCode(generaterndinteger(97,122))
}

function generaterndnumber()
{
    return generaterndinteger(0,9)
}

let rndsymbols = "~!@#$%^&*()_-+={[}]|\:;'<,>.?/"
function generaterndsymbol()
{
   const a = generaterndinteger(0,rndsymbols.length) ;
   return rndsymbols.charAt(a);
}


function shufflepassword(array)
{
    for(let i = array.length-1; i>0; i--)
    {
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el)=>(str+=el));
    return str;
}

generatebtn.addEventListener("click", ()=>{
    
    if(checkcount == 0)
        return;

    password = ""
    
    if(passwordlength<checkcount)
    {
        passwordlength = checkcount;
        handleslider();
    }

    let arrayforpassword = [];

    // essential pushes
    if(uppercase.Checked)
        arrayforpassword.push(generateuppercase)

    if(lowercase.Checked)
        arrayforpassword.push(generaterndlowercase)

    if(numbersss.Checked)
        arrayforpassword.push(generaterndnumber)

    if(symbolsss.Checked)
        arrayforpassword.push(generaterndsymbol)

    for(let i=0; i<arrayforpassword.length; i++)
    {
        password += arrayforpassword[i]();
    }

    // remaining pushes 
    for(let i=0; i<passwordlength-arrayforpassword.length; i++)
    {   let rndindexforarray = generaterndinteger(0,arrayforpassword.length);
        password += arrayforpassword[rndindexforarray]();
    }

    password = shufflepassword(Array.from(password));
    
    displaypassword.value = password;

    

    checkstrength();
});
