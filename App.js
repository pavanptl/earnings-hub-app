import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [announcements] = useState([
    {
      id: '1',
      company: 'Reliance Industries Limited',
      ticker: 'RELIANCE',
      industry: 'Conglomerate (Oil, Retail, Digital, Energy)',
      quarter: 'Q2 FY27',
      rating: 'EXCELLENT',
      filingDate: '30 Oct 2026',
      metrics: {
        sales: { qoq: '+6.7%', yoy: '+28.6%', history: [258898, 311850, 332861], unit: 'Cr' },
        otherInc: { qoq: '-11.6%', yoy: '+29.3%', history: [4482, 6550, 5793], unit: 'Cr' },
        op: { qoq: '+19.1%', yoy: '+26.3%', history: [48480, 51403, 61224], unit: 'Cr' },
        opm: { qoq: '+20.0%', yoy: '+2.7%', history: ['11.10%', '9.50%', '11.40%'], unit: '' },
        pat: { qoq: '+27.4%', yoy: '+33.8%', history: [22092, 23196, 29550], unit: 'Cr' },
        eps: { qoq: '+22.0%', yoy: '+40.7%', history: [13.42, 15.48, 18.88], unit: '' }
      }
    }
  ]);

  // Theme colors configuration
  const theme = {
    bg: isDarkMode ? '#090d16' : '#f3f4f6',
    headerBg: isDarkMode ? '#1e293b' : '#ffffff',
    headerText: isDarkMode ? '#ffffff' : '#111827',
    cardBg: isDarkMode ? '#111827' : '#ffffff',
    cardBorder: isDarkMode ? '#1f2937' : '#e5e7eb',
    textMain: isDarkMode ? '#ffffff' : '#111827',
    textSub: isDarkMode ? '#9ca3af' : '#4b5563',
    tableBg: isDarkMode ? '#1f2937' : '#f9fafb',
    tableHeaderBg: isDarkMode ? '#374151' : '#e5e7eb',
    tableBorder: isDarkMode ? '#2d3748' : '#e5e7eb',
    chartWrapperBg: isDarkMode ? '#161e2e' : '#f8fafc',
    chartBoxBg: isDarkMode ? '#111827' : '#ffffff',
    barTrackBg: isDarkMode ? '#1f2937' : '#e2e8f0',
  };

  const handleShareCard = async (company) => {
    try {
      await Share.share({
        message: `📊 Q2 FY27 Results Summary: ${company}\nCheck out the full financial breakdown and performance trends on Earnings Hub!`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const renderTrendBars = (history) => {
    const numericVals = history.map(v => typeof v === 'string' ? parseFloat(v) : v);
    const maxVal = Math.max(...numericVals);

    return (
      <View style={styles.barGroupContainer}>
        {history.map((val, idx) => {
          const num = typeof val === 'string' ? parseFloat(val) : val;
          const heightPercent = `${Math.max((num / maxVal) * 100, 15)}%`;
          const isGrowing = idx === 0 || num >= (typeof history[idx - 1] === 'string' ? parseFloat(history[idx - 1]) : history[idx - 1]);
          const barColor = isGrowing ? '#10b981' : '#f43f5e';

          return (
            <View key={idx} style={styles.barColumn}>
              <Text style={[styles.barValueText, { color: theme.textSub }]}>{num > 1000 ? `${(num/1000).toFixed(1)}k` : num}</Text>
              <View style={[styles.barTrack, { backgroundColor: theme.barTrackBg }]}>
                <View style={[styles.barFill, { height: heightPercent, backgroundColor: barColor }]} />
              </View>
              <Text style={[styles.barLabelText, { color: theme.textSub }]}>{['Mar', 'Jun', 'Sep'][idx]}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.cardBorder }]}>
        <Text style={[styles.headerTitle, { color: theme.headerText }]}>EARNINGS HUB</Text>
        
        <View style={styles.headerRightActions}>
          {/* Dark / Light Mode Toggle */}
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: isDarkMode ? '#334155' : '#e2e8f0' }]}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Ionicons name={isDarkMode ? "sunny" : "moon"} size={18} color={isDarkMode ? "#facc15" : "#334155"} />
          </TouchableOpacity>

          {/* Notification Bell */}
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDarkMode ? '#334155' : '#e2e8f0' }]}>
            <Ionicons name="notifications-outline" size={18} color={theme.headerText} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardWrapper}>
          {announcements.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
              
              {/* Card Top Header */}
              <View style={styles.cardHeader}>
                <View style={{flex: 1}}>
                  <Text style={[styles.companyName, { color: theme.textMain }]}>{item.company}</Text>
                  <Text style={[styles.companyMeta, { color: theme.textSub }]}>{item.ticker} • {item.industry}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.rating}</Text>
                </View>
              </View>

              <View style={styles.subHeaderRow}>
                <Text style={styles.quarterTag}>{item.quarter}</Text>
                <Text style={[styles.filingDate, { color: theme.textSub }]}>Filing: {item.filingDate}</Text>
              </View>

              {/* Financial Table */}
              <View style={[styles.table, { backgroundColor: theme.tableBg }]}>
                <View style={[styles.tableRowHeader, { backgroundColor: theme.tableHeaderBg }]}>
                  <Text style={[styles.th, {flex: 2, color: theme.textSub}]}>METRIC</Text>
                  <Text style={[styles.th, {flex: 1, color: theme.textSub}]}>QoQ</Text>
                  <Text style={[styles.th, {flex: 1, color: theme.textSub}]}>YoY</Text>
                  <Text style={[styles.th, {flex: 1.2, textAlign: 'right', color: theme.textSub}]}>Sep '26</Text>
                  <Text style={[styles.th, {flex: 1.2, textAlign: 'right', color: theme.textSub}]}>Jun '26</Text>
                  <Text style={[styles.th, {flex: 1.2, textAlign: 'right', color: theme.textSub}]}>Mar '26</Text>
                </View>

                {Object.entries(item.metrics).map(([key, data], idx) => (
                  <View key={idx} style={[styles.tableRow, { borderTopColor: theme.tableBorder }]}>
                    <Text style={[styles.tdBold, {flex: 2, color: theme.textMain}]}>{key.toUpperCase()}</Text>
                    <Text style={[styles.td, {flex: 1, color: data.qoq.startsWith('+') ? '#10b981' : '#f43f5e'}]}>{data.qoq}</Text>
                    <Text style={[styles.td, {flex: 1, color: data.yoy.startsWith('+') ? '#10b981' : '#f43f5e'}]}>{data.yoy}</Text>
                    <Text style={[styles.tdVal, {flex: 1.2, color: theme.textMain}]}>{data.history[2]} {data.unit}</Text>
                    <Text style={[styles.tdVal, {flex: 1.2, color: theme.textMain}]}>{data.history[1]} {data.unit}</Text>
                    <Text style={[styles.tdVal, {flex: 1.2, color: theme.textMain}]}>{data.history[0]} {data.unit}</Text>
                  </View>
                ))}
              </View>

              {/* Bar Charts Section */}
              <View style={[styles.chartsWrapper, { backgroundColor: theme.chartWrapperBg }]}>
                <Text style={[styles.chartSectionTitle, { color: theme.textSub }]}>QUARTERLY PERFORMANCE TRENDS</Text>
                <View style={styles.chartsGrid}>
                  <View style={[styles.chartBox, { backgroundColor: theme.chartBoxBg, borderColor: theme.cardBorder }]}>
                    <Text style={[styles.chartTitle, { color: theme.textMain }]}>Sales - INR</Text>
                    {renderTrendBars(item.metrics.sales.history)}
                  </View>
                  <View style={[styles.chartBox, { backgroundColor: theme.chartBoxBg, borderColor: theme.cardBorder }]}>
                    <Text style={[styles.chartTitle, { color: theme.textMain }]}>PAT - INR</Text>
                    {renderTrendBars(item.metrics.pat.history)}
                  </View>
                  <View style={[styles.chartBox, { backgroundColor: theme.chartBoxBg, borderColor: theme.cardBorder }]}>
                    <Text style={[styles.chartTitle, { color: theme.textMain }]}>EPS - per share</Text>
                    {renderTrendBars(item.metrics.eps.history)}
                  </View>
                </View>
              </View>

              {/* Share as Image Button */}
              <TouchableOpacity 
                style={styles.shareButton} 
                onPress={() => handleShareCard(item.company)}
              >
                <Ionicons name="share-social-outline" size={16} color="#ffffff" style={{marginRight: 6}} />
                <Text style={styles.shareButtonText}>Share Result Summary</Text>
              </TouchableOpacity>

            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  headerRightActions: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { padding: 7, borderRadius: 8, marginLeft: 8 },
  container: { padding: 12, alignItems: 'center' },
  cardWrapper: { width: '100%', maxWidth: 700 },
  card: { borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  companyName: { fontSize: 15, fontWeight: 'bold' },
  companyMeta: { fontSize: 10, marginTop: 2 },
  badge: { backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, borderColor: '#10b981' },
  badgeText: { color: '#10b981', fontSize: 10, fontWeight: 'bold' },
  subHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 8 },
  quarterTag: { color: '#a855f7', fontWeight: 'bold', fontSize: 12 },
  filingDate: { fontSize: 11 },
  table: { borderRadius: 8, overflow: 'hidden', marginVertical: 6 },
  tableRowHeader: { flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 5 },
  th: { fontSize: 9, fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 7, borderTopWidth: 1, alignItems: 'center' },
  tdBold: { fontSize: 11, fontWeight: '600' },
  td: { fontSize: 11, fontWeight: '600' },
  tdVal: { fontSize: 10, textAlign: 'right', fontWeight: '500' },
  chartsWrapper: { marginTop: 10, padding: 8, borderRadius: 8 },
  chartSectionTitle: { fontSize: 10, marginBottom: 6, fontWeight: 'bold', letterSpacing: 0.5 },
  chartsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  chartBox: { flex: 1, marginHorizontal: 2, padding: 5, borderRadius: 6, borderWidth: 1 },
  chartTitle: { fontSize: 9, textAlign: 'center', marginBottom: 4, fontWeight: '600' },
  barGroupContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 65 },
  barColumn: { alignItems: 'center', flex: 1 },
  barValueText: { fontSize: 7, marginBottom: 2 },
  barTrack: { width: 6, height: 40, justifyContent: 'flex-end', borderRadius: 3, overflow: 'hidden' },
  barFill: { width: '100%', borderRadius: 3 },
  barLabelText: { fontSize: 7, marginTop: 2 },
  shareButton: { backgroundColor: '#7c3aed', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 8, marginTop: 12 },
  shareButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 }
});