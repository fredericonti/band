import { collection, addDoc, doc, setDoc, getDoc, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Collections
const COLLECTIONS = {
    VENUES: 'venues',
    ARTISTS: 'artists',
    BOOKINGS: 'bookings'
};

// ========== VENUE OPERATIONS ==========

export const createVenue = async (venueData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.VENUES), {
            ...venueData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        console.log('Venue created with ID:', docRef.id);
        return { id: docRef.id, ...venueData };
    } catch (error) {
        console.error('Error creating venue (Firestore):', error);
        console.log('Falling back to LocalStorage...');

        const localVenues = JSON.parse(localStorage.getItem('venues') || '[]');
        const newVenue = {
            id: 'local_' + Date.now(),
            ...venueData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        localVenues.push(newVenue);
        localStorage.setItem('venues', JSON.stringify(localVenues));

        return newVenue;
    }
};

export const getVenue = async (venueId) => {
    try {
        const docRef = doc(db, COLLECTIONS.VENUES, venueId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error('Venue not found');
        }
    } catch (error) {
        console.error('Error getting venue:', error);
        throw error;
    }
};

export const getAllVenues = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTIONS.VENUES));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting venues:', error);
        throw error;
    }
};

export const updateVenue = async (venueId, venueData) => {
    try {
        const docRef = doc(db, COLLECTIONS.VENUES, venueId);
        await updateDoc(docRef, {
            ...venueData,
            updatedAt: new Date().toISOString()
        });
        console.log('Venue updated:', venueId);
        return { id: venueId, ...venueData };
    } catch (error) {
        console.error('Error updating venue:', error);
        throw error;
    }
};

// ========== ARTIST OPERATIONS ==========

export const createArtist = async (artistData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.ARTISTS), {
            ...artistData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        console.log('Artist created with ID:', docRef.id);
        return { id: docRef.id, ...artistData };
    } catch (error) {
        console.error('Error creating artist (Firestore):', error);
        console.log('Falling back to LocalStorage...');

        const localArtists = JSON.parse(localStorage.getItem('artists') || '[]');
        const newArtist = {
            id: 'local_' + Date.now(),
            ...artistData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        localArtists.push(newArtist);
        localStorage.setItem('artists', JSON.stringify(localArtists));

        return newArtist;
    }
};

export const getArtist = async (artistId) => {
    try {
        const docRef = doc(db, COLLECTIONS.ARTISTS, artistId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error('Artist not found');
        }
    } catch (error) {
        console.error('Error getting artist:', error);
        throw error;
    }
};

export const getAllArtists = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTIONS.ARTISTS));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting artists:', error);
        throw error;
    }
};

export const searchArtistsByGenre = async (genres) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.ARTISTS),
            where('genres', 'array-contains-any', genres)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error searching artists:', error);
        throw error;
    }
};

export const updateArtist = async (artistId, artistData) => {
    try {
        const docRef = doc(db, COLLECTIONS.ARTISTS, artistId);
        await updateDoc(docRef, {
            ...artistData,
            updatedAt: new Date().toISOString()
        });
        console.log('Artist updated:', artistId);
        return { id: artistId, ...artistData };
    } catch (error) {
        console.error('Error updating artist:', error);
        throw error;
    }
};

// ========== BOOKING OPERATIONS ==========

export const createBooking = async (bookingData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.BOOKINGS), {
            ...bookingData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        console.log('Booking created with ID:', docRef.id);
        return { id: docRef.id, ...bookingData };
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

export const getBookingsByVenue = async (venueId) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.BOOKINGS),
            where('venueId', '==', venueId)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting venue bookings:', error);
        throw error;
    }
};

export const getBookingsByArtist = async (artistId) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.BOOKINGS),
            where('artistId', '==', artistId)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting artist bookings:', error);
        throw error;
    }
};

export const updateBookingStatus = async (bookingId, status) => {
    try {
        const docRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
        await updateDoc(docRef, {
            status,
            updatedAt: new Date().toISOString()
        });
        console.log('Booking status updated:', bookingId, status);
        return { id: bookingId, status };
    } catch (error) {
        console.error('Error updating booking status:', error);
        throw error;
    }
};
