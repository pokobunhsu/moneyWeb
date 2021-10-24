window.onload = () => {
    getMoney()
}
let refreshBtn = document.querySelector('#refresh')
let luckyNumShow = document.querySelector('#luckyNum')
let dayAlert = document.querySelector('.alert')
let dayArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
let day = new Date()
document.querySelector('#day').textContent = dayArr[day.getDay()]
if (day.getDay() == 5) {
    dayAlert.setAttribute('class', 'alert alert-success')
    document.querySelector('#msg').textContent = "就是今天開獎喔!下午四點過後再來看吧!"
} else {
    dayAlert.setAttribute('class', 'alert alert-danger')
    document.querySelector('#msg').textContent = "不是開獎日喔"
}


let getMoney = () => {
    fetch("https://pokobun-api.herokuapp.com/api/getMoney").then((res) => {
        return res.json()
    }).then((data) => {
        luckyNumShow.textContent = data.LuckyNum
        document.querySelector('#time').textContent = data.dataTime
        refreshBtn.setAttribute('style', 'display:inline;')
    }).catch((err) => {
        luckyNumShow.textContent = "無法從伺服器取得資料"
        refreshBtn.setAttribute('style', 'display:inline;')
    })
}

document.querySelector('#refresh').addEventListener('click', () => {
    refreshBtn.setAttribute('style', 'display:none;')
    luckyNumShow.innerHTML = `<div class="spinner-grow text-success" role="status"><span class="visually-hidden">Loading...</span></div> 更新資料中...`
    document.querySelector('#time').textContent = ""
    getMoney()
})