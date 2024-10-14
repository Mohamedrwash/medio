let currentChapter = '';

function loadChapter(chapter) {
    currentChapter = chapter;
    document.getElementById('chapter-title').innerText = `${chapter.replace('chapter', 'Chapter ')} Quiz`;
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('quiz-form').innerHTML = '';

    fetch(`questions/${chapter}.json`)
        .then(response => response.json())
        .then(data => {
            data.forEach((q, index) => {
                const questionHtml = `
                    <div class="mt-3">
                        <h5>${q.question}</h5>
                        ${q.options.map((option, i) => `
                            <div>
                                <input type="radio" name="question-${index}" value="${String.fromCharCode(97 + i)}" required>
                                ${option}
                            </div>
                        `).join('')}
                    </div>
                `;
                document.getElementById('quiz-form').innerHTML += questionHtml;
            });
        })
        .catch(error => console.error('Error loading questions:', error));
}

function submitQuiz() {
    fetch(`questions/${currentChapter}.json`)
        .then(response => response.json())
        .then(data => {
            let score = 0;
            data.forEach((q, index) => {
                const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
                if (selectedOption && selectedOption.value === q.answer) {
                    score++;
                }
            });

            document.getElementById('score').innerText = `${score} out of ${data.length}`;
            document.getElementById('result').style.display = 'block';
        });
}

function startOver() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'none';
}
