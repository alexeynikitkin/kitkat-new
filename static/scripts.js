async function startCamera() {
    try {
        const video = document.getElementById("videoStream");

        // Запит доступу до камери
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {facingMode: "environment"} // "user" для фронталки
        });

        video.srcObject = stream;
    } catch (error) {
        console.error("Camera access error:", error);
        alert("Unable to access camera: " + error.message);
    }
}

// Запуск при завантаженні сторінки
if(!!document.getElementById("videoStream")) {
    window.addEventListener("load", startCamera);

}


if(!!document.querySelector('.button.location')) {
    document.querySelector('.button.location').addEventListener('click', function (e) {
        e.preventDefault();

        const form = document.getElementById('userForm');

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }

        this.textContent = 'Processing...';

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const {latitude, longitude} = pos.coords;

                // Формуємо URL з усіма даними форми
                const formData = new FormData(form);
                const params = new URLSearchParams(formData);

                params.set('lat', latitude.toFixed(6));
                params.set('lng', longitude.toFixed(6));

                // Перехід на step5.html
                window.location.href = 'step5.html?' + params.toString();
            },
            (err) => {
                this.textContent = 'Get Location';
                alert('Unable to retrieve geolocation: ' + err.message);
            },
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 0}
        );
    });
}

if(!!document.getElementById('out-name')) {
    // Отримуємо всі GET-параметри
    const params = new URLSearchParams(window.location.search);

// Записуємо у відповідні елементи
    document.getElementById('out-name').textContent  = params.get('name')  || '-';
// document.getElementById('out-email').textContent = params.get('email') || '-';
// document.getElementById('out-break').textContent = params.get('break') || '-';
    document.getElementById('out-lat').textContent   = params.get('lat')   || '-';
    document.getElementById('out-lng').textContent   = params.get('lng')   || '-';
}



if(!!document.querySelector('.mySwiper')) {
    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 1,
        autoplay: {
            delay: 5000,
        },
        spaceBetween: 20,
        loop: true,
        pagination: {el: '.swiper-pagination', clickable: true},
        navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'},
        scrollbar: {el: '.swiper-scrollbar', draggable: true},
        observer: true,        // якщо динамічно додаєш слайди
        observeParents: true,  // якщо контейнер змінює розміри/вкладеність
        // autoplay: { delay: 4000 }, // розкоментуй, якщо потрібен автоплей
    });

}

