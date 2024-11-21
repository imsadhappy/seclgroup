<?php
/**
 * CookieNotice
 *
 * @package SECLGroup
 */

namespace SECLGroup;

include 'exit.php';

class CookieNotice {

    function __construct() {

        if ( ! function_exists('Cookie_Notice') ) return;

        add_action( 'wp_footer', function () {
            inline_script('/js/components/no-cookies.js');
        }, 100500 );

        add_action( 'admin_footer', function () { $this->fix_cookie_notice_admin_fields(); }, 999 );

        add_filter( 'code_snippets_filter', function ( $html ) {
            return \Cookie_Notice()->cookies_accepted() ? str_replace(' type="text/if-cookie-notice-accepted"', '', $html) : $html;
        } );
    }

    private function fix_cookie_notice_admin_fields() {

        global $pagenow;

        if ( 'admin.php' !== $pagenow ||
             ! isset($_GET['page']) ||
             'cookie-notice' !== $_GET['page'] )
                return;

        ?><script data-app_id="<?php echo $this->get_cookie_notice_('app_id') ?>"
                    data-app_key="<?php echo $this->get_cookie_notice_('app_key') ?>">(updateField => {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    <?php if (empty($this->get_cookie_notice_('app_id'))) : ?>
                        updateField('[name="cookie_notice_options[app_id]"]');
                    <?php endif ?>
                    <?php if (empty($this->get_cookie_notice_('app_key'))) : ?>
                        updateField('[name="cookie_notice_options[app_key]"]');
                    <?php endif ?>
                }, 999)
            })
        })(x => {
            let field = document.querySelector(x)
            field.autocomplete = 'off'
            field.value = ''
        })
        </script><?php
    }

    private function get_cookie_notice_( $setting ) {
        return \Cookie_Notice()->options['general'][$setting];
    }
}
