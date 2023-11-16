// Função para alternar o menu
const toggleMenu = () => {
    const body = document.body;
    const menuButton = document.getElementById("menu-button");
    const openButton = document.getElementById("menu-button-open");
    const closeButton = document.getElementById("menu-button-close");

    if (body.classList.contains("open")) {
        body.classList.remove("open");
        openButton.style.display = "block";
        closeButton.style.display = "none";
    } else {
        body.classList.add("open");
        openButton.style.display = "none";
        closeButton.style.display = "block";
    }
};

const links = document.querySelectorAll(".links");

links.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const sectionId = event.target.getAttribute("href").substring(1);

        // Ocultar todas as seções, incluindo a seção "portfolio"
        const sections = document.querySelectorAll('section');
        sections.forEach((section) => {
            section.classList.add("hidden");
        });

        // Mostrar a seção correspondente
        const currentSection = document.getElementById(sectionId);
        currentSection.classList.remove("hidden");

        toggleMenu(); // Fecha o menu se estiver aberto
    });
});


// EFEITO TEXTO

// Função para simular a digitação de texto com estilos personalizados
async function typeTextWithStyles(element, text, color, size) {
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += `<span style="color: ${color}; font-size: ${size}">${text.charAt(
            i
        )}</span>`;
        await new Promise((resolve) => setTimeout(resolve, 90));
    }
}

// Função para iniciar o efeito de digitação com estilos personalizados
async function startTypingWithStyles() {
    const elementText = document.getElementById("write-text");
    const textsWithStyles = [
        {
            text: "Olá, eu sou o Paulo!",
            color: "var(--color1)",
            size: "calc(1.8em + 2vw - 2vh)",
        },
        {
            text: "FrontEnd Developer",
            color: "var(--dark-green)",
            size: "calc(1.5em + 2vw - 2vh)",
        },
        {
            text: "& Copywriter!",
            color: "var(--light-green)",
            size: "calc(1.5em + 2vw - 2vh)",
        },
    ];

    for (let i = 0; i < textsWithStyles.length; i++) {
        if (i > 0) {
            elementText.innerHTML += "<br>"; // Adicione uma quebra de linha entre os textos
        }
        await typeTextWithStyles(
            elementText,
            textsWithStyles[i].text,
            textsWithStyles[i].color,
            textsWithStyles[i].size
        );
    }
}

// Função para substituir a última frase após todos os textos terem sido apresentados
async function replaceLastTextWithGo() {
    const elementText = document.getElementById("write-text");

    // Aguarde até que todos os textos tenham sido digitados
    while (elementText.innerHTML.length < elementText.innerText.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    elementText.innerHTML = "";

    await typeTextWithStyles(
        elementText,
        "vamos",
        "var(--light-green)",
        "calc(3em + 1vw - 1vh",
        "800",
        "center"
    );

    elementText.innerHTML += "<br>";
    await typeTextWithStyles(
        elementText,
        "juntos!",
        "var(--light-green)",
        "calc(3em + 1vw - 1vh",
        "center"
    );
}

// Inicie o efeito de digitação com estilos personalizados quando a página for carregada
window.onload = () => {
    startTypingWithStyles().then(() => {
        setTimeout(replaceLastTextWithGo, 2000);
    });
};

//Foguete carregando a página about

// Função para lidar com o clique no link do foguete
function toggleSectionVisibility(sectionId) {
    const section = document.getElementById(sectionId);

    if (section) {
        section.classList.remove("hidden");
    }
}

// Obtém o elemento do link do foguete
const rocketLink = document.querySelector(".rocket-img a");
rocketLink.addEventListener("click", () => {
    toggleSectionVisibility("about");
    document.getElementById("home").classList.add("hidden");
});

//Função botão tap to top

// Função para rolar suavemente para o topo da página
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

// Função para verificar o posicionamento da rolagem e mostrar/ocultar o botão
function checkScrollPosition() {
    const button = document.getElementById("scrollToTopButton");
    const homeSection = document.getElementById("home");
    


    // Verifica se o botão deve ser exibido com base na posição da rolagem
    if (window.scrollY > homeSection.offsetHeight) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }


}

// Adicione um ouvinte de evento para verificar o posicionamento da rolagem quando a página é rolada
window.addEventListener("scroll", checkScrollPosition);

//Função fadein texto about

function handleAboutIntersection(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Quando a seção "about" estiver na tela, adicione uma classe que altera a opacidade
            entry.target.classList.add("fade-in");
        }
    });
}

// Crie um novo Intersection Observer
const aboutObserver = new IntersectionObserver(handleAboutIntersection);

// Selecione a seção "about" pelo ID ou classe
const aboutSection = document.querySelector(".text-about");

// Observe a seção "about" usando o Intersection Observer
aboutObserver.observe(aboutSection);


// Selecione todas as seções, exceto a seção "home"
const sections = document.querySelectorAll('section:not(#home)');
const footer = document.getElementById('main-footer');

// Função para mostrar o footer
function showFooter() {
    footer.classList.remove('hidden');
}

// Função para ocultar o footer
function hideFooter() {
    footer.classList.add('hidden');
}


// Adicione um ouvinte de evento para verificar quando as seções são abertas
sections.forEach((section) => {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                showFooter();
            } else {
                hideFooter();
            }
        });
        
    });

    sectionObserver.observe(section);
});

const homeSection = document.getElementById('home');
const homeObserver = new IntersectionObserver ((entries, observer) => {
    entries.forEach((entriy) => {
        if (entriy.isIntersecting) {
            hideFooter();
        } else {
            showFooter();
        }
    });
});


homeObserver.observe(homeSection);


//script email


async function sendMail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    try {
        const response = await fetch('http://localhost:3001/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, message}),
        });

        if (response.ok) {
            document.getElementById('confirmationMessage').innerText = 'E-mail enviado com sucesso!';
            document.getElementById('confirmationMessage').style.display = 'block';
            
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';

        } else {
            throw new Error('Erro ao enviar e-mail!');
        }
    } catch (error) {
        console.error('Erro:', error);
    }

}




