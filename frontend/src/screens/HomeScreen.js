import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Animated, Dimensions, StatusBar,
} from 'react-native';
import { colors, spacing, radius, shadow } from '../theme';
import { StatCard, PrimaryButton, OutlineButton } from '../components/SharedComponents';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgGradientStart} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Hero Section ── */}
        <View style={styles.heroSection}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            {/* Logo */}
            <View style={styles.logoRow}>
              <View style={styles.shieldIcon}>
                <Text style={styles.shieldEmoji}>🛡</Text>
              </View>
              <Text style={styles.logoText}>
                <Text style={styles.logoGig}>Gig</Text>
                <Text style={styles.logoShield}>Shield</Text>
              </Text>
            </View>

            <Text style={styles.heroTitle}>AI-Powered Income Insurance{'\n'}for Food Delivery Partners</Text>
            <Text style={styles.heroSubtitle}>
              Your earnings are protected when the city stops.{'\n'}
              Rain, flood, heat, or strike — we've got you covered.
            </Text>

            {/* CTA Buttons */}
            <View style={styles.ctaRow}>
              <PrimaryButton
                title="Start Protection Now"
                style={styles.ctaPrimary}
                onPress={() => navigation.navigate('Onboarding')}
              />
              <OutlineButton
                title="View Demo Dashboard"
                style={styles.ctaOutline}
                onPress={() => navigation.navigate('Dashboard')}
              />
            </View>
          </Animated.View>
        </View>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          <StatCard value="₹380" label="Average daily protection" valueColor={colors.primary} />
          <View style={{ width: spacing.sm }} />
          <StatCard value="₹1.20" label="Per order premium" valueColor={colors.success} />
          <View style={{ width: spacing.sm }} />
          <StatCard value="48hr" label="Pre-payout prediction" valueColor={colors.purple} />
        </View>

        {/* ── Problem Section ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Problem We're Solving</Text>
          <Text style={styles.sectionSub}>
            When the city stops, delivery partners lose 20–30% of monthly earnings with no safety net
          </Text>

          <View style={styles.scenarioCard}>
            <Text style={styles.scenarioIcon}>☁️</Text>
            <Text style={styles.scenarioName}>Rohan, Bengaluru</Text>
            <Text style={styles.scenarioText}>
              <Text style={styles.boldGray}>Without GigShield: </Text>
              Heavy rain warning. Earns ₹0 for afternoon peak. Skips bike EMI payment.
            </Text>
            <Text style={[styles.scenarioText, { marginTop: spacing.sm }]}>
              <Text style={styles.withShield}>With GigShield: </Text>
              <Text style={styles.greenText}>₹380 in UPI wallet at 8 AM — before rain starts. Stays home, safe.</Text>
            </Text>
          </View>

          <View style={[styles.scenarioCard, { backgroundColor: '#FFF7ED' }]}>
            <Text style={styles.scenarioIcon}>🌡️</Text>
            <Text style={styles.scenarioName}>Priya, Chennai</Text>
            <Text style={styles.scenarioText}>
              <Text style={styles.boldGray}>Extreme Heat Event: </Text>
              WBGT crosses 34°C by 11 AM. Deliveries become dangerous.
            </Text>
            <Text style={[styles.scenarioText, { marginTop: spacing.sm }]}>
              <Text style={styles.withShield}>With GigShield: </Text>
              <Text style={styles.greenText}>Automatic payout for missed morning peak. No claim filing needed.</Text>
            </Text>
          </View>
        </View>

        {/* ── Features Section ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5 Industry-First Features</Text>
          <Text style={styles.sectionSub}>Built for delivery partners, powered by AI</Text>

          <View style={styles.featuresGrid}>
            {FEATURES.map((f, i) => (
              <View key={i} style={styles.featureCard}>
                <View style={styles.featureTopRow}>
                  <Text style={styles.featureIcon}>{f.icon}</Text>
                  <View style={[styles.featureBadge, { backgroundColor: f.badgeColor }]}>
                    <Text style={[styles.featureBadgeText, { color: f.badgeTextColor }]}>{f.badge}</Text>
                  </View>
                </View>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── How It Works ── */}
        <View style={[styles.section, { backgroundColor: colors.white }]}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <Text style={styles.sectionSub}>Simple, automatic, and always protecting you</Text>

          <View style={styles.stepsRow}>
            {STEPS.map((s, i) => (
              <View key={i} style={styles.stepItem}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNum}>{s.num}</Text>
                </View>
                <Text style={styles.stepTitle}>{s.title}</Text>
                <Text style={styles.stepDesc}>{s.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── CTA Banner ── */}
        <View style={styles.ctaBanner}>
          <Text style={styles.ctaBannerTitle}>Protect Your Income Today</Text>
          <Text style={styles.ctaBannerSub}>
            Join thousands of delivery partners who never worry about lost wages again
          </Text>
          <TouchableOpacity
            style={styles.ctaBannerBtn}
            onPress={() => navigation.navigate('Onboarding')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaBannerBtnText}>Get Started — 3 Min Setup</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const FEATURES = [
  {
    icon: '⚡', title: 'Predictive Pre-Payout', badge: 'Industry First',
    badgeColor: '#FEF3C7', badgeTextColor: colors.warning,
    desc: 'Get paid BEFORE the disruption hits, using 48-hour weather forecasts. Stay home safely.',
  },
  {
    icon: '💰', title: 'Personal Income Fingerprint', badge: 'AI-Powered',
    badgeColor: '#DCFCE7', badgeTextColor: colors.success,
    desc: 'No flat amounts. Your payout matches YOUR actual expected earnings for that shift.',
  },
  {
    icon: '☁️', title: '5-Signal CDI Engine', badge: 'Multi-Signal',
    badgeColor: '#DBEAFE', badgeTextColor: colors.primary,
    desc: 'Rain, heat, AQI, floods, strikes — we monitor 5 disruption signals at pin-code level.',
  },
  {
    icon: '🛡️', title: 'Per-Order Micro-Premium', badge: 'Frictionless',
    badgeColor: '#F3E8FF', badgeTextColor: colors.purple,
    desc: 'Just ₹0.80–₹1.50 per order. No monthly bills. Always covered, never lapsed.',
  },
  {
    icon: '❤️', title: 'Tiered Recovery Stack', badge: 'Complete Support',
    badgeColor: '#FFE4E6', badgeTextColor: colors.danger,
    desc: 'Not just payouts: EMI deferral + platform metric freeze + emergency micro-loans.',
  },
  {
    icon: '✅', title: 'Zero-Claim Filing', badge: 'Automatic',
    badgeColor: '#DCFCE7', badgeTextColor: colors.success,
    desc: 'Fully automated. When disruption hits, payout triggers instantly. No forms, no waiting.',
  },
];

const STEPS = [
  { num: '1', title: 'Register', desc: 'Sign up with Aadhaar + platform ID. Takes 3 minutes.' },
  { num: '2', title: 'Auto-Premium', desc: '₹1.20 per order. Invisible deduction. Always covered.' },
  { num: '3', title: 'AI Monitoring', desc: 'Our CDI engine watches weather, AQI, and disruptions 24/7.' },
  { num: '4', title: 'Instant Payout', desc: 'Disruption detected? Money in your UPI wallet automatically.' },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgGradientStart },
  scroll: { paddingBottom: 40 },

  heroSection: {
    paddingHorizontal: spacing.xl,
    paddingTop: 56,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.bgGradientStart,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
  shieldIcon: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: colors.primary + '18',
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.sm,
  },
  shieldEmoji: { fontSize: 22 },
  logoText: { fontSize: 28, fontWeight: '800' },
  logoGig: { color: colors.dark },
  logoShield: { color: colors.primary },
  heroTitle: {
    fontSize: 26, fontWeight: '800', color: colors.dark,
    textAlign: 'center', lineHeight: 34, marginBottom: spacing.md,
  },
  heroSubtitle: {
    fontSize: 15, color: colors.gray500, textAlign: 'center',
    lineHeight: 22, marginBottom: spacing.xxl,
  },
  ctaRow: { gap: spacing.md },
  ctaPrimary: { marginBottom: spacing.sm },
  ctaOutline: {},

  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
  },

  section: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    backgroundColor: colors.bgGradientStart,
  },
  sectionTitle: {
    fontSize: 22, fontWeight: '800', color: colors.dark,
    textAlign: 'center', marginBottom: spacing.sm,
  },
  sectionSub: {
    fontSize: 13, color: colors.gray500, textAlign: 'center',
    lineHeight: 19, marginBottom: spacing.xl,
  },

  scenarioCard: {
    backgroundColor: '#EFF6FF', borderRadius: radius.lg,
    padding: spacing.xl, marginBottom: spacing.md,
  },
  scenarioIcon: { fontSize: 28, marginBottom: spacing.sm },
  scenarioName: { fontSize: 17, fontWeight: '700', color: colors.dark, marginBottom: spacing.sm },
  scenarioText: { fontSize: 14, color: colors.gray700, lineHeight: 20 },
  boldGray: { fontWeight: '700', color: colors.dark },
  withShield: { fontWeight: '700', color: colors.primary },
  greenText: { color: colors.success, fontWeight: '500' },

  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  featureCard: {
    backgroundColor: colors.white, borderRadius: radius.lg,
    padding: spacing.lg, width: (width - spacing.xl * 2 - spacing.md) / 2,
    ...shadow.sm,
  },
  featureTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  featureIcon: { fontSize: 22 },
  featureBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99 },
  featureBadgeText: { fontSize: 9, fontWeight: '700' },
  featureTitle: { fontSize: 13, fontWeight: '700', color: colors.dark, marginBottom: spacing.xs },
  featureDesc: { fontSize: 11, color: colors.gray500, lineHeight: 16 },

  stepsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg },
  stepItem: {
    width: (width - spacing.xl * 2 - spacing.lg) / 2,
    alignItems: 'center',
  },
  stepCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.sm, ...shadow.lg,
  },
  stepNum: { color: colors.white, fontSize: 18, fontWeight: '800' },
  stepTitle: { fontSize: 14, fontWeight: '700', color: colors.dark, marginBottom: spacing.xs, textAlign: 'center' },
  stepDesc: { fontSize: 12, color: colors.gray500, textAlign: 'center', lineHeight: 17 },

  ctaBanner: {
    backgroundColor: colors.primary, margin: spacing.xl,
    borderRadius: radius.xl, padding: spacing.xxl, alignItems: 'center',
    ...shadow.lg,
  },
  ctaBannerTitle: { fontSize: 20, fontWeight: '800', color: colors.white, marginBottom: spacing.sm, textAlign: 'center' },
  ctaBannerSub: { fontSize: 13, color: '#BFDBFE', textAlign: 'center', lineHeight: 19, marginBottom: spacing.xl },
  ctaBannerBtn: {
    backgroundColor: colors.white, borderRadius: radius.md,
    paddingHorizontal: spacing.xxl, paddingVertical: 14,
  },
  ctaBannerBtnText: { color: colors.primary, fontSize: 15, fontWeight: '700' },
});