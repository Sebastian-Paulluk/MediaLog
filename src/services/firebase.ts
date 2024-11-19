// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	setDoc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	updateDoc, 
	where
} from 'firebase/firestore';

import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

import { CategoryTypes } from '../types/types';
import { ItemTypes } from '../types/types';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDgHvXvvYD6cY_xuJqmHQ3q1JaLHvt9zBw',
	authDomain: 'series-log-51e88.firebaseapp.com',
	projectId: 'series-log-51e88',
	storageBucket: 'series-log-51e88.appspot.com',
	messagingSenderId: '876543105975',
	appId: '1:876543105975:web:212c3cfa18f1140e536632',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


// Authentication Functions
export const registerUser = async (name: string, email: string, password: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const uid = userCredential.user.uid;

		await setDoc(doc(db, "users", uid), {
			name: name,
			email: email
		});

	} catch (error) {
		if (error instanceof Error) {
			console.error('Error during registration:', error.message);
		} else {
			console.error('Error during registration:', error);
		}
		throw error;
	}
};

export const loginUser = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential.user;
	} catch (error: any) {
		if (error instanceof Error) {
			console.error('Error while singning in:', error.message);
		} else {
			console.error('Error while singning in:', error);
		}
		throw error;
	}
};


export const getUserData = async (uid?: string) => {
	const user = auth.currentUser;
	const userUid = uid || (user ? user.uid : null); 
  
	if (userUid) {
	  const docSnap = await getDoc(doc(db, "users", userUid));
  
	  if (docSnap.exists()) {
		const userData = docSnap.data();
		return { ...userData, uid: userUid };
	  } else {
		return null;
	  }
	}

	return null;
  };


export const logoutUser = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error while singning out:', error.message);
		} else {
			console.error('Error while singning out:', error);
		}
		throw error;
	}
};


export const getUserUid = () => {
	const user = auth.currentUser;
	return user ? user.uid : null; 
};



// categories functions

export const getCategories = async () => {
	const user = auth.currentUser;  // Obtén el usuario autenticado
	if (!user) {
	  console.error('No user is logged in');
	  return [];  // Si no hay usuario, retornar un arreglo vacío
	}
  
	const categoriesColletionRef = collection(db, 'categories');
	const q = query(categoriesColletionRef, where('userId', '==', user.uid));  // Filtra por userId
  
	const snapshot = await getDocs(q);
	const docsData = snapshot.docs.map((doc) => {
	  return { id: doc.id, ...doc.data() } as CategoryTypes;
	});
	
	return docsData;
  };

export const getCategoryById = async (categoryId: string) => {
	const categoriesColletionRef = collection(db, 'categories');
	const categoryRef = doc(categoriesColletionRef, categoryId);
	const snapshot = await getDoc(categoryRef);

	return { id: snapshot.id, ...snapshot.data() } as CategoryTypes;
};


export const createCategory = async (category: CategoryTypes) => {
	const user = auth.currentUser;
	if (!user) {
	  throw new Error('User is not authenticated');
	}
  
	const categoriesColletionRef = collection(db, "categories");
	const categoryWithUserId = { ...category, userId: user.uid };  // Agrega el userId
	const categoriesDoc = await addDoc(categoriesColletionRef, categoryWithUserId);
	return categoriesDoc.id;
  };

export const deleteCategory = async(categoryId: string)=> {
	try {
		const categoriesColletionRef = collection(db, 'categories')
		const categoryRef = doc(categoriesColletionRef, categoryId)
		await deleteDoc(categoryRef)
		await deleteItemsByCategory(categoryId);
	} catch(error) {
		console.error('Error al eliminar la categoría:', error)
		throw new Error('No se pudo eliminar la categoría')
	}
}

export const updateCategory = async (categoryId: string, category: Partial<CategoryTypes>) => {
	try {
        const categoriesCollectionRef = collection(db, 'categories');
        const categoryRef = doc(categoriesCollectionRef, categoryId);
        
        await updateDoc(categoryRef, category);
    } catch (error) {
        console.error('Error al modificar la categoría:', error);
        throw new Error('No se pudo modificar la categoría');
    }
};

 



// items --------

export const createItem = async( newItem: ItemTypes ) =>{
    const itemsColletionRef = collection(db, 'items');
    const itemDoc = await addDoc(itemsColletionRef, newItem);
	return itemDoc.id;
}

export const getItemById = async (itemId: string) => {
	const itemsColletionRef = collection(db, 'items');
	const itemRef = doc(itemsColletionRef, itemId);
	const snapshot = await getDoc(itemRef);

	return { id: snapshot.id, ...snapshot.data() } as ItemTypes;
}

export const getItemsByCategory = async (categoryId: string) => {
	const ItemsColletionRef = collection(db, 'items');
	const q = query(ItemsColletionRef, where('categoryId', '==', categoryId));
	const querySnapshot = await getDocs(q);
	const items = querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as ItemTypes[];

	return items;
};

export const getFavoriteItems = async () => {
	const ItemsColletionRef = collection(db, 'items');
	const q = query(ItemsColletionRef, where('favorite', '==', true));
	const querySnapshot = await getDocs(q);
	const items = querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as ItemTypes[];

	return items;
};

export const getItemsQuantityByCategory = async (categoryId: string) => {
	const ItemsColletionRef = collection(db, 'items');
	const q = query(ItemsColletionRef, where('categoryId', '==', categoryId));
	const querySnapshot = await getDocs(q);
	const itemsQuantity = querySnapshot.docs.length;

	return itemsQuantity;
};

export const deleteItem = async (itemId: string) => {
	try {
		const itemsColletionRef = collection(db, 'items');
		const itemRef = doc(itemsColletionRef, itemId);
		await deleteDoc(itemRef);
	} catch(error) {
		console.error('Error:', error)
	}
}


export const updateItem = async (itemId: string, updatedItemData: Partial<ItemTypes>) => {
	try {
		const itemDocRef = doc(db, 'items', itemId);
		await updateDoc(itemDocRef, updatedItemData);
	} catch (error) {
		console.log('Error updating item: ', error)
	}
}


export const getItemsByNameOrNotes = async(query: string) =>{
    const itemsCollectionRef = collection(db, "items");
    const snapshot = await getDocs(itemsCollectionRef);

    const escapedText = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('.*' + escapedText + '.*', 'i');

    const filteredItems = snapshot.docs
        .map(doc => {
            const data = doc.data() as ItemTypes; 
            return { id: doc.id, ...data };
        })
        .filter(item => (
            'name' in item && 'notes' in item && 
            (regex.test(item.name) || regex.test(item.notes))
        ));

    return filteredItems;
}

export const deleteItemsByCategory = async (categoryId: string) => {
    try {
        const itemsCollectionRef = collection(db, 'items');
        const q = query(itemsCollectionRef, where('categoryId', '==', categoryId));
        const querySnapshot = await getDocs(q);

        const deletePromises = querySnapshot.docs.map((docSnapshot) =>
            deleteDoc(doc(db, 'items', docSnapshot.id))
        );
        await Promise.all(deletePromises);
    } catch (error) {
        console.error('Error eliminando los items:', error);
    }
}