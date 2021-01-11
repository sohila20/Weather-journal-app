/* Global Variables */
var btn=document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apikey = 'APIKEY';

btn.addEventListener('click', performAction);

function performAction(){
    const zipCode=document.getElementById('zip').value;
    const feeling=document.getElementById('feelings').value;
    console.log(zipCode);
    if(zipCode.value === ""){
        alert('please enter a zip code');
    }
    else{
        
        getData(apiURL, zipCode, apikey).then(function(data){
            console.log(data);
            postData('/addData',{temp:data.main.temp, date:newDate, feeling:feeling});
            updateUI();
        })
    }
}


/* Function to GET Web API Data*/
const getData = async (apiURL, zipCode, apikey) => {
     
    //code to fetch data from api ( await the fetch )
    const request = await fetch(apiURL+zipCode+apikey+`&units=metric`);
    try{
        //code to convert json data and return result (await conversion)
       const response = await request.json();
       console.log(response);
       return response;
    } catch(error){
        //code to log error
        console.log("error"+error);
    }
};

/* Function to POST data */
const postData = async(url = "", data = {}) => {
    //code to fetch route url and writ request method, credentials, headers, and body (review lessons) (await the fetch)
    const request = await fetch (url , {
        method : 'Post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        return;
    } catch(error){
        //code to log error
        console.log(error)
    }
};

/* Function to GET Project Data */
const updateUI = async() => {
    //code to fetch route url and writ request method, credentials, headers, and body (review lessons) (await the fetch)
    const request = await fetch ('/all');
    try{
        const allData= await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('feel').innerHTML = allData.feeling;
    } catch(error){
        //code to log error
        console.log(error)
    }
};