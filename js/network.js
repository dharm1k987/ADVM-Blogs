
window.onload = function () {
    $(".container-dharmik, .container-mirza, .container-vinit, .container-Anonymous").click(function () {
        alert("in hover");
        $(this).addClass('animate');
    });

    $(".container-dharmik, .container-mirza, .container-vinit, .container-Anonymous").mouseleave(function () {
        $(this).removeClass('animate');
    });
    var path = window.location.pathname;
    var path2 = path.substring(path.length - 10);
    $(".se-pre-con").fadeOut(2000);
    if (path === "/" || path2 === "index.html") {
        var push_btn = document.getElementById("upload-btn");
        push_btn.onclick = function () {
            window.location.replace("upload.html");
        };
        initMainWebpage();
    } else if (path === "upload.html") {
        var ret_btn = document.getElementById("ret-btn");
        ret_btn.onclick = function () {
            console.log("will now redirect");
            document.location.pathname = "/";
        }
    }

    $("#btn-wts").click(function() {
        $("#show-text").show();
    });
};


//REDIRECTOR !!! JUST REMOVE THIS ENTIRE SECTION TO REMOVE THE REDIRECTOR! line 33-54
/*
sessionStorage.setItem('correct-pwd',"false");
var path = window.location.pathname;

if (path === "/" && sessionStorage.getItem('correct-pwd') == "false") {

    console.log("will now redirect to redirect");
    window.location.replace("/redirect.html");

}

$("#btn-pwd-redirect").click(function() {
   if ($("#pwd-redirect").val() == "gangsta") {

       window.location.replace("/index.html");
       initMainWebpage();
       sessionStorage.setItem('correct-pwd',"true");
   }
    else {
        alert("Nice try.")
    }
});
*/

var loggedIn = false;
var BLOG_ITEMS_PER_PAGE = 7;
var NO_USER_LOGGED_IN = 0;
var USER_LOGGED_IN = 1;

var defaultDB = new Firebase("https://mybloggingdb.firebaseio.com");
var blogsRef = defaultDB.child('/blogs/');
var blogAmountRef = defaultDB.child('/blogAmount/');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBAqXclsER8Y7VxuV7-pYXnv3VHNpSOaHs",
    authDomain: "mybloggingdb.firebaseapp.com",
    databaseURL: "https://mybloggingdb.firebaseio.com",
    storageBucket: "mybloggingdb.appspot.com",
    messagingSenderId: "41834731643"
};

var VERIFICATION_KEY = "gangsta";

firebase.initializeApp(config);


var thisUser;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        thisUser = user;
        refreshDisplay(USER_LOGGED_IN);
    } else {
        thisUser = "";
        refreshDisplay(NO_USER_LOGGED_IN);
    }
});

////////////////////////////////////////////////////////////////////////////////////
// Index.html Module:

var isLoggedIn = false;

var initMainWebpage = function () {
    if (thisUser) {
        isLoggedIn = true;
        refreshDisplay(USER_LOGGED_IN);

    } else {
        refreshDisplay(NO_USER_LOGGED_IN);
        //Uncomment when implemented logging in.
        //loginProcess();
    }
    blogAmountRef.once('value', function (blogAmount) {
        var blogAmount = blogAmount.val();
        var mostRecentBlogID = "blog" + blogAmount;
        for (var i = 0; i < 5; i++) {
            getBlog("blog" + (blogAmount - i));
        }
    });
};

// Check for null objects. testing Required!
var getBlog = function (blogID) {
    //alert("ss");
    blogsRef.orderByKey().equalTo(blogID.valueOf()).once('value', function (blogList) {
        var blogTitle = blogList.child(blogID.valueOf()).val().blogTitle;
        var blogDate = blogList.child(blogID.valueOf()).val().blogDate;
        var blogAuthor = blogList.child(blogID.valueOf()).val().blogAuthor;
        var blogNumber = "blog #" + blogID.substring(4);
        var blogString = blogList.child(blogID.valueOf()).val().blogString;
        //printComments(blogID, );
        printBlog(blogID, blogTitle, blogDate, blogAuthor, blogString);
    });
};

var printBlog = function (blogID, blogTitle, blogDate, blogAuthor, blogString) {
    var body = document.body;

    var firstname = getAuthorFirstname(blogAuthor);
    var blogObjEl = document.createElement("div");
    blogObjEl.className = "container container-" + firstname;

    var randomDiv = document.createElement("div");
    randomDiv.className = "clearfix";
    blogObjEl.appendChild(randomDiv);

    var blogTitleEl = document.createElement("h1");
    blogTitleEl.appendChild(document.createTextNode(blogTitle));

    var blogDateEl = document.createElement("h1");
    blogDateEl.className = "date";
    blogDateEl.appendChild(document.createTextNode(blogDate));

    var authorImgFilename = firstname;
    var authorText1 = '<img style=\"vertical-align:middle;border-radius:50%;filter:grayscale(50%)\" src=\"css/img/' + authorImgFilename + '.jpg\" alt=\"image\">';
    var authorText2 = '<span style=\"margin-left:1%\">' + blogAuthor + '</span>';
    var authorDiv = document.createElement("div");
    authorDiv.innerHTML = authorText1 + authorText2;


    var blogTextElDiv = document.createElement("div");
    var blogTextElPara = document.createElement("p");
    blogTextElDiv.className = "row text-justify col-md-12";
    blogTextElPara.className = "message";
    blogTextElPara.appendChild(document.createTextNode(blogString));
    blogTextElDiv.appendChild(blogTextElPara);

    //add comment section
    var blogCommentTextInput = document.createElement('textarea');
    var commentTitle = document.createElement('div');

    commentTitle.innerHTML = "<strong>Comments:</strong>";
    blogCommentTextInput.id = "commentText" + blogID;
    blogCommentTextInput.placeholder = "Comment something...";
    blogCommentTextInput.className = "reply-input";
    blogCommentTextInput.cols = "100";
    blogCommentTextInput.rows = "3";
    blogCommentTextInput.maxLength = 200;

    var blogCommentBtn = document.createElement("input");
    blogCommentBtn.type = "button";
    blogCommentBtn.value = "Post";
    blogCommentBtn.className = "post-btn";

    var commentDivision = document.createElement("div");
    commentDivision.className = "comment-style";
    commentDivision.id = "commentDivision" + blogID;

    blogCommentBtn.onclick = function () {
        var user = firebase.auth().currentUser;
        if (user) {
            postComment(blogID, blogCommentTextInput.value, thisUser);
        } else {
            loginProcess();
        }

    };

    blogObjEl.appendChild(blogTitleEl);
    blogObjEl.appendChild(blogDateEl);
    blogObjEl.appendChild(authorDiv);
    blogObjEl.appendChild(blogTextElDiv);
    blogObjEl.appendChild(commentTitle);
    blogObjEl.appendChild(commentDivision);
    blogObjEl.appendChild(blogCommentTextInput);
    blogObjEl.appendChild(blogCommentBtn);
    getComments(blogID);
    body.appendChild(blogObjEl);
};

var loginProcess = function () {
    if (!thisUser) {
        $("#login-modal").modal('show');
    } else {
        alert(thisUser.displayName+" is logged in.");
    }


    var email = document.getElementById("email-login");
    var password = document.getElementById("password-login");
    var loginBtn = document.getElementById("login-btn");

    $("#login-btn").click(function () {

        if (validUsername(email)) {
            $("#login-modal").modal('hide');
            firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function (resolved) {
                thisUser = firebase.auth().currentUser;
                if (thisUser.emailVerified) {
                    makeToast("Logged in", 1, 1000);
                    refreshDisplay(USER_LOGGED_IN);
                    initMainWebpage();
                } else {
                    alert("Please verify your email");
                    //User: Sign out
                    signout();
                }
            }, function (error) {
                var errorCode = error.code;
                var errorMsg = error.message;
                alert(errorMsg);
            });

        }
    });


};

var registerProcess = function () {
    $("#register-modal").modal('show');

    var name = document.getElementById("name-of-user-register");
    var username = document.getElementById("username-register");
    var email = document.getElementById("email-register");
    var password = document.getElementById("password-register");
    var loginBtn = document.getElementById("register-btn");
    $("#register-btn").click(function () {

        if (validUsername(username) && validPassword(password)) {
            firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(function (resolved) {
                $("#register-modal").modal('hide');
                newUser = firebase.auth().currentUser;
                newUser.updateProfile({
                    displayName: name.value,
                    username: username.value
                }).then(function() {
                    newUser.sendEmailVerification().then(function () {
                        alert("Verification email sent at: "+newUser.email);
                        signout();
                        initMainWebpage();
                    }, function(error) {
                        alert(error.message);
                    });
                }, function(error) {
                    alert(error.message);
                });

            }, function (error) {
                var errorCode = error.code;
                var errorMsg = error.message;
                alert(errorMsg);
            });
            $("#user-action-modal").modal('hide');
        }
    });
};


var validUsername = function (username) {
    return true;
};

var validPassword = function (password) {
    return true;
};

var refreshDisplay = function (currentState) {
    if (currentState === USER_LOGGED_IN) {
        document.getElementById("register-modal-btn").style.display = "none";
        document.getElementById("login-modal-btn").style.display = "none";
        document.getElementById("upload-btn").style.display = "inherit";
        document.getElementById("signout-btn").style.display = "initial";
    } else if (currentState === NO_USER_LOGGED_IN) {
        document.getElementById("register-modal-btn").style.display = "initial";
        document.getElementById("login-modal-btn").style.display = "initial";
        document.getElementById("upload-btn").style.display = "none";
        document.getElementById("signout-btn").style.display = "none";
    }
};

var signout = function () {
    if (thisUser) {
        firebase.auth().signOut().then(function () {
            makeToast("You've successfully signed out", 1, 1000);
        }, function (error) {
            alert(error.message);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////







function getCurrentTime() {

    var dt = new Date();
    var hours = dt.getHours();
    var minute = dt.getMinutes();
    if (minute < 10) {
        minute = "0" + String(minute);
    }
    var period = "AM";
    if (hours > 12) {
        hours = hours - 12;
        period = "PM";
    }
    return (String(hours) + ":" + String(minute) + " " + period);

}

function getCurrentDate() {

    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var monthString = "";
    var year = d.getFullYear();

    switch (month) {
        case 0:
            monthString = "January";
            break;
        case 1:
            monthString = "February";
            break;
        case 2:
            monthString = "March";
            break;
        case 3:
            monthString = "April";
            break;
        case 4:
            monthString = "May";
            break;
        case 5:
            monthString = "June";
            break;
        case 6:
            monthString = "July";
            break;
        case 7:
            monthString = "August";
            break;
        case 8:
            monthString = "September";
            break;
        case 9:
            monthString = "October";
            break;
        case 10:
            monthString = "November";
            break;
        case 11:
            monthString = "December";
            break;
    }


    if (month < 10) {
        month = "0" + (month + 1);
    } else {
        month = month + 1;
    }
    return (monthString + " " + String(day) + ", " + String(year));

}

var getCurrentBlogAmount = -1;


var updateBlogAmount = function () {};

var postBlog = function () {

    blogAmountRef.once('value', function (blogAmount) {
        var updatedAmount = blogAmount.val() + 1;
        defaultDB.update({
            blogAmount: updatedAmount
        });

        var blogID = "blog" + updatedAmount;
        var blogTitle = document.getElementById('titleInput').value;

        var blogDate = getCurrentDate() + " -- " + getCurrentTime();

        var authorArr = document.getElementsByName('author');
        var blogAuthor = "";
        for (var i = 0; i < authorArr.length; i++) {
            if (authorArr[i].checked) {
                blogAuthor = authorArr[i].value;
                break;
            }
        }

        var blogNumber = updatedAmount;
        var blogString = document.getElementById('blogTextInput').value;


        var blogObject = {};
        blogObject[blogID] = {
            blogTitle: blogTitle.valueOf(),
            blogDate: blogDate.valueOf(),
            blogAuthor: blogAuthor.valueOf(),
            blogString: blogString.valueOf(),
            blogCommentAmount: 0
        };
        blogsRef.update(blogObject);
        window.location = "http://www.advm.me";

    });
};




var getAuthorFirstname = function (blogAuthor) {
    var authorLetter = blogAuthor.substring(0, 1);

    if (blogAuthor === "Anonymous") {
        return "Anonymous";
    } else if (authorLetter === "A") {
        return "arjun";
    } else if (authorLetter === "D") {
        return "dharmik";
    } else if (authorLetter === "V") {
        return "vinit";
    } else if (authorLetter === "M") {
        return "mirza";
    } else {
        return "ERROR: Author not found.";
    }
}

var postComment = function (blogID, comment, user) {
    // CHECK COMMENT VALIDITY HERE.

    var commentAmountRef = defaultDB.child('/blogs/' + blogID + '/blogCommentAmount');

    commentAmountRef.once('value', function (commentAmount) {
        var newCommentAmount = commentAmount.val() + 1;
        defaultDB.child('/blogs/' + blogID).update({
            blogCommentAmount: newCommentAmount
        });
        var newCommentID = "comment" + newCommentAmount;

        var newCommentRef = blogsRef.child('/' + blogID + '/comments/');
        var commentObject = {};

        if (thisUser) {
            var commentDate = getCurrentDate();
            var commenterName = thisUser.displayName;

            commentObject[newCommentID] = {
                commentValue: comment.valueOf(),
                commenter: commenterName.valueOf(),
                dateOf: commentDate.valueOf()
            };
            newCommentRef.update(commentObject);
            getComments(blogID);
        } else {

        }
    });

};


var getComments = function (blogID) {
    var commentAmountRef = blogsRef.child('/' + blogID + '/blogCommentAmount');
    commentAmountRef.once('value', function (commentAmount) {
        var commentsSection = document.getElementById("commentDivision" + blogID);
        commentsSection.innerHTML = "<br>";
        setTimeout(function () {
            for (var i = 1; i <= commentAmount.val(); i++) {
                commentID = "comment" + i;
                var commentRef = blogsRef.child(blogID + '/comments/' + commentID);
                commentRef.once('value', function (comment) {
                    // UPDATE FRONTEND WITH COMMENTS HERE.
                    var divider = document.createElement("hr");
                    divider.className = "divider";
                    var dateTimeComment = document.createElement('div');
                    dateTimeComment.className = "dtComment";
                    // NEED TO SETUP THE COMMENT'S DATE HERE
                    dateTimeComment = comment.val().dateOf;



                    commentsSection.appendChild(document.createTextNode(comment.val().commentValue));
                    commentsSection.appendChild(document.createElement("br"));
                    commentsSection.appendChild(document.createTextNode("- "+comment.val().commenter));
                    commentsSection.appendChild(document.createElement("br"));
                    commentsSection.appendChild(document.createTextNode(dateTimeComment));
                    commentsSection.appendChild(divider);
                    //commentsSection.appendChild(document.createElement("br"));
                   /* commentsSection.appendChild(document.createElement("br"));
                    commentsSection.appendChild(document.createElement("br"));
                    commentsSection.appendChild(document.createElement("br"));*/


                });
            }
        }, 50);

    });
};











// POSTING Blogs

var makeToast = function (outputString, outputStatus, timeout) {
    var colour = "green";
    if (outputStatus === 1) {
        colour = "green";
    } else {
        colour = "red";
    }
    var el = document.getElementById("snackbar");
    el.innerHTML = outputString;
    el.className = "show";
    el.style.backgroundColor = colour;
    setTimeout(function () {
        el.className = el.className.replace("show", "");
    }, timeout);
}

var reassureBeforePost = function () {
    var password = document.getElementById("passwordField").value;
    if (password === VERIFICATION_KEY) {
        makeToast("VERIFIED", 1, 1000);
        document.getElementById('confirmedPushBtn').style.visibility = "visible";
        document.getElementById('blogPushBtn').style.visibility = "hidden";
    } else {
        makeToast("Wrong password", 0, 2000);
    }
}




var btn_today = document.getElementById("btnToday");
btn_today.onclick = function () {
    console.log("in");
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();

    if (month < 10) {
        month = "0" + (month + 1);
    } else {
        month = month + 1;
    }


    document.getElementById('dayInput').value = day.toString();
    document.getElementById('monthInput').value = month;
    document.getElementById('yearInput').value = year.toString();
}
