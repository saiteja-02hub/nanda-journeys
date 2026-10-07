<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all customer-facing business facts and external contact links in one shared configuration module so updates stay consistent across the site.
- Keep repeated website content such as services, fleet categories, destinations, and reviews data-driven so it can be edited without changing section markup.
- Keep this explicitly single-scrolling website at `/`; section navigation scrolls without persisting hashes, and document entry resets scroll so restored About positions cannot become the landing view.
- Use shared travel Button variants and semantic global tokens for website actions and visual styling so presentation stays consistent.
