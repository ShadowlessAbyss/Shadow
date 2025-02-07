// script.js

let chapters = [];

// تحميل بيانات الفصول من مجلد chapters/
async function loadChapters() {
    const response = await fetch('chapters/chapter-list.json');
    chapters = await response.json();
    displayChapters();
}

// عرض قائمة الفصول
function displayChapters() {
    const chapterList = document.getElementById("chapterList");
    chapterList.innerHTML = "";

    chapters.forEach(chapter => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `chapter.html?id=${chapter.id}`;
        a.textContent = `${chapter.title} (#${chapter.id})`;
        a.classList.add("no-copy");
        li.appendChild(a);
        chapterList.appendChild(li);
    });
}

// عرض محتوى الفصل
async function showChapterContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = parseInt(urlParams.get("id"));

    const chapter = chapters.find(chapter => chapter.id === chapterId);

    if (chapter) {
        const response = await fetch(`chapters/${chapter.id}.md`);
        const markdown = await response.text();

        // تحويل Markdown إلى HTML
        const htmlContent = marked(markdown);

        const chapterContent = document.getElementById("chapterContent");
        chapterContent.innerHTML = `
            <h1>${chapter.title}</h1>
            <div class="chapter-content">${htmlContent}</div>
        `;

        // إضافة زر الانتقال إلى الفصل التالي
        const nextChapterBtn = document.getElementById("nextChapterBtn");
        const nextChapter = chapters.find(c => c.id === chapterId + 1);

        if (nextChapter) {
            nextChapterBtn.style.display = "block";
            nextChapterBtn.onclick = () => {
                window.location.href = `chapter.html?id=${nextChapter.id}`;
            };
        } else {
            nextChapterBtn.style.display = "none";
        }

        // تفعيل Disqus
        initializeDisqus(chapter.id);
    } else {
        alert("لم يتم العثور على الفصل.");
    }
}

// تصفية الفصول بناءً على البحث
function filterChapters() {
    const input = document.getElementById("searchInput").value.trim();
    const chapterList = document.getElementById("chapterList");
    chapterList.innerHTML = "";

    const filteredChapters = chapters.filter(chapter =>
        chapter.id.toString().includes(input)
    );

    filteredChapters.forEach(chapter => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `chapter.html?id=${chapter.id}`;
        a.textContent = `${chapter.title} (#${chapter.id})`;
        a.classList.add("no-copy");
        li.appendChild(a);
        chapterList.appendChild(li);
    });
}

// تفعيل Disqus
function initializeDisqus(chapterId) {
    var disqus_config = function () {
        this.page.url = window.location.href;
        this.page.identifier = `chapter-${chapterId}`;
    };

    (function() {
        var d = document, s = d.createElement('script');
        s.src = 'https://YOUR-DISQUS-SHORTNAME.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
}

// تشغيل الوظائف عند تحميل الصفحة
window.onload = () => {
    if (window.location.pathname.includes("index.html")) {
        loadChapters();
    } else if (window.location.pathname.includes("chapter.html")) {
        loadChapters().then(() => showChapterContent());
    }
};
