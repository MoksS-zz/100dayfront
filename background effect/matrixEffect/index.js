const canvas = document.getElementById("matrix") 
const ctx = canvas.getContext("2d");

let [width, height] = [canvas.offsetWidth, canvas.offsetHeight];
canvas.width = width;
canvas.height = height;

const matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("");;

const font_size = 10;

let columns = width/font_size;

let drops = new Array (Math.ceil(columns)).fill(1);//создаем новые массив с указаной длинной и заполенный еденицой 

const fps = 30;

function draw () {
    ctx.fillStyle = "rgba(0, 0, 0, 0.045)";
    ctx.fillRect(0, 0, width,  height + 40);

    ctx.fillStyle = "#f4427d";
    ctx.font = font_size + "px arial";

    for(let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];

        ctx.fillText(text, i*font_size,drops[i]*font_size);

        if(drops[i]*font_size > height && Math.random() > 0.975) drops[i] = 0;

        drops[i]++;
    }
    requestAnimationFrame(draw); //for 60fps
};

draw(); //default 60 fps

//For set FPS

// (function animate (fps) {
//     requestAnimationFrame(draw);
//     setTimeout(animate, 1000 / fps, fps);
// })(30);



window.addEventListener("resize",() => {
    [width, height] = [canvas.offsetWidth, canvas.offsetHeight];
    columns = width/font_size;
    drops = new Array (Math.ceil(columns)).fill(1);
    canvas.width = width;
    canvas.height = height;
});

