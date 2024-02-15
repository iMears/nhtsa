import nhtsa from './dist/nhtsa.js';

nhtsa.decodeVinFlatFormat('1N4AL11D75C109151').then(response => {
    console.log(response.data);
}).catch(error => {
    console.log(error);
});

