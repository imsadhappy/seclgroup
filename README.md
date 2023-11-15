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

- `composer lint:wpcs` : checks all PHP files against [PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/).
- `composer lint:php` : checks all PHP files for syntax errors.
- `composer make-pot` : generates a .pot file in the `languages/` directory.
- `npm run compile:css` : compiles SASS files to css.
- `npm run compile:rtl` : generates an RTL stylesheet.
- `npm run watch` : watches all SASS files and recompiles them to css when they change.
- `npm run lint:scss` : checks all SASS files against [CSS Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/).
- `npm run lint:js` : checks all JavaScript files against [JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/).
- `npm run bundle` : generates a .zip archive for distribution, excluding development and system files.

### Credits

* Based on Underscores https://underscores.me/, (C) 2012-2020 Automattic, Inc., [GPLv2 or later](https://www.gnu.org/licenses/gpl-2.0.html)
* normalize.css https://necolas.github.io/normalize.css/, (C) 2012-2018 Nicolas Gallagher and Jonathan Neal, [MIT](https://opensource.org/licenses/MIT)

### Versions

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
