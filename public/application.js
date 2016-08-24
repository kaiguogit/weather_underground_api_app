$(function(){

  function searchByTag(tag, callback){
    getApiKey(function(api_key){
      $.ajax({
        url: "https://api.flickr.com/services/rest/",
        method: "get",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        //http://stackoverflow.com/questions/5694230/can-somehow-change-the-callback-function-name
        data: {
          method: "flickr.photos.search",
          tags: tag,
          format: "json",
          api_key: api_key.api_key,
        },
        success: function(photos){
          callback(photos);
        }
      });
    });
  }

  function getApiKey(callback){
    $.ajax({
      url: "api_key",
      method: "get",
      success: function(api_key){
        callback(api_key);
      }
    });
  }
  
  function getPhoto(id, callback){
    getApiKey(function(api_key){
      $.ajax({
        url: "https://api.flickr.com/services/rest/",
        method: "get",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        data: {
          method: "flickr.photos.getInfo",
          photo_id: id,
          format: "json",
          api_key: api_key.api_key,
          secret: api_key.secret
        },
        success: function(photo){
          callback(photo);
        }
      });
    });
  }

  function showPhoto(photo){
    var imgSrc = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/"+ photo.id +"_"+ photo.secret +".jpg"
    var img = $("<img id='slide_show'>");
    img.attr('src', imgSrc);
    var $existingImgs= $("#slide_show");
    if( $existingImgs.length >0 ){
      $existingImgs.fadeOut(1000);
      $existingImgs.remove();
    }

    $('body').append(img);
    $("#slide_show").hide();
    $("#slide_show").fadeIn(1000);
  }
  

  searchByTag("lighthouse", function(photos){
    var photosSaved = photos.photos.photo;
    // debugger;
    function myLoop(i) {          
       setTimeout(function () {   
          // debugger;
          console.log(i)
          showPhoto(photosSaved[i]);
          console.log(i);          //  your code here                
          if (i > 0) {
            i--;
            myLoop(i);
            
          }
       }, 3000);
    }
    myLoop(photosSaved.length-1);
  });
});