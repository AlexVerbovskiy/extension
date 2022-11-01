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

const markCommentsSpan = (elem) => markBySpan(
    elem,
    elem.closest(".comments-post-meta__profile-info-wrapper").siblings("a").find(".EntityPhoto-circle-1-ghost-person "),
    "8"
);

//create images near avatars
const normalMark = (elem, size) => {
    //marking element
    elem.addClass("marked");

    //appending icon after elem
    appendIconAfter(size, elem);
}

const markImage = (elem) => normalMark(elem, elem.width() / 4);
const markDiv = (elem) => normalMark(elem, elem.parent().width() / 4);





const findMarkUserWithImage = (mainId, fullName) => {
    $(`img[src*="${mainId}"]:not(.marked)`).each(function () {
        markImage($(this));
    });
    $(`.search-global-typeahead__entity-history-item[aria-label*="${fullName}"]  .ivm-view-attr__img--centered:not(.marked)`).each(function () {
        markImage($(this));
    })
}

const findMarkActualUserPhotos = ({
    mainId,
    firstName,
    lastName,
    partId,
    urn
}) => {
    const fullName = firstName + " " + lastName;

    $("#ember18 .artdeco-dropdown__content-inner").each(function () {
        console.log($(this));
    })

    if (mainId) {
        findMarkUserWithImage(mainId, fullName);
        return;
    }

    $(`a[href*="${partId}"] img:not(.marked, .marker),
        .global-nav__me img:not(.marked, .marker),
        .feed-shared-avatar-image img:not(.marked, .marker),
        a[href*="${urn}"] img[alt*="${fullName}"]:not(.marked),
        #msg-overlay header img:not(.marked, .marker),
        #user-list header img:not(.marked, .marker)
    `).each(function () {
        markImage($(this));
    })

    $(`.artdeco-card.ember-view.pv-top-card .profile-photo-edit__camera-plus,
        a[href*="${urn}"] div[class*="ghost-person"]:not(.marked),
        .job-card-list__insight div[class*='ghost-person']:not(.marked)`).each(function () {
        markDiv($(this));
    })


}

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

    if (mainId) {
        findMarkUserWithImage(mainId, fullName);
        return;
    }

    $(`.pv-top-card-profile-picture img[alt*="${fullName}"]:not(.marked),
        a[href*="${partId}"] img[alt*="${fullName}"]:not(.marked),
        a[href*="${urn}"] img[alt*="${fullName}"]:not(.marked),
        .msg-overlay-conversation-bubble img[alt*="${fullName}"]:not(.marked),
        .msg-overlay-container img[alt*="${fullName}"]:not(.marked),
        .msg-s-event-listitem__seen-receipts img[alt*="${fullName}"]:not(.marked)
    `).each(function () {
        markImage($(this));
    });

    $(`a[href*=${urn}] .EntityPhoto-circle-2-ghost-person:not(.marked),
        a[href*=${urn}] .EntityPhoto-circle-1-ghost-person:not(.marked),
        a[href*=${urn}] .EntityPhoto-circle-5-ghost-person .visually-hidden:not(.marked),
        a[href*=${partId}] .EntityPhoto-circle-4-ghost-person .visually-hidden:not(.marked),
        a[href*=${partId}] .EntityPhoto-circle-6-ghost-person .visually-hidden:not(.marked),
        a[href*=${urn}] .EntityPhoto-circle-3-ghost-person .visually-hidden:not(.marked),
        a[href*=${urn}] .EntityPhoto-circle-0-ghost-person .visually-hidden:not(.marked),
        a[href*="${urn}"] div[class*="ghost-person"]:not(.marked, :has(.visually-hidden)),
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