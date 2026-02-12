import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  ChevronDown, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Home as HomeIcon, 
  Music, 
  Bookmark, 
  Shield, 
  RotateCcw,
  Zap,
  RotateCw,
} from 'lucide-react-native';
import { useFinancial } from '../context/FinancialContext';
import { useVoiceAlerts } from '../hooks/useVoiceAlerts';
import { formatCurrency } from '../utils/financeEngine';
import { PredictionResult } from '../types';

const COLORS = {
  bg: '#0a1a0f',
  card: '#112118',
  cardLight: '#162b1e',
  accent: '#1cfc6b',
  orange: '#f97316',
  red: '#ef4444',
  yellow: '#eab308',
  text: '#ffffff',
  textMuted: '#8b9a91',
  border: '#1e3a28',
};

export default function SimulationScreen({ isDesktop }: { isDesktop?: boolean }) {
  const { profile, expenses, runSimulation } = useFinancial();
  const { warn } = useVoiceAlerts();
  const [amount, setAmount] = useState('150.00');
  const [category, setCategory] = useState('Shopping');
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleSimulate = () => {
    const purchaseAmount = parseFloat(amount);
    if (isNaN(purchaseAmount) || purchaseAmount <= 0) return;
    const simResult = runSimulation(purchaseAmount);
    setResult(simResult);
    warn(purchaseAmount, simResult.riskLevel);
  };

  const handleReset = () => {
    setAmount('150.00');
    setResult(null);
  };

  const upcomingBills = [
    { name: 'Rent Payment', due: 'Due in 5 days', amt: '-$1,200.00', status: 'AT RISK', color: COLORS.red },
    { name: 'Spotify', due: 'Due tomorrow', amt: '-$12.99', status: 'SAFE', color: COLORS.accent },
  ];

  const SimulationInput = () => (
    <View style={{ backgroundColor: COLORS.card, borderRadius: 24, padding: isDesktop ? 32 : 20, marginBottom: 24, borderWidth: 1, borderColor: COLORS.border }}>
      <Text style={{ color: COLORS.textMuted, fontSize: 13, fontWeight: '600', marginBottom: 16 }}>Thinking of buying?</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: COLORS.textMuted, fontSize: 32, fontWeight: 'bold' }}>$</Text>
            <TextInput 
              style={{ color: '#fff', fontSize: 40, fontWeight: 'bold', marginLeft: 12, minWidth: 150 }}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
         </View>
         <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, gap: 12 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{category}</Text>
            <ChevronDown size={18} color={COLORS.textMuted} />
         </TouchableOpacity>
      </View>
      <TouchableOpacity 
        onPress={handleSimulate}
        style={{ backgroundColor: COLORS.accent, paddingVertical: 18, borderRadius: 16, alignItems: 'center' }}
      >
        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>Simulate Impact</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: isDesktop ? 'transparent' : COLORS.bg }}>
      {!isDesktop && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20 }}>
          <ArrowLeft size={24} color={COLORS.text} />
          <Text style={{ color: COLORS.text, fontSize: 18, fontWeight: 'bold' }}>Budget Simulator</Text>
          <TouchableOpacity onPress={handleReset}><RotateCw size={20} color={COLORS.textMuted} /></TouchableOpacity>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <SimulationInput />

        {result && (
          <View style={{ gap: 24 }}>
            <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 24 }}>
              {/* Left Column */}
              <View style={{ flex: 1, gap: 24 }}>
                 {/* Risk Card */}
                 <View style={{ backgroundColor: COLORS.card, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                       <Text style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 'bold', letterSpacing: 1 }}>RISK INDICATOR</Text>
                       <View style={{ backgroundColor: '#f9731620', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }}>
                          <Text style={{ color: '#f97316', fontSize: 10, fontWeight: 'bold' }}> Medium Impact</Text>
                       </View>
                    </View>
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>You might feel tight next week.</Text>
                    <Text style={{ color: COLORS.textMuted, fontSize: 14, marginTop: 8, lineHeight: 22 }}>Spending this leaves only $45 for groceries based on your typical habits.</Text>
                 </View>

                 {/* Alerts Card */}
                 <View style={{ backgroundColor: COLORS.card, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                       <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Future Alerts Preview</Text>
                       <View style={{ backgroundColor: COLORS.border, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                          <Text style={{ color: COLORS.textMuted, fontSize: 10 }}>2 Upcoming</Text>
                       </View>
                    </View>
                    {upcomingBills.map((bill, idx) => (
                      <View key={idx} style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        backgroundColor: COLORS.bg, 
                        padding: 16, 
                        borderRadius: 16, 
                        marginBottom: 12,
                        borderLeftWidth: 4,
                        borderLeftColor: bill.color
                      }}>
                         <View style={{ width: 40, height: 40, backgroundColor: COLORS.card, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                            <HomeIcon size={18} color={COLORS.textMuted} />
                         </View>
                         <View style={{ flex: 1 }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{bill.name}</Text>
                            <Text style={{ color: COLORS.textMuted, fontSize: 12 }}>{bill.due}</Text>
                         </View>
                         <View style={{ alignItems: 'flex-end' }}>
                            <View style={{ backgroundColor: bill.color + '20', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginBottom: 4 }}>
                              <Text style={{ color: bill.color, fontSize: 9, fontWeight: 'bold' }}>{bill.status}</Text>
                            </View>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{bill.amt}</Text>
                         </View>
                      </View>
                    ))}
                 </View>
              </View>

              {/* Right Column: Projection */}
              <View style={{ flex: 1 }}>
                 <View style={{ backgroundColor: COLORS.card, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border, flex: 1 }}>
                    <Text style={{ color: COLORS.textMuted, fontSize: 14, fontWeight: 'bold' }}>Balance Projection</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 12 }}>
                      <Text style={{ color: '#fff', fontSize: 48, fontWeight: 'bold' }}>$1,100</Text>
                      <View style={{ marginLeft: 16 }}>
                         <Text style={{ color: COLORS.textMuted, fontSize: 14, textDecorationLine: 'line-through' }}>$1,250</Text>
                         <Text style={{ color: COLORS.red, fontSize: 14 }}>-$150.00</Text>
                      </View>
                    </View>

                    {/* Chart Visual */}
                    <View style={{ marginTop: 40, flex: 1 }}>
                      <View style={{ height: 200, backgroundColor: '#050c08', borderRadius: 20, overflow: 'hidden', padding: 20 }}>
                         {/* Dashed Grid Lines */}
                         <View style={{ position: 'absolute', top: 50, left: 20, right: 20, height: 1, backgroundColor: COLORS.border, opacity: 0.5 }} />
                         <View style={{ position: 'absolute', top: 100, left: 20, right: 20, height: 1, backgroundColor: COLORS.border, opacity: 0.5 }} />
                         <View style={{ position: 'absolute', top: 150, left: 20, right: 20, height: 1, backgroundColor: COLORS.border, opacity: 0.5 }} />
                         
                         {/* Simulated Curve with SVG-like View */}
                         <View style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={{
                               height: 100,
                               width: '100%',
                               borderBottomWidth: 3,
                               borderColor: COLORS.accent,
                               borderBottomLeftRadius: 100,
                               borderBottomRightRadius: 100,
                               opacity: 0.8,
                            }} />
                            <View style={{
                               position: 'absolute',
                               bottom: 0,
                               left: 0,
                               right: 0,
                               height: 60,
                               backgroundColor: COLORS.accent + '15',
                               borderTopLeftRadius: 50,
                               borderTopRightRadius: 50,
                            }} />
                         </View>

                         {/* Data points */}
                         <View style={{ position: 'absolute', left: 20, top: 80, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent, shadowColor: COLORS.accent, shadowRadius: 10, shadowOpacity: 1 }} />
                         <View style={{ position: 'absolute', right: 20, top: 100, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent, shadowColor: COLORS.accent, shadowRadius: 10, shadowOpacity: 1 }} />
                      </View>
                      
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                        <Text style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 'bold' }}>TODAY</Text>
                        <Text style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 'bold' }}>NEXT WEEK</Text>
                        <Text style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 'bold' }}>END OF MONTH</Text>
                      </View>
                    </View>
                 </View>
              </View>
            </View>

            {/* Bottom Actions */}
            <View style={{ 
              flexDirection: 'row', 
              gap: 16, 
              paddingVertical: 24, 
              borderTopWidth: 1, 
              borderTopColor: COLORS.border,
              marginTop: 20
            }}>
               <TouchableOpacity style={{ flex: 1, backgroundColor: COLORS.card, paddingVertical: 18, borderRadius: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 12, borderWidth: 1, borderColor: COLORS.border }}>
                  <Bookmark size={20} color="#fff" />
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save for Later</Text>
               </TouchableOpacity>
               <TouchableOpacity 
                 style={{ 
                   flex: 1, 
                   backgroundColor: result?.riskLevel === 'High' ? COLORS.red : result?.riskLevel === 'Medium' ? COLORS.orange : COLORS.accent, 
                   paddingVertical: 18, 
                   borderRadius: 16, 
                   alignItems: 'center', 
                   flexDirection: 'row', 
                   justifyContent: 'center', 
                   gap: 12 
                 }}
                 onPress={() => {
                   // Handle the purchase decision based on risk level
                   if (result?.riskLevel === 'Low') {
                     // User can proceed with purchase
                     console.log('Proceeding with purchase');
                   } else {
                     // Show warning about high/medium risk
                     console.log(`Warning: ${result?.riskLevel} risk purchase`);
                   }
                 }}
               >
                  <CheckCircle2 size={20} color={result?.riskLevel === 'High' ? '#000' : '#000'} />
                  <Text style={{ color: result?.riskLevel === 'High' ? '#000' : '#000', fontWeight: 'bold' }}>
                    {result?.riskLevel === 'High' ? 'Not Recommended' : 
                     result?.riskLevel === 'Medium' ? 'Consider Carefully' : 'Safe to Buy'}
                  </Text>
               </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
