import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import type { MealContext } from '../../lib/types/database';
import {
  MEAL_CONTEXT_LABELS,
  MEAL_CONTEXT_OPTIONS,
  GLUCOSE_NUDGES,
  formatGlucoseTimestamp,
} from '../../lib/glucose';
import { colors } from '../../theme/colors';
import { fonts, fontSizes } from '../../theme/typography';

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; context: MealContext }
  | { status: 'error'; message: string };

export default function LogScreen() {
  const [value, setValue] = useState<string>('');
  const [mealContext, setMealContext] = useState<MealContext>('fasting');
  const [loggedAt, setLoggedAt] = useState<Date>(new Date());
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

  const parsedValue = Number(value);
  const isValueValid =
    value.length > 0 &&
    Number.isFinite(parsedValue) &&
    parsedValue >= 1 &&
    parsedValue <= 999;
  const isSubmitting = submitState.status === 'submitting';
  const canSubmit = isValueValid && !isSubmitting;

  const handleSubmit = async (): Promise<void> => {
    if (!canSubmit) return;
    setSubmitState({ status: 'submitting' });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError !== null || userData.user === null) {
      setSubmitState({
        status: 'error',
        message: '로그인이 필요해요. 다시 시도해주세요.',
      });
      Alert.alert('로그인이 필요해요', '다시 시도해주세요.');
      return;
    }

    const insertError = (
      await supabase.from('glucose_logs').insert({
        user_id: userData.user.id,
        value_mg_dl: parsedValue,
        meal_context: mealContext,
        logged_at: loggedAt.toISOString(),
      })
    ).error;

    if (insertError !== null) {
      setSubmitState({ status: 'error', message: insertError.message });
      Alert.alert('기록하지 못했어요', insertError.message);
      return;
    }

    setSubmitState({ status: 'success', context: mealContext });
    setValue('');
    setLoggedAt(new Date());
  };

  const nudge =
    submitState.status === 'success' ? GLUCOSE_NUDGES[submitState.context] : null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.header}>혈당 기록</Text>

          {/* Value input */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>혈당 수치</Text>
            <View style={styles.valueRow}>
              <TextInput
                style={styles.valueInput}
                value={value}
                onChangeText={setValue}
                placeholder="0"
                placeholderTextColor={colors.textDisabled}
                keyboardType="number-pad"
                maxLength={4}
                returnKeyType="done"
                accessibilityLabel="혈당 수치 입력"
              />
              <Text style={styles.valueSuffix}>mg/dL</Text>
            </View>
          </View>

          {/* Meal context */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>식사 상황</Text>
            <View style={styles.segmentRow}>
              {MEAL_CONTEXT_OPTIONS.map((opt) => {
                const isSelected = opt === mealContext;
                return (
                  <Pressable
                    key={opt}
                    onPress={() => setMealContext(opt)}
                    style={({ pressed }) => [
                      styles.segment,
                      isSelected && styles.segmentSelected,
                      pressed && styles.segmentPressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={MEAL_CONTEXT_LABELS[opt]}
                  >
                    <Text
                      style={[
                        styles.segmentLabel,
                        isSelected && styles.segmentLabelSelected,
                      ]}
                    >
                      {MEAL_CONTEXT_LABELS[opt]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Timestamp (auto, display-only for MVP) */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>시간</Text>
            <View style={styles.timestampBox}>
              <Text style={styles.timestampText}>
                {formatGlucoseTimestamp(loggedAt.toISOString())}
              </Text>
            </View>
          </View>

          {/* Submit */}
          <Pressable
            onPress={handleSubmit}
            disabled={!canSubmit}
            style={({ pressed }) => [
              styles.submitButton,
              !canSubmit && styles.submitButtonDisabled,
              pressed && canSubmit && styles.submitButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="혈당 기록하기"
            accessibilityState={{ disabled: !canSubmit }}
          >
            <Text style={styles.submitText}>
              {isSubmitting ? '기록 중…' : '기록하기'}
            </Text>
          </Pressable>

          {/* Success + nudge */}
          {nudge !== null ? (
            <View style={styles.successCard}>
              <Text style={styles.successHeader}>기록됐어요 🥦</Text>
              <Text style={styles.nudgeTip}>{nudge.tip}</Text>
              <Text style={styles.nudgeReason}>{nudge.reason}</Text>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 48,
  },
  header: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.xxl,
    color: colors.textPrimary,
    marginBottom: 28,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 20,
    paddingVertical: 14,
    minHeight: 64,
  },
  valueInput: {
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: 36,
    color: colors.textPrimary,
    padding: 0,
  },
  valueSuffix: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.lg,
    color: colors.textSecondary,
    marginLeft: 12,
  },
  segmentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  segment: {
    flexGrow: 1,
    flexBasis: '47%',
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentSelected: {
    backgroundColor: colors.primarySurface,
    borderColor: colors.primary,
  },
  segmentPressed: {
    opacity: 0.7,
  },
  segmentLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.md,
    color: colors.textSecondary,
  },
  segmentLabelSelected: {
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  timestampBox: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    paddingVertical: 16,
    minHeight: 56,
    justifyContent: 'center',
  },
  timestampText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: colors.textDisabled,
  },
  submitButtonPressed: {
    backgroundColor: colors.primaryLight,
  },
  submitText: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.lg,
    color: colors.surface,
  },
  successCard: {
    marginTop: 24,
    padding: 20,
    backgroundColor: colors.primarySurface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  successHeader: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.lg,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  nudgeTip: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  nudgeReason: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
