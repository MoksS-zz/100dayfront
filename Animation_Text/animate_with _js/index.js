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
                let usedColor = colors.shift();
                colors.push(usedColor); 
                var usedWord = words.shift();
                words.push(usedWord);
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

textAnimate(["Привет Мир. Lorem lOeasdasdafgdsgjkdsghaskjdhakjwheqwhrbqkfb", "We Are The  Champions!", "Make love, not war!" ], "text", ["tomato", "rebeccapurple", "lightblue"]);

