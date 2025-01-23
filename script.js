// هنا يتم إضافة الأزرار للفصول
const chapters = [
    "الفصل 1: البداية",
    "الفصل 2: القصة تستمر",
    "الفصل 3: اللحظة الحاسمة",
    // يمكنك إضافة المزيد من الفصول هنا
];

const chapterButtonsContainer = document.getElementById('chapter-buttons').querySelector('.row');

// إضافة الأزرار لكل فصل
chapters.forEach(chapter => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-light');
    button.textContent = chapter;
    button.onclick = () => {
        alert(`لقد اخترت ${chapter}`);
        // هنا يمكنك إضافة رابط أو أي تصرف آخر عند الضغط على الفصل
    };
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-4');
    col.appendChild(button);
    chapterButtonsContainer.appendChild(col);
});

// منع النسخ والقص واللصق
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a' || e.key === 'v')) {
        e.preventDefault(); // منع القص والنسخ واللصق
        console.log('Copy/cut/paste/select-all shortcuts are disabled.');
    }
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // منع المينيو الخاص بالزر الأيمن
    console.log('Right-click is disabled.');
});
