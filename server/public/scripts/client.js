console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addJoke)
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

}

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
            alert('Sorry, could not get quotes. Try again later.');
        })
    console.log('After makin server request...');
}


// append jokes to outputDiv
function render(jokes) {
    $('#outputDiv').empty();
    for (let item of jokes) {
        $('#outputDiv').append(`
       <div class="jokeLog">
         <p>${item.whoseJoke}</p>
         <p>${item.jokeQuestion}</p>
         <p>${item.punchLine}</p>
       <div>
       `)
    }
}