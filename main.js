const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playlist = $('.playlist');
const trackArt = $('.track-art');
const trackImg = $('.track-img');
const heading = $('.track-name');
const art = $('.track-img');
const artist = $('.track-artist');
const audio = $('#audio');
const playBtn = $('.playpause-track');
const player = $('.player');
const playpauseTrack = $('.playpause-track');
const rangeAudio = $('.seek_slider');
const prevBtn = $('.prev-track');
const nextBtn = $('.next-track');
const repeatBtn = $('.repeat-track');
var volumeSlider = $('.volume_slider');
const lowVolumeBtn = $('.fa-volume-low');
const highVolumeBtn = $('.fa-volume-high');
var currentTimeDisplay = $('.current-time');
var progressSlider = $('.seek_slider');
var wrapper = $('.wrapper');
var volumeLow = document.getElementById('volumeLow');
var volumeHigh = document.getElementById('volumeHigh');
const app = {
    currentIndex: 0,   
    isPlaying: false,
    songs: [
        {
            img : 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/c/4/b/0/c4b0da67bae11731685f79432dc462b7.jpg',
            name : 'Một đêm say',
            artist : 'Thịnh Suy',
            music : './assets/css/music/MotDemSayX-ThinhSuy-7978425.mp3'
        },
        {
            img : 'https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/2/8/e/2/28e2688372cbd8efa2ba3b35a7432bd1.jpg',
            name : 'Đánh Đổi',
            artist : 'Obito, MCK',
            music : './assets/css/music/DanhDoi-Obito-11836728.mp3'
        },
        {
            img : 'https://avatar-ex-swe.nixcdn.com/song/2023/05/30/9/8/e/5/1685464585631_640.jpg',
            name : 'Không Phải Yêu',
            artist : '1ng, JDEN',
            music : './assets/css/music/KhongPhaiYeu-1nGJDen-9586072.mp3'
        },
        {
            img : 'https://i.ytimg.com/vi/s9ykxYatQ7w/maxresdefault.jpg',
            name : 'Liệu Đến Bao Giờ',
            artist : 'Nguyenn',
            music : './assets/css/music/LieuDenBaoGioDemo-Nguyenn-11971640.mp3'
        },
        {
            img : 'https://p16-capcut-sign-va.ibyteimg.com/tos-alisg-v-643f9f/o8ANZfCNBWuWTzBkIbIAyRAkDmhXcybIwABjEZ~tplv-nhvfeczskr-1:250:0.webp?from=1152184139&x-expires=1728721632&x-signature=wWouptyVphfDAT2OK%2ByuKioMaXk%3D',
            name : 'Vì Chúng Ta Là Con Người',
            artist : 'Ronboogz, Winno, Hustlang HBo',
            music : './assets/css/music/ViChungTaLaConNguoi-RonboogzWinnoHustlangHBo-10825570.mp3'
        },
        
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.img}');"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.artist}</p>
                </div>
                <div class="wave">
                    <span class="stroke"></span>
                    <span class="stroke"></span>
                    <span class="stroke"></span>
                    <span class="stroke"></span>
                    <span class="stroke"></span>
                    <span class="stroke"></span>
                    <span class="stroke"></span>
                </div>  
            </div>`
        })
        playlist.innerHTML = htmls.join('');
    },
    // define default khi khởi động website
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvent: function() {
        const _this = this;
        //Xử lý phóng to / thu nhỏ trackArt
        const trackArt = $('.track-art');
        const trackArtWidth = trackArt.offsetWidth;
        //Xử lý trackArt quay và dừng
        const trackImgAnimate = trackImg.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        trackImgAnimate.pause();
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newTrackArtWidth = trackArtWidth - scrollTop;

            trackArt.style.width = newTrackArtWidth > 0 ? newTrackArtWidth + 'px' : 0;
            trackArt.style.opacity = newTrackArtWidth / trackArtWidth;
        }
        playBtn.onclick = function() {
            const playlistSongs = document.querySelectorAll('.song');
            const waveList = document.querySelectorAll('.wave');
            waveList[_this.currentIndex].classList.add('loader');
            if(_this.isPlaying) {
                playpauseTrack.innerHTML = '<i class="fa-solid fa-circle-play fa-5x"></i>';
                _this.isPlaying = false;
                trackImgAnimate.pause();  
                audio.pause();
            }else {
                _this.isPlaying = true;
                trackImgAnimate.play(); 
                audio.play();
                playpauseTrack.innerHTML = '<i class="fa-solid fa-circle-pause fa-5x"></i>';
            }
        }
        repeatBtn.onclick = function() {
            _this.repeatSong();
        }
        prevBtn.onclick = function() {
            _this.prevSong();
            audio.play();
        }
        nextBtn.onclick = function() {
            _this.nextSong();
            audio.play();
        }
        volumeSlider.addEventListener('input', function() {
            // Cập nhật giá trị âm lượng của âm thanh
            audio.volume = volumeSlider.value / 100;
        })
        document.addEventListener('DOMContentLoaded', function() {
            audio.addEventListener('timeupdate', function() {
                // Cập nhật nội dung của div theo currentTime của âm thanh
                currentTimeDisplay.textContent = _this.formatTime(audio.currentTime);
                // Cập nhật giá trị của thanh trượt tiến độ
                progressSlider.value = (audio.currentTime / audio.duration) * 100;
            });
        });
        document.addEventListener('DOMContentLoaded', function() {
            audio.addEventListener('loadedmetadata', function() {
                // Cập nhật nội dung của phần tử hiển thị tổng thời gian
                const totalDurationDisplay = document.querySelector('.total-duration');
                totalDurationDisplay.textContent = _this.formatTime(audio.duration);
            });
        });
        lowVolumeBtn.onclick = function() {
            _this.lowVolumeAudio();
        }
        highVolumeBtn.onclick = function() {
            _this.highVolumeAudio();
        }
        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                rangeAudio.value = progressPercent;
            }
        }
        //Khi hết bài chuyển sang bài tiếp theo
        audio.addEventListener('ended', function() {

            _this.nextSong();
            audio.play();
        });
        //Xử lý khi tua
        rangeAudio.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }
    },
    getCurrentSong: function() {
        return this.songs[this.currentIndex];
    },
    loadCurrentSong: function() {
        
        heading.textContent = this.currentSong.name;
        art.style.backgroundImage = `url('${this.currentSong.img}')`;
        artist.textContent = this.currentSong.artist;
        audio.src = this.currentSong.music;
    },
    lowVolumeAudio: function() {
        volumeSlider.value = Math.max(parseInt(volumeSlider.value, 10) - 10, 1);
        audio.volume = Math.max(audio.volume - 0.1, 0);
    },
    highVolumeAudio: function() {
        volumeSlider.value = Math.min(parseInt(volumeSlider.value, 10) + 10, 100);
        audio.volume = Math.min(audio.volume + 0.1, 1);
    },
    repeatSong: function() {
        audio.currentTime = 0;
        rangeAudio.value = 0;
    },
    prevSong: function() {
        const playlistSongs = document.querySelectorAll('.song');
        const waveList = document.querySelectorAll('.wave');
        playlistSongs[this.currentIndex].classList.remove('active');
        waveList[this.currentIndex].classList.remove('loader');
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        playlistSongs[this.currentIndex].classList.add('active');
        waveList[this.currentIndex].classList.add('loader');
        playpauseTrack.innerHTML = '<i class="fa-solid fa-circle-pause fa-5x"></i>';
        this.loadCurrentSong();
    },
    nextSong: function() {
        const playlistSongs = document.querySelectorAll('.song');
        const waveList = document.querySelectorAll('.wave');
        playlistSongs[this.currentIndex].classList.remove('active');
        waveList[this.currentIndex].classList.remove('loader');
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        playlistSongs[this.currentIndex].classList.add('active');
        waveList[this.currentIndex].classList.add('loader');
        playpauseTrack.innerHTML = '<i class="fa-solid fa-circle-pause fa-5x"></i>';
        this.loadCurrentSong();
    },
    formatTime: function(seconds) {
        var minutes = Math.floor(seconds/60);
        var remainingSeconds = Math.floor(seconds%60);
        return this.pad(minutes) + ':' + this.pad(remainingSeconds);
    },
    pad: function(number) {
        return number < 10 ? "0" + number: number;
    },
    selectSong: function() {
        const playlistSongs = document.querySelectorAll('.song');
        const waveList = document.querySelectorAll('.wave');
        const trackImgAnimate = trackImg.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        trackImgAnimate.pause();
        playlistSongs[this.currentIndex].classList.add('active');
        playlistSongs.forEach((song, index) => {
            song.addEventListener('click', () => {
                // Loại bỏ class 'active' từ tất cả các phần tử khác trong playlist
                playlistSongs.forEach((otherSong) => {
                    if (otherSong.classList.contains('active')) {
                        otherSong.classList.remove('active');
                    }
                });
                waveList.forEach((wave) => {
                    if(wave.classList.contains('loader')) {
                        wave.classList.remove('loader');
                    }
                })
                // Thêm class 'active' cho phần tử được click
                this.currentIndex = index;
                song.classList.add('active');
                waveList[index].classList.add('loader');
                trackImgAnimate.play(); 
                this.loadCurrentSong();
                playpauseTrack.innerHTML = '<i class="fa-solid fa-circle-pause fa-5x"></i>';
                audio.play();
            });
        });
    },
    start: function() { 
        //Định nghĩa các thuộc tính cho object
        this.defineProperties();
        //Lắng nghe và xử lý sự kiện
        this.handleEvent();
        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dựng
        this.loadCurrentSong();
        //Render playlist
        this.render();
        //Select song
        this.selectSong();
    }

}
app.start();
const shuffleBtn = $('.random-track');
shuffleBtn.addEventListener('click', function() {
    // Lấy danh sách các div song từ thẻ playlist
    const playlistSongs = Array.from(playlist.querySelectorAll('.song'));

    for (let i = playlistSongs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        playlist.insertBefore(playlistSongs[j], playlistSongs[i]);
    }
});



//validator.js
//Hàm đối tượng validator
// function Validator(options) {
//     function getParent(element, selector) {
//         while(element.parentElement) {
//             if(element.parentElement.matches(selector)) {
//                 return element.parentElement;
//             }
//             element = element.parentElement;
//         }
//     }
//     var selectorRules = {};
//     //Hàm thực hiện validate
//     function validate(inputElement, rule) {
//         var errorText = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
//         var errorMessage;
//         //Lấy ra các rules của selector
//         var rules = selectorRules[rule.selector];
//         //Lặp qua các rule và kiểm tra
//         //Nếu có lỗi thì dừng việc kiểm tra
//         for (var i = 0; i < rules.length; ++i) {
//             switch(inputElement.type) {
//                 case 'radio':
//                 case 'checkbox':
//                     errorMessage = rules[i](
//                         formElement.querySelector(rule.selector + ':checked')
//                     );
//                     break;
//                 default:
//                     errorMessage = rules[i](inputElement.value)
//             }
//             if (errorMessage) break;
//         }
//         if (errorMessage) {
//             errorText.textContent = errorMessage;
//             getParent(inputElement, options.formGroupSelector).classList.add('invalid');
//         }else {
//             errorText.textContent = '';
//             getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
//         } 
//         return !errorMessage;
//     }
//     //Hàm lấy form validate
//     var formElement = document.querySelector(options.form);
//     if (formElement) {
//         formElement.onsubmit = (e) => {
//             e.preventDefault();
//             var isFormValid = true;
//             options.rules.forEach((rule) => {
//                 var inputElement = formElement.querySelector(rule.selector);
//                 var isValid = validate(inputElement, rule)
//                 if(!isValid) {
//                     isFormValid = false;
//                 }
//             });
//             if (isFormValid) {
//                 //Trường hợp submit với javscript
//                 if(typeof options.onSubmit === 'function') { 
//                     var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
//                     var formValues = Array.from(enableInputs).reduce((values, input) => {
//                         switch(input.type) {
//                             case 'radio':
//                                 values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
//                                 break;
//                             case 'checkbox':
//                                 if(!input.matches(':checked')) {
//                                     values[input.name] = '';
//                                     return values;
//                                 }
//                                 if(!Array.isArray(values[input.name])) {
//                                     values[input.name] = [];
//                                 }
//                                 values[input.name].push(input.value);
//                                 // if(input.matches(':checked')) {
//                                 //     values[input.name] = input.value;
//                                 // }
//                                 break;
//                             default:
//                                 values[input.name] = input.value;
//                         }
//                         // console.log(values[input.name]+ "Tên:" + input.name + "Giá trị: " + input.value);
//                         return values;
//                     }, {})                   
//                     options.onSubmit(formValues);
//                 }
//                 //Trường hợp submit với hành vi mặc định
//                 else {
//                     formElement.submit();
//                 }
//             }
//         }
//         options.rules.forEach((rule) => {
//             //Lưu lại các rules cho mỗi input;
//             if(Array.isArray(selectorRules[rule.selector])) {
//                 selectorRules[rule.selector].push(rule.test);
//             } else {
//                 selectorRules[rule.selector] = [rule.test];
//             }
//             var inputElements = formElement.querySelectorAll(rule.selector);
//             Array.from(inputElements).forEach((inputElement) => {
//                 if(inputElement) {
//                     //Xử lý trường hợp blur khỏi input
//                     inputElement.onblur = () => {
//                         validate(inputElement, rule)
//                     }
//                     //Xử lý trưởng mỗi khi người dùng nhập vào input
//                     inputElement.oninput = () => {
//                         getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector).textContent = '';
//                         getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
//                     }
//                 }
//             })
//         })
//     }
// }
// //Định nghĩa các rules
// //Nguyên tắc các rules:
// //1. Khi có lỗi => Trả message lỗi
// //2. Khi hợp lệ => Ko trả ra gì cs(undefined)
// Validator.isRequired= function (selector) {
//     return {
//         selector: selector,
//         test: function(value) {
//             //trim() loại bỏ khoảng cách
//             return value ? undefined : 'Vui lòng nhập trường này';
//         }
//     };
// }
// Validator.isEmail = function (selector) {
//     return {
//         selector: selector,
//         test: function(value) {
//             var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//             return regex.test(value) ? undefined : 'Trường này phải là email';
//         }
//     };
// }
// Validator.isPassword = function(selector) {
//     return {
//         selector: selector,
//         test: function(value) {
//             var passw=  /^[A-Za-z]\w{7,14}$/;
//             return value.match(passw) ? undefined : 'Mật khẩu từ 7 đến 16 ký tự, chỉ chứa ký tự, chữ số, dấu gạch dưới và ký tự đầu tiên phải là chữ cái';
//         }
//     }
// }
// Validator.isPasswordConfirmation = function(selector, getOldValue) {
//     return {
//         selector: selector,
//         test: function (value) {
//             return value === getOldValue() ? undefined : 'Mật khẩu không khợp với mật khẩu bạn đã nhập';
//         }
//     }
// }

//Cách 2
// function Validator(formSelector) {
//     function getParent(element, selector) {
//         while(element.parentElement) {
//             if(element.parentElement.matches(selector)) {
//                 return element.parentElement;
//             }
//             element = element.parentElement;
//         }
//     }
//     var formRules = {};
//     var validatorRules = {
//         required: function (value) {
//             return value ? undefined : 'Vui lòng nhập trường này';
//         },
//         email: function (value) {
//             var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//             return regex.test(value) ? undefined : 'Trường này phải là email';
//         },
//         min: function (min) {
//              return function (value) {
//                 return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`;
//              }
//         }
//     }
    
//     var formElement = document.querySelector(formSelector);
    
//     if (formElement) {
//         var inputs = formElement.querySelectorAll('[namme][rules]');
//         for (var input of inputs) {
//             var rules = input.getAttribute('rules').split('|');
//             for (var rule of rules) {
//                 var ruleInfor
//                 var isRulehasValue = rule.includes(':');
//                 if(rule.include(':')) {
//                     ruleInfor = rule.split(':');
//                     rule = ruleInfor[0];
//                 }
//                 var ruleFunc = validatorRules[rule];
//                 if (isRulehasValue) {
//                     ruleFunc = ruleFunc(ruleInfor[1]);
//                 }
//                 if (Array.isArray(formRules[input.name])) {
//                     formRules[input.name].push(ruleFunc);
//                 } else {
//                     formRules[input.name] = [validatorRules[rule]];
//                 }
//             }
//             //Lắng nghe sự kiện để validate(blur, change, ....)
//             input.onblur = handleValidate;
//             input.oninput = handleClear;
//         }
//         function handleValidate(event) {
//             var rules = formRules[event.target.name];
//             var errorMessage;
//             for (var rule of rules) {
//                 errorMessage =  rule(event.target.value);
//                 if(errorMessage) {
//                     break;
//                 }
//             }

//             if (errorMessage) {
//                 var formGroup = getParent(e.target, 'form-group');
//                 if (formGroup) {
//                     formGroup.classList.add('invalid');
//                     var formMessage = formGroup.querySelector('.form-message');
//                     if (formMessage) {
//                         formMessage.innerText = errorMessage;
//                     }
//                 }
//             }
//             return !errorMessage;
//         }
//         function handleClear(event) {
//             var formGroup = getParent(e.target, 'form-group');
//             if (formGroup.classList.contains('invalid')) {
//                 formGroup.classList.remove('invalid');
//                 var formMessage = formGroup.querySelector('.form-message');

//                 if (formMessage) {
//                     formMessage.innerText = '';
//                 }
//             }
//         }
//         formElement.onsubmit = function (event) {
//             event.preventDefault();
//             var inputs = formElement.querySelectorAll('[namme][rules]');
//             var isValid = true;
//             for (var input of inputs) {
//                 if(!handleValidate({target: input})) {
//                     isValid = false;
//                 }
//             }
//             if (isValid) {
//                 if (this.onSubmit) {
//                     this.onSubmit();
//                 } else {
//                     formElement.submit();
//                 }
//             }
//         }
//     }
// }
