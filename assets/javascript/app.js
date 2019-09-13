// Declare initial array of search terms
var topics = ["Harry Potter", "Hogwarts", "pumpkin juice", "wizard"];

// Function to pull data from API and display gifs on index page

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



// Call renderButtons function to display buttons for initial topics on page load
renderButtons();


