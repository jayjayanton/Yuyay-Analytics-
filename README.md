# Yuyay Analytics

A bilingual consulting website, rooted in Quito and organized around **two complementary practices**:

1. **Evaluation & impact** — led by Clemencia Vela, MSc. Independent programme evaluation, climate adaptation, biodiversity, stakeholder insight and institutional learning.
2. **Data, geospatial & software** — led by Jay Oliver. Data engineering, machine learning, remote sensing, GIS and analytical applications.

**Public site:** https://jayjayanton.github.io/Yuyay-Analytics-/

## Design and content

The shared design system lives in `css/site.css`; the whole site uses **midnight navy, cobalt, pale blue and warm amber** to avoid resembling PredioAI's green identity.

- `index.html`: clear offering, outcomes, selected evidence and people.
- `services.html`: six tightly defined service capabilities and practical delivery methods.
- `projects.html` and `js/projects.js`: searchable bilingual case library. Case roles are attributed to individuals and not automatically presented as Yuyay institutional clients.
- `about.html`: two principal profiles and master CV links.
- `publications.html`: research and reports with author/role credit.
- `countries.html`: concise regional experience (not current office locations).
- `contact.html`: direct contact routes by practice.
- `js/main.js`: accessible navigation, English/Spanish switch and persisted preference.

All principal public pages have translations using `data-en` and `data-es`. The switch updates page text, page titles, search inputs and internal language links. Project records include bilingual titles and project descriptions.

## Complete CVs

- **Jay Oliver:** Master PDF hosted by the personal portfolio at `https://jayjayanton.github.io/Website-Portfolio/assets/Jay_Antonio_Oliver_CV.pdf` (complete professional history, not a focused two-page variant).
- **Clemencia Vela:** `documents/Clemencia_Vela_Master_CV.pdf`, generated from editable `documents/clemencia-master.html` by `.github/workflows/build-clemencia-cv.yml`. This fuller CV supersedes the two-page `documents/Clemencia_Vela_CV.pdf` promotional profile for team download links.

The public master CV deliberately omits a private residential street address. Review the career record before any new public update.

## Checks

Run:

```bash
python -m unittest discover -s tests -v
```

GitHub Actions runs these checks after commits. The master PDF workflow renders, checks page count/text and commits the generated PDF.

## Attribution and privacy

The projects showcase individual prior professional experiences, academic research and independent software. **They do not imply that UN bodies, universities, agencies or employers are current clients of Yuyay Analytics.**

PredioAI is credited to Jay Oliver as creator and sole developer. The site links to the live application, not its source repository.
