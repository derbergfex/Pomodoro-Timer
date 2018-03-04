$(document).ready(function()
{
    // Buzzer
    var audio = new Audio('http://soundbible.com/grab.php?id=1251&type=mp3');
    function beep()
    {
        audio.play();
    }
 
    // Original variables for reference.
    var origWorkTime = eval($("#workTime").text());
    var origBreakTime =  eval($("#breakTime").text());
 
    // We convert the variables to minutes, to be used in what follows.
    var workTime = origWorkTime * 60;
    var breakTime =  origBreakTime * 60;
 
    // Setting the funcionality of the up and down buttons; restricting the boundary for the work- and break-minutes.
    $("#workUP").on("click", function()
    {
        if (origWorkTime >= 5)
        {
            origWorkTime  +=  1;
            workTime = origWorkTime * 60;
            $("#workTime").html(origWorkTime);
        }
    });
 
    $("#workDOWN").on("click", function()
    {
        if (origWorkTime > 5)
        {
            origWorkTime -= 1;
            workTime = origWorkTime * 60;
            $("#workTime").html(origWorkTime);
        }
    });
 
    $("#breakUP").on("click", function()
    {
        if (origBreakTime >= 1)
        {
            origBreakTime += 1;
            breakTime =  origBreakTime * 60;
            $("#breakTime").html(origBreakTime);
        }
    });
 
    $("#breakDOWN").on("click", function()
    {
        if (origBreakTime > 1)
        {
            origBreakTime -= 1;
            breakTime =  origBreakTime * 60;
            $("#breakTime").html(origBreakTime);
        }
    });

    // Begin timers once the start button is clicked.
    $("#start").on("click", function()
    {
        // Timer setup and functions.
        var mainTimer = setInterval(function()
        {
            workTimer();

            if (workTime < 0)
            {
                beep();
                clearInterval(mainTimer);
                $("#workTime").html(origWorkTime);

                var secondTimer = setInterval(function()
                {
                    breakTimer();

                    if (breakTime < 0)
                    {
                        beep();
                        clearInterval(secondTimer);
                        $("#breakTime").html(origBreakTime);
                    }
                }, 1000);
            }
            
        }, 1000);

        // Reset and stop buttons.
        $('#stop').on("click", function()
        {
            clearInterval(mainTimer);
        });
    
        $('#reset').on("click", function()
        {
            clearInterval(mainTimer);
            workTime = origWorkTime * 60;
            breakTime = origBreakTime * 60;
            $("#workTime").html(origWorkTime);
            $("#breakTime").html(origBreakTime);
        });

    });

    // Functions used in the timers' setup.   
    function workTimer ()
    {

        if (workTime % 60 >= 10)
        {
            $("#workTime").html(Math.floor(workTime / 60) + ":" + workTime % 60);
        }
        else
        {
            $("#workTime").html(Math.floor(workTime / 60) + ":0" + workTime % 60);
        }

        workTime -= 1;  
             
    }

    function breakTimer()
    {
        if (breakTime % 60 >= 10)
        {
            $("#breakTime").html(Math.floor(breakTime / 60) + ":" + breakTime % 60);
        }
        else
        {
            $("#breakTime").html(Math.floor(breakTime / 60) + ":0" + breakTime % 60);
        }

        breakTime -= 1;

    }
          
}); 
