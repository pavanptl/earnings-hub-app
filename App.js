import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Share,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const [earningsData, setEarningsData] = useState([
    {
      id: '1',
      company: 'Reliance Industries',
      symbol: 'RELIANCE',
      date: 'Today, Nov 2',
      status: 'Announced',
      revenue: '₹2,58,020 Cr',
      revenueGrowth: '+12.4%',
      netProfit: '₹19,299 Cr',
      profitGrowth: '+9.8%',
      eps: '₹28.4',
      margin: '14.2%',
      trend: [60, 65, 70, 78, 85],
    },
    {
      id: '2',
      company: 'Tata Consultancy Services',
      symbol: 'TCS',
      date: 'Today, Nov 2',
      status: 'Announced',
      revenue: '₹64,259 Cr',
      revenueGrowth: '+7.6%',
      netProfit: '₹11,909 Cr',
      profitGrowth: '+5.2%',
      eps: '₹32.8',
      margin: '24.1%',
      trend: [50, 55, 62, 68, 75],
    },
    {
      id: '3',
      company: 'Infosys Ltd',
      symbol: 'INFY',
      date: 'Upcoming, Nov 5',
      status: 'Upcoming',
      revenue: '₹39,800 Cr (Est.)',
      revenueGrowth: '+6.1%',
      netProfit: '₹6,850 Cr (Est.)',
      profitGrowth: '+4.5%',
      eps: '₹16.5',
      margin: '21.0%',
      trend: [45, 50, 52, 58, 60],
    },
    {
      id: '4',
      company: 'HDFC Bank',
      symbol: 'HDFCBANK',
      date: 'Upcoming, Nov 8',
      status: 'Upcoming',
      revenue: '₹82,400 Cr (Est.)',
      revenueGrowth: '+15.2%',
      netProfit: '₹16,500 Cr (Est.)',
      profitGrowth: '+18.1%',
      eps: '₹22.1',
      margin: '35.4%',
      trend: [70, 75, 82, 90, 98],
    },
    {
      id: '5',
      company: 'Wipro Ltd',
      symbol: 'WIPRO',
      date: 'Announced',
      status: 'Announced',
      revenue: '₹22,300 Cr',
      revenueGrowth: '+2.1%',
      netProfit: '₹3,220 Cr',
      profitGrowth: '-1.4%',
      eps: '₹6.2',
      margin: '15.8%',
      trend: [40, 42, 41, 39, 40],
    },
  ]);

  const filteredData = earningsData.filter((item) => {
    const matchesSearch =
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Today') return matchesSearch && item.date.includes('Today');
    if (activeFilter === 'Upcoming') return matchesSearch && item.status === 'Upcoming';
    if (activeFilter === 'Announced') return matchesSearch && item.status === 'Announced';
    return matchesSearch;
  });

  const handleShare = async (company) => {
    try {
      await Share.share({
        message: `📊 Q3 Earnings Report for ${company.company} (${company.symbol})\n• Revenue: ${company.revenue} (${company.revenueGrowth})\n• Net Profit: ${company.netProfit} (${company.profitGrowth})\n• EPS: ${company.eps}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: currentTheme.border }]}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Ionicons name="stats-chart" size={26} color="#3b82f6" />
            <Text style={[styles.headerTitle, { color: currentTheme.text }]}>Earnings Hub</Text>
          </View>
          <TouchableOpacity
            style={[styles.themeToggle, { backgroundColor: currentTheme.card }]}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Ionicons
              name={isDarkMode ? 'sunny' : 'moon'}
              size={20}
              color={isDarkMode ? '#fbbf24' : '#64748b'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
        <Ionicons name="search" size={18} color="#94a3b8" style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: currentTheme.text }]}
          placeholder="Search company or symbol (e.g. TCS, INFY)..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#94a3b8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {['All', 'Today', 'Upcoming', 'Announced'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              {
                backgroundColor: activeFilter === filter ? '#3b82f6' : currentTheme.card,
                borderColor: activeFilter === filter ? '#3b82f6' : currentTheme.border,
              },
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                { color: activeFilter === filter ? '#ffffff' : currentTheme.textSecondary },
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results List */}
      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {filteredData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={48} color="#64748b" />
            <Text style={[styles.emptyText, { color: currentTheme.textSecondary }]}>
              No companies found matching your search.
            </Text>
          </View>
        ) : (
          filteredData.map((item) => (
            <View
              key={item.id}
              style={[
                styles.card,
                { backgroundColor: currentTheme.card, borderColor: currentTheme.border },
              ]}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={[styles.companyName, { color: currentTheme.text }]}>
                    {item.company}
                  </Text>
                  <Text style={styles.symbolText}>{item.symbol}</Text>
                </View>
                <View style={styles.headerRight}>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          item.status === 'Announced'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : 'rgba(59, 130, 246, 0.15)',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: item.status === 'Announced' ? '#10b981' : '#3b82f6',
                        },
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                  <Text style={[styles.dateText, { color: currentTheme.textSecondary }]}>
                    {item.date}
                  </Text>
                </View>
              </View>

              {/* Financial Metrics Grid */}
              <View style={[styles.metricsGrid, { borderTopColor: currentTheme.border }]}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Revenue</Text>
                  <Text style={[styles.metricValue, { color: currentTheme.text }]}>
                    {item.revenue}
                  </Text>
                  <Text style={[styles.growthText, { color: '#10b981' }]}>
                    {item.revenueGrowth}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Net Profit</Text>
                  <Text style={[styles.metricValue, { color: currentTheme.text }]}>
                    {item.netProfit}
                  </Text>
                  <Text
                    style={[
                      styles.growthText,
                      { color: item.profitGrowth.startsWith('-') ? '#ef4444' : '#10b981' },
                    ]}
                  >
                    {item.profitGrowth}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>EPS / Margin</Text>
                  <Text style={[styles.metricValue, { color: currentTheme.text }]}>
                    ₹{item.eps}
                  </Text>
                  <Text style={[styles.growthText, { color: '#3b82f6' }]}>
                    {item.margin} Margin
                  </Text>
                </View>
              </View>

              {/* Trend Bars & Share Action */}
              <View style={[styles.cardFooter, { borderTopColor: currentTheme.border }]}>
                <View style={styles.trendContainer}>
                  <Text style={styles.trendLabel}>5Q Trend:</Text>
                  <View style={styles.trendBars}>
                    {item.trend.map((val, idx) => (
                      <View
                        key={idx}
                        style={[
                          styles.bar,
                          {
                            height: val * 0.22,
                            backgroundColor: idx === item.trend.length - 1 ? '#3b82f6' : '#64748b',
                          },
                        ]}
                      />
                    ))}
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={() => handleShare(item)}
                >
                  <Ionicons name="share-social-outline" size={16} color="#3b82f6" />
                  <Text style={styles.shareText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const darkTheme = {
  bg: '#090d16',
  card: '#111827',
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  border: '#1f2937',
};

const lightTheme = {
  bg: '#f8fafc',
  card: '#ffffff',
  text: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  themeToggle: {
    padding: 8,
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterScroll: {
    paddingHorizontal: 16,
    maxHeight: 48,
    marginBottom: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    height: 32,
    justifyContent: 'center',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
    paddingTop: 4,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '700',
  },
  symbolText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 11,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  growthText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trendLabel: {
    fontSize: 11,
    color: '#64748b',
  },
  trendBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 20,
  },
  bar: {
    width: 5,
    borderRadius: 2,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  shareText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
});
