var uid = "";
firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        uid = "" + user.uid;
    }
});

function updateAddress() {

    const auth = firebase.auth().currentUser;
    var confirmAddress = document.getElementById("confirmAddress");

    confirmAddress.addEventListener("click", function () {

            var address = document.getElementById("address_input_change").value;


            auth.updateProfile({
                address: address
                }).then(function () {
                    return db.collection("users_medic").doc(uid).update({
                        address: address
                    })
                })
                .catch(function (error) {

                });

        })


    }


    // function updateImage() {

    //     const auth = firebase.auth().currentUser;
    //     var confirmImage = document.getElementById("confirmImage");
    
    //     confirmImage.addEventListener("click", function () {
    
    //             var image = document.getElementById("image_input_change").value;
    
    
    //             auth.updateProfile({
    //                     imagePath: image
    //                 }).then(function () {
    //                     return db.collection("users_medic").doc(uid).update({
    //                         imagePath: image
    //                     })
    //                 })
    //                 .catch(function (error) {
    
    //                 });
    
    //         })
    
    
    //     }

    function updateEmail() {

        const auth = firebase.auth().currentUser;
        var confirmEmail = document.getElementById("confirmEmail");

        confirmEmail.addEventListener("click", function () {

            var emailAddress = document.getElementById("email_input_change").value;


            auth.updateEmail(emailAddress).then(function () {


                return db.collection("users_medic").doc(uid).update({
                        phoneNumberEmail: emailAddress
                    })
                    .then(function () {

                    })
                    .catch(function (error) {

                    });

            }).catch(function (error) {

                alert("Error");
            });
        })
    };

    function updatePassword() {
        // var newPassword = getASecureRandomPassword();

        const auth = firebase.auth().currentUser;
        var confirmPw = document.getElementById("confirmPw");

        confirmPw.addEventListener("click", function () {

            var newPassword = document.getElementById("pw_input_change").value;


            auth.updatePassword(newPassword).then(function () {


                // return db.collection("users_medic").doc(uid).update({
                //     phoneNumberEmail: emailAddress
                // })
                // .then(function() {

                // })
                // .catch(function(error) {

                // });

            }).catch(function (error) {

                alert("Error");
            });
        })
    }

    function openForm() {
        document.getElementById("myForm").style.display = "block";
    }

    function closeForm() {
        document.getElementById("myForm").style.display = "none";

    }

    function openForm2() {
        document.getElementById("myForm2").style.display = "block";
    }


    function closeForm2() {
        document.getElementById("myForm2").style.display = "none";

    }

    function openForm3() {
        document.getElementById("myForm3").style.display = "block";
    }


    function closeForm3() {
        document.getElementById("myForm3").style.display = "none";

    }