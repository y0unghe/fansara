import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {
    setDoc,
    serverTimestamp,
    doc,
    getDoc
} from "@firebase/firestore";
import { db } from "../../../firebase";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.tag = session.user.name
                .split(" ")
                .join("")
                .toLocaleLowerCase();

            session.user.uid = token.sub;

            const docRef = doc(db, 'users', session.user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc((docRef), {
                    id: session.user.uid,
                    username: session.user.name,
                    userImg: session.user.image,
                    tag: session.user.tag,
                    timestamp: serverTimestamp()
                }, {
                    merge: true
                })
            }

            return session;
        },
    },
    secret: "IamVeryGoodLookingDude"
}

export default NextAuth(authOptions)