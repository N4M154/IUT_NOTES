import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PastelConfirmModal({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {!!title && <Text style={styles.title}>{title}</Text>}
          {!!message && <Text style={styles.message}>{message}</Text>}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.btn, styles.cancel]}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.confirm]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(232,180,217,0.6)",
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    color: "#6B5B95",
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: "#8B7BA8",
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  cancel: {
    backgroundColor: "rgba(184,164,212,0.15)",
    borderColor: "rgba(184,164,212,0.35)",
    marginRight: 8,
  },
  confirm: {
    backgroundColor: "#E8B4D9",
    borderColor: "#E8B4D9",
  },
  cancelText: {
    color: "#6B5B95",
    fontWeight: "400",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "400",
  },
});

/* -_- N4M154 -_- */
