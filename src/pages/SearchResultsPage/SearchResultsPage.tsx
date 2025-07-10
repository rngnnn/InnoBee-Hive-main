import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	IoSearchOutline,
	IoCloseOutline,
	IoChevronDownOutline,
} from 'react-icons/io5';
import Loader from '../../components/Loader/Loader';

const itemsPerPage = 10;

// Define the structure of a search result
interface SearchResult {
	id: number;
	title: string;
	description: string;
	link: string;
	category: string;
	date: string; // ISO string format
}

// Utility function to highlight search terms
const highlightText = (text: string | null, query: string | null): string => {
	if (!query || !text) {
		return text || '';
	}
	// Escape regex special characters in query
	const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const regex = new RegExp(escapedQuery, 'gi');
	return text.replace(
		regex,
		(match: string) => `<span class="bg-yellow-200">${match}</span>`
	);
};

// Define props for the default item component
interface DefaultSearchResultItemProps {
	result: SearchResult;
	searchQuery: string;
}

// Define a default SearchResultItem component with typed props
const DefaultSearchResultItem: React.FC<DefaultSearchResultItemProps> = ({
	result,
	searchQuery,
}) => (
	<li className="search-result-item rounded-lg border border-gray-default bg-white shadow-subtle transition-shadow duration-150 hover:shadow-md mb-4 p-4">
		<div className="flex items-start space-x-4">
			<div>
				<h4
					className="text-lg text-brown font-semibold mb-1"
					dangerouslySetInnerHTML={{
						__html: highlightText(result.title, searchQuery),
					}}
				/>
				<p
					className="text-sm text-gray-dark line-clamp-2"
					dangerouslySetInnerHTML={{
						__html: highlightText(result.description, searchQuery),
					}}
				/>
				<div className="text-xs text-gray-darker mt-1">{result.link}</div>
			</div>
		</div>
	</li>
);

// Define props for the SearchResultsPage component
interface SearchResultsPageProps {
	ResultItem?: React.FC<DefaultSearchResultItemProps>; // Optional custom item renderer
}

// Define the return type of the fetch function
interface FetchResponse {
	results: SearchResult[];
	total: number;
	suggestion: string[];
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
	ResultItem = DefaultSearchResultItem,
}) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(false);
	const resultsListRef = useRef<HTMLUListElement | null>(null); // Type the ref
	const [visibleResults, setVisibleResults] = useState<SearchResult[]>([]); // Use searchResults directly if pagination isn't needed visually like this
	const totalResults = useRef(0);
	const [filters, setFilters] = useState({ category: 'all' });
	const [sortBy, setSortBy] = useState('relevance');
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [searchHistory, setSearchHistory] = useState<string[]>(() => {
		const storedHistory = localStorage.getItem('searchHistory');
		return storedHistory ? JSON.parse(storedHistory) : [];
	});

	const fetchSearchResults = useCallback(
		async (
			query: string,
			currentPage: number,
			currentFilters = filters,
			currentSortBy = sortBy
		): Promise<FetchResponse> => {
			// Return a typed Promise
			setLoading(true);
			setError(null);
			// Simulate API call
			return new Promise((resolve) => {
				setTimeout(() => {
					const allDummyResults: SearchResult[] = Array.from(
						{ length: 100 },
						(_, i) => ({
							id: i + 1,
							title: `Result ${i + 1} - ${query}`,
							description: `This is a detailed description for search result number ${
								i + 1
							} related to the query "${query}". It falls under the category of ${
								i % 3 === 0 ? 'Technology' : i % 3 === 1 ? 'Science' : 'Art'
							}.`,
							link: `https://example.com/result/${i + 1}`,
							category:
								i % 3 === 0 ? 'Technology' : i % 3 === 1 ? 'Science' : 'Art',
							date: new Date(2025, 3, 13 - i).toISOString(),
						})
					);

					const filteredByCategory = // Correct filtering
						currentFilters.category === 'all'
							? allDummyResults
							: allDummyResults.filter(
									(result) => result.category === currentFilters.category
							  );

					const filteredByQuery = filteredByCategory.filter(
						(result) =>
							result.title.toLowerCase().includes(query.toLowerCase()) ||
							result.description.toLowerCase().includes(query.toLowerCase())
					);

					let sortedResults = [...filteredByQuery];
					if (currentSortBy === 'title') {
						sortedResults.sort((a, b) => a.title.localeCompare(b.title));
					} else if (currentSortBy === 'date') {
						// Correct date sorting
						sortedResults.sort(
							(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
						);
					}

					totalResults.current = sortedResults.length;

					const startIndex = (currentPage - 1) * itemsPerPage;
					const endIndex = startIndex + itemsPerPage;
					const paginatedResults = sortedResults.slice(startIndex, endIndex);

					const noResults = filteredByQuery.length === 0;
					const suggestedQuery =
						noResults && query.length > 3 ? query.slice(0, -1) : null; // Basic suggestion

					resolve({
						results: paginatedResults,
						total: sortedResults.length,
						suggestion: suggestedQuery ? [suggestedQuery] : [],
					});
					setLoading(false);
				}, 1000);
			});
		},
		[filters, sortBy] // Dependencies for useCallback
	);

	// Add type to triggerSearch parameter
	const triggerSearch = useCallback(
		(query: string) => {
			if (query.trim()) {
				setLoading(true);
				setError(null);
				setPage(1);
				// Use setSearchResults directly, no need for separate visibleResults if loading replaces content
				setSearchResults([]);
				setSuggestions([]);

				fetchSearchResults(query, 1)
					.then((data: FetchResponse) => {
						// Type the resolved data
						setSearchResults(data.results);
						setHasMore(data.total > itemsPerPage);
						setSuggestions(data.suggestion || []);
						if (!searchHistory.includes(query) && query.trim()) {
							const newHistory = [query, ...searchHistory.slice(0, 4)]; // Keep last 5 searches
							setSearchHistory(newHistory);
							localStorage.setItem('searchHistory', JSON.stringify(newHistory));
						}
						// Update URL
						const newUrl =
							window.location.pathname + `?q=${encodeURIComponent(query)}`;
						window.history.pushState({ path: newUrl }, '', newUrl);
					})
					.catch((err: Error) => {
						// Type the error
						setError(err.message || 'Failed to fetch search results.');
					})
					.finally(() => {
						setLoading(false);
					});
			} else {
				setSearchResults([]);
				setHasMore(false);
				totalResults.current = 0;
				setLoading(false);
				setError(null);
				setSuggestions([]);
				// Clear URL query parameter
				const newUrl = window.location.pathname;
				window.history.pushState({ path: newUrl }, '', newUrl);
			}
		},
		[fetchSearchResults, searchHistory] // Dependencies for useCallback
	);

	// Type event handlers
	const handleSearchInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchQuery(event.target.value);
	};

	const handleSearchInputKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === 'Enter') {
			triggerSearch(searchQuery);
		}
	};

	const clearSearchInput = () => {
		setSearchQuery('');
		setSearchResults([]);
		setHasMore(false);
		totalResults.current = 0;
		setError(null);
		setSuggestions([]);
		// Clear URL query parameter
		const newUrl = window.location.pathname;
		window.history.pushState({ path: newUrl }, '', newUrl);
	};

	const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newCategory = event.target.value;
		setFilters({ ...filters, category: newCategory });
		setPage(1);
		setSearchResults([]);
		setLoading(true);
		fetchSearchResults(searchQuery, 1, { category: newCategory }, sortBy)
			.then((data: FetchResponse) => {
				setSearchResults(data.results);
				setHasMore(data.total > itemsPerPage);
			})
			.catch((err: Error) =>
				setError(err.message || 'Failed to filter results.')
			)
			.finally(() => setLoading(false));
	};

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newSortBy = event.target.value;
		setSortBy(newSortBy);
		setPage(1);
		setSearchResults([]);
		setLoading(true);
		fetchSearchResults(searchQuery, 1, filters, newSortBy)
			.then((data: FetchResponse) => {
				setSearchResults(data.results);
				setHasMore(data.total > itemsPerPage);
			})
			.catch((err: Error) => setError(err.message || 'Failed to sort results.'))
			.finally(() => setLoading(false));
	};

	// Infinite scroll logic
	const loadMore = useCallback(() => {
		if (hasMore && !loading && searchQuery) {
			setLoading(true);
			const nextPage = page + 1;
			fetchSearchResults(searchQuery, nextPage)
				.then((data: FetchResponse) => {
					// Correctly update state using the functional form
					setSearchResults((prevResults) => [...prevResults, ...data.results]);
					setHasMore(totalResults.current > nextPage * itemsPerPage);
					setPage(nextPage);
				})
				.catch((err: Error) => {
					setError(err.message || 'Failed to load more search results.');
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [hasMore, loading, searchQuery, page, fetchSearchResults]);

	// Effect for scroll handling
	const handleScroll = useCallback(() => {
		if (resultsListRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = resultsListRef.current;
			if (
				scrollTop + clientHeight >= scrollHeight - 20 && // Trigger slightly before the end
				hasMore &&
				!loading &&
				searchQuery
			) {
				loadMore();
			}
		}
	}, [loadMore, hasMore, loading, searchQuery]);

	// Attach/detach scroll listener
	useEffect(() => {
		const listElement = resultsListRef.current;
		if (listElement) {
			listElement.addEventListener('scroll', handleScroll);
			return () => listElement.removeEventListener('scroll', handleScroll);
		}
	}, [handleScroll]);

	// Effect to update visible results (if using pagination differently)
	useEffect(() => {
		setVisibleResults(searchResults); // Directly use searchResults if UI updates with it
	}, [searchResults]);

	// Type suggestion and history click handlers
	const handleSuggestionClick = (suggestion: string) => {
		setSearchQuery(suggestion);
		triggerSearch(suggestion); // Trigger search on suggestion click
	};

	const handleSearchHistoryClick = (historyItem: string) => {
		setSearchQuery(historyItem);
		triggerSearch(historyItem); // Trigger search on history click
	};

	return (
		<>
			<h4 className="y-3 font-semibold text-xl">Search Results</h4>
			<div className="mb-6 relative">
				<input
					type="text"
					placeholder="Search..."
					className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-pri-color ${
						loading
							? 'opacity-70 cursor-wait border-pri-color-light'
							: 'border-gray-default'
					}`}
					value={searchQuery}
					onChange={handleSearchInputChange}
					onKeyDown={handleSearchInputKeyDown} // Handle Enter key press
					aria-label="Search"
					aria-describedby="search-results-list"
					disabled={loading}
				/>
				<div className="absolute inset-y-0 right-0 flex items-center pr-3">
					{searchQuery && !loading && (
						<button
							onClick={clearSearchInput}
							className="text-gray-darker hover:text-gray-dark mr-2 focus:outline-none"
							aria-label="Clear search query"
						>
							<IoCloseOutline />
						</button>
					)}
					<button
						onClick={() => triggerSearch(searchQuery)} // Handle search icon click
						className={`focus:outline-none ${
							loading
								? 'text-gray-400 cursor-not-allowed'
								: 'text-gray-darker hover:text-gray-dark'
						}`}
						aria-label="Search"
						disabled={loading}
					>
						{loading ? <Loader /> : <IoSearchOutline />}
					</button>
				</div>
			</div>

			{searchHistory.length > 0 && !searchQuery && (
				<div className="mb-4">
					<p className="text-sm text-gray-darker">Recent Searches:</p>
					<div className="flex flex-wrap gap-2">
						{searchHistory.map((item: string, index: number) => (
							<button
								key={index}
								className="bg-gray-100 text-gray-dark px-2 py-1 rounded-lg text-xs hover:bg-gray-200 focus:outline-none"
								onClick={() => handleSearchHistoryClick(item)}
							>
								{item}
							</button>
						))}
					</div>
				</div>
			)}

			<div className="flex items-center space-x-4 mb-4">
				<div>
					<label
						htmlFor="categoryFilter"
						className="block text-sm font-medium text-gray-darker"
					>
						Filter by Category:
					</label>
					<div className="relative">
						<select
							id="categoryFilter"
							className="block appearance-none w-full bg-white border border-gray-default hover:border-gray-dark px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline-yellow focus:border-yellow-focus text-sm"
							value={filters.category}
							onChange={handleFilterChange}
							disabled={loading}
						>
							<option value="all">All Categories</option>
							<option value="Technology">Technology</option>
							<option value="Science">Science</option>
							<option value="Art">Art</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-darker">
							<IoChevronDownOutline className="fill-current h-4 w-4" />
						</div>
					</div>
				</div>

				<div>
					<label
						htmlFor="sortBy"
						className="block text-sm font-medium text-gray-darker"
					>
						Sort by:
					</label>
					<div className="relative">
						<select
							id="sortBy"
							className="block appearance-none w-full bg-white border border-gray-default hover:border-gray-dark px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline-yellow focus:border-yellow-focus text-sm"
							value={sortBy}
							onChange={handleSortChange}
							disabled={loading}
						>
							<option value="relevance">Relevance</option>
							<option value="title">Title</option>
							<option value="date">Date (Newest)</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-darker">
							<IoChevronDownOutline className="fill-current h-4 w-4" />
						</div>
					</div>
				</div>
			</div>

			<div className="p-0 rounded-lg shadow-sm">
				{loading && searchResults.length === 0 && (
					<div className="text-center text-gray-darker py-6">
						<Loader /> Searching...
					</div>
				)}
				{error && (
					<div className="text-center text-red-dark py-6">Error: {error}</div>
				)}
				{!loading && searchResults.length === 0 && searchQuery && (
					<div className="text-center text-gray-dark py-6 italic">
						No results found for "{searchQuery}".
						{suggestions.length > 0 && (
							<p className="mt-2">
								Did you mean:
								{suggestions.map((suggestion, index) => (
									<button
										key={index}
										className="text-pri-color hover:underline ml-1"
										onClick={() => handleSuggestionClick(suggestion)}
									>
										{suggestion}
									</button>
								))}
								?
							</p>
						)}
						<p className="mt-2">
							Try a different search term or check your spelling.
						</p>
					</div>
				)}
				{searchResults.length > 0 && (
					<ul
						className="overflow-y-auto max-h-[600px]" // Adjust max-h as needed
						ref={resultsListRef}
						aria-live="polite"
						id="search-results-list"
					>
						{searchResults.map((result) => (
							<ResultItem
								key={result.id}
								result={result}
								searchQuery={searchQuery}
							/>
						))}
						{loading && searchResults.length > 0 && (
							<li className="text-center text-gray-darker py-3">
								<Loader /> Loading more results...
							</li>
						)}
						{!hasMore && searchResults.length > 0 && (
							<li className="text-center text-gray-dark py-3">
								No more results.
							</li>
						)}
					</ul>
				)}
				{!searchQuery && !loading && !error && (
					<div className="text-center text-gray-dark py-6 italic">
						Enter a search query to see results.
					</div>
				)}
			</div>
		</>
	);
};

export default SearchResultsPage;
