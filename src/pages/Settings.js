import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const settingsOptions = [
  { id: '2', title: 'Notificações', icon: 'notifications-none', screen: 'Notifications' },
  { id: '3', title: 'Preferências', icon: 'tune', screen: 'Preferences' },
  { id: '4', title: 'Conta', icon: 'account-circle', screen: 'Account' },
  { id: '5', title: 'Sobre o App', icon: 'info-outline', screen: 'About' },
];

const userProfile = {
  name: 'Samuel',
  stats: {
    read: 42,
    genre: 'Ficção Científica',
    friends: 12,
  }
};

const ProfileCard = ({ user }) => (
  <View style={styles.profileCard}>
    <TouchableOpacity style={styles.editButton} onPress={() => alert('Editar Perfil')}>
      <MaterialIcons name="edit" size={24} color="white" />
    </TouchableOpacity>
    <MaterialIcons name="account-circle" size={80} color="white" />
    <Text style={styles.profileName}>{user.name}</Text>
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{user.stats.read}</Text>
        <Text style={styles.statLabel}>Livros lidos</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{user.stats.genre}</Text>
        <Text style={styles.statLabel}>Gênero favorito</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{user.stats.friends}</Text>
        <Text style={styles.statLabel}>Amigos</Text>
      </View>
    </View>
  </View>
);

const SettingItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <MaterialIcons name={icon} size={28} color="white" style={styles.icon} />
    <Text style={styles.itemText}>{title}</Text>
    <MaterialIcons name="chevron-right" size={28} color="white" />
  </TouchableOpacity>
);

export default function Settings({ navigation }) {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <ProfileCard user={userProfile} />
          {settingsOptions.map(option => (
            <SettingItem 
              key={option.id} 
              title={option.title} 
              icon={option.icon} 
              onPress={() => navigation.navigate(option.screen)} 
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  editButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  profileName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 20,
  },
  itemText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});