import firestore from '@react-native-firebase/firestore';

export const addUser = async (user: any, display_name: string) => {
    try {
        const userExists = await fetchUser(user.email);
        if (userExists) { return }; // Don't add user to firestore if they exist already

        firestore()
        .collection('Users')
        .doc(user.email)
        .set({
            email: user.email,
            display_name: display_name,
            profile_photo_url: user.photoURL ? user.photoURL : null,
            provider_data: user.providerData,
        })
        .then(() => console.log("New user added to firestore: ", { 
            email: user.email,
            display_name: display_name,
            profile_photo_url: user.photoURL ? user.photoURL : null,
            provider_data: user.providerData,
        }));
    } catch (error) {
        console.log("Error adding new user to firestore: ", error);
    };
};

export const fetchUser = async (email: string | null) => {
    try {
        const response = await firestore()
                        .collection('Users')
                        .where('email', '==', email)
                        .get();
        
        if (response.docs.length === 0) {
            return null; // User not found
        };

        console.log("User fetched from database!");

        return response.docs[0].data();
    } catch (error) {
        console.log("Error fetching user: ", error);
    };
};

// User edit functions
export const editUsername = async (email: any, newName: string | null) => {
    try {
        await firestore()
            .collection('Users')
            .doc(email)
            .update({
                display_name: newName,
            })
            .then(() => console.log("Username updated to: ", newName));
    } catch (error) {
        console.log("Error changing username: ", error);
    };
};