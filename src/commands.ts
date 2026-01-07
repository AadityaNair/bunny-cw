// src/commands.ts

/**
 * Takes a query string and returns a URL to redirect to.
 * @param q The query string from the user.
 * @returns A URL for redirection.
 */
export function handleQuery(q: string): string {
	// For now, we'll just redirect to a Google search.
	// This can be expanded with more complex logic.
	if (q.startsWith('!')) {
		// Example of a simple "bang" command
		const command = q.substring(1).split(' ')[0];
		const rest = q.substring(command.length + 2);
		switch (command) {
			case 'gh':
				return `https://github.com/search?q=${encodeURIComponent(rest)}`;
			case 'npm':
				return `https://www.npmjs.com/search?q=${encodeURIComponent(rest)}`;
			default:
				return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
		}
	}
	return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}
