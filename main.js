Beyblade_Burst_Surge = "";
Beyblade_Burst_Turbo = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
song_name = "";

function setup()
{
canvas = createCanvas(400,350);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
if(results.length > 0)
{
console.log(results);

scoreleftWrist = results[0].pose.keypoints[9].score;
console.log(scoreleftWrist);

leftWrist_x = results[0].pose.leftWrist.x;
leftWrist_y = results[0].pose.leftWrist.y;
console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

rightWrist_x = results[0].pose.rightWrist.x;
rightWrist_y = results[0].pose.rightWrist.y;
console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
}
}

function preload()
{
Beyblade_Burst_Surge = loadSound("Beyblade Burst Surge.mp3");
Beyblade_Burst_Turbo = loadSound("Beyblade Burst Turbo.mp3")
}

function draw()
{
image(video,0,0,500,479);

fill("#00FFFF");
stroke("#30D5C8");

song_name = Beyblade_Burst_Surge.isPlaying();
console.log(song_name);

if(scoreleftWrist > 0.2)
{
circle(leftWrist_x,leftWrist_y,20);
Beyblade_Burst_Surge.stop();
if(song_name == false){
Beyblade_Burst_Turbo.play();
}else{
console.log("Song Name: Beyblade Burst Surge");
document.getElementById("song_id").innerHTML = "Song Name: Beyblade Burst Surge";
}
}
}

function play()
{
Beyblade_Burst_Surge.play();
}