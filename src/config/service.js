import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const tasksCollectionRef = collection(db, "kontak");

class TaskService {
  getAllTasks = () => {
    return getDocs(tasksCollectionRef);
  };

  getTask = (id) => {
    const taskDoc = doc(db, "kontak", id);
    return getDoc(taskDoc);
  };

  addContact = (contact) => {
    return addDoc(tasksCollectionRef, contact);
  };

  deleteContact = (id) => {
    const taskDoc = doc(db, "kontak", id);
    return deleteDoc(taskDoc);
  };

  updateContact = (id, updatedTask) => {
    const taskDoc = doc(db, "kontak", id);
    return updateDoc(taskDoc, updatedTask);
  };
}

export default new TaskService();
