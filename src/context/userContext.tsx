import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

interface UserContextType {
    user: Record<string, any> | null;
    userLanguage: string;
    userSessionVerified: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<Record<string, any> | null>(null);
    const userLanguage = user?.UILanguage;
    const [userSessionVerified, setUserSessionVerified] = useState<boolean>(false);

    // useEffect para la configuración de la persistencia de sesión
    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                console.log('Persistencia de sesión configurada con éxito.');
            })
            .catch((error) => {
                console.error('Error al configurar la persistencia de sesión:', error);
            });
    }, []);

    // useEffect para el cambio de estado de autenticación
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUserSessionVerified(true);
                subscribeToUserData(firebaseUser.uid); // Llamada para suscribirse a los datos del usuario
            } else {
                setUser(null);
                setUserSessionVerified(true);
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, []);

    // Función para suscribirse a los datos del usuario
    const subscribeToUserData = (uid: string) => {
        const userDocRef = doc(db, "users", uid);

        // Suscribirse a los cambios en el documento del usuario
        const unsubscribeUserDoc = onSnapshot(userDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setUser({ ...docSnapshot.data(), uid });
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribeUserDoc(); 
        };
    };

    useEffect(() => {
        if (user) {
            console.log('Datos del usuario actualizados:', user);
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, userLanguage, userSessionVerified }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext debe usarse dentro de un UserProvider');
    }
    return context;
};
