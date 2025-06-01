interface GitHubEvent {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
}

let username: string | undefined = process.argv[2];
if (!username) {
  console.error("Please provide a GitHub username as an argument.");
  process.exit(1);
}

const eventTypes = new Map<string, string>();

async function fetchGitHubActivity(username: string): Promise<void> {
  const response = await fetch(`https://api.github.com/users/${username}/events`);
  if (!response.ok) {
    throw new Error(`Error fetching data for user ${username}: ${response.statusText}`);
  }

  const events = await response.json();

  const recentestEvents = events.slice(0, 5);

  const isPushEvent = recentestEvents.find((event: any) => event.type === "PushEvent") ? true : false;
  const isPullRequestEvent = recentestEvents.find((event: any) => event.type === "PullRequestEvent") ? true : false;
  const isIssuesEvent = recentestEvents.find((event: any) => event.type === "IssuesEvent") ? true : false;
  const isForkEvent = recentestEvents.find((event: any) => event.type === "ForkEvent") ? true : false;
  const isWatchEvent = recentestEvents.find((event: any) => event.type === "WatchEvent") ? true : false;

  if (isPushEvent) {
    const pushEvents = recentestEvents.filter((event: any) => event.type === "PushEvent");
    eventTypes.set("PushEvent", `Pushed ${pushEvents.length} times to ${pushEvents[0].repo.name}`);
  }
  if (isPullRequestEvent) {
    const pullRequestEvents = recentestEvents.filter((event: any) => event.type === "PullRequestEvent");
    eventTypes.set("PullRequestEvent", `Created or updated ${pullRequestEvents.length} pull requests in ${pullRequestEvents[0].repo.name}`);
  }
  if (isIssuesEvent) {
    const issuesEvents = recentestEvents.filter((event: any) => event.type === "IssuesEvent");
    eventTypes.set("IssuesEvent", `Opened or closed ${issuesEvents.length} issues in ${issuesEvents[0].repo.name}`);
  }
  if (isForkEvent) {
    const forkEvents = recentestEvents.filter((event: any) => event.type === "ForkEvent");
    eventTypes.set("ForkEvent", `Forked ${forkEvents.length} repositories from ${forkEvents[0].repo.name}`);
  }
  if (isWatchEvent) {
    const watchEvents = recentestEvents.filter((event: any) => event.type === "WatchEvent");
    eventTypes.set("WatchEvent", `Starred ${watchEvents.length} repositories from ${watchEvents[0].repo.name}`);
  }

  console.log(`Recent activity for ${username}:`);
  if (eventTypes.size === 0) {
    console.log("No recent activity found.");
  } else {
    eventTypes.forEach((description) => {
      console.log(` - ${description}`);
    });
  }
}

fetchGitHubActivity(username).catch((error) => {
  console.error(error);
  process.exit(1);
});
