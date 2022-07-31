(function () {
    let oUl = document.querySelector("#main ul.list");
    [...oUl.children].forEach((ele, i) => {
        ele.onclick = function (e) {
            let show = document.createElement("div");
            show.className = "show"
            let mask = document.createElement("div");
            mask.className = "mask"
            mask.onclick = function (e) {
                let show = document.getElementsByClassName("show");
                document.body.removeChild(show[0])
            }
            show.appendChild(mask)
            let img = document.createElement("img");
            img.src = e.target.src
            img.width = img.naturalWidth * .45
            img.height = img.naturalHeight * .45
            show.appendChild(img)
            document.body.appendChild(show)
        }
    })
})();
