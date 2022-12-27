const buttonInit = (onActivate, onDeactivate) => {
    //new section in header
    const li = document.createElement("li");
    li.setAttribute("id", "linkdating-li")
    li.classList.add("global-nav__primary-item");

    const imageLi = document.createElement("li");
    imageLi.setAttribute("id", "image-li");
    imageLi.classList.add("global-nav__primary-item");

    const liInnerText = `
<button aria-expanded="false" class="global-nav__primary-link
    global-nav__primary-item--divider" type="button">
    <span class="global-nav__primary-link-text" title="linkDating">
    <span></span>
    <li-icon aria-hidden="true" type="caret" size="small">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
            <path d="M8 11L3 6h10z" fill-rule="evenodd"></path>
        </svg>
    </li-icon>
  </span>
</button>`;

    function changeActive() {
        if (getActive()) {
            onActivate();
            imageLi.classList.add("active");
            li.classList.add('active');
            li.querySelector('.global-nav__primary-link-text span').innerHTML = 'On';
        } else {
            onDeactivate();
            imageLi.classList.remove("active");
            li.classList.remove('active');
            li.querySelector('.global-nav__primary-link-text span').innerHTML = 'Off';
        }
    }

    if ($('html').hasClass('theme--dark')) {
        imageLi.insertAdjacentHTML('beforeend', `<img style=" height:40px; width:40px;" src='${darkLogoSrc}'>`);
    } else {
        imageLi.insertAdjacentHTML('beforeend', `<img style=" height:40px; width:40px;" src='${logoSrc}'>`);
    }

    //appending subtitle and swapper in new section
    li.insertAdjacentHTML('beforeend', liInnerText);
    li.querySelector(".global-nav__primary-link-text").addEventListener('click', () => {
        setActive(!getActive());
        changeActive();
    });

    //appending section to header end 
    $('.global-nav__primary-items').append(imageLi);
    $('.global-nav__primary-items').append(li);
    changeActive();
}