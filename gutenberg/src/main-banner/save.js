import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default function save({ attributes }) {
	const blockProps = useBlockProps.save()
	const style = () => {

		let styleObj = {}

		if (attributes?.mediaUrl) {
			
			styleObj.backgroundImage = 'url("' + attributes.mediaUrl + '")'
			
		}

		return styleObj

	}
	return <div
		style={ style() }
		data-image-id={attributes.mediaId}
		data-image-url={attributes.mediaUrl}
		className="mxltcs-main-banner-wrapper"
	>
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	</div>
}
