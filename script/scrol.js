let lastScrol = 0
const header = document.querySelector('.top-bar')



window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset

    if(currentScroll > lastScrol && currentScroll>100) {
        header.classList.add('hide')
    }else{
        header.classList.remove('hide')
    }lastScrol = currentScroll
})



