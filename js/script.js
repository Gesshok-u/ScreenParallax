window.onload = function () {
    const parallax = document.querySelector('.parallax');

    if (parallax) {
        const content = document.querySelector('.content');
        const clouds = document.querySelector('.images-parallax__clouds');
        const mountaints = document.querySelector('.images-parallax__mountaints');
        const human = document.querySelector('.images-parallax__human');

        // Коефіцієнти
        const forClouds = 40;
        const forMountains = 20;
        const forHuman = 10;

        // Швидкість анімаії
        const speed = 0.05;

        // Оголошення змінної
        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            // Передаємо стилі
            clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`
            mountaints.style.cssText = `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%);`
            human.style.cssText = `transform: translate(${positionX / forHuman}%,${positionY / forHuman}%);`
        
            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle(); 

        parallax.addEventListener("mousemove", function (e) {
            // Получение ширины и высоты блока
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            //Ноль по середине
            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            // Какой процент от ширины экрана преодолел курсор относительно центра экрана
            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        });



        /* ------ Parallax при скроле ------- */

        let thresholdSets = [];
        for (let i = 0; i <= 1.0; i += 0.005) {
            thresholdSets.push(i);
        }
        const callback = function (entries, observer) {
            const scrollTopProcent = window.scrollY /parallax.offsetHeight *100;
            setParallaxItemsStyle(scrollTopProcent);
        };
        const observer = new IntersectionObserver(callback, {
            threshold: thresholdSets
        });

        observer.observe(document.querySelector('.content'));

        function setParallaxItemsStyle(scrollTopProcent) {
            content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%);`;
            mountaints.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%);`;
            human.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 3}%);`;
        }

    }
}