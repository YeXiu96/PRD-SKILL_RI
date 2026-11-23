import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { THEME } from './src/constants/theme';
import { useSchedule } from './src/hooks/useSchedule';
import { Header } from './src/components/Header';
import { Toast } from './src/components/Toast';
import { ScheduleScreen } from './src/screens/ScheduleScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';

export default function App() {
  const {
    state,
    isLoading,
    activeTab,
    setActiveTab,
    conflicts,
    pendingNotifications,
    isScenarioTriggered,
    toastMessage,
    hideToast,
    acknowledgeNotifications,
    simulateBAAChange,
    moveToSession,
    resetDemo,
  } = useSchedule();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
        <Text style={styles.loadingText}>Memuat jadwal akademik...</Text>
      </View>
    );
  }

  const unreadCount = pendingNotifications.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.colors.card} />

      {/* In-App Toast Alert */}
      <Toast message={toastMessage} onHide={hideToast} />

      {/* Header Aplikasi */}
      <Header
        unreadCount={unreadCount}
        onPressNotifications={() => setActiveTab('riwayat')}
      />

      {/* Tab Navigasi Utama */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'jadwal' && styles.tabButtonActive]}
          onPress={() => setActiveTab('jadwal')}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.tabButtonText, activeTab === 'jadwal' && styles.tabButtonTextActive]}
          >
            📅 Jadwal Kuliah
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'riwayat' && styles.tabButtonActive]}
          onPress={() => setActiveTab('riwayat')}
          activeOpacity={0.7}
        >
          <View style={styles.tabRow}>
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'riwayat' && styles.tabButtonTextActive,
              ]}
            >
              📋 Riwayat Perubahan
            </Text>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Tampilan Layar Sesuai Tab Aktif */}
      <View style={styles.screenContainer}>
        {activeTab === 'jadwal' ? (
          <ScheduleScreen
            currentSessions={state.currentSessions}
            conflicts={conflicts}
            pendingNotifications={pendingNotifications}
            isScenarioTriggered={isScenarioTriggered}
            onSimulate={simulateBAAChange}
            onReset={resetDemo}
            onAcknowledge={acknowledgeNotifications}
            onMoveSession={moveToSession}
          />
        ) : (
          <HistoryScreen logs={state.logs} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: THEME.colors.textSecondary,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.sm,
    backgroundColor: THEME.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
    gap: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: THEME.colors.background,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  tabButtonActive: {
    backgroundColor: THEME.colors.primaryLight,
    borderColor: THEME.colors.primary,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  tabButtonTextActive: {
    color: THEME.colors.primary,
  },
  unreadBadge: {
    backgroundColor: THEME.colors.danger,
    borderRadius: THEME.borderRadius.full,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  screenContainer: {
    flex: 1,
  },
});
