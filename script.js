const btn = document.getElementById('button');
document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        const captchaResponse=grecaptcha.getResponse();
        console.log("🚀 ~ captchaResponse:", captchaResponse)
        if(!captchaResponse.length>0){
            alert('Captcha Not Completed');
            return;
        }
        var formData = new FormData(form);
        const formValues=Object.fromEntries(formData);
        formValues.start_date=document.getElementById('start_date').innerText;
        formValues.end_date=document.getElementById('end_date').innerText;
        formValues.day_time_type=document.getElementById('day_time_type').innerText;
        formValues.day=document.getElementById('selected_day');
        const isConfirmed=confirm("Confirm Booking ?");
        if(!isConfirmed) return;
        btn.value = 'Sending...';
        const serviceID = 'default_service';
        const templateID = 'template_szhb9qv';
        formValues['g-recaptcha-response']=captchaResponse;
        emailjs.send(serviceID, templateID, formValues)
            .then((response) => {
                btn.value = 'Send Email';
                alert('Sent!');
                this.reset();
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    });







Inputmask({ mask: "+966 99 999 9999", placeholder: "*" }).mask("#mobile");
function countdown() {
    const endDate = new Date("March 31, 2025 23:59:00").getTime();

    const interval = setInterval(function () {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance <= 0) {
            clearInterval(interval);
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = formatTime(days);
            document.getElementById('hours').innerText = formatTime(hours);
            document.getElementById('minutes').innerText = formatTime(minutes);
            document.getElementById('seconds').innerText = formatTime(seconds);
        }
    }, 1000);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

countdown();
