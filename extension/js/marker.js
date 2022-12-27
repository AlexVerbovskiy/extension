//mark span and if element hasn't marker, append it
const markBySpan = (elem, searchingElem, size) => {
    elem.addClass("marked");
    if (!searchingElem || searchingElem.next().hasClass("marker")) return;
    appendIconAfter(size, searchingElem);
}

const markAnalyticsSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest(".member-analytics-addon-entity-list__entity-content ").prev().find(".EntityPhoto-circle-3-ghost-person "),
        "20"
    );

    markBySpan(
        elem,
        elem.closest(".member-analytics-addon-entity-list__entity-content ").prev().find("img"),
        "20"
    );
}

const markGroupAddSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest(".flex-1.inline-block.align-self-center.pl2.mr5").prev().find(".EntityPhoto-circle-4-ghost-person"),
        "20"
    );
}

const markFindedSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest(".search-global-typeahead__hit--entity-with-search-icon").find("img, div"),
        "10"
    );
}

const markVisitedSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest(".search-typeahead-v2__hit").find("img, div"),
        "10"
    )
}

const markContactSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest(".abi-saved-contacts-row__details").prev().find("img"),
        "20"
    );
}

const markGroupListSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest("li").find(".EntityPhoto-circle-1-ghost-person"),
        "10"
    );
}

const markChatListSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest(".msg-conversation-card.msg-conversations-container__pillar").find(".ghost-person.ember-view"),
        "14"
    );
}

const markGroupUser = (elem) => {
    markBySpan(
        elem,
        elem.closest("div.p4").find("div[class*='ghost-person'"),
        "14"
    );
}

const markCommentsSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest(".comments-post-meta__profile-info-wrapper").siblings("a").find(".EntityPhoto-circle-1-ghost-person "),
        "8"
    );
}

//maark image and div
const normalMark = (elem, size) => {
    //marking element
    elem.addClass("marked");

    //appending icon after elem
    appendIconAfter(size, elem);
}

const markImage = (elem) => normalMark(elem, elem.width() / 4);
const markDiv = (elem) => normalMark(elem, elem.parent().width() / 4);




//find and mark user images(work with all users which have images)
const findMarkUserWithImage = (mainId, fullName) => {
    $(`img[src*="${mainId}"]:not(.marked), 
        .search-global-typeahead__entity-history-item[aria-label*="${fullName}"]  .ivm-view-attr__img--centered:not(.marked)`).each(function () {
        markImage($(this));
    });
}

//find and mark actual user images or block which contains info about actual user photo
const findMarkActualUserPhotos = ({
    mainId,
    firstName,
    lastName,
    partId,
    urn
}) => {
    const fullName = firstName + " " + lastName;

    if (mainId) {
        findMarkUserWithImage(mainId, fullName);
        return;
    }

    //if user hasn't image find him by names, urls and ids(where it can be realized)
    $(`a[href*="${partId}"] img:not(.marked, .marker),
        .global-nav__me img:not(.marked, .marker),
        .comments-comment-box__avatar-image img[alt*="${fullName}"]:not(.marked),
        a[href*="${urn}"] img[alt*="${fullName}"]:not(.marked),
        #msg-overlay header img:not(.marked, .marker),
        #user-list header img:not(.marked, .marker),
        .pv-profile-sticky-header-v2__container img[alt*="${fullName}"]:not(.marked),
        .share-creation-state__member-info img[alt*="${fullName}"]:not(.marked),
        .feed-shared-social-action-bar__action-button .artdeco-button__text img[alt*="${fullName}"]:not(.marked),
        #artdeco-modal-outlet .artdeco-entity-lockup__image.artdeco-entity-lockup__image--type-circle img[alt*="${fullName}"]:not(.marked)
    `).each(function () {
        markImage($(this));
    })


    $(`.artdeco-card.ember-view.pv-top-card .profile-photo-edit__camera-plus,
        a[href*="${urn}"] div[class*="ghost-person"]:not(.marked),
        a[href*="${partId}"] .EntityPhoto-circle-3-ghost-person .visually-hidden:not(.marked),
        .job-card-list__insight div[class*='ghost-person']:not(.marked)`).each(function () {
        markDiv($(this));
    })


}

//find and mark actual user images or block which contains info about all users
const findMarkUserPhotos = ({
    mainId,
    firstName,
    lastName,
    partId,
    urn
}) => {

    const fullName = firstName + " " + lastName;

    $(`.search-global-typeahead__hit--all-suggestions-ui .search-global-typeahead__hit-text:contains("${fullName.toLowerCase()}"):not(.marked)`).each(function () {
        markFindedSpan($(this));
    });

    $(`.search-typeahead-v2__hit span:contains("${fullName.toLowerCase()}"):not(.marked)`).each(function () {
        markVisitedSpan($(this));
    });

    $(`.contact-summary__name:contains("${fullName}"):not(.marked)`).each(function () {
        markContactSpan($(this));
    })

    $(`#msg-overlay img[alt*="${fullName}"]:not(.marked)`).each(function () {
        markImage($(this));
    });

    if (mainId) {
        findMarkUserWithImage(mainId, fullName);
        return;
    }

    //if user hasn't image find him by names, urls and ids(where it can be realized)

    $(`.pv-top-card-profile-picture img[alt*="${fullName}"]:not(.marked),
        a[href*="${partId}"] img[alt*="${fullName}"]:not(.marked),
        a[href*="${urn}"] img[alt*="${fullName}"]:not(.marked),
        .msg-overlay-conversation-bubble img[alt*="${fullName}"]:not(.marked),
        .msg-overlay-container img[alt*="${fullName}"]:not(.marked),
        .msg-s-event-listitem__seen-receipts img[alt*="${fullName}"]:not(.marked),
        .pv-profile-sticky-header-v2__container img[alt*="${fullName}"]:not(.marked)
    `).each(function () {
        markImage($(this));
    });

    $(`a[href*="${urn}"] .EntityPhoto-circle-2-ghost-person:not(.marked),
        a[href*="${urn}"] .EntityPhoto-circle-1-ghost-person:not(.marked),
        a[href*="${urn}"] .EntityPhoto-circle-5-ghost-person .visually-hidden:not(.marked),
        a[href*="${partId}"] .EntityPhoto-circle-4-ghost-person .visually-hidden:not(.marked),
        a[href*="${partId}"] .EntityPhoto-circle-6-ghost-person .visually-hidden:not(.marked),
        a[href*="${urn}"] .EntityPhoto-circle-3-ghost-person .visually-hidden:not(.marked),
        a[href*="${urn}"] .EntityPhoto-circle-0-ghost-person .visually-hidden:not(.marked),
        a[href*="${urn}"] div[class*="ghost-person"]:not(.marked, :has(.visually-hidden)),
        a[href*="${partId}"] .EntityPhoto-circle-3-ghost-person .visually-hidden:not(.marked),
        .search-global-typeahead__entity-history-item[aria-label*="${fullName}"] .EntityPhoto-circle-2-ghost-person:not(.marked)
    `).each(function () {
        markDiv($(this));
    });

    $(`.member-analytics-addon-entity-list__entity-content span[aria-hidden="true"]:contains("${fullName}"):not(.marked)`).each(function () {
        markAnalyticsSpan($(this));
    });

    $(`.scaffold-finite-scroll__content .flex-1.inline-block.align-self-center.pl2.mr5>.t-16.t-black.t-bold:contains("${fullName}"):not(.marked)`).each(function () {
        markGroupAddSpan($(this));
    });

    $(`.invitee-picker-selected-members-pane__list .t-14.t-bold.flex-1.ml2.truncate:contains("${fullName}"):not(.marked)`).each(function () {
        markGroupListSpan($(this));
    });

    $(`.msg-conversation-listitem__participant-names:contains("${fullName}"):not(.marked)`).each(function () {
        markChatListSpan($(this));
    });

    $(`.artdeco-card.ember-view p.flex-shrink-1.t-14.t-black.t-normal:contains("${fullName}"):not(.marked)`).each(function () {
        markGroupUser($(this));
    });
}