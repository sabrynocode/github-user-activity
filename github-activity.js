var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var username = process.argv[2];
if (!username) {
    console.error("Please provide a GitHub username as an argument.");
    process.exit(1);
}
var eventTypes = new Map();
function fetchGitHubActivity(username) {
    return __awaiter(this, void 0, void 0, function () {
        var response, events, recentestEvents, isPushEvent, isPullRequestEvent, isIssuesEvent, isForkEvent, isWatchEvent, pushEvents, pullRequestEvents, issuesEvents, forkEvents, watchEvents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.github.com/users/".concat(username, "/events"))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error fetching data for user ".concat(username, ": ").concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    events = _a.sent();
                    recentestEvents = events.slice(0, 5);
                    isPushEvent = recentestEvents.find(function (event) { return event.type === "PushEvent"; }) ? true : false;
                    isPullRequestEvent = recentestEvents.find(function (event) { return event.type === "PullRequestEvent"; }) ? true : false;
                    isIssuesEvent = recentestEvents.find(function (event) { return event.type === "IssuesEvent"; }) ? true : false;
                    isForkEvent = recentestEvents.find(function (event) { return event.type === "ForkEvent"; }) ? true : false;
                    isWatchEvent = recentestEvents.find(function (event) { return event.type === "WatchEvent"; }) ? true : false;
                    if (isPushEvent) {
                        pushEvents = recentestEvents.filter(function (event) { return event.type === "PushEvent"; });
                        eventTypes.set("PushEvent", "Pushed ".concat(pushEvents.length, " times to ").concat(pushEvents[0].repo.name));
                    }
                    if (isPullRequestEvent) {
                        pullRequestEvents = recentestEvents.filter(function (event) { return event.type === "PullRequestEvent"; });
                        eventTypes.set("PullRequestEvent", "Created or updated ".concat(pullRequestEvents.length, " pull requests in ").concat(pullRequestEvents[0].repo.name));
                    }
                    if (isIssuesEvent) {
                        issuesEvents = recentestEvents.filter(function (event) { return event.type === "IssuesEvent"; });
                        eventTypes.set("IssuesEvent", "Opened or closed ".concat(issuesEvents.length, " issues in ").concat(issuesEvents[0].repo.name));
                    }
                    if (isForkEvent) {
                        forkEvents = recentestEvents.filter(function (event) { return event.type === "ForkEvent"; });
                        eventTypes.set("ForkEvent", "Forked ".concat(forkEvents.length, " repositories from ").concat(forkEvents[0].repo.name));
                    }
                    if (isWatchEvent) {
                        watchEvents = recentestEvents.filter(function (event) { return event.type === "WatchEvent"; });
                        eventTypes.set("WatchEvent", "Starred ".concat(watchEvents.length, " repositories from ").concat(watchEvents[0].repo.name));
                    }
                    console.log("Recent activity for ".concat(username, ":"));
                    if (eventTypes.size === 0) {
                        console.log("No recent activity found.");
                    }
                    else {
                        eventTypes.forEach(function (description) {
                            console.log(" - ".concat(description));
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
fetchGitHubActivity(username).catch(function (error) {
    console.error(error);
    process.exit(1);
});
