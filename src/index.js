document.addEventListener('DOMContentLoaded', function(e){
    function barPups(){
        fetch('http://localhost:3000/pups')
        .then(function (r){
            return r.json()
        })
        .then(function(data){
            for (const pup of data){
                renderPup(pup);
            };
        })
    }

    barPups();

    document.querySelector('#filter-div #good-dog-filter').addEventListener('click', function(e){
        if (document.querySelector('#filter-div #good-dog-filter').innerText === 'Filter good dogs: OFF'){
            fetch('http://localhost:3000/pups/')
            .then(r => r.json())
            .then(data => {
                for (let pup of data){
                    let iGD = pup.isGoodDog;
                    if (!iGD){
                        const pupElement = document.querySelector(`span:nth-child(${pup.id})`);
                        pupElement.style.display = 'none';
                    }
                }
                document.querySelector('#filter-div #good-dog-filter').innerText = 'Filter good dogs: ON';
            })
        } else{
            document.querySelector('#dog-bar').innerText = '';
            barPups();
            document.querySelector('#filter-div #good-dog-filter').innerText = 'Filter good dogs: OFF';
        }
    })
})

function renderPup(pupObj){
    const pupSpan = document.createElement('span');
    pupSpan.innerText = pupObj.name;
    document.querySelector('#dog-bar').append(pupSpan);
    pupSpan.addEventListener('click', function(e){
        document.querySelector('#dog-info').innerText = '';
        const dogImg = document.createElement('img');
        dogImg.src = pupObj.image;
        const dogName = document.createElement('h2');
        dogName.innerText = pupObj.name;
        const goodBadButton = document.createElement('button');
        if (pupObj.isGoodDog){
            goodBadButton.innerText = "Bad Dog!";
        } else {
            goodBadButton.innerText = "Good Dog!";
        }
        document.querySelector("#dog-info").append(dogImg, dogName, goodBadButton);
        
        let iGD = pupObj.isGoodDog;
        goodBadButton.addEventListener('click', function(e){
            console.log(iGD);
            if (iGD){
                console.log('WE GOIN BAD');
                fetch('http://localhost:3000/pups/' + pupObj.id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        isGoodDog: false,
                }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then(r => r.json())
                .then(data => {
                    iGD = !iGD;
                    console.log(iGD);
                    goodBadButton.innerText = "Good Dog!";
                    return;
                });
            } else {
                console.log('WE GOIN GOOD');
                fetch('http://localhost:3000/pups/' + pupObj.id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        isGoodDog: true,
                }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then(r => r.json())
                .then(data => {
                    iGD = !iGD;
                    console.log(iGD);
                    goodBadButton.innerText = "Bad Dog!";
                    return;
                });
            }
        })
    })
}

// function returnGBpup(pup){
//     fetch('http://localhost:3000/pups/' + pup.id)
//     .then(r => r.json()
//     .then (p => {
//         console.log(p);
//         return p.isGoodDog;
//     }))
// }