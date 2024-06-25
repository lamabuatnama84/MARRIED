        const scriptURL = 'https://script.google.com/macros/s/AKfycbwIm3lvXAg95wPwLAY6bpxSyKBgl_4qWFZslPIEZIR6I9AL6XFNnzUwOx5nDhRmM6mrIQ/exec';
        const form = document.forms['submit-to-google-sheet'];
        const commentsContainer = document.getElementById('wlee');
        const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmhP1O2S2XzHf_QiorG0m6LDf40MKWiUXs7xgN4tj5lEiKFAvO3n-58yQfzdm2WvlQhVB61bWHMdLt/pub?output=csv';

        form.addEventListener('submit', e => {
            e.preventDefault();
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => {
                    console.log('Success!', response);
                    form.reset(); // Reset the form after successful submission
                    document.getElementById('wlee').innerHTML = ``;
                    fetchComments(); // Fetch comments again to update the list

                })
                .catch(error => console.error('Error!', error.message));
        });

        document.addEventListener('DOMContentLoaded', function() {
            fetchComments();
        });
        
        function fetchComments() {
            fetch(SPREADSHEET_URL)
                .then(response => response.text())
                .then(data => {
                    const rows = data.split('\n').slice(1);
                    rows.forEach(row => {
                        const columns = row.split(',');
                        const id = columns[1].trim(); // Assuming ID is the first column
                        const nama = columns[2].trim();
                        const hubungan = columns[3].trim();
                        const pesan = columns[4].trim();
                        if (!document.getElementById(id)) {
                            displayComment(id, nama, hubungan, pesan);
                        }

                    });
                })
                .catch(error => console.error('Error fetching comments:', error));
        }


        
        
        function displayComment(id, nama, hubungan, pesan) {
            const commentElement = document.createElement('div');
            commentElement.className = 'card-massage';
            commentElement.id = id;
            commentElement.innerHTML = `
                <h1 class="title">${nama}</h1>
                <h4 class="hubungan">- ${hubungan}</h4>
                <p class="pesan">${pesan}</p>
            `;
            commentsContainer.appendChild(commentElement);
        }