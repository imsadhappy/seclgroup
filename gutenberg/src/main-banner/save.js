import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();

	const style = () => {

		let styleObj = {}

		if (attributes?.mediaBGUrl) {
			
			styleObj.backgroundImage = 'url("' + attributes.mediaBGUrl + '")'
			
		}

		return styleObj

	};

	const css = `
		.mxltcs-main-banner-title em {
			background-image: url("${attributes?.mediaCircleUrl}");
		}
		.wp-block-mxltcs-main-move-down a {
			background-image: url("${attributes?.mediaMoveDownUrl}");
		}
	`;

	return [
		<div
			{...blockProps}
			style={ style() }
			data-image-id={attributes.mediaBGId}
			data-image-url={attributes.mediaBGUrl}
			data-image-circle-url={attributes.mediaCircleUrl}
			data-image-circle-id={attributes.mediaCircleId}
			data-image-move-down-id={attributes.mediaMoveDownId}
			data-image-move-down-url={attributes.mediaMoveDownUrl}
			className="mxltcs-main-banner-wrapper"
		>
			<style>
				{css}
			</style>
			<InnerBlocks.Content />
		</div>
	]
}
