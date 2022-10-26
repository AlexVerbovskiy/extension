const userElementGenerate = user => {
    const fullName = user["first_name"] + " " + user["last_name"];
    const url = user["url"] || "https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q";

    return `<li class="user-element msg-overlay-list-bubble-search__list-item display-flex align-items-center pv2 ph3" data-id=${user["id"]}>
    <div class="display-flex align-items-center overflow-hidden" tabindex="-1">
        <div class="msg-overlay-search-result-picture circle display-flex flex-shrink-zero">
            <img src="${url}" loading="lazy"
                alt="${fullName}" id="ember369"
                class="lazy-image msg-overlay-search-result-picture__background-img full-width full-height round ghost-person ember-view">
        </div>

        <div class="display-flex overflow-hidden pv1 pl2">
            <h4 class="msg-overlay-search-result-name t-12 t-black t-bold flex-shrink-zero truncate">
            ${fullName}
            </h4>
        </div>
    </div>
</li>`;
}

const userElementRemove = () => $('.user-element').remove();

const usersElementsActivate = () => {
    $(".user-element").click(function () {
        console.log($(this).data("id"));
    })
}

const usersNotFoundGenerate = () => {
    const noUsers = `<div class="msg-overlay-list-bubble__default-conversation-container">
    <div class="msg-overlay-list-bubble__conversations-list">
            <div class="msg-overlay-abi text-align-center ph6">
                <div class="msg-overlay-list-bubble__illustration msg-overlay-abi__illustration"></div>
                <h4 class="t-16 t-black t-bold">
                No users found
                </h4>
            </div>
        </div>

        <div>
    </div>
</div>
    `;
    $("#user-list-section").append(noUsers);
}

const userNotFountRemove = () => $(".msg-overlay-list-bubble__default-conversation-container").remove();

const userListInit = (url, firstName, lastName) => {

    let isActive = false;
    let text = "";
    let start = 0;
    let canDownload = true;

    const downloadUsers = () => {
        if (!canDownload) return;

        const users = getUsersByStart()(start, text);
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));

        usersElementsActivate();

        start += users.length;
        if (users.length < 10) canDownload = false;
        if (start === 0) usersNotFoundGenerate();
    }

    const onChangeText = (value) => {
        userElementRemove();
        userNotFountRemove();
        text = value;
        start = 0;
        canDownload = true;
        downloadUsers();
    }

    const getPath = () => {
        if (isActive) return "M1 5l7 4.61L15 5v2.39L8 12 1 7.39z";
        return "M15 11L8 6.39 1 11V8.61L8 4l7 4.61z";
    }

    const header = `<header id="user-list-header" class="msg-overlay-bubble-header">
    <div class="msg-overlay-bubble-header__badge-container"></div>
  
    <div class="msg-overlay-bubble-header__details flex-row align-items-center ml1">
        <div class="presence-entity presence-entity--size-1">
            <img src=" ${url} " loading="lazy" alt="${firstName} ${lastName}" id="ember177"
                class="presence-entity__image EntityPhoto-circle-1  lazy-image ember-view">
        </div>
        <button class="msg-overlay-bubble-header__button truncate ml2" type="button">
            <span class="truncate t-14 t-bold
      t-black">
                <span aria-hidden="true">
                    Users
                </span>
            </span>
        </button>

    </div>
    <div class="msg-overlay-bubble-header__controls display-flex">
        <button id="ember182"
            class="msg-overlay-bubble-header__control msg-overlay-bubble-header__control--new-convo-btn artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--1 artdeco-button--tertiary ember-view">
            <li-icon aria-hidden="true" type="chevron-down" class="artdeco-button__icon" size="small"><svg
                id="user-list-icon"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16"
                    fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
                    <path d="${getPath()}"></path>
                </svg></li-icon>
        </button>
    </div>
</header>
`;

    const searchBar = `<div id="user-list-search-bar" class="msg-overlay-list-bubble-search
    ">
  <div class="msg-overlay-list-bubble-search__input-container">
      <label class="a11y-text" for="msg-overlay-list-bubble-search__search-typeahead-input">
        Start typing a query to search user contacts by name
      </label>
      <li-icon aria-hidden="true" type="search" class="msg-overlay-list-search__search-icon" size="small"><svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor"
              class="mercado-match" width="16" height="16" focusable="false">
              <path
                  d="M14.56 12.44L11.3 9.18a5.51 5.51 0 10-2.12 2.12l3.26 3.26a1.5 1.5 0 102.12-2.12zM3 6.5A3.5 3.5 0 116.5 10 3.5 3.5 0 013 6.5z">
              </path>
          </svg></li-icon>
      <input id="msg-overlay-list-bubble-search__search-typeahead-input"
          class="ember-text-field ember-view msg-overlay-list-bubble-search__search-typeahead-input"
          placeholder="Searching users" autocomplete="off" type="text">
  </div>

  <div class="relative display-flex justify-center flex-column overflow-hidden">
      <div class="msg-overlay-list-bubble-search-content">
          <div class="msg-overlay-list-bubble-search__search-result-container">
            <ul id="user-list-elem" class="msg-overlay-list-bubble-search__connection-search-result-list">
            </ul>
          </div>
      </div>
  </div>
</div>
`;

    const section = `<section id="user-list-section" class="scrollable msg-overlay-list-bubble__content msg-overlay-list-bubble__content--scrollable">
    <div></div>
</section>
`

    const userBlock = `<aside id="user-list" class="msg-overlay-container msg-overlay-container-reflow" style="
    left: 0; right:auto;">
    <div tabindex="-1" class="msg-overlay-list-bubble  msg-overlay-list-bubble--is-minimized ml4">
        ${header}
    </div>

    <div id="msg-overlay__emoji-hoverable-outlet"></div>

    <div id="msg-overlay__reactor-list-outlet"></div>
</aside>
`;
    $(".artdeco-toasts").append(userBlock);

    $("#user-list-header").click(function () {
        isActive = !isActive;
        const newPath = getPath();
        $("#user-list-icon path").attr("d", newPath);
        $("#user-list>.msg-overlay-list-bubble").removeClass("msg-overlay-list-bubble--is-minimized");

        if (isActive) {
            $("#user-list-header").after(searchBar, section);
            downloadUsers();

            $("#msg-overlay-list-bubble-search__search-typeahead-input").on('input', function () {
                onChangeText($(this).val());
            });

            $(function () {
                $('#user-list-elem').on('scroll', function (e) {
                    if ($(this).prop('scrollHeight') - $(this).prop('scrollTop') <= $(this).prop('clientHeight')) {
                        console.log("bottom");
                    }
                });
            })

        } else {
            $("#user-list>.msg-overlay-list-bubble").addClass("msg-overlay-list-bubble--is-minimized");
            $("#user-list-section").remove();
            $("#user-list-search-bar").remove();
            $("#user-list-elem").empty();
        }
    })
}

const userListDestroy = () => $("#user-list").remove();