import React, { useState } from 'react';
import {
    View, Text, ScrollView, StyleSheet, TouchableOpacity,
    StatusBar, Animated,
} from 'react-native';
import { colors, spacing, radius, shadow } from '../theme';

// ─── Dummy data 
const WORKER = {
    name: 'Rohan',
    weeklyPremium: 34.02,
    nextCycle: 'Mar 27, 2026',
    earningsProtected: 2840,
    todayEarnings: 720,
    riskLevel: 'Low',
    cdiScore: 15,
    cdiZone: 'Koramangala',
    coverageStatus: 'Active',
    avgDaily: 720,
    peakHours: '12-2, 7-10',
    ordersPerDay: 31,
    primaryZone: 'Koramangala',
};

const PAYOUTS = [
    {
        id: 1, type: 'Heavy Rainfall - Orange Alert',
        date: 'Mar 15, 2026', shift: 'Afternoon Shift (12-4 PM)',
        amount: 380, status: 'Completed', icon: '🌧️',
    },
    {
        id: 2, type: 'Extreme Heat (WBGT 34.2°C)',
        date: 'Mar 8, 2026', shift: 'Morning Shift (10 AM-1 PM)',
        amount: 240, status: 'Completed', icon: '🌡️',
    },
    {
        id: 3, type: 'Waterlogging Alert',
        date: 'Feb 28, 2026', shift: 'Full Day Coverage',
        amount: 420, status: 'Completed', icon: '🌊',
    },
];

// ─── Coverage Status Card ──────────────────────────────────────────────────────
function CoverageCard({ worker }) {
    return (
        <View style={styles.coverageCard}>
            <View style={styles.coverageTopRow}>
                <View style={styles.coverageLeft}>
                    <View style={styles.shieldIcon}><Text style={{ fontSize: 18 }}>🛡️</Text></View>
                    <View>
                        <Text style={styles.coverageStatusLabel}>Coverage Status</Text>
                        <View style={styles.activeRow}>
                            <View style={styles.activeDot} />
                            <Text style={styles.activeText}>Active</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.activeDotLarge} />
            </View>

            <View style={styles.coverageMeta}>
                <View>
                    <Text style={styles.metaLabel}>Weekly Premium</Text>
                    <Text style={styles.metaValue}>₹{worker.weeklyPremium.toFixed(2)}</Text>
                </View>
                <View>
                    <Text style={styles.metaLabel}>Next Cycle</Text>
                    <Text style={styles.metaValue}>{worker.nextCycle}</Text>
                </View>
            </View>
        </View>
    );
}

// ─── Stat Mini Card ────────────────────────────────────────────────────────────
function MiniStatCard({ icon, label, value, valueColor, bgColor }) {
    return (
        <View style={[styles.miniCard, { backgroundColor: bgColor || colors.white }]}>
            <Text style={styles.miniIcon}>{icon}</Text>
            <Text style={[styles.miniLabel, { color: colors.gray500 }]}>{label}</Text>
            <Text style={[styles.miniValue, { color: valueColor || colors.dark }]}>{value}</Text>
        </View>
    );
}

// ─── CDI Status Banner ─────────────────────────────────────────────────────────
function CDIBanner({ score, zone }) {
    const isAlert = score > 40;
    const isWarning = score > 70;
    const bgColor = isWarning ? colors.dangerLight : isAlert ? colors.warningLight : colors.successLight;
    const borderColor = isWarning ? colors.danger : isAlert ? colors.warning : colors.success;
    const icon = isWarning ? '⚠️' : isAlert ? '🟡' : '✅';
    const title = isWarning ? 'High Disruption Alert' : isAlert ? 'Moderate Disruption' : 'All Clear Today';
    const desc = isWarning
        ? `High CDI detected in ${zone} zone. Pre-payout may be triggered.`
        : isAlert
            ? `Moderate disruption risk in ${zone}. Monitoring closely.`
            : `No disruptions detected in ${zone} zone. Safe to work all shifts.`;

    return (
        <View style={[styles.cdiBanner, { backgroundColor: bgColor, borderColor }]}>
            <View style={styles.cdiTopRow}>
                <Text style={styles.cdiIcon}>{icon}</Text>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.cdiTitle, { color: isWarning ? colors.danger : isAlert ? colors.warning : colors.success }]}>
                        {title}
                    </Text>
                    <Text style={styles.cdiDesc}>{desc}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.cdiDetails}>Details →</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.cdiMeta}>CDI Score: {score}/100  •  Last updated: 2 mins ago</Text>
        </View>
    );
}

// ─── Payout Item ──────────────────────────────────────────────────────────────
function PayoutItem({ payout }) {
    return (
        <View style={styles.payoutItem}>
            <View style={styles.payoutLeft}>
                <View style={styles.payoutIconCircle}>
                    <Text style={{ fontSize: 16 }}>{payout.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.payoutType}>{payout.type}</Text>
                    <Text style={styles.payoutMeta}>📅 {payout.date}  ⏰ {payout.shift}</Text>
                </View>
            </View>
            <View style={styles.payoutRight}>
                <Text style={styles.payoutAmount}>+₹{payout.amount}</Text>
                <Text style={styles.payoutStatus}>Completed</Text>
            </View>
        </View>
    );
}

// ─── Income Fingerprint Card ───────────────────────────────────────────────────
function IncomeFingerprint({ worker }) {
    return (
        <View style={styles.fingerprintCard}>
            <Text style={styles.sectionHeading}>Your Income Fingerprint</Text>
            <Text style={styles.fingerprintSub}>AI-calculated expected earnings based on your 90-day work pattern</Text>
            <View style={styles.fingerprintGrid}>
                <View style={styles.fpItem}>
                    <Text style={styles.fpLabel}>Avg Daily</Text>
                    <Text style={styles.fpValue}>₹{worker.avgDaily}</Text>
                </View>
                <View style={styles.fpItem}>
                    <Text style={styles.fpLabel}>Peak Hours</Text>
                    <Text style={styles.fpValue}>{worker.peakHours}</Text>
                </View>
                <View style={styles.fpItem}>
                    <Text style={styles.fpLabel}>Orders/Day</Text>
                    <Text style={styles.fpValue}>{worker.ordersPerDay}</Text>
                </View>
                <View style={styles.fpItem}>
                    <Text style={styles.fpLabel}>Primary Zone</Text>
                    <Text style={styles.fpValue}>{worker.primaryZone}</Text>
                </View>
            </View>
        </View>
    );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function DashboardScreen({ navigation }) {
    const [cdiScore] = useState(WORKER.cdiScore);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerBrand}>🛡 GigShield</Text>
                    <View style={styles.welcomeRow}>
                        <Text style={styles.headerWelcome}>Welcome back,</Text>
                    </View>
                    <Text style={styles.headerName}>{WORKER.name}</Text>
                </View>
                <TouchableOpacity style={styles.logoutBtn}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                {/* Coverage Card */}
                <CoverageCard worker={WORKER} />

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <MiniStatCard icon="💰" label="Earnings Protected"
                        value={`₹${WORKER.earningsProtected}`} valueColor={colors.success} bgColor="#F0FDF4" />
                    <MiniStatCard icon="📈" label="Today's Earnings"
                        value={`₹${WORKER.todayEarnings}`} valueColor={colors.primary} bgColor="#EFF6FF" />
                    <MiniStatCard icon="⚡" label="Risk Score Today"
                        value={WORKER.riskLevel} valueColor={colors.success} bgColor="#F5F3FF" />
                </View>

                {/* CDI Banner */}
                <CDIBanner score={cdiScore} zone={WORKER.cdiZone} />

                {/* Recent Payouts */}
                <View style={styles.sectionBlock}>
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionHeading}>Recent Payouts</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('PayoutHistory')}>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    {PAYOUTS.map((p) => <PayoutItem key={p.id} payout={p} />)}
                </View>

                {/* Income Fingerprint */}
                <IncomeFingerprint worker={WORKER} />

                {/* Action Cards */}
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={[styles.actionCard, { backgroundColor: colors.primary }]}
                        onPress={() => navigation.navigate('LiveMonitoring')}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.actionIcon}>📡</Text>
                        <Text style={styles.actionTitle}>Live Monitoring</Text>
                        <Text style={styles.actionDesc}>Check CDI scores and forecasts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionCard, { backgroundColor: colors.success }]}
                        onPress={() => navigation.navigate('PayoutHistory')}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.actionIcon}>💵</Text>
                        <Text style={styles.actionTitle}>Payout History</Text>
                        <Text style={styles.actionDesc}>View all your protection payouts</Text>
                    </TouchableOpacity>
                </View>

                {/* Help */}
                <View style={styles.helpBox}>
                    <Text style={styles.helpTitle}>Need Help?</Text>
                    <Text style={styles.helpDesc}>
                        Questions about coverage, payouts, or how GigShield works? We're here for you.
                    </Text>
                    <TouchableOpacity style={styles.helpBtn} activeOpacity={0.85}>
                        <Text style={styles.helpBtnText}>Contact Support</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.gray50 },
    header: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.xl,
        paddingTop: 48,
        paddingBottom: spacing.xxl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerLeft: {},
    headerBrand: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '600', marginBottom: 4 },
    welcomeRow: {},
    headerWelcome: { color: 'rgba(255,255,255,0.75)', fontSize: 14 },
    headerName: { color: colors.white, fontSize: 24, fontWeight: '800', marginTop: 2 },
    logoutBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: spacing.md, paddingVertical: 8,
        borderRadius: radius.full,
    },
    logoutText: { color: colors.white, fontSize: 13, fontWeight: '600' },

    scroll: { padding: spacing.lg, paddingBottom: 40 },

    coverageCard: {
        backgroundColor: colors.white, borderRadius: radius.xl,
        padding: spacing.xl, marginBottom: spacing.md, ...shadow.md,
    },
    coverageTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
    coverageLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    shieldIcon: {
        width: 40, height: 40, borderRadius: 10,
        backgroundColor: colors.successLight, alignItems: 'center', justifyContent: 'center',
    },
    coverageStatusLabel: { fontSize: 12, color: colors.gray500, marginBottom: 2 },
    activeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success },
    activeText: { fontSize: 15, fontWeight: '700', color: colors.success },
    activeDotLarge: {
        width: 12, height: 12, borderRadius: 6, backgroundColor: colors.success,
    },
    coverageMeta: { flexDirection: 'row', gap: spacing.xxl },
    metaLabel: { fontSize: 12, color: colors.gray500, marginBottom: 2 },
    metaValue: { fontSize: 15, fontWeight: '700', color: colors.dark },

    statsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
    miniCard: {
        flex: 1, borderRadius: radius.lg, padding: spacing.md,
        alignItems: 'flex-start', ...shadow.sm,
    },
    miniIcon: { fontSize: 18, marginBottom: 4 },
    miniLabel: { fontSize: 10, marginBottom: 2 },
    miniValue: { fontSize: 15, fontWeight: '800' },

    cdiBanner: {
        borderRadius: radius.lg, padding: spacing.lg,
        borderWidth: 1.5, marginBottom: spacing.md,
    },
    cdiTopRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, marginBottom: spacing.sm },
    cdiIcon: { fontSize: 18 },
    cdiTitle: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
    cdiDesc: { fontSize: 12, color: colors.gray700, lineHeight: 17 },
    cdiDetails: { fontSize: 12, fontWeight: '600', color: colors.primary },
    cdiMeta: { fontSize: 11, color: colors.gray500 },

    sectionBlock: {
        backgroundColor: colors.white, borderRadius: radius.xl,
        padding: spacing.xl, marginBottom: spacing.md, ...shadow.sm,
    },
    sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
    sectionHeading: { fontSize: 16, fontWeight: '700', color: colors.dark },
    viewAll: { fontSize: 13, fontWeight: '600', color: colors.primary },

    payoutItem: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingVertical: spacing.md,
        borderBottomWidth: 1, borderBottomColor: colors.gray100,
    },
    payoutLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
    payoutIconCircle: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: colors.successLight, alignItems: 'center', justifyContent: 'center',
    },
    payoutType: { fontSize: 13, fontWeight: '600', color: colors.dark, marginBottom: 2 },
    payoutMeta: { fontSize: 11, color: colors.gray400 },
    payoutRight: { alignItems: 'flex-end' },
    payoutAmount: { fontSize: 15, fontWeight: '800', color: colors.success },
    payoutStatus: { fontSize: 11, color: colors.success, fontWeight: '500' },

    fingerprintCard: {
        backgroundColor: colors.white, borderRadius: radius.xl,
        padding: spacing.xl, marginBottom: spacing.md, ...shadow.sm,
    },
    fingerprintSub: { fontSize: 12, color: colors.gray500, marginBottom: spacing.lg },
    fingerprintGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    fpItem: {
        backgroundColor: colors.gray50, borderRadius: radius.md,
        padding: spacing.md, minWidth: '45%', flex: 1,
    },
    fpLabel: { fontSize: 11, color: colors.gray500, marginBottom: 4 },
    fpValue: { fontSize: 14, fontWeight: '700', color: colors.dark },

    actionRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
    actionCard: {
        flex: 1, borderRadius: radius.xl, padding: spacing.xl, ...shadow.md,
    },
    actionIcon: { fontSize: 22, marginBottom: spacing.sm },
    actionTitle: { fontSize: 14, fontWeight: '700', color: colors.white, marginBottom: 4 },
    actionDesc: { fontSize: 11, color: 'rgba(255,255,255,0.8)' },

    helpBox: {
        backgroundColor: '#FFFBEB', borderRadius: radius.xl,
        padding: spacing.xl, marginBottom: spacing.md,
    },
    helpTitle: { fontSize: 16, fontWeight: '700', color: colors.dark, marginBottom: spacing.sm },
    helpDesc: { fontSize: 13, color: colors.gray600, lineHeight: 19, marginBottom: spacing.lg },
    helpBtn: {
        backgroundColor: colors.primary, borderRadius: radius.md,
        paddingVertical: 12, paddingHorizontal: spacing.xl, alignSelf: 'flex-start',
    },
    helpBtnText: { color: colors.white, fontSize: 13, fontWeight: '700' },
});