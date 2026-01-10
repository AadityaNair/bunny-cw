// src/commands.ts

const ALIASES = {
	"newdoc": "https://docs.google.com/document/create",
	"newsheet": "https://docs.google.com/spreadsheets/create",
	"docs": "https://docs.google.com/document",
	"sheets": "https://docs.google.com/spreadsheets",
	"hn": "https://news.ycombinator.com",
}


/**
 * Takes a query string and returns a URL to redirect to.
 * @param q The query string from the user.
 * @returns A URL for redirection.
 */
export function handleQuery(q: string): string {
	// SPECIAL case handling
	if (q.startsWith('r/')) {
		return redditSubreddit(q.substring(2))
	}

	//ALIASES forwarding
	if (q in ALIASES) {
		return ALIASES[q as keyof typeof ALIASES];
	}


	// GENERIC cases of "<command> <argument>"
	const command = q.split(' ')[0];
	const args = q.substring(command.length + 1)
	switch (command) {
		case 'gh':
			return githubRepoOrSearch(args);
		case 'npm':
			return `https://www.npmjs.com/search?q=${encodeURIComponent(args)}`;
		case 'r': // New case for Reddit search
			return redditSearchQuery(args);
		case 'wiki':
			if (args) {
				return `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(args)}`;
			}
			return 'https://www.wikipedia.org/';
		case 'yt':
			if (args) {
				return `https://www.youtube.com/results?search_query=${encodeURIComponent(args)}`;
			}
			return 'https://www.youtube.com/';
		case 'az':
			if (args) {
				return `https://www.amazon.co.uk/s?k=${encodeURIComponent(args)}`;
			}
			return 'https://www.amazon.co.uk/';
	}
	return googleSearch(q);
}

export function googleSearch(q: string): string {
	var search_string: string = q;
	if (q.startsWith('g ')) {
		search_string = q.split(' ')[1]
	}
	return `https://www.google.com/search?q=${encodeURIComponent(search_string)}`;
}


export function githubRepoOrSearch(q: string): string {
	const parts = q.split('/');
	if (parts.length === 2 && parts[0].length > 0 && parts[1].length > 0) {
		// Looks like username/repo
		const [username, repo] = parts;
		return `https://github.com/${username}/${repo}`;
	} else {
		// Otherwise, perform a search
		return `https://github.com/search?q=${encodeURIComponent(q)}`;
	}
}

export function redditSubreddit(subreddit: string): string {
	return `https://www.reddit.com/r/${encodeURIComponent(subreddit)}`;
}

// New function for Reddit search queries
export function redditSearchQuery(query: string): string {
	return `https://www.reddit.com/search?q=${encodeURIComponent(query)}`;
}
