// Grab the input of the toggle button
function main() {
    let block_shorts = false;

    function BlockShorts() {
        block_shorts = !block_shorts
        alert("Toggled")
        if (block_shorts == true) {
            let shorts = document.body.querySelectorAll("ytd-reel-shelf-renderer")
            shorts.forEach(short => short.remove())
        }

    }

    button = document.querySelector("sr-only peer")
    alert(button)

}

main()