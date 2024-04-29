<?php
/**
 * Shortcodes trait
 *
 * @package SECLGroup
 */

namespace SECLGroup;

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

trait Shortcodes {

    public function use_shortcodes( $shotcodes = array() ) {

        foreach ( $shotcodes as $shotcode ) {
            $f = $shotcode.'_shortcode';
            if ( method_exists( $this, $f ) )
                add_shortcode( $shotcode, function( $atts ) use ( $f ) {
                    return $this->{$f}($atts);
                } );
        }
    }

    protected function contact_shortcode( $atts ) {

        if ( !isset($atts['type']) || !isset($atts['location']) || !function_exists('get_field') )
            return '';

        $type = $value = $template = '';

        switch (strtolower($atts['type'])) {
            case 'address':
                    $type = 'address';
                    $template = '<address class="contact-field contact-address contact-location-%s">%s</address>';
                break;
            case 'mail':
            case 'email':
            case 'e-mail':
                    $type = 'email';
                    $template = '<a class="contact-field contact-email contact-location-%1$s" href="mailto:%2$s">%2$s</a>';
                break;
            case 'phone':
            case 'tel':
            case 'telephone':
                    $type = 'phone';
                    $template = '<a class="contact-field contact-phone contact-location-%1$s" href="tel:+%2$s">%3$s</a>';
                break;
        }

        $location = strtolower($atts['location']);
        $contacts = get_field('contacts', 'option');

        if ( is_array($contacts) && !empty($contacts) ) {
            foreach ($contacts as $contact) {
                if ( ! isset($contact['location'])
                     || strtolower($contact['location']) !== $location )
                        continue;
                if ( isset($contact[$type]) )
                    $value = nl2br($contact[$type]);
            }
        }

        if (empty($value))
            return '';

        if ($type === 'phone')
            return sprintf($template, $location, preg_replace('/[^0-9]/', '', $value), $value);

        return sprintf($template, $location, $value);
    }

    protected function menu_shortcode( $atts ) {

        $html = '';
        $menu = false;
        $class = isset($atts['class']) ? esc_attr($atts['class']) : '';

        if ( isset($atts['name']) )
            $menu = wp_get_nav_menu_items('header');

        if ( !empty($menu) && isset($atts['parent']) ) {

            $parents = array_values( array_filter($menu, function($item) use ($atts) {
                return strtolower($item->title) === strtolower($atts['parent']);
            } ) );

            if ( ! empty( $parents ) )
                $menu = array_values( array_filter($menu, function($item) use ($parents) {
                    return intval($item->menu_item_parent) === $parents[0]->ID;
                } ) );
        }

        $uid = uniqid('shortcode-');
        $html = sprintf( '<ul class="menu shortcode-menu %s">%s</ul>',
                        $class,
                        walk_nav_menu_tree($menu, 0, (object) array(
                            'after'       => '', 'before'      => '',
                            'link_after'  => '', 'link_before' => ''
                        ))
                    );

        return str_replace(' id="', " id=\"$uid--", $html);
    }
}
