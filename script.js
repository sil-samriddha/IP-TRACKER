const btn = document.querySelector('#btn');
const ipdata = document.querySelector('.ip-data');
const map = document.querySelector('.map');


window.onload = function(e) {
    searchIP('');
}

btn.addEventListener('click', function(e){
    let search = document.querySelector('#search').value;
    searchIP(search.trim()+'/');
})




function searchIP (search){
    map.innerHTML = 
    `<img src="./src/load.svg">`
    fetch(` https://ipapi.co/${search}json/`)
.then(Response => Response.json())
.then(data=> {

    if (data.error === true) {
        ipdata.innerHTML = 
        `
        <div>
        <p>${data.reason}</p>
        </div>
        `
        map.innerHTML =
        `
        <img src="./src/error.svg" alt="">
        `

    }else {
        ipdata.innerHTML = 
    `
    <div>
                <span>IP ADDRESS</span>
                <p ${data.ip.length>15 ? `style="font-size: 75%"`: ``} >${data.ip}</p>

            </div>
            <div>
                <span>LOCATION</span>
                <p>${data.city}, ${data.region}</p>
                <p>${data.country_name}</p>

            </div>
            <div>
                <span>TIMEZONE</span>
                <p>UTC ${data.utc_offset}</p>
                <p>${data.timezone}</p>

            </div>
            <div>
                <span>LAT & LONG</span>
                <p>${data.latitude}</p>
                <p>${data.longitude}</p>
            </div>
    
    `
    map.innerHTML =
    `
    <iframe 
        width="100%" 
        height="${window.innerHeight-document.querySelector('nav').clientHeight}"
        frameborder="0" 
        scrolling="no" 
        marginheight="0" 
        marginwidth="0" 
        src="https://maps.google.com/maps?q=${data.latitude},${data.longitude}&hl=en&z=14&amp;output=embed"
       >
    </iframe>
    
    `

    }

})
.catch(err => console.log("Error"))

}