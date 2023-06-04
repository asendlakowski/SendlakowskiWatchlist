
//ALSO NEED TO ADD NOTE ABT WHERE STREAMING INFO COME FROM

//Could do some sort of filtering based on what streaming service already have
//Could do ratings
//Could look into finding the length of each movie
//

const API_KEY = 'api_key=43bf92a51b60a8b4deffb0f71679da5d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/account/19668013/watchlist/movies?sort_by=created_at.asc&'+API_KEY;
const API_URL2 = BASE_URL + '/account/19668013/watchlist/movies?sort_by=created_at.asc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

// "Amazon Prime Video"
// Netflix
// Disney Plus
// HBO Max
// Hulu
// Apple TV


// Showtime - could not find specific name, there are many that include the word showtime

// const genres = [
//     {
//       "id": 28,
//       "name": "Action"
//     },
//     {
//       "id": 12,
//       "name": "Adventure"
//     },
//     {
//       "id": 16,
//       "name": "Animation"
//     },
//     {
//       "id": 35,
//       "name": "Comedy"
//     },
//     {
//       "id": 80,
//       "name": "Crime"
//     },
//     {
//       "id": 99,
//       "name": "Documentary"
//     },
//     {
//       "id": 18,
//       "name": "Drama"
//     },
//     {
//       "id": 10751,
//       "name": "Family"
//     },
//     {
//       "id": 14,
//       "name": "Fantasy"
//     },
//     {
//       "id": 36,
//       "name": "History"
//     },
//     {
//       "id": 27,
//       "name": "Horror"
//     },
//     {
//       "id": 10402,
//       "name": "Music"
//     },
//     {
//       "id": 9648,
//       "name": "Mystery"
//     },
//     {
//       "id": 10749,
//       "name": "Romance"
//     },
//     {
//       "id": 878,
//       "name": "Science Fiction"
//     },
//     {
//       "id": 10770,
//       "name": "TV Movie"
//     },
//     {
//       "id": 53,
//       "name": "Thriller"
//     },
//     {
//       "id": 10752,
//       "name": "War"
//     },
//     {
//       "id": 37,
//       "name": "Western"
//     }
  // ]

const watchlist = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

var selectedGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    // genres.forEach(genre => {
    //     const t = document.createElement('div');
    //     t.classList.add('tag');
    //     t.id=genre.id;
    //     t.innerText = genre.name;
    //     t.addEventListener('click', () => {
    //         if(selectedGenre.length == 0){
    //             selectedGenre.push(genre.id);
    //         }else{
    //             if(selectedGenre.includes(genre.id)){
    //                 selectedGenre.forEach((id, idx) => {
    //                     if(id == genre.id){
    //                         selectedGenre.splice(idx, 1);
    //                     }
    //                 })
    //             }else{
    //                 selectedGenre.push(genre.id);
    //             }
    //         }
    //         console.log(selectedGenre)
    //         displayWatchlist(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
    //         highlightSelection()
    //     })
    //     tagsEl.append(t);
    // })
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id= "<=90";
    t.innerText = "Runtime <= 90 minutes";
    t.addEventListener('click', () => {
      filtertime(90);
      clearBtn()
    })
    tagsEl.append(t);


    const a = document.createElement('div');
    a.classList.add('tag');
    a.id= "<=120";
    a.innerText = "Runtime <= 120 minutes";
    a.addEventListener('click', () => {
      filtertime(120);
      clearBtn()
    })
    tagsEl.append(a);
}

function filtertime(time) {
    const movs = document.getElementsByName("movie");
    for (let i = 0; i < movs.length; i++) {
      if (parseInt(movs[i].id) > time) {
        movs[i].style.display = "none"
      }
    }
    

}


function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }

}

function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{
            
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();            
            displayWatchlist(API_URL);
        })
        tagsEl.append(clear);
    }
    
}

displayWatchlist(API_URL);
function displayWatchlist(url) {
    lastUrl = url;
    console.log("url in displayWatchlist func: " + url);
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2JmOTJhNTFiNjBhOGI0ZGVmZmIwZjcxNjc5ZGE1ZCIsInN1YiI6IjY0NzA0M2RjNTQzN2Y1MDBjMzI4MTFmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.303ceOZyl59JzBaox2Gs64WF29znfm-LleFgjEFk_f0'
        }
    };
    
    fetch(url, options).then(res => res.json()).then(data => {
        if(data.results.length !== 0){
            showMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;

            if(currentPage <= 1){
              prev.classList.add('disabled');
              next.classList.remove('disabled')
            }else if(currentPage>= totalPages){
              prev.classList.remove('disabled');
              next.classList.add('disabled')
            }else{
              prev.classList.remove('disabled');
              next.classList.remove('disabled')
            }

            tagsEl.scrollIntoView({behavior : 'smooth'})
        }
    })
}

function runtime(id) {
  const change = "time" + id;
  
  fetch(BASE_URL + '/movie/'+id+'?language=en-US&'+API_KEY).then(res => res.json()).then(data => {
    console.log(data.runtime)
    document.querySelector("#" + change).value = data.runtime;
    document.querySelector("#" + change).innerText = "Runtime: " + data.runtime + " minutes";
    // return (data.runtime).toString();
    document.getElementById(id).id = data.runtime;
    if (document.getElementById(id).id == data.runtime) {
      console.log("DID IT?")
    } else {
      console.log("NOPE")
    }
    
    
  })
}


function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie'); //class="movie" 
        movieEl.innerHTML = `
            <div id="${id}" name="movie" >
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
             <button class="add-watchlist" id="${id}" onclick="removeWatchlist(${id})" >-</button>

            <div class="movie-info">
                <h3>${title}</h3>
                
            </div>

            <div class="overview">

                <h3 id="over${id}">Overview</h3>
                <a id="overview${id}">${overview}</a>
                <a id="streaming${id}" style="display: none"></a>
                <br/> 
                <h3 id="time${id}" value="" class="runtime">Runtime: minutes<h3>
                <button class="know-more" id="${id}" onclick="openNav(${id})">Know More</button>
                <button class="streaming" id="stream${id}" onclick="streaming(${id})">Streaming</button>
            </div>
            </div>
        
        `
        // console.log("HELLO" + id);
        // <span class="${getColor(vote_average)}">${vote_average}</span>

        main.appendChild(movieEl);
        runtime(id);

        // document.getElementById(id).addEventListener('click', () => {
        //   console.log(id)
        //   openNav(movie)
        // })
    })
}

function streaming(id) {
    fetch(BASE_URL + "/movie/" + id + "/watch/providers?" + API_KEY + "&watch_region=US").then(res => res.json()).then(data => {
        // console.log(data.results)
        // data = JSON.parse(data);
        var item;
        var itemArray;
        var service;
        const serviceSet = new Set();

        for (item in data.results) {
            itemArray = data.results[item];
            console.log(itemArray)
            if (itemArray.hasOwnProperty("flatrate")) {
              serviceSet.add(itemArray.flatrate[0].provider_name);
            }
        }
        // data.results.forEach(myfunc) 
        // const obj = JSON.parse(data);
        document.querySelector("#stream" + id).innerText = "Overview";
        document.getElementById("stream" + id).onclick = function() { overview(id); }
        let text = "";
        serviceSet.forEach (function(value) {
          text += value + "\n";
        })
        document.getElementById("streaming"+ id).innerText = text
        document.getElementById("streaming"+ id).style.display = "block"
        document.getElementById("overview"+ id).style.display = "none"
        document.getElementById("over"+ id).innerText = "Streaming Services"
        console.log(text);
    })
}

function overview (id) {
    document.querySelector("#stream" + id).innerText = "Streaming";
    document.getElementById("stream" + id).onclick = function() { streaming(id); }
    document.getElementById("streaming"+ id).style.display = "none"
    document.getElementById("overview"+ id).style.display = "block"
    document.getElementById("over"+ id).innerText = "Overview"
}

function removeWatchlist(id) {
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2JmOTJhNTFiNjBhOGI0ZGVmZmIwZjcxNjc5ZGE1ZCIsInN1YiI6IjY0NzA0M2RjNTQzN2Y1MDBjMzI4MTFmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.303ceOZyl59JzBaox2Gs64WF29znfm-LleFgjEFk_f0'
        },
        body: JSON.stringify({media_type: 'movie', media_id: id, watchlist: false})
      };
      
      fetch('https://api.themoviedb.org/3/account/19668013/watchlist', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    displayWatchlist();
}

const overlayContent = document.getElementById('overlay-content');
/* Open when someone clicks on the span element */
function openNav(id) {
    // console.log(id + "ID" + title + "TITLE")
//   let id = movie.id;
  fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY).then(res => res.json()).then(videoData => {
    console.log(videoData);
    if(videoData){
      document.getElementById("myNav").style.width = "100%";
      if(videoData.results.length > 0){
        var embed = [];
        var dots = [];
        videoData.results.forEach((video, idx) => {
          let {name, key, site} = video

          if(site == 'YouTube'){
              
            embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          
          `)

            dots.push(`
              <span class="dot">${idx + 1}</span>
            `)
          }
        })
        
        var content = `
        <br/>
        
        ${embed.join('')}
        <br/>

        <div class="dots">${dots.join('')}</div>
        
        `
        overlayContent.innerHTML = content;
        activeSlide=0;
        showVideos();
      }else{
        overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
      }
    }
  })
}

function addWatchlist(id) {
    console.log(id);
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

var activeSlide = 0;
var totalVideos = 0;

function showVideos(){
  let embedClasses = document.querySelectorAll('.embed');
  let dots = document.querySelectorAll('.dot');

  totalVideos = embedClasses.length; 
  embedClasses.forEach((embedTag, idx) => {
    if(activeSlide == idx){
      embedTag.classList.add('show')
      embedTag.classList.remove('hide')

    }else{
      embedTag.classList.add('hide');
      embedTag.classList.remove('show')
    }
  })

  dots.forEach((dot, indx) => {
    if(activeSlide == indx){
      dot.classList.add('active');
    }else{
      dot.classList.remove('active')
    }
  })
}

const leftArrow = document.getElementById('left-arrow')
const rightArrow = document.getElementById('right-arrow')

leftArrow.addEventListener('click', () => {
  if(activeSlide > 0){
    activeSlide--;
  }else{
    activeSlide = totalVideos -1;
  }

  showVideos()
})

rightArrow.addEventListener('click', () => {
  if(activeSlide < (totalVideos -1)){
    activeSlide++;
  }else{
    activeSlide = 0;
  }
  showVideos()
})


function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

// console.log(form.value);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre=[];
    setGenre();
    if(searchTerm) {
        console.log("SEARCHING")
        displayWatchlist(searchURL+'&query='+searchTerm)
    }else{
        displayWatchlist(API_URL);
    }

})

prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = lastUrl + '&page='+page
    displayWatchlist(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    displayWatchlist(url);
  }
}
