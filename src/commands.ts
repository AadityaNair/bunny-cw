// src/commands.ts

const ALIASES = {
	"newdoc": "https://docs.google.com/document/create",
	"newsheet": "https://docs.google.com/spreadsheets/create",
	"docs": "https://docs.google.com/document",
	"sheets": "https://docs.google.com/spreadsheets",
}


/**
 * Takes a query string and returns a URL to redirect to.
 * @param q The query string from the user.
 * @returns A URL for redirection.
 */
export function handleQuery(q: string): string {
	// SPECIAL case handling
	if (q.startsWith('r/')) {
		return redditSearch(q.substring(3))
	}

	//ALIASES forwarding


	// GENERIC cases of "<command> <argument>"
	const command = q.split(' ')[0];
	const args = q.substring(command.length + 2)
	switch (command) {
		case 'gh':
			return `https://github.com/search?q=${encodeURIComponent(args)}`;
		case 'npm':
			return `https://www.npmjs.com/search?q=${encodeURIComponent(args)}`;
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

}

export function redditSearch(subreddit: string): string {
}
