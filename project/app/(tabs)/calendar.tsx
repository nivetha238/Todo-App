import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react-native';

interface Task {
  id: string;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    category: 'Work',
    priority: 'high',
    dueDate: '2025-01-10'
  },
  {
    id: '2',
    title: 'Team meeting preparation',
    category: 'Work',
    priority: 'medium',
    dueDate: '2025-01-11'
  },
  {
    id: '3',
    title: 'Schedule dentist appointment',
    category: 'Health',
    priority: 'low',
    dueDate: '2025-01-15'
  }
];

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getTasksForDate = (day: number) => {
    if (!day) return [];
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(task => task.dueDate === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const isToday = (day: number) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const days = getDaysInMonth(currentDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CalendarIcon color="#3B82F6" size={28} />
        <Text style={styles.title}>Calendar</Text>
      </View>

      <View style={styles.calendarHeader}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigateMonth('prev')}
        >
          <ChevronLeft color="#6B7280" size={20} />
        </TouchableOpacity>
        
        <Text style={styles.monthYear}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigateMonth('next')}
        >
          <ChevronRight color="#6B7280" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.calendar}>
        <View style={styles.weekDaysContainer}>
          {weekDays.map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.daysContainer}>
          {days.map((day, index) => {
            const dayTasks = getTasksForDate(day);
            const hasHighPriority = dayTasks.some(task => task.priority === 'high');
            
            return (
              <View key={index} style={styles.dayCell}>
                {day && (
                  <>
                    <View style={[
                      styles.dayNumber,
                      isToday(day) && styles.todayNumber
                    ]}>
                      <Text style={[
                        styles.dayText,
                        isToday(day) && styles.todayText
                      ]}>
                        {day}
                      </Text>
                    </View>
                    {dayTasks.length > 0 && (
                      <View style={styles.taskIndicators}>
                        {dayTasks.slice(0, 2).map((task, taskIndex) => (
                          <View
                            key={task.id}
                            style={[
                              styles.taskDot,
                              {
                                backgroundColor:
                                  task.priority === 'high' ? '#EF4444' :
                                  task.priority === 'medium' ? '#F59E0B' : '#3B82F6'
                              }
                            ]}
                          />
                        ))}
                        {dayTasks.length > 2 && (
                          <Text style={styles.moreIndicator}>+{dayTasks.length - 2}</Text>
                        )}
                      </View>
                    )}
                  </>
                )}
              </View>
            );
          })}
        </View>
      </View>

      <ScrollView style={styles.tasksList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
        
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <View style={styles.taskContent}>
              <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <View style={[
                  styles.priorityBadge,
                  {
                    backgroundColor:
                      task.priority === 'high' ? '#FEE2E2' :
                      task.priority === 'medium' ? '#FEF3C7' : '#DBEAFE'
                  }
                ]}>
                  <Text style={[
                    styles.priorityText,
                    {
                      color:
                        task.priority === 'high' ? '#DC2626' :
                        task.priority === 'medium' ? '#D97706' : '#2563EB'
                    }
                  ]}>
                    {task.priority}
                  </Text>
                </View>
              </View>
              <View style={styles.taskMeta}>
                <Text style={styles.taskCategory}>{task.category}</Text>
                <Text style={styles.taskDate}>{task.dueDate}</Text>
              </View>
            </View>
          </View>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navButton: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  monthYear: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  calendar: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  weekDay: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
    width: 40,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 4,
  },
  dayNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayNumber: {
    backgroundColor: '#3B82F6',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  todayText: {
    color: 'white',
  },
  taskIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 2,
  },
  taskDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  moreIndicator: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
  tasksList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
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
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  taskMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskCategory: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  taskDate: {
    fontSize: 14,
    color: '#6B7280',
  },
});