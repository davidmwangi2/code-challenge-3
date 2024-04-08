//Your code here

let myGetRequest = new Request('http://localhost:3000/films');
// Get all IDs in the HTML for DOM manipulation
let title = document.getElementById('title');
let runtime = document.getElementById('runtime');
let filmInfo = document.getElementById('film-info');
let showtime = document.getElementById('showtime');
let ticketNum = document.getElementById('ticket-num');
let buyTicket = document.getElementById('buy-ticket');
let poster = document.getElementById('poster');
let films = document.getElementById('films');
let subtitle = document.getElementById('subtitle');
let showing = document.getElementById('showing');
let body = document.getElementsByTagName('body')[0]; // Get the first body element


// On full load, the first movie should be displayed as default
window.onload = () => {
    // fetch details from the server
    fetch(myGetRequest)
        //JSONIFY the response
        .then((response) => response.json())
        //.then to handle async and promise from the server
        .then((data) => {
            // first movie should start from the first data in the array
            const firstMovie = data[0];
            // get the number of remaining tickets to sell from subtracting capacity - tickets_sold
            let remainingTickets = firstMovie.capacity - firstMovie.tickets_sold;
            // manipulate the HTML from the JavaScript side by targeting the IDs

            title.innerHTML = `${firstMovie.title}`;
            runtime.innerHTML = `${firstMovie.runtime}`;
            filmInfo.innerHTML = `${firstMovie.description}`;
            showtime.innerHTML = `${firstMovie.showtime}`;
            ticketNum.innerHTML = `${remainingTickets}`;
            buyTicket.innerHTML = 'Buy ticket';
            poster.src = `${firstMovie.poster}`;
            // eventlistener for clicking the buy ticket button
            buyTicket.addEventListener('click', () => {
                // check if the remaining tickets are more than 0, then start subtracting
                if (remainingTickets > 0) {
                    // -- to deduct
                    remainingTickets--;
                    // display dynamically on the html,
                    ticketNum.innerHTML = `${remainingTickets}`;
                } else if (remainingTickets === 0) {
                    // once tickets remaining are 0, show a sold out on the button and disable buying more tickets
                    ticketNum.innerHTML = `${remainingTickets}`;
                    buyTicket.innerHTML = `Sold out!`;
                }
            });
            // remove the first movie so as to proceed adding the rest
            films.innerHTML = '';
            // forEach to add the movies one by  one, just like a for loop
            data.forEach((movie, index) => {
                // create a list to display all the movies
                let li = document.createElement('li');
                // dynamically show the movie titles
                li.innerHTML = `<b>${movie.title}</b>`;
                // append the new list to the films ID on the HTML
                films.appendChild(li);
                // add a button to delete each movie
                let deleteButton = document.createElement('button');
                deleteButton.innerHTML = 'Delete';
                // add class using JS
                deleteButton.classList.add('ui', 'button');
                deleteButton.style.marginLeft = '3px';
                li.appendChild(deleteButton);
                li.addEventListener('mouseover', () => {
                    li.style.color = 'blue';
                });
                li.addEventListener('mouseout', () => {
                    li.style.color = 'purple';
                });
                // delete button for each movie
                //only delete when user confirms/selects okay
                deleteButton.addEventListener('click', () => {
                    if (window.confirm('Are you sure you want to delete this movie?')) {
                        data.splice(index, 1);
                        films.removeChild(li);
                    }
                });
                li.addEventListener('click', () => {
                    remainingTickets = movie.capacity - movie.tickets_sold;
                    title.innerHTML = `${movie.title}`;
                    runtime.innerHTML = `${movie.runtime}`;
                    filmInfo.innerHTML = `${movie.description}`;
                    showtime.innerHTML = `${movie.showtime}`;
                    ticketNum.innerHTML = `${remainingTickets}`;
                    buyTicket.innerHTML = 'Buy ticket';
                    poster.src = `${movie.poster}`;
                });
            });
        });
};
