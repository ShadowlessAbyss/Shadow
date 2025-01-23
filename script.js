document.addEventListener('DOMContentLoaded', (event) => {
    const novelContent = document.getElementById('novel-content');

    // Disable text selection
    if (novelContent) {
        novelContent.onselectstart = () => false;
        novelContent.oncontextmenu = () => false;
    } else {
        console.error('Element with ID "novel-content" not found.');
    }

    // Disable copy keyboard shortcuts globally
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a')) {
            e.preventDefault();
            console.log('Copy/cut/select-all shortcuts are disabled.');
        }
    });

    // Fetch and display chapters from Strapi on chapters.html
    if (window.location.pathname.endsWith('chapters.html')) {
        axios.get('http://localhost:1337/chapters')
            .then(response => {
                const chapters = response.data;
                const chapterButtonsContainer = document.getElementById('chapter-buttons');
                
                chapters.forEach(chapter => {
                    const button = document.createElement('button');
                    button.className = 'btn btn-primary m-2';
                    button.innerText = chapter.title;
                    button.onclick = () => {
                        window.location.href = `chapter.html?id=${chapter.id}`;
                    };
                    chapterButtonsContainer.appendChild(button);
                });
            })
            .catch(error => {
                console.error('Error fetching chapters:', error);
            });
    }
});
