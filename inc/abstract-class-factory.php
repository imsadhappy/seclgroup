<?php
/**
 * Factory
 *
 * @package SECLGroup
 */

namespace SECLGroup;

include 'exit.php';

abstract class Factory
{
    function __construct( $methods = array() ) {
        
        foreach ($methods as $method) {
            if (method_exists($this, $method))
                $this->{$method}();
        }
    }
}
