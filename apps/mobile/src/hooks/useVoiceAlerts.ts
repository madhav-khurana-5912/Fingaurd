import * as Speech from 'expo-speech';
import { useCallback, useEffect } from 'react';
import { RiskLevel } from '../types';

export const useVoiceAlerts = () => {
  // Clean up any existing audio when component unmounts
  useEffect(() => {
    return () => {
      // Stop any playing audio when the hook is unmounted
      Speech.stop();
    };
  }, []);

  const speak = useCallback((text: string) => {
    // Stop any currently playing speech
    Speech.stop();
    // Speak the text
    Speech.speak(text, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
    });
  }, []);

  const playAudioAlert = useCallback((risk: RiskLevel, amount?: number) => {
    // Stop any currently playing speech
    Speech.stop();
    
    let message = '';
    
    if (risk === 'High') {
      message = `You must not buy it as you need the rest of money for your upcoming expenses.`;
    } else if (risk === 'Medium') {
      message = `Consider carefully before buying this $${amount || 0}. You might need this money for upcoming expenses.`;
    } else {
      message = `This purchase is safe to buy. You can buy this.`;
    }
    
    // Speak the message
    Speech.speak(message, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
    });
  }, []);

  const warn = useCallback(
    (amount: number, risk: RiskLevel) => {
      playAudioAlert(risk, amount);
    },
    [playAudioAlert],
  );

  return { speak, warn, playAudioAlert };
};
