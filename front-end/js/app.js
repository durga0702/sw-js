//js file
console.log('JS started')
const APP = {
    SW:null,
    init(){
        if('serviceWorker' in navigator){
            console.log(navigator.serviceWorker?.register('/sw.js'))
            navigator.serviceWorker.register('/sw.js',{
                scope:'/'
            }).then(reg=>{
                // APP.SW = registration.installing || registration.waiting || registration.active ;
                const sw = reg.installing || reg.waiting || reg.active
                sw.postMessage({ milliseconds: Date.now() })
                console.log('Service worker is registered');
            }).catch(err=> {
                console.log(err);
            });
          }else{
            console.log('Service worker is not supported');
        }
    },
};
document.addEventListener('DOMContentLoaded', APP.init);

fetch('https://jsonplaceholder.typicode.com/todos')
.then(response => response.json())
.then(json => {
  console.log(json)
  const ele = document.querySelector('ul');
 json.forEach(post => {
      ele.insertAdjacentHTML('beforeend', `<li>${post.title}</li>`)
  });
})