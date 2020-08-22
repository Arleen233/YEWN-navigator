const x = localStorage.getItem('x')

const xObject = JSON.parse(x)

const hashMap = xObject || [{
        logo: 'J',
        logoType: 'text',
        url: 'https://juejin.im',
        color:'#ff99cc'
    },
    {
        logo: 'B',
        logoType: 'text',
        url: 'https://bilibili.com',
        color:'#66cccc'
    }
]
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const colorArr = ["#66cccc", "#ccff66", "#ff99cc", "#ff9999", "#ffcc99", "#ff6666", "#ffff66", "#666699", "#ff9900", "#66cccc", "#99cc33", "#993366", "#cccc33", "#666633", "#ccff00"];

const simplifyUrl = (url) => {
    return url.replace('https://', ''
            .replace('http://', ''))
        .replace('www.', '')
        .replace('/\/.*/', '')
}

const randomColor = () => {
    let length = colorArr.length;
    return Math.floor(Math.random() * (length - 1));
}
// console.log(colorArr[randomColor()])

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>    
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi)
        //随机设置颜色
        $li.find('.logo').css("color",node.color)
        $li.on('click', () => {
            console.log(node.url)
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })

    })
}

render()

$(".addButton")
    .on('click', () => {
        let url = window.prompt("请输入您想要添加的网址")
        if (url.indexOf('https://') !== 0) {
            url = 'https://www.' + url
        }
        hashMap.push({
            logo: `${simplifyUrl(url)[0]}`,
            logoType: 'text',
            url: `${url}`,
            color:`${colorArr[randomColor()]}`
        })
        localStorage.setItem('x', JSON.stringify(hashMap))
        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const {
        key
    } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})