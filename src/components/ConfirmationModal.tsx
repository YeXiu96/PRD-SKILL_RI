import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { Course, ClassSession } from '../types/schedule';
import { formatSlot } from '../utils/scheduleLogic';

interface ConfirmationModalProps {
  visible: boolean;
  course: Course | null;
  targetSession: ClassSession | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  course,
  targetSession,
  onCancel,
  onConfirm,
}) => {
  if (!course || !targetSession) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.dialogCard} accessibilityRole="alert">
          <Text style={styles.title}>Konfirmasi Pindah Sesi</Text>
          
          <Text style={styles.message}>
            Pindah ke <Text style={styles.bold}>Kelas {targetSession.classCode}</Text>? Jadwal{' '}
            <Text style={styles.bold}>{course.name}</Text> menjadi{' '}
            <Text style={styles.bold}>
              {formatSlot(targetSession)}, {targetSession.room}
            </Text>
            . Presensi dicatat pada sesi baru.
          </Text>

          <Text style={styles.subtext}>
            * Catatan: Presensi mengikuti sesi yang dipilih (asumsi, konfirmasi BAA).
          </Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Batal pindah sesi"
            >
              <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Konfirmasi pindah sesi"
            >
              <Text style={styles.confirmButtonText}>Pindah</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.lg,
  },
  dialogCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.xl,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: THEME.colors.textPrimary,
    lineHeight: 22,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  bold: {
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    backgroundColor: '#FFFFFF',
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  confirmButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: THEME.colors.primary,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
