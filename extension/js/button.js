const buttonInit = (onActivate, onDeactivate) => {
    //new section in header
    const li = document.createElement("li");
    li.setAttribute("id", "extension-li")
    li.classList.add("global-nav__primary-item");

    const imageLi = document.createElement("li");
    imageLi.setAttribute("id", "image-li");
    imageLi.classList.add("global-nav__primary-item");

    //block subtitle
    const label = document.createElement("span");
    label.setAttribute("id", "is-active-span");
    label.classList.add("global-nav__primary-link-text");
    label.innerText = "Off";

    //swapper
    const swapper = document.createElement("label");
    swapper.classList.add("switch");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("change", e => {
        const {
            checked
        } = e.target;
        setActive(checked);
        label.innerText = checked ? "On" : "Off";

        if (checked) {
            onActivate();
        } else {
            onDeactivate();
        }
        imageLi.classList.toggle("active");
    });
    swapper.append(checkbox);

    const span = document.createElement("span");
    span.classList.add("slider", "round");
    swapper.append(span);

    if (getActive()) {
        checkbox.setAttribute("checked", true);
        label.innerText = "On";
        onActivate();
        imageLi.classList.add("active");
    } else {
        onDeactivate();
        imageLi.classList.remove("active");
    }

    imageLi.insertAdjacentHTML('beforeend', `<img style=" height:40px; width:40px;" src='${iconSrc}'>`);

    //appending subtitle and swapper in new section
    li.append(swapper, label);

    //appending section to header end 
    $('.global-nav__primary-items').append(imageLi);
    $('.global-nav__primary-items').append(li);
}