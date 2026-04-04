import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TextInput,
  TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { colors, spacing, radius, shadow } from '../theme';
import { PrimaryButton, OutlineButton, Divider } from '../components/SharedComponents';

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total }) {
  return (
    <View style={pStyles.progressContainer}>
      <View style={pStyles.progressRow}>
        <Text style={pStyles.stepLabel}>Step {step} of {total}</Text>
        <Text style={pStyles.percentLabel}>{Math.round((step / total) * 100)}% complete</Text>
      </View>
      <View style={pStyles.progressBg}>
        <View style={[pStyles.progressFill, { width: `${(step / total) * 100}%` }]} />
      </View>
    </View>
  );
}

const pStyles = StyleSheet.create({
  progressContainer: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  stepLabel: { fontSize: 13, fontWeight: '600', color: colors.dark },
  percentLabel: { fontSize: 13, color: colors.gray500 },
  progressBg: { height: 6, backgroundColor: colors.gray200, borderRadius: 99 },
  progressFill: { height: 6, backgroundColor: colors.primary, borderRadius: 99 },
});

// ─── Input Field ──────────────────────────────────────────────────────────────
function InputField({ label, placeholder, value, onChangeText, keyboardType, hint }) {
  return (
    <View style={iStyles.container}>
      <Text style={iStyles.label}>{label}</Text>
      <TextInput
        style={iStyles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray400}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || 'default'}
      />
      {hint && <Text style={iStyles.hint}>{hint}</Text>}
    </View>
  );
}

const iStyles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  label: { fontSize: 14, fontWeight: '600', color: colors.dark, marginBottom: spacing.sm },
  input: {
    borderWidth: 1.5, borderColor: colors.gray200, borderRadius: radius.md,
    paddingHorizontal: spacing.lg, paddingVertical: 14,
    fontSize: 15, color: colors.dark, backgroundColor: colors.white,
  },
  hint: { fontSize: 11, color: colors.gray400, marginTop: 4 },
});

// ─── Dropdown (fake) ──────────────────────────────────────────────────────────
function DropdownField({ label, value, options, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={dStyles.container}>
      <Text style={dStyles.label}>{label}</Text>
      <TouchableOpacity style={dStyles.trigger} onPress={() => setOpen(!open)} activeOpacity={0.8}>
        <Text style={dStyles.triggerText}>{value}</Text>
        <Text style={dStyles.arrow}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {open && (
        <View style={dStyles.dropdown}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt} style={dStyles.option}
              onPress={() => { onSelect(opt); setOpen(false); }}
            >
              <Text style={[dStyles.optionText, opt === value && { color: colors.primary, fontWeight: '700' }]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const dStyles = StyleSheet.create({
  container: { marginBottom: spacing.lg, zIndex: 10 },
  label: { fontSize: 14, fontWeight: '600', color: colors.dark, marginBottom: spacing.sm },
  trigger: {
    borderWidth: 1.5, borderColor: colors.gray200, borderRadius: radius.md,
    paddingHorizontal: spacing.lg, paddingVertical: 14,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.white,
  },
  triggerText: { fontSize: 15, color: colors.dark },
  arrow: { fontSize: 12, color: colors.gray500 },
  dropdown: {
    position: 'absolute', top: 80, left: 0, right: 0,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray200,
    borderRadius: radius.md, ...shadow.md, zIndex: 99,
  },
  option: { paddingHorizontal: spacing.lg, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.gray100 },
  optionText: { fontSize: 14, color: colors.dark },
});

// ─── Step 1: Personal Details ─────────────────────────────────────────────────
function Step1({ data, setData, onNext }) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <View style={styles.stepIconCircle}>
          <Text style={{ fontSize: 20 }}>👤</Text>
        </View>
        <View>
          <Text style={styles.stepTitle}>Personal Details</Text>
          <Text style={styles.stepSubtitle}>Tell us about yourself</Text>
        </View>
      </View>

      <InputField label="Full Name" placeholder="Enter your full name"
        value={data.name} onChangeText={(v) => setData({ ...data, name: v })} />
      <InputField label="Mobile Number" placeholder="10-digit mobile number"
        keyboardType="phone-pad" value={data.mobile}
        onChangeText={(v) => setData({ ...data, mobile: v })} />
      <InputField label="Aadhaar Number" placeholder="12-digit Aadhaar number"
        keyboardType="numeric" value={data.aadhaar}
        onChangeText={(v) => setData({ ...data, aadhaar: v })}
        hint="Required for e-Shram registration" />
      <DropdownField label="Delivery Platform" value={data.platform}
        options={['Zomato', 'Swiggy', 'Both']}
        onSelect={(v) => setData({ ...data, platform: v })} />
      <InputField label="Platform ID / Rider ID" placeholder="Your delivery partner ID"
        value={data.riderId} onChangeText={(v) => setData({ ...data, riderId: v })} />

      <PrimaryButton title="Continue →" onPress={onNext} />
    </View>
  );
}

// ─── Step 2: Work Location ─────────────────────────────────────────────────────
function Step2({ data, setData, onNext, onBack }) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <View style={[styles.stepIconCircle, { backgroundColor: '#DCFCE7' }]}>
          <Text style={{ fontSize: 20 }}>📍</Text>
        </View>
        <View>
          <Text style={styles.stepTitle}>Work Location</Text>
          <Text style={styles.stepSubtitle}>Where do you usually work?</Text>
        </View>
      </View>

      <DropdownField label="City" value={data.city}
        options={['Bengaluru', 'Mumbai', 'Chennai', 'Delhi', 'Hyderabad', 'Pune', 'Kolkata']}
        onSelect={(v) => setData({ ...data, city: v })} />
      <InputField label="Primary Work Zone / Area"
        placeholder="e.g., Koramangala, Indiranagar, HSR Layout"
        value={data.zone} onChangeText={(v) => setData({ ...data, zone: v })}
        hint="We'll use this for pin-code level disruption monitoring" />
      <InputField label="Average Orders Per Day" placeholder="30"
        keyboardType="numeric" value={data.ordersPerDay}
        onChangeText={(v) => setData({ ...data, ordersPerDay: v })} />
      <InputField label="Working Hours Per Day" placeholder="8"
        keyboardType="numeric" value={data.hoursPerDay}
        onChangeText={(v) => setData({ ...data, hoursPerDay: v })} />

      {/* AI Risk Profiler info box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxIcon}>📱</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoBoxTitle}>AI Risk Profiler</Text>
          <Text style={styles.infoBoxDesc}>
            We'll analyze your zone's disruption history and create your personal income fingerprint for accurate payouts.
          </Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <OutlineButton title="Back" style={styles.backBtn} onPress={onBack} />
        <PrimaryButton title="Continue →" style={styles.continueBtn} onPress={onNext} />
      </View>
    </View>
  );
}

// ─── Step 3: Coverage Plan ────────────────────────────────────────────────────
function Step3({ data, onActivate, onBack }) {
  const [agreed, setAgreed] = useState(false);

  const weeklyPremium = 34.02;
  const maxWeeklyPayout = 2100;

  return (
    <View style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <View style={[styles.stepIconCircle, { backgroundColor: '#F3E8FF' }]}>
          <Text style={{ fontSize: 20 }}>📈</Text>
        </View>
        <View>
          <Text style={styles.stepTitle}>Your Coverage Plan</Text>
          <Text style={styles.stepSubtitle}>AI-calculated based on your profile</Text>
        </View>
      </View>

      {/* Premium Box */}
      <View style={styles.premiumBox}>
        <Text style={styles.premiumLabel}>Weekly Premium</Text>
        <Text style={styles.premiumAmount}>₹{weeklyPremium.toFixed(2)}</Text>
        <Text style={styles.premiumSub}>Collected as ₹1.1/order (based on ~31 orders/week)</Text>
      </View>

      {/* Max Payout Box */}
      <View style={styles.payoutBox}>
        <Text style={styles.payoutLabel}>Maximum Weekly Payout</Text>
        <Text style={styles.payoutAmount}>₹{maxWeeklyPayout}</Text>
      </View>

      {/* What's Covered */}
      <Text style={styles.coveredTitle}>What's Covered:</Text>
      {COVERED_ITEMS.map((item, i) => (
        <View key={i} style={styles.coveredItem}>
          <Text style={styles.coveredCheck}>✅</Text>
          <Text style={styles.coveredText}>{item}</Text>
        </View>
      ))}

      {/* Premium Works info */}
      <View style={styles.yellowBox}>
        <Text style={styles.yellowBoxTitle}>How Your Premium Works:</Text>
        {PREMIUM_BULLETS.map((b, i) => (
          <Text key={i} style={styles.yellowBullet}>• {b}</Text>
        ))}
      </View>

      {/* Tiered Recovery */}
      <Text style={styles.coveredTitle}>Tiered Recovery Support:</Text>
      {TIERS.map((t) => (
        <View key={t.num} style={styles.tierRow}>
          <View style={[styles.tierBadge, { backgroundColor: t.badgeBg }]}>
            <Text style={[styles.tierBadgeText, { color: t.badgeColor }]}>Tier {t.num}</Text>
          </View>
          <Text style={styles.tierDesc}>{t.desc}</Text>
        </View>
      ))}

      <Divider />

      {/* Consent */}
      <TouchableOpacity style={styles.consentRow} onPress={() => setAgreed(!agreed)} activeOpacity={0.8}>
        <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
          {agreed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.consentText}>
          I consent to GigShield accessing my platform order history to build my income fingerprint and authorize automatic premium deduction per order. I understand this is parametric insurance with zero-claim filing.
        </Text>
      </TouchableOpacity>

      <View style={[styles.buttonRow, { marginTop: spacing.xl }]}>
        <OutlineButton title="Back" style={styles.backBtn} onPress={onBack} />
        <TouchableOpacity
          style={[styles.activateBtn, !agreed && styles.activateBtnDisabled]}
          onPress={agreed ? onActivate : null}
          activeOpacity={0.85}
        >
          <Text style={styles.activateBtnText}>✓ Activate Protection</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const COVERED_ITEMS = [
  'Heavy rainfall (>35mm/hr)',
  'Extreme heat (WBGT >32°C)',
  'High AQI (>300 PM2.5)',
  'Floods and waterlogging',
  'Strikes, curfews, bandhs',
];
const PREMIUM_BULLETS = [
  'Deducted automatically from each completed order',
  'No monthly bills or renewal reminders',
  'Coverage never lapses as long as you\'re working',
  'Premium adjusts seasonally (monsoon/summer)',
];
const TIERS = [
  { num: 1, desc: 'Short disruption (<8hrs): Instant micro-payout', badgeBg: '#DBEAFE', badgeColor: colors.primary },
  { num: 2, desc: '1-2 days: Full payout + EMI deferral + metric freeze', badgeBg: '#FEF3C7', badgeColor: colors.warning },
  { num: 3, desc: '3+ days: Full coverage + 0% micro-loan up to ₹5,000', badgeBg: '#FFE4E6', badgeColor: colors.danger },
];

// ─── Main Onboarding Screen ───────────────────────────────────────────────────
export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState({
    name: '', mobile: '', aadhaar: '', platform: 'Zomato', riderId: '',
  });
  const [locationData, setLocationData] = useState({
    city: 'Bengaluru', zone: '', ordersPerDay: '30', hoursPerDay: '8',
  });

  const handleActivate = () => navigation.navigate('Dashboard');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bgGradientStart }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" />
      <ProgressBar step={step} total={3} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {step === 1 && (
          <Step1 data={personalData} setData={setPersonalData} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <Step2 data={locationData} setData={setLocationData}
            onNext={() => setStep(3)} onBack={() => setStep(1)} />
        )}
        {step === 3 && (
          <Step3 data={{ ...personalData, ...locationData }}
            onActivate={handleActivate} onBack={() => setStep(2)} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.xl, paddingBottom: 60 },
  stepCard: {
    backgroundColor: colors.white, borderRadius: radius.xl,
    padding: spacing.xl, ...shadow.md,
  },
  stepHeader: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: spacing.xxl, gap: spacing.md,
  },
  stepIconCircle: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center',
  },
  stepTitle: { fontSize: 18, fontWeight: '700', color: colors.dark },
  stepSubtitle: { fontSize: 13, color: colors.gray500 },

  infoBox: {
    backgroundColor: '#EFF6FF', borderRadius: radius.md,
    padding: spacing.lg, flexDirection: 'row', gap: spacing.md,
    marginBottom: spacing.xl,
  },
  infoBoxIcon: { fontSize: 20 },
  infoBoxTitle: { fontSize: 14, fontWeight: '600', color: colors.primary, marginBottom: 4 },
  infoBoxDesc: { fontSize: 12, color: colors.primary, lineHeight: 17 },

  buttonRow: { flexDirection: 'row', gap: spacing.md },
  backBtn: { flex: 1 },
  continueBtn: { flex: 2 },

  premiumBox: {
    backgroundColor: '#EFF6FF', borderRadius: radius.md,
    padding: spacing.xl, marginBottom: spacing.md,
  },
  premiumLabel: { fontSize: 13, fontWeight: '600', color: colors.primary, marginBottom: spacing.sm },
  premiumAmount: { fontSize: 28, fontWeight: '800', color: colors.primary, marginBottom: spacing.xs },
  premiumSub: { fontSize: 12, color: colors.primary },

  payoutBox: {
    backgroundColor: '#F0FDF4', borderRadius: radius.md,
    padding: spacing.xl, marginBottom: spacing.xl,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  payoutLabel: { fontSize: 13, fontWeight: '600', color: colors.success },
  payoutAmount: { fontSize: 26, fontWeight: '800', color: colors.success },

  coveredTitle: { fontSize: 16, fontWeight: '700', color: colors.dark, marginBottom: spacing.md },
  coveredItem: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, gap: spacing.sm },
  coveredCheck: { fontSize: 16 },
  coveredText: { fontSize: 14, color: colors.gray700 },

  yellowBox: {
    backgroundColor: '#FFFBEB', borderRadius: radius.md,
    padding: spacing.lg, marginVertical: spacing.lg,
  },
  yellowBoxTitle: { fontSize: 14, fontWeight: '600', color: colors.warning, marginBottom: spacing.sm },
  yellowBullet: { fontSize: 13, color: colors.warning, marginBottom: 4 },

  tierRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  tierBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99, marginRight: spacing.sm },
  tierBadgeText: { fontSize: 11, fontWeight: '700' },
  tierDesc: { fontSize: 13, color: colors.gray700, flex: 1 },

  consentRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  checkbox: {
    width: 20, height: 20, borderRadius: 4, borderWidth: 2,
    borderColor: colors.gray400, alignItems: 'center', justifyContent: 'center', marginTop: 2,
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: colors.white, fontSize: 12, fontWeight: '800' },
  consentText: { fontSize: 12, color: colors.gray500, flex: 1, lineHeight: 18 },

  activateBtn: {
    flex: 2, backgroundColor: colors.success, borderRadius: radius.md,
    paddingVertical: 16, alignItems: 'center', justifyContent: 'center', ...shadow.md,
  },
  activateBtnDisabled: { backgroundColor: colors.gray300, opacity: 0.6 },
  activateBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});