document.querySelectorAll('.image-wrapper').forEach(el=>{
    el.addEventListener('click',()=>{
        const artist=el.getAttribute('data-artist');
        if(artist==='lata'){
            window.location.href='latamangeshkar.html';
        }
        else if(artist==='kishore'){
            window.location.href='kishorekumar.html';
        }
        else if(artist==='nusrat'){
            window.location.href='nusratfatehalikhan.html';
        }
    });
});

const artistPages={
    jagjit:'jagjitsingh.html',
    lata:'latamangeshkar.html',
    kishore:'kishorekumar.html',
    nusrat:'nusratfatehalikhan.html',
    arijit:'arijitsingh.html',
    atif:'atifaslam.html',
    siddhu:'siddhumoosewala.htlm',
    udit:'uditnarayan'
};
document.querySelectorAll('.artist-card').forEach(el=>{
    el.addEventListener('click',()=>{
        const artist=el.getAttribute('data-artist');
        const targetPage=artistPages[artist];
        if(targetPage){
            window.location.href=targetPage;
        }
        else{
            alert(`No page found for: ${artist}`);
        }
    });
});


