//build block with another user info
const userElementGenerate = user => {
    const fullName = user["first_name"] + " " + user["last_name"];
    const url = user["image"] || defaultUserImg;

    return `<li class="user-element msg-overlay-list-bubble-search__list-item display-flex align-items-center pv2 ph3" data-id=${user["urn"]}>
    <div class="display-flex align-items-center overflow-hidden" tabindex="-1">
        <div class="msg-overlay-search-result-picture circle display-flex flex-shrink-zero">
            <img src="${url}" loading="lazy"
                alt="${fullName}" id="ember369"
                class="lazy-image msg-overlay-search-result-picture__background-img full-width full-height round ghost-person ember-view">
        </div>

        <div class="overflow-hidden pv1 pl2">
            <h4 class="msg-overlay-search-result-name t-12 t-black t-bold flex-shrink-zero truncate">
            ${fullName}
            </h4>
            ${user["status"]
                ?
                `<span class="online">online</span>`
                :
                `<span>${getTimeActive(user["last_active"])}</span>`
            }
        </div>
    </div>
</li>`;
}

//remove list with users
const userElementRemove = () => $('.user-element').remove();

//appending event on click(redirect to user profile)
const usersElementsActivate = () => {

    const getLink = elem => "/in/" + elem.data("id");

    $(".user-element").click(function () {
        window.location = getLink($(this));
    })
    $(".user-element img").on('error', function () {
        const li = $(this).parent().parent().parent();
        const url = getLink(li);
        $(this).attr('src', defaultUserImg);
        appendIconAfter('9', $(this));
        fetch(url).then(res => res.text()).then(data => {
            const part = "https://media.licdn.com" + data.split("media.licdn.com")[1];
            const link_1 = part.split('&quot;')[0];
            const link_2 = '100_100' + data.split('100_100')[1].split(',')[0];
            let temp = link_1 + link_2;
            temp = temp.replaceAll('&#61;', '=');
            temp = temp.replaceAll('amp;', '');
            temp = temp.replaceAll('&quot;', '');
            $(this).attr('src', temp);
            saveOtherUserImg(li.data("id"), temp);
        }).catch(err => {
            saveOtherUserImg(li.data("id"), '');
        });
    })
}

//build block with info about lack of users
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

//remove block with info about lack of users
const userNotFountRemove = () => $("#user-list .msg-overlay-list-bubble__default-conversation-container").remove();

//build header list with some info about actual user
const getHeaderHtml = ({
    url,
    firstName,
    lastName
}, getPath) => `<header id="user-list-header" class="msg-overlay-bubble-header">
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
                    Linkedating
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

//static search bar html code
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

//static main list section html code
const section = `<section id="user-list-section" class="scrollable msg-overlay-list-bubble__content msg-overlay-list-bubble__content--scrollable">
    <div></div>
</section>
`
//main block under header(this block shows, when user click on header for first time)
const getListBlockHtml = (params, getPath) => `<aside id="user-list" class="msg-overlay-container msg-overlay-container-reflow" style="
    left: 0; right:auto;">
    <div tabindex="-1" class="msg-overlay-list-bubble  msg-overlay-list-bubble--is-minimized ml4">
        ${getHeaderHtml(params, getPath)}
    </div>

    <div id="msg-overlay__emoji-hoverable-outlet"></div>

    <div id="msg-overlay__reactor-list-outlet"></div>
</aside>
`;

//main list function
const userListInit = (params) => {

    //is active list(if active, show block with users)
    let isActive = false;

    //text - value in search bar, start - next user position in array, 
    //canDownload - if userlist show all users, block all event's to build new users
    //cachedUsers - local saved users
    let text, start, canDownload, cachedUsers;

    //timer which update rebuild user list
    let updateUsersTimeout = null;
    const stopTimeout = () => clearTimeout(updateUsersTimeout);

    //if list opened and user doesn't scroll it, call updating users after a certain time
    const startTimeout = () => {
        updateUsersTimeout = setTimeout(() => {
            cachedUsers = getUsers();

            //before resetting state, save info about text in searchbar
            const temp = text;
            stateReset();
            text = temp;

            //rebuild user list
            userElementRemove();
            downloadUsers();

            //call update after a certain time
            startTimeout();
        }, listUsersUpdateTime)
    }

    //reset state to base value
    const stateReset = () => {
        text = "";
        start = 0;
        canDownload = true;
        cachedUsers = getUsers();
    }

    //get more users from storage and show them
    const downloadUsers = () => {
        if (!canDownload) return;

        //delete block with info about lack users
        if (start == 0) userNotFountRemove();

        //get new users, build them and activate
        const users = filterUsers(cachedUsers, start, text);
        users.forEach(user => $("#user-list-elem").append(userElementGenerate(user)));
        usersElementsActivate();

        start += users.length;

        //if users wasn't found, show info about it
        if (users.length < 10) canDownload = false;
        if (start === 0) usersNotFoundGenerate();
    }

    //when user input text in search bar - rebuild user - list
    const onChangeText = (value) => {
        userElementRemove();
        userNotFountRemove();
        text = value;
        start = 0;
        canDownload = true;
        downloadUsers();
    }

    //show arrow icon bottom or down if user list active or not
    const getPath = () => {
        if (isActive) return "M1 5l7 4.61L15 5v2.39L8 12 1 7.39z";
        return "M15 11L8 6.39 1 11V8.61L8 4l7 4.61z";
    }

    //build header in mainBlock
    $(".artdeco-toasts").append(getListBlockHtml(params, getPath));

    $("#user-list-header").click(function () {
        //on click header change isActive value< get new icon path and rebuild icon in header
        isActive = !isActive;
        const newPath = getPath();
        $("#user-list-icon path").attr("d", newPath);
        $("#user-list>.msg-overlay-list-bubble").removeClass("msg-overlay-list-bubble--is-minimized");


        if (isActive) {
            //if list visible - reset sdtate to base, append search bar and main section to block
            stateReset();
            $("#user-list-header").after(searchBar, section);

            //start updating users after few seconds
            startTimeout();

            //show users in list
            downloadUsers();

            //bind event listener on change text with search bar
            $("#msg-overlay-list-bubble-search__search-typeahead-input").on('input', function () {
                onChangeText($(this).val());
            });

            //start listening scrolling user list
            //if user return block to zero position, start updating users
            //if user scrolled - stop updating
            $(function () {
                $('#user-list-elem').on('scroll', function (e) {
                    const scrollHeight = $(this).prop('scrollHeight');
                    const scrollTop = $(this).prop('scrollTop');
                    const clientHeight = $(this).prop('clientHeight');

                    if (scrollHeight - scrollTop <= clientHeight) {
                        downloadUsers();
                    }

                    if (scrollTop === 0) {
                        startTimeout();
                    } else {
                        stopTimeout();
                    }
                });
            })

        } else {
            //if list hidden - remove user list, remove search bar and main block
            $("#user-list>.msg-overlay-list-bubble").addClass("msg-overlay-list-bubble--is-minimized");
            $("#user-list-section").remove();
            $("#user-list-search-bar").remove();
            $("#user-list-elem").empty();
        }
    })
}

const userListDestroy = () => $("#user-list").remove();