<?php

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

$print_language_link = function ($language, $disabled = false) {
    $locale = get_locale();
    ?><a href="<?php echo $locale == $language['language_code'] ? '#' : $language['current_page_url']?>"
        <?php if ($disabled) echo 'class="trp-ls-shortcode-disabled-language trp-ls-disabled-language"' ?>
        rel="alternate"
        hreflang="<?php echo $locale == $language['language_code'] ? 'x-default' : $language['short_language_name']?>"
        title="<?php echo $language['language_name'] ?>">
        <img class="trp-flag-image" width="24" height="16" loading="lazy"
                src="<?php echo $language['flag_link'] ?>"
                alt="<?php echo $language['language_name'] ?>"
                title="<?php echo $language['language_name'] ?>"><?php
            echo strtoupper($language['language_name'])
    ?></a><?php
};

?><div class="trp_language_switcher_shortcode" style="height:24px">
    <div class="trp-language-switcher trp-language-switcher-container" data-no-translation="">
        <?php /* div class="trp-ls-shortcode-current-language">
            <?php $print_language_link($languages[get_locale()], true) ?>
        </div */ ?>
        <div class="trp-ls-shortcode-language">
            <?php foreach ( call_user_func('trp_custom_language_switcher') as $language ) { 
                $print_language_link($language); 
            } unset($print_language_link, $language); ?>
        </div>
    </div>
</div><?php /* script>
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
