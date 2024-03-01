import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestoreDb } from '../firebase/firebaseConf';

export const handleFollowing =
  (loggedUserId, postAuthorId, isFollowing, setIsFollowing) =>
  async (dispatch) => {
    try {
      const userDocRef = doc(firestoreDb, 'users', loggedUserId);
      const postUserRef = doc(firestoreDb, 'users', postAuthorId);

      if (isFollowing) {
        // If currently following, unfollow
        await updateDoc(userDocRef, {
          following: arrayRemove(postAuthorId),
        });
        await updateDoc(postUserRef, {
          followers: arrayRemove(loggedUserId),
        });
      } else {
        // If not following, follow
        await updateDoc(userDocRef, {
          following: arrayUnion(postAuthorId),
        });
        await updateDoc(postUserRef, {
          followers: arrayUnion(loggedUserId),
        });
      }

      setIsFollowing((prevState) => !prevState);
    } catch (error) {
      console.log(error.code);
    }
  };
