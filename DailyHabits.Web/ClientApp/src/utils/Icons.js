import React from 'react'
import { Icon } from 'semantic-ui-react'

const iconOptions = [
	{ name: 'User', value: 'user' },
	{ name: 'Upload', value: 'upload' },
	{ name: 'Headphones', value: 'headphones' }
].map(option => (
	{
		text: <span>
			<Icon name={option.value} />
			{option.name}
		</span>,
		value: option.value
	}
));

export { iconOptions };