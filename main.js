song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

leftWrist_score = 0;
rightWrist_score = 0;

function setup(){
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();  

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function preload(){
 song1 = loadSound("music2.mp3");
 song2 = loadSound("music.mp3");
}

function draw(){
  image(video, 0, 0, 600, 500);

  song1_status = song1.isPlaying();
  song2_status = song2.isPlaying();

  fill("red");
  stroke("black"); 

      if(leftWrist_score > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
      
        if(song1_status == "false"){
          song1.play();
          document.getElementById("song_name").innerHTML = "Peter Pan.";
        }
      }

      if(rightWrist_score > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
      
        if(song2_status == "false"){
          song2.play();
          document.getElementById("song_name").innerHTML = "Harry Potter.";
        }
      }
}

function modelLoaded(){
  console.log("PoseNet is Initialised");
}

function gotPoses(results){
  if (results.length > 0){
    console.log(results);

  leftWristX = results[0].pose.leftWrist.x;
  leftWristY = results[0].pose.leftWrist.y;

  rightWristX = results[0].pose.rightWrist.x;
  rightWristY = results[0].pose.rightWrist.y;
  }

  leftWrist_score = results[0].pose.keypoints[9].score;
  rightWrist_score = results[0].pose.keypoints[10].score;
}