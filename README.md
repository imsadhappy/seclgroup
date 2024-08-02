#  SECLGroup theme.

Based on `_s` (`underscores`).

Contributors: SECLGroup

Tags: custom-background, custom-logo, custom-menu, featured-images, threaded-comments, translation-ready

Requires at least: 4.5

Tested up to: 5.4

Requires PHP: 5.6

Stable tag: 1.0.0

License: GNU General Public License v2 or later

License URI: LICENSE

### Installation

1. In your admin panel, go to Appearance > Themes and click the Add New button.
2. Click Upload Theme and Choose File, then select the theme's .zip file. Click Install Now.
3. Click Activate to use your new theme right away.

### Requirements

- [Node.js](https://nodejs.org/)
- [Composer](https://getcomposer.org/)

### Setup

To start using all the tools that come with `SECLGroup` you need to install the necessary Node.js and Composer dependencies :

```sh
$ composer install
$ npm install
```

### CLI commands

- `npm run build:css` : compiles SASS files to css.
- `npm run build:rtl` : generates an RTL stylesheet.
- `npm run build:js` : compiles js files from `js/src`.
- `npm run watch` : watches all SASS files and recompiles them to css when they change.
- `composer lint:wpcs` : checks all PHP files against [PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/).
- `composer lint:php` : checks all PHP files for syntax errors.
- `composer make-pot` : generates a .pot file in the `languages/` directory.
- `npm run lint:scss` : checks all SASS files against [CSS Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/).
- `npm run lint:js` : checks all JavaScript files against [JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/).
- `npm run bundle` : generates a .zip archive for distribution, excluding development and system files.

### Credits

* Based on Underscores https://underscores.me/, (C) 2012-2020 Automattic, Inc., [GPLv2 or later](https://www.gnu.org/licenses/gpl-2.0.html)
* normalize.css https://necolas.github.io/normalize.css/, (C) 2012-2018 Nicolas Gallagher and Jonathan Neal, [MIT](https://opensource.org/licenses/MIT)

### Versions

Version 1.3.3
- migrated from node-sass to dart sass
- added .new-faq design

Version 1.3.2
- added noindex_override
- refac fix_rel_canonical

Version 1.3.1

- fix breadcrumbs z-index
- pagination noindex/nofollow on author page (publications block)
- refac

Version 1.3.0

- added breadcrumbs
- added page for projects
- enhanced code snippets / cookie scripts output

Version 1.2.1

- hotfixes

Version 1.2.0

- added cookie policy page setting
- added cookie notice feature
- author page design
- bug fixes

Version 1.1.1

- added defer to wpcf7 scripts
- bug fixes

Version 1.1.0

- security update (also added =404 in nginx & Options -Indexes in apache)

Version 1.0.3

- bug fixes
- code snippets

Version 1.0.2

- bug fixes
- perf optimization
- added enqueue trait with 2 strategies: inline & file-based

Version 1.0.1

- perf optimization

Version 1.0.0

- release

Version 0.9.40

- bug fixes
- removed unused gutenberg blocks
- exported latest ACF

Version 0.9.20

- pre-release bug fixes & updates

Version 0.9.10

- projects cpt (project list & logo blocks)

Version 0.9.4

- bug fixes

Version 0.9.25

- refactored scss, js
- new blocks: review slider, our team (re-written)

Version 0.9.20

- refactored scss
- about-page design

Version 0.9.3

- minor design updates
- minor bug fixes

Version 0.8.7

- minor blog design update
- minor bug fixes

Version 0.8.6

- contact page switcher redesign

Version 0.8.5

- new mobile menu design

Version 0.8.4

- wpcf7 popup design update

Version 0.8.3

- shortcode trait: solutions / services index & menu

Version 0.8.2

- contact page with map swiper
- industries
- js components with loader
- block js moved to /blocks

Version 0.7.9

- blog & post fixes

Version 0.7.2

- trait ajax -> trait wpcf7
- css changes
- excerpt length

Version 0.7.0

- blog & post

Version 0.6.0

- home, solutions & services pages
