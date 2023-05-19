import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Placeholder, TextControl } from '@wordpress/components';
import './editor.scss';

export default function edit() {
	const blockProps = useBlockProps()
	const ALLOWED_BLOCKS = [ 'mxltcs/nested-blocks-child-blocks-block-one' ];
	return (
		<div  {...blockProps}>
			{/* <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } /> */}
			<InnerBlocks />
		</div>
	);
}
