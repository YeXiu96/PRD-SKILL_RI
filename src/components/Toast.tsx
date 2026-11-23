import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

interface ToastProps {
  message: string | null;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onHide }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onHide();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onHide]);

  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderLeftWidth: 4,
    borderLeftColor: THEME.colors.primary,
    padding: 12,
    borderRadius: THEME.borderRadius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  messageText: {
    fontSize: 13,
    color: THEME.colors.textPrimary,
    lineHeight: 18,
    fontWeight: '500',
  },
});
