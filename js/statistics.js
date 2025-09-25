const resetButton = document.getElementById('reset-stats');

window.addEventListener('load', onload);

function onload() {
    let results = JSON.parse(localStorage.getItem('results')) || [];
    
    const totalGames = results.length;
    const wins = results.filter(result => result !== 0).length;
    const losses = results.filter(result => result === 0).length;
    const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
    
    document.getElementById('total-games').textContent = totalGames;
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    document.getElementById('win-rate').textContent = winRate + '%';
    
    createAttemptsChart(results);
}

function createAttemptsChart(results) {
    const distribution = {
        '0': 0,
        '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0
    };

    results.forEach(result => {
        if (distribution.hasOwnProperty(result)) {
            distribution[result]++;
        }
    });

    const maxValue = Math.max(...Object.values(distribution));

    for (let attempt = 0; attempt <= 6; attempt++) {
        const bar = document.querySelector(`.chart-bar[data-attempt="${attempt}"] .bar-fill`);
        const count = distribution[attempt];
        let percentage = 0;
        
        if (maxValue > 0) {
            percentage = (count / maxValue) * 100;
        }
        bar.style.width = percentage + "%";
        if(count > 0) {
            bar.querySelector('.bar-count').textContent = count;
        } else {
            bar.style.display = 'none';
        }
    }
}

function resetStats() {
    localStorage.removeItem('results');
    location.reload();
}