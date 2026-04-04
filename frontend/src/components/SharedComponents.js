import React from 'react';
import {
    View, Text, TouchableOpacity, ActivityIndicator, StyleSheet,
} from 'react-native';
import { colors, typography, spacing, radius, shadow } from '../theme';

// ─── Primary Button ───────────────────────────────────────────────────────────
export function PrimaryButton({ title, onPress, loading, style, textStyle, icon }) {
    return (
        <TouchableOpacity
            style={[styles.primaryBtn, style]}
            onPress={onPress}
            activeOpacity={0.85}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color={colors.white} />
            ) : (
                <View style={styles.btnRow}>
                    {icon && <View style={{ marginRight: 6 }}>{icon}</View>}
                    <Text style={[styles.primaryBtnText, textStyle]}>{title}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

// ─── Outline Button ───────────────────────────────────────────────────────────
export function OutlineButton({ title, onPress, style, textStyle }) {
    return (
        <TouchableOpacity
            style={[styles.outlineBtn, style]}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <Text style={[styles.outlineBtnText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

// ─── Success Button ───────────────────────────────────────────────────────────
export function SuccessButton({ title, onPress, style }) {
    return (
        <TouchableOpacity
            style={[styles.successBtn, style]}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <Text style={styles.primaryBtnText}>✓ {title}</Text>
        </TouchableOpacity>
    );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, style }) {
    return (
        <View style={[styles.card, style]}>{children}</View>
    );
}

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, style }) {
    return (
        <View style={[{ marginBottom: spacing.xl }, style]}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
        </View>
    );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ label, color = colors.primary, bgColor }) {
    return (
        <View style={[styles.badge, { backgroundColor: bgColor || color + '18' }]}>
            <Text style={[styles.badgeText, { color }]}>{label}</Text>
        </View>
    );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
export function StatCard({ value, label, valueColor = colors.primary, style }) {
    return (
        <View style={[styles.statCard, style]}>
            <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

// ─── Risk Badge ───────────────────────────────────────────────────────────────
export function RiskBadge({ level }) {
    const config = {
        Low: { color: colors.success, bg: colors.successLight, icon: '🟢' },
        Medium: { color: colors.warning, bg: colors.warningLight, icon: '🟡' },
        High: { color: colors.danger, bg: colors.dangerLight, icon: '🔴' },
    };
    const c = config[level] || config.Low;
    return (
        <View style={[styles.riskBadge, { backgroundColor: c.bg }]}>
            <Text style={[styles.riskText, { color: c.color }]}>
                {c.icon}  {level} Risk
            </Text>
        </View>
    );
}

// ─── Tier Badge ───────────────────────────────────────────────────────────────
export function TierBadge({ tier }) {
    const config = {
        1: { bg: '#DBEAFE', text: colors.primary },
        2: { bg: '#FEF3C7', text: colors.warning },
        3: { bg: '#FFE4E6', text: colors.danger },
    };
    const c = config[tier] || config[1];
    return (
        <View style={[styles.tierBadge, { backgroundColor: c.bg }]}>
            <Text style={[styles.tierText, { color: c.text }]}>Tier {tier}</Text>
        </View>
    );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ style }) {
    return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
    primaryBtn: {
        backgroundColor: colors.primary,
        borderRadius: radius.md,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadow.lg,
    },
    btnRow: { flexDirection: 'row', alignItems: 'center' },
    primaryBtnText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    outlineBtn: {
        backgroundColor: 'transparent',
        borderRadius: radius.md,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: colors.primary,
    },
    outlineBtnText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '600',
    },
    successBtn: {
        backgroundColor: colors.success,
        borderRadius: radius.md,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadow.md,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.xl,
        ...shadow.sm,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.dark,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: colors.gray500,
        textAlign: 'center',
        lineHeight: 20,
    },
    badge: {
        paddingHorizontal: spacing.md,
        paddingVertical: 4,
        borderRadius: radius.full,
        alignSelf: 'flex-start',
    },
    badgeText: { fontSize: 11, fontWeight: '600', letterSpacing: 0.3 },
    statCard: {
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.xl,
        alignItems: 'center',
        flex: 1,
        ...shadow.sm,
    },
    statValue: { fontSize: 26, fontWeight: '800', marginBottom: 4 },
    statLabel: { fontSize: 12, color: colors.gray500, textAlign: 'center' },
    riskBadge: {
        paddingHorizontal: spacing.md,
        paddingVertical: 6,
        borderRadius: radius.full,
    },
    riskText: { fontSize: 14, fontWeight: '700' },
    tierBadge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: radius.full,
        marginRight: 8,
    },
    tierText: { fontSize: 11, fontWeight: '700' },
    divider: {
        height: 1,
        backgroundColor: colors.gray200,
        marginVertical: spacing.lg,
    },
});