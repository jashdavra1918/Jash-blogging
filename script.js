/* =========================================
   BLOGSPHERE BLOGGING WEBSITE
========================================= */


/* =========================================
   DEFAULT BLOGS
========================================= */

const defaultBlogs = [

    {
        id: 1,

        title: "The Future of Technology",

        author: "Admin",

        category: "Technology",

        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",

        content:
`Technology is changing the way we live, work and communicate.

From artificial intelligence to cloud computing, modern technology is creating new opportunities every day.

The future will bring even more powerful tools that can help people solve complex problems and improve everyday life.

Learning new technologies and adapting to change will become increasingly important.`,

        date: "September 30, 2026",

        likes: 12

    },


    {
        id: 2,

        title: "Beautiful Places to Travel",

        author: "Admin",

        category: "Travel",

        image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80",

        content:
`Travel gives us the opportunity to discover new places, cultures and experiences.

Whether you enjoy mountains, beaches, cities or historical locations, every journey can teach us something new.

Planning your trip carefully can help you enjoy your journey while making unforgettable memories.`,

        date: "September 28, 2026",

        likes: 20

    },


    {
        id: 3,

        title: "Simple Habits for a Better Life",

        author: "Admin",

        category: "Lifestyle",

        image:
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80",

        content:
`Small daily habits can have a big impact on our lives.

Reading, exercising, learning something new and maintaining a healthy routine can improve our productivity and overall lifestyle.

The key is consistency. Start with small changes and gradually build better habits.`,

        date: "September 25, 2026",

        likes: 15

    },


    {
        id: 4,

        title: "Why Learning Is Important",

        author: "Admin",

        category: "Education",

        image:
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80",

        content:
`Education is not limited to classrooms.

Learning can happen through books, experiences, conversations and practical projects.

Continuous learning helps us develop new skills and understand the world around us.`,

        date: "September 22, 2026",

        likes: 10

    }

];


/* =========================================
   GET BLOGS FROM LOCAL STORAGE
========================================= */

function getBlogs() {

    const storedBlogs =
        localStorage.getItem("blogs");

    if (storedBlogs) {

        return JSON.parse(storedBlogs);

    }

    localStorage.setItem(
        "blogs",
        JSON.stringify(defaultBlogs)
    );

    return defaultBlogs;
}


/* =========================================
   SAVE BLOGS
========================================= */

function saveBlogs(blogs) {

    localStorage.setItem(
        "blogs",
        JSON.stringify(blogs)
    );

}


/* =========================================
   DISPLAY BLOGS
========================================= */

function displayBlogs(blogs) {

    const container =
        document.getElementById("blogContainer");

    const noBlogs =
        document.getElementById("noBlogs");

    const count =
        document.getElementById("blogCount");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (count) {

        count.textContent =
            `${blogs.length} blog${blogs.length !== 1 ? "s" : ""}`;

    }


    if (blogs.length === 0) {

        noBlogs.style.display = "block";

        return;

    }


    noBlogs.style.display = "none";


    blogs.forEach(function(blog) {

        const card =
            document.createElement("div");

        card.className = "blog-card";


        card.innerHTML = `

            <img
                src="${blog.image}"
                class="blog-image"
                alt="${escapeHTML(blog.title)}"
                onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80'"
            >

            <div class="blog-card-content">

                <span class="category">
                    ${escapeHTML(blog.category)}
                </span>

                <h3>
                    ${escapeHTML(blog.title)}
                </h3>

                <p>
                    ${getExcerpt(blog.content)}
                </p>

                <div class="blog-info">

                    <span>
                        By ${escapeHTML(blog.author)}
                    </span>

                    <span>
                        ${escapeHTML(blog.date)}
                    </span>

                </div>

                <div class="card-actions">

                    <a
                        href="post.html?id=${blog.id}"
                        class="read-btn"
                    >
                        Read More
                    </a>

                    <button
                        class="delete-btn"
                        onclick="deleteBlog(${blog.id})"
                    >
                        🗑
                    </button>

                </div>

            </div>
        `;


        container.appendChild(card);

    });

}


/* =========================================
   GET EXCERPT
========================================= */

function getExcerpt(text) {

    if (text.length <= 120) {

        return escapeHTML(text);

    }

    return escapeHTML(
        text.substring(0, 120) + "..."
    );

}


/* =========================================
   HTML ESCAPE
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================
   DELETE BLOG
========================================= */

function deleteBlog(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmation) {

        return;

    }


    let blogs = getBlogs();

    blogs =
        blogs.filter(
            blog => blog.id !== id
        );


    saveBlogs(blogs);

    displayBlogs(blogs);

}


/* =========================================
   SEARCH
========================================= */

function setupSearch() {

    const searchInput =
        document.getElementById("searchInput");


    if (!searchInput) {

        return;

    }


    searchInput.addEventListener(
        "input",
        function() {

            const search =
                this.value
                    .toLowerCase()
                    .trim();


            const blogs = getBlogs();


            const filtered =
                blogs.filter(function(blog) {

                    return (

                        blog.title
                            .toLowerCase()
                            .includes(search)

                        ||

                        blog.content
                            .toLowerCase()
                            .includes(search)

                        ||

                        blog.category
                            .toLowerCase()
                            .includes(search)

                        ||

                        blog.author
                            .toLowerCase()
                            .includes(search)

                    );

                });


            displayBlogs(filtered);

        }
    );

}


/* =========================================
   CATEGORY FILTER
========================================= */

function filterCategory(category) {

    const blogs = getBlogs();


    if (category === "All") {

        displayBlogs(blogs);

        return;

    }


    const filtered =
        blogs.filter(
            blog =>
                blog.category === category
        );


    displayBlogs(filtered);

}


/* =========================================
   CREATE BLOG
========================================= */

function setupBlogForm() {

    const form =
        document.getElementById("blogForm");


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const title =
                document
                    .getElementById("title")
                    .value
                    .trim();


            const author =
                document
                    .getElementById("author")
                    .value
                    .trim();


            const category =
                document
                    .getElementById("category")
                    .value;


            const image =
                document
                    .getElementById("image")
                    .value
                    .trim();


            const content =
                document
                    .getElementById("content")
                    .value
                    .trim();


            if (
                !title ||
                !author ||
                !category ||
                !content
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;

            }


            const blogs = getBlogs();


            const newBlog = {

                id:
                    Date.now(),

                title:
                    title,

                author:
                    author,

                category:
                    category,

                image:
                    image ||
                    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80",

                content:
                    content,

                date:
                    new Date().toLocaleDateString(
                        "en-US",
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        }
                    ),

                likes:
                    0

            };


            blogs.unshift(newBlog);

            saveBlogs(blogs);


            alert(
                "Your blog has been published successfully!"
            );


            window.location.href =
                "index.html";

        }
    );

}


/* =========================================
   DISPLAY SINGLE POST
========================================= */

function displayPost() {

    const container =
        document.getElementById(
            "postContainer"
        );


    if (!container) {

        return;

    }


    const parameters =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(
            parameters.get("id")
        );


    const blogs =
        getBlogs();


    const blog =
        blogs.find(
            item => item.id === id
        );


    if (!blog) {

        container.innerHTML = `

            <div class="no-blogs"
                 style="display:block">

                <h2>
                    Blog not found
                </h2>

                <p>
                    The blog you are looking for does not exist.
                </p>

                <a
                    href="index.html"
                    class="main-btn"
                >
                    Back to Home
                </a>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <span class="category">
            ${escapeHTML(blog.category)}
        </span>

        <h1 class="post-title">
            ${escapeHTML(blog.title)}
        </h1>

        <div class="post-meta">

            By
            <strong>
                ${escapeHTML(blog.author)}
            </strong>

            &nbsp; • &nbsp;

            ${escapeHTML(blog.date)}

        </div>


        <img
            src="${blog.image}"
            class="post-hero-image"
            alt="${escapeHTML(blog.title)}"
            onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80'"
        >


        <div class="post-content">

            ${escapeHTML(blog.content)}

        </div>


        <div class="post-actions">

            <button
                class="like-btn"
                onclick="likeBlog(${blog.id})"
            >
                ❤️
                <span id="likeCount">
                    ${blog.likes}
                </span>
                Likes
            </button>

        </div>


        <a
            href="index.html"
            class="back-btn"
        >
            ← Back to all blogs
        </a>

    `;

}


/* =========================================
   LIKE BLOG
========================================= */

function likeBlog(id) {

    const blogs =
        getBlogs();


    const blog =
        blogs.find(
            item => item.id === id
        );


    if (!blog) {

        return;

    }


    blog.likes =
        (blog.likes || 0) + 1;


    saveBlogs(blogs);


    const likeCount =
        document.getElementById(
            "likeCount"
        );


    if (likeCount) {

        likeCount.textContent =
            blog.likes;

    }

}


/* =========================================
   DARK MODE
========================================= */

function setupTheme() {

    const themeButton =
        document.getElementById(
            "themeBtn"
        );


    if (!themeButton) {

        return;

    }


    const savedTheme =
        localStorage.getItem(
            "theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark"
        );

        themeButton.textContent =
            "☀️";

    }


    themeButton.addEventListener(
        "click",
        function() {

            document.body.classList.toggle(
                "dark"
            );


            const dark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "theme",
                dark ? "dark" : "light"
            );


            themeButton.textContent =
                dark ? "☀️" : "🌙";

        }
    );

}


/* =========================================
   INITIALIZE WEBSITE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupTheme();

        setupSearch();

        setupBlogForm();

        displayPost();


        if (
            document.getElementById(
                "blogContainer"
            )
        ) {

            displayBlogs(
                getBlogs()
            );

        }

    }
);