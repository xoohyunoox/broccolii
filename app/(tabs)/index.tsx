import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { supabase } from '../../lib/supabase';
import type { MealContext } from '../../lib/types/database';
import {
  MEAL_CONTEXT_LABELS,
  glucoseBandColor,
  formatGlucoseTimestamp,
} from '../../lib/glucose';
import { colors } from '../../theme/colors';
import { fonts, fontSizes } from '../../theme/typography';

type GlucoseRow = {
  id: string;
  value_mg_dl: number;
  meal_context: MealContext;
  logged_at: string;
};

type LoadState =
  | { status: 'loading' }
  | { status: 'ready'; rows: readonly GlucoseRow[] }
  | { status: 'error'; message: string };

export default function HomeScreen() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadLogs = useCallback(async (): Promise<void> => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('glucose_logs')
      .select('id, value_mg_dl, meal_context, logged_at')
      .gte('logged_at', sevenDaysAgo)
      .order('logged_at', { ascending: false });

    if (error !== null) {
      setState({ status: 'error', message: error.message });
      return;
    }

    setState({ status: 'ready', rows: data ?? [] });
  }, []);

  // Refetch whenever the home tab regains focus (e.g. after a new log).
  useFocusEffect(
    useCallback(() => {
      void loadLogs();
    }, [loadLogs])
  );

  useEffect(() => {
    void loadLogs();
  }, [loadLogs]);

  const onRefresh = useCallback(async (): Promise<void> => {
    setRefreshing(true);
    await loadLogs();
    setRefreshing(false);
  }, [loadLogs]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.headerWrap}>
        <Text style={styles.header}>최근 7일 혈당</Text>
      </View>

      {state.status === 'loading' ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : state.status === 'error' ? (
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>잠시 후 다시 시도해주세요</Text>
          <Text style={styles.errorBody}>{state.message}</Text>
        </View>
      ) : state.rows.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            아직 기록이 없어요.{'\n'}첫 번째 혈당을 기록해볼까요? 🥦
          </Text>
        </View>
      ) : (
        <FlatList
          data={state.rows}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
          renderItem={({ item }) => {
            const bandColor = glucoseBandColor(item.value_mg_dl);
            return (
              <View style={styles.row}>
                <View style={styles.valueColumn}>
                  <Text style={[styles.value, { color: bandColor }]}>
                    {item.value_mg_dl}
                  </Text>
                  <Text style={styles.unit}>mg/dL</Text>
                </View>
                <View style={styles.metaColumn}>
                  <Text style={styles.context}>
                    {MEAL_CONTEXT_LABELS[item.meal_context]}
                  </Text>
                  <Text style={styles.timestamp}>
                    {formatGlucoseTimestamp(item.logged_at)}
                  </Text>
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerWrap: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  header: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.xxl,
    color: colors.textPrimary,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  errorTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorBody: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 72,
  },
  valueColumn: {
    flexDirection: 'row',
    alignItems: 'baseline',
    minWidth: 110,
  },
  value: {
    fontFamily: fonts.bold,
    fontSize: 32,
  },
  unit: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  metaColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  context: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  timestamp: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
  separator: {
    height: 10,
  },
});
