$(document).ready(function () {
    var path = window.location.pathname;
    $(".se-pre-con").fadeOut(3000);
    if (path == "/") {
        initWebpage();
    }
    // REMOVE BEFORE DEPLOY
    initWebpage();

});



var loggedIn = false;
var BLOG_ITEMS_PER_PAGE = 7;

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


//postBlog('Vinit\'s Blog', 'Dharmik', 'date_goes_here', 'This is where the blog is');

/*defaultDB.ref('/blogs').orderByChild('blogger').limitToFirst(2).once('value').then(function (blog) {
    console.log("Running");
    console.log(blog.val());
});*/


function dothis() {
    getBlogAmount();
};

var increaseBlogAmount = function () {
    blogAmountRef.once('value').then(function (blogAmount) {
        var newBlogAmount = blogAmount.val() + 1;
        console.log(newBlogAmount);
        defaultDB.ref('/blogAmount').set(newBlogAmount);
    })
};

var getBlogAmount = function () {
    blogAmountRef.once('value').then(function (amount) {
        document.getElementById('test').innerHTML = amount;
        console.log(amount.val());
        return amount.val();
    });
};

function getBlog1(amount) {
    var a = "blog" + 100;
    blogsRef.set({
        "blog100": {
            blogText: "This is where the blog is",
            blogger: "Vinit"
        }
    })
    blogsRef.orderByKey().equalTo(a).once('value', function (blogList) {
        document.getElementById('test').innerHTML = blogList.val()[a];
        var m = blogList.val()[a];
        //alert(m.blogger);
        console.log(blogList.val()[a].blogger);
    });

};




// Interface:
// pushBlog();
// getBlog(var  );

////////////////////////////////////////////////////////////////////////////////////
function getDate() {

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

function getTime() {

    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();

    if (month < 10) {
        month = "0" + (month + 1);
    } else {
        month = month + 1;
    }
    return (String(month) + "/" + String(day) + "/" + String(year));

}

var getCurrentBlogAmount = -1;


var updateBlogAmount = function () {};

var postBlog = function () {
    //var updatedBlogAmount = updateBlogAmount();
    //var str = "blog"+updatedBlogAmount;

    blogAmountRef.once('value', function (blogAmount) {
        var updatedAmount = blogAmount.val() + 1;
        defaultDB.update({
            blogAmount: updatedAmount
        });

        var blogID = "blog" + updatedAmount;
        var blogTitle = document.getElementById('titleInput').value;
        /*var blogDate = document.getElementById('dayInput').value + "-" +
            document.getElementById('monthInput').value + "-" +
            document.getElementById('yearInput').value;*/

        /*var dt = new Date();
        var hours = dt.getHours();
        var minute = dt.getMinutes();
        var period = "AM";
        if (hours > 12) {
            hours = hours-12;
            period = "PM";
        }*/

        var blogDate = document.getElementById('dayInput').value + "-" +
            document.getElementById('monthInput').value + "-" +
            document.getElementById('yearInput').value + " - " + getDate();

        /* var blogID = "blog" + updatedAmount;
         var blogTitle = document.getElementById('titleInput').value;
         var blogDate = document.getElementById('dayInput').value + "-" +
             document.getElementById('monthInput').value + "-" +
             document.getElementById('yearInput').value;*/
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

function initWebpage() {

    blogAmountRef.once('value', function (blogAmount) {
        var blogAmount = blogAmount.val();
        var mostRecentBlogID = "blog" + blogAmount;
        for (var i = 0; i < 5; i++) {
            getBlog("blog" + (blogAmount - i));
            //alert(blogAmount - i);
        }
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

var postComment = function (blogID, comment) {
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
        commentObject[newCommentID] = comment.valueOf();
        newCommentRef.update(commentObject);
        getComments(blogID);
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
                    dateTimeComment.innerHTML = getDate() + " - " + getTime();



                    commentsSection.appendChild(document.createTextNode(comment.val()));
                    commentsSection.appendChild(document.createElement("br"))
                    commentsSection.appendChild(dateTimeComment);
                    commentsSection.appendChild(divider);
                    commentsSection.appendChild(document.createElement("br"));
                    //commentsSection.appendChild(br);

                });
            }
        }, 50);

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

    /*var randomDiv2 = document.createElement("div");
    randomDiv2.className = "hr";*/


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
        console.log(loggedIn);
        if (loggedIn === false) {
            $("#login-modal").modal('show');

            $(".loginmodal-submit").click(function() {
                firebase.auth().signInWithEmailAndPassword(username.value, password.value).catch(function(error) {
                    var errorCode = error.code;
                    var errorMsg = error.message;
                    alert(errorMsg);
                    alert("logged in?");
                });
                //loggedIn = true;
                //alert("Logged in, you may now comment");
                $("#login-modal").modal('hide');
            });
        }

        else {
            commentDivision.innerHTML = "";
            postComment(blogID, blogCommentTextInput.value)
            blogCommentTextInput.value = "";
        }

    };

    var username = document.getElementById("username");
    var password = document.getElementById("password");

    var loginBtn = document.getElementById("login-btn");




    /*var randomDiv3 = document.createElement("div");
    randomDiv3.className = "hr";*/




    blogObjEl.appendChild(blogTitleEl);
    blogObjEl.appendChild(blogDateEl);
    blogObjEl.appendChild(authorDiv);
    //blogObjEl.appendChild(randomDiv2);
    blogObjEl.appendChild(blogTextElDiv);
    //blogObjEl.appendChild(randomDiv3);

    blogObjEl.appendChild(commentTitle);

    blogObjEl.appendChild(commentDivision);


    //blogObjEl.appendChild(randomDiv2);
    blogObjEl.appendChild(blogCommentTextInput);

    blogObjEl.appendChild(blogCommentBtn);
    getComments(blogID);

    body.appendChild(blogObjEl);
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

        $(document).ready(function () {
            $(".container-dharmik, .container-mirza, .container-vinit .container-Anonymous").mouseenter(function () {
                $(this).addClass('animate');
            });

            $(".container-dharmik, .container-mirza, .container-vinit .container-Anonymous").mouseleave(function () {
                $(this).removeClass('animate');
            });
        });
    });
};




// POSTING Blogs

var makeToast = function (outputString, outputStatus) {
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
    }, 2000);
}

var reassureBeforePost = function () {
    var password = document.getElementById("passwordField").value;
    if (password === VERIFICATION_KEY) {
        //alert("Item Deletion not implemented yet. Please revise before posting. Then, click the Green \"Confirmation Button\"");
        makeToast("VERIFIED", 1);
        document.getElementById('confirmedPushBtn').style.visibility = "visible";
        document.getElementById('blogPushBtn').style.visibility = "hidden";
    } else {
        makeToast("Wrong password", 0);
    }
}
window.onload = function () {
    var push_btn = document.getElementsByClassName("push-btn")[0];
    push_btn.onclick = function () {
        window.location.replace("/upload.html");
    }
};


var ret_btn = document.getElementById("ret-btn");
ret_btn.onclick = function () {
    console.log("will now redirect");
    document.location.pathname = "/";
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
