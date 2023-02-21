var toggleSwitch = document.querySelector('.switch input[type="checkbox"]');
var getCookie = name => {
    var cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim().split('=')
        if (c[0] === name) {
          return decodeURIComponent(c[1])
        }
    }
    return ''
}

function checkTheme() {
    if (getCookie('theme') == 'dark-theme') {
        document.body.className = 'dark-theme';
    } else {
        document.body.className = 'light-theme';
    }
}

function switchTheme() {
    if (getCookie('theme') == 'light-theme') {
        document.body.className = 'dark-theme';
        document.cookie = 'theme=dark-theme';
    }
    else {
        document.body.className = 'light-theme';
        document.cookie = 'theme=light-theme';
    }    
}

checkTheme();
toggleSwitch.addEventListener('change', switchTheme, false);
