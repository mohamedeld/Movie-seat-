const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

function setMovieData(movieIndex,moviePrice){
    localStorage.setItem("selectedMovieIndex",movieIndex);
    localStorage.setItem("selectedMoviePrice",moviePrice);
};

function updateSelectedCount(){
    const selectedCount = document.querySelectorAll('.row .seat.selected');

    const seatIndex = [...selectedCount].map(item=> [...seats].indexOf(item));

    localStorage.setItem('selectedSeat',JSON.stringify(seatIndex));

    const selectedSeatCount = selectedCount.length;

    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
};

function populateUI(){
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeat'));
    if(selectedSeat !== null && selectedSeat.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedSeat.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    };
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
};

movieSelect.addEventListener('change',(e)=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
});

container.addEventListener('click', (e) =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    }
    updateSelectedCount();
});
updateSelectedCount();