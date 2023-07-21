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

trait StyleToStylesheet {

    protected $folder = '/inline_css/';

    protected function process($handle) {

        /** @var \WP_Styles $wp_styles */
        global $wp_styles;

        $css = $wp_styles->get_data($handle, 'after');

        if ( empty($css) ) return;

        $css = implode("\n", $css);
        $uploads = wp_get_upload_dir();
        $dir = $uploads['basedir'] . $this->folder;
        $url = $uploads['baseurl'] . $this->folder;
        $filename = md5($_SERVER['REQUEST_URI']) . '.css';

        if ( !file_exists($dir))
            mkdir(untrailingslashit($dir), 0755);

        file_put_contents($dir.$filename, $css);

        $wp_styles->remove($handle);
        $wp_styles->add($handle, $url.$filename);
    }

    protected function styles_in_wp_footer( $handles = array() ) {

        add_action('wp_footer', function () use ($handles) {
            foreach ( (array) $handles as $handle )
                $this->process($handle);
        });
    }
}
