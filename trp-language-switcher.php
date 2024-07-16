<?php

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

if ( ! function_exists('trp_custom_language_switcher') ) {
    function trp_custom_language_switcher () {
        $uri = get_template_directory_uri();
        return [
            'en_US' => [
                'language_name' => 'USA',
                'language_code' => 'en_US',
                'short_language_name' => 'en',
                'flag_link' => $uri . '/assets/flags/us.svg',
                'current_page_url' => '#'
            ],
            'uk' => [
                'language_name' => 'UA',
                'language_code' => 'uk',
                'short_language_name' => 'uk',
                'flag_link' => $uri . '/assets/flags/ua.svg',
                'current_page_url' => 'https://secl.com.ua/'
            ]
        ];
    }
}

$print_language_link = function ($language, $disabled = false) {
    $locale = get_locale();
    ?><a href="<?php echo $locale == $language['language_code'] ? '#' : $language['current_page_url']?>"
        <?php if ($disabled) echo 'class="trp-ls-shortcode-disabled-language trp-ls-disabled-language"' ?>
        rel="alternate"
        hreflang="<?php echo $locale == $language['language_code'] ? 'x-default' : $language['short_language_name']?>"
        title="<?php echo $language['language_name'] ?>">
        <img class="trp-flag-image"
                src="<?php echo $language['flag_link'] ?>"
                width="24"
                height="16"
                alt="<?php echo $language['language_name'] ?>"
                title="<?php echo $language['language_name'] ?>"><?php
            echo strtoupper($language['language_name'])
    ?></a><?php
};

$languages = call_user_func('trp_custom_language_switcher'); ?>

<div class="trp_language_switcher_shortcode">
    <div class="trp-language-switcher trp-language-switcher-container" data-no-translation="">
        <?php /* div class="trp-ls-shortcode-current-language">
            <?php $print_language_link($languages[get_locale()], true) ?>
        </div */ ?>
        <div class="trp-ls-shortcode-language">
            <?php foreach ( $languages as $language ) { $print_language_link($language); } ?>
        </div>
    </div>
</div>

<?php /* script>
    ((a) => {
        if (a.length > 0) {
            var d = a[a.length - 1];
            var b = d.querySelector( '.trp-ls-shortcode-language' )
            var c = b.offsetWidth + 16;
            b.style.width = c + 'px';
            d.querySelector( '.trp-ls-shortcode-current-language' ).style.width = c + 'px';
            b.style.display = 'none';
        }
    })(document.querySelectorAll('.trp_language_switcher_shortcode .trp-language-switcher'))
</script */ ?>
