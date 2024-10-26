import firestore from '@react-native-firebase/firestore';

export const addUser = (user: any) => {
    try {
        firestore()
        .collection('Users')
        .add({
            email: user.email,
        })
        .then(() => console.log("New user added to firestore's Users collection!"));
    } catch (error) {
        console.log("Error adding new user to firestore: ", error);
    };
};