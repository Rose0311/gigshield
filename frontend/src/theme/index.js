export const colors = {
    primary: '#2563EB',
    primaryDark: '#1D4ED8',
    primaryLight: '#EFF6FF',
    success: '#16A34A',
    successLight: '#F0FDF4',
    warning: '#D97706',
    warningLight: '#FFFBEB',
    danger: '#DC2626',
    dangerLight: '#FEF2F2',
    purple: '#7C3AED',
    purpleLight: '#F5F3FF',
    orange: '#EA580C',
    orangeLight: '#FFF7ED',
    dark: '#0F172A',
    darkMid: '#1E293B',
    gray900: '#111827',
    gray700: '#374151',
    gray500: '#6B7280',
    gray400: '#9CA3AF',
    gray200: '#E5E7EB',
    gray100: '#F3F4F6',
    gray50: '#F9FAFB',
    white: '#FFFFFF',
    bgGradientStart: '#EFF6FF',
    bgGradientEnd: '#F8FAFF',
};

export const typography = {
    heading1: { fontSize: 28, fontWeight: '800', color: colors.dark },
    heading2: { fontSize: 22, fontWeight: '700', color: colors.dark },
    heading3: { fontSize: 18, fontWeight: '700', color: colors.dark },
    heading4: { fontSize: 16, fontWeight: '600', color: colors.dark },
    body: { fontSize: 14, fontWeight: '400', color: colors.gray700 },
    bodySmall: { fontSize: 12, fontWeight: '400', color: colors.gray500 },
    label: { fontSize: 13, fontWeight: '500', color: colors.gray700 },
    amount: { fontSize: 26, fontWeight: '800' },
};

export const spacing = {
    xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32,
};

export const radius = {
    sm: 8, md: 12, lg: 16, xl: 20, full: 999,
};

export const shadow = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
};