document.addEventListener("DOMContentLoaded", function() {
    const nameForm = document.getElementById("nameForm");
    const userNameElements = document.querySelectorAll("#userName");
    const nextButton = document.getElementById("nextButton");
    const languageElements = document.querySelectorAll(".language");

    if (nameForm) {
        nameForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            sessionStorage.setItem("userName", name);
            window.location.href = "hello.html";
        });
    }

    if (userNameElements.length > 0) {
        const userName = sessionStorage.getItem("userName");
        userNameElements.forEach(el => el.textContent = userName);

        let index = 0;
        const showNextLanguage = () => {
            if (index < languageElements.length) {
                languageElements[index].style.display = "block";
                setTimeout(() => {
                    if (index < languageElements.length - 1) {
                        languageElements[index].style.display = "none";
                    }
                    index++;
                    showNextLanguage();
                }, 2000);
            } else {
                nextButton.style.display = "block";
            }
        };
        showNextLanguage();
    }

    if (nextButton) {
        nextButton.addEventListener("click", function() {
            window.location.href = "back2.html";
        });
    }

    const languageForm = document.getElementById("languageForm");
    if (languageForm) {
        languageForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const selectedLanguages = Array.from(document.getElementById("languages").selectedOptions)
                .map(option => option.value);
            alert(`Selected languages: ${selectedLanguages.join(", ")}`);
        });
    }
});
