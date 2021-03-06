function checkBotAndTop(core_item, arrowBot, arrowTop) {
    let previous = core_item.previousElementSibling;
    if(!previous)
    {
        arrowTop.setAttribute('disabled',true);
    }
    else
    {
        arrowTop.setAttribute('disabled',false);
        //previous.querySelector('.arrowTop').setAttribute('disabled',false);
    }
    let following = core_item.nextElementSibling;
    if(!following)
    {
        arrowBot.setAttribute('disabled',true);

    }
    else
    {
        arrowBot.setAttribute('disabled',false);
        // following.querySelector('.arrowTop').setAttribute('disabled',false);
        // let ff = following.querySelector('.arrowTop');
        // ff.setAttribute('disabled',false);
    }
}
function checkBotAndTopNeighbors(core_item) {
    checkBotAndTop(core_item,core_item.querySelector('.arrowBot'),core_item.querySelector('.arrowTop'));
}
function switchTrueFalse(tr, fl) {
    tr.setAttribute('disabled',true);
    fl.setAttribute('disabled',false);
}
AddNewItem();
function AddNewItem() {

    let  core_item = document.createElement('div');
    // core_item.innerHTML = 'lololololol' ;

    core_item.className = "item panel";
        let tests_item_heading  = document.createElement('div');
        tests_item_heading.className='tests_item_heading'
            let input_field  = document.createElement('textarea');
            input_field.className = "input_field";
            tests_item_heading.append(input_field);

            let change_position  = document.createElement('div');
            change_position.className="change_position";
            tests_item_heading.append(change_position);

                let  arrowTop = document.createElement('div');
                arrowTop.className ='arrow arrowTop';
                arrowTop.innerHTML='↑';
                change_position.append(arrowTop);
                arrowTop.addEventListener("click",function(){
                    // let previous =  $(this).parent().parent().parent().parent().prev();
                    let previous = core_item.previousElementSibling;
                    if (previous) {
                        core_item.parentElement.insertBefore( core_item,previous);
                        checkBotAndTop(core_item,arrowBot,arrowTop);
                        checkBotAndTopNeighbors(core_item.nextElementSibling);

                    }
                });

                let  arrowBot = document.createElement('div');
                arrowBot.className ='arrow arrowBot';
                arrowBot.innerHTML='↓';
                // arrowBot.id = 'arrowBot';
                change_position.append(arrowBot);

                arrowBot.setAttribute('disabled',true);
                arrowBot.addEventListener("click",function(){
                // let previous =  $(this).parent().parent().parent().parent().prev();
                    let following = core_item.nextElementSibling;
                    if (following) {
                        core_item.parentElement.insertBefore( following,core_item);
                        checkBotAndTop(core_item,arrowBot,arrowTop);
                        checkBotAndTopNeighbors(core_item.previousElementSibling);
                        //checkBotAndTopNeighbors(core_item);
                    }
                 });

        core_item.append(tests_item_heading);

        let  variants = document.createElement('div');
        variants.className = "variants";
        // variants.innerHTML+='[';
            let oneVariant =  document.createElement('div');
            oneVariant.className    =   'radio_button oneVariant';
            oneVariant.innerHTML = 'Один вариант.';
            variants.append(oneVariant);

            let moreVariants =  document.createElement('div');
            moreVariants.className    =   'radio_button moreVariants';
            moreVariants.innerHTML = 'Несколько вариантов.';
            variants.append(moreVariants);

            oneVariant.addEventListener("click",function(){
                switchTrueFalse(oneVariant,moreVariants);

                // oneVariant.setAttribute('disabled',true);
                // moreVariants.setAttribute('disabled',false);
             });

            moreVariants.addEventListener("click",function(){
                switchTrueFalse(moreVariants,oneVariant);
                // moreVariants.setAttribute('disabled',true);
                // oneVariant.setAttribute('disabled',false);
             });


            oneVariant.setAttribute('disabled',true);
        // variants.innerHTML+=']';

        // variants.innerHTML ='[\n' +
        //     '            <div class="radio_button">\n' +
        //     '                <input id="radio-1" type="radio" name="variant" checked>\n' +
        //     '                <label for="radio-1"> Один вариант. </label>\n' +
        //     '            </div>\n' +
        //     '            <div class="radio_button">\n' +
        //     '                <input id="radio-2" type="radio" name="variant">\n' +
        //     '                <label for="radio-2"> Несколько вариантов. </label>\n' +
        //     '            </div>\n' +
        //     '            ]';
        core_item.append(variants);

        let  answers = document.createElement('div');
        answers.className = "answers";
        core_item.append(answers);

            let  add_answer = document.createElement('button');
            add_answer.className = 'add_answer';
            core_item.append( add_answer);
            add_answer.addEventListener("click",function(){
                addAnswer(answers);
            });


    $('#panel_items').append(core_item);
    checkBotAndTop(core_item,arrowBot,arrowTop);

    let previous = core_item.previousElementSibling;
    if (previous) {
        let prevArrowBot = previous.querySelector('.arrowBot');
        prevArrowBot.setAttribute('disabled',false);
    }

}
function SaveData() {
    let panel_items = document.getElementById('panel_items');
 let elems = panel_items.getElementsByClassName('item');
 for(var i = 0; i<elems.length; i++)
 {
    let elem = elems[i];

        let answer = elem.getElementsByClassName('input_field')[0];
        let answerValue = answer.value;

        let oneVariant = elem.getElementsByClassName('oneVariant')[0];
        let  oneVariantValue = oneVariant.getAttribute('disabled');


        let answers = elem.getElementsByClassName('answers')[0].getElementsByClassName('answer_item');

     // alert(answers.length);
        for (let ind = 0; ind<answers.length; ind++) {
            let answerItem = answers[ind];
            let answerI = answerItem.getElementsByClassName('variant')[0];
            alert(answerI.value.toString());
     }
 }
}

function addAnswer(answers) {
    let  answer_item = document.createElement('div');
    answer_item.className = "answer_item";
        let delete_answer = document.createElement('button');
        delete_answer.className = 'delete_answer';
        answer_item.append(delete_answer);
        delete_answer.addEventListener("click",function(){
            answer_item.remove();
        });

        let input_field = document.createElement('input');
        input_field.className = 'input_field variant';
        answer_item.append(input_field);

    answers.append(answer_item);
}