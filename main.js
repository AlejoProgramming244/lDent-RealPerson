obj = [];
stat = "";

function setup()
{
    Canvas = createCanvas(400, 400);
    Canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector("cocosd", modelLoaded);

    setTimeout(function()
    {
        document.getElementById("status").innerHTML = "Página cargada!";

    }, 5000);
}

function modelLoaded()
{
    console.log("modelo cargado!");
    stat = true;
}

function gotResult(error, results)
{
    if (error) {
        console.error("error");
    }
    else
    {
        console.log(results);

        obj = results;
    }    
}

function draw()
{
    image(video, 0, 0, 400, 400);7

    if(stat != "")
    {
        objectDetector.detect(video, gotResult);

        for(i=0; i < obj.length; i++)
        {
            if(obj[i].label == "person")
            {
                document.getElementById("status").innerHTML = "Tu bebe esta durmiendo comodamente.";

                alarm.stop();
                
                fill("red");

                confidence = floor(obj[i].confidence * 100);

                text(obj[i].label + " " + confidence + "%", obj[i].x, obj[i].y);

                textSize(20);

                stroke("red");

                noFill();

                rect(obj[i].x + 15, obj[i].y + 15, obj[i].width, obj[i].height);
            }
            else
            {
                astatus = alarm.isPlaying();

                document.getElementById("status").innerHTML = "TU BEBE NO ESTA EN LA CUNA!!!";

                if(astatus == false)
                {
                    alarm.play();
                }
            }
        }
    }
}

function preload()
{
    alarm = loadSound("alarma_fuerte.mp3");
}