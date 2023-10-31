// function loop(st, end, cb) {
//     if(st < end) {
//         cb(st);
//         return loop(st + 1, end, cb);
//     }
// }
// var array = ["Javascript", "PHP", "C++"];
// loop(0, array.length, function(index) {
//     console.log(array[index]);
// });
const sports = [
    {
        name: 'Bóng rổ',
        like: 6
    },
    {
        name: 'Bơi lội',
        like: 5
    },
    {
        name: 'Bóng đá',
        like: 10
    },
]
var getMostFavoriteSport = function(array) {    
    return array.filter(function(sport) {
        return sport.like > 5;
    });
}

// Kỳ vọng
console.log(getMostFavoriteSport(sports));
// Output: [{ name: 'Bóng rổ, like: 6 }, { name: 'Bóng đá, like: 10 }]





