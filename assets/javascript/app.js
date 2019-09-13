// Declare initial array of search terms
var topics = ["Harry Potter", "Hogwarts", "Dumbledore", "Quidditch"];

// Function to pull data from API and display gifs on index page
function displayGifs(){
    // Grab data-name attr from dynamically created buttons and insert into url for AJAX call
    var searchTerm = $(this).attr("data-name");    
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=69eSDlUWow5cNxDj4CgJGcpXBkgyjCPj&limit=10&q=" + searchTerm;

    // AJAX call to Giphy API. Need to pull static & animated urls, rating
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
        // Loop through 10 responses to append each gif to index page
        for (var i = 0; i <= 10; i++){
            // Variables to store divs, img tags, and p tags created for each gif
            var gifDiv = $("<div>");
            var imgTag = $("<img class='gif'>");
            var p = $("<p>");

            // Variables for the gif data pulled from the API
            var rating = response.data[i].rating;
            var stillSrc = response.data[i].images.fixed_height_still.url;
            var animateSrc = response.data[i].images.fixed_height.url;

            // Take gif urls from API and set them as attributes for img tags
            imgTag.attr("src", stillSrc);
            imgTag.attr("data-state", "still");
            imgTag.attr("data-still", stillSrc);
            imgTag.attr("data-animate", animateSrc);

            // Add rating data to p tag
            p.text("Rating: " + rating);

            // Attach newly created img tag and p tag to a div
            gifDiv.append(imgTag);
            gifDiv.append(p);

            // Attach gif/rating div to overall gif div on index page
            $("#gif-div").prepend(gifDiv);
        }

    });
}

// Function to create buttons from user search input
function renderButtons(){
    // Empty buttons div at start of function so we do not make duplicate buttons
    $("#buttons-div").empty();

    // Loop through topics array and create button for each index
    for (var i = 0; i < topics.length; i++){
        var btn = $("<button>");
        btn.addClass("gif-button");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);
        $("#buttons-div").append(btn);
    }
}

// Click listener for search button. This function will take value from input field and add it to topics array.
$("#add-button").on("click", function(event){
    event.preventDefault();
    var newTopic = $("#search-input").val().trim();
    topics.push(newTopic);
    renderButtons();
});

// Click listener for dynamically created buttons. This will run the function to display gifs.
$(document).on("click", ".gif-button", displayGifs);

// Click listener to switch img src attr which will animate or pause gif
$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state");
    
    if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

// Call renderButtons function to display buttons for initial topics on page load
renderButtons();


