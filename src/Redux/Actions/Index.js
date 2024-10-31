import { auth, db, provider, storage } from '../../firebase'
import { signInWithPopup } from "firebase/auth"
import * as actions from "../Actions/ActionsType"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";



export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider).then((data) => {
            dispatch(actions.setUser(data.user))
        }).catch((error) => alert(error.message))
    }
}


export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(actions.setUser(user))
            }
        })
    }
}

export function signOutAPI() {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(actions.setUser(null))
        }).catch((error) => {
            return console.log(error.message);

        })
    };
}



export function postArticleAPI(payload) {
    return (dispatch) => {

        if (payload.image) {
            dispatch(actions.setLoading(true));
            const storageRef = ref(storage, `images/${payload.image.name}`);
            const uploadRef = uploadBytesResumable(storageRef, payload.image);


            uploadRef.on("state_changed", (snapshot) => {
                const progress =
                    Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done " + snapshot.bytesTransferred);

            },
                (error) => {
                    alert(error);
                    dispatch(actions.setLoading(false));

                }, () => {
                    getDownloadURL(uploadRef.snapshot.ref).then((downloadURL) => {
                        const collRef = collection(db, "articles");
                        addDoc(collRef, {
                            actor: {
                                description: payload.user.email,
                                title: payload.user.displayName,
                                date: payload.timestamp,
                                image: payload.user.photoURL,
                            },
                            comments: 0,
                            video: payload.video,
                            description: payload.description,
                            shareImg: downloadURL,
                        });
                    });
                    dispatch(actions.setLoading(false));

                })
        }
        else if (payload.video) {
            const collRef = collection(db, "articles");
            addDoc(collRef, {
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                comments: 0,
                video: payload.video,
                description: payload.description,
                shareImg: payload.image,
            });
            dispatch(actions.setLoading(false));

        }
        else {
            const collRef = collection(db, "articles");
            addDoc(collRef, {
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                comments: 0,
                video: payload.video,
                description: payload.description,
                shareImg: payload.image,
            });
            dispatch(actions.setLoading(false));
        }
    }
}

// export function getArticlesAPI() {
//     return (dispatch) => {
//         let payload;
//         const collRef = collection(db, "articles");
//         const orderedRef = query(collRef, orderBy("actor.date", "desc"));
//         onSnapshot(orderedRef, (snapshot) => {
//             payload = snapshot.docs.map((doc) => doc.data());
//             dispatch(actions.getArticles(payload));
//         });
//     };
// }

export function getArticlesAPI() {
    return (dispatch) => {
        let payload;
        const collRef = collection(db, "articles")
        const orderedRef = query(collRef, orderBy("actor.date", "desc"));
        onSnapshot(orderedRef, (snapshot) => {
            payload = snapshot.docs.map((doc) => doc.data());
            dispatch(actions.getArticles(payload));
        });
    };
}