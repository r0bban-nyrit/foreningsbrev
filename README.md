# foreningsbrev.se

Webbplats för Föreningsbrev – utskick för föreningar till medlemmar, sponsorer och nya medlemmar.

Byggd med [Astro](https://astro.build) + React-öar + Tailwind CSS.

## Kom igång

Kräver Node 22.22 eller senare.

```sh
npm install
npm run dev       # utvecklingsserver på http://localhost:4321/foreningsbrev
npm run build     # bygger statiska filer till dist/
npm run preview   # förhandsgranska bygget
```

## Struktur

```
src/
  layouts/BaseLayout.astro   # <head>, SEO, header och footer
  components/*.astro         # statiska komponenter (ingen JS till besökaren)
  components/*.tsx           # React-komponenter, laddas bara där de används med client:*
  pages/                     # en fil = en sida (index, tjanster, sa-funkar-det)
  lib/url.ts                 # url()-helper för interna länkar + kontaktadress
```

- **Lägga till en sida:** skapa `src/pages/namn.astro` och använd `BaseLayout`.
- **Interaktiv React-del:** importera komponenten i en sida och ge den ett direktiv, t.ex. `<PriceCalculator client:visible />`. Utan direktiv renderas den som ren HTML.
- **Länkar:** använd `url('/sidan')` så att länkarna fungerar oavsett base-path.
- **Priser:** exempelpriserna finns i `src/components/PriceCalculator.tsx` och `src/pages/sa-funkar-det.astro`.

## Publicering på GitHub Pages

1. Gå till *Settings → Pages* i repot och välj **Source: GitHub Actions**.
2. Pusha till `main`. Då bygger och publicerar `.github/workflows/deploy.yml` sidan på
   `https://r0bban-nyrit.github.io/foreningsbrev/`.

## Byta till egen domän (foreningsbrev.se)

1. I `astro.config.mjs`: sätt `site: 'https://foreningsbrev.se'` och ta bort `base`.
2. På GitHub Pages: lägg till filen `public/CNAME` med innehållet `foreningsbrev.se` och peka DNS mot GitHub.
   Hostar du själv: lägg ut innehållet i `dist/` på din webbserver.

## Slå på SSR vid egen hosting

När sidan körs på en egen server kan enskilda sidor renderas vid varje besök, t.ex. för formulär, inloggning eller en kundportal:

```sh
npx astro add node
```

Lägg sedan `export const prerender = false;` i frontmattern på de sidor som ska vara SSR. Övriga sidor förblir statiska. Starta med `node dist/server/entry.mjs`.
