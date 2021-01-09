const howItWorksBlock1 = document.getElementsByClassName('howItWorks-block')[0];
const howItWorksBlock2 = document.getElementsByClassName('howItWorks-block')[1];
const howItWorksBlock3 = document.getElementsByClassName('howItWorks-block')[2];

const whyUsBlock1 = document.getElementsByClassName('whyUs-block')[0];
const whyUsTextBlock1 = document.getElementsByClassName('whyUs-textBlock')[0];
const whyUsBlock2 = document.getElementsByClassName('whyUs-block')[1];
const whyUsTextBlock2 = document.getElementsByClassName('whyUs-textBlock')[1];
const whyUsBlock3 = document.getElementsByClassName('whyUs-block')[2];
const whyUsTextBlock3 = document.getElementsByClassName('whyUs-textBlock')[2];
const whyUsBlock4 = document.getElementsByClassName('whyUs-block')[3];
const whyUsTextBlock4 = document.getElementsByClassName('whyUs-textBlock')[3];

const ourServicesBlock1 = document.getElementsByClassName('ourServices-block')[0];
const ourServicesBlock2 = document.getElementsByClassName('ourServices-block')[1];
const ourServicesBlock3 = document.getElementsByClassName('ourServices-block')[2];

const peoplesBlock1 = document.getElementsByClassName('peoples-block')[0];
const peoplesBlock2 = document.getElementsByClassName('peoples-block')[1];
const peoplesBlock3 = document.getElementsByClassName('peoples-block')[2];

const printsBlock1 = document.getElementsByClassName('prints-block')[0];
const printsBlock2 = document.getElementsByClassName('prints-block')[1];
const printsBlock3 = document.getElementsByClassName('prints-block')[2];

function checkVisibleElements(){
    if (checkVisible(howItWorksBlock1) && !howItWorksBlock1.classList.contains('animated1')){
        howItWorksBlock1.classList.add('animated1');
    } else if (checkVisible(howItWorksBlock2)&& !howItWorksBlock2.classList.contains('animated1')){
        howItWorksBlock2.classList.add('animated1');
    } else if (checkVisible(howItWorksBlock3) && !howItWorksBlock3.classList.contains('animated1')){
        howItWorksBlock3.classList.add('animated1');
    } else if (checkVisible(whyUsBlock1) && !whyUsBlock1.classList.contains('animated1')){
        whyUsBlock1.classList.add('animated1');
        whyUsTextBlock1.classList.add('animated2');
    } else if (checkVisible(whyUsBlock2) && !whyUsBlock2.classList.contains('animated1')){
        whyUsBlock2.classList.add('animated1');
        whyUsTextBlock2.classList.add('animated2');
    } else if (checkVisible(whyUsBlock3) && !whyUsBlock3.classList.contains('animated1')){
        whyUsBlock3.classList.add('animated1');
        whyUsTextBlock3.classList.add('animated2');
    } else if (checkVisible(whyUsBlock4) && !whyUsBlock4.classList.contains('animated1')){
        whyUsBlock4.classList.add('animated1');
        whyUsTextBlock4.classList.add('animated2');
    } else if (checkVisible(ourServicesBlock1) && !ourServicesBlock1.classList.contains('animated3')){
        ourServicesBlock1.classList.add('animated3');
    } else if (checkVisible(ourServicesBlock2) && !ourServicesBlock2.classList.contains('animated3')){
        ourServicesBlock2.classList.add('animated3');
    } else if (checkVisible(ourServicesBlock3) && !ourServicesBlock3.classList.contains('animated3')){
        ourServicesBlock3.classList.add('animated3');
    } else if (checkVisible(peoplesBlock1) && !peoplesBlock1.classList.contains('animated4')){
        peoplesBlock1.classList.add('animated4');
    } else if (checkVisible(peoplesBlock2) && !peoplesBlock2.classList.contains('animated4')){
        peoplesBlock2.classList.add('animated4');
    } else if (checkVisible(peoplesBlock3) && !peoplesBlock3.classList.contains('animated4')){
        peoplesBlock3.classList.add('animated4');
    } else if (checkVisible(printsBlock1) && !printsBlock1.classList.contains('animated5')){
        printsBlock1.classList.add('animated5');
    } else if (checkVisible(printsBlock2) && !printsBlock2.classList.contains('animated5')){
        printsBlock2.classList.add('animated5');
    } else if (checkVisible(printsBlock3) && !printsBlock3.classList.contains('animated5')){
        printsBlock3.classList.add('animated5');
    }
}

function checkVisible(elem) {
    const boundingElem = elem.getBoundingClientRect();
    const top = boundingElem.top;
    const height = boundingElem.height;
    const bottom = boundingElem.bottom;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}

window.addEventListener('scroll', checkVisibleElements);
window.onload = checkVisibleElements;