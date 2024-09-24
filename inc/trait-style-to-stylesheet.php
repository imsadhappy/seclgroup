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

        return compact('dir', 'url');
    }

    protected function inline_css_filename($uri = null) {

        $uri = str_replace( home_url('/'),  '/',
                            !empty($uri) ? $uri : sanitize_url($_SERVER['REQUEST_URI']) );

        return md5( strtok($uri, '?') ) . '.css';
    }

    protected function extract_inline_css($handle) {

        global $wp_styles;
        
        $css = $wp_styles->get_data($handle, 'after');

        if (empty($css)) return;

        $wp_styles->remove($handle);
        $wp_styles->dequeue($handle);

        return implode("\n", $css);
    }

    protected function save_inline_css($css) {

        if (empty($css)) return;

        extract($this->inline_css_paths());

        if (!file_exists($dir))
            mkdir(untrailingslashit($dir), 0755);

        $fn = $this->inline_css_filename();

        if (!file_exists($dir.$fn))
            file_put_contents($dir.$fn, $css);

        global $wp_styles;

        $id = str_replace("\\", '-', strtolower(__TRAIT__));

        $wp_styles->enqueue($id);
        $wp_styles->add($id, $url.$fn, array(), filemtime($dir.$fn));
    }

    protected function inline_css_in_wp_footer($handles = array()) {

        add_action('wp_footer', function () use ($handles) {
            $css = "";
            foreach ((array) $handles as $handle) {
                $css .= $this->extract_inline_css($handle);
            }
            $this->save_inline_css($css);
        });

        add_action('save_post', array($this, 'purge_inline_css'));
    }

    public function purge_inline_css($post_id) {

        $dir = $this->inline_css_paths()['dir'];
        $fn = $this->inline_css_filename(get_permalink($post_id));

        if (file_exists($dir.$fn))
            unlink($dir.$fn);
    }
}
