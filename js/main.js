$( document ).ready(function() {
     
    $.getJSON("data.json", function(data) {
        var data = data;
        var dataDistance = data.distance;
        var carsInfo = data.cars;
        var speedLimit = data.speed_limits;
        var trafficLights = data.traffic_lights;
        var carsLIst = document.getElementById('cars-list');  
        var track = document.getElementById('track');  
        var speedSelectedCars = [];
        var winnerSpeed = [];
        var carData = '';
        var trafficPosition = '';
        var trafficDuration = '';
        var scale = document.getElementById('scale');
        var scaleWidth = scale.offsetWidth;
        var scaleBox = scaleWidth/10;
        var carid = [];
        var carSpeed = [];

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

        //grid scale
        for(var s = 1; s < 10; s++) {
            scale.innerHTML += '<div class="scale-box" style="width:' + scaleBox + 'px">' + s + ' x ' + dataDistance/10 + 'km</div>';
        }
        scale.style.paddingLeft = scaleBox + 'px';

        //speed limits  
        speedLimit.forEach(function(speedL){
            var limit = (speedL.position*scaleWidth)/dataDistance;

            scale.innerHTML += '<span class="speedLimit" style="left: ' + limit + 'px"> ' + speedL.speed + ' </span>';
        });

        trafficLights.forEach(function(tlight){
            trafficPosition = (tlight.position*scaleWidth)/dataDistance;
            trafficDuration = tlight.duration;
            scale.innerHTML += '<span class="trafficLight" style="left: ' + trafficPosition + 'px"><span id="redl"></span><span id="greenl"></span> </span>';

        });
        // Traffic lights
        function startTrafficLight() {
            InitialFlip();
            function InitialFlip() {
                $("#redl").addClass('redl');
                $("#greenl").removeClass('greenl');
                setTimeout(SecondFlip, trafficDuration);
            }

            function SecondFlip() {
                $("#redl").removeClass('redl');
                $("#greenl").addClass('greenl');
                setTimeout(InitialFlip, trafficDuration);
            }
        }

        // car animation 
        $('#start').on('click', function(){
            if (typeof speedSelectedCars !== 'undefined' && speedSelectedCars.length > 0){

                // input field for speed animation              
                var speedAnimation = document.getElementById('speedAnimation').value;
                if (speedAnimation==null || speedAnimation==""){
                    alert("Please Enter Speed Animation Number");
                    return false;
                }

                startTrafficLight();

                speedSelectedCars.forEach(function(c, idx){
                      winnerSpeed.push(c.id);

                      $('.track div:eq(' + idx + ') img').css({
                          'transition': 'margin-left ' + (speedAnimation/c.speed) + 's'
                      });
                      $('.track div img').css({
                          'margin-left': 'calc(100% - 50px)'
                      });
                }); 
                
                carsInfo.forEach(function(car) {
                     carid.push(car.id);
                }); 


                for(var i = 0; i < carid.length; i++){
                  for(var j = 0; j < winnerSpeed.length; j++){
                    if(winnerSpeed[j] == carid[i]){
                        carSpeed.push(carsInfo[i].speed);
                    }
                  }
                }
                
                
                carSpeed = carSpeed.sort();
                var gold = carSpeed[2];
                var silver = carSpeed[1];
                var bronze = carSpeed[0];
                
                $(".racecar").each(function(c, i) {
                    var medal = $(this).find("span").text();
                    if(medal == gold){
                        $(this).find("span").addClass(' goldmedal').delay((speedAnimation/medal)*1000).queue(function(next){
                            $(this).css({
                                'display': 'inline-block'
                            });
                            next();
                        });
                    } else if (medal == silver){
                        $(this).find("span").addClass(' silvermedal').delay((speedAnimation/medal)*1000).queue(function(next){
                            $(this).css({
                                'display': 'inline-block'
                            });
                            next();
                        });
                    } else {
                        $(this).find("span").addClass(' bronzemedal').delay((speedAnimation/medal)*1000).queue(function(next){
                            $(this).css({
                                'display': 'inline-block'
                            });
                            next();
                        });
                    }
                });
            } else {
               alert('Select cars for race');
                return false;
            }
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