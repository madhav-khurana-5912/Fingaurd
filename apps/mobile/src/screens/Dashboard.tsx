import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  Settings,
  Info,
  TrendingUp,
  Plus,
  Zap,
  CreditCard,
  Tv,
  Lightbulb,
  ChevronRight,
  Calculator,
  X,
  Target,
  ArrowRight,
  Sparkles,
} from 'lucide-react-native';
import { useFinancial } from '../context/FinancialContext';
import { formatCurrency } from '../utils/financeEngine';

const { width } = Dimensions.get('window');

const COLORS = {
  bg: '#0a1a0f',
  card: '#112118',
  accent: '#1cfc6b',
  text: '#ffffff',
  textMuted: '#8b9a91',
  danger: '#ff4b4b',
  border: '#1e3a28',
};

export default function DashboardScreen({ isDesktop, goToSimulation }: { isDesktop?: boolean, goToSimulation?: () => void }) {
  const { profile, summary, expenses } = useFinancial();
  const [showSmartSort, setShowSmartSort] = React.useState(true);

  const healthStatus = "Excellent Health";
  const savingsTipText = "You're spending 12% less on dining out this month. Keep it up!";

  const upcomingBills = expenses
    .filter(e => e.type === 'fixed')
    .sort((a, b) => (a.dueDay || 0) - (b.dueDay || 0))
    .slice(0, 3);

  const DashboardContent = () => (
    <View style={{ gap: 32 }}>
      {/* Stats Row */}
      <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 24 }}>
        {/* Total Liquidity */}
        <View style={{
          flex: 1,
          backgroundColor: COLORS.card,
          borderRadius: 24,
          padding: 24,
          borderWidth: 1,
          borderColor: COLORS.border,
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ color: COLORS.accent, fontSize: 13, fontWeight: 'bold', letterSpacing: 1 }}>TOTAL LIQUIDITY</Text>
            <Info size={16} color={COLORS.textMuted} />
          </View>
          <Text style={{ color: COLORS.text, fontSize: 32, fontWeight: '800' }}>
            {formatCurrency(profile.currentBalance)}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <TrendingUp size={14} color={COLORS.accent} />
            <Text style={{ color: COLORS.accent, marginLeft: 6, fontWeight: '600', fontSize: 13 }}>
              +2.4% from last month
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 24, gap: 12 }}>
            <TouchableOpacity
              onPress={goToSimulation}
              style={{
                flex: 1,
                backgroundColor: COLORS.accent,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
              }}
            >
              <Calculator size={16} color="#000" style={{ marginRight: 8 }} />
              <Text style={{ color: '#000', fontWeight: 'bold' }}>Analyze Budget</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: 48,
              height: 48,
              backgroundColor: COLORS.border,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Plus size={20} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Safe to Spend */}
        <View style={{
          flex: 1,
          backgroundColor: COLORS.card,
          borderRadius: 24,
          padding: 24,
          borderWidth: 1,
          borderColor: COLORS.border,
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <View>
              <Text style={{ color: COLORS.textMuted, fontSize: 13 }}>Safe to Spend</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
                <Text style={{ color: COLORS.text, fontSize: 32, fontWeight: 'bold' }}>
                  {formatCurrency(summary.safeToSpend)}
                </Text>
                <Text style={{ color: COLORS.textMuted, fontSize: 14, marginLeft: 6 }}>left</Text>
              </View>
            </View>
            <View style={{ 
              width: 56, 
              height: 56, 
              borderRadius: 28, 
              borderWidth: 4,
              borderColor: COLORS.accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ color: COLORS.text, fontWeight: 'bold', fontSize: 13 }}>75%</Text>
            </View>
          </View>
          <View style={{ height: 6, backgroundColor: COLORS.border, borderRadius: 3, overflow: 'hidden' }}>
            <View style={{ width: '75%', height: '100%', backgroundColor: COLORS.accent }} />
          </View>
          <Text style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 16, lineHeight: 18 }}>
            Your bills for the next 30 days are covered. You have {formatCurrency(summary.safeToSpend)} for discretionary income.
          </Text>
        </View>
      </View>

      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ color: COLORS.text, fontSize: 20, fontWeight: 'bold' }}>Upcoming 30 Days</Text>
          <TouchableOpacity><Text style={{ color: COLORS.accent, fontWeight: 'bold' }}>View All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: isDesktop ? 0 : -20, paddingHorizontal: isDesktop ? 0 : 20 }}>
          {upcomingBills.map((bill, index) => (
            <View key={bill.id} style={{
              width: isDesktop ? 220 : 160,
              backgroundColor: COLORS.card,
              borderRadius: 20,
              padding: 16,
              marginRight: 16,
              borderWidth: 1,
              borderColor: index === 0 ? COLORS.accent : COLORS.border,
              borderLeftWidth: 4,
              borderLeftColor: index === 0 ? COLORS.accent : 'transparent',
            }}>
              <Text style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 'bold', marginBottom: 12 }}>May {bill.dueDay}</Text>
              <View style={{ width: 36, height: 36, backgroundColor: COLORS.accent + '15', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <CreditCard size={18} color={COLORS.accent} />
              </View>
              <Text style={{ color: COLORS.text, fontWeight: 'bold' }}>{bill.name}</Text>
              <Text style={{ color: COLORS.accent, fontSize: 16, fontWeight: 'bold', marginTop: 4 }}>-{formatCurrency(bill.amount)}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Spending Tip Banner */}
      <View style={{ backgroundColor: COLORS.card, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: COLORS.border, marginTop: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.accent + '20', alignItems: 'center', justifyContent: 'center' }}>
            <Lightbulb size={20} color={COLORS.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Weekly Insight</Text>
            <Text style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>
              You're spending 12% less on dining out this month. Keep it up!
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  if (isDesktop) {
    return (
      <View style={{ flexDirection: 'row', gap: 32 }}>
        <View style={{ flex: 1 }}>
          <DashboardContent />
        </View>

        {/* Right Sidebar */}
        <View style={{ width: 320, gap: 24 }}>
          {/* Smart Sort Card */}
          {showSmartSort && (
            <View style={{
              backgroundColor: COLORS.card,
              borderRadius: 24,
              padding: 24,
              borderWidth: 1,
              borderColor: COLORS.border,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ width: 36, height: 36, backgroundColor: COLORS.accent + '20', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={20} color={COLORS.accent} />
                </View>
                <TouchableOpacity onPress={() => setShowSmartSort(false)}>
                  <X size={16} color={COLORS.textMuted} />
                </TouchableOpacity>
              </View>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Smart Sort Active</Text>
              <Text style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 8, lineHeight: 20 }}>
                3 transactions were auto-categorized into 'Utilities' and 'Transport'.
              </Text>
            </View>
          )}

          {/* Obligations Card */}
          <View style={{
            backgroundColor: COLORS.card,
            borderRadius: 24,
            padding: 24,
            borderWidth: 1,
            borderColor: COLORS.border,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Obligations</Text>
              <View style={{ backgroundColor: COLORS.border, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                <Text style={{ color: COLORS.textMuted, fontSize: 10 }}>Next 7 days</Text>
              </View>
            </View>

            {[
              { name: 'Auto Loan', due: 'Oct 15', amt: '$349.50', status: 'AUTOPAY ON', icon: CreditCard },
              { name: 'Electric Bill', due: 'Oct 22', amt: '$145.20', status: 'Pending', icon: Zap },
              { name: 'Insurance', due: 'Paid on Oct 01', amt: '$210.00', status: 'Paid', icon: Target },
            ].map((item, idx) => (
              <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <View style={{ width: 40, height: 40, backgroundColor: COLORS.border, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <item.icon size={18} color={COLORS.textMuted} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>{item.name}</Text>
                  <Text style={{ color: COLORS.textMuted, fontSize: 11 }}>{item.due}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>{item.amt}</Text>
                  <Text style={{ color: item.status === 'Paid' ? COLORS.accent : '#f97316', fontSize: 9 }}>{item.status.toUpperCase()}</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={{
              marginTop: 12,
              borderWidth: 1,
              borderColor: COLORS.border,
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: 'center',
            }}>
              <Text style={{ color: COLORS.textMuted, fontWeight: 'bold' }}>View Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 }}
      >
        {/* Mobile Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: COLORS.accent, padding: 2, marginRight: 12 }}>
                <View style={{ flex: 1, borderRadius: 18, backgroundColor: '#334155' }} />
             </View>
             <View>
               <Text style={{ color: COLORS.textMuted, fontSize: 12 }}>Good Morning,</Text>
               <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Alex Chen</Text>
             </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center' }}><Bell size={18} color="#fff" /></View>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center' }}><Settings size={18} color="#fff" /></View>
          </View>
        </View>

        <DashboardContent />
      </ScrollView>
    </SafeAreaView>
  );
}
