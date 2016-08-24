$(function(){
  $(".search-bar").on("keyup",function(){
    event.preventDefault();
    var $form = $(this);
    var keyword = $form.find("input[type='text']").val();
    searchCity(keyword, listCities);
  });

  function searchCity(keyword, callback){
    $.ajax({
      url: "http://autocomplete.wunderground.com/aq",
      method: "get",
      data: {query: keyword},
      dataType: "jsonp",
      jsonp: "cb",
      success: function(cities){
        callback(cities);
      }
    });
  }
  var cities = $("#template_cities").html();
  var city = $("#template_city").html();
  var template_cities = Handlebars.compile(cities);
  var template_city = Handlebars.compile(city);

  function listCities(cities){
    $(".cities").remove();
    var $cities = $(template_cities());
    cities.RESULTS.forEach(function(city){
      var $city = $(template_city({city_name: city.name}));
      $cities.append($city);
    });
    $("body").append($cities);
  }

});