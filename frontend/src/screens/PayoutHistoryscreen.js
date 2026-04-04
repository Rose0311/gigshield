import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar,
} from 'react-native';
import { colors, spacing, radius, shadow } from '../theme';

const ALL_PAYOUTS = [
  { id: 1, type: 'Heavy Rainfall - Orange Alert', date: 'Mar 15, 2026', shift: 'Afternoon Shift (12-4 PM)', amount: 380, status: 'Completed', icon: '🌧️', cdi: 72, tier: 1, reason: 'IMD orange alert: 68mm/hr rainfall in Koramangala zone' },
  { id: 2, type: 'Extreme Heat (WBGT 34.2°C)',     date: 'Mar 8, 2026',  shift: 'Morning Shift (10 AM-1 PM)', amount: 240, status: 'Completed', icon: '🌡️', cdi: 58, tier: 1, reason: 'WBGT 34.2°C exceeded 34°C red threshold in your zone' },
  { id: 3, type: 'Waterlogging Alert',              date: 'Feb 28, 2026', shift: 'Full Day Coverage',          amount: 420, status: 'Completed', icon: '🌊', cdi: 85, tier: 2, reason: 'BBMP flood alert + 72% order drop confirmed multi-signal trigger' },
  { id: 4, type: 'Bharat Bandh - Section 144',      date: 'Feb 12, 2026', shift: 'Full Day Coverage',          amount: 680, status: 'Completed', icon: '🚫', cdi: 91, tier: 2, reason: 'Section 144 confirmed by government alert + NLP news detection' },
  { id: 5, type: 'High AQI Alert (PM2.5 > 300)',    date: 'Jan 20, 2026', shift: 'Evening Shift (6-10 PM)',    amount: 190, status: 'Completed', icon: '💨', cdi: 45, tier: 1, reason: 'CPCB AQI 312 PM2.5 — above 300 trigger threshold in your pin-code' },
];

const SUMMARY = {
  totalProtected: ALL_PAYOUTS.reduce((s, p) => s + p.amount, 0),
  totalEvents: ALL_PAYOUTS.length,
  avgPayout: Math.round(ALL_PAYOUTS.reduce((s, p) => s + p.amount, 0) / ALL_PAYOUTS.length),
  premiumPaid: 136.08,
};

function PayoutDetailCard({ payout, onClose }) {
  return (
    <View style={detailStyles.overlay}>
      <View style={detailStyles.card}>
        <View style={detailStyles.topRow}>
          <Text style={detailStyles.icon}>{payout.icon}</Text>
          <TouchableOpacity onPress={onClose} style={detailStyles.closeBtn}>
            <Text style={detailStyles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        <Text style={detailStyles.type}>{payout.type}</Text>
        <Text style={detailStyles.amount}>+₹{payout.amount}</Text>

        <View style={detailStyles.metaGrid}>
          <View style={detailStyles.metaItem}>
            <Text style={detailStyles.metaLabel}>Date</Text>
            <Text style={detailStyles.metaValue}>{payout.date}</Text>
          </View>
          <View style={detailStyles.metaItem}>
            <Text style={detailStyles.metaLabel}>Shift Covered</Text>
            <Text style={detailStyles.metaValue}>{payout.shift}</Text>
          </View>
          <View style={detailStyles.metaItem}>
            <Text style={detailStyles.metaLabel}>CDI Score</Text>
            <Text style={[detailStyles.metaValue, { color: payout.cdi > 70 ? colors.danger : colors.warning }]}>
              {payout.cdi}/100
            </Text>
          </View>
          <View style={detailStyles.metaItem}>
            <Text style={detailStyles.metaLabel}>Tier</Text>
            <Text style={detailStyles.metaValue}>Tier {payout.tier}</Text>
          </View>
        </View>

        <View style={detailStyles.reasonBox}>
          <Text style={detailStyles.reasonTitle}>Why this payout triggered:</Text>
          <Text style={detailStyles.reasonText}>{payout.reason}</Text>
        </View>

        <View style={detailStyles.statusRow}>
          <View style={detailStyles.statusDot} />
          <Text style={detailStyles.statusText}>Verified payout — fraud score: Low</Text>
        </View>
      </View>
    </View>
  );
}

const detailStyles = StyleSheet.create({
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', zIndex: 99,
  },
  card: {
    backgroundColor: colors.white, borderTopLeftRadius: radius.xxl || 24,
    borderTopRightRadius: radius.xxl || 24, padding: spacing.xxl, paddingBottom: 40,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  icon: { fontSize: 32 },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.gray100, alignItems: 'center', justifyContent: 'center',
  },
  closeText: { fontSize: 16, color: colors.gray500 },
  type: { fontSize: 18, fontWeight: '700', color: colors.dark, marginBottom: spacing.sm },
  amount: { fontSize: 32, fontWeight: '900', color: colors.success, marginBottom: spacing.xl },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.xl },
  metaItem: { width: '45%', backgroundColor: colors.gray50, borderRadius: radius.md, padding: spacing.md },
  metaLabel: { fontSize: 11, color: colors.gray400, marginBottom: 4 },
  metaValue: { fontSize: 13, fontWeight: '700', color: colors.dark },
  reasonBox: { backgroundColor: '#EFF6FF', borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.lg },
  reasonTitle: { fontSize: 13, fontWeight: '700', color: colors.primary, marginBottom: spacing.sm },
  reasonText: { fontSize: 13, color: colors.gray700, lineHeight: 19 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success },
  statusText: { fontSize: 12, color: colors.success, fontWeight: '600' },
});

export default function PayoutHistoryScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payout History</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Summary Stats */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: '#F0FDF4' }]}>
            <Text style={[styles.summaryValue, { color: colors.success }]}>₹{SUMMARY.totalProtected}</Text>
            <Text style={styles.summaryLabel}>Total Earnings Protected</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#EFF6FF' }]}>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>{SUMMARY.totalEvents}</Text>
            <Text style={styles.summaryLabel}>Disruption Events</Text>
          </View>
        </View>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: '#FFFBEB' }]}>
            <Text style={[styles.summaryValue, { color: colors.warning }]}>₹{SUMMARY.avgPayout}</Text>
            <Text style={styles.summaryLabel}>Avg Payout per Event</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#F5F3FF' }]}>
            <Text style={[styles.summaryValue, { color: colors.purple }]}>₹{SUMMARY.premiumPaid}</Text>
            <Text style={styles.summaryLabel}>Total Premium Paid</Text>
          </View>
        </View>

        {/* ROI insight */}
        <View style={styles.roiBox}>
          <Text style={styles.roiTitle}>📊 Your ROI</Text>
          <Text style={styles.roiText}>
            You've received <Text style={styles.roiGreen}>₹{SUMMARY.totalProtected}</Text> in payouts
            against <Text style={styles.roiBlue}>₹{SUMMARY.premiumPaid}</Text> in premiums.
            That's a <Text style={styles.roiGreen}>{Math.round(SUMMARY.totalProtected / SUMMARY.premiumPaid)}x return</Text> on your protection investment.
          </Text>
        </View>

        {/* Payout List */}
        <View style={styles.listCard}>
          <Text style={styles.listTitle}>All Payouts</Text>
          {ALL_PAYOUTS.map((p) => (
            <TouchableOpacity
              key={p.id} style={styles.payoutRow}
              onPress={() => setSelected(p)} activeOpacity={0.75}
            >
              <View style={styles.payoutIconCircle}>
                <Text style={{ fontSize: 18 }}>{p.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.payoutType}>{p.type}</Text>
                <Text style={styles.payoutMeta}>📅 {p.date}  •  {p.shift}</Text>
                <Text style={styles.payoutMeta}>CDI: {p.cdi}/100  •  Tier {p.tier}</Text>
              </View>
              <View style={styles.payoutAmountCol}>
                <Text style={styles.payoutAmount}>+₹{p.amount}</Text>
                <Text style={styles.payoutStatusText}>✓ Done</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {selected && (
        <PayoutDetailCard payout={selected} onClose={() => setSelected(null)} />
      )}
    </View>
  );
}

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

  summaryRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  summaryCard: {
    flex: 1, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center', ...shadow.sm,
  },
  summaryValue: { fontSize: 22, fontWeight: '900', marginBottom: 4 },
  summaryLabel: { fontSize: 11, color: colors.gray500, textAlign: 'center' },

  roiBox: {
    backgroundColor: colors.white, borderRadius: radius.lg,
    padding: spacing.xl, marginBottom: spacing.md, ...shadow.sm,
  },
  roiTitle: { fontSize: 15, fontWeight: '700', color: colors.dark, marginBottom: spacing.sm },
  roiText: { fontSize: 14, color: colors.gray700, lineHeight: 21 },
  roiGreen: { color: colors.success, fontWeight: '700' },
  roiBlue: { color: colors.primary, fontWeight: '700' },

  listCard: {
    backgroundColor: colors.white, borderRadius: radius.xl,
    padding: spacing.xl, ...shadow.sm,
  },
  listTitle: { fontSize: 16, fontWeight: '700', color: colors.dark, marginBottom: spacing.lg },
  payoutRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.gray100,
  },
  payoutIconCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.successLight, alignItems: 'center', justifyContent: 'center',
  },
  payoutType: { fontSize: 13, fontWeight: '600', color: colors.dark, marginBottom: 2 },
  payoutMeta: { fontSize: 11, color: colors.gray400 },
  payoutAmountCol: { alignItems: 'flex-end' },
  payoutAmount: { fontSize: 16, fontWeight: '800', color: colors.success },
  payoutStatusText: { fontSize: 11, color: colors.success, fontWeight: '600' },
});