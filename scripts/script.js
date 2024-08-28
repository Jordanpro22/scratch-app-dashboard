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


// Function to fetch and update player, winner, and loser counts
async function updateDashboard() {
    try {
        
        const response = await fetch("http://localhost:4000/users/");
        const users = await response.json();

        // Count the number of players
        const playerCount = users.length;

        // Count the number of winners and losers based on the isWinner property
        const winnerCount = users.filter(user => user.isWinner === 'win').length;
        const loserCount = users.filter(user => user.isWinner === 'lose').length;

        // Update the boxes with the fetched data
        document.querySelector(".box:nth-child(1)").textContent = `Players: ${playerCount}`;
        document.querySelector(".box:nth-child(2)").textContent = `Winners: ${winnerCount}`;
        document.querySelector(".box:nth-child(3)").textContent = `Losers: ${loserCount}`;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// Initial dashboard update
updateDashboard();

// Optionally, set an interval to update the dashboard periodically
setInterval(updateDashboard, 5000); // Updates every 5 seconds





// Config Navigation
const configButtons = document.querySelectorAll('.config-btn');
const contentContainer = document.getElementById('content-container');

configButtons.forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('data-config');

        configButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        loadPage(target);
    });
});

function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            contentContainer.innerHTML = data;
            initializePageScripts(page);
        })
        .catch(error => {
            console.error('Error loading page:', error);
            contentContainer.innerHTML = '<p>Error loading content. Please try again.</p>';
        });
}

function initializePageScripts(page) {
    switch(page) {
        case 'winners.html':
            initializeWinnersPage();
            break;
        case 'prizes.html':
            initializePrizesPage();
            break;
        case 'themes.html':
            initializeThemesPage();
            break;
        // Add cases 
    }
}

// Initially load the first page
window.onload = () => {
    loadPage('winners.html');
};




///////////////// USERS PAGE //////////////////////



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
            row.appendChild(createCell(user.isWinner ? "No" : "Yes"));
            row.appendChild(createCell(user.createdAt));

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        alert("Une erreur s'est produite lors de la récupération des données des utilisateurs.");
    }
}

fetchUsers();

/////////////////// FUNCTION TO EXPORT TABLE IN EXCEL ///////////

function exportTableToExcel(tableID, filename = '') {
    const table = document.getElementById(tableID);
    const wb = XLSX.utils.table_to_book(table, {sheet: "Sheet1"});
    return XLSX.writeFile(wb, filename || ('Users_List_' + new Date().toISOString().slice(0,10) + '.xlsx'));
}

document.querySelector('.export-btn').addEventListener('click', () => {
    exportTableToExcel('usersTable', 'Users_List.xlsx');
});

