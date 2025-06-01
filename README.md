# GitHub User Activity

A simple Node.js script to fetch and display recent GitHub activity for a specified user. from : [https://roadmap.sh/projects/github-user-activity]

## Features

- Fetches the 5 most recent public events for a GitHub user.
- Summarizes activity types: Push, Pull Request, Issues, Fork, and Watch (Star).
- Outputs a human-readable summary to the console.

## Installation

1. **Clone the repository** (or download the files):

   ```sh
   git clone https://github.com/sabrynocode/github-user-activity.git
   cd github-user-activity
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

## Usage

You can run the script using Node.js. Replace `<github-username>` with the GitHub username you want to check.

```sh
npx tsx github-activity.ts <github-username>
```

Or, if you have compiled the TypeScript to JavaScript:

```sh
node github-activity.js <github-username>
```

**Example:**

```sh
npx tsx github-activity.ts octocat
```

## Notes

- Requires Node.js v18+ (for native `fetch` support) or a polyfill for earlier versions.
- Only public events are shown.
- Make sure you have [tsx](https://www.npmjs.com/package/tsx) installed globally or as a dev dependency if running TypeScript directly.

## License

ISC
