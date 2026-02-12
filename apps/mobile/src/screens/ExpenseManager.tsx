import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  Tag, 
  Home as HomeIcon, 
  Car, 
  Zap, 
  X, 
  MapPin, 
  ChevronDown, 
  Sparkles, 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react-native';
import { useFinancial } from '../context/FinancialContext';
import { formatCurrency } from '../utils/financeEngine';
import { ExpenseType } from '../types';
import AddExpenseModal from '../components/AddExpenseModal';

const COLORS = {
  bg: '#0a1a0f',
  card: '#112118',
  cardLight: '#162b1e',
  accent: '#1cfc6b',
  orange: '#f97316',
  red: '#ef4444',
  text: '#ffffff',
  textMuted: '#8b9a91',
  border: '#1e3a28',
  purple: '#a855f7',
};

export default function ExpenseManagerScreen({ isDesktop }: { isDesktop?: boolean }) {
  const { profile, expenses, addExpense, removeExpense, summary } = useFinancial();
  const [activeTab, setActiveTab] = useState<'fixed' | 'variable'>('fixed');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSmartSort, setShowSmartSort] = useState(true);

  const filteredExpenses = expenses.filter((e) => e.type === activeTab);

  const getExpenseIcon = (name: string, category: string) => {
    const n = name.toLowerCase();
    const c = category.toLowerCase();
    if (n.includes('rent') || c === 'housing') return HomeIcon;
    if (n.includes('auto') || n.includes('car') || c === 'transport') return Car;
    if (n.includes('electric') || c === 'utilities') return Zap;
    return Tag;
  };

  const getStatusInfo = (item: any) => {
    if (item.name.includes('Rent')) return { text: 'Due in 2 days', color: COLORS.red, type: 'urgent' };
    if (item.name.includes('Auto')) return { text: 'Autopay On', color: COLORS.textMuted, type: 'auto' };
    if (item.name.includes('Electric')) return { text: 'Pending', color: COLORS.orange, type: 'pending' };
    if (item.name.includes('Insurance')) return { text: 'Paid', color: COLORS.accent, type: 'paid' };
    return { text: `Due in ${item.dueDay || 15} days`, color: COLORS.textMuted, type: 'normal' };
  };

  const MobileHeader = () => (
    <View style={{ padding: 20, paddingTop: 60, backgroundColor: COLORS.bg }}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Expense Manager</Text>
      <Text style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>Track and categorize your monthly spending.</Text>
      
      <View style={{ marginTop: 20, backgroundColor: COLORS.card, padding: 16, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 40, height: 40, backgroundColor: COLORS.accent + '20', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={20} color={COLORS.accent} />
          </View>
          <View>
            <Text style={{ color: COLORS.textMuted, fontSize: 10, fontWeight: 'bold' }}>SAFE TO SPEND</Text>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{formatCurrency(summary.safeToSpend)}</Text>
          </View>
        </View>
        <TouchableOpacity style={{ backgroundColor: COLORS.accent, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 }}>
           <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 12 }}>Add New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const Toolbar = () => (
    <View style={{ flexDirection: isDesktop ? 'row' : 'column', justifyContent: 'space-between', alignItems: isDesktop ? 'center' : 'stretch', marginBottom: 24, gap: 16 }}>
      <View style={{ flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: 12, padding: 4, borderWidth: 1, borderColor: COLORS.border }}>
        <TouchableOpacity 
          onPress={() => setActiveTab('fixed')}
          style={{ flex: isDesktop ? 0 : 1, paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8, backgroundColor: activeTab === 'fixed' ? COLORS.accent : 'transparent' }}
        >
          <Text style={{ textAlign: 'center', color: activeTab === 'fixed' ? '#000' : COLORS.textMuted, fontWeight: 'bold' }}>Fixed Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setActiveTab('variable')}
          style={{ flex: isDesktop ? 0 : 1, paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8, backgroundColor: activeTab === 'variable' ? COLORS.accent : 'transparent' }}
        >
          <Text style={{ textAlign: 'center', color: activeTab === 'variable' ? '#000' : COLORS.textMuted, fontWeight: 'bold' }}>Variable</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 12, paddingHorizontal: 16, borderWidth: 1, borderColor: COLORS.border }}>
          <Search size={18} color={COLORS.textMuted} />
          <TextInput 
            placeholder="Search merchants or tags..." 
            placeholderTextColor={COLORS.textMuted}
            style={{ color: '#fff', marginLeft: 12, flex: 1, height: 44 }}
          />
        </View>
        {isDesktop && (
          <>
            <TouchableOpacity style={{ backgroundColor: COLORS.card, height: 44, width: 100, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Filter size={18} color={COLORS.textMuted} />
              <Text style={{ color: COLORS.textMuted, fontWeight: 'bold' }}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setShowAddModal(true)}
              style={{ backgroundColor: COLORS.accent, height: 44, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Plus size={20} color="#000" />
              <Text style={{ color: '#000', fontWeight: 'bold' }}>Add New</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: isDesktop ? 'transparent' : COLORS.bg }}>
      {!isDesktop && <MobileHeader />}

      <ScrollView contentContainerStyle={{ padding: isDesktop ? 0 : 20, paddingBottom: 100 }}>
        {showSmartSort && (
          <View style={{ 
            backgroundColor: COLORS.card, 
            borderRadius: 16, 
            padding: 20, 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: COLORS.border,
            borderLeftWidth: 4,
            borderLeftColor: COLORS.accent,
            marginBottom: 24
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1 }}>
               <View style={{ width: 40, height: 40, backgroundColor: COLORS.accent + '20', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={20} color={COLORS.accent} />
               </View>
               <View style={{ flex: 1 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Smart Sort Active</Text>
                  <Text style={{ color: COLORS.textMuted, fontSize: 13 }} numberOfLines={2}>3 transactions were auto-categorized into 'Utilities' and 'Transport'.</Text>
               </View>
            </View>
            <TouchableOpacity onPress={() => setShowSmartSort(false)}>
              <X size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>
        )}

        {<Toolbar />}

        {/* Expense List / Table */}
        <View style={{ backgroundColor: COLORS.card, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border }}>
          {isDesktop && (
            <View style={{ flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: COLORS.border, backgroundColor: COLORS.border + '30' }}>
              <Text style={{ flex: 2, color: COLORS.textMuted, fontSize: 12, fontWeight: 'bold' }}>TRANSACTION</Text>
              <Text style={{ flex: 1, color: COLORS.textMuted, fontSize: 12, fontWeight: 'bold' }}>CATEGORY</Text>
              <Text style={{ flex: 1.5, color: COLORS.textMuted, fontSize: 12, fontWeight: 'bold' }}>SMART TAGS</Text>
              <Text style={{ flex: 1.5, color: COLORS.textMuted, fontSize: 12, fontWeight: 'bold' }}>STATUS</Text>
              <Text style={{ flex: 1, color: COLORS.textMuted, fontSize: 12, fontWeight: 'bold' }}>AMOUNT</Text>
              <View style={{ width: 40 }} />
            </View>
          )}

          {filteredExpenses.map((item, idx) => {
            const Icon = getExpenseIcon(item.name, item.category);
            const status = getStatusInfo(item);
            return (
              <View key={item.id} style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                padding: isDesktop ? 20 : 16, 
                borderBottomWidth: idx === filteredExpenses.length - 1 ? 0 : 1, 
                borderBottomColor: COLORS.border 
              }}>
                <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ width: 40, height: 40, backgroundColor: COLORS.border, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={COLORS.textMuted} />
                  </View>
                  <View>
                    <Text style={{ color: '#fff', fontWeight: '600' }}>{item.name}</Text>
                    <Text style={{ color: COLORS.textMuted, fontSize: 11 }}>{idx % 2 === 0 ? 'Oct 01, 2023' : 'Oct 15, 2023'}</Text>
                  </View>
                </View>

                {isDesktop && (
                  <>
                    <View style={{ flex: 1 }}>
                      <View style={{ backgroundColor: '#334155', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' }}>
                        <Text style={{ color: '#93c5fd', fontSize: 11, fontWeight: 'bold' }}>{item.category}</Text>
                      </View>
                    </View>
                    <View style={{ flex: 1.5, flexDirection: 'row', gap: 8 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: COLORS.accent + '20', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.accent }} />
                        <Text style={{ color: COLORS.accent, fontSize: 10, fontWeight: 'bold' }}>{item.type === 'fixed' ? 'Fixed' : 'Variable'}</Text>
                      </View>
                      {idx === 2 && (
                        <View style={{ backgroundColor: '#f9731620', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                          <Text style={{ color: '#f97316', fontSize: 10, fontWeight: 'bold' }}>High Impact</Text>
                        </View>
                      )}
                    </View>
                  </>
                )}

                <View style={{ flex: isDesktop ? 1.5 : 1 }}>
                   {isDesktop ? (
                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        {status.type === 'urgent' && <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.red + '20', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: COLORS.red, fontSize: 8 }}></Text></View>}
                        <Text style={{ color: status.color, fontSize: 13 }}>{status.text}</Text>
                     </View>
                   ) : (
                     <Text style={{ color: status.color, fontSize: 12 }}>{status.text}</Text>
                   )}
                </View>

                <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{formatCurrency(item.amount)}</Text>
                  {isDesktop && item.name.includes('Rent') && (
                    <TouchableOpacity style={{ backgroundColor: COLORS.accent + '15', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: COLORS.accent }}>
                      <Text style={{ color: COLORS.accent, fontSize: 10, fontWeight: 'bold' }}>PAY NOW</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {isDesktop && (
                  <TouchableOpacity style={{ marginLeft: 16 }}>
                    <MoreVertical size={20} color={COLORS.textMuted} />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}

          {isDesktop && (
            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.border }}>
              <Text style={{ color: COLORS.textMuted, fontSize: 13 }}>Showing <Text style={{ color: '#fff' }}>1 to 5</Text> of <Text style={{ color: '#fff' }}>12</Text> results</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={16} color={COLORS.textMuted} /></TouchableOpacity>
                <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#000', fontWeight: 'bold' }}>1</Text></TouchableOpacity>
                <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: COLORS.textMuted }}>2</Text></TouchableOpacity>
                <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: COLORS.textMuted }}>3</Text></TouchableOpacity>
                <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={16} color={COLORS.textMuted} /></TouchableOpacity>
              </View>
            </View>
          )}
        </View>

      </ScrollView>

      <AddExpenseModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addExpense}
      />
    </View>
  );
}
