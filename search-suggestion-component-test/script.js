var search = document.getElementById('searchbox');
var suggestion = document.getElementById('suggest1');
var suggestion2 = document.getElementById('suggest2');

var searchResults = async searchText => {
      var res = await fetch('http://www.omdbapi.com/?apikey=7468f8b0&s='+searchText);
      var states = await res.json();
      var matches;


        for (let el of document.getElementsByClassName('hidden')) {
            el.classList.remove('hidden');
            el.classList.add('shown');
  }

      if(states.Response !== "False") {
                matches = states.Search.filter(state => {
                var regex = new RegExp(`^${searchText}`, `gi`);
                return state.Title.match(regex);
              });
      } 


   
      if(searchText.length ===0 ) {
        matches = [];

            for (let el of document.getElementsByClassName('shown')) {
            el.classList.add('hidden');
            el.classList.remove('shown');
       }
      }


      outPutHtml(matches);
      outPutHtml2(matches);
};





var outPutHtml = matches => {
      var html = '';

      if(matches !== undefined) {
            html += matches.map(
                  function (match) { 
                  if(match.Type !== "series" && match.Type !== "game") {  
                  
                   return `<li><a href="#" class="block hover:bg-gray-200 rounded px-2 py-1"><strong>${match.Title}</strong></a></li>`;
                        }
                  } 
            ).join(' ');
     }
 
     console.log(matches);
     suggestion.innerHTML = html;
};



var outPutHtml2 = matches => {
      var html = '';

      if(matches !== undefined) {
            html += matches.map(
                  function (match) {  
                  if(match.Type !== "movie" && match.Type !== "game") {
                   return `<li><a href="#" class="block hover:bg-gray-200 rounded px-2 py-1"><strong>${match.Title}</strong></a></li>`;
                  }
                  } 
            ).join(' ');
     }
 
     console.log(matches);
     suggestion2.innerHTML = html;
};





search.addEventListener('input', ()=> searchResults(search.value));