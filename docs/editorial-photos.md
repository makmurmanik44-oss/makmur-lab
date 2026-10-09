# Editorial photographs

The existing port Living Cover stays in place. Four contextual photographs extend its visual language to the two homepage starting questions, note/journal/case cards, all eighteen existing material detail pages, and selected major headings in the four notes. Long paragraphs, comparisons, references, worksheet inputs, and evidence records stay on solid reading surfaces.

`src/content/editorial-photos.ts` stores local image identities, small/full variants, focal positions, source URLs, and photographers. Domain matching is shared by cards and material intros: procurement → requirement review, supply chain/industrial engineering → production, technology → analysis, personal growth/book notes → learning. Select a more specific photograph when future content needs one rather than implying an unrelated stock scene is project evidence.

`articlePhotoSections` points to current MDX heading IDs. Rendering adds a photograph behind those headings without editing note bodies or changing their anchors, titles, TOC, Search text, or metadata. The export guard checks every selected heading and each local WebP variant against its exported copy. Remove/update a mapping when its target section changes.

The responsive picture source serves the 640 × 400 copy on viewports up to 700 px and the 1600 × 1000 copy on larger screens. Intro images load eagerly; cards and in-note banners load lazily. Keep image sizes bounded, inspect both crops, and preserve the dark fallback surface. The current variants range from about 11–42 KB for small copies and 45–151 KB for large copies.

Images are decorative, with empty alternative text; headings, summaries, and links supply the content. A static dark overlay keeps text legible in either theme, and image failure retains white text on a dark surface. Detail intros link to their photographer's source page. [Image credits](../public/IMAGE_CREDITS.md) record the actual source/license check, subject, crops, and limitations. Stock photographs do not represent Makmur's workplace, supplier assessments, or verified outcomes.

Print removes the photographs and credits, restores dark text on white, and retains worksheet questions, answers, supporting links, and the existing A4 layout. The photo components render statically and require no client JavaScript. There are no slideshow controls, parallax, automatic animation, added dependencies, or new published content routes.
