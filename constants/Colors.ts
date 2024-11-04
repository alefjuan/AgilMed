/**
 * Colors file for theme management in the app.
 * You can customize colors for light and dark mode here.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#ffffff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#ffffff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: "#6DAEAE",
    lightBackground: '#f5f5f5',
    inputBackground: '#ffffff',
    border: '#e0e0e0',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#00A8E8',
    darkBackground: '#1A1A1A',
    lightText: '#AAAAAA',
    inputBackground: '#333333',
    border: '#444444',
  },
};

export default Colors;
