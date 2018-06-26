//Wait for page to safely load
$(document).ready(function() {

    //Initialize array of topics
    var topics = [
        "Sushi","Avocados","Coconuts",
        "Batman","Han Solo","Yoda",
        "GTI","VW","Ninjas",
        "Rick and Morty","Pickle Rick","Black Hole",
    ];

    //Function to dynamically add buttons 
    function makeButtons() {

        //Remove old buttons to avoid duplicate set
        $("#gifButtons").empty();

        //Loop array of topics
        for (i = 0; i < topics.length; i++) {

            //Make buttons and append
            var b = $("<button>");
            b.addClass("topics");
            b.attr("data-topic", topics[i]);
            b.text(topics[i]);
            $("#gifButtons").append(b);
        }
    }

    //Listen for submit button clicks
    $("#addGif").on("click", function() {

        //Grab new topic text
        var newTopic = $("#topic-input").val().trim();

        //Add new topic to the array
        topics.push(newTopic);

        //Call makeButtons function to make buttons
        makeButtons();

        //Stop code execution [if not buttons goto default]
        return false;
    });

    //Listen for topic button clicks
    $(document).on("click", ".topics", function() {

        //Collect clicked button data
        var clicked = $(this).data("topic");

        //Create query URL
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + clicked + "&api_key=qcPjtIk81Q4pg5dxw3fy3Z6hxO41PlGD&limit=10";

        //AJAX
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {

                //Display response to console and store
                console.log(response);
                var results = response.data;

                //Loop through results and create gifs
                for (i = 0; i < results.length; i++) {

                    //Create div to store gifs
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gif-box");
                    
                    //Store rating and rating div
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    //Create img tags for gifs to reside
                    var gifImage = $("<img>");

                    //Set gif attributes
                    gifImage.addClass("gif");
                    gifImage.attr("src" , results[i].images.fixed_height_still.url);

                    //Collect and set data states
                    gifImage.attr("data-still" , results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate" , results[i].images.fixed_height.url);
                    gifImage.attr("data-state" , "still");

                    //Append image and rating to gif divs
                    gifDiv.append(p);
                    gifDiv.append(gifImage);

                    //Display gifs 
                    $("#gifImages").prepend(gifDiv);
                }
            });
    });

    //Listen for gif clicks
    $(document).on("click", ".gif", function() {

        //Display click to console and store
        console.log(this);
        var state = $(this).attr("data-state");

        //Swap states
        if (state == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });

    //Call makeButtons function
    makeButtons();
});

