<?php
/**
 * Inline style to stylesheet (link) trait
 *
 * What is the purpose? W3C Validator spits errors
 * on inline <style> tags if placed in <body>.
 * Using this trait you can dequeue inlined <style>
 * and place it inside a <link stylesheet>
 *
 * Generates a shitload of individual styles
 * in uploads folder: a file for every url.
 * But considering the fact that files are 1-5kb -
 * we can live with that.
 *
 * @package SECLGroup
 */

namespace SECLGroup;

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

trait StyleToStylesheet {

    protected $folder = '/inline_css/';

    protected function inline_css_paths() {
        
        $uploads = wp_get_upload_dir();
        $dir = $uploads['basedir'] . $this->folder;
        $url = $uploads['baseurl'] . $this->folder;

        return compact('dir', 'url');;
    }

    protected function save_inline_css($handle) {

        /** @var \WP_Styles $wp_styles */
        global $wp_styles;

        $css = $wp_styles->get_data($handle, 'after');

        if ( empty($css) ) return;

        $css = implode("\n", $css);
        extract($this->inline_css_paths());
        $uri = explode("?", $_SERVER['REQUEST_URI']);
        $filename = md5(reset($uri)) . '.css';

        if (!file_exists($dir))
            mkdir(untrailingslashit($dir), 0755);

        file_put_contents($dir.$filename, $css);

        // error_log("saved " . reset($uri) . " - " . $filename);

        $wp_styles->remove($handle);
        $wp_styles->add($handle, $url.$filename);
    }

    protected function inline_css_in_wp_footer( $handles = array() ) {

        add_action('wp_footer', function () use ($handles) {
            foreach ( (array) $handles as $handle )
                $this->save_inline_css($handle);
        });

        add_action('save_post', array($this, 'purge_inline_css'));
    }

    public function purge_inline_css( $post_id ) {

        $dir = $this->inline_css_paths()['dir'];
        $uri = str_replace(home_url('/'), '/', get_permalink($post_id));
        $filename = md5($uri) . '.css';

        if (file_exists($dir.$filename))
            unlink($dir.$filename);

        // error_log("purged " . $uri . " - " . $filename);
    }
}
