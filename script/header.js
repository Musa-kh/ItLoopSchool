const topBar = document.querySelector('.top-bar');
let logo = document.querySelector('.logo');
let navContainer = document.querySelector('.nav-container');

let isMoved = false;
let newDiv = null;
let mobileHeader = null;

function handleResize() {
    if (window.innerWidth <= 1000 && !isMoved) {

        // создаём mobile-header
        mobileHeader = document.createElement('div');
        mobileHeader.className = 'mobile-header';

        // создаём mobile-controls
        newDiv = document.createElement('div');
        newDiv.className = 'mobile-controls';

        const menuBtn = logo.querySelector('#menuBtn');
        const languageSwitcher = navContainer.querySelector('.language-switcher');

        if (menuBtn) newDiv.appendChild(menuBtn);
        if (languageSwitcher) newDiv.appendChild(languageSwitcher);

        // переносим logo в mobile-header
        const logoParent = logo.parentNode;
        logoParent.insertBefore(mobileHeader, logo);
        mobileHeader.appendChild(logo);
        mobileHeader.appendChild(newDiv);

        // переносим nav отдельно
        const nav = navContainer.querySelector('.nav');
        if (nav) topBar.appendChild(nav);

        navContainer.remove();
        isMoved = true;
    }

    else if (window.innerWidth > 1000 && isMoved) {

        // возвращаем nav-container
        navContainer = document.createElement('div');
        navContainer.className = 'nav-container';

        const nav = topBar.querySelector('.nav');
        if (nav) navContainer.appendChild(nav);

        if (newDiv) {
            const menuBtn = newDiv.querySelector('#menuBtn');
            const languageSwitcher = newDiv.querySelector('.language-switcher');

            if (menuBtn) logo.appendChild(menuBtn);
            if (languageSwitcher) navContainer.appendChild(languageSwitcher);

            newDiv.remove();
        }

        // возвращаем logo на место
        if (mobileHeader) {
            topBar.insertBefore(logo, mobileHeader);
            mobileHeader.remove();
        }

        topBar.appendChild(navContainer);

        isMoved = false;
    }
}

// старт
handleResize();
window.addEventListener('resize', handleResize);


