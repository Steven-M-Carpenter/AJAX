/******************************************************************************************************************/
/*  Utility looks up 12 random images for the search terms provided.  You can enter a new term in the search box
/*  to be added to the list.  
/* 
/*  Features beyond the required elements:
/*  ======================================
/*  The search feature also responds to the ENTER key, not just the button press
/*  The search will prohibit the reentry of terms already in the list. 
/*
/******************************************************************************************************************/

var topics = ["Hawaii", "Barbados", "Cuba", "Grenada", "Florida", "Bahamas", "Dominican Republic", "Tahiti", "Bermuda", "Turks and Caicos", "Jamaica", "Key West", "Trinidad", "Belize", "Grand Caymen", "Antigua", "Aruba", "Curacao"]
// var queryURL = "https://api.giphy.com/v1/gifs/"
var apiKey = "Dtl2cHRSH890f4ghAHbhyynlMmu1D8oH"


function createButtons() {
    $("#ButtonSection").empty();
    for (var i = 0; i < topics.length; i++) {
        var buttonString = `<button id=btn"${topics[i]}" class="destination btn btn-primary mt-4 ml-2 mr-2" data-value="${topics[i]}">${topics[i]}</button>`
        $("#ButtonSection").append(buttonString);
    }
}

function compareValues(compareString) {
    for (var i = 0; i < topics.length; i++) {
        var sourceChk = topics[i].toLowerCase();
        if (sourceChk === compareString.toLowerCase()) {
            var match = true;
        }
        else {
            var match = false;
        }
    }
    return match;
}


    $("#ButtonSection").empty();
    for (var i = 0; i < topics.length; i++) {
        var buttonString = `<button id=btn"${topics[i]}" class="destination btn btn-primary mt-4 ml-2 mr-2" data-value="${topics[i]}">${topics[i]}</button>`
        $("#ButtonSection").append(buttonString);
    }


createButtons();

$(document).ready(function () {

    $("#SearchButton").on("click", function (event) {
        var searchValue = $("#SearchBox").val().trim();
        if (searchValue) {
            var compareResults = compareValues(searchValue);
            if (compareResults === false) {
                $("#ButtonSection").empty();
                topics.push(searchValue);
                createButtons();
                $("#SearchBox").val("")
            }
        }
    });

    $(document).keypress(function(keyval) {
        if(keyval.which === 13) {
            var searchValue = $("#SearchBox").val().trim();
            if (searchValue) {
            var compareResults = compareValues(searchValue);
                if (compareResults === false) {
                    $("#ButtonSection").empty();
                    topics.push(searchValue);
                    createButtons();
                    $("#SearchBox").val("")
                }        
            }
        }
    });

    $(document).on( "click", ".destination", function(event) {
        $("#ImageSection").empty();
        var computeOffset = Math.floor(Math.random() * 4);
        var attentionTo = $(this).attr("data-value");
        var queryString = "https://api.giphy.com/v1/gifs/search?api_key=Dtl2cHRSH890f4ghAHbhyynlMmu1D8oH&q=" + attentionTo + "&limit=12&offset=" + computeOffset + "&rating=PG&lang=en";
        $.ajax({
            url: queryString,
            method: "GET",
        }).then(function (response) {
            console.log("API String =  " + queryString);
            console.log(response)
            for (i = 0; i < response.data.length; i++) {
                var imageStillURL = response.data[i].images.downsized_still.url;
                var imageAnimateURL = response.data[i].images.downsized.url;
                var constructImage = `<img src="${imageStillURL}" id="Image${i}" class="apiImage mx-3 my-3" height="150" width="260" data-motion="still" data-still=${imageStillURL} data-animate=${imageAnimateURL}>`
                $("#ImageSection").append(constructImage);
            }


            $(".apiImage").on("click", function (event) {
                var currentImage = this.id;
                var currentDisplay = $(this).attr("data-motion");
                if (currentDisplay === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-motion", "animate");
                }
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-motion", "still");
                }
            });
        });
    });
});






