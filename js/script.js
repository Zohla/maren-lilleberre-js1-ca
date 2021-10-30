let baseUrl =`https://api.nasa.gov/mars-photos/api/v1/`
// let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=100&api_key=7C3efywnhiZulYlDVdUYW9M5u71tIS22nmcak61h`
const container = document.querySelector('.container');
const loader = document.querySelector('.loader');
const sol = document.getElementById('sol');
const earthDayContainer = document.querySelector('.earth-day')
container.innerHTML = `<p class= 'choose'>Choose a rover to see pictures they have taken on their x'th day on mars</p>`

async function getSpace(){
    container.textContent ='';
    earthDayContainer.textContent ='';
    try{
        const response = await fetch(baseUrl);
        let jsonResults = await response.json();
        let photos= jsonResults.photos;
        console.log(photos);
        earthDayContainer.innerHTML += `<p class="earth-day">Taken: ${photos[0].earth_date} by:  <a href="rover.html?/${photos[0].rover.name.toLowerCase()}" class="rover-link"> ${photos[0].rover.name}</a></p>`
    
        for (let i = 0; i < photos.length; i++) {
            const element = photos[i];            
    //Adds limit to photos shown
            if (i >10){
                break;
            }
            container.innerHTML+= `<a href="details.html?id=${element.id}&rover=${resultRover}" class="image" style="background-image: url('${element.img_src}')"></a>`
        }
    }catch(error) {
        if (error.message.startsWith('Cannot read properties of undefined')) {
            container.innerHTML = `Sorry, it looks like there's no pictures from this rover at that sol`
        } else{
            container.innerHTML = `Error: ${error.message}`
        }

        console.log(error)
/*          if (error == 'undefined') {
             container.innerHTML ='Sorry, no photos from rover this sol'
         } else{
             container.innerHTML = `Error: ${error.message}`
         }
 */    }
    
}

//funskjon for å hente rover og redirekte til annen side
//url med rovernavn->bytte navn og henge på info i querystringen(landingsdato, bilder tatt osv)
//https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity?api_key=7C3efywnhiZulYlDVdUYW9M5u71tIS22nmcak61h
let resultRover;
 rovers.addEventListener('change', (event) => {
     
    resultRover = event.target.value;   
    baseUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${resultRover}/photos?sol=100&api_key=7C3efywnhiZulYlDVdUYW9M5u71tIS22nmcak61h`
    getSpace();
})

//todo Make a function to choose "sol-date"
const solForm = document.querySelector('.sol-form');


solForm.addEventListener('change', (e) => {
    let solDay = e.target.value;
    // const params = new URLSearchParams(baseUrl);
    // const solQuery = params.get('sol')
    
    let parsedSolInt = parseInt(solDay);
    let newUrl = new URL(`${baseUrl}`)
    newUrl.searchParams.set('sol', `${parsedSolInt}`)
    baseUrl = newUrl;
    console.log(parsedSolInt)
    console.log(newUrl)
     getSpace();   
})

solForm.addEventListener('submit', (e)=>{
    e.preventDefault();
}) 




 //! Make a function to add html

/* function createHTML(jsonResults){


} */


