/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/commits/commits.ts":
/*!********************************!*\
  !*** ./src/commits/commits.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUsersCommits": () => (/* binding */ getUsersCommits),
/* harmony export */   "getCommitsForAllSprints": () => (/* binding */ getCommitsForAllSprints)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function getUsersCommits(entities) {
    var usersCommitsMap = new Map();
    if (!entities)
        return usersCommitsMap;
    entities.reduce(function (acc, cur) {
        if (cur.type !== 'Commit')
            return acc;
        var authorId = typeof cur.author === 'number' ? cur.author : cur.author.id;
        var userCommits = acc.get(authorId) || 0;
        acc.set(authorId, userCommits + 1);
        return acc;
    }, usersCommitsMap);
    return usersCommitsMap;
}
function getCommitsForAllSprints(sprints, entities, currentSprintId) {
    return sprints.map(function (sprint) {
        var commits = entities.reduce(function (acc, cur) {
            if (cur.type !== 'Commit' ||
                cur.timestamp < sprint.startAt ||
                cur.timestamp > sprint.finishAt) {
                return acc;
            }
            return acc + 1;
        }, 0);
        var result = { title: "" + sprint.id, hint: sprint.name, value: commits };
        if (sprint.id === currentSprintId) {
            return __assign(__assign({}, result), { active: true });
        }
        return result;
    });
}


/***/ }),

/***/ "./src/likes/likes.ts":
/*!****************************!*\
  !*** ./src/likes/likes.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUsersLikes": () => (/* binding */ getUsersLikes)
/* harmony export */ });
function getUsersLikes(entities) {
    var userLikesMap = new Map();
    if (!entities)
        return userLikesMap;
    entities.reduce(function (acc, cur) {
        if (cur.type !== 'Comment')
            return acc;
        var authorId = typeof cur.author === 'number' ? cur.author : cur.author.id;
        var userLikes = acc.get(authorId) || 0;
        acc.set(authorId, userLikes + cur.likes.length);
        return acc;
    }, userLikesMap);
    return userLikesMap;
}


/***/ }),

/***/ "./src/prepareData.ts":
/*!****************************!*\
  !*** ./src/prepareData.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_slides_slidesConfiguration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/slides/slidesConfiguration */ "./src/slides/slidesConfiguration.ts");
/* harmony import */ var src_slides_slides__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/slides/slides */ "./src/slides/slides.ts");
/* harmony import */ var src_likes_likes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/likes/likes */ "./src/likes/likes.ts");
/* harmony import */ var src_commits_commits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/commits/commits */ "./src/commits/commits.ts");
/* harmony import */ var src_users_users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/users/users */ "./src/users/users.ts");
/* harmony import */ var src_sprints_sprints__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/sprints/sprints */ "./src/sprints/sprints.ts");
/* module decorator */ module = __webpack_require__.hmd(module);






function prepareData(entities, _a) {
    var sprintId = _a.id;
    var sprints = (0,src_sprints_sprints__WEBPACK_IMPORTED_MODULE_5__.getSortedSprints)(entities);
    var users = (0,src_users_users__WEBPACK_IMPORTED_MODULE_4__.getUsers)(entities);
    var currentSprint = (0,src_sprints_sprints__WEBPACK_IMPORTED_MODULE_5__.findCurrentSprint)(sprints, sprintId);
    var sprintEntities = (0,src_sprints_sprints__WEBPACK_IMPORTED_MODULE_5__.getSprintEntities)(entities, currentSprint);
    var currentSprintUsersCommitsMap = (0,src_commits_commits__WEBPACK_IMPORTED_MODULE_3__.getUsersCommits)(sprintEntities);
    var currentSprintUsersLikesMap = (0,src_likes_likes__WEBPACK_IMPORTED_MODULE_2__.getUsersLikes)(sprintEntities);
    var sprintsCommits = (0,src_commits_commits__WEBPACK_IMPORTED_MODULE_3__.getCommitsForAllSprints)(sprints, entities, currentSprint.id);
    var dataForSlides = {
        leaders: {
            users: users,
            usersCommitsMap: currentSprintUsersCommitsMap,
        },
        vote: {
            users: users,
            usersLikesMap: currentSprintUsersLikesMap,
        },
        chart: {
            users: users,
            usersCommitsMap: currentSprintUsersCommitsMap,
            commits: sprintsCommits,
        },
        diagram: {},
        activity: {},
    };
    var stories = [];
    src_slides_slidesConfiguration__WEBPACK_IMPORTED_MODULE_0__.slidesConfiguration.forEach(function (slideConfig) {
        var slideData = dataForSlides[slideConfig.alias];
        var slide = (0,src_slides_slides__WEBPACK_IMPORTED_MODULE_1__.transformDataToSlide)(slideConfig, slideData, currentSprint);
        stories.push(slide);
    });
    return stories;
}
module.exports = { prepareData: prepareData };


/***/ }),

/***/ "./src/slides/chart.ts":
/*!*****************************!*\
  !*** ./src/slides/chart.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toChart": () => (/* binding */ toChart)
/* harmony export */ });
/* harmony import */ var src_users_users__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/users/users */ "./src/users/users.ts");

function toChart(slideConfig, slideData, currentSprint) {
    var commits = slideData.commits, users = slideData.users, usersCommitsMap = slideData.usersCommitsMap;
    var title = slideConfig.title, transformValue = slideConfig.valueText;
    var slideUsers = (0,src_users_users__WEBPACK_IMPORTED_MODULE_0__.mapUsersToValuesForSlide)(users, usersCommitsMap, transformValue);
    return {
        title: title,
        subtitle: currentSprint.name,
        values: commits,
        users: slideUsers,
    };
}


/***/ }),

/***/ "./src/slides/leaders.ts":
/*!*******************************!*\
  !*** ./src/slides/leaders.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toLeaders": () => (/* binding */ toLeaders)
/* harmony export */ });
/* harmony import */ var src_users_users__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/users/users */ "./src/users/users.ts");

function toLeaders(slideConfig, slideData, currentSprint) {
    var users = slideData.users, usersCommitsMap = slideData.usersCommitsMap;
    var title = slideConfig.title, emoji = slideConfig.emoji, transformValue = slideConfig.valueText;
    var slideUsers = (0,src_users_users__WEBPACK_IMPORTED_MODULE_0__.mapUsersToValuesForSlide)(users, usersCommitsMap, transformValue);
    return {
        title: title,
        subtitle: currentSprint.name,
        emoji: emoji,
        users: slideUsers,
    };
}


/***/ }),

/***/ "./src/slides/slides.ts":
/*!******************************!*\
  !*** ./src/slides/slides.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transformDataToSlide": () => (/* binding */ transformDataToSlide)
/* harmony export */ });
/* harmony import */ var src_slides_leaders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/slides/leaders */ "./src/slides/leaders.ts");
/* harmony import */ var src_slides_vote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/slides/vote */ "./src/slides/vote.ts");
/* harmony import */ var src_slides_chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/slides/chart */ "./src/slides/chart.ts");



var transformDataMap = {
    leaders: src_slides_leaders__WEBPACK_IMPORTED_MODULE_0__.toLeaders,
    vote: src_slides_vote__WEBPACK_IMPORTED_MODULE_1__.toVote,
    chart: src_slides_chart__WEBPACK_IMPORTED_MODULE_2__.toChart,
    diagram: function () { return ({}); },
    activity: function () { return ({}); },
};
function transformDataToSlide(slideConfig, slideData, currentSprint) {
    var transform = transformDataMap[slideConfig.alias];
    var data = transform(slideConfig, slideData, currentSprint);
    return {
        alias: slideConfig.alias,
        data: data,
    };
}


/***/ }),

/***/ "./src/slides/slidesConfiguration.ts":
/*!*******************************************!*\
  !*** ./src/slides/slidesConfiguration.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slidesConfiguration": () => (/* binding */ slidesConfiguration)
/* harmony export */ });
var slidesConfiguration = [
    {
        alias: 'leaders',
        title: 'Больше всего коммитов',
        emoji: '👑',
        valueText: function (value) { return "" + value; },
    },
    {
        alias: 'vote',
        title: 'Самый 🔎 внимательный разработчик',
        emoji: '🔎',
        valueText: function (value) {
            switch (value % 100) {
                case 11:
                case 12:
                case 13:
                case 14:
                    return value + " \u0433\u043E\u043B\u043E\u0441\u043E\u0432";
                default:
                    break;
            }
            switch (value % 10) {
                case 1:
                    return value + " \u0433\u043E\u043B\u043E\u0441";
                case 2:
                case 3:
                case 4:
                    return value + " \u0433\u043E\u043B\u043E\u0441\u0430";
                default:
                    return value + " \u0433\u043E\u043B\u043E\u0441\u043E\u0432";
            }
        },
    },
    {
        alias: 'chart',
        title: 'Коммиты',
        valueText: function (value) { return "" + value; },
    },
    {
        alias: 'diagram',
        title: 'Размер коммитов',
        totalText: function (value) { return value + " \u043A\u043E\u043C\u043C\u0438\u0442\u0430"; },
        differenceText: function (value) { return value + " \u0441 \u043F\u0440\u043E\u0448\u043B\u043E\u0433\u043E \u0441\u043F\u0440\u0438\u043D\u0442\u0430"; },
        categories: {
            extra: '> 1001 строки',
            max: '501 — 1000 строк',
            mid: '101 — 500 строк',
            min: '1 — 100 строк',
        },
        valueText: function (commits) {
            switch (commits % 100) {
                case 11:
                case 12:
                case 13:
                case 14:
                    return commits + " \u043A\u043E\u043C\u043C\u0438\u0442\u043E\u0432";
                default:
                    break;
            }
            switch (commits % 10) {
                case 1:
                    return commits + " \u043A\u043E\u043C\u043C\u0438\u0442";
                case 2:
                case 3:
                case 4:
                    return commits + " \u043A\u043E\u043C\u043C\u0438\u0442\u0430";
                default:
                    return commits + " \u043A\u043E\u043C\u043C\u0438\u0442\u043E\u0432";
            }
        },
    },
    {
        alias: 'activity',
        title: 'Коммиты',
    },
];


/***/ }),

/***/ "./src/slides/vote.ts":
/*!****************************!*\
  !*** ./src/slides/vote.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toVote": () => (/* binding */ toVote)
/* harmony export */ });
/* harmony import */ var src_users_users__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/users/users */ "./src/users/users.ts");

function toVote(slideConfig, slideData, currentSprint) {
    var users = slideData.users, usersLikesMap = slideData.usersLikesMap;
    var title = slideConfig.title, emoji = slideConfig.emoji, transformValue = slideConfig.valueText;
    var slideUsers = (0,src_users_users__WEBPACK_IMPORTED_MODULE_0__.mapUsersToValuesForSlide)(users, usersLikesMap, transformValue);
    return {
        title: title,
        subtitle: currentSprint.name,
        emoji: emoji,
        users: slideUsers,
    };
}


/***/ }),

/***/ "./src/sprints/sprints.ts":
/*!********************************!*\
  !*** ./src/sprints/sprints.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSortedSprints": () => (/* binding */ getSortedSprints),
/* harmony export */   "findCurrentSprint": () => (/* binding */ findCurrentSprint),
/* harmony export */   "doesSprintContainEntity": () => (/* binding */ doesSprintContainEntity),
/* harmony export */   "getSprintEntities": () => (/* binding */ getSprintEntities)
/* harmony export */ });
function sprintComparator(first, second) {
    return first.id > second.id ? 1 : -1;
}
function getSortedSprints(entities) {
    return entities
        .filter(function (entity) { return entity.type === 'Sprint'; })
        .sort(sprintComparator);
}
function findCurrentSprint(sprints, sprintId) {
    for (var i = 0; i < sprints.length; i++) {
        var entity = sprints[i];
        if (entity.type === 'Sprint' && entity.id === sprintId) {
            return entity;
        }
    }
    return null;
}
function doesSprintContainEntity(timestamp, sprint) {
    return (!!timestamp && timestamp >= sprint.startAt && timestamp <= sprint.finishAt);
}
function getSprintEntities(entities, sprint) {
    return entities.filter(function (entity) {
        switch (entity.type) {
            case 'Comment':
            case 'Issue':
                return doesSprintContainEntity(entity.createdAt, sprint);
            case 'Commit':
                return doesSprintContainEntity(entity.timestamp, sprint);
            default:
                return false;
        }
    });
}


/***/ }),

/***/ "./src/users/users.ts":
/*!****************************!*\
  !*** ./src/users/users.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUsers": () => (/* binding */ getUsers),
/* harmony export */   "mapUsersToValuesForSlide": () => (/* binding */ mapUsersToValuesForSlide)
/* harmony export */ });
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function getUsers(entities) {
    return entities.reduce(function (acc, cur) {
        if (cur.type !== 'User')
            return acc;
        acc.set(cur.id, cur);
        return acc;
    }, new Map());
}
function mapUsersToValuesForSlide(users, valuesMap, transformValue) {
    if (transformValue === void 0) { transformValue = function (value) { return value; }; }
    var mappedUsers = [];
    __spreadArray([], __read(valuesMap.entries())).sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry) {
        var _a = __read(entry, 2), userId = _a[0], value = _a[1];
        var user = users.get(userId);
        var slideUser = {
            id: userId,
            name: user.name,
            avatar: user.avatar,
            valueText: transformValue(value),
        };
        mappedUsers.push(slideUser);
    });
    return mappedUsers;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/prepareData.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaHJpLTIwMjEtdGFzay0yLy4vc3JjL2NvbW1pdHMvY29tbWl0cy50cyIsIndlYnBhY2s6Ly9zaHJpLTIwMjEtdGFzay0yLy4vc3JjL2xpa2VzL2xpa2VzLnRzIiwid2VicGFjazovL3NocmktMjAyMS10YXNrLTIvLi9zcmMvcHJlcGFyZURhdGEudHMiLCJ3ZWJwYWNrOi8vc2hyaS0yMDIxLXRhc2stMi8uL3NyYy9zbGlkZXMvY2hhcnQudHMiLCJ3ZWJwYWNrOi8vc2hyaS0yMDIxLXRhc2stMi8uL3NyYy9zbGlkZXMvbGVhZGVycy50cyIsIndlYnBhY2s6Ly9zaHJpLTIwMjEtdGFzay0yLy4vc3JjL3NsaWRlcy9zbGlkZXMudHMiLCJ3ZWJwYWNrOi8vc2hyaS0yMDIxLXRhc2stMi8uL3NyYy9zbGlkZXMvc2xpZGVzQ29uZmlndXJhdGlvbi50cyIsIndlYnBhY2s6Ly9zaHJpLTIwMjEtdGFzay0yLy4vc3JjL3NsaWRlcy92b3RlLnRzIiwid2VicGFjazovL3NocmktMjAyMS10YXNrLTIvLi9zcmMvc3ByaW50cy9zcHJpbnRzLnRzIiwid2VicGFjazovL3NocmktMjAyMS10YXNrLTIvLi9zcmMvdXNlcnMvdXNlcnMudHMiLCJ3ZWJwYWNrOi8vc2hyaS0yMDIxLXRhc2stMi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaHJpLTIwMjEtdGFzay0yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaHJpLTIwMjEtdGFzay0yL3dlYnBhY2svcnVudGltZS9oYXJtb255IG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vc2hyaS0yMDIxLXRhc2stMi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NocmktMjAyMS10YXNrLTIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zaHJpLTIwMjEtdGFz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QTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlcnNDb21taXRzKGVudGl0aWVzKSB7XG4gICAgdmFyIHVzZXJzQ29tbWl0c01hcCA9IG5ldyBNYXAoKTtcbiAgICBpZiAoIWVudGl0aWVzKVxuICAgICAgICByZXR1cm4gdXNlcnNDb21taXRzTWFwO1xuICAgIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBjdXIpIHtcbiAgICAgICAgaWYgKGN1ci50eXBlICE9PSAnQ29tbWl0JylcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIHZhciBhdXRob3JJZCA9IHR5cGVvZiBjdXIuYXV0aG9yID09PSAnbnVtYmVyJyA/IGN1ci5hdXRob3IgOiBjdXIuYXV0aG9yLmlkO1xuICAgICAgICB2YXIgdXNlckNvbW1pdHMgPSBhY2MuZ2V0KGF1dGhvcklkKSB8fCAwO1xuICAgICAgICBhY2Muc2V0KGF1dGhvcklkLCB1c2VyQ29tbWl0cyArIDEpO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHVzZXJzQ29tbWl0c01hcCk7XG4gICAgcmV0dXJuIHVzZXJzQ29tbWl0c01hcDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21taXRzRm9yQWxsU3ByaW50cyhzcHJpbnRzLCBlbnRpdGllcywgY3VycmVudFNwcmludElkKSB7XG4gICAgcmV0dXJuIHNwcmludHMubWFwKGZ1bmN0aW9uIChzcHJpbnQpIHtcbiAgICAgICAgdmFyIGNvbW1pdHMgPSBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY3VyKSB7XG4gICAgICAgICAgICBpZiAoY3VyLnR5cGUgIT09ICdDb21taXQnIHx8XG4gICAgICAgICAgICAgICAgY3VyLnRpbWVzdGFtcCA8IHNwcmludC5zdGFydEF0IHx8XG4gICAgICAgICAgICAgICAgY3VyLnRpbWVzdGFtcCA+IHNwcmludC5maW5pc2hBdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjICsgMTtcbiAgICAgICAgfSwgMCk7XG4gICAgICAgIHZhciByZXN1bHQgPSB7IHRpdGxlOiBcIlwiICsgc3ByaW50LmlkLCBoaW50OiBzcHJpbnQubmFtZSwgdmFsdWU6IGNvbW1pdHMgfTtcbiAgICAgICAgaWYgKHNwcmludC5pZCA9PT0gY3VycmVudFNwcmludElkKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc3VsdCksIHsgYWN0aXZlOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0VXNlcnNMaWtlcyhlbnRpdGllcykge1xuICAgIHZhciB1c2VyTGlrZXNNYXAgPSBuZXcgTWFwKCk7XG4gICAgaWYgKCFlbnRpdGllcylcbiAgICAgICAgcmV0dXJuIHVzZXJMaWtlc01hcDtcbiAgICBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY3VyKSB7XG4gICAgICAgIGlmIChjdXIudHlwZSAhPT0gJ0NvbW1lbnQnKVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgdmFyIGF1dGhvcklkID0gdHlwZW9mIGN1ci5hdXRob3IgPT09ICdudW1iZXInID8gY3VyLmF1dGhvciA6IGN1ci5hdXRob3IuaWQ7XG4gICAgICAgIHZhciB1c2VyTGlrZXMgPSBhY2MuZ2V0KGF1dGhvcklkKSB8fCAwO1xuICAgICAgICBhY2Muc2V0KGF1dGhvcklkLCB1c2VyTGlrZXMgKyBjdXIubGlrZXMubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB1c2VyTGlrZXNNYXApO1xuICAgIHJldHVybiB1c2VyTGlrZXNNYXA7XG59XG4iLCJpbXBvcnQgeyBzbGlkZXNDb25maWd1cmF0aW9uIH0gZnJvbSAnc3JjL3NsaWRlcy9zbGlkZXNDb25maWd1cmF0aW9uJztcbmltcG9ydCB7IHRyYW5zZm9ybURhdGFUb1NsaWRlIH0gZnJvbSAnc3JjL3NsaWRlcy9zbGlkZXMnO1xuaW1wb3J0IHsgZ2V0VXNlcnNMaWtlcyB9IGZyb20gJ3NyYy9saWtlcy9saWtlcyc7XG5pbXBvcnQgeyBnZXRDb21taXRzRm9yQWxsU3ByaW50cywgZ2V0VXNlcnNDb21taXRzIH0gZnJvbSAnc3JjL2NvbW1pdHMvY29tbWl0cyc7XG5pbXBvcnQgeyBnZXRVc2VycyB9IGZyb20gJ3NyYy91c2Vycy91c2Vycyc7XG5pbXBvcnQgeyBnZXRTb3J0ZWRTcHJpbnRzLCBmaW5kQ3VycmVudFNwcmludCwgZ2V0U3ByaW50RW50aXRpZXMsIH0gZnJvbSAnc3JjL3NwcmludHMvc3ByaW50cyc7XG5mdW5jdGlvbiBwcmVwYXJlRGF0YShlbnRpdGllcywgX2EpIHtcbiAgICB2YXIgc3ByaW50SWQgPSBfYS5pZDtcbiAgICB2YXIgc3ByaW50cyA9IGdldFNvcnRlZFNwcmludHMoZW50aXRpZXMpO1xuICAgIHZhciB1c2VycyA9IGdldFVzZXJzKGVudGl0aWVzKTtcbiAgICB2YXIgY3VycmVudFNwcmludCA9IGZpbmRDdXJyZW50U3ByaW50KHNwcmludHMsIHNwcmludElkKTtcbiAgICB2YXIgc3ByaW50RW50aXRpZXMgPSBnZXRTcHJpbnRFbnRpdGllcyhlbnRpdGllcywgY3VycmVudFNwcmludCk7XG4gICAgdmFyIGN1cnJlbnRTcHJpbnRVc2Vyc0NvbW1pdHNNYXAgPSBnZXRVc2Vyc0NvbW1pdHMoc3ByaW50RW50aXRpZXMpO1xuICAgIHZhciBjdXJyZW50U3ByaW50VXNlcnNMaWtlc01hcCA9IGdldFVzZXJzTGlrZXMoc3ByaW50RW50aXRpZXMpO1xuICAgIHZhciBzcHJpbnRzQ29tbWl0cyA9IGdldENvbW1pdHNGb3JBbGxTcHJpbnRzKHNwcmludHMsIGVudGl0aWVzLCBjdXJyZW50U3ByaW50LmlkKTtcbiAgICB2YXIgZGF0YUZvclNsaWRlcyA9IHtcbiAgICAgICAgbGVhZGVyczoge1xuICAgICAgICAgICAgdXNlcnM6IHVzZXJzLFxuICAgICAgICAgICAgdXNlcnNDb21taXRzTWFwOiBjdXJyZW50U3ByaW50VXNlcnNDb21taXRzTWFwLFxuICAgICAgICB9LFxuICAgICAgICB2b3RlOiB7XG4gICAgICAgICAgICB1c2VyczogdXNlcnMsXG4gICAgICAgICAgICB1c2Vyc0xpa2VzTWFwOiBjdXJyZW50U3ByaW50VXNlcnNMaWtlc01hcCxcbiAgICAgICAgfSxcbiAgICAgICAgY2hhcnQ6IHtcbiAgICAgICAgICAgIHVzZXJzOiB1c2VycyxcbiAgICAgICAgICAgIHVzZXJzQ29tbWl0c01hcDogY3VycmVudFNwcmludFVzZXJzQ29tbWl0c01hcCxcbiAgICAgICAgICAgIGNvbW1pdHM6IHNwcmludHNDb21taXRzLFxuICAgICAgICB9LFxuICAgICAgICBkaWFncmFtOiB7fSxcbiAgICAgICAgYWN0aXZpdHk6IHt9LFxuICAgIH07XG4gICAgdmFyIHN0b3JpZXMgPSBbXTtcbiAgICBzbGlkZXNDb25maWd1cmF0aW9uLmZvckVhY2goZnVuY3Rpb24gKHNsaWRlQ29uZmlnKSB7XG4gICAgICAgIHZhciBzbGlkZURhdGEgPSBkYXRhRm9yU2xpZGVzW3NsaWRlQ29uZmlnLmFsaWFzXTtcbiAgICAgICAgdmFyIHNsaWRlID0gdHJhbnNmb3JtRGF0YVRvU2xpZGUoc2xpZGVDb25maWcsIHNsaWRlRGF0YSwgY3VycmVudFNwcmludCk7XG4gICAgICAgIHN0b3JpZXMucHVzaChzbGlkZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0b3JpZXM7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHsgcHJlcGFyZURhdGE6IHByZXBhcmVEYXRhIH07XG4iLCJpbXBvcnQgeyBtYXBVc2Vyc1RvVmFsdWVzRm9yU2xpZGUgfSBmcm9tICdzcmMvdXNlcnMvdXNlcnMnO1xuZXhwb3J0IGZ1bmN0aW9uIHRvQ2hhcnQoc2xpZGVDb25maWcsIHNsaWRlRGF0YSwgY3VycmVudFNwcmludCkge1xuICAgIHZhciBjb21taXRzID0gc2xpZGVEYXRhLmNvbW1pdHMsIHVzZXJzID0gc2xpZGVEYXRhLnVzZXJzLCB1c2Vyc0NvbW1pdHNNYXAgPSBzbGlkZURhdGEudXNlcnNDb21taXRzTWFwO1xuICAgIHZhciB0aXRsZSA9IHNsaWRlQ29uZmlnLnRpdGxlLCB0cmFuc2Zvcm1WYWx1ZSA9IHNsaWRlQ29uZmlnLnZhbHVlVGV4dDtcbiAgICB2YXIgc2xpZGVVc2VycyA9IG1hcFVzZXJzVG9WYWx1ZXNGb3JTbGlkZSh1c2VycywgdXNlcnNDb21taXRzTWFwLCB0cmFuc2Zvcm1WYWx1ZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICBzdWJ0aXRsZTogY3VycmVudFNwcmludC5uYW1lLFxuICAgICAgICB2YWx1ZXM6IGNvbW1pdHMsXG4gICAgICAgIHVzZXJzOiBzbGlkZVVzZXJzLFxuICAgIH07XG59XG4iLCJpbXBvcnQgeyBtYXBVc2Vyc1RvVmFsdWVzRm9yU2xpZGUgfSBmcm9tICdzcmMvdXNlcnMvdXNlcnMnO1xuZXhwb3J0IGZ1bmN0aW9uIHRvTGVhZGVycyhzbGlkZUNvbmZpZywgc2xpZGVEYXRhLCBjdXJyZW50U3ByaW50KSB7XG4gICAgdmFyIHVzZXJzID0gc2xpZGVEYXRhLnVzZXJzLCB1c2Vyc0NvbW1pdHNNYXAgPSBzbGlkZURhdGEudXNlcnNDb21taXRzTWFwO1xuICAgIHZhciB0aXRsZSA9IHNsaWRlQ29uZmlnLnRpdGxlLCBlbW9qaSA9IHNsaWRlQ29uZmlnLmVtb2ppLCB0cmFuc2Zvcm1WYWx1ZSA9IHNsaWRlQ29uZmlnLnZhbHVlVGV4dDtcbiAgICB2YXIgc2xpZGVVc2VycyA9IG1hcFVzZXJzVG9WYWx1ZXNGb3JTbGlkZSh1c2VycywgdXNlcnNDb21taXRzTWFwLCB0cmFuc2Zvcm1WYWx1ZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICBzdWJ0aXRsZTogY3VycmVudFNwcmludC5uYW1lLFxuICAgICAgICBlbW9qaTogZW1vamksXG4gICAgICAgIHVzZXJzOiBzbGlkZVVzZXJzLFxuICAgIH07XG59XG4iLCJpbXBvcnQgeyB0b0xlYWRlcnMgfSBmcm9tICdzcmMvc2xpZGVzL2xlYWRlcnMnO1xuaW1wb3J0IHsgdG9Wb3RlIH0gZnJvbSAnc3JjL3NsaWRlcy92b3RlJztcbmltcG9ydCB7IHRvQ2hhcnQgfSBmcm9tICdzcmMvc2xpZGVzL2NoYXJ0JztcbnZhciB0cmFuc2Zvcm1EYXRhTWFwID0ge1xuICAgIGxlYWRlcnM6IHRvTGVhZGVycyxcbiAgICB2b3RlOiB0b1ZvdGUsXG4gICAgY2hhcnQ6IHRvQ2hhcnQsXG4gICAgZGlhZ3JhbTogZnVuY3Rpb24gKCkgeyByZXR1cm4gKHt9KTsgfSxcbiAgICBhY3Rpdml0eTogZnVuY3Rpb24gKCkgeyByZXR1cm4gKHt9KTsgfSxcbn07XG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtRGF0YVRvU2xpZGUoc2xpZGVDb25maWcsIHNsaWRlRGF0YSwgY3VycmVudFNwcmludCkge1xuICAgIHZhciB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1EYXRhTWFwW3NsaWRlQ29uZmlnLmFsaWFzXTtcbiAgICB2YXIgZGF0YSA9IHRyYW5zZm9ybShzbGlkZUNvbmZpZywgc2xpZGVEYXRhLCBjdXJyZW50U3ByaW50KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBhbGlhczogc2xpZGVDb25maWcuYWxpYXMsXG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgfTtcbn1cbiIsImV4cG9ydCB2YXIgc2xpZGVzQ29uZmlndXJhdGlvbiA9IFtcbiAgICB7XG4gICAgICAgIGFsaWFzOiAnbGVhZGVycycsXG4gICAgICAgIHRpdGxlOiAn0JHQvtC70YzRiNC1INCy0YHQtdCz0L4g0LrQvtC80LzQuNGC0L7QsicsXG4gICAgICAgIGVtb2ppOiAn8J+RkScsXG4gICAgICAgIHZhbHVlVGV4dDogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBcIlwiICsgdmFsdWU7IH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFsaWFzOiAndm90ZScsXG4gICAgICAgIHRpdGxlOiAn0KHQsNC80YvQuSDwn5SOINCy0L3QuNC80LDRgtC10LvRjNC90YvQuSDRgNCw0LfRgNCw0LHQvtGC0YfQuNC6JyxcbiAgICAgICAgZW1vamk6ICfwn5SOJyxcbiAgICAgICAgdmFsdWVUZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodmFsdWUgJSAxMDApIHtcbiAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgKyBcIiBcXHUwNDMzXFx1MDQzRVxcdTA0M0JcXHUwNDNFXFx1MDQ0MVxcdTA0M0VcXHUwNDMyXCI7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHZhbHVlICUgMTApIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSArIFwiIFxcdTA0MzNcXHUwNDNFXFx1MDQzQlxcdTA0M0VcXHUwNDQxXCI7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSArIFwiIFxcdTA0MzNcXHUwNDNFXFx1MDQzQlxcdTA0M0VcXHUwNDQxXFx1MDQzMFwiO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSArIFwiIFxcdTA0MzNcXHUwNDNFXFx1MDQzQlxcdTA0M0VcXHUwNDQxXFx1MDQzRVxcdTA0MzJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYWxpYXM6ICdjaGFydCcsXG4gICAgICAgIHRpdGxlOiAn0JrQvtC80LzQuNGC0YsnLFxuICAgICAgICB2YWx1ZVRleHQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gXCJcIiArIHZhbHVlOyB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBhbGlhczogJ2RpYWdyYW0nLFxuICAgICAgICB0aXRsZTogJ9Cg0LDQt9C80LXRgCDQutC+0LzQvNC40YLQvtCyJyxcbiAgICAgICAgdG90YWxUZXh0OiBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHZhbHVlICsgXCIgXFx1MDQzQVxcdTA0M0VcXHUwNDNDXFx1MDQzQ1xcdTA0MzhcXHUwNDQyXFx1MDQzMFwiOyB9LFxuICAgICAgICBkaWZmZXJlbmNlVGV4dDogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB2YWx1ZSArIFwiIFxcdTA0NDEgXFx1MDQzRlxcdTA0NDBcXHUwNDNFXFx1MDQ0OFxcdTA0M0JcXHUwNDNFXFx1MDQzM1xcdTA0M0UgXFx1MDQ0MVxcdTA0M0ZcXHUwNDQwXFx1MDQzOFxcdTA0M0RcXHUwNDQyXFx1MDQzMFwiOyB9LFxuICAgICAgICBjYXRlZ29yaWVzOiB7XG4gICAgICAgICAgICBleHRyYTogJz4gMTAwMSDRgdGC0YDQvtC60LgnLFxuICAgICAgICAgICAgbWF4OiAnNTAxIOKAlCAxMDAwINGB0YLRgNC+0LonLFxuICAgICAgICAgICAgbWlkOiAnMTAxIOKAlCA1MDAg0YHRgtGA0L7QuicsXG4gICAgICAgICAgICBtaW46ICcxIOKAlCAxMDAg0YHRgtGA0L7QuicsXG4gICAgICAgIH0sXG4gICAgICAgIHZhbHVlVGV4dDogZnVuY3Rpb24gKGNvbW1pdHMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoY29tbWl0cyAlIDEwMCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21taXRzICsgXCIgXFx1MDQzQVxcdTA0M0VcXHUwNDNDXFx1MDQzQ1xcdTA0MzhcXHUwNDQyXFx1MDQzRVxcdTA0MzJcIjtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY29tbWl0cyAlIDEwKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWl0cyArIFwiIFxcdTA0M0FcXHUwNDNFXFx1MDQzQ1xcdTA0M0NcXHUwNDM4XFx1MDQ0MlwiO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWl0cyArIFwiIFxcdTA0M0FcXHUwNDNFXFx1MDQzQ1xcdTA0M0NcXHUwNDM4XFx1MDQ0MlxcdTA0MzBcIjtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWl0cyArIFwiIFxcdTA0M0FcXHUwNDNFXFx1MDQzQ1xcdTA0M0NcXHUwNDM4XFx1MDQ0MlxcdTA0M0VcXHUwNDMyXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFsaWFzOiAnYWN0aXZpdHknLFxuICAgICAgICB0aXRsZTogJ9Ca0L7QvNC80LjRgtGLJyxcbiAgICB9LFxuXTtcbiIsImltcG9ydCB7IG1hcFVzZXJzVG9WYWx1ZXNGb3JTbGlkZSB9IGZyb20gJ3NyYy91c2Vycy91c2Vycyc7XG5leHBvcnQgZnVuY3Rpb24gdG9Wb3RlKHNsaWRlQ29uZmlnLCBzbGlkZURhdGEsIGN1cnJlbnRTcHJpbnQpIHtcbiAgICB2YXIgdXNlcnMgPSBzbGlkZURhdGEudXNlcnMsIHVzZXJzTGlrZXNNYXAgPSBzbGlkZURhdGEudXNlcnNMaWtlc01hcDtcbiAgICB2YXIgdGl0bGUgPSBzbGlkZUNvbmZpZy50aXRsZSwgZW1vamkgPSBzbGlkZUNvbmZpZy5lbW9qaSwgdHJhbnNmb3JtVmFsdWUgPSBzbGlkZUNvbmZpZy52YWx1ZVRleHQ7XG4gICAgdmFyIHNsaWRlVXNlcnMgPSBtYXBVc2Vyc1RvVmFsdWVzRm9yU2xpZGUodXNlcnMsIHVzZXJzTGlrZXNNYXAsIHRyYW5zZm9ybVZhbHVlKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgIHN1YnRpdGxlOiBjdXJyZW50U3ByaW50Lm5hbWUsXG4gICAgICAgIGVtb2ppOiBlbW9qaSxcbiAgICAgICAgdXNlcnM6IHNsaWRlVXNlcnMsXG4gICAgfTtcbn1cbiIsImZ1bmN0aW9uIHNwcmludENvbXBhcmF0b3IoZmlyc3QsIHNlY29uZCkge1xuICAgIHJldHVybiBmaXJzdC5pZCA+IHNlY29uZC5pZCA/IDEgOiAtMTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3J0ZWRTcHJpbnRzKGVudGl0aWVzKSB7XG4gICAgcmV0dXJuIGVudGl0aWVzXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGVudGl0eSkgeyByZXR1cm4gZW50aXR5LnR5cGUgPT09ICdTcHJpbnQnOyB9KVxuICAgICAgICAuc29ydChzcHJpbnRDb21wYXJhdG9yKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ3VycmVudFNwcmludChzcHJpbnRzLCBzcHJpbnRJZCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3ByaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZW50aXR5ID0gc3ByaW50c1tpXTtcbiAgICAgICAgaWYgKGVudGl0eS50eXBlID09PSAnU3ByaW50JyAmJiBlbnRpdHkuaWQgPT09IHNwcmludElkKSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRvZXNTcHJpbnRDb250YWluRW50aXR5KHRpbWVzdGFtcCwgc3ByaW50KSB7XG4gICAgcmV0dXJuICghIXRpbWVzdGFtcCAmJiB0aW1lc3RhbXAgPj0gc3ByaW50LnN0YXJ0QXQgJiYgdGltZXN0YW1wIDw9IHNwcmludC5maW5pc2hBdCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ByaW50RW50aXRpZXMoZW50aXRpZXMsIHNwcmludCkge1xuICAgIHJldHVybiBlbnRpdGllcy5maWx0ZXIoZnVuY3Rpb24gKGVudGl0eSkge1xuICAgICAgICBzd2l0Y2ggKGVudGl0eS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdDb21tZW50JzpcbiAgICAgICAgICAgIGNhc2UgJ0lzc3VlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9lc1NwcmludENvbnRhaW5FbnRpdHkoZW50aXR5LmNyZWF0ZWRBdCwgc3ByaW50KTtcbiAgICAgICAgICAgIGNhc2UgJ0NvbW1pdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvZXNTcHJpbnRDb250YWluRW50aXR5KGVudGl0eS50aW1lc3RhbXAsIHNwcmludCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwidmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VycyhlbnRpdGllcykge1xuICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY3VyKSB7XG4gICAgICAgIGlmIChjdXIudHlwZSAhPT0gJ1VzZXInKVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgYWNjLnNldChjdXIuaWQsIGN1cik7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgbmV3IE1hcCgpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtYXBVc2Vyc1RvVmFsdWVzRm9yU2xpZGUodXNlcnMsIHZhbHVlc01hcCwgdHJhbnNmb3JtVmFsdWUpIHtcbiAgICBpZiAodHJhbnNmb3JtVmFsdWUgPT09IHZvaWQgMCkgeyB0cmFuc2Zvcm1WYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07IH1cbiAgICB2YXIgbWFwcGVkVXNlcnMgPSBbXTtcbiAgICBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQodmFsdWVzTWFwLmVudHJpZXMoKSkpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGJbMV0gLSBhWzFdOyB9KVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgdmFyIF9hID0gX19yZWFkKGVudHJ5LCAyKSwgdXNlcklkID0gX2FbMF0sIHZhbHVlID0gX2FbMV07XG4gICAgICAgIHZhciB1c2VyID0gdXNlcnMuZ2V0KHVzZXJJZCk7XG4gICAgICAgIHZhciBzbGlkZVVzZXIgPSB7XG4gICAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgYXZhdGFyOiB1c2VyLmF2YXRhcixcbiAgICAgICAgICAgIHZhbHVlVGV4dDogdHJhbnNmb3JtVmFsdWUodmFsdWUpLFxuICAgICAgICB9O1xuICAgICAgICBtYXBwZWRVc2Vycy5wdXNoKHNsaWRlVXNlcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hcHBlZFVzZXJzO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG1vZHVsZSk7XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgJ2V4cG9ydHMnLCB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRzZXQ6ICgpID0+IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRVMgTW9kdWxlcyBtYXkgbm90IGFzc2lnbiBtb2R1bGUuZXhwb3J0cyBvciBleHBvcnRzLiosIFVzZSBFU00gZXhwb3J0IHN5bnRheCwgaW5zdGVhZDogJyArIG1vZHVsZS5pZCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3ByZXBhcmVEYXRhLnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==