window.onload = function() {


    /* Modal Window */

    if (window.location.toString().search(/index\.htm$/i) !== -1) {
        setTimeout(function() {
            let modal =  new bootstrap.Modal(document.querySelector('#mainPageModal'), {
                backdrop: 'static'
            });
            modal.toggle();
        }, 10000);
    }
    if (window.location.toString().search(/appsPost\.htm$/i) !== -1) {
        setTimeout(function() {
            let modal =  new bootstrap.Modal(document.querySelector('#appsPostModal'), {
                backdrop: 'static'
            });
            modal.toggle();
        }, 10000);
    }
    if (window.location.toString().search(/checklistPost\.htm$/i) !== -1) {
        setTimeout(function() {
            let modal =  new bootstrap.Modal(document.querySelector('#checklistPostModal'), {
                backdrop: 'static'
            });
            modal.toggle();
        }, 10000);
    }
    if (window.location.toString().search(/destinations\.htm$/i) !== -1) {
        setTimeout(function() {
            let modal =  new bootstrap.Modal(document.querySelector('#destPostModal'), {
                backdrop: 'static'
            });
            modal.toggle();
        }, 10000);
    }


    /* Page Navigation Buttons */

    let pageNavButtons = document.getElementsByClassName('page-nav-buttons');
    for (let i = 0; i < pageNavButtons.length; i++) {

        function hideButtons() {
            pageNavButtons[i].style.opacity = '0';
            pageNavButtons[i].style.visibility ='hidden';
        }
        function showButtons() {
            pageNavButtons[i].style.visibility ='visible';
            pageNavButtons[i].style.opacity ='100%';
        }
        function scrollPage() {
            if (window.pageYOffset < 100 || window.pageYOffset > document.documentElement.scrollHeight - document.documentElement.clientHeight - 150)  {
                hideButtons();
            } else {
                showButtons();
            }
        }

        pageNavButtons[i].addEventListener('click', hideButtons);

        window.addEventListener('scroll', scrollPage);
      //  window.addEventListener("touchstart", scrollPage);
       // window.addEventListener("touchmove", scrollPage);
      //  window.addEventListener("touchend", scrollPage);

    }


    // Latest Posts on Main Page

    let latestPosts = document.querySelectorAll('.card');
    for (let i = 0; i < latestPosts.length; i++) {

        latestPosts[i].onmouseover = function() {
            latestPosts[i].classList.add('shadow');
        }
        latestPosts[i].onmouseout = function() {
            latestPosts[i].classList.remove('shadow');
        }
     }


    // Comments Section

    function clearCommentForm(name, email, text) {
        name.value = '';
        text.value = '';
        email.value = '';
    }

    function createObject(arg, counter, name, text, date, key) {
        arg[counter] = {};
        arg[counter].name = name.value;
        arg[counter].text = text.value;
        arg[counter].date = date;
        localStorage.setItem(`${key}`, JSON.stringify(arg));
    }

    function drawComment(form, arg, counter, name, text, date) {
        let comment = document.createElement('div');
        comment.classList.add('form-for-comments');
        comment.innerHTML = `<p class="comment-name">${arg[counter].name || name.value}</p>
                             <p class="text-muted">${arg[counter].date || date}</p>
                             <p class="comment-text">${arg[counter].text || text.value}</p>`;
        form.after(comment);
    }

    function formatDate(date) {
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        let hours = date.getHours();
        let ampm;
        if (hours < 12) {
            ampm = ' am';
        }
        else {
            ampm = ' pm';
        }
        hours = date.getHours() % 12 || 12;
        return monthNames[monthIndex] + ' ' + day + ', ' + year + ' at ' + hours + ':' + minutes + ampm;
    }


    // ChecklistPost Comments

    if (window.location.toString().search(/checklistPost/i) !== -1) {

        let checklistForm = document.getElementById('checklistForm');
        let checklistCommentName = document.getElementById('checklistCommentName');
        let checklistCommentText = document.getElementById('checklistCommentText');
        let checklistCommentEmail = document.getElementById('checklistCommentEmail');
        let checklistCommentError = document.getElementById('checklistCommentError');
        let checklistCommentDate = formatDate(new Date());
        let count1 = localStorage.getItem('count1') || 0;
        let page1 = JSON.parse(localStorage.getItem('page1')) || [];


        checklistForm.addEventListener('submit', function(e){

            if (checklistCommentName.value.length === 0 || checklistCommentText.value.length === 0 || checklistCommentEmail.value.length === 0) {
                e.preventDefault();
                checklistCommentError.style.display = 'block';
                checklistCommentError.innerText = 'Please fill all the fields';
            }

            if (checklistCommentName.value.length !== 0 && checklistCommentEmail.value.length !== 0 && checklistCommentText.value.length !== 0) {
                e.preventDefault();
                createObject(page1, count1, checklistCommentName, checklistCommentText, checklistCommentDate, 'page1');
                drawComment(checklistForm, page1, count1);
                count1++;
                localStorage.setItem(`count1`, count1);
                clearCommentForm(checklistCommentName, checklistCommentEmail, checklistCommentText);
                checklistCommentError.style.display = 'none';
            }
        });

        for (let k = 0; k <= count1; k++) {
            if (localStorage.getItem(`count1`)) {
                drawComment(checklistForm, page1, k);
            }
        }
    }


    // AppsPost Comments

    if (window.location.toString().search(/appsPost/i) !== -1) {

        let appsForm = document.getElementById('appsForm');
        let appsCommentError = document.getElementById('appsCommentError');
        let appsCommentName = document.getElementById('appsCommentName');
        let appsCommentText = document.getElementById('appsCommentText');
        let appsCommentEmail = document.getElementById('appsCommentEmail');
        let appsCommentDate = formatDate(new Date());
        let count2 = localStorage.getItem('count2') || 0;
        let page2 = JSON.parse(localStorage.getItem('page2')) || [];


        appsForm.addEventListener('submit', function(e){

            if (appsCommentName.value.length === 0 || appsCommentText.value.length === 0 || appsCommentEmail.value.length === 0) {
                e.preventDefault();
                appsCommentError.style.display = 'block';
                appsCommentError.innerText = 'Please fill all the fields';
            }

            if (appsCommentName.value.length !== 0 && appsCommentText.value.length !== 0 && appsCommentEmail.value.length !== 0) {
                e.preventDefault();
                createObject(page2, count2, appsCommentName, appsCommentText, appsCommentDate, `page2`);
                drawComment(appsForm, page2, count2);
                count2++;
                localStorage.setItem(`count2`, count2);
                clearCommentForm(appsCommentName, appsCommentEmail, appsCommentText);
                appsCommentError.style.display = 'none';
            }
        });

        for (let k = 0; k <= count2; k++) {
            if (localStorage.getItem(`count2`)) {
                drawComment(appsForm, page2, k);
            }
        }
    }


    // Invalid Email Address in Subscription Form

    let subEmail = document.querySelectorAll('.emails');
    let subForm = document.querySelectorAll('#subscriptionFormContent');
    let subEmailHelp = document.querySelectorAll('#subEmailHelp');
    let subEmailError = document.querySelectorAll('#subEmailError');
    let subEmailEmpty = document.querySelectorAll('#subEmailEmpty');
    for (let i = 0; i < subEmail.length; i++) {
        subEmail[i].addEventListener('change', function() {
            let reg = /\b[0-9a-z._]+@[a-z]+\.[a-z]{2,4}\b/i;
            let res = subEmail[i].value.search(reg);
            if (res === -1) {
                subEmailError[i].style.display = 'block';
                subEmailHelp[i].style.display = 'none';
                subEmailEmpty[i].style.display = 'none';
            }
            else {
                subEmailHelp[i].style.display = 'block';
                subEmailError[i].style.display = 'none';
                subEmailEmpty[i].style.display = 'none';
            }
        })
        subForm[i].addEventListener('submit', function(e) {
            if (subEmail[i].value.length === 0) {
                e.preventDefault();
                subEmailEmpty[i].style.display = 'block';
                subEmailHelp[i].style.display = 'none';
                subEmailError[i].style.display = 'none';
            }
        })
    }


    // Invalid Email Address in Comments Sections

    let commentEmail = document.querySelectorAll('.comment-email');
    let commentError = document.querySelectorAll('.comment-error-message');
    for (let i = 0; i < commentEmail.length; i++) {
        commentEmail[i].addEventListener('change', function() {
            let reg = /\b[0-9a-z._]+@[a-z]+\.[a-z]{2,4}\b/i;
            let res = commentEmail[i].value.search(reg);
            if (res === -1) {
                commentError[i].innerHTML = 'Email address must meet the format example@example.com';
                commentError[i].style.display = 'block';
            }
            else {
                commentError[i].style.display = 'none';
            }
        })
    }

}

