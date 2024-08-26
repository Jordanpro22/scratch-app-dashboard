function initializePrizesPage() {
    document.getElementById("registerPrice").addEventListener("submit", submitPrice);
    fetchPrizes();  
}

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
            document.getElementById("prizesTableContainer").style.display = "block";
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
