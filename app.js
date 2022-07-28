document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    console.log(app);

    const db = firebase.firestore();

    const myPost = db.collection('posts').doc('firstpost');

    myPost.onSnapshot(doc => {
        const data = doc.data();
        document.querySelector('#title').innerHTML = data.title;

    })
    //for products
    const query = productsRef.where('price', '>=', 10)

    query.get()
        .then(products => {
            data = doc.data()
            document.write(`${data.name} at $${data.price} <br/>`)
        })



})

function updatePost(e) {
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({ title: e.target.value })
}

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user);
        })
        .catch(console.log)
}

function uploadFile(files) {
    const storageref = firebase.storage().ref();
    const horseRef = storageRef.child('horse.jpg');

    const file = files.item(0);
    const task = horseRef.put(file)

    task.then(snapshot => {
        console.log(snapshot)
        const url = snapshot.downloadURL
        document.querySelector('#imgUpload').setAttribute('src', url);
    })
}