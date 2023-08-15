<?php

if (function_exists('trp_custom_language_switcher')) :

$print_language_link = function($language, $disabled = false){
    ?><a href="<?php echo get_locale() == $language['language_code'] ? 'javascript:void(0)' : $language['current_page_url']?>"
        <?php if ($disabled) echo 'class="trp-ls-shortcode-disabled-language trp-ls-disabled-language"' ?>
        title="<?php echo $language['language_name'] ?>">
        <img class="trp-flag-image"
                src="<?php echo $language['flag_link'] ?>"
                width="18"
                height="12"
                alt="<?php echo $language['language_name'] ?>"
                title="<?php echo $language['language_name'] ?>"><?php
            echo strtoupper($language['language_name'])
    ?></a><?php
};

$languages = call_user_func('trp_custom_language_switcher'); ?>

<div class="trp_language_switcher_shortcode">
    <div class="trp-language-switcher trp-language-switcher-container" data-no-translation="">
        <div class="trp-ls-shortcode-current-language">
            <?php $print_language_link($languages[get_locale()], true) ?>
        </div>
        <div class="trp-ls-shortcode-language">
            <?php foreach ( $languages as $language ) { $print_language_link($language); } ?>
        </div>
    </div>
</div>

<script>
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
</script>

<?php endif;
