# How to apply the CSS additions

Open `src/styles/global.css` and add this line **at the very top** (after the `@import` block but before anything else), OR at the very bottom of the file:

```css
@import "./additions.css";
```

The additions file is idempotent and only **adds** new rules, plus re-declares two CSS variables (`--muted`, `--dim`) with a darker shade to fix the body-contrast issue flagged in audit item #9.

If you want to inline the rules directly into `global.css` instead of importing, just paste the contents of `additions.css` at the end of `global.css`.
