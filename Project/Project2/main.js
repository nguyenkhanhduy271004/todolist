        const clickRegister = document.querySelector('.js-click-register');
        const clickLogin = document.querySelector('.js-click-login');
        const showRegister = document.querySelector('.js-show-register');
        const hideLogin = document.querySelector('.js-modal-login');
        const registerBtn = document.querySelector('.js-register-btn');
        const loginBtn = document.querySelector('.js-login-btn');
        const textLogin = document.querySelector('.js-login-text');
        const textRegister = document.querySelector('.js-register-text');
        const showUser = document.querySelector('.js-infor-user')
        const hideUser = document.querySelector('.js-hide-form-login');
        const showUser1 = document.querySelector('.js-infor-user-1')
        const hideUser2 = document.querySelector('.js-hide-form-login-1');
        const logoutBtn = document.querySelector('.js-logout-btn');
        const headerInput = document.querySelector('.js-header-input');
        var dataUserAccount = [];
        function showFormLogin() {
            showRegister.style.display = 'flex';
            hideLogin.style.display = 'none'
        }
        clickRegister.addEventListener('click', showFormLogin);
        function showFormRegister() {
            var accountInput = document.querySelector('.js-data-register-account').value;
            var passInput = document.querySelector('.js-data-register-password').value;
            var newAccount = {
                account: accountInput,
                password: passInput,
            }
            dataUserAccount.push(newAccount);
            showRegister.style.display = 'none';
            hideLogin.style.display = 'flex';
        }
        clickLogin.addEventListener('click', showFormRegister);
        registerBtn.addEventListener('click', showFormRegister);
        function hideAllForm() {
            showRegister.style.display = 'none';
            hideLogin.style.display = 'none';
        }
        function showFormRegisterNoFormLogin() {
            showRegister.style.display = 'flex';
        }
        function showFormLoginNoFormRegister() {
            hideLogin.style.display = 'flex';
        }
        textLogin.addEventListener('click', showFormRegisterNoFormLogin);
        textRegister.addEventListener('click', showFormLoginNoFormRegister);
        var accountInput = document.querySelector('.login__account');
        var passwordInput = document.querySelector('.login__password');
        let isLoginSuccessful = false;
        headerInput.onkeydown = function(e) {
            if(e.which == 13) {
              performLogin();
            }
        }
        async function performLogin() {
            const accountInput = document.querySelector('.login__account');
            const passwordInput = document.querySelector('.login__password');
          
            try {
              const response = await fetch('http://localhost:3000/account');
              const data = await response.json();
          
              let user = null;
              for (const key in data) {
                if (data[key].account === accountInput.value && data[key].password === passwordInput.value) {
                  user = data[key];
                  break;
                }
              }
          
              if (user) {
                showUser.style.display = 'flex';
                showUser1.style.display = 'flex';
                showUser1.innerText = accountInput.value;
                hideUser.style.display = 'none';
                hideUser2.style.display = 'none';
                isLoginSuccessful = true;
                hideAllForm();
                showToast(successMsg);
              } else {
                showToast(failMsg);
              }
            } catch (error) {
              showToast(errorMsg);
            }
        }
        logoutBtn.addEventListener('click', function() {
            showUser.style.display = 'none';
            showUser1.style.display = 'none';
            hideUser.style.display = 'flex';
            hideUser2.style.display = 'flex';
        })
        var homeBtns = document.getElementsByClassName('home-button__select');
        var categoryItems = document.getElementsByClassName('category__item');
        var homeBtnsLength = homeBtns.length;
        for(var i = 0; i < homeBtnsLength; ++i) {
            homeBtns[i].onclick = function() {
                for(var j = 0; j < homeBtns.length; ++j) {
                    homeBtns[j].classList.remove('home-button__select-active');
                }
                this.classList.add('home-button__select-active');
            }
        }
        var categoryItemsLength = categoryItems.length;
        for(var i = 0; i < categoryItemsLength; ++i) {
            categoryItems[i].onclick = function() {
                for(var j = 0; j < categoryItems.length; ++j) {
                    categoryItems[j].classList.remove('category__item-active');
                }
                this.classList.add('category__item-active');
            }
        }
        var numberPage = 1;
        var buttonForward = document.querySelector('.home-button__forward');
        var buttonBack = document.querySelector('.home-button__back');
        buttonForward.addEventListener('click', function(event) {
            event.preventDefault();
            if(numberPage + 1 <= 2 ) {
                ++numberPage;
                var element = document.querySelector('.home-page__first');
                element.innerHTML = numberPage;
            }
        });
        buttonBack.addEventListener('click', function(event) {
            event.preventDefault();
            if(numberPage - 1 >= 0) {
                --numberPage;
                var element = document.querySelector('.home-page__first');
                element.innerHTML = numberPage;
            }
        });
        document.querySelector('.js-register-btn').addEventListener('click', function () {
            // Lấy dữ liệu từ form
            const account = document.querySelector('.js-data-register-account').value;
            const password = document.querySelector('.js-data-register-password').value;
      
            // Gửi yêu cầu POST sử dụng Fetch API
            fetch('http://localhost:3000/account', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ account, password }),
            })
            .then(response => response.text())
            .then(data => {
              console.log(data);
              // Xử lý phản hồi từ server nếu cần
            })
            .catch(error => {
              console.error('Error:', error);
              // Xử lý lỗi nếu có
            });
          });
          var listProduct = document.querySelectorAll('.grid__col-left-2');
          var productImage = document.querySelectorAll('.home-product-item__img');
          var nameProduct = document.querySelectorAll('.home-product-item__name');
          var productImageLength = productImage.length;
          function updateUrlSportShoes() {
            for(var i = 0; i < productImageLength; i++) {
              productImage[i].style.backgroundImage = 'url(https://down-vn.img.susercontent.com/file/vn-11134201-7qukw-leo54lptspf65c_tn)';
              listProduct[i].classList.add('show');
              nameProduct[i].innerText = 'Giày Thể Thao Air Jordan 1 Chicago Lost And Found Đỏ Trắng Phù Hợp Vơi Cả Nam Và Nữ Clever Man Store';
            }
          }
          function updateUrlSchoolShoes() {
            for(var i = 0; i < productImageLength; i++) {
              productImage[i].style.backgroundImage = 'url(https://down-vn.img.susercontent.com/file/b25adce0f770c8d0c29a504b3debf0f1)';
              listProduct[i].classList.add('show');
              nameProduct[i].innerHTML = 'Giày đi học Nam Nữ Sandal Si Cao Su Nam Biti\'s BPM000300';
            }
          }
          function updateUrlLazyShoes() {
            for(var i = 0; i < productImageLength; i++) {
              productImage[i].style.backgroundImage = 'url(https://ananas.vn/wp-content/uploads/Pro_AV00003_1.jpeg)';
              listProduct[i].classList.add('show');
              nameProduct[i].innerHTML = 'Giày lười Nam Nữ BASAS SIMPLE LIFE NE - MULE - BLACK';
            }
          }
          function updateUrlBootShoes() {
            for(var i = 0; i < productImageLength; i++) {
              productImage[i].style.backgroundImage = 'url(//cbu01.alicdn.com/img/ibank/O1CN01tAwoGt1DxemEfoh3s_!!1712070283-0-cib.jpg)';
              listProduct[i].classList.add('show');
              nameProduct[i].innerHTML = 'Giày boot Nam Nữ THEWOLF CHUNKY TASSEL LOAFER - TAN';
            }
          }
          function updateUrlBreadSlippers() {
            for(var i = 0; i < productImageLength; i++) {
              productImage[i].style.backgroundImage = 'url(https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkjv544wyv0wfc)';
              listProduct[i].classList.add('show');
              nameProduct[i].innerHTML = 'DÉP BÁNH MÌ MONOBO YM 01 THÁI LAN(5-8)';
            }
          }
          var numPage = document.querySelectorAll('.pagination-link');
          for(var i = 0; i < numPage.length; ++i) {
            numPage[i].onclick = function() {
                for(var j = 0; j < numPage.length; ++j) {
                  numPage[j].classList.remove('pagination-link-active');
                }
                this.classList.add('pagination-link-active');
            }
        }
        let toastBox = document.getElementById('toastBox');
        let successMsg = '<i class="fa-solid fa-circle-check"></i> Successfully login';
        let failMsg = '<i class="fa-solid fa-circle-xmark"></i> Failed to login';
        let errorMsg = '<i class="fa-solid fa-circle-exclamation"></i> Error to login';
        function showToast(msg) {
            let toast = document.createElement('div');
            toast.classList.add('toast');
            toast.innerHTML = msg;
            toastBox.appendChild(toast);

            if(msg.includes('Failed')) {
              toast.classList.add('failed');
            }
            if(msg.includes('Error')) {
              toast.classList.add('error');
            }
            setTimeout(()=> {
              toast.remove();
            }, 6000);
        }
// var users = [
//     {
//         id: 1,
//         name: 'Kien Dam',
//     },
//     {
//         id: 2,
//         name: 'Son Dang',
//     },
//     {
//         id: 3,
//         name: 'Hung Dam',
//     }
// ];
// var comments = [
//     {
//         id: 1,
//         user_id: 1,
//         content: 'Anh Son chua ra video :(',
//     },
//     {
//         id: 2,
//         user_id: 2,
//         content: 'Vua ra xog em oi',
//     }
// ];
// function getComments() {
//     return new Promise(function(resolve) {
//         setTimeout(function() {
//             resolve(comments);
//         }, 1000);
//     }) 
// }
// function getUsersByIds(userIds) {
//     return new Promise(function(resolve) {
//         var result = users.filter(function(user) {
//             return userIds.includes(user.id);
//         });
//        setTimeout(function() {
//             resolve(result);
//        }, 1000);
//     })
// }
// getComments()
//     .then(function(comments) {
//         var userIds = comments.map(function(comments) {
//             return comments.user_id;
//         });
//         return getUsersByIds(userIds)
//             .then(function(users) {
//                 return {
//                     users: users,
//                     comments: comments,
//                 }
//             });
//     })
//     .then(function(data) {
//         var commentBlock = document.getElementById('commen-Block');
//         var html = '';
//         data.comments.forEach(function(comment) {
//             var user = data.users.find(function(user) {
//                 return user.id === comment.user_id;
//             })
//             html += `<li>${user.name}: ${comment.content}<li>`;
//         });
//         console.log(html);
//     });
// var postApi = 'https://jsonplaceholder.typicode.com/posts';
// fetch(postApi)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(posts) {
//         console.log(posts);
//     })
// var courseApi = 'http://localhost:3000/course';
// fetch(courseApi)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(courses) {
//         console.log(courses);
//     })
// Enhances object literals
// 1. Dinh nghia key: value cho object
// 2. Dinh nghia method cho object
// 3.Dinh nghia key cho object duoi dang bien
//Destructuring ...rest, doi so
///Spreadd ...spread: toan tu rai, tham so
//Tagged tamplate literals
//${} noi suy