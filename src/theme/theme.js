import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from "./components/button";
import { badgeStyles } from "./components/badge";
import { linkStyles } from "./components/link";
import { drawerStyles } from "./components/drawer";
import { CardComponent } from "./additions/card/Card";
import { CardBodyComponent } from "./additions/card/CardBody";
import { CardHeaderComponent } from "./additions/card/CardHeader";
import { MainPanelComponent } from "./additions/layout/MainPanel";
import { PanelContentComponent } from "./additions/layout/PanelContent";
import { PanelContainerComponent } from "./additions/layout/PanelContainer";
// import { mode } from "@chakra-ui/theme-tools";
export default extendTheme(
	{
		breakpoints,

		colors: {
			primary: {
				DEFAULT: "#c0a700", // Gold
				dark: "#e0c100", // Darker gold
			},
			secondary: {
				DEFAULT: "#3b82f6", // Gold 500
				dark: "#1e40af", // Gold 700
			},
			background: {
				DEFAULT: "#f3f4f6", // Gray 100
				dark: "#1f2937", // Gray 800
			},
			contrast: {
				DEFAULT: "#1f2937", // Gray 800
				dark: "#f3f4f6", // Gray 100
			},
			text: {
				DEFAULT: "#1f2937", // Gray 800
				dark: "#f3f4f6", // Gray 100
			},
			gold: {
				50: "#f2e8b6",
				100: "#ebde8f",
				200: "#e4d468",
				300: "#ddca40",
				400: "#d6c01c",
				500: "#c0a700", // Base Gold color
				600: "#a28900",
				700: "#846b00",
				800: "#655000",
				900: "#463500",
				DEFAULT: "#c0a700", // Gold
			},
		},
	}, // Breakpoints
	globalStyles,
	buttonStyles, // Button styles
	badgeStyles, // Badge styles
	linkStyles, // Link styles
	drawerStyles, // Sidebar variant for Chakra's drawer
	CardComponent, // Card component
	CardBodyComponent, // Card Body component
	CardHeaderComponent, // Card Header component
	MainPanelComponent, // Main Panel component
	PanelContentComponent, // Panel Content component
	PanelContainerComponent // Panel Container component
);
