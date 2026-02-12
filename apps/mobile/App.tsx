import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import DashboardScreen from './src/screens/Dashboard';
import SimulationScreen from './src/screens/Simulation';
import ExpenseManagerScreen from './src/screens/ExpenseManager';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FinancialProvider, useFinancial } from './src/context/FinancialContext';
import { 
  Home, 
  BarChart3, 
  Camera, 
  Settings, 
  LayoutDashboard, 
  Plus, 
  Calendar, 
  Calculator,
  Target, 
  Moon, 
  Search, 
  Bell 
} from 'lucide-react-native';

const COLORS = {
  bg: '#0a1a0f',
  bgCard: '#112118',
  green: '#22c55e',
  textMuted: '#64748b',
  border: '#1e3a28',
  sidebarBg: '#111d17',
};

const IS_DESKTOP_WIDTH = 1024;

function AppContent() {
  const [currentScreen, setCurrentScreen] = React.useState('dashboard');
  const { isLoading } = useFinancial();
  
  // Determine if desktop based on screen width
  const window = Dimensions.get('window');
  const isDesktop = window.width >= IS_DESKTOP_WIDTH;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.bg }}>
        <ActivityIndicator size="large" color={COLORS.green} />
        <Text style={{ color: COLORS.textMuted, marginTop: 12, fontSize: 15 }}>Loading your finances...</Text>
      </View>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard': return <DashboardScreen isDesktop={isDesktop} goToSimulation={() => setCurrentScreen('simulation')} />;
      case 'simulation': return <SimulationScreen isDesktop={isDesktop} />;
      case 'expenses': return <ExpenseManagerScreen isDesktop={isDesktop} />;
      case 'settings': return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff', fontSize: 18 }}>Settings Screen Coming Soon</Text></View>;
      default: return <DashboardScreen isDesktop={isDesktop} goToSimulation={() => setCurrentScreen('simulation')} />;
    }
  };

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'expenses', label: 'Analytics', icon: BarChart3 },
    { key: 'simulation', label: 'Simulator', icon: Calculator },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  if (isDesktop) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: COLORS.bg }}>
        {/* Desktop Sidebar */}
        <View style={{
          width: 240,
          backgroundColor: '#0d1612',
          borderRightWidth: 1,
          borderRightColor: COLORS.border,
          padding: 24,
          justifyContent: 'space-between',
        }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 48, gap: 12 }}>
              <View style={{ width: 32, height: 32, backgroundColor: COLORS.green, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 16, height: 16, borderWidth: 3, borderColor: '#000', borderRadius: 2 }} />
              </View>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>FinGuard</Text>
            </View>

            {menuItems.map((item) => {
              const isActive = currentScreen === item.key;
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => setCurrentScreen(item.key)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 14,
                    borderRadius: 12,
                    backgroundColor: isActive ? COLORS.green + '15' : 'transparent',
                    marginBottom: 8,
                  }}
                >
                  <Icon size={20} color={isActive ? COLORS.green : COLORS.textMuted} />
                  <Text style={{
                    marginLeft: 12,
                    fontSize: 15,
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? COLORS.green : COLORS.textMuted
                  }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View>
            <View style={{
              backgroundColor: COLORS.bgCard,
              padding: 16,
              borderRadius: 20,
              gap: 12,
              marginBottom: 24,
            }}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#f97316', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}></Text>
                </View>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>Spending Tip</Text>
              </View>
              <Text style={{ color: COLORS.textMuted, fontSize: 12, lineHeight: 18 }}>
                You're spending 12% less on dining out this month. Keep it up!
              </Text>
            </View>

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 }}>
              <Moon size={18} color={COLORS.textMuted} />
              <Text style={{ color: COLORS.textMuted, fontSize: 14 }}>Toggle Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 }}>
              <Settings size={18} color={COLORS.textMuted} />
              <Text style={{ color: COLORS.textMuted, fontSize: 14 }}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <View style={{ flex: 1 }}>
          {/* Desktop Header */}
          <View style={{
            height: 80,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 40,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border,
          }}>
            <View>
              <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
                {currentScreen === 'dashboard' ? 'Good Morning, Alex' :
                 currentScreen === 'expenses' ? 'Expense Manager' : 'Budget Simulator'}
              </Text>
              <Text style={{ color: COLORS.textMuted, fontSize: 14, marginTop: 4 }}>
                {currentScreen === 'dashboard' ? "Here's your financial health overview" : 
                 currentScreen === 'expenses' ? "Track and categorize your monthly spending." :
                 "Simulate purchases to see financial impact"}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.bgCard,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 10,
                width: 320,
              }}>
                <Search size={18} color={COLORS.textMuted} />
                <Text style={{ color: COLORS.textMuted, marginLeft: 12, fontSize: 14 }}>Search transactions...</Text>
              </View>
              <TouchableOpacity style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: COLORS.bgCard,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Bell size={20} color={COLORS.textMuted} />
              </TouchableOpacity>
              <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              }}>
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#334155', borderWidth: 1, borderColor: COLORS.border }} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 40 }}>
            {renderScreen()}
          </ScrollView>

        </View>
      </View>
    );
  }

  // Mobile Content
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {renderScreen()}

      {/* Mobile Tab Bar */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: COLORS.bgCard,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: 28,
        paddingTop: 12,
        position: 'relative', // Added to ensure proper positioning
      }}>
        {menuItems.map((item) => {
          const isActive = currentScreen === item.key;
          const TabIcon = item.icon;
          return (
            <TouchableOpacity
              key={item.key}
              style={{ flex: 1, alignItems: 'center' }}
              onPress={() => setCurrentScreen(item.key)}
            >
              <TabIcon
                size={22}
                color={isActive ? COLORS.green : COLORS.textMuted}
              />
              <Text style={{
                color: isActive ? COLORS.green : COLORS.textMuted,
                fontWeight: isActive ? 'bold' : 'normal',
                fontSize: 11,
                marginTop: 4,
              }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        {/* Plus Button for Mobile */}
        <TouchableOpacity 
          style={{
            position: 'absolute',
            top: -30,
            left: '50%',
            marginLeft: -30,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.green,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: COLORS.green,
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 5,
          }}
          onPress={() => setCurrentScreen('simulation')}
        >
          <Plus size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <FinancialProvider>
        <AppContent />
      </FinancialProvider>
    </SafeAreaProvider>
  );
}
