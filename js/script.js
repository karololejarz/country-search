var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');

$('#search').click(searchCountries);

function searchCountries() {
  var countryName = $('#country-name').val();
  if(!countryName.length) countryName = 'Poland';
  $.ajax({
    url: url + countryName,
    method: 'GET',
    success: showCountriesList
  });
}

function showCountriesList(resp) {
  countriesList.empty();
  resp.forEach(function(item) {
    var languages =
      JSON.stringify(item.languages, ['name'])
        .replace(/name/g, "")
        .replace(/"":/g, "")
        .replace('[{"', "")
        .replace('"}]', "")
        .replace(/"},{"/g, ", ");
    var currencies =
      JSON.stringify(item.currencies, ['name'])
        .replace(/name/g, "")
        .replace(/"":/g, "")
        .replace('[{"', "")
        .replace('"}]', "")
        .replace(/"},{"/g, ", ");
    
    $(countriesList).append(
      "<li>" + 
      "<h1>" + item.name + "</h1>" +
      "<img src=" + item.flag + ">" +
      "<p>" + "Capital: " + item.capital + "<br>" +
      "Area (sq. km): " + item.area + "<br>" +
      "Population: " + item.population + "<br>" +
      "Languages: " + languages + "<br>" +
      "Currencies: " + currencies + "</p>" +
      "</li>");
  });
}
