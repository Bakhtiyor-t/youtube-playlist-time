let snow = document.getElementById("snow");
let total_playlist_time = document.getElementById('total_playlist_time')
let total_time = ''

snow.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: snowFall,
    }, function (results) {
        total_playlist_time.innerText = results[0].result
    })    
})

function snowFall() {

    function timestrToSec(timestr) {
        let parts = timestr.split(":");
        if (timestr.length > 5)
            return (parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]));
        else
            return parseInt((parts[0]) * 60 + parseInt(parts[1]));
    }

    function pad(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return "" + num;
        }
    }

    function formatTime(seconds) {
        return [pad(Math.floor(seconds / 3600)),
        pad(Math.floor(seconds / 60) % 60),
        pad(seconds % 60),
        ].join(":");
    }

    const URL = document.location.href
    if (!URL.includes('www.youtube.com/playlist?list=')) {
        alert('Sorry this is not youtube play list page')
    } else {
        const all_videos = document.querySelectorAll('div#contents a#thumbnail')
        let total_seconds = 0
        all_videos.forEach(element => {
            let time = element.querySelector('span').textContent.trim()
            total_seconds += timestrToSec(time)
        })
        total_time = formatTime(total_seconds)
        return total_time
    }
}