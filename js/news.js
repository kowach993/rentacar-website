const divNews = document.querySelector("#news")

function xhr_request(callback_function=[], args = {}) {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
            items = xhr.responseXML.querySelectorAll("item")

            for(let callback of callback_function) {
                items = callback(items, args)
            }

            display_data(divNews, items)
            }
            if(xhr.readyState==4 && xhr.status > 400) {
            divNews.innerHTML = `<h1>Error: ${xhr.status}</h1>
            <p>${xhr.statusText}</p>`
            }
        }
        xhr.open("GET", "./news.xml")
        xhr.send()
     }
        

     function display_data(html_element, items) {
         html_element.innerHTML = ""
        for (let item of items) {
            const title = item.querySelector("title").textContent
            const description = item.querySelector("description").textContent
            const pubDate = item.querySelector("pubDate").textContent
            const link = item.querySelector("link").textContent
            const url = item.querySelector("enclosure").getAttribute("url")
            const category = item.querySelector("category").textContent
    
            divNews.innerHTML += 
            `
            <div class="card card_blog" style="width: 18rem;">
               <img src="${url}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 class="card-title">${title}</h5>
               <p class="card-text">${description}</p>
               <p class="article__published">Published on ${pubDate}</p>
               <p>Category: <a class="category_links" href="#category/${category}">${category}</a></p>
            </div>
            <div id="btn_card__blog">
            <a href="${link}" class="btn  btn_blog">Read More</a>
            </div>
            </div>
            `
        }
     }

     function filter_by_category(items, args) {
        const divFilters = document.querySelector("#filters")
        divFilters.innerHTML = `
        <p id="filter_blog__text">Filter by category:</p> <p class='filter_pill'>
        ${args['category']}
        <a href="./blog.html"><button id="close_filter_category">&times;</button></a>  
        </p>`
    
        let filtered_items = []
        for (let item of items) {
            const category = item.querySelector("category").textContent
    
            if(args['category'] == category) {
                filtered_items.push(item)
            }
        }
        return filtered_items
    }

    window.onload = (e) => xhr_request()

    document.body.onclick = (e) => {
        if(e.target.tagName == "A" && 
           e.target.getAttribute("href").indexOf("#category") > -1) {
           const url = e.target.getAttribute("href")
           const split_url = url.split("/")
           xhr_request([filter_by_category],{ "category": split_url[1] })
        } 
    if(e.target.tagName == "BUTTON" && e.target.id == "close_filter_category") {
        xhr_request()
        const divFilters = document.querySelector("#filters")
        divFilters.innerHTML = ""
        }
    }

