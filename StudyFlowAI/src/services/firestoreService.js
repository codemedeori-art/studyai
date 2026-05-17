import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore'
import { db } from '../firebase/config'

// Tasks CRUD
export const createTask = async (userId, taskData) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      ...taskData,
      userId,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating task:', error)
    throw error
  }
}

export const getUserTasks = async (userId) => {
  try {
    const q = query(collection(db, 'tasks'), where('userId', '==', userId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting tasks:', error)
    throw error
  }
}

export const updateTask = async (taskId, data) => {
  try {
    await updateDoc(doc(db, 'tasks', taskId), {
      ...data,
      updatedAt: new Date()
    })
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}

export const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, 'tasks', taskId))
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}

// Habits CRUD
export const createHabit = async (userId, habitData) => {
  try {
    const docRef = await addDoc(collection(db, 'habits'), {
      ...habitData,
      userId,
      createdAt: new Date(),
      streak: 0,
      completed: []
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating habit:', error)
    throw error
  }
}

export const getUserHabits = async (userId) => {
  try {
    const q = query(collection(db, 'habits'), where('userId', '==', userId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting habits:', error)
    throw error
  }
}

export const updateHabit = async (habitId, data) => {
  try {
    await updateDoc(doc(db, 'habits', habitId), data)
  } catch (error) {
    console.error('Error updating habit:', error)
    throw error
  }
}

export const deleteHabit = async (habitId) => {
  try {
    await deleteDoc(doc(db, 'habits', habitId))
  } catch (error) {
    console.error('Error deleting habit:', error)
    throw error
  }
}

// Study Plans
export const createStudyPlan = async (userId, planData) => {
  try {
    const docRef = await addDoc(collection(db, 'studyPlans'), {
      ...planData,
      userId,
      createdAt: new Date()
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating study plan:', error)
    throw error
  }
}

export const getUserStudyPlans = async (userId) => {
  try {
    const q = query(collection(db, 'studyPlans'), where('userId', '==', userId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting study plans:', error)
    throw error
  }
}

// Chat History
export const saveChatMessage = async (userId, message, response) => {
  try {
    await addDoc(collection(db, 'chats'), {
      userId,
      message,
      response,
      timestamp: new Date()
    })
  } catch (error) {
    console.error('Error saving chat:', error)
    throw error
  }
}

export const getUserChats = async (userId) => {
  try {
    const q = query(collection(db, 'chats'), where('userId', '==', userId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting chats:', error)
    throw error
  }
}

// Analytics
export const updateAnalytics = async (userId, analyticsData) => {
  try {
    const q = query(collection(db, 'analytics'), where('userId', '==', userId))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      await addDoc(collection(db, 'analytics'), {
        userId,
        ...analyticsData,
        updatedAt: new Date()
      })
    } else {
      const docId = snapshot.docs[0].id
      await updateDoc(doc(db, 'analytics', docId), {
        ...analyticsData,
        updatedAt: new Date()
      })
    }
  } catch (error) {
    console.error('Error updating analytics:', error)
    throw error
  }
}

export const getUserAnalytics = async (userId) => {
  try {
    const q = query(collection(db, 'analytics'), where('userId', '==', userId))
    const snapshot = await getDocs(q)
    return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
  } catch (error) {
    console.error('Error getting analytics:', error)
    throw error
  }
}