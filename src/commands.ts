// src/commands.ts

/**
 * Takes a query string and returns a URL to redirect to.
 * @param q The query string from the user.
 * @returns A URL for redirection.
 */
export function handleQuery(q: string): string {
	// For now, we'll just redirect to a Google search.
	// This can be expanded with more complex logic.
	const command = q.split(' ')[0];
	const args = q.substring(command.length + 2)
	switch (command) {
		case 'gh':
			return `https://github.com/search?q=${encodeURIComponent(rest)}`;
		case 'npm':
			return `https://www.npmjs.com/search?q=${encodeURIComponent(rest)}`;
	}
	return googleSearch(q);
}

export function googleSearch(q: string): string {
	var search_string: string = q;
	if q.startsWith('g ') {
		search_string = q.split(' ')[1]
	}
	return `https://www.google.com/search?q=${encodeURIComponent(search_string)}`;
}

export function githubRepoOrSearch(q: string): string {

}
