'use_strict';

const url = 'https://developer.nps.gov/api/v1/parks';
const apiKey = '6R6oKXSSKtIubDJoyla4IQtb3PTKyDHdlOL9rXSF';

function renderParkResults(results) {
  let htmlTemplate = [];
  console.log(results);
  $('.search-results').empty();
  results.data.forEach(park => htmlTemplate.push(`
    <li><a href="${park.url}"target="_blank">${park.fullName}</a></li>
    <p>${park.description}</p>
    <hr />
    `)
  );
  console.log(htmlTemplate);
  $('.search-results').html(htmlTemplate.join(''));
}

function getParkResults(state, lim) {
  const params = {
    api_key: apiKey,
    stateCode: state,
    limit: lim
  };
  let queryString = $.param(params);
  fetch(`${url}?${queryString}`)
    .then(response => response.json())
    .then(responseJson => renderParkResults(responseJson))
    .catch(error => alert('something went wrong. Try again later.'));
}

function handleParksSearch() {
  $('#js-park-search-form').submit(function(event) {
    event.preventDefault();
    let state = $('#js-search-park-state').val();
    $('#js-search-park-state').val('');
    let lim = $('#js-search-park-max').val();
    if(!lim) {
      lim = 10;
    }
    $('#js-search-park-max').val('');
    getParkResults(state,lim);
  });
}

$(handleParksSearch);