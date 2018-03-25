$( document ).ready(function() {
     
    $.getJSON("data.json", function(data) {
        
        var data = data;
        var carsInfo = data.cars;
        var carData = '';
        var carsLIst = document.getElementById('cars-list'); 
        var speedSelectedCars = [];
        

        //car elements
        carsInfo.forEach(function(car, index) {
            carData += 
                '<div class="cars box-' + index + '"><div class="panel"><div class="front card"><img src="' + car.image + '" alt="' + car.name + '"/> <p class="carname">' + car.name + '</p> </div><div class="back card"><img src="' + car.image + '" alt="' + car.name + '"/><div class="desc"><p><span class="block">Description: </span>' + car.description + '</p> <p><span>Speed: </span>' + car.speed + 'kmh</p></div> </div></div></div>';
        });
        carsLIst.innerHTML = carData;

        //select and add cars to track
        document.querySelectorAll('.cars').forEach(function(selectCar, indexCar){
            $(selectCar).on('click', function() {                
                var trackCarImg = carsInfo[indexCar].image;
                var trackCarImgAlt = carsInfo[indexCar].name;

                if(speedSelectedCars.length < 3){
                    speedSelectedCars.push(carsInfo[indexCar]);
                    track.innerHTML += '<div class="racecar"><img src="' + trackCarImg + '" alt="' + trackCarImgAlt + '" id="rececar"/><span class="medal">' + carsInfo[indexCar].speed + '</span></div>';
                }
            })
        });



 
    });
    
    //filter cars
    function filterCars() {
        var inputCars;
        var filterCars;
        var carBlock;
        var carList;
        var carName;
        var i;

        inputCars = document.getElementById("searchCars");
        filterCars = inputCars.value.toUpperCase();
        carBlock = document.getElementById("cars-list");
        carList = carBlock.getElementsByClassName("panel");

        for (i = 0; i < carList.length; i++) {
            carName = carList[i].getElementsByClassName("carname")[0];

            if (carName.innerHTML.toUpperCase().indexOf(filterCars) > -1) {
                carList[i].classList.remove("disable");
            } else {
                carList[i].classList.add("disable");
            }
        }
    }

    var searchForCar = document.getElementById('searchCars');
    searchForCar.addEventListener('keyup', function(){
        filterCars();
    });   
}) 