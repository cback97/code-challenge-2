console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', function(event) {
        event.preventDefault();
        addJoke();
    })
 getJokes();
}



function addJoke() {
    let newJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val()
    }
    // test if newJoke is operable
    console.log(newJoke);

    $.ajax({
            method: 'POST',
            url: '/jokes',
            data: newJoke // this is goes in the request body
        })

        .then(function (response) {
            console.log('Response from server', response);
            render(response);
            getJokes();
        })
        .catch(function (error) {
            console.log('Error from server', error);
            alert('Sorry, could not get quotes. Try again later.');
        })

    // clear inputs
    $('#whoseJokeIn').val('')
    $('#questionIn').val('')
    $('#punchlineIn').val('')

} //end addJoke

function getJokes() {
    // ajax method returns back a Promise
    $.ajax({
            method: 'GET',
            url: '/jokes',
        })

        .then(function (response) {
            console.log('Response from server', response);
            render(response);
        })
        .catch(function (error) {
            console.log('Error from server', error);
            alert('Sorry, could not get jokes. Try again later.');
        })
    // get request working properly
    console.log('After making server request...');
} // end getJokes


// append jokes to outputDiv
function render(jokes) {
    //empty div befor rendering all/new jokes
    $('#outputDiv').empty();
    // loop through jokes array and append the objects by property
    for (let item of jokes) {
        $('#outputDiv').append(`
       <div class="jokeLog">
         <p>${item.whoseJoke}</p>
         <p>${item.jokeQuestion}</p>
         <p>${item.punchLine}</p>
       <div>
       `)
    }
} // end render(jokes)