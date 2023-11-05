// color is "blue" or "red"
// count is "little" or "much"
function generateBalls(color, count) {
    let minCount, maxCount;
    const ballWidth    = 20;
    const ballHeight   = 20;
    // 小球之间的间隔值
    // 生成范围在70到100之间的随机整数
    const min = 80;
    const max = 150;
    const ballDistance = Math.floor(Math.random() * (max - min + 1)) + min;

    if (count === 'little') {
        minCount = 10;
        maxCount = 20;
    } else if (count === 'much') {
        minCount = 20;
        maxCount = 40;
    } else {
        return;
    }

    // 生成小球的总数量，并且根据这次函数调用来设置蓝色或红色的答案
    const ballCount = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    if (color === 'blue') {
        blueBallCount = ballCount;
    } else if (color === 'red') {
        redBallCount = ballCount;
    }

    const father = document.getElementById(color); // 父元素，也就是蓝色或者红色的区域，下面会用到

    for (let i = 0, valLeft = 0; i < ballCount; i++) {
    const ball = document.createElement('div');

    ball.style.width = ballWidth + 'px';
    ball.style.height = ballHeight + 'px';
    ball.style.borderRadius = '50%';
    ball.style.backgroundColor = color;
    ball.style.position = 'absolute';
    // 设置元素类名以供移动小球的函数选择
    ball.className = "ball";
    // 设置高度的随机距离
    const valTop = Math.floor(Math.random() * (father.clientHeight - ballHeight - 10)) + 10;
    ball.style.top = valTop + 'px';
    // 设置球的左偏移值
    ball.style.left = father.clientWidth + valLeft + "px";
    valLeft += ballWidth+ ballDistance;
    // 将生成的一个球加入父元素
    father.appendChild(ball);
    }
}

// 移动所有小球的函数，moveDistance是每一次移动的像素值
function moveBallsLeft(speed) {
    var moveDistance;

    if (speed === "slow") {
        moveDistance = 2;
    } else if (speed === "fast") {
        moveDistance = 4;
    } else {
        console.error("无效的速度选项");
        return;
    }

    var balls = document.querySelectorAll('.ball');

    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i];
        var currentLeft = parseInt(ball.style.left) || 0;
        var newLeft = currentLeft - moveDistance;
        ball.style.left = newLeft + 'px';
    }
}

var ballCountType;
var ballSpeedType;
var blueBallCount = -1;
var redBallCount  = -1;
// 添加对按键的响应
// 数量选择按钮
const littleBtn = document.getElementById("littleBtn");
const muchBtn = document.getElementById("muchBtn");
littleBtn.addEventListener("click", function() {
    ballCountType = littleBtn.value;
});
muchBtn.addEventListener("click", function() {
    ballCountType = muchBtn.value;
});
// 速度选择按钮
const slowBtn = document.getElementById("slowBtn");
const fastBtn = document.getElementById("fastBtn");
slowBtn.addEventListener("click", function() {
    ballSpeedType = slowBtn.value;
})
fastBtn.addEventListener("click", function() {
    ballSpeedType = fastBtn.value;
})

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", function() {
    // 生成小球
    generateBalls("blue",ballCountType);
    generateBalls("red",ballCountType);
    // 移动小球
    setInterval(() => {
        moveBallsLeft(ballSpeedType);
    }, 20);
})

const blueInput = document.getElementById("blueInput");
const redInput  = document.getElementById("redInput");
const submitBtn    = document.getElementById("submitBtn")
submitBtn.addEventListener("click", function() {
    // 获取输入框的值并确保它是数字
    const inputValue1 = parseFloat(blueInput.value);
    const inputValue2 = parseFloat(redInput.value);
    
    // 检查输入是否为有效数字
    if (!isNaN(inputValue1) && !isNaN(inputValue2)) {
        if (inputValue1 === blueBallCount && inputValue2 === redBallCount) {
            alert(
                "答对啦（。＾▽＾）" + "\n" +
                "蓝球实际数量: " + blueBallCount + "你的答案: " + inputValue1 + "\n" +
                "红球实际数量: " + redBallCount  + "你的答案: " + inputValue2 + "\n" +
                "好啦要重新来的话刷新一下页面吧(*^_^*)"
            )
        }
        else {
            alert(
                "哎呦答错了＞﹏＜，再试试吧" + "\n" +
                "蓝球实际数量: " + blueBallCount + "你的答案: " + inputValue1 + "\n" +
                "红球实际数量: " + redBallCount  + "你的答案: " + inputValue2 + "\n" +
                "好啦要重新来的话刷新一下页面吧(*^_^*)"
            )
        }
    } else {
        console.error("无效的输入，必须为数字");
    }
})