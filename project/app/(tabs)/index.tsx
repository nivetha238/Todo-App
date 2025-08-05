import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Plus, CircleCheck as CheckCircle, Clock, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      category: 'Work',
      completed: false,
      priority: 'high',
      dueDate: '2025-01-10'
    },
    {
      id: '2',
      title: 'Buy groceries',
      category: 'Personal',
      completed: true,
      priority: 'medium',
      dueDate: '2025-01-09'
    },
    {
      id: '3',
      title: 'Schedule dentist appointment',
      category: 'Health',
      completed: false,
      priority: 'low',
      dueDate: '2025-01-15'
    }
  ]);

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const todayTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate === today;
  }).length;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#1D4ED8']}
        style={styles.header}
      >
        <Text style={styles.greeting}>Good Morning!</Text>
        <Text style={styles.subtitle}>Let's get things done</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <CheckCircle color="#10B981" size={24} />
            <Text style={styles.statNumber}>{completedTasks}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Clock color="#F59E0B" size={24} />
            <Text style={styles.statNumber}>{pendingTasks}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <AlertCircle color="#EF4444" size={24} />
            <Text style={styles.statNumber}>{todayTasks}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Tasks</Text>
            <TouchableOpacity onPress={() => router.push('/tasks')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {tasks.slice(0, 3).map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskContent}>
                <View style={styles.taskHeader}>
                  <Text style={[
                    styles.taskTitle,
                    task.completed && styles.taskCompleted
                  ]}>
                    {task.title}
                  </Text>
                  <TouchableOpacity>
                    <CheckCircle 
                      color={task.completed ? '#10B981' : '#D1D5DB'} 
                      size={20} 
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.taskMeta}>
                  <Text style={styles.taskCategory}>{task.category}</Text>
                  <View style={[
                    styles.priorityBadge,
                    { backgroundColor: 
                      task.priority === 'high' ? '#FEE2E2' :
                      task.priority === 'medium' ? '#FEF3C7' : '#DBEAFE'
                    }
                  ]}>
                    <Text style={[
                      styles.priorityText,
                      { color: 
                        task.priority === 'high' ? '#DC2626' :
                        task.priority === 'medium' ? '#D97706' : '#2563EB'
                      }
                    ]}>
                      {task.priority}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/tasks')}
        >
          <Plus color="white" size={20} />
          <Text style={styles.addButtonText}>Add New Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -20,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAll: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskContent: {
    gap: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  taskMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskCategory: {
    fontSize: 14,
    color: '#6B7280',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});