import React, { useState } from 'react';
import {
    View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar,
} from 'react-native';
import { colors, spacing, radius, shadow } from '../theme';

const CDI_SIGNALS = [
    { key: 'rain', label: 'Rainfall Intensity', icon: '🌧️', unit: 'mm/hr', value: 12, threshold: 35, maxVal: 100 },
    { key: 'heat', label: 'Heat Index (WBGT)', icon: '🌡️', unit: '°C', value: 29, threshold: 32, maxVal: 45 },
    { key: 'aqi', label: 'AQI (PM2.5)', icon: '💨', unit: 'AQI', value: 85, threshold: 300, maxVal: 500 },
    { key: 'flood', label: 'Flood / Waterlogging', icon: '🌊', unit: 'alert', value: 0, threshold: 1, maxVal: 1 },
    { key: 'civic', label: 'Civic Disruption', icon: '🚫', unit: 'alert', value: 0, threshold: 1, maxVal: 1 },
    { key: 'orders', label: 'Platform Order Drop', icon: '📦', unit: '% drop', value: 5, threshold: 60, maxVal: 100 },
];

const SCENARIO_PRESETS = [
    { label: 'All Clear', values: { rain: 12, heat: 29, aqi: 85, flood: 0, civic: 0, orders: 5 } },
    { label: '🌧️ Heavy Rain', values: { rain: 68, heat: 27, aqi: 95, flood: 1, civic: 0, orders: 65 } },
    { label: '🌡️ Extreme Heat', values: { rain: 0, heat: 35, aqi: 120, flood: 0, civic: 0, orders: 40 } },
    { label: '🚫 Curfew / Strike', values: { rain: 5, heat: 30, aqi: 90, flood: 0, civic: 1, orders: 80 } },
];

function computeCDI(signals) {
    let score = 0;
    const rain = signals.rain;
    const heat = signals.heat;
    const aqi = signals.aqi;
    const flood = signals.flood;
    const civic = signals.civic;
    const orders = signals.orders;

    if (rain > 64) score += 35;
    else if (rain > 35) score += 20;
    if (heat > 34) score += 30;
    else if (heat > 32) score += 15;
    if (aqi > 300) score += 20;
    if (flood === 1) score += 25;
    if (civic === 1) score += 30;
    if (orders > 60) score += 15;

    return Math.min(score, 100);
}

function SignalBar({ signal, value }) {
    const pct = Math.min((value / signal.maxVal) * 100, 100);
    const triggered = value >= signal.threshold;
    const barColor = triggered ? colors.danger : value > signal.threshold * 0.6 ? colors.warning : colors.success;

    return (
        <View style={sbStyles.container}>
            <View style={sbStyles.topRow}>
                <View style={sbStyles.left}>
                    <Text style={sbStyles.icon}>{signal.icon}</Text>
                    <Text style={sbStyles.label}>{signal.label}</Text>
                </View>
                <View style={[sbStyles.valueBadge, { backgroundColor: triggered ? colors.dangerLight : colors.gray100 }]}>
                    <Text style={[sbStyles.valueText, { color: triggered ? colors.danger : colors.gray700 }]}>
                        {value} {signal.unit}
                    </Text>
                    {triggered && <Text style={sbStyles.triggerTag}> TRIGGERED</Text>}
                </View>
            </View>
            <View style={sbStyles.barBg}>
                <View style={[sbStyles.barFill, { width: `${pct}%`, backgroundColor: barColor }]} />
                {/* Threshold marker */}
                <View style={[sbStyles.thresholdMark, { left: `${(signal.threshold / signal.maxVal) * 100}%` }]} />
            </View>
            <Text style={sbStyles.thresholdLabel}>Trigger threshold: {signal.threshold} {signal.unit}</Text>
        </View>
    );
}

const sbStyles = StyleSheet.create({
    container: { marginBottom: spacing.lg },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
    left: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    icon: { fontSize: 16 },
    label: { fontSize: 13, fontWeight: '600', color: colors.dark },
    valueBadge: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: 99,
    },
    valueText: { fontSize: 12, fontWeight: '700' },
    triggerTag: { fontSize: 10, fontWeight: '800', color: colors.danger },
    barBg: {
        height: 8, backgroundColor: colors.gray100, borderRadius: 99,
        position: 'relative', overflow: 'hidden',
    },
    barFill: { height: 8, borderRadius: 99 },
    thresholdMark: {
        position: 'absolute', top: 0, bottom: 0, width: 2,
        backgroundColor: colors.gray500,
    },
    thresholdLabel: { fontSize: 10, color: colors.gray400, marginTop: 3 },
});

export default function LiveMonitoringScreen({ navigation }) {
    const [signalValues, setSignalValues] = useState({
        rain: 12, heat: 29, aqi: 85, flood: 0, civic: 0, orders: 5,
    });

    const cdiScore = computeCDI(signalValues);
    const isAlert = cdiScore > 40;
    const isHigh = cdiScore > 70;

    const statusColor = isHigh ? colors.danger : isAlert ? colors.warning : colors.success;
    const statusLabel = isHigh ? 'HIGH ALERT' : isAlert ? 'MODERATE' : 'ALL CLEAR';

    const applyPreset = (preset) => setSignalValues({ ...preset.values });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Live CDI Monitoring</Text>
                <View style={{ width: 60 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                {/* CDI Score Dial */}
                <View style={styles.scoreCard}>
                    <Text style={styles.scoreLabel}>Composite Disruption Index</Text>
                    <View style={[styles.scoreDial, { borderColor: statusColor }]}>
                        <Text style={[styles.scoreNum, { color: statusColor }]}>{cdiScore}</Text>
                        <Text style={styles.scoreDenom}>/100</Text>
                    </View>
                    <View style={[styles.statusPill, { backgroundColor: statusColor + '20' }]}>
                        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                        <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
                    </View>
                    <Text style={styles.scoreMeta}>📍 Koramangala zone  •  Updated 2 mins ago</Text>
                </View>

                {/* Scenario Presets */}
                <View style={styles.presetsCard}>
                    <Text style={styles.sectionTitle}>Simulate Scenarios</Text>
                    <View style={styles.presetsRow}>
                        {SCENARIO_PRESETS.map((p) => (
                            <TouchableOpacity
                                key={p.label}
                                style={styles.presetBtn}
                                onPress={() => applyPreset(p)}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.presetText}>{p.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Signal Bars */}
                <View style={styles.signalsCard}>
                    <Text style={styles.sectionTitle}>Signal Breakdown</Text>
                    <Text style={styles.sectionSub}>5-signal CDI engine • pin-code level</Text>
                    {CDI_SIGNALS.map((sig) => (
                        <SignalBar key={sig.key} signal={sig} value={signalValues[sig.key]} />
                    ))}
                </View>

                {/* Payout Preview */}
                {cdiScore > 40 && (
                    <View style={[styles.payoutPreview, { backgroundColor: isHigh ? colors.dangerLight : colors.warningLight }]}>
                        <Text style={[styles.payoutPreviewTitle, { color: isHigh ? colors.danger : colors.warning }]}>
                            {isHigh ? '🚨 Payout Triggered!' : '⚠️ Payout Likely Soon'}
                        </Text>
                        <Text style={styles.payoutPreviewDesc}>
                            {isHigh
                                ? 'CDI threshold exceeded. Income payout is being processed for your zone.'
                                : 'Disruption detected. GigShield is monitoring closely. Payout may trigger.'}
                        </Text>
                        <View style={styles.payoutPreviewAmounts}>
                            <View style={styles.ppItem}>
                                <Text style={styles.ppLabel}>Expected Income</Text>
                                <Text style={styles.ppValue}>₹380</Text>
                            </View>
                            <View style={styles.ppItem}>
                                <Text style={styles.ppLabel}>CDI Severity</Text>
                                <Text style={styles.ppValue}>{(cdiScore / 100).toFixed(2)}x</Text>
                            </View>
                            <View style={styles.ppItem}>
                                <Text style={styles.ppLabel}>Est. Payout</Text>
                                <Text style={[styles.ppValue, { color: colors.success }]}>
                                    ₹{Math.round(380 * (cdiScore / 100))}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* 48hr Forecast */}
                <View style={styles.forecastCard}>
                    <Text style={styles.sectionTitle}>48-Hour Forecast</Text>
                    <Text style={styles.sectionSub}>IMD-based predictive pre-payout engine</Text>
                    {FORECAST.map((f, i) => (
                        <View key={i} style={styles.forecastRow}>
                            <Text style={styles.forecastTime}>{f.time}</Text>
                            <View style={styles.forecastBar}>
                                <View style={[styles.forecastFill, { width: `${f.prob}%`, backgroundColor: f.prob > 70 ? colors.danger : f.prob > 40 ? colors.warning : colors.success }]} />
                            </View>
                            <Text style={styles.forecastProb}>{f.prob}%</Text>
                            <Text style={styles.forecastLabel}>{f.label}</Text>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}

const FORECAST = [
    { time: 'Now', prob: 15, label: 'Clear' },
    { time: '+6hr', prob: 25, label: 'Low risk' },
    { time: '+12hr', prob: 55, label: 'Moderate' },
    { time: '+18hr', prob: 78, label: 'High risk' },
    { time: '+24hr', prob: 85, label: 'Pre-payout likely' },
    { time: '+36hr', prob: 40, label: 'Reducing' },
    { time: '+48hr', prob: 20, label: 'Clearing' },
];

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.gray50 },
    header: {
        backgroundColor: colors.primary, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: spacing.xl, paddingTop: 48, paddingBottom: spacing.xl,
    },
    backBtn: { padding: spacing.sm },
    backText: { color: colors.white, fontSize: 15, fontWeight: '600' },
    headerTitle: { color: colors.white, fontSize: 17, fontWeight: '700' },
    scroll: { padding: spacing.lg, paddingBottom: 40 },

    scoreCard: {
        backgroundColor: colors.white, borderRadius: radius.xl,
        padding: spacing.xxl, alignItems: 'center', ...shadow.md, marginBottom: spacing.md,
    },
    scoreLabel: { fontSize: 13, fontWeight: '600', color: colors.gray500, marginBottom: spacing.lg },
    scoreDial: {
        width: 120, height: 120, borderRadius: 60, borderWidth: 6,
        alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg,
        flexDirection: 'row', alignItems: 'baseline',
    },
    scoreNum: { fontSize: 40, fontWeight: '900' },
    scoreDenom: { fontSize: 16, color: colors.gray400, fontWeight: '500' },
    statusPill: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        paddingHorizontal: spacing.lg, paddingVertical: 8,
        borderRadius: 99, marginBottom: spacing.sm,
    },
    statusDot: { width: 8, height: 8, borderRadius: 4 },
    statusText: { fontSize: 14, fontWeight: '800', letterSpacing: 1 },
    scoreMeta: { fontSize: 12, color: colors.gray400 },

    presetsCard: {
        backgroundColor: colors.white, borderRadius: radius.xl,
        padding: spacing.xl, ...shadow.sm, marginBottom: spacing.md,
    },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.dark, marginBottom: spacing.sm },
    sectionSub: { fontSize: 12, color: colors.gray400, marginBottom: spacing.lg },
    presetsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    presetBtn: {
        backgroundColor: colors.gray100, borderRadius: radius.full,
        paddingHorizontal: spacing.lg, paddingVertical: 8,
    },
    presetText: { fontSize: 13, fontWeight: '600', color: colors.dark },

    signalsCard: {
        backgroundColor: colors.white, borderRadius: radius.xl,
        padding: spacing.xl, ...shadow.sm, marginBottom: spacing.md,
    },

    payoutPreview: {
        borderRadius: radius.xl, padding: spacing.xl, marginBottom: spacing.md,
    },
    payoutPreviewTitle: { fontSize: 17, fontWeight: '800', marginBottom: spacing.sm },
    payoutPreviewDesc: { fontSize: 13, color: colors.gray700, lineHeight: 19, marginBottom: spacing.lg },
    payoutPreviewAmounts: { flexDirection: 'row', gap: spacing.md },
    ppItem: {
        flex: 1, backgroundColor: colors.white + 'CC',
        borderRadius: radius.md, padding: spacing.md, alignItems: 'center',
    },
    ppLabel: { fontSize: 10, color: colors.gray500, marginBottom: 4, textAlign: 'center' },
    ppValue: { fontSize: 18, fontWeight: '800', color: colors.dark },

    forecastCard: {
        backgroundColor: colors.white, borderRadius: radius.xl,
        padding: spacing.xl, ...shadow.sm, marginBottom: spacing.md,
    },
    forecastRow: {
        flexDirection: 'row', alignItems: 'center',
        gap: spacing.sm, marginBottom: spacing.sm,
    },
    forecastTime: { width: 42, fontSize: 11, color: colors.gray500, fontWeight: '600' },
    forecastBar: {
        flex: 1, height: 8, backgroundColor: colors.gray100, borderRadius: 99, overflow: 'hidden',
    },
    forecastFill: { height: 8, borderRadius: 99 },
    forecastProb: { width: 32, fontSize: 11, fontWeight: '700', color: colors.dark, textAlign: 'right' },
    forecastLabel: { width: 90, fontSize: 11, color: colors.gray400 },
});