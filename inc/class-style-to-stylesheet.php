<?php
/**
 * Inline style to stylesheet (link)
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

include 'exit.php';

class StyleToStylesheet {

    protected $folder = '/inline_css/';

    function __construct($handles = array()) {

        add_action('wp_footer', function () use ($handles) {
            $css = "";
            foreach ((array) $handles as $handle) {
                $css .= $this->extract_inline_css($handle);
            }
            $this->save_inline_css($css);
        });

        add_action('save_post', array($this, 'purge_inline_css'));
        add_filter('wp_super_cache_clear_post_cache', array($this, 'purge_inline_css'));
    }

    protected function inline_css_paths() {
        
        $uploads = wp_get_upload_dir();
        $dir = $uploads['basedir'] . $this->folder;
        $url = $uploads['baseurl'] . $this->folder;

        return compact('dir', 'url');
    }

    protected function inline_css_filename($uri = null) {

        $uri = str_replace( home_url('/'),  '/', empty($uri) ? get_request_uri() : $uri );

        return get_current_blog_id() . '-' . md5( $uri ) . '.css';
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

    public function purge_inline_css($post_id) {

        $url = get_permalink($post_id);
        $fn = $this->inline_css_filename($url);

        if (empty($fn)) return;
        
        $dir = $this->inline_css_paths()['dir'];

        if (file_exists($dir.$fn)) {
            unlink($dir.$fn);
            error_log("Purged inline_css for $url in action " . current_filter());
        }
    }
}
