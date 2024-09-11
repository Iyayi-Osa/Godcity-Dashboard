import { mode } from '@chakra-ui/theme-tools';
import './tailwind.css'

export const globalStyles = {
	colors: {
		gray: {
			700: '#1f2733'
		}
	},
	styles: {
		global: (props) => ({
			body: {
				bg: mode('#f2f5fa', 'gray.800')(props),
				fontFamily: "'Roboto', sans-serif",
				/* Custom scrollbar styles */
				'::-webkit-scrollbar': {
					width: '4px', // Thin scrollbar
				},
				'::-webkit-scrollbar-thumb': {
					bg: '#FFC107', // Gold color
					borderRadius: '10px', // Optional: Rounded corners
				},
				'::-webkit-scrollbar-track': {
					bg: 'transparent', // Transparent track
				}
			},
			html: {
				fontFamily: "'Roboto', sans-serif"
			}
		})
	}
};
