import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { X } from 'lucide-react-native';
import { ExpenseType } from '../types';

const COLORS = {
  bg: '#0a1a0f',
  bgCard: '#112118',
  bgCardLight: '#162b1e',
  green: '#22c55e',
  greenDark: '#14532d',
  text: '#ffffff',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  border: '#1e3a28',
};

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (data: {
    name: string;
    amount: number;
    category: string;
    type: ExpenseType;
    dueDay?: number;
    frequency?: string;
  }) => void;
}

const CATEGORIES = ['Housing', 'Utilities', 'Food', 'Transport', 'Subscriptions', 'Shopping', 'Entertainment', 'Other'];

export default function AddExpenseModal({ visible, onClose, onAdd }: Props) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Other');
  const [type, setType] = useState<ExpenseType>(ExpenseType.VARIABLE);
  const [dueDay, setDueDay] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !amount.trim()) return;
    onAdd({
      name: name.trim(),
      amount: parseFloat(amount),
      category,
      type,
      dueDay: type === ExpenseType.FIXED ? parseInt(dueDay) || 1 : undefined,
      frequency: type === ExpenseType.FIXED ? 'monthly' : undefined,
    });
    setName('');
    setAmount('');
    setCategory('Other');
    setType(ExpenseType.VARIABLE);
    setDueDay('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }}>
          <View style={{
            backgroundColor: COLORS.bg,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingBottom: 40,
            borderWidth: 1,
            borderColor: COLORS.border,
            borderBottomWidth: 0,
          }}>
            {/* Header */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.border,
            }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.text }}>Add Expense</Text>
              <TouchableOpacity onPress={onClose} style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: COLORS.bgCard,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <X size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ padding: 20 }}>
              {/* Type Toggle */}
              <Text style={{ color: COLORS.textMuted, marginBottom: 8, fontWeight: '600' }}>Type</Text>
              <View style={{
                flexDirection: 'row',
                backgroundColor: COLORS.bgCard,
                borderRadius: 16,
                padding: 4,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: COLORS.border,
              }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    alignItems: 'center',
                    borderRadius: 12,
                    backgroundColor: type === ExpenseType.FIXED ? COLORS.green : 'transparent',
                  }}
                  onPress={() => setType(ExpenseType.FIXED)}
                >
                  <Text style={{
                    fontWeight: 'bold',
                    color: type === ExpenseType.FIXED ? '#000' : COLORS.textMuted,
                  }}>Fixed Bill</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    alignItems: 'center',
                    borderRadius: 12,
                    backgroundColor: type === ExpenseType.VARIABLE ? COLORS.green : 'transparent',
                  }}
                  onPress={() => setType(ExpenseType.VARIABLE)}
                >
                  <Text style={{
                    fontWeight: 'bold',
                    color: type === ExpenseType.VARIABLE ? '#000' : COLORS.textMuted,
                  }}>Variable</Text>
                </TouchableOpacity>
              </View>

              {/* Name */}
              <Text style={{ color: COLORS.textMuted, marginBottom: 8, fontWeight: '600' }}>Name</Text>
              <TextInput
                style={{
                  backgroundColor: COLORS.bgCard,
                  padding: 16,
                  borderRadius: 16,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  marginBottom: 20,
                  color: COLORS.text,
                }}
                placeholder="e.g. Netflix, Groceries..."
                placeholderTextColor={COLORS.textDim}
                value={name}
                onChangeText={setName}
              />

              {/* Amount */}
              <Text style={{ color: COLORS.textMuted, marginBottom: 8, fontWeight: '600' }}>Monthly Amount ($)</Text>
              <TextInput
                style={{
                  backgroundColor: COLORS.bgCard,
                  padding: 16,
                  borderRadius: 16,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  marginBottom: 20,
                  color: COLORS.text,
                }}
                placeholder="0.00"
                placeholderTextColor={COLORS.textDim}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />

              {/* Due Day */}
              {type === ExpenseType.FIXED && (
                <>
                  <Text style={{ color: COLORS.textMuted, marginBottom: 8, fontWeight: '600' }}>Due Day of Month (1-31)</Text>
                  <TextInput
                    style={{
                      backgroundColor: COLORS.bgCard,
                      padding: 16,
                      borderRadius: 16,
                      fontSize: 16,
                      borderWidth: 1,
                      borderColor: COLORS.border,
                      marginBottom: 20,
                      color: COLORS.text,
                    }}
                    placeholder="15"
                    placeholderTextColor={COLORS.textDim}
                    value={dueDay}
                    onChangeText={setDueDay}
                    keyboardType="numeric"
                  />
                </>
              )}

              {/* Category */}
              <Text style={{ color: COLORS.textMuted, marginBottom: 8, fontWeight: '600' }}>Category</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 }}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 20,
                      backgroundColor: category === cat ? COLORS.green : COLORS.bgCard,
                      marginRight: 8,
                      marginBottom: 8,
                      borderWidth: category === cat ? 0 : 1,
                      borderColor: COLORS.border,
                    }}
                    onPress={() => setCategory(cat)}
                  >
                    <Text style={{
                      color: category === cat ? '#000' : COLORS.textMuted,
                      fontWeight: '600',
                      fontSize: 13,
                    }}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Submit */}
              <TouchableOpacity
                style={{
                  backgroundColor: name.trim() && amount.trim() ? COLORS.green : COLORS.greenDark,
                  padding: 18,
                  borderRadius: 16,
                  alignItems: 'center',
                }}
                onPress={handleSubmit}
                disabled={!name.trim() || !amount.trim()}
              >
                <Text style={{
                  color: name.trim() && amount.trim() ? '#000' : COLORS.textMuted,
                  fontSize: 17,
                  fontWeight: 'bold',
                }}>Add Expense</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
