// الفصول المبدئية
const chapters = [
    { number: 1, title: "الفصل 1: البداية", url: "chapter1.html" },
    { number: 2, title: "الفصل 2: القصة تستمر", url: "chapter2.html" },
    { number: 3, title: "الفصل 3: اللحظة الحاسمة", url: "chapter3.html" },
    { number: 4, title: "الفصل 4: المزيد من المغامرة", url: "chapter4.html" }
];

// دالة لعرض الأزرار الخاصة بالفصول
function displayChapters() {
    const chapterButtons = document.getElementById('chapter-buttons');
    chapterButtons.innerHTML = '';  // مسح المحتوى الحالي

    chapters.forEach((chapter) => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = chapter.title;
        button.onclick = () => window.location.href = chapter.url;
        chapterButtons.appendChild(button);
    });
}

// دالة البحث عن الفصل
function searchChapter() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredChapters = chapters.filter(chapter => 
        chapter.title.toLowerCase().includes(searchInput) || 
        chapter.number.toString().includes(searchInput)
    );

    // تحديث الأزرار بناءً على البحث
    const chapterButtons = document.getElementById('chapter-buttons');
    chapterButtons.innerHTML = '';
    filteredChapters.forEach((chapter) => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = chapter.title;
        button.onclick = () => window.location.href = chapter.url;
        chapterButtons.appendChild(button);
    });
}

// تنفيذ عرض الفصول عند تحميل الصفحة
window.onload = displayChapters;
