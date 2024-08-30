function initializeWinnersPage() {
    document.getElementById('generateRows').addEventListener('click', function() {
        const numWinners = parseInt(document.getElementById('numWinners').value);
        const container = document.getElementById('winnerRowsContainer');
        container.innerHTML = '';  // Clear previous rows
    
        for (let i = 0; i < numWinners; i++) {
            const row = document.createElement('div');
            row.classList.add('winner-row');
    
            const minInput = document.createElement('input');
            minInput.type = 'number';
            minInput.placeholder = `Min Number ${i + 1}`;
    
            const maxInput = document.createElement('input');
            maxInput.type = 'number';
            maxInput.placeholder = `Max Number ${i + 1}`;
    
            row.appendChild(minInput);
            row.appendChild(maxInput);
            container.appendChild(row);
        }
    
        document.getElementById('selectWinners').style.display = 'inline-block';
        document.getElementById('resetRows').style.display = 'inline-block';
        document.getElementById('deleteRows').style.display = 'inline-block';
    });
    
    document.getElementById('selectWinners').addEventListener('click', function() {
        const rows = document.querySelectorAll('.winner-row');
        const winnersList = document.getElementById('selectedWinnersList');
        winnersList.innerHTML = '';
    
        rows.forEach((row, index) => {
            const min = parseInt(row.children[0].value);
            const max = parseInt(row.children[1].value);
    
            if (!isNaN(min) && !isNaN(max) && min < max) {
                const randomWinner = Math.floor(Math.random() * (max - min + 1)) + min;
                const listItem = document.createElement('li');
                listItem.textContent = `Winner ${index + 1}: ${randomWinner}`;
                winnersList.appendChild(listItem);
            } else {
                alert(`Invalid range in row ${index + 1}. Please enter valid numbers.`);
            }
        });
    
        document.getElementById('selectedWinnersContainer').style.display = 'block';
    });
    
    document.getElementById('resetRows').addEventListener('click', function() {
        document.getElementById('winnerRowsContainer').innerHTML = '';
        document.getElementById('numWinners').value = '';
        document.getElementById('selectedWinnersContainer').style.display = '';
        document.getElementById('selectWinners').style.display = '';
        document.getElementById('resetRows').style.display = '';
        document.getElementById('deleteRows').style.display = '';
    });
    
    document.getElementById('deleteRows').addEventListener('click', function() {
        document.getElementById('winnerRowsContainer').innerHTML = '';
        document.getElementById('selectedWinnersContainer').style.display = 'none';
        document.getElementById('selectWinners').style.display = 'none';
        document.getElementById('resetRows').style.display = 'none';
        document.getElementById('deleteRows').style.display = 'none';
    });

  
}
