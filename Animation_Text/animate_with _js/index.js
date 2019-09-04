function textAnimate(words,id, colors = ['#fff']) {
    const target = document.getElementById(id);
    let letterCount = 1;
    let x = 1;
    let waiting = false;

    target.setAttribute("style", "color :" + colors[0]);

    setInterval(() => {
        if(letterCount == 0 && waiting == false) {
            waiting = true;
            target.textContent = words[0].substring(0,letterCount);

            setTimeout(() => {
                colors.push(colors.shift());//прогоняем цвета по кругу 🔄
                words.push(words.shift());//🔄
                x = 1;
                target.setAttribute("style", "color:" + colors[0]);
                letterCount += x;
                waiting = false;
            }, 1000);
        }else if (letterCount === words[0].length + 1 && waiting === false){
            waiting = true;
            setTimeout(() => {
                x = -1;
                letterCount +=x;
                waiting = false;
            }, 1000);
        }else if (waiting === false) {
            target.innerHTML = words[0].substring(0,letterCount);
            letterCount +=x;
        };
    },120);
};

textAnimate(["Hi, My name Maksim", "We Are The  Champions!", "Make love, not war!" ], "text", ["tomato", "rebeccapurple", "lightblue"]);

