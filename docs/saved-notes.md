# Saved learning notes

`/saved/` lists published learning notes saved in the current browser, most recently saved first. Save note controls appear on homepage/catalog cards and each note's Knowledge Card. The header bookmark, footer, Knowledge controls, and note page link to the collection. Pressing a saved control removes that note; removal from the collection returns keyboard focus to its heading.

The root client provider reads browser storage after hydration. Server-rendered save buttons start disabled and the collection shows a loading state, so no browser data is treated as build-time content. Client navigation retains the current collection; reload restores it. Other same-origin tabs synchronize additions/removals and cleared storage. Mutations read the latest stored collection before changing one note to preserve other tabs' saves.

The versioned `makmur-lab-saved-notes-v1` record contains only ordered article slugs. It has no account, synchronization service, reading history, completion status, or analytics. Another browser/device has an independent collection; clearing site data removes saves. Sharing the page URL does not share the collection. The browser origin determines storage scope, so moving to another host will not carry saves automatically.

Parsing accepts only supported version/shape, deduplicates identities, and ignores unavailable or unpublished notes. Invalid/oversized records recover to an empty collection; user mutations write the supported format. The current small collection is bounded to 200 saved identities and 16,384 input characters. No stored identity supplies an arbitrary route, title, or content.

If storage access or writing fails, the provider retains the collection in the current open tab. Saved controls and the collection explain that reload loses these temporary saves. Without JavaScript, the collection links to published notes; static article content stays available.

Save state is separate from Learning/Developing status, reading progress, and editorial evidence. Worksheets, worked examples, guides, journal reflections, and learning cases are outside this first note-saving scope. Search keeps its eighteen existing documents. The personal saved collection is not indexed as a search document or listed in the sitemap.

Unit checks cover malformed/unsupported/bounded storage, deduplication, reversible newest-first changes, published-identity resolution, and source preservation. Browser QA covers actual persistence, separate browser contexts, tab synchronization, navigation, removal focus, storage-denied/quota cases, empty states, JavaScript-free access, responsive layouts, and both themes.
