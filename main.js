song1 = '';
song2 = '';
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
check1 = '';
check2 = '';
scoreLeftWrist = 0;
scoreRightWrist = 0;


function preload() {
    song1 = loadSound('song1.mp3')
    song2 = loadSound('song2.mp3')

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)

    song1.setVolume(1)
    song2.setVolume(1)
    song1.rate(1)
    song2.rate(1)
}

function gotPoses(results) {
    if(results.length > 0){
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score
        console.log('scoreLeftWrist = ' + scoreLeftWrist)
        scoreRightWrist = results[0].pose.keypoints[10].score
        console.log('scoreRightWrist = ' + scoreRightWrist)
        

        leftWristX= results[0].pose.leftWrist.x
        leftWristY= results[0].pose.leftWrist.y
        console.log('leftWrist = ' + leftWristX + 'leftWristY = ' + leftWristY)

        rightWristX= results[0].pose.rightWrist.x
        rightWristY= results[0].pose.rightWrist.y
        console.log('rightWrist = ' + rightWristX + 'rightWristY = ' + rightWristY)
    }
}

function modelLoaded(){
    console.log('PoseNet Is Initialized')
}

function draw() {
    image(video, 0, 0, 600, 500)

    fill('red')
    stroke('black')
    check1 = song1.isPlaying()
    check2 = song2.isPlaying()

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20)
        song2.pause()
        if(check1 == false) {
            song1.play()
            document.getElementById('song').innerHTML = 'Harry Potter Song is Playing'
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20)
        song1.pause()
        if(check2 == false) {
            song2.play()
            document.getElementById('song').innerHTML = 'Peter Pan Song is Playing'
        }
    }

}

