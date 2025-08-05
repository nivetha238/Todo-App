import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { Plus, Search, Filter, CircleCheck as CheckCircle, CreditCard as Edit3, Trash2, X } from 'lucide-react-native';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

const categories = ['All', 'Work', 'Personal', 'Health', 'Shopping'];
const priorities = ['high', 'medium', 'low'];

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finish the quarterly project proposal for client review',
      category: 'Work',
      completed: false,
      priority: 'high',
      dueDate: '2025-01-10'
    },
    {
      id: '2',
      title: 'Buy groceries',
      description: 'Get weekly groceries including fruits and vegetables',
      category: 'Personal',
      completed: true,
      priority: 'medium',
      dueDate: '2025-01-09'
    },
    {
      id: '3',
      title: 'Schedule dentist appointment',
      description: 'Book routine dental checkup for next month',
      category: 'Health',
      completed: false,
      priority: 'low',
      dueDate: '2025-01-15'
    },
    {
      id: '4',
      title: 'Team meeting preparation',
      description: 'Prepare slides and agenda for weekly team meeting',
      category: 'Work',
      completed: false,
      priority: 'medium',
      dueDate: '2025-01-11'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Work',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setTasks(tasks.filter(task => task.id !== taskId))
        }
      ]
    );
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate
    });
    setModalVisible(true);
  };

  const handleSaveTask = () => {
    if (!newTask.title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...newTask }
          : task
      ));
    } else {
      // Create new task
      const task: Task = {
        id: Date.now().toString(),
        ...newTask,
        completed: false
      };
      setTasks([task, ...tasks]);
    }

    resetModal();
  };

  const resetModal = () => {
    setModalVisible(false);
    setEditingTask(null);
    setNewTask({
      title: '',
      description: '',
      category: 'Work',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0]
    });
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <TouchableOpacity 
          style={styles.checkButton}
          onPress={() => handleToggleComplete(item.id)}
        >
          <CheckCircle 
            color={item.completed ? '#10B981' : '#D1D5DB'} 
            size={24} 
          />
        </TouchableOpacity>
        <View style={styles.taskContent}>
          <Text style={[
            styles.taskTitle,
            item.completed && styles.taskCompleted
          ]}>
            {item.title}
          </Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
          <View style={styles.taskMeta}>
            <Text style={styles.taskCategory}>{item.category}</Text>
            <View style={[
              styles.priorityBadge,
              { backgroundColor: 
                item.priority === 'high' ? '#FEE2E2' :
                item.priority === 'medium' ? '#FEF3C7' : '#DBEAFE'
              }
            ]}>
              <Text style={[
                styles.priorityText,
                { color: 
                  item.priority === 'high' ? '#DC2626' :
                  item.priority === 'medium' ? '#D97706' : '#2563EB'
                }
              ]}>
                {item.priority}
              </Text>
            </View>
            <Text style={styles.dueDate}>{item.dueDate}</Text>
          </View>
        </View>
        <View style={styles.taskActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleEditTask(item)}
          >
            <Edit3 color="#6B7280" size={16} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDeleteTask(item.id)}
          >
            <Trash2 color="#EF4444" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Plus color="white" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Search color="#9CA3AF" size={20} />
          <TextInput
            style={styles.searchText}
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === item && styles.categoryTextActive
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        style={styles.taskList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </Text>
              <TouchableOpacity onPress={resetModal}>
                <X color="#6B7280" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.input}
                  value={newTask.title}
                  onChangeText={(text) => setNewTask({ ...newTask, title: text })}
                  placeholder="Enter task title"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={newTask.description}
                  onChangeText={(text) => setNewTask({ ...newTask, description: text })}
                  placeholder="Enter task description"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.pickerContainer}>
                  {categories.slice(1).map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.pickerButton,
                        newTask.category === category && styles.pickerButtonActive
                      ]}
                      onPress={() => setNewTask({ ...newTask, category })}
                    >
                      <Text style={[
                        styles.pickerText,
                        newTask.category === category && styles.pickerTextActive
                      ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Priority</Text>
                <View style={styles.pickerContainer}>
                  {priorities.map((priority) => (
                    <TouchableOpacity
                      key={priority}
                      style={[
                        styles.pickerButton,
                        newTask.priority === priority && styles.pickerButtonActive
                      ]}
                      onPress={() => setNewTask({ ...newTask, priority: priority as any })}
                    >
                      <Text style={[
                        styles.pickerText,
                        newTask.priority === priority && styles.pickerTextActive
                      ]}>
                        {priority}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Due Date</Text>
                <TextInput
                  style={styles.input}
                  value={newTask.dueDate}
                  onChangeText={(text) => setNewTask({ ...newTask, dueDate: text })}
                  placeholder="YYYY-MM-DD"
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
                <Text style={styles.saveButtonText}>
                  {editingTask ? 'Update Task' : 'Add Task'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: 'white',
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 20,
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
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkButton: {
    marginTop: 2,
  },
  taskContent: {
    flex: 1,
    gap: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  taskDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taskCategory: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  dueDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  taskActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  form: {
    gap: 20,
    paddingTop: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  pickerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pickerButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  pickerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  pickerTextActive: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});