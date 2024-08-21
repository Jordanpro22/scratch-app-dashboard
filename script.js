// Page Navigation
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
let currentActiveLink = null;

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        const target = this.getAttribute('data-target');

        if (currentActiveLink) {
            currentActiveLink.classList.remove('active');
        }

        // Set current active link
        currentActiveLink = this;
        this.classList.add('active');

        pages.forEach(page => {
            page.classList.remove('active');
        });

        setTimeout(() => {
            document.getElementById(target).classList.add('active');
        }, 100); 
    });
});

// Config Navigation
const configButtons = document.querySelectorAll('.config-btn');
const configPages = document.querySelectorAll('.config-page');

configButtons.forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('data-config');

        configButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');

        configPages.forEach(page => {
            page.classList.remove('active');
        });

        setTimeout(() => {
            document.getElementById(target).classList.add('active');
        }, 100); 
    });
});

async function submitPrice(event) {
  event.preventDefault(); 
  const formData = new FormData();
  formData.append('name', document.getElementById("name").value);
  formData.append('number_price', document.getElementById("number_price").value);


  // Traitement de l'image
  const imgInput = document.getElementById("img"); 
  if (imgInput.files && imgInput.files[0]) {
    const file = imgInput.files[0];
    formData.append('img', file, file.name);
  }

  try {
    const response = await fetch("http://localhost:4000/price/", {
      method: "POST",
      body: formData,
    });

    if (response.ok || response.status === 201) {
      alert("Votre enregistrement a été réalisé avec succès !");
    } else {
      const result = await response.json();
      alert('Erreur lors de l enregistrement : ${result.error || "Erreur inconnue"}); // Affiche le message d erreur du serveur')
    }
  } catch (error) {
    alert("Une erreur s'est produite pendant l'enregistrement.");
  }
}
 
document.getElementById("registerPrice").addEventListener("submit", submitPrice);



