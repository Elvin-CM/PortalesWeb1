
document.addEventListener("DOMContentLoaded", () => {
    /*let linksCollection = document.querySelectorAll('header nav ul li a');
    linksCollection.forEach((link) =>{
        link.addEventListener('click', (e)=>{
            e.preventDefault();
            e.stopPropagation();
            alert("Navegaria a traves de esta pagina al target " + e.target.href+ " pero no tengo permisos para hacerlo");
        })
    })*/
   const carrusel = document.querySelector('.carrusel');
    const track = document.querySelector('.carrusel .track');
    let currentSlide = 0;
    const slides = track.querySelectorAll('.hero-panel');
    const slidesTopLimit = slides.length - 1;
    let direction = 1; // 1 = right, -1 = left
    const waitingTime = 3000; // 3 seconds, se mide en milisegundos
    console.log("Slides Found:", slides);
    let nav = null;
    let timeoutID = null;
    
    function moveSlide() {
        console.log("Move slide triggered");
        let nextSlide = currentSlide + direction;
        if(nextSlide < 0){
            nextSlide = 1;
            direction = 1;
        }
        if(nextSlide > slidesTopLimit){
            nextSlide = slidesTopLimit - 1;
            direction = -1;
        }
        renderSlide(nextSlide);
        tickFunction();
    }

    function renderSlide(moveTo) {
        if(timeoutID){
            clearTimeout(timeoutID);
        }
        track.style.transform = `translateX(calc(100vw * ${moveTo * -1}))`;
        nav.querySelectorAll('button').forEach((_, index)=>{
            if(index == moveTo){
                dot.classList.add('active');
            }
            else{
                dot.classList.remove('active');
            }
        })
        nav.querySelector('buttton:nth-child(1)').classList.add('active');
        currentSlide = moveTo;
        tickFunction();
    }

    function renderNavigation() {
        const btnLeft = document.createElement('BUTTON');
        btnLeft.textContent = "<";
        btnLeft.classList.add('btn-left');
        btnLeft.addEventListener('click', ()=>{
            if(currentSlide > 0){
                renderSlide(currentSlide - 1);
            }
        });

        const btnRight = document.createElement('BUTTON');
        btnRight.textContent = ">";
        btnRight.classList.add('btn-right');
        btnRight.addEventListener('click', ()=>{
            if(currentSlide < slidesTopLimit){
                renderSlide(currentSlide + 1);
            }
        });

        carrusel.appendChild(btnLeft);
        carrusel.appendChild(btnRight);

        nav = document.createElement("DIV");
        nav.classList.add('nav');
        slides.forEach(
            (slide, index)=>{
                const btn = document.createElement("BUTTON");
                btn.textContent = (index + 1);
                btn.addEventListener('click', ()=>{
                    renderSlide(index);
                });
                nav.appendChild(btn);
            }
        );
        carrusel.appendChild(nav);
    }

    const tickFunction = () => {
        timeoutID = setTimeout(moveSlide, waitingTime);
    }
    renderNavigation();
    tickFunction();
});