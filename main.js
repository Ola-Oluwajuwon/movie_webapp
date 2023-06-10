//This Codebase is Designed and Implemented by Kayode Oluwajuwon Olaoluwa --- Jaydroid
//It a dummy website that uses a third party Movies and TV series API --- TMDB Database
//Actual Codebase Starts after this line


// Variable Declarations Starts Here
const horWidth = window.innerWidth;

//Variable Declarations Ends Here

//DOMContent Loaded Calls Starts Here
window.addEventListener('DOMContentLoaded', () => {
  trendingMedia();
  templateFunctionForNowPlaying();
  templateFunctionForTVSeries();
});

//DOMContent Loaded Calls Ends Here

//Swiperjs Slider for the Upcoming Movies and TV series Starts Here
if(horWidth <= 992) {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    // loop: true,
    effect: 'slide',

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },

    //Autopplay
  autoplay: {
    delay: 5000,
  }
  });
}

if(horWidth >= 992) {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    // loop: true,
    effect: 'slide',

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
  
     // Responsive breakpoints
  breakpoints: {
    992: {
      slidesPerView: 5,
      spaceBetween: 5
    }
    },

  autoplay: {
    delay: 5000,
  }
  });
}


//INJECT API INTO SWIPERJS FROM HERE
const trendingMedia = async () => {
  let trendingMediaVariable = document.getElementById('swiper-wrapper');
  let trendingMediaTemplate = '';

  let trendingMediaDBuri = 'https://api.themoviedb.org/3/trending/all/day?api_key=cd49b8fecd75bb50047909eaff5d429f';

  let trendingMediaDBResults = await fetch(trendingMediaDBuri);

  let parsedTrendingMediaDBResults = await trendingMediaDBResults.json();

  parsedTrendingMediaDBResults.results.forEach(each => {
    trendingMediaTemplate += `
    <!-- Slides -->
    <div class="swiper-slide">
    <div style="height: 300px !important; width: 250px">
      <img src=https://image.tmdb.org/t/p/w500/${each.poster_path} alt=${each.original_title} style="height: inherit; width: inherit; object-fit: fit;">
    </div>
    </div>

`;
});
 console.log(parsedTrendingMediaDBResults.results);

 trendingMediaVariable.innerHTML = trendingMediaTemplate;
}

//Swiperjs Slider for the Upcoming Movies and TV series Ends Here

//   $(document).ready(function(){
//     $(".owl-carousel").owlCarousel();
//   });

//   // const owlCarousel = new owlCarousel();
//   $('.owl-carousel').owlCarousel({
//     loop: true,
//     autoplay: true,
//     autoplayHoverPause: true,
//     margin:10,
//     animateOut: true,
//     animateIn: true,
//     lazyLoad: true,
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:3
//         },
//         1000:{
//             items:5
//         }
//     }
// })



//  The fetch API for the Movies -- Now Playing Section Starts Here
async function templateFunctionForNowPlaying() {
  let template = '';

  let nowPlayingContainer = document.getElementById('now__playing--container');
  let movieDBuri = 'https://api.themoviedb.org/3/discover/movie?api_key=cd49b8fecd75bb50047909eaff5d429f';

  let movieDBResults = await fetch(movieDBuri);

  let parsedMovieDBResults = await movieDBResults.json();

  parsedMovieDBResults.results.slice(0, 8).forEach(each => {
        template += `
   

    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3">
      <div class="card img-thumbnail shadow">
        <a href=${each.overview}>
          <img src=https://image.tmdb.org/t/p/w500/${each.poster_path} class="card-img-top" alt=${each.original_title} style="height: 300px; object-fit: cover;">
        </a>
        <div class="card-body bg-secondary position-relative">

          <div class="rating__loader/--container">
            <div class="rating__loader">${each.vote_average}</div>
          
          </div>
          <small class="d-block text-primary">${each.title}</small>
          <small class="d-block text-primary">${each.release_date}</small>
        </div>

      </div>
    </div>


    `;
  });
  console.log(parsedMovieDBResults.results);
  //console.log(nowPlayingContainer);
  nowPlayingContainer.innerHTML = template;
}

//  The fetch API for the Movies -- Now Playing Section Ends Here

//  The fetch Request for the TV Shows and Series -- 

async function templateFunctionForTVSeries() {
  let template = '';

  let TVSeriesPlayingContainer = document.getElementById('TVSeries__playing--container');
  let movieDBuri = 'https://api.themoviedb.org/3/discover/tv?api_key=cd49b8fecd75bb50047909eaff5d429f&first_air_date_year=2023&with_original_language=en';

  let movieDBResults = await fetch(movieDBuri);

  let parsedMovieDBResults = await movieDBResults.json();

  parsedMovieDBResults.results.slice(0, 8).forEach(each => {
        template += `
   

    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3">
      <div class="card img-thumbnail shadow">
        <a href=${each.overview}>
          <img src=https://image.tmdb.org/t/p/w500/${each.poster_path} class="card-img-top" alt=${each.original_title} style="height: 300px; object-fit: cover;">
        </a>
        <div class="card-body bg-secondary position-relative">

          <div class="rating__loader/--container">
            <div class="rating__loader">${each.vote_average}</div>
          
          </div>
          <small class="d-block text-primary">${each.original_name}</small>
          <small class="d-block text-primary">${each.first_air_date}</small>
        </div>

      </div>
    </div>


    `;
  });
  console.log(parsedMovieDBResults.results);
  //console.log(nowPlayingContainer);
  TVSeriesPlayingContainer.innerHTML = template;
}

