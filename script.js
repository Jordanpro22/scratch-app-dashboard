
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
            showPrizesTable(); // Show the table
            fetchPrizes(); // Fetch and display the updated prize list
        } else {
            const result = await response.json();
            alert(`Erreur lors de l'enregistrement : ${result.error || "Erreur inconnue"}`);
        }
    } catch (error) {
        alert("Une erreur s'est produite pendant l'enregistrement.");
    }
}

async function fetchPrizes() {
    try {
        const response = await fetch("http://localhost:4000/price/");
        const prizes = await response.json();

        const tableBody = document.querySelector("#prizesTable tbody");
        tableBody.innerHTML = ""; 
        prizes.forEach(prize => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = prize.name;
            row.appendChild(nameCell);

            const numberCell = document.createElement("td");
            numberCell.textContent = prize.number_price;
            row.appendChild(numberCell);

            const imgCell = document.createElement("td");
            imgCell.textContent = prize.img; // Display image source
            row.appendChild(imgCell);

            tableBody.appendChild(row);
        });
    } catch (error) {
        alert("Une erreur s'est produite lors de la récupération des données des prix.");
    }
}

function showPrizesTable() {
    document.getElementById("prizesListTitle").style.display = "block";
    document.getElementById("prizesTable").style.display = "block";
}

document.getElementById("registerPrice").addEventListener("submit", submitPrice);












async function fetchUsers() {
    try {
        const response = await fetch("http://localhost:4000/users/");
        
        if (!response.ok) {
            throw new Error('Not ok');
        }

        const users = await response.json();
        console.log("Fetched users data:", users); // Log the fetched data

        const tableBody = document.querySelector(".users-table tbody");
        tableBody.innerHTML = ""; // Clear any existing rows

        users.forEach(user => {
            const row = document.createElement("tr");

            const createCell = (text) => {
                const cell = document.createElement("td");
                cell.textContent = text;
                return cell;
            };

            row.appendChild(createCell(user.name));
            row.appendChild(createCell(user.phone_number));
            row.appendChild(createCell(user.age));
            row.appendChild(createCell(user.gender));
            row.appendChild(createCell(user.achat_category));
            row.appendChild(createCell(user.type_client));
            row.appendChild(createCell(user.partenaire_phone));
            row.appendChild(createCell(user.partenaire_type));
            row.appendChild(createCell(user.location_patenaire));
            row.appendChild(createCell(user.montant_commande));
            row.appendChild(createCell(user.carimo_product));
            row.appendChild(createCell(user.isWinner ? "Yes" : "No"));
            row.appendChild(createCell(user.createdAt));

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        alert("Une erreur s'est produite lors de la récupération des données des utilisateurs.");
    }
}

fetchUsers();
