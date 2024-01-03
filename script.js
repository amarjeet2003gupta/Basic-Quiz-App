let data = [
    ["What does HTML stand for?","Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language","Hyper Text Markup Language"],

    ["Which programming language is often used for front-end web development?", "Python", "Java", "JavaScript", "C++", "JavaScript"],

    ["What is the purpose of the CSS 'float' property?", "Text alignment", "Clearing floats", "Creating shadows", "Font styling", "Clearing floats"],

    ["Which of the following is not a valid data type in JavaScript?", "String", "Boolean", "Float", "Character", "Float"],

    ["What does the acronym API stand for?", "Application Programming Interface", "Advanced Programming Interface", "Automated Processing Interface", "Application Process Interface", "Application Programming Interface"]
];

let score = [0,0,0,0,0];

function updateTable(index){
    let box = document.getElementById('box');
    box.innerHTML = "";

    let question = document.createElement("div");
    question.innerHTML = data[index][0];
    question.setAttribute("style", "font-size: 30px");
    box.appendChild(question);

    box.appendChild(document.createElement("hr"));

    let options = [];
    for(let i=1;i<=4;i++){
        let option1 = document.createElement("p");
        option1.innerHTML = data[index][i];
        option1.setAttribute("class", "options");
        option1.onclick = function(){
            options.forEach(opt => opt.classList.remove("selected"));
            score[index] = 0;
            option1.classList.add("selected");

            if(option1.innerHTML == data[index][5]){
                score[index] = 1;
            }
        }
        box.appendChild(option1);
        options.push(option1);
    }

    if(index == data.length-1){
        let submit = document.createElement("button");
        submit.setAttribute("style","height:30px; border:none; background-color:red; border-radius:5px");
        submit.textContent = "Submit Quiz";
        box.appendChild(submit);
        
        submit.onclick = function(){
            let ct = 0;
            options.forEach(opt => {if(opt.classList.contains("selected")){
                ct++;
            }});
            if(ct == 0) alert("Choose any Option!");
            else showScore();
        }
    }
    else{
        let next = document.createElement("button");
        next.setAttribute("style","height:30px; border:none; background-color:red; border-radius:5px");
        next.textContent = "Next Question";
        box.appendChild(next);
        
        next.onclick = function (){
            let check = options.find(opt => opt.classList.contains("selected"));
            if(check) updateTable(index+1);
            else alert("Choose any Option!");
        }
    }
}

function showScore(){
    let sum = 0;
    score.forEach(val =>{
        sum += val;
    });

    let box = document.getElementById("box");
    box.setAttribute("style", "background-color: yellow; color: black; padding: 10px; border-radius: 5px; font-weight: bold; font-size: 40px;");

    let str = "Your Scored : " + String(sum) + " Points";
    box.innerHTML = str;

    box.appendChild(document.createElement("hr"));

    let restart = document.createElement("button");
    restart.innerHTML = "Re-Start Quiz";
    restart.style.color = "indigo";
    restart.style.border = "none";
    restart.borderRadius = "3px";
    box.appendChild(restart);

    restart.onclick = function(){
        score.forEach(val =>{ val = 0; });
        box.removeAttribute("style");
        updateTable(0);
    }
}